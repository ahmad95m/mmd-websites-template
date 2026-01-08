"use client";
import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Asset, AssetType } from '@/admin/types';
import { ImageIcon, VideoIcon, Search, X, Upload, Loader2, Trash2 } from 'lucide-react';
import { uploadAsset, getAssets } from '@/app/actions/assets';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function AssetLibraryEditor() {
  const { assetLibrary, addAsset, removeAsset, updateAsset, setAssets } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<AssetType | 'all'>('all');
  const [isUploading, setIsUploading] = useState(false);
  // Removed progress bar state for now as server actions don't support it easily
  // Removed progress bar state for now as server actions don't support it easily
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  // Fetch assets on mount
  useEffect(() => {
    async function fetchAssets() {
      const siteId = params?.site as string;
      if (siteId) {
        const result = await getAssets(siteId);
        if (result.success && result.assets) {
           setAssets(result.assets);
        }
      }
    }
    fetchAssets();
  }, [params?.site, setAssets]);

  // Filter assets by type and search query
  const filteredAssets = useMemo(() => {
    let filtered = assetLibrary.filter(asset => {
      if (activeTab !== 'all' && asset.type !== activeTab) return false;
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
  }, [assetLibrary, activeTab, searchQuery]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const siteId = params?.site as string;
    if (!siteId) {
      toast.error('Site ID missing');
      return;
    }

    setIsUploading(true);
    // setUploadProgress(null); // No progress bar for server actions yet

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Determine asset type from file
        let type: AssetType = 'image';
        if (file.type.startsWith('video/')) {
          type = 'video';
        } else if (file.name.toLowerCase().includes('logo')) {
          type = 'logo';
        }

        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadAsset(formData, siteId);
        if (!result.success || !result.url) {
            toast.error(`Failed to upload ${file.name}: ${result.error}`);
            continue;
        }

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
              img.src = result.url;
            });
          } catch {
            // Ignore dimension errors
          }
        }

        const newAsset: Asset = {
          id: result.key || result.url,
          url: result.url,
          name: file.name,
          type,
          uploadedAt: new Date().toISOString(),
          size: file.size,
          width,
          height
        };

        addAsset(newAsset);
      }

      toast.success(`Successfully uploaded ${files.length} asset(s)`);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload assets');
    } finally {
      setIsUploading(false);
      // setUploadProgress(null);
    }
  };

  const handleDelete = (assetId: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      removeAsset(assetId);
      toast.success('Asset deleted');
    }
  };

  const getAssetCounts = () => {
    return {
      all: assetLibrary.length,
      image: assetLibrary.filter(a => a.type === 'image').length,
      logo: assetLibrary.filter(a => a.type === 'logo').length,
      video: assetLibrary.filter(a => a.type === 'video').length,
    };
  };

  const counts = getAssetCounts();

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Asset Library</h1>
        <p className="text-muted-foreground">
          Manage all your uploaded images, logos, and videos
        </p>
      </div>

      {/* Upload and Search */}
      <Card>
        <CardContent className="pt-6">
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
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Assets
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AssetType | 'all')}>
        <TabsList>
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="image">Images ({counts.image})</TabsTrigger>
          <TabsTrigger value="logo">Logos ({counts.logo})</TabsTrigger>
          <TabsTrigger value="video">Videos ({counts.video})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {filteredAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  {activeTab === 'video' ? (
                    <VideoIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  )}
                  <p className="text-muted-foreground mb-2">
                    No {activeTab === 'all' ? 'assets' : activeTab + 's'} found
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your first {activeTab === 'all' ? 'asset' : activeTab} to get started
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Assets
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="relative group rounded-lg border border-border overflow-hidden bg-card"
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
                              unoptimized // Ensure external/S3 images load without optimization issues
                            />
                          </div>
                        )}
                        
                        {/* Overlay on hover - Icon only for delete as requested */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8 rounded-full shadow-sm"
                            onClick={() => handleDelete(asset.id)}
                            title="Delete Asset"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Asset info */}
                        <div className="p-2 space-y-1">
                          <p className="text-xs font-medium truncate">{asset.name}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {asset.type}
                            </Badge>
                            {asset.width && asset.height && (
                              <span className="text-xs text-muted-foreground">
                                {asset.width}×{asset.height}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatFileSize(asset.size)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

