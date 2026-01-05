"use client";

import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA3 } from '../sections/CTA3';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-home.jpg';

const LocationPage3 = () => {
  const { getSiteInfo, getSeo } = useContentStore();
  const site = getSiteInfo();
  const seo = getSeo('location');

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3/location"
      />
      
      <PageHero
        title="OUR LOCATION"
        highlightedWord="LOCATION"
        description="Visit us and start your martial arts journey"
        backgroundImage={heroImage.src}
      />

      {/* Content */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25" />
              <div className="relative aspect-square bg-card border border-border rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.9!2d-111.8!3d33.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDE4JzAwLjAiTiAxMTHCsDQ4JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="APEX Martial Arts Academy Location"
                />
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-secondary-foreground mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <a 
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">ADDRESS</p>
                    <p className="text-card-foreground group-hover:text-primary transition-colors">
                      {site.address.street}<br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </p>
                  </div>
                </a>
                
                <a 
                  href={`tel:${site.phone}`}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">PHONE</p>
                    <p className="text-card-foreground group-hover:text-primary transition-colors">{site.phone}</p>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">EMAIL</p>
                    <p className="text-card-foreground group-hover:text-primary transition-colors">{site.email}</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">HOURS</p>
                    <div className="space-y-2">
                      {site.hours.map((h, i) => (
                        <p key={i} className="text-card-foreground">
                          <span className="text-muted-foreground">{h.days}:</span> {h.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider border-0"
                asChild
              >
                <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA3 />
    </Layout3>
  );
};

export default LocationPage3;
