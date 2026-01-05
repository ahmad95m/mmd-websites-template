"use client";
import { Calendar, Award, Lightbulb, LucideIcon, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import type { WhyChooseItem } from '@/types/content';

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  award: Award,
  lightbulb: Lightbulb,
};

interface WhyChooseUsSectionProps {
  items: WhyChooseItem[];
  programName: string;
}

export const WhyChooseUsSection = ({ items, programName }: WhyChooseUsSectionProps) => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--secondary-foreground))_1px,_transparent_0)] bg-[length:40px_40px]" />
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            {programName} MARTIAL ARTS
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mt-2">
            WHY DO PARENTS <span className="text-primary">CHOOSE</span> OUR CLASSES?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Lightbulb;
            return (
              <div 
                key={index}
                className="group text-center bg-background/50 rounded-2xl p-8 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:bg-background/80"
              >
                {/* Icon with gradient ring */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5" />
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3 uppercase group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-secondary-foreground/70">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link href="/schedule">
              See Why Parents Love Us
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
