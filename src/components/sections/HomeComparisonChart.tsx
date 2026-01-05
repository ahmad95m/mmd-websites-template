"use client";
import { useContentStore } from '@/store/useContentStore';
import { ComparisonChart } from '@/components/sections/program/ComparisonChart';

export const HomeComparisonChart = () => {
  const { getProgramDetailShared, getSiteInfo } = useContentStore();
  const sharedData = getProgramDetailShared();
  const site = getSiteInfo();
  
  if (!sharedData?.comparison) {
    return null;
  }
  
  return (
    <ComparisonChart 
      data={sharedData.comparison} 
      siteName={site.name}
    />
  );
};
