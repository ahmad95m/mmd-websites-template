"use client";
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';

export const Reviews2 = () => {
  const { getReviews } = useContentStore();
  const reviews = getReviews();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  
  const currentReview = reviews[currentIndex];
  
  return (
    <section className="py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Header */}
        <p className="text-primary tracking-[0.3em] text-xs mb-4">TESTIMONIALS</p>
        <h2 className="text-4xl lg:text-5xl font-light mb-20">
          WHAT OUR FAMILIES SAY
        </h2>
        
        {/* Single Review - Large Quote */}
        <div className="relative min-h-[300px] flex flex-col items-center justify-center">
          {/* Stars */}
          <div className="flex items-center gap-1 mb-8">
            {Array.from({ length: currentReview.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          
          {/* Quote */}
          <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed mb-8 max-w-3xl">
            "{currentReview.text}"
          </blockquote>
          
          {/* Author */}
          <div>
            <p className="font-medium text-lg">{currentReview.name}</p>
            <p className="text-sm text-secondary-foreground/60">via {currentReview.source}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="text-secondary-foreground hover:text-primary"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <span className="text-sm tracking-widest text-secondary-foreground/60">
            {String(currentIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="text-secondary-foreground hover:text-primary"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
