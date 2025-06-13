import { Metadata } from 'next';
import { generatePageMetadata } from '../utils/metadata';

// Generate metadata for this page
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Kersten Talent Capital. We\'re here to help with your executive talent needs.',
  alternates: {
    canonical: 'https://kerstentalentcapital.com/contact-us',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 