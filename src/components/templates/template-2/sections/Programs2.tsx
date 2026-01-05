"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import type { Program } from '@/types/content';

import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';

const imageMap: Record<string, any> = {
  'little-champions': programKids,
  'junior-warriors': programWarriors,
  'teen-elite': programTeens,
  'adult': programAdults,
};

interface ProgramCard2Props {
  program: Program;
  index: number;
}

const ProgramCard2 = ({ program, index }: ProgramCard2Props) => {

  const image = imageMap[program.slug] || programKids;

  const isEven = index % 2 === 0;
  
  return (
    <Link 
      href={`/template-2/programs/${program.slug}`}
      className="group block"
    >
      <div className={`grid md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
        {/* Image */}
        <div className={`aspect-[4/3] overflow-hidden ${!isEven ? 'md:order-2' : ''}`}>
          <Image 
            src={image}
            alt={program.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            placeholder="blur"
          />
        </div>
        
        {/* Content */}
        <div className={`${!isEven ? 'md:order-1 md:text-right' : ''}`}>
          <span className="text-primary tracking-[0.3em] text-xs">
            {program.ageRange}
          </span>
          <h3 className="text-3xl lg:text-4xl font-light text-foreground mt-2 mb-4 tracking-wide">
            {program.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {program.shortDescription}
          </p>
          <div className={`flex items-center gap-2 text-foreground text-sm tracking-widest uppercase group-hover:text-primary transition-colors ${!isEven ? 'md:justify-end' : ''}`}>
            View Program 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Programs2 = () => {
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary tracking-[0.3em] text-xs mb-4">OUR PROGRAMS</p>
          <h2 className="text-4xl lg:text-5xl font-light text-foreground">
            MARTIAL ARTS CLASSES
            <br />
            <span className="text-primary">FOR ALL AGES</span>
          </h2>
        </div>
        
        {/* Programs List */}
        <div className="space-y-20">
          {programs.map((program, index) => (
            <ProgramCard2 key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
