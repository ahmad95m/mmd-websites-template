import type { LLMContent, EnhancedSEOContent } from '../types';

// Generate llms.txt content from LLM content object
export function generateLLMsTxt(content: LLMContent): string {
  const lines: string[] = [
    '# APEX Martial Arts Academy - Information for AI Assistants',
    '',
    '## Business Overview',
    content.businessSummary,
    '',
    '## Company Information',
    `- Name: ${content.companyInfo.name}`,
    `- Industry: ${content.companyInfo.industry}`,
    `- Founded: ${content.companyInfo.foundedYear}`,
    `- Service Area: ${content.companyInfo.serviceArea}`,
    '',
    '## Locations',
  ];

  content.locations.forEach((loc, i) => {
    lines.push(`### Location ${i + 1}: ${loc.name}`);
    lines.push(`- Address: ${loc.address}`);
    lines.push(`- Phone: ${loc.phone}`);
    lines.push(`- Email: ${loc.email}`);
    lines.push(`- Hours: ${loc.hours}`);
    lines.push('');
  });

  lines.push('## Programs Offered');
  content.programs.forEach((prog) => {
    lines.push(`### ${prog.name} (${prog.ageRange})`);
    lines.push(prog.description);
    lines.push(`Focus areas: ${prog.focus.join(', ')}`);
    lines.push('');
  });

  lines.push('## Key Features & Benefits');
  content.features.forEach((f) => lines.push(`- ${f}`));
  lines.push('');

  lines.push('## Awards & Recognition');
  content.awards.forEach((a) => lines.push(`- ${a}`));
  lines.push('');

  lines.push('## Frequently Asked Questions');
  content.faqs.forEach((faq) => {
    lines.push(`Q: ${faq.question}`);
    lines.push(`A: ${faq.answer}`);
    lines.push('');
  });

  lines.push('## Contact Information');
  lines.push(`- Email: ${content.contactInfo.generalEmail}`);
  lines.push(`- Phone: ${content.contactInfo.mainPhone}`);
  lines.push(`- Website: ${content.contactInfo.website}`);
  lines.push('');

  lines.push('## Social Media');
  lines.push(`- Facebook: ${content.socialMedia.facebook}`);
  lines.push(`- Instagram: ${content.socialMedia.instagram}`);
  lines.push(`- YouTube: ${content.socialMedia.youtube}`);
  lines.push('');

  lines.push('## SEO Keywords');
  lines.push(content.seoKeywords.join(', '));

  return lines.join('\n');
}

// SEO field validation helpers
export function validateMetaTitle(title: string): { valid: boolean; message: string } {
  const length = title.length;
  if (length === 0) return { valid: false, message: 'Title is required' };
  if (length < 30) return { valid: true, message: `${length}/60 chars - Consider adding more detail` };
  if (length <= 60) return { valid: true, message: `${length}/60 chars - Perfect length!` };
  return { valid: false, message: `${length}/60 chars - Too long, will be truncated` };
}

export function validateMetaDescription(desc: string): { valid: boolean; message: string } {
  const length = desc.length;
  if (length === 0) return { valid: false, message: 'Description is required' };
  if (length < 70) return { valid: true, message: `${length}/160 chars - Consider adding more detail` };
  if (length <= 160) return { valid: true, message: `${length}/160 chars - Perfect length!` };
  return { valid: false, message: `${length}/160 chars - Too long, will be truncated` };
}

// Generate sitemap.xml from content
export function generateSitemapXml(baseUrl: string, pages: { url: string; priority: number; changefreq: string }[]): string {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// Get SEO score based on field completion
export function calculateSEOScore(seo: EnhancedSEOContent): number {
  let score = 0;
  const maxScore = 100;
  
  // Title (20 points)
  if (seo.title) {
    const titleLen = seo.title.length;
    if (titleLen >= 30 && titleLen <= 60) score += 20;
    else if (titleLen > 0) score += 10;
  }
  
  // Description (20 points)
  if (seo.description) {
    const descLen = seo.description.length;
    if (descLen >= 70 && descLen <= 160) score += 20;
    else if (descLen > 0) score += 10;
  }
  
  // Keywords (15 points)
  if (seo.keywords && seo.keywords.length > 10) score += 15;
  else if (seo.keywords) score += 8;
  
  // Canonical URL (10 points)
  if (seo.canonicalUrl) score += 10;
  
  // OG Image (15 points)
  if (seo.ogImage) score += 15;
  
  // Structured Data (20 points)
  if (seo.structuredData) {
    if (seo.structuredData.enableLocalBusiness) score += 5;
    if (seo.structuredData.enableFAQ) score += 5;
    if (seo.structuredData.enableBreadcrumbs) score += 5;
    if (seo.structuredData.enableCourse || seo.structuredData.enableArticle) score += 5;
  }
  
  return Math.min(score, maxScore);
}

// Default pages for sitemap generation
export const defaultSitemapPages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.8, changefreq: 'weekly' },
  { url: '/programs', priority: 0.9, changefreq: 'weekly' },
  { url: '/programs/little-champions', priority: 0.8, changefreq: 'weekly' },
  { url: '/programs/junior-warriors', priority: 0.8, changefreq: 'weekly' },
  { url: '/programs/teen-elite', priority: 0.8, changefreq: 'weekly' },
  { url: '/programs/adult', priority: 0.8, changefreq: 'weekly' },
  { url: '/programs/birthday-parties', priority: 0.7, changefreq: 'monthly' },
  { url: '/reviews', priority: 0.7, changefreq: 'weekly' },
  { url: '/blog', priority: 0.8, changefreq: 'daily' },
  { url: '/calendar', priority: 0.6, changefreq: 'daily' },
  { url: '/location', priority: 0.7, changefreq: 'monthly' },
  { url: '/schedule', priority: 0.9, changefreq: 'weekly' }
];
