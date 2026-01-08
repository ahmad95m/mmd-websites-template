'use server';

import { putSiteContent } from '@/lib/s3';
import { SiteContent } from '@/types/content';
import { revalidatePath } from 'next/cache';

export async function saveSiteContent(siteId: string, content: SiteContent) {
  try {
    // In a real app, verify authentication/authorization here
    // e.g. check session or API key
    
    await putSiteContent(siteId, content);
    
    // Revalidate the site pages so the new content shows up immediately (if using ISR/Hybrid)
    revalidatePath('/sites/[site]'); 
    
    return { success: true };
  } catch (error) {
    console.error('Failed to save site content:', error);
    return { success: false, error: 'Failed to save changes' };
  }
}
