"use client";
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'muted' | 'dark' | 'gradient';
}

export const Section = ({ 
  children, 
  className, 
  id,
  background = 'default' 
}: SectionProps) => {
  const bgClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    dark: 'bg-secondary text-secondary-foreground',
    gradient: 'bg-hero-gradient text-primary-foreground',
  };
  
  return (
    <section 
      id={id}
      className={cn(
        'px-4 sm:px-6 lg:px-8 py-10 md:py-12',
        bgClasses[background],
        className
      )}
    >
      <div className="container-wide">
        {children}
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  pretitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader = ({ 
  pretitle, 
  title, 
  description, 
  align = 'center',
  className 
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      'mb-8 md:mb-10',
      align === 'center' && 'text-center',
      className
    )}>
      {pretitle && (
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
          {pretitle}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
