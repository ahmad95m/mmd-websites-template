"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
  error?: string;
  className?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  min,
  max,
  step = 1,
  helperText,
  error,
  className
}: NumberFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-destructive")}>
        {label}
      </Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(error && "border-destructive")}
      />
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
