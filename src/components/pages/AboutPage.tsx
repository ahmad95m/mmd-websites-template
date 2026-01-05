"use client";
import Image from 'next/image';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { Shield, Heart, Trophy, Users } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import facilityImage from '@/assets/facility.jpg';
import coachImage from '@/assets/coach.jpg';
import Link from 'next/link';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const iconMap = {
  shield: Shield,
  heart: Heart,
  trophy: Trophy,
  users: Users,
};

const AboutPage = () => {
  const { getAbout, getSiteInfo } = useContentStore();
  const about = getAbout();
  const site = getSiteInfo();
  const { isVisible } = useSectionVisibility('about');

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'About Us', url: 'https://apexmartialarts.com/about' }
        ]}
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <PageHero 
          title={`ABOUT ${site.name.toUpperCase()}`}
          highlightedWord={site.name.toUpperCase()}
          description={site.tagline}
        />
      )}

      {/* Mission / Story */}
      {isVisible('story') && (
        <Section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg relative aspect-video lg:aspect-auto lg:h-[400px]">
              <Image 
                src={facilityImage}
                alt="APEX Martial Arts Academy training facility in Chandler, AZ"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="font-heading text-4xl text-foreground mb-6">OUR MISSION</h2>
              <p className="text-lg text-foreground mb-4">
                {about.description}
              </p>
              <p className="text-muted-foreground mb-8">
                {about.longDescription}
              </p>
              
              {/* Stats */}
              {isVisible('stats') && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {about.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="font-heading text-3xl text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Values */}
      {isVisible('values') && (
        <Section background="muted">
          <SectionHeader
            pretitle="OUR VALUES"
            title="WHAT WE STAND FOR"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value, index) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap] || Shield;
              return (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Team */}
      {isVisible('team') && (
        <Section>
          <SectionHeader
            pretitle="MEET THE TEAM"
            title="OUR EXPERT INSTRUCTORS"
            description="Our team of experienced martial artists is dedicated to helping you achieve your goals."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.team.map((member, index) => (
              <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-card">
                <div className="aspect-square overflow-hidden relative">
                  <Image 
                    src={coachImage}
                    alt={`${member.name} - ${member.title} at APEX Martial Arts Academy`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-foreground">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{member.title}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {isVisible('cta') && <CTASection />}
    </Layout>
  );
};

export { AboutPage };
