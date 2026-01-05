"use client";
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section, SectionHeader } from '@/components/ui/Section';
import { useContentStore } from '@/store/useContentStore';
import { Star, Quote } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const ReviewsPage = () => {
  const { getReviews, getSiteInfo } = useContentStore();
  const reviews = getReviews();
  const site = getSiteInfo();
  const { isVisible } = useSectionVisibility('reviews');

  // Calculate stats
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/reviews"
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Reviews', url: 'https://apexmartialarts.com/reviews' }
        ]}
        localBusiness={{
          name: site.name,
          description: `${averageRating.toFixed(1)}-star rated martial arts academy with ${reviews.length}+ reviews`,
          phone: site.phone,
          email: site.email,
          address: {
            street: '1250 W Chandler Blvd, Suite 100',
            city: 'Chandler',
            state: 'AZ',
            zip: '85224'
          }
        }}
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <>
          <PageHero 
            title="STUDENT REVIEWS"
            highlightedWord="REVIEWS"
            description={`See what our families are saying about their experience at ${site.name}`}
          />
          
          {/* Rating Summary - After Hero */}
          <div className="bg-background py-8 -mt-8 relative z-20">
            <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-4 bg-card rounded-full px-8 py-4 shadow-card">
                <div className="flex gap-1" role="img" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </div>
                <span className="font-heading text-3xl text-foreground">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {isVisible('list') && (
        <Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <article key={review.id} className="bg-card rounded-2xl p-8 shadow-card h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" aria-hidden="true" />
                <blockquote className="text-foreground flex-1 mb-6 leading-relaxed">
                  "{review.text}"
                </blockquote>
                <footer className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <cite className="font-semibold text-foreground not-italic">{review.name}</cite>
                    <p className="text-sm text-muted-foreground">via {review.source}</p>
                  </div>
                  <time className="text-xs text-muted-foreground" dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </time>
                </footer>
              </article>
            ))}
          </div>
        </Section>
      )}

      {isVisible('cta') && <CTASection />}
    </Layout>
  );
};

export { ReviewsPage };
