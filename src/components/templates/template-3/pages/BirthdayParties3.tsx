"use client";

import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContentStore } from '@/store/useContentStore';
import { Cake, Star, CheckCircle2, PartyPopper, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const BirthdayParties3 = () => {
  const { content } = useContentStore();
  const birthdayData = (content as any)?.birthdayParty;

  if (!birthdayData) return null;

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/programs/birthday-parties"
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Cake className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Celebrations</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
            BIRTHDAY <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PARTIES</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {birthdayData.subtitle}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <PartyPopper className="w-16 h-16 text-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground leading-relaxed">
            {birthdayData.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-foreground text-center mb-12">
            WHAT&apos;S <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">INCLUDED</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {birthdayData.features.map((feature: string, index: number) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-foreground text-center mb-4">
            PARTY <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PACKAGES</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Choose the perfect package for your celebration
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {birthdayData.packages.map((pkg: any, index: number) => (
              <div 
                key={index}
                className={cn(
                  'relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all hover:scale-105',
                  index === 1 
                    ? 'border-primary shadow-xl shadow-primary/20' 
                    : 'border-border'
                )}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-black text-foreground mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground mb-4">{pkg.guests}</p>
                <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                  {pkg.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    'w-full font-bold uppercase tracking-wider',
                    index === 1 
                      ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                      : ''
                  )}
                  variant={index === 1 ? "default" : "outline"}
                  asChild
                >
                  <Link href="/template-3/schedule">Book Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-foreground text-center mb-12">
            WHAT PARENTS <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SAY</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {birthdayData.testimonials.map((testimonial: any, index: number) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">&quot;{testimonial.text}&quot;</p>
                <p className="font-bold text-foreground">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl p-12 text-center border border-primary/30">
            <Cake className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-black text-foreground mb-4">
              READY TO BOOK?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Contact us today to check availability and plan the best birthday ever!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 font-bold uppercase tracking-wider px-8"
                asChild
              >
                <Link href="/template-3/schedule">Book Now</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="font-bold uppercase tracking-wider"
                asChild
              >
                <a href="tel:(480) 555-1234">Call Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout3>
  );
};

export default BirthdayParties3;