"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { useAdminStore, type SectionConfig } from '@/admin/store/useAdminStore';
import { cn } from '@/lib/utils';
import {
  Home,
  Info,
  Users,
  Star,
  BookOpen,
  Calendar,
  Cake,
  MapPin,
  FileText,
  Settings,
  Search,
  Palette,
  Inbox,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Building2,
  Navigation,
  Megaphone,
  Eye,
  GripVertical,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PageSection {
  id: string;
  name: string;
  editorPath?: string;
}

interface PageDefinition {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
  sections: PageSection[];
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

// Page structure with their sections
const pagesStructure: PageDefinition[] = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    icon: Home,
    sections: [
      { id: 'hero', name: 'Hero Section', editorPath: '/admin/edit/hero' },
      { id: 'about', name: 'About Preview', editorPath: '/admin/edit/about' },
      { id: 'benefits', name: 'Benefits', editorPath: '/admin/edit/benefits' },
      { id: 'programs', name: 'Programs', editorPath: '/admin/edit/programs' },
      { id: 'countdown', name: 'Countdown Offer', editorPath: '/admin/edit/forms' },
      { id: 'reviews', name: 'Reviews', editorPath: '/admin/edit/reviews' },
      { id: 'blog', name: 'Blog Preview', editorPath: '/admin/edit/blog' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta' },
    ]
  },
  {
    id: 'about',
    name: 'About',
    path: '/about',
    icon: Info,
    sections: [
      { id: 'about-content', name: 'About Content', editorPath: '/admin/edit/about' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta' },
    ]
  },
  {
    id: 'programs',
    name: 'Programs',
    path: '/programs',
    icon: Users,
    sections: [
      { id: 'programs-list', name: 'Programs List', editorPath: '/admin/edit/programs' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta' },
    ]
  },
  {
    id: 'reviews',
    name: 'Reviews',
    path: '/reviews',
    icon: Star,
    sections: [
      { id: 'reviews-list', name: 'Reviews List', editorPath: '/admin/edit/reviews' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta' },
    ]
  },
  {
    id: 'blog',
    name: 'Blog',
    path: '/blog',
    icon: BookOpen,
    sections: [
      { id: 'blog-posts', name: 'Blog Posts', editorPath: '/admin/edit/blog' },
    ]
  },
  {
    id: 'location',
    name: 'Location',
    path: '/location',
    icon: MapPin,
    sections: [
      { id: 'location-content', name: 'Location Info', editorPath: '/admin/edit/location' },
      { id: 'hours', name: 'Business Hours', editorPath: '/admin/edit/site-info' },
    ]
  },
  {
    id: 'calendar',
    name: 'Calendar',
    path: '/calendar',
    icon: Calendar,
    sections: [
      { id: 'events', name: 'Events', editorPath: '/admin/edit/calendar' },
    ]
  },
  {
    id: 'birthday',
    name: 'Birthday Parties',
    path: '/programs/birthday-parties',
    icon: Cake,
    sections: [
      { id: 'birthday-content', name: 'Birthday Content', editorPath: '/admin/edit/birthday' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta' },
    ]
  },
];

// Global/site-wide settings
const globalSettings: NavItem[] = [
  { label: 'Site Info', path: '/admin/edit/site-info', icon: Building2 },
  { label: 'Navigation', path: '/admin/edit/navigation', icon: Navigation },
  { label: 'Footer', path: '/admin/edit/footer', icon: FileText },
  { label: 'Forms & Offers', path: '/admin/edit/forms', icon: Inbox },
];

// System settings
const systemSettings: NavItem[] = [
  { label: 'SEO Settings', path: '/admin/seo', icon: Search },
  { label: 'Form Submissions', path: '/admin/submissions', icon: Inbox },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

// Sortable section component
function SortableSectionLink({ 
  section, 
  pageId,
  pagePath,
  isActive 
}: { 
  section: PageSection; 
  pageId: string; 
  pagePath: string;
  isActive: boolean;
}) {
  const { setPreviewUrl } = useAdminStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${pageId}-${section.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  if (!section.editorPath) return null;

  const handleClick = () => {
    // Set preview URL with section hash for scrolling
    setPreviewUrl(`${pagePath}#${section.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-1 group",
        isDragging && "opacity-50 z-50"
      )}
    >
      <div
        className="cursor-grab active:cursor-grabbing p-0.5 hover:bg-muted rounded touch-none opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </div>
      <Link
        href={section.editorPath}
        onClick={handleClick}
        className={cn(
          "flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
        {section.name}
      </Link>
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, logout, sectionConfig, reorderSections, toggleSection } = useAdminStore();
  const [expandedPages, setExpandedPages] = useState<string[]>(['home']);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const togglePage = (pageId: string) => {
    setExpandedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  };

  // Get section config for a page
  const getSectionConfig = (page: PageDefinition): SectionConfig[] => {
    const config = sectionConfig[page.id];
    if (config && config.length > 0) {
      const existingIds = config.map(s => s.id);
      const newSections = page.sections
        .filter(s => !existingIds.includes(s.id))
        .map((s, i) => ({ id: s.id, enabled: true, order: config.length + i }));
      
      return [...config, ...newSections].sort((a, b) => a.order - b.order);
    }
    return page.sections.map((s, i) => ({ id: s.id, enabled: true, order: i }));
  };

  // Get ordered sections for a page
  const getOrderedSections = (page: PageDefinition): PageSection[] => {
    const config = getSectionConfig(page);
    return config
      .filter(c => c.enabled)
      .map(c => page.sections.find(s => s.id === c.id))
      .filter((s): s is PageSection => s !== undefined);
  };

  const handleDragEnd = (event: DragEndEvent, page: PageDefinition) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const currentConfig = getSectionConfig(page);
      const oldIndex = currentConfig.findIndex(s => `${page.id}-${s.id}` === active.id);
      const newIndex = currentConfig.findIndex(s => `${page.id}-${s.id}` === over.id);
      
      const newOrder = arrayMove(currentConfig, oldIndex, newIndex);
      reorderSections(page.id, newOrder);
    }
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.path;
    const Icon = item.icon;

    const linkContent = (
      <Link
        href={item.path}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        {!sidebarCollapsed && <span>{item.label}</span>}
      </Link>
    );

    if (sidebarCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn(
          "flex items-center border-b border-border h-14 px-4",
          sidebarCollapsed ? "justify-center" : "justify-between"
        )}>
          {!sidebarCollapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-foreground">Admin Panel</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          {/* Dashboard */}
          <div className="mb-4">
            <NavLink item={{ label: 'Dashboard', path: '/admin', icon: Home }} />
          </div>

          {/* Theme */}
          <div className="mb-4">
            <NavLink item={{ label: 'Theme', path: '/admin/theme', icon: Palette }} />
          </div>

          <Separator className="my-4" />

          {/* Pages Section */}
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pages
              </p>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link 
                    href="/admin/pages" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Manage All Pages</TooltipContent>
              </Tooltip>
            </div>
          )}
          
          <nav className="space-y-1 mb-4">
            {pagesStructure.map((page) => {
              const Icon = page.icon;
              const isExpanded = expandedPages.includes(page.id);
              const hasActiveSection = page.sections.some(
                s => s.editorPath && pathname === s.editorPath
              );

              if (sidebarCollapsed) {
                // Collapsed state - show just the icon with tooltip
                return (
                  <Tooltip key={page.id} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={page.sections[0]?.editorPath || '/admin/pages'}
                        className={cn(
                          "flex items-center justify-center p-2 rounded-lg transition-colors",
                          hasActiveSection
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{page.name}</TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Collapsible
                  key={page.id}
                  open={isExpanded}
                  onOpenChange={() => togglePage(page.id)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "group flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        hasActiveSection
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span>{page.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(page.path, '_blank');
                          }}
                        >
                          <span role="button" className="cursor-pointer">
                            <Eye className="h-3 w-3" />
                          </span>
                        </Button>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isExpanded ? "rotate-0" : "-rotate-90"
                          )}
                        />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-2 mt-1 space-y-0.5">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEnd(event, page)}
                    >
                      <SortableContext
                        items={getOrderedSections(page).map(s => `${page.id}-${s.id}`)}
                        strategy={verticalListSortingStrategy}
                      >
                        {getOrderedSections(page).map((section) => (
                          <SortableSectionLink 
                            key={`${page.id}-${section.id}`} 
                            section={section} 
                            pageId={page.id}
                            pagePath={page.path}
                            isActive={section.editorPath === pathname}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </nav>

          <Separator className="my-4" />

          {/* Global Content */}
          {!sidebarCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Global Content
            </p>
          )}
          <nav className="space-y-1 mb-4">
            {globalSettings.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>

          <Separator className="my-4" />

          {/* System Settings */}
          {!sidebarCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Settings
            </p>
          )}
          <nav className="space-y-1">
            {systemSettings.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
                  sidebarCollapsed && "justify-center px-0"
                )}
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                {!sidebarCollapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {sidebarCollapsed && (
              <TooltipContent side="right">Logout</TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
