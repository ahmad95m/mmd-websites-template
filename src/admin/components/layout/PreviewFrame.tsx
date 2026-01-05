"use client";
import { useAdminStore } from '@/admin/store/useAdminStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, RefreshCw, ChevronDown, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

const deviceSizes = {
  desktop: { width: '100%', label: 'Desktop' },
  tablet: { width: '768px', label: 'Tablet' },
  mobile: { width: '375px', label: 'Mobile' }
} as const;

// All available routes in the app
const allRoutes = [
  { path: '/', label: 'Home', category: 'Main Pages' },
  { path: '/about', label: 'About', category: 'Main Pages' },
  { path: '/programs', label: 'Programs', category: 'Main Pages' },
  { path: '/reviews', label: 'Reviews', category: 'Main Pages' },
  { path: '/blog', label: 'Blog', category: 'Main Pages' },
  { path: '/location', label: 'Location', category: 'Main Pages' },
  { path: '/calendar', label: 'Calendar', category: 'Main Pages' },
  { path: '/schedule', label: 'Schedule', category: 'Main Pages' },
  { path: '/programs/kids', label: 'Kids Program', category: 'Program Details' },
  { path: '/programs/teens', label: 'Teens Program', category: 'Program Details' },
  { path: '/programs/adults', label: 'Adults Program', category: 'Program Details' },
  { path: '/programs/birthday-parties', label: 'Birthday Parties', category: 'Program Details' },
];

// Group routes by category
const groupedRoutes = allRoutes.reduce((acc, route) => {
  if (!acc[route.category]) {
    acc[route.category] = [];
  }
  acc[route.category].push(route);
  return acc;
}, {} as Record<string, typeof allRoutes>);

export function PreviewFrame() {
  const { previewDevice, setPreviewDevice, previewUrl, setPreviewUrl, activeTemplate, draftContent } = useAdminStore();
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prevBasePathRef = useRef<string>('');

  // Get base path without hash
  const getBasePath = (url: string) => url.split('#')[0] || '/';

  const getPreviewUrl = () => {
    const base = activeTemplate === 'template1' ? '' : 
                 activeTemplate === 'template2' ? '/template-2' : '/template-3';
    // Add a query param to signal this is a preview iframe
    const url = base + previewUrl;
    const separator = url.includes('?') ? '&' : '?';
    return url + separator + '_preview=1';
  };

  // Send content updates to iframe whenever draftContent changes
  useEffect(() => {
    if (iframeRef.current?.contentWindow && !isLoading) {
      try {
        iframeRef.current.contentWindow.postMessage({ 
          type: 'contentUpdate', 
          content: draftContent 
        }, '*');
      } catch (e) {
        // Silently handle iframe communication failures (expected in some scenarios)
      }
    }
  }, [draftContent, isLoading]);

  const handleRefresh = () => {
    setIsLoading(true);
    setKey(prev => prev + 1);
  };

  const handleRouteChange = (path: string) => {
    setIsLoading(true);
    setPreviewUrl(path);
    setKey(prev => prev + 1); // Force iframe reload
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    prevBasePathRef.current = getBasePath(previewUrl);
    // Send initial content on load
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({ 
          type: 'contentUpdate', 
          content: draftContent 
        }, '*');
      } catch (e) {
        // Silently handle iframe communication failures (expected in some scenarios)
      }
    }
  };

  // Get display path without hash for dropdown
  const displayPath = getBasePath(previewUrl);

  // Scroll to section when previewUrl contains a hash
  useEffect(() => {
    if (previewUrl.includes('#') && iframeRef.current) {
      const hash = previewUrl.split('#')[1];
      // Wait a bit then scroll
      const timer = setTimeout(() => {
        try {
          iframeRef.current?.contentWindow?.postMessage({ type: 'scrollToSection', sectionId: hash }, '*');
        } catch (e) {
          // Silently handle iframe scroll failures (cross-origin restrictions may prevent this)
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [previewUrl]);

  // Only show loading when the base path changes (not just hash changes)
  useEffect(() => {
    const currentBasePath = getBasePath(previewUrl);
    if (currentBasePath !== prevBasePathRef.current) {
      setIsLoading(true);
    }
  }, [previewUrl]);

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header Bar */}
      <div className="h-10 border-b border-border bg-muted/50 px-3 flex items-center justify-center shrink-0">
        {/* Combined Device Toggle + URL Dropdown + Refresh */}
        <div className="flex items-center gap-1 bg-background rounded-lg p-1 border border-border shadow-sm">
          {/* Device Toggle */}
          <div className="flex items-center gap-0.5 pr-1 border-r border-border">
            <Button
              variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setPreviewDevice('desktop')}
            >
              <Monitor className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={previewDevice === 'tablet' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setPreviewDevice('tablet')}
            >
              <Tablet className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setPreviewDevice('mobile')}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* URL Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-6 px-2 text-xs min-w-[140px] max-w-[200px] flex items-center justify-between"
              >
                <span className="truncate text-muted-foreground">{previewUrl}</span>
                <ChevronDown className="h-3 w-3 ml-1.5 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-popover border border-border shadow-lg max-h-80 overflow-y-auto min-w-[200px]" 
              align="center"
            >
              {Object.entries(groupedRoutes).map(([category, routes], idx) => (
                <div key={category}>
                  {idx > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuLabel className="text-xs text-muted-foreground py-1">{category}</DropdownMenuLabel>
                  {routes.map((route) => (
                    <DropdownMenuItem
                      key={route.path}
                      onClick={() => handleRouteChange(route.path)}
                      className={cn(
                        "flex items-center justify-between cursor-pointer text-xs py-1.5",
                        displayPath === route.path && "bg-muted"
                      )}
                    >
                      <span>{route.label}</span>
                      <span className="text-[10px] text-muted-foreground">{route.path}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh */}
          <div className="pl-1 border-l border-border">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Container - Full height with no padding for desktop */}
      <div className={cn(
        "flex-1 overflow-hidden flex justify-center items-start",
        previewDevice === 'desktop' ? 'bg-background' : 'bg-muted/30 p-2'
      )}>
        <div 
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            previewDevice === 'desktop' 
              ? 'w-full h-full' 
              : 'bg-background rounded-lg shadow-lg h-[95%] my-auto'
          )}
          style={{ 
            width: deviceSizes[previewDevice].width,
            maxWidth: '100%'
          }}
        >
          {/* Device Frame for mobile/tablet */}
          {previewDevice !== 'desktop' && (
            <div className="h-5 bg-muted border-b border-border flex items-center justify-center gap-1 shrink-0">
              <div className="w-12 h-0.5 bg-muted-foreground/30 rounded-full" />
            </div>
          )}
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Loading preview...</span>
              </div>
            </div>
          )}
          
          {/* Iframe */}
          <iframe
            ref={iframeRef}
            key={key}
            src={getPreviewUrl()}
            className="w-full border-0 bg-background"
            title="Site Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={handleIframeLoad}
            style={{ 
              height: previewDevice === 'desktop' ? '100%' : 'calc(100% - 20px)' 
            }}
          />
        </div>
      </div>
    </div>
  );
}
