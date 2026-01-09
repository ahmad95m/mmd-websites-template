
import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key');

  if (!key) {
    return new NextResponse('Missing key parameter', { status: 400 });
  }

  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    // Convert the stream to a Web Response body
    const stream = response.Body.transformToWebStream();

    const headers = new Headers();
    if (response.ContentType) {
      headers.set('Content-Type', response.ContentType);
    }
    if (response.CacheControl) {
      headers.set('Cache-Control', response.CacheControl);
    } else {
      // Default cache for 1 hour
      headers.set('Cache-Control', 'public, max-age=3600');
    }

    return new NextResponse(stream, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching asset:', error);
    return new NextResponse('Error fetching asset', { status: 500 });
  }
}
