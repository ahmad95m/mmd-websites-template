"use client";
import Link from "next/link";
import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ProgramHeroProps {
  name: string;
  ageRange: string;
  shortDescription: string;
  ctaText: string;
  backgroundImage: string | StaticImageData;
}

export const ProgramHero = ({ 
  name, 
  ageRange, 
  shortDescription, 
  ctaText, 
  backgroundImage 
}: ProgramHeroProps) => {
  const scrollToContent = () => {
    const nextSection = document.querySelector('.program-content-start');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden pt-24 lg:pt-28">
      {/* Background Image with Dark Overlay */}
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={name}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={typeof backgroundImage === 'string' ? undefined : backgroundImage.blurDataURL}
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/50" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--secondary-foreground))_1px,_transparent_0)] bg-[length:32px_32px]" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-2xl">
          {/* Animated pretitle badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
              {ageRange} MARTIAL ARTS
            </span>
          </div>
          
          {/* Main title with gradient accent */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-secondary-foreground mb-6 leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="block">{name}</span>
            <span className="block text-primary mt-2">Program</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {shortDescription}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Link href="/schedule">{ctaText}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative side element */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-60" />

      {/* Scroll down indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary-foreground/70 hover:text-primary transition-colors group cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
          Scroll Down
        </span>
        <div className="w-10 h-10 rounded-full border border-secondary-foreground/30 flex items-center justify-center group-hover:border-primary/50 transition-colors">
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </button>
    </section>
  );
};
