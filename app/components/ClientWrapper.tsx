'use client';

import React, { useState, useEffect } from 'react';

/**
 * ClientWrapper component
 * 
 * This component ensures that its children are only rendered on the client side.
 * Use this to wrap components that use React hooks like useState and useEffect
 * to prevent "Cannot read properties of null (reading 'useState')" errors.
 * 
 * @param children The components to render on the client side
 * @param fallback Optional fallback UI to show during server rendering
 */
export default function ClientWrapper({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return fallback ? <>{fallback}</> : null;
  }
  
  return <>{children}</>;
} 