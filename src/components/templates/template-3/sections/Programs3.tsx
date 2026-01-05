"use client";
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import type { Program } from '@/types/content';

import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';

const imageMap: Record<string, StaticImageData> = {
  'karate-kids': programKids,
  'adult': programAdults,
  'teens': programTeens,
  // Fallbacks
  'little-champions': programKids,
  'junior-warriors': programWarriors,
  'teen-elite': programTeens,
};

interface ProgramCard3Props {
  program: Program;
  index: number;
}

const ProgramCard3 = ({ program, index }: ProgramCard3Props) => {

  const image = imageMap[program.slug] || programKids;

  
  return (
    <Link 
      href={`/template-3/programs/${program.slug}`}
      className="group block"
    >
      <div className="relative rounded-2xl overflow-hidden h-full bg-muted border border-border hover:border-primary/30 transition-all duration-500">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image 
            src={image}
            fill
            alt={program.name}
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          {/* Age Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {program.ageRange}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all">
            {program.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
            {program.shortDescription}
          </p>
          
          {/* Meta */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{program.schedule[0]?.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Small Groups</span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
            View Program
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Programs3 = () => {
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
            OUR PROGRAMS
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-secondary-foreground mb-4">
            MARTIAL ARTS{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FOR ALL AGES
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From our Little Champions program for young warriors to our Adult classes, we have the perfect program for everyone in your family.
          </p>
        </div>
        
        {/* Programs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <ProgramCard3 key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};