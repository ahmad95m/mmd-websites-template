"use client";
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import type { Review } from '@/types/content';

interface ReviewCard3Props {
  review: Review;
  isActive: boolean;
}

const ReviewCard3 = ({ review, isActive }: ReviewCard3Props) => {
  return (
    <div className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
      <div className="bg-muted backdrop-blur-sm border border-border rounded-2xl p-8 h-full">
        {/* Quote Icon */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
          <Quote className="w-5 h-5 text-primary-foreground" />
        </div>
        
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        {/* Quote */}
        <blockquote className="text-foreground text-lg leading-relaxed mb-6">
          "{review.text}"
        </blockquote>
        
        {/* Author */}
        <div className="flex items-center gap-4 pt-6 border-t border-border">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-foreground">{review.name}</p>
            <p className="text-sm text-muted-foreground">via {review.source}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Reviews3 = () => {
  const { getReviews } = useContentStore();
  const reviews = getReviews();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, reviews.length - itemsPerView);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  
  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView);
  
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-foreground">
              WHAT FAMILIES{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SAY
              </span>
            </h2>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full border-border text-foreground hover:bg-muted disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-muted-foreground text-sm font-medium min-w-[60px] text-center">
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="rounded-full border-border text-foreground hover:bg-muted disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review, index) => (
            <ReviewCard3 key={review.id} review={review} isActive={true} />
          ))}
        </div>
      </div>
    </section>
  );
};