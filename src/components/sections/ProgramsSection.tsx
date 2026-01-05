"use client";
import Link from "next/link";
import Image, { StaticImageData } from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { useContentStore } from '@/store/useContentStore';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Program } from '@/types/content';

// Import images
import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';

const imageMap: Record<string, StaticImageData> = {
  'karate-kids': programKids,
  'adult': programAdults,
  'teens': programTeens,
  'tai-chi': programWarriors,
  'leadership': programAdults,
};

interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const image = imageMap[program.slug] || programKids;
  
  return (
    <Link 
      href={`/programs/${program.slug}`}
      className="group block h-full"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-500 h-full">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <Image 
            src={image}
            alt={program.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            placeholder="blur"
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <span className="text-primary font-semibold text-sm tracking-wider mb-2">
            {program.ageRange}
          </span>
          <h3 className="font-heading text-3xl text-primary-foreground mb-3 tracking-wide">
            {program.name}
          </h3>
          <p className="text-primary-foreground/80 text-sm mb-4 line-clamp-2">
            {program.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            View Program <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProgramsSection = () => {
  const { getPrograms } = useContentStore();
  const programs = getPrograms();
  
  return (
    <Section id="programs">
      <SectionHeader
        pretitle="OUR PROGRAMS"
        title="MARTIAL ARTS CLASSES FOR ALL AGES"
        description="Looking for the right martial arts class? Check out our variety of programs, designed for all ages and skills."
      />
      
      {/* Draggable Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {programs.map((program) => (
            <CarouselItem key={program.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
              <ProgramCard program={program} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="relative inset-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-y-0" />
        </div>
      </Carousel>
    </Section>
  );
};
