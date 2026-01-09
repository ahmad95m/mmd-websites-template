"use client";

import { useState } from 'react';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextField } from './fields/RichTextField';
import { ImageField } from './fields/ImageField';

interface AdminOverlayProps {
  children: React.ReactNode;
  path: string; // Path in the store, e.g. "blog[0].title" or "site.name"
  label: string;
  type?: 'text' | 'textarea' | 'rich-text' | 'image';
  className?: string; // Class for the wrapper
  asChild?: boolean; // If true, doesn't wrap in a div (complex, skip for now, assumed div wrapper)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any; // Current value to pre-fill
}

export function AdminOverlay({ 
  children, 
  path, 
  label, 
  type = 'text', 
  className,
  value: initialValue
}: AdminOverlayProps) {
  const { isAuthenticated, updateDraft } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isHovered, setIsHovered] = useState(false);

  if (!isAuthenticated) return <>{children}</>;

  const handleSave = () => {
    updateDraft(path, value);
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div 
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
      {children}
      
      {/* Overlay Border */}
      <div className={cn(
        "absolute inset-0 border-2 border-primary/0 rounded-sm pointer-events-none transition-all",
        isHovered && "border-primary/50 bg-primary/5"
      )} />

      {/* Edit Button */}
      {isHovered && (
        <Button
          size="sm"
          className="absolute top-2 right-2 z-50 h-8 px-2 shadow-lg opacity-100 transition-opacity"
          onClick={handleClick}
        >
          <Pencil className="w-3 h-3 mr-1" />
          Edit {label}
        </Button>
      )}

      {/* Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {type === 'text' && (
              <Input 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                autoFocus
              />
            )}
            
            {type === 'textarea' && (
              <Textarea 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                rows={4}
                autoFocus
              />
            )}

            {type === 'rich-text' && (
              <RichTextField
                label=""
                value={value}
                onChange={setValue}
              />
            )}

            {type === 'image' && (
              <ImageField
                label={label}
                value={value}
                onChange={setValue}
              />
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
