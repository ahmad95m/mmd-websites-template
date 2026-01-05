"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTA3 = () => {
  const { getCta } = useContentStore();
  const cta = getCta();
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-destructive" />
      <div className="absolute inset-0 bg-background/40" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-sm text-primary-foreground font-medium">{cta.urgencyText}</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 leading-tight">
          {cta.title}
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {cta.description}
        </p>
        
        <Button 
          size="lg"
          className="bg-background text-foreground hover:bg-background/90 font-bold uppercase tracking-wider px-10 py-6 text-sm shadow-2xl shadow-background/25 group"
          asChild
        >
          <Link href="/template-3/schedule">
            {cta.buttonText}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
};