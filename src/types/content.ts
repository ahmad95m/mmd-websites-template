// Site Content Types
export interface SiteInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: Address;
  social: SocialLinks;
  hours: BusinessHours[];
  logo?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  mapUrl: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  google: string;
}

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  children?: NavigationItem[];
}

export interface HeroContent {
  pretitle: string;
  title: string;
  titleLines: string[];
  description: string;
  subDescription?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
}

export interface AboutContent {
  pretitle: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  stats: Stat[];
  values: Value[];
  team: TeamMember[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  commitments?: string[];
  instructorNote?: string;
}

export interface BenefitsContent {
  pretitle: string;
  title: string;
  items: BenefitItem[];
  additionalSkills?: string[];
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  ageRange: string;
  shortDescription: string;
  longDescription: string;
  extendedDescription?: string;
  features: string[];
  results: ProgramResult[];
  schedule: ScheduleItem[];
  image: string;
  galleryImages?: string[];
  ctaText: string;
  benefits?: ProgramBenefit[];
  whyChooseUs?: WhyChooseItem[];
  educationalContent?: EducationalItem[];
  faqs?: FAQItem[];
}

export interface ProgramBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface EducationalItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonData {
  traditional: ComparisonPoint[];
  martialArts: ComparisonPoint[];
}

export interface ComparisonPoint {
  title: string;
  description: string;
}

export interface ChildChallenge {
  icon: string;
  title: string;
  description: string;
}

export interface ProgramDetailShared {
  childChallenges?: ChildChallenge[];
  comparison: ComparisonData;
  whyChooseUs: WhyChooseItem[];
}

export interface ProgramResult {
  title: string;
  description: string;
}

export interface ScheduleItem {
  day: string;
  time: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  source: string;
  text: string;
  date: string;
  featured?: boolean;
  featuredTitle?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export interface LocationContent {
  title: string;
  description: string;
  features: string[];
  nearbyAreas: string[];
  items: LocationItem[];
}

export interface LocationItem {
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

export interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  urgencyText: string;
}

export interface FooterContent {
  description: string;
  quickLinks: LinkItem[];
  legal: LinkItem[];
  copyright: string;
}

export interface LinkItem {
  label: string;
  path: string;
}

export interface SEOContent {
  title: string;
  description: string;
  keywords: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  program: string;
  description: string;
  instructor: string;
}

export interface BirthdayPackage {
  name: string;
  price: string;
  guests: string;
  includes: string[];
}

export interface BirthdayTestimonial {
  name: string;
  text: string;
}

export interface BirthdayPartyContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  packages: BirthdayPackage[];
  testimonials: BirthdayTestimonial[];
}

// New interfaces for enhanced features
export interface ScheduleFormContent {
  title: string;
  description: string;
  buttonText: string;
  consentText: string;
  successMessage: string;
}

export interface CountdownOfferContent {
  badge: string;
  pretitle: string;
  title: string;
  description: string;
  countdownMinutes: number;
  buttonText: string;
  consentText: string;
  successMessage?: string;
}

export interface BottomBarContent {
  message: string;
  buttonText: string;
}

export interface SiteContent {
  site: SiteInfo;
  navigation: NavigationItem[];
  hero: HeroContent;
  about: AboutContent;
  benefits: BenefitsContent;
  programs: Program[];
  reviews: Review[];
  blog: BlogPost[];
  location: LocationContent;
  cta: CTAContent;
  footer: FooterContent;
  seo: Record<string, SEOContent>;
  calendarEvents: CalendarEvent[];
  birthdayParty: BirthdayPartyContent;
  scheduleForm?: ScheduleFormContent;
  countdownOffer?: CountdownOfferContent;
  bottomBar?: BottomBarContent;
  homeFaqs?: FAQItem[];
  // SEO & Metadata
  technicalSEO?: TechnicalSEO;
  llmContent?: LLMContent;
}

// Technical SEO Files
export interface TechnicalSEO {
  robotsTxt: string;
  sitemapXml: string;
  llmsTxt: string;
  baseUrl: string;
}

// LLM/AI SEO Content
export interface LLMContent {
  businessSummary: string;
  companyInfo: {
    name: string;
    industry: string;
    foundedYear: string;
    serviceArea: string;
  };
  locations: LLMLocation[];
  programs: LLMProgram[];
  features: string[];
  awards: string[];
  faqs: LLMFaq[];
  contactInfo: {
    generalEmail: string;
    mainPhone: string;
    website: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  seoKeywords: string[];
}

export interface LLMLocation {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface LLMProgram {
  name: string;
  ageRange: string;
  description: string;
  focus: string[];
}

export interface LLMFaq {
  question: string;
  answer: string;
}
