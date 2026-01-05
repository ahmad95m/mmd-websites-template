"use client";
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { LegalPageLayout } from '@/components/sections/LegalPageLayout';
import { useContentStore } from '@/store/useContentStore';

const PrivacyPage = () => {
  const { getSiteInfo } = useContentStore();
  const site = getSiteInfo();
  const siteName = site.name;
  const siteEmail = site.email;
  const sitePhone = site.phone;
  const siteAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: (
        <>
          <p>
            Welcome to {siteName}. We are committed to protecting your privacy and ensuring 
            you have a positive experience on our website and when using our services. This 
            Privacy Policy outlines how we collect, use, disclose, and safeguard your information 
            when you visit our website or enroll in our martial arts programs.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in 
            accordance with this policy. If you do not agree with the terms of this Privacy 
            Policy, please do not access our website or use our services.
          </p>
        </>
      ),
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      content: (
        <>
          <p>We may collect the following types of information:</p>
          <p><strong>Personal Information:</strong></p>
          <ul>
            <li>Name (parent/guardian and student)</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
            <li>Date of birth</li>
            <li>Emergency contact information</li>
            <li>Medical information relevant to training (allergies, conditions, etc.)</li>
            <li>Payment and billing information</li>
          </ul>
          <p><strong>Automatically Collected Information:</strong></p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring website addresses</li>
          </ul>
        </>
      ),
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      content: (
        <>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide and maintain our martial arts programs and services</li>
            <li>To process enrollment and membership applications</li>
            <li>To communicate with you about classes, schedules, and events</li>
            <li>To process payments and billing</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send promotional communications (with your consent)</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To ensure the safety and well-being of our students</li>
          </ul>
        </>
      ),
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      content: (
        <>
          <p>
            We do not sell, trade, or rent your personal information to third parties. 
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our business (payment processors, email service providers)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
            <li><strong>Safety:</strong> To protect the safety of our students, staff, and the public</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Martial Arts Organizations:</strong> With affiliated martial arts organizations for belt testing, tournaments, and certifications</li>
          </ul>
        </>
      ),
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: (
        <>
          <p>
            We implement appropriate technical and organizational security measures to protect 
            your personal information against unauthorized access, alteration, disclosure, or 
            destruction. These measures include:
          </p>
          <ul>
            <li>Secure socket layer (SSL) encryption for data transmission</li>
            <li>Secure storage of physical records in locked facilities</li>
            <li>Limited access to personal information by authorized personnel only</li>
            <li>Regular security assessments and updates</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic storage is 
            100% secure. While we strive to protect your information, we cannot guarantee 
            its absolute security.
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: (
        <>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your 
            browsing experience. Cookies are small files stored on your device that help us:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Understand how you use our website</li>
            <li>Improve our website functionality</li>
            <li>Provide relevant content and advertisements</li>
          </ul>
          <p>
            You can control cookies through your browser settings. However, disabling cookies 
            may affect the functionality of our website.
          </p>
        </>
      ),
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      content: (
        <p>
          Our website may contain links to third-party websites. We are not responsible for 
          the privacy practices or content of these external sites. We encourage you to 
          review the privacy policies of any third-party websites you visit.
        </p>
      ),
    },
    {
      id: 'childrens-privacy',
      title: "Children's Privacy",
      content: (
        <>
          <p>
            As a martial arts school serving minors, we take children's privacy seriously. 
            We collect personal information about children only with parental or guardian 
            consent. Parents and guardians have the right to:
          </p>
          <ul>
            <li>Review the personal information we have collected about their child</li>
            <li>Request deletion of their child's personal information</li>
            <li>Refuse further collection or use of their child's information</li>
          </ul>
          <p>
            We comply with the Children's Online Privacy Protection Act (COPPA) and other 
            applicable laws regarding children's privacy.
          </p>
        </>
      ),
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: (
        <>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>
        </>
      ),
    },
    {
      id: 'policy-changes',
      title: 'Changes to This Policy',
      content: (
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our 
          practices or for legal, operational, or regulatory reasons. We will notify you 
          of any material changes by posting the updated policy on our website with a new 
          effective date. We encourage you to review this policy periodically.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: (
        <>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, 
            please contact us:
          </p>
          <ul>
            <li><strong>{siteName}</strong></li>
            <li>Address: {siteAddress}</li>
            <li>Phone: {sitePhone}</li>
            <li>Email: {siteEmail}</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://bemartialarts.com/privacy-policy"
      />
      <LegalPageLayout
        title="Privacy Policy"
        effectiveDate="January 1, 2026"
        sections={sections}
        otherPageLink={{
          label: "View Terms of Service",
          href: "/terms-of-service",
        }}
      />
    </Layout>
  );
};

export { PrivacyPage };
