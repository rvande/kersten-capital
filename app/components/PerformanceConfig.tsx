'use client';

import { useEffect } from 'react';

/**
 * Performance configuration component that sets up passive scroll listeners
 * to prevent the "Added non-passive event listener" warning
 */
export default function PerformanceConfig() {
  useEffect(() => {
    // Configure passive listeners for scroll-blocking events
    const configurePassiveListeners = () => {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        // Events that should be passive for better scroll performance
        const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];
        
        if (passiveEvents.includes(type)) {
          // If options is not an object, make it one with passive: true
          if (typeof options !== 'object') {
            options = { passive: true };
          } 
          // If options is object but passive not specified, set to true
          else if (options && typeof options === 'object' && options.passive === undefined) {
            options = { ...options, passive: true };
          }
        }
        
        return originalAddEventListener.call(this, type, listener, options);
      };
    };

    configurePassiveListeners();
  }, []);

  return null; // This component doesn't render anything
} 