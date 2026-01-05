"use client";
import { Star, Target, Zap, Heart, Users, Shield } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import type { BenefitItem } from '@/types/content';

const iconMap = {
  star: Star,
  target: Target,
  zap: Zap,
  heart: Heart,
  users: Users,
  shield: Shield,
};

interface BenefitCard2Props {
  benefit: BenefitItem;
  index: number;
}

const BenefitCard2 = ({ benefit, index }: BenefitCard2Props) => {
  const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Star;
  
  return (
    <div className="group border-b border-border py-8 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-8">
        <span className="text-4xl font-light text-primary/30">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <Icon className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-light tracking-widest text-foreground uppercase">
              {benefit.title}
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed pl-9">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Benefits2 = () => {
  const { getBenefits } = useContentStore();
  const benefits = getBenefits();
  
  return (
    <section className="py-32 bg-muted">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-primary tracking-[0.3em] text-xs mb-4">
              {benefits.pretitle}
            </p>
            <h2 className="text-4xl lg:text-5xl font-light text-foreground leading-tight">
              {benefits.title}
            </h2>
          </div>
          
          {/* Right Column - Benefits List */}
          <div>
            {benefits.items.map((benefit, index) => (
              <BenefitCard2 key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
