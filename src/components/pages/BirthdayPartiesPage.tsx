"use client";
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContentStore } from '@/store/useContentStore';
import { Cake, Star, PartyPopper, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-home.jpg';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const BirthdayPartiesPage = () => {
  const { content } = useContentStore();
  const birthdayData = (content as any)?.birthdayParty;
  const { isVisible } = useSectionVisibility('birthday');

  if (!birthdayData) {
    return null;
  }

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/programs/birthday-parties"
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <section className="relative pt-32 pb-20">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage.src})` }}
          />
          <div className="absolute inset-0 bg-secondary/90" />
          <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary font-semibold text-sm mb-4">
              <Cake className="inline w-4 h-4 mr-2" />
              CELEBRATIONS
            </span>
            <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-4">
              {birthdayData.title.split(' ').map((word: string, i: number) => 
                i === 0 ? <span key={i} className="text-primary">{word} </span> : word + ' '
              )}
            </h1>
            <p className="text-primary-foreground/80 text-xl max-w-3xl mx-auto">
              {birthdayData.subtitle}
            </p>
          </div>
        </section>
      )}

      {/* Description */}
      {isVisible('hero') && (
        <Section>
          <div className="text-center max-w-4xl mx-auto">
            <PartyPopper className="w-16 h-16 text-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              {birthdayData.description}
            </p>
          </div>
        </Section>
      )}

      {/* Features */}
      {isVisible('features') && (
        <Section className="bg-muted/30">
          <h2 className="font-heading text-4xl text-foreground text-center mb-12">
            What's <span className="text-primary">Included</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {birthdayData.features.map((feature: string, index: number) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Packages */}
      {isVisible('packages') && (
        <Section>
          <h2 className="font-heading text-4xl text-foreground text-center mb-4">
            Party <span className="text-primary">Packages</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Choose the perfect package for your celebration. All packages include setup, cleanup, and memories that last a lifetime!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {birthdayData.packages.map((pkg: any, index: number) => (
              <div 
                key={index}
                className={cn(
                  'relative bg-card rounded-2xl p-8 border-2 transition-all hover:scale-105',
                  index === 1 
                    ? 'border-primary shadow-xl shadow-primary/20' 
                    : 'border-border'
                )}
              >
                {index === 1 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                    MOST POPULAR
                  </span>
                )}
                
                <h3 className="font-heading text-2xl text-foreground mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground mb-4">{pkg.guests}</p>
                <div className="text-4xl font-heading text-primary mb-6">{pkg.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={index === 1 ? "cta" : "outline"} 
                  className="w-full"
                  asChild
                >
                  <Link href="/schedule">Book This Package</Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {isVisible('testimonials') && (
        <Section className="bg-muted/30">
          <h2 className="font-heading text-4xl text-foreground text-center mb-12">
            What Parents <span className="text-primary">Say</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {birthdayData.testimonials.map((testimonial: any, index: number) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      {isVisible('cta') && (
        <Section>
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center">
            <Cake className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="font-heading text-4xl text-primary-foreground mb-4">
              Ready to Plan the Best Birthday Ever?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Contact us today to check availability and book your child's martial arts birthday party!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/schedule">Book Now</Link>
              </Button>
              <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="tel:(480) 555-1234">Call Us</a>
              </Button>
            </div>
          </div>
        </Section>
      )}
    </Layout>
  );
};

export { BirthdayPartiesPage };
