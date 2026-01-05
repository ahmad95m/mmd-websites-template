import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import siteContentData from '@/data/siteContent.json';
import type { SiteContent } from '@/types/content';
import type { AdminStore, EnhancedSEOContent, LLMContent, TechnicalSEO, Asset, AssetType } from '../types';

// Section configuration for visibility and order
export interface SectionConfig {
  id: string;
  enabled: boolean;
  order: number;
}

export interface PageSectionConfig {
  [pageId: string]: SectionConfig[];
}

// Extended store type with section config
export interface AdminStoreExtended extends AdminStore {
  sectionConfig: PageSectionConfig;
  updateSectionConfig: (pageId: string, sections: SectionConfig[]) => void;
  toggleSection: (pageId: string, sectionId: string) => void;
  reorderSections: (pageId: string, sections: SectionConfig[]) => void;
  resetPageSections: (pageId: string, defaultSections: SectionConfig[]) => void;
  resetAllPageSections: (allDefaults: PageSectionConfig) => void;
  isSectionVisible: (pageId: string, sectionId: string) => boolean;
}

// Default LLM Content based on existing llms.txt
const defaultLLMContent: LLMContent = {
  businessSummary: "APEX Martial Arts Academy is Arizona's premier martial arts training center, offering world-class instruction for all ages. We specialize in character development, physical fitness, and self-defense through traditional and modern martial arts disciplines.",
  companyInfo: {
    name: "APEX Martial Arts Academy",
    industry: "Martial Arts Education & Training",
    foundedYear: "2009",
    serviceArea: "Phoenix Metropolitan Area, Arizona"
  },
  locations: [
    {
      name: "Chandler Main Location",
      address: "1250 W Chandler Blvd, Suite 100, Chandler, AZ 85224",
      phone: "(480) 555-1234",
      email: "chandler@apexmartialarts.com",
      hours: "Mon-Fri: 3PM-9PM, Sat: 9AM-2PM, Sun: Closed"
    }
  ],
  programs: [
    {
      name: "Little Champions",
      ageRange: "5-7 years",
      description: "Foundation martial arts program designed for young learners",
      focus: ["Basic techniques", "Motor skills", "Discipline basics", "Fun activities"]
    },
    {
      name: "Junior Warriors",
      ageRange: "8-12 years",
      description: "Comprehensive training building confidence and skill",
      focus: ["Advanced techniques", "Self-defense", "Goal setting", "Leadership"]
    },
    {
      name: "Teen Elite",
      ageRange: "13-17 years",
      description: "High-level training for competitive and personal growth",
      focus: ["Competition prep", "Mental toughness", "Physical conditioning", "Life skills"]
    },
    {
      name: "Adult Martial Arts",
      ageRange: "18+ years",
      description: "Complete fitness and self-defense for adults",
      focus: ["Self-defense", "Fitness", "Stress relief", "Community"]
    }
  ],
  features: [
    "Expert certified instructors with decades of experience",
    "State-of-the-art training facilities",
    "Free trial classes available",
    "Age-appropriate curriculum for all skill levels"
  ],
  awards: [
    "Voted #1 Martial Arts Academy in Chandler 2023",
    "Arizona Business Excellence Award 2022",
    "Best Kids Activity Program - Phoenix Family Magazine 2023"
  ],
  faqs: [
    { question: "What age can children start martial arts?", answer: "We accept students as young as 5 years old in our Little Champions program." },
    { question: "Do you offer trial classes?", answer: "Yes! We offer a free trial class for all new students." },
    { question: "What styles of martial arts do you teach?", answer: "We teach a blend of traditional and modern martial arts including Karate, Taekwondo, and Brazilian Jiu-Jitsu elements." }
  ],
  contactInfo: {
    generalEmail: "info@apexmartialarts.com",
    mainPhone: "(480) 555-1234",
    website: "https://apexmartialarts.com"
  },
  socialMedia: {
    facebook: "https://facebook.com/apexmartialarts",
    instagram: "https://instagram.com/apexmartialarts",
    youtube: "https://youtube.com/apexmartialarts"
  },
  seoKeywords: [
    "martial arts chandler az",
    "kids martial arts classes",
    "karate lessons arizona",
    "self defense classes phoenix",
    "martial arts for children"
  ]
};

// Default Technical SEO
const defaultTechnicalSEO: TechnicalSEO = {
  robotsTxt: `User-agent: *
Allow: /

# Sitemap
Sitemap: https://apexmartialarts.com/sitemap.xml

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: anthropic-ai
Allow: /`,
  sitemapXml: '',
  llmsTxt: '',
  baseUrl: 'https://apexmartialarts.com'
};

// SECURITY WARNING: This uses hardcoded credentials for demo purposes only.
// In production, implement proper authentication with Supabase or similar.
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Detect if running in an iframe preview context
const isPreviewIframe = typeof window !== 'undefined' && (
  window.self !== window.top || 
  window.location.search.includes('_preview=1')
);

export const useAdminStore = create<AdminStoreExtended>()(
  persist(
    (set, get) => ({
      // Initial State
      isAuthenticated: false,
      draftContent: siteContentData as unknown as SiteContent,
      publishedContent: siteContentData as unknown as SiteContent,
      hasUnsavedChanges: false,
      seoContent: {},
      llmContent: defaultLLMContent,
      technicalSEO: defaultTechnicalSEO,
      assetLibrary: [],
      activeTemplate: 'template1',
      previewDevice: 'desktop',
      previewUrl: '/',
      sidebarCollapsed: false,
      activeSection: null,
      sectionConfig: {},

      // Auth Actions
      login: (username: string, password: string) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      // Content Actions
      updateDraft: <T,>(path: string, value: T) => {
        set((state) => {
          const pathParts = path.split('.');
          const newDraft = JSON.parse(JSON.stringify(state.draftContent));
          
          let current: Record<string, unknown> = newDraft;
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (part.includes('[')) {
              const [key, indexStr] = part.split('[');
              const index = parseInt(indexStr.replace(']', ''));
              current = (current[key] as unknown[])[index] as Record<string, unknown>;
            } else {
              current = current[part] as Record<string, unknown>;
            }
          }
          
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart.includes('[')) {
            const [key, indexStr] = lastPart.split('[');
            const index = parseInt(indexStr.replace(']', ''));
            (current[key] as unknown[])[index] = value;
          } else {
            current[lastPart] = value;
          }
          
          return { 
            draftContent: newDraft,
            hasUnsavedChanges: true
          };
        });
      },

      publish: () => {
        set((state) => ({
          publishedContent: JSON.parse(JSON.stringify(state.draftContent)),
          hasUnsavedChanges: false
        }));
      },

      revert: () => {
        set((state) => ({
          draftContent: JSON.parse(JSON.stringify(state.publishedContent)),
          hasUnsavedChanges: false
        }));
      },

      // SEO Actions
      updateSEO: (page: string, seo: Partial<EnhancedSEOContent>) => {
        set((state) => ({
          seoContent: {
            ...state.seoContent,
            [page]: { ...state.seoContent[page], ...seo }
          },
          hasUnsavedChanges: true
        }));
      },

      updateLLMContent: (content: Partial<LLMContent>) => {
        set((state) => ({
          llmContent: { ...state.llmContent, ...content },
          hasUnsavedChanges: true
        }));
      },

      updateTechnicalSEO: (files: Partial<TechnicalSEO>) => {
        set((state) => ({
          technicalSEO: { ...state.technicalSEO, ...files },
          hasUnsavedChanges: true
        }));
      },

      // Asset Library Actions
      addAsset: (asset: Asset) => {
        set((state) => ({
          assetLibrary: [...state.assetLibrary, asset],
          hasUnsavedChanges: true
        }));
      },

      removeAsset: (assetId: string) => {
        set((state) => ({
          assetLibrary: state.assetLibrary.filter(a => a.id !== assetId),
          hasUnsavedChanges: true
        }));
      },

      updateAsset: (assetId: string, updates: Partial<Asset>) => {
        set((state) => ({
          assetLibrary: state.assetLibrary.map(a => 
            a.id === assetId ? { ...a, ...updates } : a
          ),
          hasUnsavedChanges: true
        }));
      },

      getAssetsByType: (type: AssetType) => {
        return get().assetLibrary.filter(a => a.type === type);
      },

      // Export/Import
      exportJSON: () => {
        const state = get();
        const exportData = {
          version: '1.0',
          content: state.draftContent, // Export draft content (current edits)
          seo: state.seoContent,
          llm: state.llmContent,
          technicalSEO: state.technicalSEO,
          assetLibrary: state.assetLibrary,
          template: state.activeTemplate,
          exportedAt: new Date().toISOString()
        };
        return JSON.stringify(exportData, null, 2);
      },

      importJSON: (json: string): { success: boolean; error?: string } => {
        try {
          // Parse JSON
          const data = JSON.parse(json);
          
          // Validate that this is an export file (should have content field)
          if (!data || typeof data !== 'object') {
            return { success: false, error: 'Invalid file format: File must be a valid JSON object.' };
          }

          if (!data.content) {
            return { success: false, error: 'Invalid export file: Missing required "content" field. This file may not be a valid site content export.' };
          }

          // Validate content structure (should be an object)
          if (typeof data.content !== 'object' || Array.isArray(data.content)) {
            return { success: false, error: 'Invalid content structure: Content must be an object.' };
          }

          // Import all fields with proper defaults
          set({
            draftContent: data.content,
            publishedContent: data.content, // Set published to match imported content
            seoContent: data.seo && typeof data.seo === 'object' ? data.seo : {},
            llmContent: data.llm && typeof data.llm === 'object' ? { ...defaultLLMContent, ...data.llm } : defaultLLMContent,
            technicalSEO: data.technicalSEO && typeof data.technicalSEO === 'object' 
              ? { ...defaultTechnicalSEO, ...data.technicalSEO } 
              : defaultTechnicalSEO,
            assetLibrary: Array.isArray(data.assetLibrary) ? data.assetLibrary : [],
            activeTemplate: data.template && ['template1', 'template2', 'template3'].includes(data.template)
              ? data.template
              : 'template1',
            hasUnsavedChanges: false
          });

          return { success: true };
        } catch (error) {
          // Provide specific error messages
          if (error instanceof SyntaxError) {
            return { success: false, error: `Invalid JSON format: ${error.message}. Please ensure the file is valid JSON.` };
          }
          return { success: false, error: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
        }
      },

      // Template
      setTemplate: (template) => {
        set({ activeTemplate: template });
      },

      // Preview
      setPreviewDevice: (device) => {
        set({ previewDevice: device });
      },

      setPreviewUrl: (url) => {
        set({ previewUrl: url });
      },

      // UI
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },

      setActiveSection: (section) => {
        set({ activeSection: section });
      },

      // Section Config Actions
      updateSectionConfig: (pageId: string, sections: SectionConfig[]) => {
        set((state) => ({
          sectionConfig: {
            ...state.sectionConfig,
            [pageId]: sections
          },
          hasUnsavedChanges: true
        }));
      },

      toggleSection: (pageId: string, sectionId: string) => {
        set((state) => {
          const currentSections = state.sectionConfig[pageId] || [];
          const sectionIndex = currentSections.findIndex(s => s.id === sectionId);
          
          if (sectionIndex === -1) {
            // Section not in config, add it as disabled
            return {
              sectionConfig: {
                ...state.sectionConfig,
                [pageId]: [...currentSections, { id: sectionId, enabled: false, order: currentSections.length }]
              },
              hasUnsavedChanges: true
            };
          }
          
          // Toggle existing section
          const newSections = [...currentSections];
          newSections[sectionIndex] = {
            ...newSections[sectionIndex],
            enabled: !newSections[sectionIndex].enabled
          };
          
          return {
            sectionConfig: {
              ...state.sectionConfig,
              [pageId]: newSections
            },
            hasUnsavedChanges: true
          };
        });
      },

      reorderSections: (pageId: string, sections: SectionConfig[]) => {
        set((state) => ({
          sectionConfig: {
            ...state.sectionConfig,
            [pageId]: sections.map((s, i) => ({ ...s, order: i }))
          },
          hasUnsavedChanges: true
        }));
      },

      resetPageSections: (pageId: string, defaultSections: SectionConfig[]) => {
        set((state) => ({
          sectionConfig: {
            ...state.sectionConfig,
            [pageId]: defaultSections
          },
          hasUnsavedChanges: true
        }));
      },

      resetAllPageSections: (allDefaults: PageSectionConfig) => {
        set(() => ({
          sectionConfig: allDefaults,
          hasUnsavedChanges: true
        }));
      },

      isSectionVisible: (pageId: string, sectionId: string) => {
        const config = get().sectionConfig[pageId];
        if (!config || config.length === 0) return true; // Default to visible
        const section = config.find(s => s.id === sectionId);
        return section ? section.enabled : true;
      }
    }),
    {
      name: 'admin-store',
      // Skip persistence entirely when running in preview iframe to avoid conflicts
      skipHydration: isPreviewIframe,
      partialize: (state) => {
        // Don't persist anything if in preview iframe
        if (isPreviewIframe) {
          return {};
        }
        return {
          isAuthenticated: state.isAuthenticated,
          draftContent: state.draftContent,
          publishedContent: state.publishedContent,
          seoContent: state.seoContent,
          llmContent: state.llmContent,
          technicalSEO: state.technicalSEO,
          assetLibrary: state.assetLibrary,
          activeTemplate: state.activeTemplate,
          sectionConfig: state.sectionConfig
        };
      }
    }
  )
);
