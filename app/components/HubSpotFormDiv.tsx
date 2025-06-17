'use client';

import { useEffect, useState, useRef } from 'react';

interface HubSpotFormDivProps {
  region?: string;
  portalId: string;
  formId: string;
  className?: string;
}

export default function HubSpotFormDiv({
  region = 'na2',
  portalId,
  formId,
  className = '',
}: HubSpotFormDivProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log('HubSpot form div mounted, checking for form...');

    // Check if the form has been rendered by HubSpot
    const checkForForm = () => {
      if (formRef.current) {
        const hasForm = formRef.current.querySelector('.hs-form') || 
                       formRef.current.querySelector('form') ||
                       formRef.current.innerHTML.trim() !== '';
        
        if (hasForm) {
          console.log('HubSpot form found and rendered');
          setIsFormLoaded(true);
          return true;
        }
      }
      return false;
    };

    // Check immediately
    if (checkForForm()) return;

    // Keep checking for the form to appear
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds
    
    const interval = setInterval(() => {
      attempts++;
      console.log(`Checking for HubSpot form, attempt ${attempts}/${maxAttempts}`);
      
      if (checkForForm()) {
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        console.error('HubSpot form failed to load after 30 seconds');
        setHasError(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMounted]);

  // Don't render anything until mounted on client to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className={className}>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0C6BAF] border-t-transparent"></div>
          <span className="ml-3 text-gray-600">Loading form...</span>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg ${className}`}>
        <p className="font-semibold">Form Loading Error</p>
        <p className="text-sm">The contact form failed to load.</p>
        <p className="text-xs mt-2">
          Please contact us directly at{' '}
          <a href="mailto:michael@kerstentalentcapital.com" className="underline">
            michael@kerstentalentcapital.com
          </a>
        </p>
      </div>
    );
  }

  // Render the HubSpot form div only on client side
  return (
    <div className={className}>
      {!isFormLoaded && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0C6BAF] border-t-transparent"></div>
          <span className="ml-3 text-gray-600">Loading form...</span>
        </div>
      )}
      
      <div 
        ref={formRef}
        className="hs-form-html" 
        data-region={region} 
        data-form-id={formId} 
        data-portal-id={portalId}
        style={{ minHeight: isFormLoaded ? 'auto' : '400px' }}
      ></div>
    </div>
  );
} 