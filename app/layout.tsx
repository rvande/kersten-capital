import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Montserrat, Open_Sans } from "next/font/google";
import "../app/globals.css";
import { getGlobalData } from "./api/api";
import { getStrapiMedia } from "./utils/media";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FaqFooterWrapper from "./components/FaqFooterWrapper";
import ScrollToTop from "./components/ScrollToTop";
import { generateIconMetadata, generateOgImages } from "./utils/favicon";
import Script from 'next/script';
import UtmTracker from "./components/UtmTracker";
import { generateOrganizationSchema } from "./utils/seo";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { MotionConfig } from "framer-motion";
import PerformanceConfig from './components/PerformanceConfig';
import HeadSchema from './components/HeadSchema';
import { generateHreflangTags, generateOptimalMetaTitle, generateOptimalMetaDescription } from './utils/seo';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
});

// This function generates the metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const globalData = await getGlobalData();
    const global = globalData.data;
    
    const { metaTitle, metaDescription, shareImage, twitterCardType, twitterUsername } = global.metadata;
    const metadataTitle = `${metaTitle} | ${global.metaTitleSuffix}`;
    
    // Generate icons metadata
    const iconMetadata = generateIconMetadata(global.favicon);
    
    // Generate OG images from shareImage or fallback to favicon
    const ogImages = shareImage 
      ? generateOgImages(shareImage, metaTitle)
      : generateOgImages(global.favicon, metaTitle);
    
    // Ensure we always have at least one OG image
    const finalOgImages = ogImages.length > 0 ? ogImages : [{
      url: 'https://kerstencapital.s3.us-east-1.amazonaws.com/OG_Image_ff4eaa3237.png',
      width: 1200,
      height: 630,
      alt: metaTitle || 'Kersten Talent Capital',
    }];
    
    // Get site URL from environment variable or default
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

    // Generate hreflang tags for homepage
    const hreflangTags = generateHreflangTags('', siteUrl);

    // Generate optimal meta title and description
    const optimalTitle = generateOptimalMetaTitle(metaTitle, global.metaTitleSuffix);
    const optimalDescription = generateOptimalMetaDescription(metaDescription);

    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: optimalTitle,
        template: `%s | ${global.metaTitleSuffix}`,
      },
      description: optimalDescription,
      alternates: {
        canonical: siteUrl,
        languages: {
          'en-US': siteUrl,
          'en-CA': siteUrl,
          'en-GB': siteUrl,
          'en-AU': siteUrl,
          'x-default': siteUrl,
        },
      },
      openGraph: {
        title: optimalTitle,
        description: optimalDescription,
        url: siteUrl,
        siteName: global.metaTitleSuffix,
        images: finalOgImages.map(img => ({
          url: img.url,
          width: img.width,
          height: img.height,
          alt: img.alt,
        })),
        type: 'website',
        locale: 'en_US',
        countryName: 'United States',
      },
      twitter: {
        card: twitterCardType || "summary_large_image",
        creator: twitterUsername || "",
        title: optimalTitle,
        description: optimalDescription,
        images: finalOgImages.map(img => img.url),
      },
      icons: iconMetadata,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback metadata
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com'),
      title: 'Kersten Talent Capital',
      description: 'Strategic talent investment firm',
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const globalData = await getGlobalData();
    const orgSchemaMarkup = generateOrganizationSchema();
    
    return (
      <html lang="en" className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} ${openSans.variable} h-full`}>
        <head>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M2MDFV5J');`,
            }}
          />
          {/* End Google Tag Manager */}
          
          {/* Preload critical LCP resources */}
          <link rel="preload" href="/hero-poster.avif" as="image" type="image/avif" fetchPriority="high" />
          
          {/* DNS prefetch and preconnect for better font loading performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
          
          <meta name="google-site-verification" content="H194w9QjUq3uSBGdJOSJBO6ZOy98z-Yoym96MSuOrVc" />
          
          {/* Schema markup - placed in head for better SEO and Google detection */}
          <HeadSchema />
        </head>
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M2MDFV5J"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          
          <GoogleAnalytics />
          
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#0C6BAF] focus:text-white focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0C6BAF] transition-all duration-200"
            aria-label="Skip to main content"
          >
            Skip to main content
          </a>

          <Header global={globalData.data} />
          <UtmTracker />
          
          {/* Load HubSpot scripts with better performance */}
          <Script
            src="https://js-na2.hsforms.net/forms/embed/developer/242773408.js"
            strategy="lazyOnload"
          />
          
          <Script
            id="hubspot-tracking-script"  
            src="//js-na2.hs-scripts.com/242773408.js"
            strategy="lazyOnload"
          />
          
          <main 
            id="main-content" 
            className="flex-1 flex flex-col"
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
          <FaqFooterWrapper />
          <Footer footer={globalData.data.footer} />
          <ScrollToTop />
        </body>
      </html>
    );
  } catch (error) {
    console.error('Error in RootLayout:', error);
    // Fallback rendering without header that requires global data
   return (
      <html lang="en" className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} ${openSans.variable} h-full`}>
        <head>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M2MDFV5J');`,
            }}
          />
          {/* End Google Tag Manager */}
        </head>
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M2MDFV5J"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          
          <MotionConfig
            // Configure framer-motion for better performance
            transition={{ layout: { duration: 0.3 } }}
          >
            <GoogleAnalytics />
            <PerformanceConfig />
            
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            
            <ScrollToTop />
          </MotionConfig>
        </body>
      </html>
    );
  }
}
