"use client";
import Image, { StaticImageData } from 'next/image';
import heroImage from '@/assets/hero-home.jpg';

interface PageHeroProps {
  title: string;
  highlightedWord?: string;
  description?: string;
  backgroundImage?: string | StaticImageData;
}

export const PageHero = ({ 
  title, 
  highlightedWord, 
  description, 
  backgroundImage = heroImage 
}: PageHeroProps) => {
  // Split title to highlight a specific word if provided
  const renderTitle = () => {
    if (!highlightedWord) {
      return <span className="text-primary">{title}</span>;
    }
    
    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-primary">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={typeof backgroundImage === 'string' ? undefined : backgroundImage.blurDataURL}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-4 animate-fade-up opacity-0" 
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          {renderTitle()}
        </h1>
        {description && (
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto animate-fade-up opacity-0"
             style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {description}
          </p>
        )}
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
