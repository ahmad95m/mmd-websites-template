"use client";
import { Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ThemeId = 'ember' | 'ocean' | 'forest' | 'royal' | 'midnight' | 'titan' | 'muv';

interface ThemeOption {
  id: ThemeId;
  name: string;
  primaryColor: string;
  description: string;
}

const themes: ThemeOption[] = [
  {
    id: 'ember',
    name: 'Ember',
    primaryColor: 'hsl(16 85% 55%)',
    description: 'Coral Orange & Navy',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    primaryColor: 'hsl(195 85% 45%)',
    description: 'Deep Blue & Teal',
  },
  {
    id: 'forest',
    name: 'Forest',
    primaryColor: 'hsl(155 75% 38%)',
    description: 'Emerald & Earth',
  },
  {
    id: 'royal',
    name: 'Royal',
    primaryColor: 'hsl(265 75% 55%)',
    description: 'Purple & Gold',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    primaryColor: 'hsl(340 85% 60%)',
    description: 'Dark Neon Modern',
  },
  {
    id: 'titan',
    name: 'Titan',
    primaryColor: 'hsl(0 85% 50%)',
    description: 'Bold Black & Red',
  },
  {
    id: 'muv',
    name: 'MUV Style',
    primaryColor: 'hsl(258 90% 55%)',
    description: 'Purple & White Modern',
  },
];

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the server render
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative overflow-hidden"
        aria-label="Switch theme"
        disabled
      >
        <Palette className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative overflow-hidden"
          aria-label="Switch theme"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={cn(
              'flex items-center gap-3 cursor-pointer',
              currentTheme === theme.id && 'bg-muted'
            )}
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <div className="flex-1">
              <div className="font-medium text-foreground">{theme.name}</div>
              <div className="text-xs text-muted-foreground">{theme.description}</div>
            </div>
            {currentTheme === theme.id && (
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
