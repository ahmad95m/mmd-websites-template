"use client";
import { Hand, Sparkles, Users, Shield, Target, Brain, Trophy, Dumbbell, Heart, Star, Zap, Ear, LucideIcon } from 'lucide-react';
import type { ProgramBenefit } from '@/types/content';

const iconMap: Record<string, LucideIcon> = {
  hand: Hand,
  sparkles: Sparkles,
  users: Users,
  shield: Shield,
  target: Target,
  brain: Brain,
  trophy: Trophy,
  dumbbell: Dumbbell,
  heart: Heart,
  star: Star,
  zap: Zap,
  ear: Ear,
};

interface ProgramBenefitsGridProps {
  benefits: ProgramBenefit[];
  pretitle?: string;
  title?: string;
}

export const ProgramBenefitsGrid = ({ 
  benefits, 
  pretitle = "BENEFITS OF OUR MARTIAL ARTS CLASSES",
  title = "Is your child ready for these positive transformations?"
}: ProgramBenefitsGridProps) => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            {pretitle}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mt-2">
            {title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Sparkles;
            return (
              <div 
                key={index}
                className="group bg-card rounded-xl p-8 text-center shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30"
              >
                {/* Gradient Icon Container */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full group-hover:from-primary/30 group-hover:to-primary/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </div>
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-xl transition-colors" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3 uppercase group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
