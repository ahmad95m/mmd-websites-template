"use client";
import { useAdminStore, type SectionConfig } from '@/admin/store/useAdminStore';

/**
 * Hook to check if a section should be visible on a page
 * and to get sections in the correct order
 */
export function useSectionVisibility(pageId: string) {
  const { sectionConfig, isSectionVisible } = useAdminStore();
  
  const pageConfig = sectionConfig[pageId] || [];
  
  /**
   * Get ordered sections - returns section IDs sorted by their order in config
   * Sections not in config are placed at the end in their default order
   */
  const getOrderedSections = (defaultSections: string[]): string[] => {
    if (pageConfig.length === 0) {
      return defaultSections;
    }
    
    // Create a map of section order from config
    const orderMap = new Map<string, number>();
    pageConfig.forEach((section: SectionConfig, index: number) => {
      orderMap.set(section.id, section.order ?? index);
    });
    
    // Sort sections by their order in config
    // Sections not in config get placed at the end
    return [...defaultSections].sort((a, b) => {
      const orderA = orderMap.has(a) ? orderMap.get(a)! : defaultSections.indexOf(a) + 1000;
      const orderB = orderMap.has(b) ? orderMap.get(b)! : defaultSections.indexOf(b) + 1000;
      return orderA - orderB;
    });
  };
  
  return {
    isVisible: (sectionId: string) => isSectionVisible(pageId, sectionId),
    getOrderedSections,
    pageConfig
  };
}
