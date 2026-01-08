/**
 * Centralized API service for contact/lead submissions
 */

import type { FormContactData } from '@/lib/utils/formSubmission';
import { mapFormToContactAPI } from '@/lib/utils/formSubmission';

/**
 * API response structure
 */
export interface ContactAPIResponse {
  success: boolean;
  error: boolean;
  data?: unknown;
  message?: string;
}

/**
 * Contact API error
 */
export class ContactAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ContactAPIError';
  }
}

/**
 * Submits contact/lead data to the API Gateway
 * @param formData - Form data from user input
 * @param source - Source identifier for tracking
 * @param programId - Optional program ID
 * @returns Promise with API response
 */
export async function submitContact(
  formData: FormContactData,
  source: string,
  programId?: string
): Promise<ContactAPIResponse> {
  // Get environment variables
  const apiGatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  const dojoId = process.env.NEXT_PUBLIC_DOJO_ID;
  const dojoUserId = process.env.NEXT_PUBLIC_DOJO_USER_ID;
  
  // Validate required environment variables
  if (!apiGatewayUrl) {
    throw new ContactAPIError('API Gateway URL is not configured');
  }
  
  if (!dojoId) {
    throw new ContactAPIError('Dojo ID is not configured');
  }
  
  if (!dojoUserId) {
    throw new ContactAPIError('Dojo User ID is not configured');
  }
  
  // Map form data to API format
  const payload = mapFormToContactAPI(formData, source, programId);
  
  // Add required dojo fields
  const requestBody = {
    ...payload,
    dojoId,
    dojoUserId,
  };
  
  try {
    const response = await fetch(`${apiGatewayUrl}/contact/quickcontact-public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      let errorData: unknown;
      
      try {
        errorData = await response.json();
        if (typeof errorData === 'object' && errorData !== null && 'message' in errorData) {
          errorMessage = String(errorData.message);
        }
      } catch {
        // If JSON parsing fails, use default error message
      }
      
      throw new ContactAPIError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      error: false,
      data,
    };
  } catch (error) {
    if (error instanceof ContactAPIError) {
      throw error;
    }
    
    // Handle network errors or other exceptions
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new ContactAPIError(`Failed to submit contact: ${errorMessage}`);
  }
}

