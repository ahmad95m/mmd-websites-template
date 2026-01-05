"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { getStaticImage } from '@/lib/imageMapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ImageIcon, X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadToS3, validateFile, UploadProgress } from '@/admin/services/s3Upload';
import { toast } from 'sonner';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  maxSizeMB?: number;
}

export function ImageField({
  label,
  value,
  onChange,
  placeholder = "Enter image URL or upload...",
  required,
  helperText,
  error,
  className,
  maxSizeMB = 5
}: ImageFieldProps) {
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file, { maxSizeMB });
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
      
      onChange(url);
      setImageError(false);
      toast.success('Image uploaded successfully');
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-destructive")}>
        {label}
      </Label>
      
      <div className="flex gap-3">
        {/* Image Preview */}
        <div className="relative w-24 h-24 rounded-lg border border-border bg-muted flex-shrink-0 overflow-hidden">
          {isUploading ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              {uploadProgress && (
                <span className="text-xs text-muted-foreground">
                  {uploadProgress.percentage}%
                </span>
              )}
            </div>
          ) : value && !imageError ? (
            <>
              <Image
                src={getStaticImage(value)}
                alt="Preview"
                className="object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
                fill
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5"
                onClick={() => {
                  onChange('');
                  setImageError(false);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* URL Input & Upload */}
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Input
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                setImageError(false);
              }}
              placeholder={placeholder}
              className={cn("flex-1", error && "border-destructive")}
              disabled={isUploading}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              title="Upload image"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          
          {helperText && !error && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
          {imageError && value && (
            <p className="text-xs text-amber-600">Image failed to load - check URL</p>
          )}
          <p className="text-xs text-muted-foreground">
            Max {maxSizeMB}MB • JPG, PNG, WebP, GIF
          </p>
        </div>
      </div>
    </div>
  );
}
