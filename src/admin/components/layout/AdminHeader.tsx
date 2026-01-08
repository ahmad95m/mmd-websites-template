"use client";
import { useAdminStore } from '@/admin/store/useAdminStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  EyeOff,
  Save,
  Upload,
  RotateCcw,
  ExternalLink,
  Download
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { downloadJSON } from '@/admin/utils/exportHelpers';

import { saveSiteContent } from '@/app/actions/site';
import { useParams } from 'next/navigation';

interface AdminHeaderProps {
  showPreview: boolean;
  onTogglePreview: () => void;
}

export function AdminHeader({ showPreview, onTogglePreview }: AdminHeaderProps) {
  const { 
    hasUnsavedChanges, 
    publish, 
    revert, 
    exportJSON,
    importJSON,
    activeTemplate,
    previewUrl,
    draftContent
  } = useAdminStore();
  const params = useParams();

  const handlePublish = async () => {
    try {
      const siteId = params?.site as string;
      if (!siteId) {
        toast.error('Could not determine site ID');
        return;
      }

      toast.loading('Publishing changes...');
      const result = await saveSiteContent(siteId, draftContent);
      
      if (result.success) {
        publish(); // Updates local store state (clears unsaved flag)
        toast.dismiss();
        toast.success('Changes published successfully to S3!');
      } else {
        toast.dismiss();
        toast.error('Failed to publish: ' + result.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  };

  const handleRevert = () => {
    revert();
    toast.info('Changes reverted to last published version');
  };

  const handleExport = () => {
    try {
      const json = exportJSON();
      const filename = `site-content-${new Date().toISOString().split('T')[0]}.json`;
      downloadJSON(json, filename);
      toast.success('Content exported successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to export content');
    }
  };

  const getTemplateUrl = () => {
    const base = activeTemplate === 'template1' ? '' : 
                 activeTemplate === 'template2' ? '/template-2' : '/template-3';
    return base + previewUrl;
  };

  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      {/* Left side - Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Template:</span>
          <Badge variant="secondary" className="capitalize">
            {activeTemplate.replace('template', 'Template ')}
          </Badge>
        </div>
        
        {hasUnsavedChanges && (
          <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">
            Unsaved Changes
          </Badge>
        )}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Toggle Preview */}
        <Button
          variant="outline"
          size="sm"
          onClick={onTogglePreview}
          className="gap-2"
        >
          {showPreview ? (
            <>
              <EyeOff className="h-4 w-4" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Show Preview
            </>
          )}
        </Button>

        {/* Open in new tab */}
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a href={getTemplateUrl()} target="_blank" rel="noopener noreferrer" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Open Site
          </a>
        </Button>

        {/* Import */}
        <div className="hidden">
           <input 
              type="file" 
              accept=".json" 
              id="import-json" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const content = e.target?.result as string;
                    if (content) {
                      const result = importJSON(content);
                      if (result.success) {
                        toast.success('Content imported successfully!');
                      } else {
                         toast.error(result.error);
                      }
                    }
                  };
                  reader.readAsText(file);
                  // Reset input
                  e.target.value = '';
                }
              }}
           />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('import-json')?.click()}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Import
        </Button>

        {/* Export */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>

        {/* Revert */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasUnsavedChanges}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Revert
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revert Changes?</AlertDialogTitle>
              <AlertDialogDescription>
                This will discard all unsaved changes and restore the last published version.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRevert}>
                Revert Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Publish */}
        <Button
          size="sm"
          onClick={handlePublish}
          disabled={!hasUnsavedChanges}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Publish
        </Button>
      </div>
    </header>
  );
}
