"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { ArrowRight } from 'lucide-react';
import facilityImage from '@/assets/facility.jpg';

export const About2 = () => {
  const { getAbout } = useContentStore();
  const about = getAbout();
  
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header - Editorial */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Text */}
          <div className="lg:col-span-5">
            <p className="text-primary tracking-[0.3em] text-xs mb-4">{about.pretitle}</p>
            <h2 className="text-4xl lg:text-5xl font-light text-foreground leading-tight mb-8">
              {about.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {about.description}
            </p>
            <p className="text-muted-foreground/70 leading-relaxed mb-10">
              {about.longDescription}
            </p>
            
            <Button 
              variant="link" 
              className="p-0 text-foreground tracking-widest text-xs group"
              asChild
            >
              <Link href="/template-2/about" className="flex items-center gap-2">
                LEARN MORE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Right Column - Image with Stats */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <Image 
                  src={facilityImage}
                  alt="APEX Martial Arts Academy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  placeholder="blur"
                />
              </div>
              
              {/* Stats - Overlay */}
              <div className="absolute -bottom-12 -left-12 bg-background p-8 shadow-2xl hidden md:block">
                <div className="grid grid-cols-2 gap-8">
                  {about.stats.slice(0, 4).map((stat, index) => (
                    <div key={index}>
                      <p className="text-3xl font-light text-primary">{stat.value}</p>
                      <p className="text-xs tracking-widest text-muted-foreground uppercase mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 md:hidden">
          {about.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-light text-primary">{stat.value}</p>
              <p className="text-xs tracking-widest text-muted-foreground uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
