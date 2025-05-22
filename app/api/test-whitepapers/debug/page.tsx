'use client';

import { useEffect, useState } from 'react';
import { Whitepaper } from '@/app/types/blog';
import Link from 'next/link';

export default function WhitepaperDebugPage() {
  const [whitepapers, setWhitepapers] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/test-whitepapers');
        const data = await res.json();
        
        setRawData(data);
        setWhitepapers(data.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching whitepaper data:', err);
        setError('Failed to load whitepaper data');
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Whitepaper Debug Page</h1>
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to home
      </Link>
      
      {isLoading && <p>Loading whitepaper data...</p>}
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-md mb-4">
        <h2 className="font-bold mb-2">API Response Details</h2>
        <p>Raw API response data structure will help diagnose any issues with your whitepaper components.</p>
      </div>
      
      {!isLoading && rawData && (
        <div className="bg-slate-50 p-4 rounded-md mb-6">
          <h2 className="text-xl font-semibold mb-2">API Response Overview</h2>
          <p>
            <span className="font-medium">Success:</span> {rawData.success ? 'Yes' : 'No'}
          </p>
          {rawData.debug && (
            <div className="mt-2">
              <p className="font-medium">Debug Info:</p>
              <pre className="bg-slate-100 p-2 overflow-auto max-h-60 rounded text-xs mt-1">
                {JSON.stringify(rawData.debug, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
      
      {!isLoading && whitepapers.length === 0 && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
          <p>No whitepapers found.</p>
          <p className="mt-2">Visit the Strapi admin panel to create and publish whitepapers.</p>
          <p className="font-semibold mt-4">Common issues:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Whitepaper collection not configured in Strapi</li>
            <li>No published whitepapers (check publication status)</li>
            <li>API permissions not set correctly in Strapi</li>
            <li>Field names mismatch (uppercase vs lowercase)</li>
          </ul>
        </div>
      )}
      
      {whitepapers.length > 0 && (
        <>
          <p className="mb-4 font-medium">Found {whitepapers.length} whitepapers:</p>
          
          {whitepapers.map((whitepaper, index) => (
            <div key={whitepaper.id || index} className="bg-slate-50 p-4 rounded-md mb-8">
              <h2 className="text-xl font-semibold mb-2">Whitepaper #{index + 1}</h2>
              
              <h3 className="font-medium mt-4 text-blue-700">All Available Attribute Keys:</h3>
              <p className="bg-blue-50 p-2 rounded">
                {whitepaper?.attributes ? Object.keys(whitepaper.attributes).join(', ') : 'No attributes'}
              </p>
              
              <h3 className="font-medium mt-4">Field Access Tests:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-4">
                <div>
                  <p className="font-semibold">ID:</p>
                  <p>{whitepaper.id || 'Not found'}</p>
                </div>
                
                <div>
                  <p className="font-semibold">Title:</p>
                  <p className="bg-green-50 p-1 rounded">Using uppercase: {whitepaper?.attributes?.Title || 'Not found'}</p>
                  <p className="bg-yellow-50 p-1 rounded mt-1">Using lowercase: {whitepaper?.attributes?.title || 'Not found'}</p>
                </div>
                
                <div>
                  <p className="font-semibold">Description:</p>
                  <p className="bg-green-50 p-1 rounded">Using uppercase: {whitepaper?.attributes?.Description || 'Not found'}</p>
                  <p className="bg-yellow-50 p-1 rounded mt-1">Using lowercase: {whitepaper?.attributes?.description || 'Not found'}</p>
                </div>
                
                <div>
                  <p className="font-semibold">Cover Image Path:</p>
                  <p className="bg-green-50 p-1 rounded overflow-hidden text-ellipsis">
                    Upper: {whitepaper?.attributes?.CoverImage?.data?.attributes?.url ? '✓ Found' : '✗ Missing'}
                  </p>
                  <p className="bg-yellow-50 p-1 rounded mt-1 overflow-hidden text-ellipsis">
                    Lower: {whitepaper?.attributes?.coverImage?.data?.attributes?.url ? '✓ Found' : '✗ Missing'}
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold">Document Path:</p>
                  <p className="bg-green-50 p-1 rounded overflow-hidden text-ellipsis">
                    Upper: {whitepaper?.attributes?.Document?.data?.attributes?.url ? '✓ Found' : '✗ Missing'}
                  </p>
                  <p className="bg-yellow-50 p-1 rounded mt-1 overflow-hidden text-ellipsis">
                    Lower: {whitepaper?.attributes?.document?.data?.attributes?.url ? '✓ Found' : '✗ Missing'}
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold">Publication Date:</p>
                  <p className="bg-green-50 p-1 rounded">Upper: {whitepaper?.attributes?.PublicationDate || 'Not found'}</p>
                  <p className="bg-yellow-50 p-1 rounded mt-1">Lower: {whitepaper?.attributes?.publicationDate || 'Not found'}</p>
                </div>
              </div>
              
              <h3 className="font-medium mt-4">Raw Data Structure:</h3>
              <pre className="bg-slate-100 p-2 overflow-auto max-h-96 rounded text-xs">
                {JSON.stringify(whitepaper, null, 2)}
              </pre>
            </div>
          ))}
        </>
      )}
    </div>
  );
} 