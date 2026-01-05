"use client";
import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAdminStore } from '@/admin/store/useAdminStore';
import type { Asset, AssetType } from '@/admin/types';
import { ImageIcon, VideoIcon, Search, X, Upload, Loader2 } from 'lucide-react';
import { uploadToS3, validateFile, UploadProgress } from '@/admin/services/s3Upload';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AssetLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  assetType?: AssetType; // Filter by type if provided
  title?: string;
}

export function AssetLibraryDialog({
  open,
  onOpenChange,
  onSelect,
  assetType,
  title = "Select from Asset Library"
}: AssetLibraryDialogProps) {
  const { assetLibrary, addAsset, removeAsset } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<AssetType>(assetType || 'image');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter assets by type and search query
  const filteredAssets = useMemo(() => {
    let filtered = assetLibrary.filter(asset => {
      // Filter by type if specified or by active tab
      const typeFilter = assetType || activeTab;
      if (typeFilter && asset.type !== typeFilter) return false;
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return asset.name.toLowerCase().includes(query) || 
               asset.url.toLowerCase().includes(query);
      }
      return true;
    });
    
    // Sort by most recent first
    return filtered.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }, [assetLibrary, activeTab, searchQuery, assetType]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Determine asset type from file
    let type: AssetType = 'image';
    if (file.type.startsWith('video/')) {
      type = 'video';
    } else if (file.name.toLowerCase().includes('logo')) {
      type = 'logo';
    }

    // Validate file
    const maxSizeMB = type === 'video' ? 50 : 5;
    const allowedTypes = type === 'video' 
      ? ['video/mp4', 'video/webm', 'video/quicktime']
      : ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    
    const validation = validateFile(file, { maxSizeMB, allowedTypes });
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setIsUploading(true);
    setUploadProgress(null);

    try {
      const url = await uploadToS3(file, (progress) => {
        setUploadProgress(progress);
      });

      // Get image dimensions if it's an image
      let width: number | undefined;
      let height: number | undefined;
      
      if (type === 'image' || type === 'logo') {
        try {
          const img = new window.Image();
          await new Promise((resolve, reject) => {
            img.onload = () => {
              width = img.naturalWidth;
              height = img.naturalHeight;
              resolve(null);
            };
            img.onerror = reject;
            img.src = url;
          });
        } catch {
          // Ignore dimension errors
        }
      }

      const newAsset: Asset = {
        id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url,
        name: file.name,
        type,
        uploadedAt: new Date().toISOString(),
        size: file.size,
        width,
        height
      };

      addAsset(newAsset);
      toast.success('Asset uploaded successfully');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      toast.error('Failed to upload asset');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleSelect = (url: string) => {
    onSelect(url);
    onOpenChange(false);
  };

  const handleDelete = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this asset?')) {
      removeAsset(assetId);
      toast.success('Asset deleted');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Select an asset from your library or upload a new one
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Search and Upload */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={activeTab === 'video' 
                ? 'video/mp4,video/webm,video/quicktime'
                : 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml'}
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {uploadProgress ? `${uploadProgress.percentage}%` : 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>

          {/* Tabs */}
          {!assetType && (
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AssetType)}>
              <TabsList>
                <TabsTrigger value="image">Images</TabsTrigger>
                <TabsTrigger value="logo">Logos</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {/* Asset Grid */}
          <ScrollArea className="flex-1">
            {filteredAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {activeTab === 'video' ? (
                  <VideoIcon className="h-12 w-12 text-muted-foreground mb-4" />
                ) : (
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                )}
                <p className="text-muted-foreground mb-2">
                  No {activeTab + 's'} found
                </p>
                <p className="text-sm text-muted-foreground">
                  Upload your first {activeTab} to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className={cn(
                      "relative group cursor-pointer rounded-lg border-2 border-border overflow-hidden",
                      "hover:border-primary transition-colors"
                    )}
                    onClick={() => handleSelect(asset.url)}
                  >
                    {asset.type === 'video' ? (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <VideoIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="aspect-square relative bg-muted">
                        <Image
                          src={getStaticImage(asset.url)}
                          alt={asset.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(asset.url);
                        }}
                      >
                        Select
                      </Button>
                    </div>

                    {/* Delete button */}
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDelete(asset.id, e)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    {/* Asset info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 px-2 truncate">
                      {asset.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

