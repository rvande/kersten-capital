import { Metadata } from 'next';

// Generate metadata for this page
export const metadata: Metadata = {
  title: 'Executive Careers',
  description: 'Explore executive career opportunities with Kersten Talent Capital. Submit your profile for consideration for current and future executive positions.',
  alternates: {
    canonical: 'https://kerstentalentcapital.com/careers',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 