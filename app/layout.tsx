import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../app/globals.css";
import { getGlobalData } from "./api/api";
import { getStrapiMedia } from "./utils/media";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FaqFooterWrapper from "./components/FaqFooterWrapper";
import ScrollToTop from "./components/ScrollToTop";
import { generateIconMetadata, generateOgImages } from "./utils/favicon";

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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';
    
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
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback metadata
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com'),
      title: 'Kersten Talent Capital',
      description: 'Strategic talent investment firm',
      icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global data for header with error handling
  try {
    const globalData = await getGlobalData();
    
    return (
      <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full`}>
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
          <Header global={globalData.data} />
          <main className="flex-1 flex flex-col">{children}</main>
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
      <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full`}>
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
          <header className="bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-xl font-bold">Kersten Talent Capital</h1>
            </div>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
          <FaqFooterWrapper />
          <Footer footer={null} />
          <ScrollToTop />
        </body>
      </html>
    );
  }
}
