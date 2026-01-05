"use client";
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { LegalPageLayout } from '@/components/sections/LegalPageLayout';
import { useContentStore } from '@/store/useContentStore';

const TermsPage = () => {
  const { getSiteInfo } = useContentStore();
  const site = getSiteInfo();
  const siteName = site.name;
  const siteEmail = site.email;
  const sitePhone = site.phone;
  const siteAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: (
        <>
          <p>
            Welcome to {siteName}. By accessing our website, enrolling in our programs, or 
            using our services, you agree to be bound by these Terms of Service ("Terms"). 
            If you do not agree to these Terms, please do not use our services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you (or the parent/guardian 
            of a minor) and {siteName}. We reserve the right to modify these Terms at any time, 
            and your continued use of our services constitutes acceptance of any modifications.
          </p>
        </>
      ),
    },
    {
      id: 'membership',
      title: 'Membership and Enrollment',
      content: (
        <>
          <p>
            Enrollment in our martial arts programs is subject to the following conditions:
          </p>
          <ul>
            <li>All students must complete an enrollment form and provide accurate information</li>
            <li>Students under 18 years of age must have a parent or legal guardian sign all agreements</li>
            <li>Enrollment is subject to acceptance by {siteName} at our sole discretion</li>
            <li>Membership is non-transferable to other individuals</li>
            <li>All students must maintain current membership status to participate in classes</li>
          </ul>
          <p>
            By enrolling, you represent that all information provided is accurate and complete. 
            You agree to update us promptly if any information changes.
          </p>
        </>
      ),
    },
    {
      id: 'payment',
      title: 'Payment and Fees',
      content: (
        <>
          <p>
            All fees are due according to the payment schedule agreed upon at enrollment:
          </p>
          <ul>
            <li>Monthly tuition is due on the 1st of each month</li>
            <li>A late fee may be applied for payments received after the 10th of the month</li>
            <li>Testing fees, uniform costs, and special event fees are additional</li>
            <li>We accept cash, check, and major credit/debit cards</li>
            <li>Returned checks are subject to a service fee</li>
          </ul>
          <p>
            Prices are subject to change with 30 days' written notice. Promotional rates may 
            have specific terms and conditions that apply.
          </p>
        </>
      ),
    },
    {
      id: 'cancellation',
      title: 'Cancellation and Refund Policy',
      content: (
        <>
          <p>
            To cancel your membership, the following terms apply:
          </p>
          <ul>
            <li>A written cancellation notice must be submitted at least 30 days prior to your next billing date</li>
            <li>Cancellation requests may be submitted in person or via email to {siteEmail}</li>
            <li>Prepaid tuition for unused months may be refundable, minus any applicable fees</li>
            <li>Registration fees, testing fees, and uniform purchases are non-refundable</li>
            <li>Contract-based memberships are subject to early termination fees as outlined in your agreement</li>
          </ul>
          <p>
            We reserve the right to terminate membership at our discretion if a student fails 
            to comply with our code of conduct or these Terms.
          </p>
        </>
      ),
    },
    {
      id: 'attendance',
      title: 'Class Attendance and Scheduling',
      content: (
        <>
          <p>
            To ensure a positive experience for all students:
          </p>
          <ul>
            <li>Students should arrive 5-10 minutes before their scheduled class time</li>
            <li>Proper uniform (dobok/gi) must be worn during all classes</li>
            <li>Students arriving more than 10 minutes late may not be admitted to class</li>
            <li>Make-up classes may be available for missed sessions, subject to availability</li>
            <li>Class schedules are subject to change; we will provide advance notice when possible</li>
            <li>{siteName} may cancel classes due to weather, holidays, or unforeseen circumstances</li>
          </ul>
        </>
      ),
    },
    {
      id: 'conduct',
      title: 'Code of Conduct',
      content: (
        <>
          <p>
            All students, parents, and visitors are expected to adhere to our code of conduct:
          </p>
          <ul>
            <li>Show respect to all instructors, staff, fellow students, and visitors</li>
            <li>Use martial arts skills responsibly and never for bullying or aggression</li>
            <li>Maintain cleanliness and care for the facility and equipment</li>
            <li>No profanity, harassment, or disruptive behavior</li>
            <li>Follow all safety rules and instructor directions</li>
            <li>Parents should refrain from coaching or interrupting during classes</li>
          </ul>
          <p>
            Violation of the code of conduct may result in disciplinary action, including 
            suspension or termination of membership without refund.
          </p>
        </>
      ),
    },
    {
      id: 'liability',
      title: 'Assumption of Risk and Liability Waiver',
      content: (
        <>
          <p>
            Martial arts training involves inherent physical risks, including but not limited 
            to bruises, sprains, fractures, and other injuries. By enrolling, you acknowledge:
          </p>
          <ul>
            <li>You understand the risks associated with martial arts training</li>
            <li>You voluntarily assume all risks of injury</li>
            <li>You release {siteName}, its owners, instructors, and staff from liability for injuries</li>
            <li>You have disclosed any medical conditions that may affect participation</li>
            <li>You will immediately report any injuries to staff</li>
          </ul>
          <p>
            A separate liability waiver form must be signed as part of the enrollment process. 
            These Terms do not replace or modify that waiver.
          </p>
        </>
      ),
    },
    {
      id: 'media',
      title: 'Photography and Media Release',
      content: (
        <>
          <p>
            {siteName} may take photographs and videos during classes, events, and testing 
            ceremonies for promotional purposes:
          </p>
          <ul>
            <li>By enrolling, you grant permission to use images of yourself or your child in marketing materials</li>
            <li>This includes use on our website, social media, print materials, and advertisements</li>
            <li>No compensation will be provided for such use</li>
            <li>You may opt out by submitting a written request</li>
          </ul>
        </>
      ),
    },
    {
      id: 'property',
      title: 'Intellectual Property',
      content: (
        <>
          <p>
            All content on our website and materials, including logos, text, images, curricula, 
            and training methods, are the intellectual property of {siteName}:
          </p>
          <ul>
            <li>You may not copy, reproduce, or distribute our content without written permission</li>
            <li>Training materials are for personal use only and may not be shared or sold</li>
            <li>Unauthorized use of our trademarks or content may result in legal action</li>
          </ul>
        </>
      ),
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: (
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the 
          State of Wisconsin. Any disputes arising from these Terms or your use of our services 
          shall be resolved in the courts of Ozaukee County, Wisconsin. You agree to submit to 
          the personal jurisdiction of such courts.
        </p>
      ),
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      content: (
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective 
          immediately upon posting to our website. Your continued use of our services after 
          any modifications constitutes acceptance of the updated Terms. We encourage you to 
          review these Terms periodically.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: (
        <>
          <p>
            For questions or concerns about these Terms of Service, please contact us:
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
        canonicalUrl="https://bemartialarts.com/terms-of-service"
      />
      <LegalPageLayout
        title="Terms of Service"
        effectiveDate="January 1, 2026"
        sections={sections}
        otherPageLink={{
          label: "View Privacy Policy",
          href: "/privacy-policy",
        }}
      />
    </Layout>
  );
};

export { TermsPage };
