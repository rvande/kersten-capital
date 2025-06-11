import React from 'react';
import { getIndustries } from '../api/api';
import { Industry } from '../types/pages';
import IndustriesPageClient from './IndustriesPageClient';

export default async function IndustriesPage() {
  let industries: Industry[] = [];
  let error: string | null = null;

  try {
    const response = await getIndustries();
    if (response?.data) {
      industries = Array.isArray(response.data) ? response.data : [response.data];
    }
  } catch (err) {
    console.error('Error fetching industries:', err);
    error = 'Failed to load industries from CMS';
    
    // Fallback data in case of API failure
    industries = [
      {
        id: 1,
        documentId: 'fallback-1',
        title: "Technology & Financial Services",
        slug: "technology-financial-services",
        shortDescription: "Navigating the rapidly evolving landscape of technology and financial services to identify forward-thinking leaders who drive innovation, growth, and sophisticated go-to-market strategies.",
        isActive: true,
        displayOrder: 1,
        gradient: "from-[#0C6BAF] to-[#187CC1]",
        focusAreas: [
          { id: 1, title: "Data Science & AI Leadership", description: "" },
          { id: 2, title: "Financial Technology Innovation", description: "" },
          { id: 3, title: "Cybersecurity Excellence", description: "" },
          { id: 4, title: "Enterprise Software Leadership", description: "" },
          { id: 5, title: "Digital Banking Transformation & GTM", description: "" }
        ],
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      },
      {
        id: 2,
        documentId: 'fallback-2',
        title: "Manufacturing & Industrial",
        slug: "manufacturing-industrial",
        shortDescription: "Connecting manufacturing and industrial companies with visionary leaders who drive operational excellence, innovation, and sustainable growth in complex global markets.",
        isActive: true,
        displayOrder: 2,
        gradient: "from-[#187CC1] to-[#71C8F3]",
        focusAreas: [
          { id: 6, title: "Operations & Supply Chain Leadership", description: "" },
          { id: 7, title: "Manufacturing Technology Innovation", description: "" },
          { id: 8, title: "Quality & Process Excellence", description: "" },
          { id: 9, title: "Sustainability & ESG Leadership", description: "" },
          { id: 10, title: "Industrial Automation & IoT", description: "" }
        ],
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      },
      {
        id: 3,
        documentId: 'fallback-3',
        title: "Retail & E-Commerce",
        slug: "retail-ecommerce",
        shortDescription: "Identifying transformational leaders who understand the evolving retail landscape and can drive omnichannel strategies, customer experience innovation, and digital transformation.",
        isActive: true,
        displayOrder: 3,
        gradient: "from-[#71C8F3] to-[#0C6BAF]",
        focusAreas: [
          { id: 11, title: "Digital Commerce Leadership", description: "" },
          { id: 12, title: "Customer Experience Innovation", description: "" },
          { id: 13, title: "Omnichannel Strategy", description: "" },
          { id: 14, title: "Retail Technology & Analytics", description: "" },
          { id: 15, title: "Brand & Marketing Leadership", description: "" }
        ],
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      }
    ];
  }

  return <IndustriesPageClient industries={industries} error={error} />;
} 