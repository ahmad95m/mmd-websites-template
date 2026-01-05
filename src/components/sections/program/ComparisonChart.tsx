"use client";
import { X, Check } from 'lucide-react';
import type { ComparisonData } from '@/types/content';

interface ComparisonChartProps {
  data: ComparisonData;
  siteName: string;
}

export const ComparisonChart = ({ data, siteName }: ComparisonChartProps) => {
  return (
    <section className="py-10 md:py-12 bg-background">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            COMPARISON CHART
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mt-2">
            SEE HOW {siteName.toUpperCase()} STACKS UP
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore our comparison between martial arts and traditional sports to see why martial arts could be a more beneficial choice for your child's overall growth.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Traditional Sports Column */}
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="font-heading text-2xl text-foreground mb-6 text-center uppercase">
              Traditional Sports
            </h3>
            <div className="space-y-6">
              {data.traditional.map((point, index) => (
                <div key={index} className="flex gap-4">
                  {/* Fixed red color - not theme-based for universal recognition */}
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{point.title}</h4>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Martial Arts Column */}
          <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-500 rounded-2xl p-8">
            <h3 className="font-heading text-2xl text-foreground mb-6 text-center uppercase">
              {siteName}
            </h3>
            <div className="space-y-6">
              {data.martialArts.map((point, index) => (
                <div key={index} className="flex gap-4">
                  {/* Fixed green color - not theme-based for universal recognition */}
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{point.title}</h4>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
