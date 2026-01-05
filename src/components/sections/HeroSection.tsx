"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import siteContentData from '@/data/siteContent.json';
import heroImage from '@/assets/hero-home.jpg';

export const HeroSection = () => {
  const { getHero } = useContentStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use source data for SSR to ensure consistency
  const sourceHero = siteContentData.hero;
  const storeHero = getHero();
  const hero = mounted ? storeHero : sourceHero;
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-85" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pretitle */}
          <p className="text-primary font-semibold tracking-widest text-sm md:text-base mb-6 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {hero.pretitle}
          </p>
          
          {/* Title */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-none mb-6">
            <span className="block animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              {hero.title}
            </span>
            {hero.titleLines.map((line, index) => (
              <span 
                key={index} 
                className="block animate-fade-up opacity-0"
                style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {line}
              </span>
            ))}
          </h1>
          
          {/* Description */}
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-6 animate-fade-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            {hero.description}
          </p>
          
          {/* Sub Description */}
          {hero.subDescription && (
            <p className="text-primary-foreground text-xl md:text-2xl font-semibold max-w-3xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
              {hero.subDescription}
            </p>
          )}
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Button variant="hero" size="xl" asChild>
              <Link href={hero.ctaLink}>{hero.ctaText}</Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link href={hero.secondaryCtaLink}>{hero.secondaryCtaText}</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
