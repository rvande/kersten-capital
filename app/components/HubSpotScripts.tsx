'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function HubSpotScripts() {
  useEffect(() => {
    // Add critical CSS for HubSpot widget to prevent layout shifts
    const addHubSpotStyles = () => {
      const style = document.createElement('style');
      style.id = 'hubspot-critical-styles';
      style.textContent = `
        #hubspot-messages-iframe-container {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 1000 !important;
          width: 0 !important;
          height: 0 !important;
          transition: all 0.3s ease !important;
          contain: layout style !important;
          will-change: transform !important;
        }
        #hubspot-conversations-iframe {
          max-width: 400px !important;
          max-height: 600px !important;
          border: none !important;
          contain: layout style !important;
        }
        .WidgetWrapper__Wrapper-sc-1bv4zy4-0,
        [class*="WidgetWrapper"] {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 1001 !important;
          transform: translateZ(0) !important;
          will-change: transform !important;
          contain: layout style !important;
          width: 60px !important;
          height: 60px !important;
          border-radius: 50% !important;
          overflow: hidden !important;
        }
        [class*="WidgetWrapper"]:hover {
          transform: translateZ(0) scale(1.05) !important;
          transition: transform 0.2s ease !important;
        }
        @media (max-width: 768px) {
          .WidgetWrapper__Wrapper-sc-1bv4zy4-0,
          [class*="WidgetWrapper"] {
            width: 50px !important;
            height: 50px !important;
            bottom: 15px !important;
            right: 15px !important;
          }
        }
      `;
      
      // Only add if not already present
      if (!document.getElementById('hubspot-critical-styles')) {
        document.head.appendChild(style);
      }
    };

    // Add styles immediately
    addHubSpotStyles();
  }, []);

  const handleHubSpotFormsLoad = () => {
    console.log('HubSpot forms script loaded');
    // Additional optimizations can be added here
  };

  const handleHubSpotTrackingLoad = () => {
    console.log('HubSpot tracking script loaded');
    // Set cache headers via JavaScript if possible
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Service worker will handle caching
    }
  };

  return (
    <>
      {/* HubSpot Forms Script */}
      <Script
        id="hubspot-script"
        src="https://js-na2.hsforms.net/forms/embed/developer/242773408.js"
        strategy="lazyOnload"
        onLoad={handleHubSpotFormsLoad}
      />
      
      {/* HubSpot Tracking Code */}
      <Script
        id="hs-script-loader"
        src="//js-na2.hs-scripts.com/242773408.js"
        strategy="lazyOnload"
        onLoad={handleHubSpotTrackingLoad}
      />
    </>
  );
} 