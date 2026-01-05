"use client";
import Link from "next/link";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, Quote } from 'lucide-react';
import type { TeamMember } from '@/types/content';
import { getStaticImage } from '@/lib/imageMapper';


interface InstructorSectionProps {
  instructor: TeamMember;
  programName: string;
  siteName: string;
}

export const InstructorSection = ({ 
  instructor, 
  programName,
  siteName 
}: InstructorSectionProps) => {
  const learningPoints = [
    "Self-Discipline & Focus",
    "Respect for Others",
    "Goal Setting & Achievement",
    "Physical Fitness & Coordination",
    "Confidence & Self-Defense",
    "Leadership Skills"
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Instructor Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src={getStaticImage(instructor.image)} 
                alt={instructor.name}
                className="object-cover"
                fill
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              {/* Name badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <h3 className="font-heading text-xl text-foreground">{instructor.name}</h3>
                  <p className="text-primary text-sm font-medium">{instructor.title}</p>
                </div>
              </div>
            </div>
            
            {/* Decorative quote */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Letter Content */}
          <div>
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              A PERSONAL MESSAGE
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2 mb-6">
              Welcome to Our {programName} Program
            </h2>
            
            <div className="prose prose-lg text-muted-foreground mb-8">
              <p>
                Dear Parents,
              </p>
              <p>
                Thank you for considering {siteName} for your child&apos;s martial arts journey. 
                With over 30 years of experience and a passion for developing young leaders, 
                I&apos;ve seen firsthand the incredible transformations that happen when children 
                discover the power within themselves.
              </p>
              <p>
                Our {programName} program is more than just kicks and punches. It&apos;s a carefully 
                crafted curriculum designed to build character, instill discipline, and create 
                confident young people ready to take on life&apos;s challenges.
              </p>
            </div>

            {/* What They'll Learn */}
            <div className="mb-8">
              <h4 className="font-heading text-lg text-foreground mb-4">
                What Your Child Will Learn:
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {learningPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <p className="font-heading text-lg text-foreground italic">
                  I look forward to meeting your family!
                </p>
                <p className="text-primary font-semibold mt-1">— {instructor.name}</p>
              </div>
              <Button asChild size="lg" className="flex-shrink-0">
                <Link href="/schedule">Schedule a Trial Class</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
