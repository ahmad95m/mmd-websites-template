"use client";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { ReactNode } from 'react';

interface ArrayFieldProps<T> {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (value: T) => void) => ReactNode;
  defaultItem: T;
  addLabel?: string;
  maxItems?: number;
  className?: string;
}

export function ArrayField<T>({
  label,
  items,
  onChange,
  renderItem,
  defaultItem,
  addLabel = "Add Item",
  maxItems,
  className
}: ArrayFieldProps<T>) {
  const handleAdd = () => {
    if (maxItems && items.length >= maxItems) return;
    onChange([...items, { ...defaultItem }]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleItemChange = (index: number, value: T) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onChange(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    onChange(newItems);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-base">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {items.length} item{items.length !== 1 ? 's' : ''}
          {maxItems && ` / ${maxItems} max`}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-3">
              {/* Drag Handle & Position Controls */}
              <div className="flex flex-col items-center gap-1 pt-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <div className="flex flex-col gap-0.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <span className="text-xs">▲</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === items.length - 1}
                  >
                    <span className="text-xs">▼</span>
                  </Button>
                </div>
              </div>

              {/* Item Content */}
              <div className="flex-1">
                {renderItem(item, index, (value) => handleItemChange(index, value))}
              </div>

              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        disabled={maxItems ? items.length >= maxItems : false}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        {addLabel}
      </Button>
    </div>
  );
}
