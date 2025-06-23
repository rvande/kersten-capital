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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
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
    
    // Get site URL from environment variable or default
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: metadataTitle,
        template: `%s | ${global.metaTitleSuffix}`,
      },
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: ogImages,
        type: 'website',
        siteName: global.metaTitleSuffix,
      },
      twitter: {
        card: twitterCardType || "summary_large_image",
        creator: twitterUsername || "",
        title: metaTitle,
        description: metaDescription,
        images: ogImages.length > 0 ? ogImages.map(img => img.url) : [],
      },
      icons: iconMetadata,
      alternates: {
        canonical: siteUrl,
      },
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
          {/* Preload critical LCP resources */}
          <link rel="preload" href="/hero-poster.avif" as="image" type="image/avif" fetchPriority="high" />
          
          {/* DNS prefetch and preconnect for better font loading performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
          
          <meta name="google-site-verification" content="H194w9QjUq3uSBGdJOSJBO6ZOy98z-Yoym96MSuOrVc" />
        </head>
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
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
          
          <Script
            src="https://js-na2.hsforms.net/forms/embed/developer/242773408.js"
            defer
          />
          
          <Script
            id="hubspot-tracking-script"  
            src="//js-na2.hs-scripts.com/242773408.js"
            strategy="lazyOnload"
          />
          
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: orgSchemaMarkup }}
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
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
          <GoogleAnalytics />
          
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          
          <ScrollToTop />
        </body>
      </html>
    );
  }
}
