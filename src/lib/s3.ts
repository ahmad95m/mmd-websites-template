import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import type { SiteContent as CoreSiteContent } from '@/types/content';

// Initialize S3 Client
// Ensure these environment variables are set in your .env.local or Vercel project settings
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Re-export or extend if necessary
export type SiteContent = CoreSiteContent;

export async function getSiteContent(siteId: string): Promise<SiteContent | null> {
  // Check if we are in dev mode and want to use local fallback
  if (process.env.NODE_ENV === 'development' && process.env.USE_LOCAL_CONTENT === 'true') {
     try {
       // Fallback to reading a local file for development
       // We'll require fs/promises dynamically to avoid build issues in edge/browser envs if they import this file
       const fs = await import('fs/promises');
       const path = await import('path');
       
       // Try to find a specific file for this site, or fallback to the default template
       // You can place these in src/data/
       const localPath = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
       
       const fileContent = await fs.readFile(localPath, 'utf-8');
       const parsed = JSON.parse(fileContent) as SiteContent;
       return parsed;
     } catch (e) {
       console.warn('[DEV] Failed to load local content, falling back to S3', e);
     }
  }

  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const key = `${siteId}/content.json`;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);
    
    if (!response.Body) {
      return null;
    }

    const str = await response.Body.transformToString();
    return JSON.parse(str) as SiteContent;
  } catch (error) {
    console.error(`Error fetching content for site ${siteId}:`, error);
    return null;
  }
}

export async function putSiteContent(siteId: string, content: SiteContent): Promise<boolean> {
  // Check if we are in dev mode and want to use local fallback
  if (process.env.NODE_ENV === 'development' && process.env.USE_LOCAL_CONTENT === 'true') {
     try {
       const fs = await import('fs/promises');
       const path = await import('path');
       const localPath = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
       
       await fs.writeFile(localPath, JSON.stringify(content, null, 2));
       return true;
     } catch (e) {
       console.warn('[DEV] Failed to save local content', e);
       throw new Error('Failed to save local content');
     }
  }

  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const key = `${siteId}/content.json`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: JSON.stringify(content, null, 2),
      ContentType: 'application/json',
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error(`Error saving content for site ${siteId}:`, error);
    throw new Error('Failed to save content to S3');
  }
}

export async function listSiteAssets(siteId: string): Promise<string[]> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const prefix = `${siteId}/assets/`;

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);
    
    // Return Keys
    return response.Contents?.map(c => c.Key || '').filter(Boolean) || [];
  } catch (error) {
    console.error(`Error listing assets for site ${siteId}:`, error);
    return [];
  }
}
