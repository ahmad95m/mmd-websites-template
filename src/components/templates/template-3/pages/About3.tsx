"use client";
import Image from 'next/image';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
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

const AboutPage3 = () => {
  const { getAbout } = useContentStore();
  const about = getAbout();

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3/about"
      />
      
      <PageHero
        title="ABOUT US"
        highlightedWord="ABOUT"
        description="Our story of excellence in martial arts training"
        backgroundImage={heroImage.src}
      />

      {/* Mission */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25" />
              <Image 
                src={facilityImage}
                alt="APEX Martial Arts Academy"
                className="relative rounded-2xl w-full h-[500px] object-cover"
                placeholder="blur"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black text-secondary-foreground mb-6">OUR MISSION</h2>
              <p className="text-secondary-foreground/70 text-lg mb-6">{about.description}</p>
              <p className="text-muted-foreground mb-10">{about.longDescription}</p>
              
              <div className="grid grid-cols-2 gap-6">
                {about.stats.map((stat, index) => (
                  <div key={index} className="bg-muted border border-border rounded-xl p-6">
                    <p className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
              OUR VALUES
            </span>
            <h2 className="text-4xl font-black text-foreground">WHAT WE STAND FOR</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value, index) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap] || Shield;
              return (
                <div key={index} className="bg-muted border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
              MEET THE TEAM
            </span>
            <h2 className="text-4xl font-black text-secondary-foreground">EXPERT INSTRUCTORS</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <Image 
                    src={coachImage}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.title}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default AboutPage3;
