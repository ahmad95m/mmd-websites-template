/**
 * Utility functions for form data transformation before API submission
 */

/**
 * Formats phone number to include country code if missing
 * Defaults to US (+1) if no country code detected
 * @param phone - Phone number string
 * @returns Formatted phone number with country code (e.g., +1234567890)
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If already starts with +, return as is (assuming it's valid)
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // If starts with 1 and has 11 digits, add +
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  // If has 10 digits, assume US number and add +1
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  // If has 11 digits without leading 1, add +1
  if (cleaned.length === 11) {
    return `+1${cleaned.slice(1)}`;
  }
  
  // Default: add +1 prefix
  return `+1${cleaned}`;
}

/**
 * Splits a full name into firstName and lastName
 * @param fullName - Full name string
 * @returns Object with firstName and optional lastName
 */
export function splitName(fullName: string): { firstName: string; lastName?: string } {
  if (!fullName) return { firstName: '' };
  
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);
  
  if (parts.length === 0) return { firstName: '' };
  if (parts.length === 1) return { firstName: parts[0] };
  
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  
  return { firstName, lastName };
}

/**
 * Generates a userName from full name
 * Format: fullname without spaces + "." + date + random string (8 digits total)
 * Example: "Ahmad Noor" -> "Ahmadnoor.76893223"
 * @param fullName - Full name string
 * @returns Generated userName
 */
export function generateUserName(fullName: string): string {
  // Remove all spaces and convert to lowercase
  const nameWithoutSpaces = fullName 
    ? fullName.replace(/\s+/g, '').toLowerCase()
    : 'user';
  
  // Generate date string (last 6 digits of timestamp)
  const dateStr = new Date().getTime().toString().slice(-6);
  
  // Generate random string (2 digits)
  const randomStr = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  
  // Combine: nameWithoutSpaces + "." + dateStr + randomStr (8 digits total)
  return `${nameWithoutSpaces}.${dateStr}${randomStr}`;
}

/**
 * Contact type enum matching API requirements
 */
export enum ContactType {
  Lead = 'Lead',
  Member = 'Member',
  TrialMember = 'Trial Member',
  FormerMember = 'Former Member',
}

/**
 * Form data structure for contact submission
 */
export interface FormContactData {
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  program?: string;
  programLabel?: string;
  message?: string;
}

/**
 * Maps form data to API contact submission format
 * @param formData - Form data from user input
 * @param source - Source identifier (e.g., "Schedule Form Modal")
 * @param programId - Optional program ID (MongoDB ObjectId)
 * @returns Formatted data ready for API submission
 */
export function mapFormToContactAPI(
  formData: FormContactData,
  source: string,
  programId?: string
) {
  // Handle name - prefer firstName/lastName if available, otherwise split name/fullName
  let firstName: string;
  let lastName: string | undefined;
  let fullNameForUserName: string;
  
  if (formData.firstName) {
    firstName = formData.firstName;
    lastName = formData.lastName;
    // Combine firstName and lastName for userName generation
    fullNameForUserName = lastName ? `${firstName} ${lastName}` : firstName;
  } else {
    const nameToSplit = formData.name || formData.fullName || '';
    const split = splitName(nameToSplit);
    firstName = split.firstName;
    lastName = split.lastName;
    fullNameForUserName = nameToSplit;
  }
  
  // Format phone number
  const formattedPhone = formatPhoneNumber(formData.phone);
  
  // Generate userName from full name
  const userName = generateUserName(fullNameForUserName);
  
  // Build API payload
  const payload: Record<string, unknown> = {
    firstName,
    email: formData.email,
    phone: formattedPhone,
    contactType: ContactType.Lead,
    source: source || 'Website Form',
    country: 'US',
    userName,
  };
  
  // Add optional fields
  if (lastName) {
    payload.lastName = lastName;
  }
  
  if (programId) {
    payload.program = programId;
  }
  
  if (formData.programLabel) {
    payload.programLabel = formData.programLabel;
  }
  
  return payload;
}

