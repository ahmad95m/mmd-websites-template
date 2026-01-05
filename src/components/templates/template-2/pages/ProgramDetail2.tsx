"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect } from 'react';

import programKids from '@/assets/program-kids.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';
import programTaiChi from '@/assets/program-taichi.jpg';
import programLeadership from '@/assets/program-leadership.jpg';

const imageMap: Record<string, StaticImageData> = {
  'karate-kids': programKids,
  'adult': programAdults,
  'teens': programTeens,
  'tai-chi': programTaiChi,
  'leadership': programLeadership,
};

const ProgramDetail2 = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  const program = programs.find(p => p.slug === slug);
  
  useEffect(() => {
    if (!program) {
      router.replace('/template-2/programs');
    }
  }, [program, router]);

  if (!program) {
    return null;
  }
  
  const image = imageMap[program.slug] || programKids;

  return (
    <Layout2>
      <SEOHead
        canonicalUrl={`https://apexmartialarts.com/template-2/programs/${program.slug}`}
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-end">
        <Image
          src={image}
          alt={program.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-primary tracking-[0.3em] text-xs mb-4">{program.ageRange}</p>
          <h1 className="text-5xl lg:text-7xl font-light text-primary-foreground">
            {program.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-light text-foreground mb-6">About This Program</h2>
              <p className="text-muted-foreground leading-relaxed mb-12">
                {program.longDescription}
              </p>
              
              <h3 className="text-2xl font-light text-foreground mb-6">Program Features</h3>
              <ul className="space-y-4 mb-12">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-2xl font-light text-foreground mb-6">Expected Results</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {program.results.map((result, i) => (
                  <div key={i} className="border-l-2 border-primary pl-6">
                    <h4 className="text-lg font-light text-foreground mb-2">{result.title}</h4>
                    <p className="text-muted-foreground text-sm">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-muted p-8 sticky top-32">
                <h3 className="text-xl font-light text-foreground mb-6">Class Schedule</h3>
                <ul className="space-y-4 mb-8">
                  {program.schedule.map((slot, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-foreground">{slot.day}</span>
                      <span className="text-muted-foreground">{slot.time}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full rounded-none border-2 border-foreground text-foreground hover:bg-foreground hover:text-background tracking-widest text-xs"
                  asChild
                >
                  <Link href="/template-2/schedule">
                    {program.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default ProgramDetail2;
