"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { CTASection } from '@/components/sections/CTASection';
import { useContentStore } from '@/store/useContentStore';
import {
  ProgramHero,
  ProgramGallery,
  ProgramOverview,
  ProgramBenefitsGrid,
  ProgramResultsSection,
  WhyChooseUsSection,
  ComparisonChart,
  EducationalContent,
  ProgramReviews,
  ProgramFAQ,
  ChildChallengesSection,
  InstructorSection,
} from '@/components/sections/program';

// Import images
import programKids from '@/assets/program-kids.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';
import programTaiChi from '@/assets/program-taichi.jpg';
import programLeadership from '@/assets/program-leadership.jpg';

const imageMap: Record<string, StaticImageData> = {
  'karate-kids': programKids,
  'adult': programAdults,
  'teens': programTeens,
  'tai-chi': programTaiChi,
  'leadership': programLeadership,
};

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProgramBySlug, getSiteInfo, getReviews, getProgramDetailShared, getAbout } = useContentStore();
  const program = getProgramBySlug(slug || '');
  const site = getSiteInfo();
  const reviews = getReviews();
  const sharedData = getProgramDetailShared();
  const about = getAbout();
  
  // Get instructor from about team
  const instructor = about?.team?.[0];

  if (!program) {
    return (
      <Layout>
        <SEOHead
          canonicalUrl="https://apexmartialarts.com/programs"
        />
        <Section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-foreground mb-4">Program Not Found</h1>
            <Button asChild>
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </Section>
      </Layout>
    );
  }

  const image = imageMap[program.slug] || programKids;
  
  // Determine if this is a kids/youth program (show child challenges section)
  const isYouthProgram = program.slug === 'karate-kids' || program.slug === 'teens';

  return (
    <Layout>
      <SEOHead
        canonicalUrl={`https://apexmartialarts.com/programs/${program.slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Programs', url: 'https://apexmartialarts.com/programs' },
          { name: program.name, url: `https://apexmartialarts.com/programs/${program.slug}` }
        ]}
        course={{
          name: program.name,
          description: program.shortDescription,
          provider: site.name
        }}
      />
      
      {/* Hero Section */}
      <ProgramHero
        name={program.name}
        ageRange={program.ageRange}
        shortDescription={program.shortDescription}
        ctaText={program.ctaText}
        backgroundImage={image}
      />

      {/* Benefits Grid */}
      {program.benefits && program.benefits.length > 0 && (
        <ProgramBenefitsGrid 
          benefits={program.benefits}
          pretitle={`BENEFITS OF OUR ${program.ageRange.toUpperCase()} MARTIAL ARTS CLASSES`}
        />
      )}

      {/* Child Challenges Section (only for youth programs) */}
      {isYouthProgram && sharedData?.childChallenges && (
        <ChildChallengesSection 
          challenges={sharedData.childChallenges}
          programName={program.name}
        />
      )}

      {/* Instructor Introduction */}
      {instructor && (
        <InstructorSection 
          instructor={instructor}
          programName={program.name}
          siteName={site.name}
        />
      )}

      {/* Program Overview */}
      <ProgramOverview
        longDescription={program.longDescription}
        extendedDescription={program.extendedDescription}
        features={program.features}
        schedule={program.schedule}
      />

      {/* Program Gallery */}
      {program.galleryImages && program.galleryImages.length > 0 && (
        <ProgramGallery 
          images={program.galleryImages}
          programName={program.name}
        />
      )}

      {/* Results Section */}
      <ProgramResultsSection 
        results={program.results}
        programName={program.name}
      />

      {/* Why Choose Us */}
      {sharedData?.whyChooseUs && (
        <WhyChooseUsSection 
          items={sharedData.whyChooseUs}
          programName={program.name}
        />
      )}

      {/* Comparison Chart */}
      {sharedData?.comparison && (
        <ComparisonChart 
          data={sharedData.comparison}
          siteName={site.name}
        />
      )}

      {/* Educational Content */}
      {program.educationalContent && program.educationalContent.length > 0 && (
        <EducationalContent 
          items={program.educationalContent}
          siteName={site.name}
        />
      )}

      {/* Reviews */}
      <ProgramReviews 
        reviews={reviews}
        siteName={site.name}
      />

      {/* FAQ */}
      {program.faqs && program.faqs.length > 0 && (
        <ProgramFAQ 
          faqs={program.faqs}
          programName={program.name}
        />
      )}

      {/* Final CTA */}
      <CTASection />
    </Layout>
  );
};

export { ProgramDetailPage };
