'use client';

import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  region?: string;
  portalId: string;
  formId: string;
  className?: string;
}

/**
 * HubSpotForm component
 * 
 * This component safely loads and renders a HubSpot form on the client side.
 * It handles checking for the HubSpot script and creating the form once available.
 */
export default function HubSpotForm({
  region = 'na2',
  portalId,
  formId,
  className = '',
}: HubSpotFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const createForm = () => {
      if (!formContainerRef.current || !window.hbspt) return;
      
      // Clear any existing content first
      formContainerRef.current.innerHTML = '';
      
      // Create the HubSpot form
      window.hbspt.forms.create({
        region: region,
        portalId: portalId,
        formId: formId,
        target: `#hubspot-form-${formId}`,
      });
    };
    
    // Check if HubSpot script is already loaded
    if (window.hbspt && window.hbspt.forms) {
      createForm();
    } else {
      // Wait for HubSpot script to load
      const checkForHubspot = setInterval(() => {
        if (window.hbspt && window.hbspt.forms) {
          clearInterval(checkForHubspot);
          createForm();
        }
      }, 300);
      
      // Cleanup interval after 10 seconds if script fails to load
      setTimeout(() => {
        clearInterval(checkForHubspot);
      }, 10000);
      
      return () => clearInterval(checkForHubspot);
    }
  }, [region, portalId, formId]);
  
  return (
    <div 
      id={`hubspot-form-${formId}`}
      ref={formContainerRef}
      className={className}
    ></div>
  );
} 