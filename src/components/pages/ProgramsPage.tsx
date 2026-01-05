"use client";
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { ArrowRight } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

// Import images
import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';

const imageMap: Record<string, StaticImageData> = {
  'little-champions': programKids,
  'junior-warriors': programWarriors,
  'teen-elite': programTeens,
  'adult': programAdults,
};

const ProgramsPage = () => {
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  const { isVisible } = useSectionVisibility('programs');

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/programs"
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Programs', url: 'https://apexmartialarts.com/programs' }
        ]}
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <PageHero 
          title="OUR PROGRAMS"
          highlightedWord="PROGRAMS"
          description="Discover the perfect martial arts program for you or your child. Each program is designed to build confidence, discipline, and physical fitness."
        />
      )}

      {isVisible('list') && (
        <Section>
          <div className="space-y-16">
            {programs.map((program, index) => {
              const isEven = index % 2 === 0;
              const image = imageMap[program.slug] || programKids;
              
              return (
                <article 
                  key={program.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg relative">
                      <Image 
                        src={image}
                        alt={`${program.name} - Martial arts program for ${program.ageRange}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <span className="text-primary font-semibold text-sm tracking-widest">
                      {program.ageRange}
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-2 mb-4">
                      {program.name}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {program.longDescription}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {program.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="cta" size="lg" asChild>
                      <Link href={`/programs/${program.slug}`}>
                        {program.ctaText} <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      )}

      {isVisible('cta') && <CTASection />}
    </Layout>
  );
};

export { ProgramsPage };
