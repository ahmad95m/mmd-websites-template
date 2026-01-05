"use client";
import type { EducationalItem } from '@/types/content';
import { Brain, Target, Heart, Shield, Zap, Users, Star, Lightbulb } from 'lucide-react';

interface EducationalContentProps {
  items: EducationalItem[];
  siteName: string;
}

const iconMap: Record<number, React.ElementType> = {
  0: Brain,
  1: Target,
  2: Heart,
  3: Shield,
  4: Zap,
  5: Users,
  6: Star,
  7: Lightbulb,
};

export const EducationalContent = ({ items, siteName }: EducationalContentProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Unique Curriculum
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground uppercase">
            What Sets Us Apart
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our exclusive educational content developed specifically for our students
          </p>
        </div>

        {/* Educational Items - Alternating Layout */}
        <div className="space-y-20">
          {items.map((item, index) => {
            const Icon = iconMap[index % 8];
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
              >
                {/* Icon/Visual Side */}
                <div className="w-full lg:w-2/5 flex justify-center">
                  <div className="relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
                    
                    {/* Main Card */}
                    <div className="relative bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          {/* Outer Ring */}
                          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" 
                               style={{ transform: 'scale(1.5)' }} />
                          
                          {/* Icon Container */}
                          <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg">
                            <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Number Badge */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-xl font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-3/5 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {item.description}
                  </p>
                  
                  {/* Decorative Line */}
                  <div className={`mt-8 flex ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Accent */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-border" />
            <span className="text-muted-foreground text-sm uppercase tracking-widest">
              Only at {siteName}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
};
