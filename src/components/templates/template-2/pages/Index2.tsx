"use client";

import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { Hero2 } from '../sections/Hero2';
import { About2 } from '../sections/About2';
import { Benefits2 } from '../sections/Benefits2';
import { Programs2 } from '../sections/Programs2';
import { Reviews2 } from '../sections/Reviews2';
import { CTA2 } from '../sections/CTA2';
import { useContentStore } from '@/store/useContentStore';

const Index2 = () => {
  const { getSeo, getSiteInfo } = useContentStore();
  const seo = getSeo('home');
  const site = getSiteInfo();

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2"
        localBusiness={{
          name: site.name,
          description: site.tagline,
          phone: site.phone,
          email: site.email,
          address: {
            street: '1250 W Chandler Blvd, Suite 100',
            city: 'Chandler',
            state: 'AZ',
            zip: '85224'
          },
          hours: [
            { days: 'Monday,Tuesday,Wednesday,Thursday,Friday', opens: '15:00', closes: '21:00' },
            { days: 'Saturday', opens: '09:00', closes: '14:00' }
          ]
        }}
      />
      <Hero2 />
      <About2 />
      <Benefits2 />
      <Programs2 />
      <Reviews2 />
      <CTA2 />
    </Layout2>
  );
};

export default Index2;
