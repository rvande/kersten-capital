'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      
      window.gtag('config', 'G-FQHCGHJMMW', {
        page_location: window.location.origin + url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FQHCGHJMMW"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FQHCGHJMMW', {
            page_location: window.location.href,
            page_title: document.title,
          });
        `}
      </Script>
    </>
  );
} 