'use server';

import { s3Client, listSiteAssets } from '@/lib/s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';

export async function uploadAsset(formData: FormData, siteId: string) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const key = `${siteId}/assets/${file.name}`; // Simple naming: overwrite if exists

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);
    
    // Generate a signed URL for immediate display
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    
    // URL expires in 1 hour
    const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

    return { success: true, url, key };
  } catch (error) {
    console.error('Upload failed:', error);
    return { success: false, error: 'Upload failed' };
  }
}

export async function getAssets(siteId: string) {
  try {
    const keys = await listSiteAssets(siteId);
    if (!keys.length) {
      return { success: true, assets: [] };
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    // Convert keys to Asset objects expected by UI
    // Run in parallel for signed URLs
    const assets = await Promise.all(keys.map(async (key) => {
        const filename = key.split('/').pop() || key;
        const type = filename.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image';
        
        const getCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        });
        
        // Signed URL for each asset
        const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
        
        return {
            id: key,
            url, // Use the signed URL
            name: filename,
            type: type as 'image'|'video'|'logo',
            uploadedAt: new Date().toISOString(), 
            size: 0 
        };
    }));

    return { success: true, assets };
  } catch (error) {
    console.error('List assets failed:', error);
    return { success: false, error: 'Failed to list assets' };
  }
}
