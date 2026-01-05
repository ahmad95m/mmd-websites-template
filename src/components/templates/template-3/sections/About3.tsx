"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import facilityImage from '@/assets/facility.jpg';

export const About3 = () => {
  const { getAbout } = useContentStore();
  const about = getAbout();
  
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with Decorative Frame */}
          <div className="relative">
            {/* Neon Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25" />
            
            <div className="relative rounded-2xl overflow-hidden h-[500px]">
              <Image 
                src={facilityImage}
                alt="APEX Martial Arts Academy"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-xl rounded-xl p-6 border border-border">
                <div className="grid grid-cols-4 gap-4">
                  {about.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-black text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
              {about.pretitle}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-secondary-foreground mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                APEX
              </span>
            </h2>
            <p className="text-secondary-foreground/70 text-lg mb-6 leading-relaxed">
              {about.description}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {about.longDescription}
            </p>
            
            {/* Feature List */}
            <ul className="space-y-4 mb-10">
              {['World-class facilities', 'Expert certified instructors', 'Programs for all skill levels', 'Family-friendly environment'].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-secondary-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider px-8 border-0 group"
              asChild
            >
              <Link href="/template-3/about">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};