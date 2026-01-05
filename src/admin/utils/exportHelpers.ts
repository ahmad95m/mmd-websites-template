// Export utilities for admin panel

export function downloadJSON(data: string, filename: string): void {
  // Validate that data is valid JSON
  try {
    JSON.parse(data);
  } catch (error) {
    throw new Error('Invalid JSON data: Cannot export. Data must be valid JSON.');
  }

  // Ensure filename has .json extension
  const filenameWithExtension = filename.endsWith('.json') 
    ? filename 
    : `${filename}.json`;

  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filenameWithExtension;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatDateTime(date: Date): string {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

// CSV Export for form submissions
export function exportToCSV<T extends Record<string, unknown>>(data: T[], filename: string): void {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        const stringValue = String(value ?? '');
        // Escape quotes and wrap in quotes if contains comma
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');
  
  downloadFile(csvContent, filename, 'text/csv');
}

// Deep clone utility
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Path-based object access
export function getByPath<T>(obj: Record<string, unknown>, path: string): T | undefined {
  const parts = path.split('.');
  let current: unknown = obj;
  
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    
    if (part.includes('[')) {
      const [key, indexStr] = part.split('[');
      const index = parseInt(indexStr.replace(']', ''));
      current = (current as Record<string, unknown>)[key];
      if (Array.isArray(current)) {
        current = current[index];
      }
    } else {
      current = (current as Record<string, unknown>)[part];
    }
  }
  
  return current as T;
}

export function setByPath<T>(obj: Record<string, unknown>, path: string, value: T): void {
  const parts = path.split('.');
  let current: Record<string, unknown> = obj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    
    if (part.includes('[')) {
      const [key, indexStr] = part.split('[');
      const index = parseInt(indexStr.replace(']', ''));
      current = (current[key] as unknown[])[index] as Record<string, unknown>;
    } else {
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    }
  }
  
  const lastPart = parts[parts.length - 1];
  if (lastPart.includes('[')) {
    const [key, indexStr] = lastPart.split('[');
    const index = parseInt(indexStr.replace(']', ''));
    (current[key] as unknown[])[index] = value;
  } else {
    current[lastPart] = value;
  }
}
