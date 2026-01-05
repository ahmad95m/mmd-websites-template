"use client";

import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { PageHero } from '@/components/sections/PageHero';
import { useContentStore } from '@/store/useContentStore';
import { CTA2 } from '../sections/CTA2';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const LocationPage2 = () => {
  const { getSiteInfo, getSeo } = useContentStore();
  const site = getSiteInfo();
  const seo = getSeo('location');

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2/location"
      />
      
      <PageHero
        title="OUR LOCATION"
        highlightedWord="LOCATION"
        description="Visit us and start your martial arts journey"
        backgroundImage={heroImage.src}
      />

      {/* Content */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Map */}
            <div className="aspect-square bg-muted flex items-center justify-center">
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
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-10">Contact Information</h2>
              
              <div className="space-y-8">
                <a 
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-6 group"
                >
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2">ADDRESS</p>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      {site.address.street}<br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </p>
                  </div>
                </a>
                
                <a 
                  href={`tel:${site.phone}`}
                  className="flex items-start gap-6 group"
                >
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2">PHONE</p>
                    <p className="text-foreground group-hover:text-primary transition-colors">{site.phone}</p>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-6 group"
                >
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2">EMAIL</p>
                    <p className="text-foreground group-hover:text-primary transition-colors">{site.email}</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-6">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2">HOURS</p>
                    <div className="space-y-2">
                      {site.hours.map((h, i) => (
                        <p key={i} className="text-foreground">
                          <span className="text-muted-foreground">{h.days}:</span> {h.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA2 />
    </Layout2>
  );
};

export default LocationPage2;
