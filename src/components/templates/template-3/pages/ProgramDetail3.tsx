"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
import { ArrowRight, Check, Clock } from 'lucide-react';
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

const ProgramDetail3 = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  const program = programs.find(p => p.slug === slug);
  
  useEffect(() => {
    if (!program) {
      router.replace('/template-3/programs');
    }
  }, [program, router]);

  if (!program) {
    return null;
  }
  
  const image = imageMap[program.slug] || programKids;

  return (
    <Layout3>
      <SEOHead
        canonicalUrl={`https://apexmartialarts.com/template-3/programs/${program.slug}`}
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            {program.ageRange}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-foreground">
            {program.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black text-secondary-foreground mb-6">About This Program</h2>
              <p className="text-muted-foreground leading-relaxed mb-12 text-lg">
                {program.longDescription}
              </p>
              
              <h3 className="text-2xl font-bold text-secondary-foreground mb-6">Program Features</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {program.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold text-secondary-foreground mb-6">Expected Results</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {program.results.map((result, i) => (
                  <div key={i} className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full" />
                    <div className="pl-6">
                      <h4 className="text-lg font-bold text-secondary-foreground mb-2">{result.title}</h4>
                      <p className="text-muted-foreground text-sm">{result.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-muted border border-border rounded-2xl p-8 sticky top-32">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Class Schedule
                </h3>
                <ul className="space-y-4 mb-8">
                  {program.schedule.map((slot, i) => (
                    <li key={i} className="flex justify-between text-sm border-b border-border pb-4 last:border-0">
                      <span className="text-foreground font-medium">{slot.day}</span>
                      <span className="text-primary">{slot.time}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider border-0"
                  asChild
                >
                  <Link href="/template-3/schedule">
                    {program.ctaText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default ProgramDetail3;