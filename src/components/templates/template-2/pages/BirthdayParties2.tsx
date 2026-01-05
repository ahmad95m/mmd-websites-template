"use client";

import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContentStore } from '@/store/useContentStore';
import { Cake, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const BirthdayParties2 = () => {
  const { content } = useContentStore();
  const birthdayData = (content as any)?.birthdayParty;

  if (!birthdayData) return null;

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/programs/birthday-parties"
      />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
        <div className="relative z-10 text-center px-6">
          <span className="text-primary tracking-[0.3em] text-sm uppercase mb-4 block">Celebrations</span>
          <h1 className="font-light text-5xl md:text-7xl text-secondary-foreground tracking-tight">
            Birthday Parties
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Cake className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-3xl font-light text-foreground mb-6 tracking-wide">{birthdayData.subtitle}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {birthdayData.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-foreground text-center mb-12 tracking-wide">What&apos;s Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {birthdayData.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-foreground text-center mb-4 tracking-wide">Party Packages</h2>
          <p className="text-muted-foreground text-center mb-16">Choose the perfect package for your celebration</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {birthdayData.packages.map((pkg: any, index: number) => (
              <div 
                key={index}
                className={cn(
                  'relative bg-card p-8 border transition-all hover:shadow-lg',
                  index === 1 ? 'border-primary' : 'border-border'
                )}
              >
                {index === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs tracking-widest uppercase">
                    Popular
                  </span>
                )}
                
                <h3 className="text-xl font-light text-foreground mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.guests}</p>
                <div className="text-4xl font-light text-primary mb-8">{pkg.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={index === 1 ? "default" : "outline"} 
                  className="w-full rounded-none tracking-widest"
                  asChild
                >
                  <Link href="/template-2/schedule">Book Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-light text-foreground text-center mb-12 tracking-wide">What Parents Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {birthdayData.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-card p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">&quot;{testimonial.text}&quot;</p>
                <p className="text-sm font-medium text-foreground">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light text-foreground mb-6 tracking-wide">Ready to Book?</h2>
          <p className="text-muted-foreground mb-8">
            Contact us today to check availability and plan the best birthday ever!
          </p>
          <Button size="lg" className="rounded-none tracking-widest px-12" asChild>
            <Link href="/template-2/schedule">Schedule Party</Link>
          </Button>
        </div>
      </section>
    </Layout2>
  );
};

export default BirthdayParties2;