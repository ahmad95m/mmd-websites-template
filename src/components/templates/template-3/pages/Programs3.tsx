"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
import { ArrowRight, Check } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';

const imageMap: Record<string, any> = {
  'karate-kids': programKids,
  'adult': programAdults,
  'teens': programTeens,
  'tai-chi': programAdults,
  'leadership': programWarriors,
};

const ProgramsPage3 = () => {
  const { getPrograms, getSeo } = useContentStore();
  const programs = getPrograms();
  const seo = getSeo('programs');

  return (
    <Layout3>

      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3/programs"
      />
      
      <PageHero
        title="OUR PROGRAMS"
        highlightedWord="PROGRAMS"
        description="Training for every age and skill level"
        backgroundImage={heroImage.src}
      />

      {/* Programs */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {programs.map((program, index) => {
              const isEven = index % 2 === 0;
              const image = imageMap[program.slug] || programKids;
              
              return (
                <article 
                  key={program.id}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={`relative ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25" />
                    <div className="relative rounded-2xl overflow-hidden">
                      <Image 
                        src={image}
                        alt={program.name}
                        className="w-full h-[400px] object-cover"
                        placeholder="blur"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                        {program.ageRange}
                      </div>
                    </div>
                  </div>
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <h2 className="text-4xl font-black text-secondary-foreground mb-4">
                      {program.name}
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {program.longDescription}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {program.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-secondary-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider border-0 group"
                      asChild
                    >
                      <Link href={`/template-3/programs/${program.slug}`}>
                        {program.ctaText}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default ProgramsPage3;
