"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

// Interfaces for Structured Data
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface LocalBusinessData {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours?: { days: string; opens: string; closes: string }[];
}

interface ArticleData {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

interface CourseData {
  name: string;
  description: string;
  provider: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  canonicalUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
  localBusiness?: LocalBusinessData;
  article?: ArticleData;
  course?: CourseData;
  faq?: FAQItem[];
}

const BASE_URL = 'https://apexmartialarts.com';

export const SEOHead = ({ 
  canonicalUrl,
  // Structured Data props are used
  breadcrumbs,
  localBusiness,
  article,
  course,
  faq,
}: SEOHeadProps) => {
  const pathname = usePathname();
  
  // We use useEffect to inject JSON-LD script tags or just render them?
  // React can render <script> tags.
  // We'll generate the schema objects and render them.
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [];

  // Breadcrumb
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    });
  }

  // LocalBusiness
  if (localBusiness) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'MartialArtsSchool',
      'name': localBusiness.name,
      'description': localBusiness.description,
      'telephone': localBusiness.phone,
      'email': localBusiness.email,
      'url': BASE_URL,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': localBusiness.address.street,
        'addressLocality': localBusiness.address.city,
        'addressRegion': localBusiness.address.state,
        'postalCode': localBusiness.address.zip,
        'addressCountry': 'US'
      },
      'openingHoursSpecification': localBusiness.hours?.map(h => ({
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': h.days.split(',').map(d => d.trim()),
        'opens': h.opens,
        'closes': h.closes
      })),
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5',
        'reviewCount': '150',
        'bestRating': '5',
        'worstRating': '1'
      },
      'priceRange': '$$',
      'image': `${BASE_URL}/og-image.jpg`,
      'sameAs': [
        'https://www.facebook.com/apexmartialarts',
        'https://www.instagram.com/apexmartialarts',
        'https://www.youtube.com/apexmartialarts'
      ]
    });
  }

  // Article
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.description,
      'author': {
        '@type': 'Person',
        'name': article.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'APEX Martial Arts Academy',
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/logo.png`
        }
      },
      'datePublished': article.datePublished,
      'dateModified': article.dateModified || article.datePublished,
      'image': article.image || `${BASE_URL}/og-image.jpg`,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl || (pathname ? `${BASE_URL}${pathname}` : BASE_URL)
      }
    });
  }

  // Course
  if (course) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': course.name,
      'description': course.description,
      'provider': {
        '@type': 'Organization',
        'name': course.provider,
        'sameAs': BASE_URL
      },
      'offers': {
        '@type': 'Offer',
        'category': 'Free Trial Available',
        'price': '0',
        'priceCurrency': 'USD'
      }
    });
  }

  // FAQ
  if (faq && faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faq.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    });
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
