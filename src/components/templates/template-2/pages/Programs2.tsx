"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';

const imageMap: Record<string, StaticImageData> = {
  'karate-kids': programKids,
  'adult': programAdults,
  'teens': programTeens,
  'tai-chi': programAdults,
  'leadership': programWarriors,
};

const ProgramsPage2 = () => {
  const { getPrograms, getSeo } = useContentStore();
  const programs = getPrograms();
  const seo = getSeo('programs');

  return (
    <Layout2>

      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2/programs"
      />
      
      <PageHero
        title="OUR PROGRAMS"
        highlightedWord="PROGRAMS"
        description="Training for every age and skill level"
        backgroundImage={heroImage.src}
      />

      {/* Programs */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {programs.map((program, index) => {
              const isEven = index % 2 === 0;
              const image = imageMap[program.slug] || programKids;
              
              return (
                <article 
                  key={program.id}
                  className={`grid lg:grid-cols-2 gap-16 items-center`}
                >
                  <div className={`aspect-[4/3] overflow-hidden relative ${!isEven ? 'lg:order-2' : ''}`}>
                    <Image 
                      src={image}
                      alt={program.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <span className="text-primary tracking-[0.3em] text-xs">
                      {program.ageRange}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-light text-foreground mt-2 mb-6">
                      {program.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {program.longDescription}
                    </p>
                    <ul className="space-y-3 mb-10">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={`/template-2/programs/${program.slug}`}
                      className="inline-flex items-center gap-2 text-foreground tracking-widest text-sm uppercase hover:text-primary transition-colors group"
                    >
                      {program.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default ProgramsPage2;
