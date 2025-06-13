'use client';

import { useEffect, useState } from 'react';

/**
 * ClientOnly component
 * 
 * This component only renders its children on the client side.
 * Use this to wrap components that should not be rendered during SSR,
 * such as third-party scripts or components that rely on browser APIs.
 * 
 * This helps avoid hydration mismatches when third-party scripts modify the DOM.
 */
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  // Safe check for window to ensure we're on the client
  const [hasMounted, setHasMounted] = useState(false);
  
  // Only run the effect on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Return null on first render (server-side)
  if (!hasMounted) {
    return null;
  }
  
  // Return children once mounted on client
  return <>{children}</>;
} 