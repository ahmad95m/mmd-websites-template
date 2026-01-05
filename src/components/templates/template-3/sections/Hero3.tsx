"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { Play, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

export const Hero3 = () => {
  const { getHero, getAbout } = useContentStore();
  const hero = getHero();
  const about = getAbout();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Placeholder for video - using gradient as fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
        
        {/* Video would be here */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="/src/assets/hero-home.jpg"
        >
          {/* Add video source here when available */}
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-muted backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-muted-foreground">#1 Rated in Chandler, AZ</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] mb-6">
              {hero.title}
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-destructive bg-clip-text text-transparent">
                {hero.titleLines[0]}
              </span>
              <br />
              <span className="text-foreground/90">{hero.titleLines[1]}</span>
            </h1>
            
            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
              {hero.description}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider px-8 py-6 text-sm border-0 shadow-lg shadow-primary/25 group"
                asChild
              >
                <Link href="/template-3/schedule">
                  {hero.ctaText}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-muted hover:border-primary/30 font-bold uppercase tracking-wider px-8 py-6 text-sm backdrop-blur-sm"
                asChild
              >
                <Link href="/template-3/programs">
                  {hero.secondaryCtaText}
                </Link>
              </Button>
            </div>
            
            {/* Stats Row */}
            <div className="flex gap-8 pt-8 border-t border-border">
              {about.stats.slice(0, 3).map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Video Play Button */}
          <div className="hidden lg:flex items-center justify-center">
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-32 h-32 rounded-full bg-muted backdrop-blur-sm border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-12 h-12 text-foreground ml-2" fill="currentColor" />
              </div>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                Watch Video
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};