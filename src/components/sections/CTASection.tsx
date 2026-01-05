"use client";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import patternBg from '@/assets/pattern-bg.jpg';

export const CTASection = () => {
  const { getCta } = useContentStore();
  const cta = getCta();
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${patternBg.src})` }}
      />
      <div className="absolute inset-0 bg-secondary/95" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-primary font-semibold tracking-widest text-sm mb-4">
          {cta.urgencyText}
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary-foreground mb-6 max-w-3xl mx-auto">
          {cta.title}
        </h2>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          {cta.description}
        </p>
        <Button variant="hero" size="xl" className="animate-pulse-glow" asChild>
          <Link href={cta.buttonLink}>{cta.buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};
