"use client";
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SourceIcon } from '@/components/ui/SourceIcon';
import type { Review } from '@/types/content';

interface ProgramReviewsProps {
  reviews: Review[];
  siteName: string;
}

export const ProgramReviews = ({ reviews, siteName }: ProgramReviewsProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-secondary">
      <div className="container-wide">
        <div className="text-center mb-8">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            REVIEWS & FEEDBACK
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mt-2">
            MEMBER REVIEWS OF {siteName.toUpperCase()}
          </h2>
          <p className="text-secondary-foreground/70 mt-3 max-w-2xl mx-auto">
            Dive into the real stories! Check out genuine reviews from our martial arts family.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviews.slice(0, 6).map((review) => (
              <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-card rounded-xl p-5 h-full shadow-card">
                  {/* Header with icon and name */}
                  <div className="flex items-start gap-3 mb-3">
                    <SourceIcon source={review.source} />
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">via {review.source}</p>
                    </div>
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
                    ))}
                  </div>
                  
                  {/* Review text */}
                  <p className="text-foreground line-clamp-4">
                    "{review.text}"
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};
