"use client";

import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
import { Star, Quote } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const ReviewsPage3 = () => {
  const { getReviews, getSeo } = useContentStore();
  const reviews = getReviews();
  const seo = getSeo('reviews');

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3/reviews"
      />
      
      <PageHero
        title="WHAT FAMILIES SAY"
        highlightedWord="FAMILIES"
        description="Real stories from our martial arts community"
        backgroundImage={heroImage.src}
      />

      {/* Reviews Grid */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Review */}
          {reviews[0] && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-3xl p-10 mb-12">
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: reviews[0].rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-12 h-12 text-primary/30 mb-4" />
              <blockquote className="text-2xl lg:text-3xl font-light text-secondary-foreground leading-relaxed mb-8">
                "{reviews[0].text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {reviews[0].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-secondary-foreground text-lg">{reviews[0].name}</p>
                  <p className="text-muted-foreground">via {reviews[0].source}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(1).map((review) => (
              <div 
                key={review.id} 
                className="bg-muted border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-foreground leading-relaxed mb-6">
                  "{review.text}"
                </blockquote>
                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">via {review.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default ReviewsPage3;
