// S3 Upload Service with Pre-signed URLs
// Replace the mock API URL with your actual pre-signed URL endpoint

const PRESIGNED_URL_API = '/api/s3/presign'; // Replace with your actual API endpoint

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  key: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Mock response for development - remove when real API is connected
const getMockPresignedUrl = async (fileName: string, contentType: string): Promise<PresignedUrlResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const key = `uploads/${Date.now()}-${fileName}`;
  const mockBucketUrl = 'https://your-bucket.s3.amazonaws.com';
  
  return {
    uploadUrl: `${mockBucketUrl}/${key}?mock-presigned-url=true`,
    fileUrl: `${mockBucketUrl}/${key}`,
    key
  };
};

// Get pre-signed URL from your API
export async function getPresignedUrl(
  fileName: string, 
  contentType: string
): Promise<PresignedUrlResponse> {
  // TODO: Replace with actual API call when ready
  // Uncomment below and remove mock when you have the API
  
  /*
  const response = await fetch(PRESIGNED_URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName,
      contentType
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to get pre-signed URL');
  }
  
  return response.json();
  */
  
  // Using mock for now
  return getMockPresignedUrl(fileName, contentType);
}

// Upload file to S3 using pre-signed URL
export async function uploadToS3(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  // Get pre-signed URL
  const { uploadUrl, fileUrl } = await getPresignedUrl(file.name, file.type);
  
  // For mock mode, just return the mock URL after simulating upload
  if (uploadUrl.includes('mock-presigned-url')) {
    // Simulate upload progress
    const steps = [20, 40, 60, 80, 100];
    for (const percentage of steps) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onProgress?.({
        loaded: (file.size * percentage) / 100,
        total: file.size,
        percentage
      });
    }
    
    // Return a data URL for preview in mock mode
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  // Real S3 upload with progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage: Math.round((event.loaded / event.total) * 100)
        });
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(fileUrl);
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });
    
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

// Validate file before upload
export function validateFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] } = options;
  
  // Check file size
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type not allowed. Allowed: ${allowedTypes.join(', ')}` };
  }
  
  return { valid: true };
}
