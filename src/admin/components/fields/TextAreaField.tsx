"use client";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  showCount?: boolean;
  helperText?: string;
  error?: string;
  rows?: number;
  className?: string;
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  maxLength,
  showCount,
  helperText,
  error,
  rows = 4,
  className
}: TextAreaFieldProps) {
  const charCount = value?.length || 0;
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-destructive")}>
          {label}
        </Label>
        {showCount && maxLength && (
          <span className={cn(
            "text-xs",
            charCount > maxLength ? "text-destructive" : "text-muted-foreground"
          )}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <Textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
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
