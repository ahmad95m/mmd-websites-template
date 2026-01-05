"use client";
import { TrendingUp, Check } from 'lucide-react';
import type { ProgramResult } from '@/types/content';

interface ProgramResultsSectionProps {
  results: ProgramResult[];
  programName: string;
}

export const ProgramResultsSection = ({ results, programName }: ProgramResultsSectionProps) => {
  return (
    <section className="section-padding bg-gradient-to-b from-muted to-background">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            {programName} MARTIAL ARTS
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mt-2">
            RESULTS AND <span className="text-primary">GROWTH</span> WITH EVERY CLASS!
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Beyond the kicks and punches, we're dedicated to nurturing essential values like respect, discipline, and integrity that will resonate far beyond the mat.
          </p>
        </div>
        
        {/* Results with alternating layout */}
        <div className="space-y-8">
          {results.map((result, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Number badge */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="font-heading text-3xl md:text-4xl text-primary font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Growth icon */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Content card */}
              <div className={`flex-1 bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50 ${
                index % 2 === 1 ? 'md:text-right' : ''
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl text-foreground">
                    {result.title}
                  </h3>
                </div>
                <p className="text-muted-foreground md:text-lg">{result.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
