"use client";

import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { Star } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const ReviewsPage2 = () => {
  const { getReviews, getSeo } = useContentStore();
  const reviews = getReviews();
  const seo = getSeo('reviews');

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2/reviews"
      />
      
      <PageHero
        title="WHAT FAMILIES SAY"
        highlightedWord="FAMILIES"
        description="Real stories from our martial arts community"
        backgroundImage={heroImage.src}
      />

      {/* Reviews Grid */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className={`${index === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className={`text-foreground leading-relaxed mb-6 ${index === 0 ? 'text-2xl lg:text-3xl font-light' : 'text-lg'}`}>
                  "{review.text}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground font-light text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">via {review.source}</p>
                  </div>
                </div>
                {index < reviews.length - 1 && (
                  <div className="border-b border-border mt-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default ReviewsPage2;
