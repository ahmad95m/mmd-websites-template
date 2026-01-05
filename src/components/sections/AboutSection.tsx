"use client";
import Link from "next/link";
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import facilityImage from '@/assets/facility.jpg';

export const AboutSection = () => {
  const { getAbout } = useContentStore();
  const about = getAbout();
  
  return (
    <Section id="about">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src={facilityImage} 
              alt="APEX Martial Arts Academy Facility"
              className="w-full h-full object-cover"
              placeholder="blur"
            />
          </div>
          {/* Stats Overlay */}
          <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-lg hidden md:block">
            <div className="grid grid-cols-2 gap-6">
              {about.stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-heading text-3xl text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <SectionHeader
            pretitle={about.pretitle}
            title={about.title}
            align="left"
            className="mb-6"
          />
          <p className="text-foreground text-lg mb-4">
            {about.description}
          </p>
          <p className="text-muted-foreground mb-8">
            {about.longDescription}
          </p>

          {/* Team Commitments */}
          {about.team && about.team.length > 0 && about.team[0].commitments && about.team[0].commitments.length > 0 && (
            <div className="mb-8">
              <ul className="space-y-3">
                {about.team[0].commitments.map((commitment, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{commitment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor Note */}
          {about.team && about.team.length > 0 && about.team[0].instructorNote && (
            <div className="mb-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                {about.team[0].instructorNote}
              </p>
            </div>
          )}
          
          {/* Mobile Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8 md:hidden">
            {about.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-heading text-2xl text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <Button variant="cta" size="lg" asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
};
