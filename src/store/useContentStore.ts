'use client';

import { createStore, useStore } from 'zustand';
import { createContext, useContext } from 'react';
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

export interface ExtendedSiteContent extends SiteContent {
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

export type ContentStore = ReturnType<typeof createContentStore>;

export const createContentStore = (initProps?: Partial<ExtendedSiteContent>) => {
  return createStore<ContentState>((set, get) => ({
    content: (initProps || {}) as ExtendedSiteContent,
    isLoading: false,
    
    setContent: (content) => set({ content }),
    
    getSiteInfo: () => get().content?.site,
    getNavigation: () => get().content?.navigation,
    getHero: () => get().content?.hero,
    getAbout: () => get().content?.about,
    getBenefits: () => get().content?.benefits,
    getPrograms: () => get().content?.programs || [],
    getProgramBySlug: (slug: string) => 
      get().content?.programs?.find(p => p.slug === slug),
    getReviews: () => get().content?.reviews,
    getBlogPosts: () => get().content?.blog || [],
    getFeaturedPosts: () => 
      get().content?.blog?.filter(post => post.featured) || [],
    getBlogPostBySlug: (slug: string) => 
      get().content?.blog?.find(post => post.slug === slug),
    getLocation: () => get().content?.location,
    getCta: () => get().content?.cta,
    getFooter: () => get().content?.footer,
    getSeo: (page: string) => get().content?.seo?.[page],
    getProgramDetailShared: () => get().content?.programDetailShared,
    getScheduleForm: () => get().content?.scheduleForm,
    getCountdownOffer: () => get().content?.countdownOffer,
    getBottomBar: () => get().content?.bottomBar,
    getHomeFaqs: () => get().content?.homeFaqs || [],
  }));
};

export const ContentStoreContext = createContext<ContentStore | null>(null);

export function useContentStore(): ContentState;
export function useContentStore<T>(selector: (state: ContentState) => T): T;
export function useContentStore<T>(
  selector?: (state: ContentState) => T,
) {
  const store = useContext(ContentStoreContext);
  if (!store) throw new Error('Missing ContentStoreProvider in tree');
  // @ts-expect-error - Zustand useStore typing is tricky with optional selector
  return useStore(store, selector || ((state) => state));
}


