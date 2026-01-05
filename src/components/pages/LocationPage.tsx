"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { useContentStore } from '@/store/useContentStore';
import { MapPin, Phone, Mail, Clock, Check, Navigation, Building2 } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import facilityImage from '@/assets/facility.jpg';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

interface LocationData {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  mapUrl: string;
  mapEmbed: string;
  hours: { days: string; hours: string }[];
  features: string[];
  image: string;
}

const locations: LocationData[] = [
  {
    id: 'chandler',
    name: 'Chandler',
    address: {
      street: '1250 W Chandler Blvd, Suite 100',
      city: 'Chandler',
      state: 'AZ',
      zip: '85224'
    },
    phone: '(480) 555-1234',
    email: 'chandler@apexmartialarts.com',
    mapUrl: 'https://maps.google.com/?q=1250+W+Chandler+Blvd+Chandler+AZ',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.4086!2d-111.8419!3d33.3062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDE4JzIyLjMiTiAxMTHCsDUwJzMwLjgiVw!5e0!3m2!1sen!2sus!4v1234567890',
    hours: [
      { days: 'Monday - Friday', hours: '3:00 PM - 9:00 PM' },
      { days: 'Saturday', hours: '9:00 AM - 2:00 PM' },
      { days: 'Sunday', hours: 'Closed' }
    ],
    features: ['3,500 sq ft training space', 'Professional mat flooring', 'Climate-controlled', 'Parent viewing area', 'Pro shop', 'Free parking'],
    image: '/src/assets/facility.jpg'
  },
  {
    id: 'gilbert',
    name: 'Gilbert',
    address: {
      street: '2890 E Baseline Rd, Suite 110',
      city: 'Gilbert',
      state: 'AZ',
      zip: '85234'
    },
    phone: '(480) 555-5678',
    email: 'gilbert@apexmartialarts.com',
    mapUrl: 'https://maps.google.com/?q=2890+E+Baseline+Rd+Gilbert+AZ',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5!2d-111.7890!3d33.3794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIyJzQ2LjAiTiAxMTHCsDQ3JzIwLjQiVw!5e0!3m2!1sen!2sus!4v1234567890',
    hours: [
      { days: 'Monday - Friday', hours: '4:00 PM - 9:00 PM' },
      { days: 'Saturday', hours: '10:00 AM - 3:00 PM' },
      { days: 'Sunday', hours: 'Closed' }
    ],
    features: ['4,000 sq ft training space', 'Premium mat flooring', 'AC throughout', 'Parent lounge', 'Equipment store', 'Ample parking'],
    image: '/src/assets/facility.jpg'
  },
  {
    id: 'mesa',
    name: 'Mesa',
    address: {
      street: '1455 W Southern Ave, Suite 200',
      city: 'Mesa',
      state: 'AZ',
      zip: '85202'
    },
    phone: '(480) 555-9012',
    email: 'mesa@apexmartialarts.com',
    mapUrl: 'https://maps.google.com/?q=1455+W+Southern+Ave+Mesa+AZ',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.2!2d-111.8600!3d33.3922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIzJzMxLjkiTiAxMTHCsDUxJzM2LjAiVw!5e0!3m2!1sen!2sus!4v1234567890',
    hours: [
      { days: 'Monday - Friday', hours: '3:30 PM - 8:30 PM' },
      { days: 'Saturday', hours: '9:00 AM - 1:00 PM' },
      { days: 'Sunday', hours: 'Closed' }
    ],
    features: ['3,200 sq ft training space', 'Professional mats', 'Full AC system', 'Viewing windows', 'Gear shop', 'Free parking lot'],
    image: '/src/assets/facility.jpg'
  }
];

const LocationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const { getLocation, getSiteInfo } = useContentStore();
  const locationContent = getLocation();
  const site = getSiteInfo();
  const { isVisible } = useSectionVisibility('location');

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/location"
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Locations', url: 'https://apexmartialarts.com/location' }
        ]}
        localBusiness={{
          name: site.name,
          description: locationContent.description,
          phone: selectedLocation.phone,
          email: selectedLocation.email,
          address: selectedLocation.address,
          hours: [
            { days: 'Monday,Tuesday,Wednesday,Thursday,Friday', opens: '15:00', closes: '21:00' },
            { days: 'Saturday', opens: '09:00', closes: '14:00' }
          ]
        }}
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <PageHero 
          title="OUR LOCATIONS"
          highlightedWord="LOCATIONS"
          description={locationContent.description}
        />
      )}

      {/* Location Selector */}
      {isVisible('map') && (
        <Section>
          <SectionHeader
            pretitle="FIND US"
            title="Choose Your Location"
            description="We have multiple convenient locations across the East Valley to serve you better."
            align="center"
          />

          {/* Location Cards */}
          <nav className="grid md:grid-cols-3 gap-6 mt-12 mb-12" aria-label="Select location">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`p-6 rounded-2xl text-left transition-all ${
                  selectedLocation.id === loc.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card hover:bg-muted shadow-card'
                }`}
                aria-pressed={selectedLocation.id === loc.id}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className={`w-6 h-6 ${selectedLocation.id === loc.id ? 'text-primary-foreground' : 'text-primary'}`} aria-hidden="true" />
                  <h3 className="font-heading text-2xl">{loc.name}</h3>
                </div>
                <address className={`text-sm not-italic ${selectedLocation.id === loc.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {loc.address.street}<br />
                  {loc.address.city}, {loc.address.state} {loc.address.zip}
                </address>
                <p className={`text-sm mt-2 ${selectedLocation.id === loc.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {loc.phone}
                </p>
              </button>
            ))}
          </nav>

          {/* Selected Location Details */}
          <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-border">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-4xl text-foreground mb-8">
                {selectedLocation.name.toUpperCase()} LOCATION
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <address className="text-muted-foreground not-italic">
                      {selectedLocation.address.street}<br />
                      {selectedLocation.address.city}, {selectedLocation.address.state} {selectedLocation.address.zip}
                    </address>
                    <a 
                      href={selectedLocation.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-2 hover:gap-3 transition-all"
                    >
                      Get Directions <Navigation className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a 
                      href={`tel:${selectedLocation.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {selectedLocation.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a 
                      href={`mailto:${selectedLocation.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {selectedLocation.email}
                    </a>
                  </div>
                </div>
                
                {isVisible('hours') && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        {selectedLocation.hours.map((h, i) => (
                          <p key={i}>{h.days}: {h.hours}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button variant="cta" size="lg" asChild>
                <a href={selectedLocation.mapUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </Button>
            </div>
            
            {/* Facility Info */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image 
                  src={facilityImage}
                  alt={`APEX Martial Arts ${selectedLocation.name} training facility`}
                  className="w-full h-64 object-cover"
                  placeholder="blur"
                />
              </div>
              
              {isVisible('features') && (
                <>
                  <h3 className="font-heading text-2xl text-foreground mb-4">FACILITY FEATURES</h3>
                  <ul className="grid grid-cols-2 gap-4 mb-8">
                    {selectedLocation.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              {isVisible('areas') && (
                <>
                  <h3 className="font-heading text-2xl text-foreground mb-4">AREAS WE SERVE</h3>
                  <div className="flex flex-wrap gap-2">
                    {locationContent.nearbyAreas.map((area) => (
                      <span 
                        key={area}
                        className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Map Embed */}
      {isVisible('map') && (
        <Section background="muted">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe 
              src={selectedLocation.mapEmbed}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`APEX Martial Arts ${selectedLocation.name} Location Map`}
              className="w-full"
            />
          </div>
        </Section>
      )}

      <CTASection />
    </Layout>
  );
};

export { LocationPage };
