"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { PreviewFrame } from './PreviewFrame';
import { useAdminStore } from '@/admin/store/useAdminStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showPreview, setShowPreview] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const { sidebarCollapsed } = useAdminStore();
  const pathname = usePathname();

  // Determine if we're on a page that should show preview
  const showPreviewPanel = pathname?.includes('/admin/edit') || 
                           pathname === '/admin' ||
                           pathname === '/admin/seo';

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Header */}
        <AdminHeader 
          showPreview={showPreview} 
          onTogglePreview={() => setShowPreview(!showPreview)} 
        />

        {/* Content + Preview */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Editor Content */}
          <div className={cn(
            "overflow-auto bg-muted/30 transition-all duration-300",
            !showEditor && showPreviewPanel ? "w-0 p-0 overflow-hidden" : "p-6",
            showPreview && showPreviewPanel && showEditor ? "w-1/2" : showEditor ? "w-full" : "w-0"
          )}>
            {showEditor && children}
          </div>

          {/* Toggle Editor Button - only show when preview is visible */}
          {showPreviewPanel && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "absolute top-2 z-20 h-7 w-7 bg-background shadow-md border-border",
                    showEditor ? "left-[calc(50%-14px)]" : "left-2"
                  )}
                  onClick={() => setShowEditor(!showEditor)}
                >
                  {showEditor ? (
                    <PanelLeftClose className="h-4 w-4" />
                  ) : (
                    <PanelLeft className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {showEditor ? 'Hide editor panel' : 'Show editor panel'}
              </TooltipContent>
            </Tooltip>
          )}

          {/* Preview Panel */}
          {showPreview && showPreviewPanel && (
            <div className={cn(
              "border-l border-border bg-background transition-all duration-300",
              showEditor ? "w-1/2" : "w-full"
            )}>
              <PreviewFrame />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
