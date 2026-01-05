"use client";
import { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

// Common icons for quick selection
const commonIcons = [
  'Shield', 'Heart', 'Trophy', 'Users', 'Star', 'Target', 'Zap', 'Award',
  'Clock', 'Calendar', 'CheckCircle', 'ArrowRight', 'Phone', 'Mail', 'MapPin',
  'Sparkles', 'Flame', 'Dumbbell', 'Medal', 'Crown', 'Sword', 'Activity'
];

interface IconFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export function IconField({
  label,
  value,
  onChange,
  required,
  helperText,
  className
}: IconFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const IconComponent = useMemo(() => {
    const iconName = value?.charAt(0).toUpperCase() + value?.slice(1).replace(/-./g, x => x[1].toUpperCase());
    const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
    return icons[iconName] || LucideIcons.HelpCircle;
  }, [value]);

  const filteredIcons = useMemo(() => {
    if (!search) return commonIcons;
    const searchLower = search.toLowerCase();
    return Object.keys(LucideIcons)
      .filter(name => 
        name.toLowerCase().includes(searchLower) && 
        typeof (LucideIcons as Record<string, unknown>)[name] === 'function'
      )
      .slice(0, 30);
  }, [search]);

  const handleSelectIcon = (iconName: string) => {
    // Convert PascalCase to kebab-case for storage
    const kebabName = iconName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    onChange(kebabName);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-destructive")}>
        {label}
      </Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <IconComponent className="h-4 w-4" />
            <span className="text-muted-foreground">
              {value || 'Select an icon...'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 border-b border-border">
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
          </div>
          <ScrollArea className="h-64">
            <div className="grid grid-cols-6 gap-1 p-2">
            {filteredIcons.map((iconName) => {
              const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
              const Icon = icons[iconName];
              if (!Icon) return null;
                
                const kebabName = iconName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                const isSelected = value === kebabName;
                
                return (
                  <Button
                    key={iconName}
                    variant={isSelected ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handleSelectIcon(iconName)}
                    title={iconName}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
