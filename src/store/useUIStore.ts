"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeId = 'ember' | 'ocean' | 'forest' | 'royal' | 'midnight' | 'titan' | 'muv';

interface UIState {
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  activeSection: string;
  currentTheme: ThemeId;
  isScheduleModalOpen: boolean;
  hasShownInitialPopup: boolean;
  
  // Actions
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setIsScrolled: (scrolled: boolean) => void;
  setActiveSection: (section: string) => void;
  setTheme: (theme: ThemeId) => void;
  openScheduleModal: () => void;
  closeScheduleModal: () => void;
  setHasShownInitialPopup: (shown: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isScrolled: false,
      activeSection: 'home',
      currentTheme: 'ember',
      isScheduleModalOpen: false,
      hasShownInitialPopup: false,
      
      toggleMobileMenu: () => 
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => 
        set({ isMobileMenuOpen: false }),
      setIsScrolled: (scrolled: boolean) => 
        set({ isScrolled: scrolled }),
      setActiveSection: (section: string) => 
        set({ activeSection: section }),
      setTheme: (theme: ThemeId) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ currentTheme: theme });
      },
      openScheduleModal: () => 
        set({ isScheduleModalOpen: true }),
      closeScheduleModal: () => 
        set({ isScheduleModalOpen: false }),
      setHasShownInitialPopup: (shown: boolean) => 
        set({ hasShownInitialPopup: shown }),
    }),
    {
      name: 'ui-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.currentTheme) {
          document.documentElement.setAttribute('data-theme', state.currentTheme);
        }
      },
    }
  )
);
