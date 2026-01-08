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

const LocationPage = () => {
  const { getLocation, getSiteInfo, getAbout } = useContentStore();
  const locationContent = getLocation();
  const site = getSiteInfo();
  const about = getAbout();
  
  // Use items from content, or fallback to site info if no items defined
  const locationItems: LocationData[] = locationContent?.items?.length > 0 
    ? locationContent.items 
    : [{
        id: 'main',
        name: site?.name || 'Main Location',
        address: site?.address || { street: '', city: '', state: '', zip: '' },
        phone: site?.phone || '',
        email: site?.email || '',
        mapUrl: site?.address?.mapUrl || '',
        mapEmbed: '', // Fallback or empty
        hours: site?.hours || [],
        features: locationContent?.features || [],
        image: about?.image || '' // Fallback image from about content
      }];

  const [selectedLocation, setSelectedLocation] = useState<LocationData>(locationItems[0]);
  
  // Update selected location if items change (e.g. live preview)
  // But be careful not to reset user selection unnecessarily. 
  // For simplicity, we can just ensure selectedLocation is valid.
  
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
          hours: selectedLocation.hours.map(h => ({ days: h.days, opens: '09:00', closes: '17:00' })) // simplified for SEO Schema
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
            description="We have multiple convenient locations to serve you better."
            align="center"
          />

          {/* Location Cards */}
          {locationItems.length > 1 && (
            <nav className="grid md:grid-cols-3 gap-6 mt-12 mb-12" aria-label="Select location">
              {locationItems.map((loc) => (
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
          )}

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
                        {selectedLocation.hours?.map((h, i) => (
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
                {selectedLocation.image && (
                    <Image 
                    src={selectedLocation.image}
                    alt={`APEX Martial Arts ${selectedLocation.name} training facility`}
                    width={800}
                    height={600}
                    className="w-full h-64 object-cover"
                    placeholder="empty"
                    unoptimized
                    />
                )}
              </div>
              
              {isVisible('features') && (
                <>
                  <h3 className="font-heading text-2xl text-foreground mb-4">FACILITY FEATURES</h3>
                  <ul className="grid grid-cols-2 gap-4 mb-8">
                    {selectedLocation.features?.map((feature, i) => (
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
                    {locationContent.nearbyAreas?.map((area) => (
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
      {isVisible('map') && selectedLocation.mapEmbed && (
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
