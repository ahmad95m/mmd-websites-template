"use client";
import Image from 'next/image';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { Shield, Heart, Trophy, Users } from 'lucide-react';
import facilityImage from '@/assets/facility.jpg';
import coachImage from '@/assets/coach.jpg';
import heroImage from '@/assets/hero-home.jpg';

const iconMap = {
  shield: Shield,
  heart: Heart,
  trophy: Trophy,
  users: Users,
};

const AboutPage2 = () => {
  const { getAbout } = useContentStore();
  const about = getAbout();

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2/about"
      />
      
      <PageHero
        title="ABOUT US"
        highlightedWord="ABOUT"
        description="Our story of excellence in martial arts training"
        backgroundImage={heroImage.src}
      />

      {/* Mission */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] overflow-hidden relative">
              <Image 
                src={facilityImage}
                alt="APEX Martial Arts Academy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-light text-foreground mb-8">OUR MISSION</h2>
              <p className="text-lg text-foreground mb-6">{about.description}</p>
              <p className="text-muted-foreground leading-relaxed mb-10">{about.longDescription}</p>
              
              <div className="grid grid-cols-2 gap-8">
                {about.stats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-3xl font-light text-primary">{stat.value}</p>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-muted">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.3em] text-xs mb-4">OUR VALUES</p>
            <h2 className="text-4xl font-light text-foreground">WHAT WE STAND FOR</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((value, index) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap] || Shield;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-foreground tracking-widest mb-4">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.3em] text-xs mb-4">MEET THE TEAM</p>
            <h2 className="text-4xl font-light text-foreground">OUR EXPERT INSTRUCTORS</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {about.team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500 relative">
                  <Image 
                    src={coachImage}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-light text-foreground">{member.name}</h3>
                <p className="text-primary text-sm tracking-widest mb-3">{member.title}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default AboutPage2;
