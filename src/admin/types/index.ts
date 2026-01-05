// Admin-specific types extending the main content types
import type { SiteContent, SEOContent } from '@/types/content';

// Enhanced SEO with additional fields for Google and LLM optimization
export interface EnhancedSEOContent extends SEOContent {
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  structuredData?: StructuredDataConfig;
}

export interface StructuredDataConfig {
  enableLocalBusiness?: boolean;
  enableFAQ?: boolean;
  enableCourse?: boolean;
  enableArticle?: boolean;
  enableBreadcrumbs?: boolean;
  customSchema?: string;
}

// LLM/AI SEO Content for llms.txt
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

// Technical SEO Files
export interface TechnicalSEO {
  robotsTxt: string;
  sitemapXml: string;
  llmsTxt: string;
  baseUrl: string;
}

// Admin Store Types
export interface AdminState {
  // Authentication
  isAuthenticated: boolean;
  
  // Content Management
  draftContent: SiteContent;
  publishedContent: SiteContent;
  hasUnsavedChanges: boolean;
  
  // SEO Management
  seoContent: Record<string, EnhancedSEOContent>;
  llmContent: LLMContent;
  technicalSEO: TechnicalSEO;
  
  // Template Selection
  activeTemplate: 'template1' | 'template2' | 'template3';
  
  // Preview
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  previewUrl: string;
  
  // UI State
  sidebarCollapsed: boolean;
  activeSection: string | null;
}

export interface AdminActions {
  // Auth
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // Content
  updateDraft: <T>(path: string, value: T) => void;
  publish: () => void;
  revert: () => void;
  
  // SEO
  updateSEO: (page: string, seo: Partial<EnhancedSEOContent>) => void;
  updateLLMContent: (content: Partial<LLMContent>) => void;
  updateTechnicalSEO: (files: Partial<TechnicalSEO>) => void;
  
  // Export/Import
  exportJSON: () => string;
  importJSON: (json: string) => boolean;
  
  // Template
  setTemplate: (template: 'template1' | 'template2' | 'template3') => void;
  
  // Preview
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setPreviewUrl: (url: string) => void;
  
  // UI
  toggleSidebar: () => void;
  setActiveSection: (section: string | null) => void;
}

export type AdminStore = AdminState & AdminActions;

// Form Submission Type
export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  program?: string;
  message?: string;
  source: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
}

// Editor Section Types
export type EditorSection = 
  | 'site-info'
  | 'navigation'
  | 'hero'
  | 'about'
  | 'benefits'
  | 'programs'
  | 'reviews'
  | 'blog'
  | 'calendar'
  | 'birthday'
  | 'location'
  | 'cta'
  | 'footer'
  | 'forms'
  | 'seo'
  | 'theme';
