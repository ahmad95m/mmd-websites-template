"use client";
import { create } from 'zustand';
import siteContentData from '@/data/siteContent.json';
import type { 
  SiteContent, 
  Program, 
  BlogPost, 
  Review,
  NavigationItem,
  ComparisonData,
  WhyChooseItem,
  ChildChallenge,
  ScheduleFormContent,
  CountdownOfferContent,
  BottomBarContent,
  FAQItem
} from '@/types/content';

interface ExtendedSiteContent extends SiteContent {
  programDetailShared?: {
    childChallenges?: ChildChallenge[];
    comparison: ComparisonData;
    whyChooseUs: WhyChooseItem[];
  };
  scheduleForm?: ScheduleFormContent;
  countdownOffer?: CountdownOfferContent;
  bottomBar?: BottomBarContent;
}

interface ContentState {
  content: ExtendedSiteContent;
  isLoading: boolean;
  
  // Actions
  setContent: (content: ExtendedSiteContent) => void;
  
  // Getters
  getSiteInfo: () => SiteContent['site'];
  getNavigation: () => NavigationItem[];
  getHero: () => SiteContent['hero'];
  getAbout: () => SiteContent['about'];
  getBenefits: () => SiteContent['benefits'];
  getPrograms: () => Program[];
  getProgramBySlug: (slug: string) => Program | undefined;
  getReviews: () => Review[];
  getBlogPosts: () => BlogPost[];
  getFeaturedPosts: () => BlogPost[];
  getBlogPostBySlug: (slug: string) => BlogPost | undefined;
  getLocation: () => SiteContent['location'];
  getCta: () => SiteContent['cta'];
  getFooter: () => SiteContent['footer'];
  getSeo: (page: string) => SiteContent['seo'][string] | undefined;
  getProgramDetailShared: () => ExtendedSiteContent['programDetailShared'];
  getScheduleForm: () => ExtendedSiteContent['scheduleForm'];
  getCountdownOffer: () => ExtendedSiteContent['countdownOffer'];
  getBottomBar: () => ExtendedSiteContent['bottomBar'];
  getHomeFaqs: () => FAQItem[];
}

// Check if running in preview iframe
const isPreviewIframe = typeof window !== 'undefined' && (
  window.self !== window.top || 
  window.location.search.includes('_preview=1')
);

export const useContentStore = create<ContentState>((set, get) => ({
  content: siteContentData as ExtendedSiteContent,
  isLoading: false,
  
  setContent: (content) => set({ content }),
  
  getSiteInfo: () => get().content.site,
  getNavigation: () => get().content.navigation,
  getHero: () => get().content.hero,
  getAbout: () => get().content.about,
  getBenefits: () => get().content.benefits,
  getPrograms: () => get().content.programs,
  getProgramBySlug: (slug: string) => 
    get().content.programs.find(p => p.slug === slug),
  getReviews: () => get().content.reviews,
  getBlogPosts: () => get().content.blog,
  getFeaturedPosts: () => 
    get().content.blog.filter(post => post.featured),
  getBlogPostBySlug: (slug: string) => 
    get().content.blog.find(post => post.slug === slug),
  getLocation: () => get().content.location,
  getCta: () => get().content.cta,
  getFooter: () => get().content.footer,
  getSeo: (page: string) => get().content.seo[page],
  getProgramDetailShared: () => get().content.programDetailShared,
  getScheduleForm: () => get().content.scheduleForm,
  getCountdownOffer: () => get().content.countdownOffer,
  getBottomBar: () => get().content.bottomBar,
  getHomeFaqs: () => get().content.homeFaqs || [],
}));

// Listen for content updates from parent window when in preview iframe
if (isPreviewIframe && typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'contentUpdate' && event.data?.content) {
      useContentStore.getState().setContent(event.data.content);
    }
  });
}
