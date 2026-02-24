'use client';

import Script from 'next/script';

/**
 * Loads GTM on the client only so the root layout HTML stays deterministic for ISR.
 * Avoids new Date().getTime() in server-rendered output, which would trigger unnecessary ISR writes.
 */
const GTM_ID = 'GTM-M2MDFV5J';

export default function GtmClient() {
  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  );
}
