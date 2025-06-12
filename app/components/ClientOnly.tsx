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
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only render children on the client side
  if (!mounted) {
    return null;
  }
  
  return <>{children}</>;
} 