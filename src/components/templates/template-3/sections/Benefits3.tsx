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

interface BenefitCard3Props {
  benefit: BenefitItem;
  index: number;
}

const BenefitCard3 = ({ benefit, index }: BenefitCard3Props) => {
  const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Star;
  
  return (
    <div className="group relative">
      {/* Hover Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      
      <div className="relative bg-muted backdrop-blur-sm border border-border rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide">
          {benefit.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </div>
  );
};

export const Benefits3 = () => {
  const { getBenefits } = useContentStore();
  const benefits = getBenefits();
  
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
            {benefits.pretitle}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground max-w-3xl mx-auto leading-tight">
            {benefits.title}
          </h2>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.items.map((benefit, index) => (
            <BenefitCard3 key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};