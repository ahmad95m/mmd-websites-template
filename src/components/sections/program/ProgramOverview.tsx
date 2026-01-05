"use client";
import Link from "next/link";
import { Check, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScheduleItem } from '@/types/content';

interface ProgramOverviewProps {
  longDescription: string;
  extendedDescription?: string;
  features: string[];
  schedule: ScheduleItem[];
}

export const ProgramOverview = ({ 
  longDescription, 
  extendedDescription,
  features, 
  schedule 
}: ProgramOverviewProps) => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
              ABOUT THIS PROGRAM
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {longDescription}
            </p>
            {extendedDescription && (
              <p className="text-muted-foreground text-lg mb-8">
                {extendedDescription}
              </p>
            )}
            
            <h3 className="font-heading text-2xl text-foreground mb-4">WHAT'S INCLUDED</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            {/* Schedule Card */}
            <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
              <h3 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
                CLASS SCHEDULE
              </h3>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <span className="font-medium text-foreground">{item.day}</span>
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Card */}
            <div className="bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-heading text-2xl text-primary-foreground mb-4">
                READY TO START?
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Schedule your FREE trial class today and experience the difference!
              </p>
              <Button variant="heroOutline" size="lg" className="w-full" asChild>
                <Link href="/schedule">Schedule Free Class</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
