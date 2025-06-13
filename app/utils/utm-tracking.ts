/**
 * UTM Tracking Utility
 * 
 * This utility handles capturing, storing, and retrieving UTM parameters from URLs
 * for integration with HubSpot tracking.
 */

// Define the UTM parameters we want to track
export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

// Storage key for localStorage
const UTM_STORAGE_KEY = 'kersten_utm_params';

// Cookie expiration in days
const COOKIE_EXPIRATION_DAYS = 30;

/**
 * Extract UTM parameters from the current URL
 */
export function extractUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};
  
  const url = new URL(window.location.href);
  const params: UtmParams = {};
  
  // Extract each UTM parameter if it exists
  if (url.searchParams.has('utm_source')) params.utm_source = url.searchParams.get('utm_source') || undefined;
  if (url.searchParams.has('utm_medium')) params.utm_medium = url.searchParams.get('utm_medium') || undefined;
  if (url.searchParams.has('utm_campaign')) params.utm_campaign = url.searchParams.get('utm_campaign') || undefined;
  if (url.searchParams.has('utm_content')) params.utm_content = url.searchParams.get('utm_content') || undefined;
  if (url.searchParams.has('utm_term')) params.utm_term = url.searchParams.get('utm_term') || undefined;
  
  return params;
}

/**
 * Save UTM parameters to localStorage and cookies for persistence
 */
export function saveUtmParams(params: UtmParams): void {
  if (typeof window === 'undefined' || Object.keys(params).length === 0) return;
  
  // Save to localStorage
  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  
  // Also save as cookies for server-side access
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + COOKIE_EXPIRATION_DAYS);
  const cookieOptions = `; path=/; expires=${expirationDate.toUTCString()}`;
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      document.cookie = `${key}=${encodeURIComponent(value)}${cookieOptions}`;
    }
  });
}

/**
 * Get stored UTM parameters from localStorage
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};
  
  try {
    const storedParams = localStorage.getItem(UTM_STORAGE_KEY);
    return storedParams ? JSON.parse(storedParams) : {};
  } catch (error) {
    console.error('Error retrieving UTM params:', error);
    return {};
  }
}

/**
 * Add UTM parameters to HubSpot forms
 * This should be called after HubSpot forms are loaded
 */
export function addUtmParamsToHubSpotForms(): void {
  if (typeof window === 'undefined' || !window.hbspt) return;
  
  const utmParams = getStoredUtmParams();
  if (Object.keys(utmParams).length === 0) return;
  
  // Add event listener for HubSpot form creation
  const originalRenderForm = window.hbspt?.forms?.create;
  if (originalRenderForm) {
    window.hbspt.forms.create = function(options: any) {
      // Add UTM parameters to the form's hidden fields
      if (!options.hiddenFields) options.hiddenFields = {};
      
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) {
          options.hiddenFields[key] = value;
        }
      });
      
      return originalRenderForm(options);
    };
  }
}

/**
 * Initialize UTM tracking
 * This should be called on the client side when the page loads
 */
export function initUtmTracking(): void {
  if (typeof window === 'undefined') return;
  
  // Extract UTM parameters from URL
  const currentUtmParams = extractUtmParams();
  
  // If we have UTM parameters in the URL, save them
  if (Object.keys(currentUtmParams).length > 0) {
    saveUtmParams(currentUtmParams);
  }
  
  // Add UTM parameters to HubSpot forms when they load
  // We need to wait for HubSpot script to load
  if (window.hbspt) {
    addUtmParamsToHubSpotForms();
  } else {
    // Wait for HubSpot script to load
    window.addEventListener('load', () => {
      setTimeout(addUtmParamsToHubSpotForms, 1000);
    });
  }
}

// Add type definition for HubSpot
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: any) => any;
      };
    } | undefined;
  }
} 