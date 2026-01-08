"use client";
import { useAdminStore } from '@/admin/store/useAdminStore';
import { useUIStore } from '@/store/useUIStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

// Color Themes
const colorThemes = [
  {
    id: 'ember',
    name: 'Ember',
    description: 'Warm orange and red tones with high energy feel',
    colors: {
      primary: 'hsl(25, 95%, 53%)',
      secondary: 'hsl(0, 84%, 60%)',
      accent: 'hsl(45, 93%, 47%)'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue tones for a calm, professional look',
    colors: {
      primary: 'hsl(199, 89%, 48%)',
      secondary: 'hsl(217, 91%, 60%)',
      accent: 'hsl(172, 66%, 50%)'
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green tones for an organic, balanced feel',
    colors: {
      primary: 'hsl(142, 71%, 45%)',
      secondary: 'hsl(142, 76%, 36%)',
      accent: 'hsl(84, 81%, 44%)'
    }
  },
  {
    id: 'royal',
    name: 'Royal',
    description: 'Rich purple tones for a premium, sophisticated look',
    colors: {
      primary: 'hsl(262, 83%, 58%)',
      secondary: 'hsl(280, 87%, 65%)',
      accent: 'hsl(330, 81%, 60%)'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark blue tones for a sleek, modern aesthetic',
    colors: {
      primary: 'hsl(217, 91%, 60%)',
      secondary: 'hsl(240, 60%, 50%)',
      accent: 'hsl(200, 98%, 39%)'
    }
  },
  {
    id: 'titan',
    name: 'Titan',
    description: 'Bold gray and silver for industrial strength',
    colors: {
      primary: 'hsl(220, 9%, 46%)',
      secondary: 'hsl(215, 14%, 34%)',
      accent: 'hsl(38, 92%, 50%)'
    }
  },
  {
    id: 'muv',
    name: 'MUV',
    description: 'Vibrant pink and magenta for bold statements',
    colors: {
      primary: 'hsl(330, 81%, 60%)',
      secondary: 'hsl(280, 87%, 65%)',
      accent: 'hsl(45, 93%, 47%)'
    }
  }
];

// Layout Templates
const templates = [
  {
    id: 'template1',
    name: 'Classic Bold',
    description: 'Original design with strong typography and high contrast. Best for traditional martial arts academies.',
    preview: '/',
    features: ['Bold headers', 'High contrast', 'Traditional feel']
  },
  {
    id: 'template2',
    name: 'Editorial Minimal',
    description: 'Clean, modern design with generous whitespace. Perfect for premium positioning.',
    preview: '/template-2',
    features: ['Minimalist', 'Elegant spacing', 'Modern typography']
  },
  {
    id: 'template3',
    name: 'Athletic Modern',
    description: 'Dynamic, energetic design with athletic vibes. Great for fitness-focused academies.',
    preview: '/template-3',
    features: ['Dynamic layouts', 'Bold colors', 'Fitness focus']
  }
];

type ThemeId = 'ember' | 'ocean' | 'forest' | 'royal' | 'midnight' | 'titan' | 'muv';

export function ThemePage() {
  const { activeTemplate, setTemplate } = useAdminStore();
  const { currentTheme, setTheme } = useUIStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Theme & Appearance</h1>
        <p className="text-muted-foreground mt-1">
          Customize the look and feel of your website
        </p>
      </div>

      {/* Color Themes Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Color Themes</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose a color palette that matches your brand identity
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {colorThemes.map((theme) => {
            const isActive = currentTheme === theme.id;
            
            return (
              <Card 
                key={theme.id}
                className={cn(
                  "relative overflow-hidden transition-all cursor-pointer hover:shadow-lg",
                  isActive && "ring-2 ring-primary"
                )}
                onClick={() => setTheme(theme.id as ThemeId)}
              >
                {isActive && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="gap-1 bg-primary text-xs">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                )}
                
                {/* Color Swatches */}
                <div className="h-16 flex">
                  <div 
                    className="flex-1" 
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div 
                    className="flex-1" 
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div 
                    className="flex-1" 
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {theme.description}
                  </p>
                  <Button
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="w-full mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTheme(theme.id as ThemeId);
                    }}
                  >
                    {isActive ? 'Selected' : 'Apply Theme'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Layout Templates Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Layout Templates</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose a layout design for your website structure
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {templates.map((template) => {
            const isActive = activeTemplate === template.id;
            
            return (
              <Card 
                key={template.id}
                className={cn(
                  "relative overflow-hidden transition-all cursor-pointer hover:shadow-lg",
                  isActive && "ring-2 ring-primary"
                )}
                onClick={() => setTemplate(template.id as 'template1' | 'template2' | 'template3')}
              >
                {isActive && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="gap-1 bg-primary">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                )}
                
                {/* Preview Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-b">
                  <div className="text-4xl font-bold text-muted-foreground/30">
                    {template.id.replace('template', '')}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTemplate(template.id as 'template1' | 'template2' | 'template3');
                      }}
                    >
                      {isActive ? 'Selected' : 'Select'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(template.preview, '_blank');
                      }}
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Info */}
      <Card className="border-dashed">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Color themes affect the entire color palette of your site. 
            Layout templates change the visual structure while keeping all your content intact.
            Both changes take effect immediately and will be visible to visitors.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ThemePage;
