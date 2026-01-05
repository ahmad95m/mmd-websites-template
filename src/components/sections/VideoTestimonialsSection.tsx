"use client";
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Play, Star, Quote, X } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Import images properly
import facilityImg from '@/assets/facility.jpg';
import programAdultsImg from '@/assets/program-adults.jpg';
import programKidsImg from '@/assets/program-kids.jpg';

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  thumbnail: string | StaticImageData;
  videoUrl: string;
  quote: string;
  rating: number;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "The Martinez Family",
    role: "Parents of Junior Warrior",
    thumbnail: facilityImg,
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    quote: "BE Martial Arts changed our son's life. His confidence has skyrocketed!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Adult Student",
    thumbnail: programAdultsImg,
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    quote: "Best workout and stress relief I've ever found.",
    rating: 5
  },
  {
    id: 3,
    name: "The Chen Family",
    role: "Parents of Little Champion",
    thumbnail: programKidsImg,
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    quote: "The coaches are amazing with young kids!",
    rating: 5
  }
];

interface TestimonialCardProps {
  testimonial: VideoTestimonial;
  onClick: () => void;
}

const TestimonialCard = ({ testimonial, onClick }: TestimonialCardProps) => (
  <div
    className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all cursor-pointer h-full"
    onClick={onClick}
  >
    {/* Thumbnail */}
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={testimonial.thumbnail}
        alt={testimonial.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-secondary/50 group-hover:bg-secondary/40 transition-colors" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
          <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground ml-1" />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote className="w-6 h-6 text-primary/30 absolute -top-2 -left-1" />
        <p className="text-foreground font-medium italic pl-5">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author */}
      <div>
        <p className="font-heading text-lg text-foreground">
          {testimonial.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {testimonial.role}
        </p>
      </div>
    </div>
  </div>
);

export const VideoTestimonialsSection = () => {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <>
      <Section background="muted">
        <SectionHeader
          pretitle="SUCCESS STORIES"
          title="Hear From Our Families"
          description="Watch real testimonials from parents and students who have experienced the BE Martial Arts difference."
          align="center"
        />

        {/* Draggable Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          className="w-full mt-12"
        >
          <CarouselContent className="-ml-4">
            {videoTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <TestimonialCard 
                  testimonial={testimonial} 
                  onClick={() => setActiveVideo(testimonial)} 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="relative inset-0 translate-y-0" />
            <CarouselNext className="relative inset-0 translate-y-0" />
          </div>
        </Carousel>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border">
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-primary">500+</p>
            <p className="text-muted-foreground mt-1">Happy Families</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-primary">4.9</p>
            <p className="text-muted-foreground mt-1">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-primary">200+</p>
            <p className="text-muted-foreground mt-1">5-Star Reviews</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl md:text-5xl text-primary">15+</p>
            <p className="text-muted-foreground mt-1">Years Experience</p>
          </div>
        </div>
      </Section>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              onClick={() => setActiveVideo(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src={activeVideo.videoUrl}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Testimonial from ${activeVideo.name}`}
            />
          </div>
        </div>
      )}
    </>
  );
};
