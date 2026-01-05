"use client";
import { Star } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { SourceIcon } from '@/components/ui/SourceIcon';
import { useContentStore } from '@/store/useContentStore';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Review } from '@/types/content';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card h-full flex flex-col">
      {/* Header with icon and name */}
      <div className="flex items-start gap-3 mb-3">
        <SourceIcon source={review.source} />
        <div>
          <p className="font-semibold text-foreground">{review.name}</p>
          <p className="text-sm text-muted-foreground">via {review.source}</p>
        </div>
      </div>
      
      {/* Star rating */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>
      
      {/* Review text */}
      <p className="text-foreground flex-1 leading-relaxed">
        "{review.text}"
      </p>
    </div>
  );
};

export const ReviewsSection = () => {
  const { getReviews } = useContentStore();
  const reviews = getReviews();
  
  // Find featured review
  const featuredReview = reviews.find(review => review.featured);
  
  return (
    <Section background="muted" id="reviews">
      <SectionHeader
        pretitle="TESTIMONIALS"
        title="WHAT OUR FAMILIES SAY"
        description="See what our members are saying! Browse through the reviews to get a glimpse of the BE Martial Arts experience."
      />
      
      {/* Featured Review */}
      {featuredReview && featuredReview.featuredTitle && (
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-heading text-center mb-8 text-foreground">
            {featuredReview.featuredTitle}
          </h3>
          <div className="max-w-3xl mx-auto">
            <ReviewCard review={featuredReview} />
          </div>
        </div>
      )}
      
      {/* Draggable Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="relative inset-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-y-0" />
        </div>
      </Carousel>
    </Section>
  );
};
