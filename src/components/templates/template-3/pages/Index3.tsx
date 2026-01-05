"use client";

import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { Hero3 } from '../sections/Hero3';
import { About3 } from '../sections/About3';
import { Benefits3 } from '../sections/Benefits3';
import { Programs3 } from '../sections/Programs3';
import { Reviews3 } from '../sections/Reviews3';
import { CTA3 } from '../sections/CTA3';
import { useContentStore } from '@/store/useContentStore';

const Index3 = () => {
  const { getSeo, getSiteInfo } = useContentStore();
  const seo = getSeo('home');
  const site = getSiteInfo();

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3"
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
      <Hero3 />
      <About3 />
      <Benefits3 />
      <Programs3 />
      <Reviews3 />
      <CTA3 />
    </Layout3>
  );
};

export default Index3;
