"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

export const Hero2 = () => {
  const { getHero } = useContentStore();
  const hero = getHero();
  
  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      />
      
      {/* Gradient Overlay - Editorial Style */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" />
      
      {/* Content - Bottom Left */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-primary font-light tracking-[0.4em] text-sm mb-6 animate-fade-in">
            {hero.pretitle}
          </p>
          
          {/* Title - Large Editorial */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-light text-primary-foreground leading-[0.9] mb-8 tracking-tight">
            <span className="block">{hero.title}</span>
            {hero.titleLines.map((line, index) => (
              <span key={index} className="block text-primary/80">
                {line}
              </span>
            ))}
          </h1>
          
          {/* Description */}
          <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-lg">
            {hero.description}
          </p>
          
          {/* CTAs - Minimal Style */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-none border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-secondary tracking-widest text-xs px-8 py-6"
              asChild
            >
              <Link href="/template-2/programs">{hero.ctaText}</Link>
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-primary-foreground tracking-widest text-xs group"
              asChild
            >
              <Link href="/template-2/schedule" className="flex items-center gap-2">
                {hero.secondaryCtaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Side Text - Editorial Detail */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="text-primary-foreground/30 text-xs tracking-[0.5em] uppercase rotate-90 origin-center whitespace-nowrap">
          Build Champions. Build Character.
        </p>
      </div>
    </section>
  );
};
