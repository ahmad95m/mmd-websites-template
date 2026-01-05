"use client";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SwitchFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function SwitchField({
  label,
  value,
  onChange,
  description,
  disabled,
  className
}: SwitchFieldProps) {
  return (
    <div className={cn("flex items-center justify-between rounded-lg border border-border p-4", className)}>
      <div className="space-y-0.5">
        <Label className="text-base">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
