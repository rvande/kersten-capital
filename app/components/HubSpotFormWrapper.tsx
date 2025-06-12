'use client';

import React, { useEffect, useRef, useState } from 'react';

interface HubSpotFormProps {
  region?: string;
  portalId: string;
  formId: string;
  className?: string;
}

/**
 * A wrapper component for HubSpot forms that handles errors and loading states
 */
export default function HubSpotFormWrapper({
  region = 'na2',
  portalId,
  formId,
  className = '',
}: HubSpotFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Safety check for the HubSpot object
    if (!window.hbspt) {
      const checkForHubspot = setInterval(() => {
        if (window.hbspt) {
          clearInterval(checkForHubspot);
          initForm();
        }
      }, 300);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkForHubspot);
        if (!window.hbspt) {
          console.error('HubSpot script failed to load within timeout period');
          setHasError(true);
          setIsLoading(false);
        }
      }, 10000);
      
      return () => clearInterval(checkForHubspot);
    } else {
      initForm();
    }
    
    function initForm() {
      try {
        if (formContainerRef.current) {
          // Clear any existing content first
          formContainerRef.current.innerHTML = '';
          
          window.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#hubspot-form-container-${formId}`,
            onFormReady: () => {
              setIsLoading(false);
            },
            onFormSubmit: () => {
              // Optional tracking or other actions on form submit
            },
            onFormError: (error: any) => {
              console.error('HubSpot form error:', error);
              setHasError(true);
              setIsLoading(false);
            }
          });
        }
      } catch (error) {
        console.error('Error initializing HubSpot form:', error);
        setHasError(true);
        setIsLoading(false);
      }
    }
  }, [region, portalId, formId]);
  
  return (
    <div className={className}>
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0C6BAF] border-t-transparent"></div>
        </div>
      )}
      
      {hasError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>There was an error loading the form. Please refresh the page or try again later.</p>
        </div>
      )}
      
      <div 
        id={`hubspot-form-container-${formId}`}
        ref={formContainerRef}
        className={isLoading ? 'hidden' : ''}
      ></div>
    </div>
  );
}

// Add TypeScript declaration for HubSpot
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: any) => void;
      };
    };
  }
} 