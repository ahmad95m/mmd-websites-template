"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  SiteInfoEditor,
  TopBarEditor,
  HeroEditor,
  AboutEditor,
  BenefitsEditor,
  ProgramsEditor,
  ReviewsEditor,
  BlogEditor,
  LocationEditor,
  CTAEditor,
  FooterEditor,
  NavigationEditor,
  CalendarEditor,
  BirthdayEditor,
  FormsEditor,
  AssetLibraryEditor
} from '@/admin/components/editors';
import { HomeFAQEditor } from '@/admin/components/editors/HomeFAQEditor';

const editors: Record<string, React.ComponentType> = {
  'site-info': SiteInfoEditor,
  'topbar': TopBarEditor,
  'navigation': NavigationEditor,
  'hero': HeroEditor,
  'about': AboutEditor,
  'benefits': BenefitsEditor,
  'programs': ProgramsEditor,
  'reviews': ReviewsEditor,
  'blog': BlogEditor,
  'calendar': CalendarEditor,
  'birthday': BirthdayEditor,
  'location': LocationEditor,
  'cta': CTAEditor,
  'footer': FooterEditor,
  'forms': FormsEditor,
  'home-faqs': HomeFAQEditor,
  'asset-library': AssetLibraryEditor,
};

export function ContentEditor() {
  const params = useParams();
  const router = useRouter();
  
  // Handle section param being string or array
  const section = params?.section;
  const sectionId = Array.isArray(section) ? section[0] : section;

  useEffect(() => {
    if (!sectionId || !editors[sectionId]) {
      router.replace('/admin');
    }
  }, [sectionId, router]);

  if (!sectionId || !editors[sectionId]) {
    return null;
  }

  const EditorComponent = editors[sectionId];

  return <EditorComponent />;
}

export default ContentEditor;
