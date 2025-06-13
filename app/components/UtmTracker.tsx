'use client';

import { useEffect } from 'react';
import { initUtmTracking } from '../utils/utm-tracking';

export default function UtmTracker() {
  useEffect(() => {
    // Initialize UTM tracking when the component mounts
    initUtmTracking();
  }, []);

  // This component doesn't render anything
  return null;
} 