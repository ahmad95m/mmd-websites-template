"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Home, Info, Users, Star, BookOpen, MapPin, Calendar, Cake, 
  FileText, ChevronDown, ChevronRight, Eye, Edit, Layers, GripVertical, RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAdminStore, SectionConfig } from '@/admin/store/useAdminStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
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
  description?: string;
}

interface PageDefinition {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
  description: string;
  sections: PageSection[];
}

const pagesStructure: PageDefinition[] = [
  {
    id: 'global',
    name: 'Global Layout',
    path: '/',
    icon: Layers,
    description: 'Header, footer, and bars that appear on all pages',
    sections: [
      { id: 'topbar', name: 'Top Bar', editorPath: '/admin/edit/site-info', description: 'Top info bar with phone' },
      { id: 'header', name: 'Header / Navigation', editorPath: '/admin/edit/navigation', description: 'Main navigation menu' },
      { id: 'footer', name: 'Footer', editorPath: '/admin/edit/footer', description: 'Site footer with links' },
      { id: 'bottombar', name: 'Bottom Bar CTA', editorPath: '/admin/edit/forms', description: 'Sticky bottom call-to-action' },
    ]
  },
  {
    id: 'home',
    name: 'Home Page',
    path: '/',
    icon: Home,
    description: 'Main landing page with hero, about preview, programs, and testimonials',
    sections: [
      { id: 'hero', name: 'Hero Section', editorPath: '/admin/edit/hero', description: 'Main banner with CTA' },
      { id: 'about', name: 'About Preview', editorPath: '/admin/edit/about', description: 'Brief intro' },
      { id: 'benefits', name: 'Benefits Section', editorPath: '/admin/edit/benefits', description: 'Key benefits grid' },
      { id: 'programs', name: 'Programs Section', editorPath: '/admin/edit/programs', description: 'Program cards' },
      { id: 'comparison', name: 'Comparison Chart', editorPath: '/admin/edit/comparison', description: 'Feature comparison' },
      { id: 'countdown', name: 'Countdown Offer', editorPath: '/admin/edit/forms', description: 'Limited time offer' },
      { id: 'video-testimonials', name: 'Video Testimonials', editorPath: '/admin/edit/reviews', description: 'Video reviews' },
      { id: 'reviews', name: 'Reviews Section', editorPath: '/admin/edit/reviews', description: 'Testimonials carousel' },
      { id: 'blog', name: 'Blog Preview', editorPath: '/admin/edit/blog', description: 'Featured posts' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta', description: 'Final CTA section' },
    ]
  },
  {
    id: 'about',
    name: 'About Page',
    path: '/about',
    icon: Info,
    description: 'Company story, values, team members, and mission',
    sections: [
      { id: 'hero', name: 'About Hero', editorPath: '/admin/edit/about', description: 'Page header' },
      { id: 'story', name: 'Our Story', editorPath: '/admin/edit/about', description: 'Company history' },
      { id: 'stats', name: 'Statistics', editorPath: '/admin/edit/about', description: 'Key numbers' },
      { id: 'values', name: 'Core Values', editorPath: '/admin/edit/about', description: 'Company values' },
      { id: 'team', name: 'Team Members', editorPath: '/admin/edit/about', description: 'Staff profiles' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta', description: 'Final CTA' },
    ]
  },
  {
    id: 'programs',
    name: 'Programs Page',
    path: '/programs',
    icon: Users,
    description: 'All martial arts programs with details and enrollment',
    sections: [
      { id: 'hero', name: 'Programs Hero', description: 'Page header' },
      { id: 'list', name: 'Programs List', editorPath: '/admin/edit/programs', description: 'All programs' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta', description: 'Enrollment CTA' },
    ]
  },
  {
    id: 'program-detail',
    name: 'Program Detail',
    path: '/programs/:slug',
    icon: FileText,
    description: 'Individual program pages with full details',
    sections: [
      { id: 'hero', name: 'Program Hero', editorPath: '/admin/edit/programs', description: 'Program banner' },
      { id: 'overview', name: 'Overview', editorPath: '/admin/edit/programs', description: 'Program details' },
      { id: 'benefits', name: 'Benefits Grid', editorPath: '/admin/edit/programs', description: 'Program benefits' },
      { id: 'results', name: 'Expected Results', editorPath: '/admin/edit/programs', description: 'Outcomes' },
      { id: 'educational', name: 'Educational Content', editorPath: '/admin/edit/programs', description: 'Articles' },
      { id: 'faqs', name: 'FAQs', editorPath: '/admin/edit/programs', description: 'Common questions' },
      { id: 'reviews', name: 'Program Reviews', editorPath: '/admin/edit/reviews', description: 'Testimonials' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta', description: 'Enrollment CTA' },
    ]
  },
  {
    id: 'reviews',
    name: 'Reviews Page',
    path: '/reviews',
    icon: Star,
    description: 'All customer reviews and testimonials',
    sections: [
      { id: 'hero', name: 'Reviews Hero', description: 'Page header' },
      { id: 'list', name: 'Reviews List', editorPath: '/admin/edit/reviews', description: 'All reviews' },
      { id: 'cta', name: 'Call to Action', editorPath: '/admin/edit/cta', description: 'Leave review CTA' },
    ]
  },
  {
    id: 'blog',
    name: 'Blog Page',
    path: '/blog',
    icon: BookOpen,
    description: 'Blog posts and articles',
    sections: [
      { id: 'hero', name: 'Blog Hero', description: 'Page header' },
      { id: 'posts', name: 'Blog Posts', editorPath: '/admin/edit/blog', description: 'All posts' },
    ]
  },
  {
    id: 'blog-detail',
    name: 'Blog Post Detail',
    path: '/blog/:slug',
    icon: FileText,
    description: 'Individual blog post pages',
    sections: [
      { id: 'article', name: 'Article Content', editorPath: '/admin/edit/blog', description: 'Post content' },
      { id: 'related', name: 'Related Posts', editorPath: '/admin/edit/blog', description: 'Suggestions' },
    ]
  },
  {
    id: 'location',
    name: 'Location Page',
    path: '/location',
    icon: MapPin,
    description: 'Facility location, map, and service areas',
    sections: [
      { id: 'hero', name: 'Location Hero', editorPath: '/admin/edit/location', description: 'Page header' },
      { id: 'map', name: 'Map & Address', editorPath: '/admin/edit/site-info', description: 'Google map' },
      { id: 'features', name: 'Facility Features', editorPath: '/admin/edit/location', description: 'Amenities' },
      { id: 'areas', name: 'Service Areas', editorPath: '/admin/edit/location', description: 'Nearby areas' },
      { id: 'hours', name: 'Business Hours', editorPath: '/admin/edit/site-info', description: 'Operating hours' },
    ]
  },
  {
    id: 'calendar',
    name: 'Calendar Page',
    path: '/calendar',
    icon: Calendar,
    description: 'Class schedule and events calendar',
    sections: [
      { id: 'hero', name: 'Calendar Hero', description: 'Page header' },
      { id: 'events', name: 'Events Calendar', editorPath: '/admin/edit/calendar', description: 'All events' },
    ]
  },
  {
    id: 'birthday',
    name: 'Birthday Parties',
    path: '/programs/birthday-parties',
    icon: Cake,
    description: 'Birthday party packages and booking',
    sections: [
      { id: 'hero', name: 'Birthday Hero', editorPath: '/admin/edit/birthday', description: 'Page header' },
      { id: 'features', name: 'Party Features', editorPath: '/admin/edit/birthday', description: 'What\'s included' },
      { id: 'packages', name: 'Party Packages', editorPath: '/admin/edit/birthday', description: 'Pricing tiers' },
      { id: 'testimonials', name: 'Testimonials', editorPath: '/admin/edit/birthday', description: 'Parent reviews' },
      { id: 'cta', name: 'Booking CTA', editorPath: '/admin/edit/cta', description: 'Book now' },
    ]
  },
];

// Sortable section item component
interface SortableSectionItemProps {
  section: PageSection;
  pageId: string;
  isEnabled: boolean;
  onToggle: () => void;
  isOverItem?: boolean;
  overPosition?: 'before' | 'after' | null;
}

function SortableSectionItem({ section, pageId, isEnabled, onToggle, isOverItem, overPosition }: SortableSectionItemProps) {
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

  return (
    <div className="relative">
      {/* Drop indicator - before */}
      {isOverItem && overPosition === 'before' && (
        <div className="absolute -top-1 left-0 right-0 h-0.5 bg-primary rounded-full z-10">
          <div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-primary" />
          <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-primary" />
        </div>
      )}
      
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border",
          isDragging ? "opacity-30 bg-muted border-dashed" : "",
          isEnabled
            ? "bg-background hover:bg-muted/50 transition-colors" 
            : "bg-muted/30 opacity-60"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className={cn(
            "h-2 w-2 rounded-full",
            isEnabled ? (section.editorPath ? "bg-green-500" : "bg-muted-foreground") : "bg-red-400"
          )} />
          <div>
            <div className={cn("font-medium text-sm", !isEnabled && "line-through text-muted-foreground")}>
              {section.name}
            </div>
            {section.description && (
              <div className="text-xs text-muted-foreground">
                {section.description}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={isEnabled}
            onCheckedChange={onToggle}
            aria-label={`Toggle ${section.name}`}
          />
          {section.editorPath && isEnabled ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href={section.editorPath}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Link>
            </Button>
          ) : (
            <div className="w-[60px]" />
          )}
        </div>
      </div>

      {/* Drop indicator - after */}
      {isOverItem && overPosition === 'after' && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full z-10">
          <div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-primary" />
          <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
}

// Drag overlay item component
function DragOverlayItem({ section, isEnabled }: { section: PageSection; isEnabled: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border shadow-lg",
        "bg-card border-primary",
        isEnabled ? "" : "opacity-60"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-1">
          <GripVertical className="h-4 w-4 text-primary" />
        </div>
        <div className={cn(
          "h-2 w-2 rounded-full",
          isEnabled ? (section.editorPath ? "bg-green-500" : "bg-muted-foreground") : "bg-red-400"
        )} />
        <div>
          <div className={cn("font-medium text-sm", !isEnabled && "line-through text-muted-foreground")}>
            {section.name}
          </div>
          {section.description && (
            <div className="text-xs text-muted-foreground">
              {section.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PagesEditor() {
  const [expandedPages, setExpandedPages] = useState<string[]>(['global', 'home']);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const { sectionConfig, toggleSection, reorderSections, resetPageSections, resetAllPageSections } = useAdminStore();

  const handleResetPage = (page: PageDefinition) => {
    const defaultSections = page.sections.map((s, i) => ({ 
      id: s.id, 
      enabled: true, 
      order: i 
    }));
    resetPageSections(page.id, defaultSections);
    toast.success(`Reset ${page.name} to default settings`);
  };

  const handleResetAllPages = () => {
    const allDefaults: Record<string, { id: string; enabled: boolean; order: number }[]> = {};
    pagesStructure.forEach(page => {
      allDefaults[page.id] = page.sections.map((s, i) => ({
        id: s.id,
        enabled: true,
        order: i
      }));
    });
    resetAllPageSections(allDefaults);
    toast.success('Reset all pages to default settings');
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
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

  // Get section config for a page, initializing if needed
  const getSectionConfig = (page: PageDefinition): SectionConfig[] => {
    const config = sectionConfig[page.id];
    if (config && config.length > 0) {
      // Merge existing config with any new sections from pagesStructure
      const existingIds = config.map(s => s.id);
      const newSections = page.sections
        .filter(s => !existingIds.includes(s.id))
        .map((s, i) => ({ id: s.id, enabled: true, order: config.length + i }));
      
      return [...config, ...newSections].sort((a, b) => a.order - b.order);
    }
    // Initialize with all sections enabled
    return page.sections.map((s, i) => ({ id: s.id, enabled: true, order: i }));
  };

  const isSectionEnabled = (pageId: string, sectionId: string): boolean => {
    const config = sectionConfig[pageId];
    if (!config) return true; // Default to enabled
    const section = config.find(s => s.id === sectionId);
    return section ? section.enabled : true;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string | null);
  };

  const handleDragEnd = (event: DragEndEvent, page: PageDefinition) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);
    
    if (over && active.id !== over.id) {
      const currentConfig = getSectionConfig(page);
      const oldIndex = currentConfig.findIndex(s => `${page.id}-${s.id}` === active.id);
      const newIndex = currentConfig.findIndex(s => `${page.id}-${s.id}` === over.id);
      
      const newOrder = arrayMove(currentConfig, oldIndex, newIndex);
      reorderSections(page.id, newOrder);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  // Get the position where item will be dropped (before or after the over item)
  const getOverPosition = (page: PageDefinition, itemId: string): 'before' | 'after' | null => {
    if (!activeId || !overId || overId !== itemId) return null;
    
    const orderedSections = getOrderedSections(page);
    const activeIndex = orderedSections.findIndex(s => `${page.id}-${s.id}` === activeId);
    const overIndex = orderedSections.findIndex(s => `${page.id}-${s.id}` === overId);
    
    if (activeIndex === -1 || overIndex === -1) return null;
    
    return activeIndex < overIndex ? 'after' : 'before';
  };

  // Get the active section being dragged
  const getActiveDragSection = (): { section: PageSection; pageId: string } | null => {
    if (!activeId) return null;
    
    for (const page of pagesStructure) {
      const section = page.sections.find(s => `${page.id}-${s.id}` === activeId);
      if (section) {
        return { section, pageId: page.id };
      }
    }
    return null;
  };

  // Get ordered sections for a page
  const getOrderedSections = (page: PageDefinition): PageSection[] => {
    const config = getSectionConfig(page);
    return config
      .map(c => page.sections.find(s => s.id === c.id))
      .filter((s): s is PageSection => s !== undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pages & Sections</h1>
          <p className="text-muted-foreground mt-1">
            Manage page sections - toggle visibility and reorder by dragging
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleResetAllPages}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All Pages
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{pagesStructure.length}</div>
            <p className="text-sm text-muted-foreground">Total Pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {pagesStructure.reduce((acc, p) => acc + p.sections.length, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Sections</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {pagesStructure.reduce((acc, p) => {
                return acc + p.sections.filter(s => isSectionEnabled(p.id, s.id)).length;
              }, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Active Sections</p>
          </CardContent>
        </Card>
      </div>

      {/* Pages List */}
      <div className="space-y-3">
        {pagesStructure.map((page) => {
          const Icon = page.icon;
          const isExpanded = expandedPages.includes(page.id);
          const orderedSections = getOrderedSections(page);
          const enabledCount = page.sections.filter(s => isSectionEnabled(page.id, s.id)).length;
          
          return (
            <Card key={page.id} className="overflow-hidden">
              <Collapsible open={isExpanded} onOpenChange={() => togglePage(page.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {page.name}
                            <Badge variant="secondary" className="text-xs">
                              {enabledCount}/{page.sections.length} active
                            </Badge>
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {page.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetPage(page);
                          }}
                          title="Reset to default order and enable all sections"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reset
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(page.path, '_blank');
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4">
                    <div className="border-t pt-4">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Layers className="h-3 w-3" />
                        Page Sections (drag to reorder)
                      </div>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={(event) => handleDragEnd(event, page)}
                        onDragCancel={handleDragCancel}
                      >
                        <SortableContext
                          items={orderedSections.map(s => `${page.id}-${s.id}`)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="grid gap-2">
                            {orderedSections.map((section) => (
                              <SortableSectionItem
                                key={`${page.id}-${section.id}`}
                                section={section}
                                pageId={page.id}
                                isEnabled={isSectionEnabled(page.id, section.id)}
                                onToggle={() => toggleSection(page.id, section.id)}
                                isOverItem={overId === `${page.id}-${section.id}`}
                                overPosition={getOverPosition(page, `${page.id}-${section.id}`)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                        <DragOverlay>
                          {activeId && (() => {
                            const activeData = getActiveDragSection();
                            if (!activeData) return null;
                            return (
                              <DragOverlayItem 
                                section={activeData.section} 
                                isEnabled={isSectionEnabled(activeData.pageId, activeData.section.id)} 
                              />
                            );
                          })()}
                        </DragOverlay>
                      </DndContext>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="border-dashed">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Use the toggle switch to show/hide sections on a page. 
            Drag sections by the handle to reorder them. Disabled sections are hidden from visitors 
            but their content is preserved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PagesEditor;
