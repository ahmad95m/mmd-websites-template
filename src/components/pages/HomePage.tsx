"use client";
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { VideoTestimonialsSection } from '@/components/sections/VideoTestimonialsSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { CTASection } from '@/components/sections/CTASection';
import { HomeComparisonChart } from '@/components/sections/HomeComparisonChart';
import { HomeFAQSection } from '@/components/sections/HomeFAQSection';
import { CountdownOfferForm } from '@/components/forms/CountdownOfferForm';
import { useContentStore } from '@/store/useContentStore';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

// Default section order for home page
const DEFAULT_SECTIONS = [
  'hero',
  'about', 
  'benefits',
  'programs',
  'comparison',
  'countdown',
  'video-testimonials',
  'reviews',
  'blog',
  'faqs',
  'cta'
];

// Map section IDs to their components
const SectionComponents: Record<string, React.ComponentType<{ config?: unknown }> | null> = {
  'hero': HeroSection,
  'about': AboutSection,
  'benefits': BenefitsSection,
  'programs': ProgramsSection,
  'comparison': HomeComparisonChart,
  'countdown': null, // Special handling for countdown
  'video-testimonials': VideoTestimonialsSection,
  'reviews': ReviewsSection,
  'blog': BlogSection,
  'faqs': HomeFAQSection,
  'cta': CTASection
};

const HomePage = () => {
  const { getSiteInfo } = useContentStore();
  const content = useContentStore((state) => state.content);
  const site = getSiteInfo();
  const countdownOfferConfig = content.countdownOffer;
  const { isVisible, getOrderedSections } = useSectionVisibility('home');

  // Get sections in the correct order from config
  const orderedSections = getOrderedSections(DEFAULT_SECTIONS);

  const renderSection = (sectionId: string) => {
    if (!isVisible(sectionId)) return null;

    // Special handling for countdown section
    if (sectionId === 'countdown') {
      return countdownOfferConfig ? (
        <div key={sectionId} id={sectionId}>
          <CountdownOfferForm config={countdownOfferConfig} />
        </div>
      ) : null;
    }

    const Component = SectionComponents[sectionId];
    if (!Component) return null;
    
    return (
      <div key={sectionId} id={sectionId}>
        <Component />
      </div>
    );
  };

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/"
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
        faq={[
          { question: 'What age can children start martial arts?', answer: 'Our Little Champions program accepts children as young as 5 years old.' },
          { question: 'Do you offer free trial classes?', answer: 'Yes! We offer a complimentary introductory class for all new students.' },
          { question: 'Is prior experience required?', answer: 'No prior experience is needed. Our programs are designed for students of all skill levels.' }
        ]}
      />
      {orderedSections.map(renderSection)}
    </Layout>
  );
};

export { HomePage };
