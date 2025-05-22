import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology Stack | Kersten Talent Capital',
  description: 'The modern technology stack and features powering Kersten Talent Capital',
};

export default function TechStackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 font-header text-gray-800">
          Our Technology Stack
        </h1>
        
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center font-header text-gray-800">Architecture Overview</h2>
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
                <h3 className="text-2xl font-semibold mb-4 text-center font-header text-gray-800">Frontend</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-full shadow-md">
                    <Image 
                      src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" 
                      alt="Vercel" 
                      width={80} 
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg", alt: "Next.js logo" },
                    { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg", alt: "TypeScript logo" },
                    { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg", alt: "Tailwind CSS logo" },
                  ].map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center">
                      <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                        <Image 
                          src={tech.logo} 
                          alt={tech.alt} 
                          width={50} 
                          height={50} 
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-center text-gray-700">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-teal-100">
                <h3 className="text-2xl font-semibold mb-4 text-center font-header text-gray-800">Backend</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-full shadow-md">
                    <Image 
                      src="/railway-logo.png" 
                      alt="Railway" 
                      width={80} 
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Strapi CMS", logo: "https://cdn.worldvectorlogo.com/logos/strapi-2.svg", alt: "Strapi logo" },
                    { name: "PostgreSQL", logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg", alt: "PostgreSQL logo" },
                    { name: "AWS S3", logo: "/aws.svg", alt: "AWS S3 logo" },
                  ].map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center">
                      <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                        <Image 
                          src={tech.logo} 
                          alt={tech.alt} 
                          width={tech.name === "AWS S3" ? 50 : 50} 
                          height={tech.name === "AWS S3" ? 75 : 50} 
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-center text-gray-700">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Flow arrows */}
            <div className="relative h-20 my-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-indigo-100"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-teal-100"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                API Requests
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-semibold mb-6 font-header border-b pb-2 text-gray-800">Design Highlights</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">Brand Theme</h3>
                  <p className="text-gray-700">Consistent use of Cormorant and Inter fonts with carefully selected brand colors</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">Mobile First Design</h3>
                  <p className="text-gray-700">Optimized for mobile users with responsive layouts and accessible navigation</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">Modern Typography</h3>
                  <p className="text-gray-700">Elegant font pairings for improved readability and visual hierarchy</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-semibold mb-6 font-header border-b pb-2 text-gray-800">Key Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">CMS-Powered Content</h3>
                  <p className="text-gray-700">Easy content editing through Strapi CMS with rich media management</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">Dynamic FAQ Section</h3>
                  <p className="text-gray-700">Enhanced with Rich Results Schema for improved SEO and search visibility</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">Advanced Metadata</h3>
                  <p className="text-gray-700">Customizable metadata with SEO-friendly page titles and descriptions</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800">Secure Architecture</h3>
                  <p className="text-gray-700">Enterprise-grade security with secure networking and code practices</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4 font-header text-gray-800">CI/CD Pipeline</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Continuous integration and deployment ensures rapid, reliable updates with automated testing and deployment.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex flex-col items-center p-4">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2 border">
                <Image 
                  src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" 
                  alt="GitHub" 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </div>
            
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2 border">
                <Image 
                  src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" 
                  alt="Vercel" 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">Vercel CI</span>
            </div>
            
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2 border">
                <Image 
                  src="/railway-logo.png" 
                  alt="Railway" 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">Railway Deploy</span>
            </div>
          </div>
        </div>

        {/* Sitemap Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4 font-header text-gray-800">Website Structure</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Complete site architecture with planned pages and functionality.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto mb-16">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-center font-header text-gray-800">Sitemap</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Services</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Executive Search</li>
                    <li className="text-gray-700">Contingency Hiring</li>
                    <li className="text-gray-700">Fractional Hiring
                      <ul className="pl-5 space-y-1 mt-1">
                        <li className="text-gray-700">Technology</li>
                        <li className="text-gray-700">Marketing</li>
                        <li className="text-gray-700">Sales</li>
                        <li className="text-gray-700">HR</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Industries We Serve</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Technology</li>
                    <li className="text-gray-700">Financial Services & Fintech</li>
                    <li className="text-gray-700">Manufacturing & Industrial</li>
                    <li className="text-gray-700">Private Equity</li>
                    <li className="text-gray-700">Consumer Products</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">About Us</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Our Story</li>
                    <li className="text-gray-700">Careers</li>
                  </ul>
                </div>
              </div>
              
              {/* Right column */}
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Our Approach</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Company Focused Process</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Success Stories</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Case Studies</li>
                    <li className="text-gray-700">LinkedIn Testimonials</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Resources</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Blog
                      <ul className="pl-5 space-y-1 mt-1">
                        <li className="text-gray-700">Executive Hiring Trends</li>
                        <li className="text-gray-700">Industry Insights</li>
                        <li className="text-gray-700">Leadership Development</li>
                      </ul>
                    </li>
                    <li className="text-gray-700">Guides & Whitepapers</li>
                    <li className="text-gray-700">FAQ</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Contact Us</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-700">Salesforce Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center font-header text-gray-800">Planned Functionality</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Content Management</h4>
                <ul className="pl-5 list-disc text-gray-700">
                  <li>Categorized Blog</li>
                  <li>Case Studies</li>
                  <li>Guides & Whitepapers</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Integrations</h4>
                <ul className="pl-5 list-disc text-gray-700">
                  <li>Resume Upload - ATS automation</li>
                  <li>LinkedIn Testimonials</li>
                  <li>Hubspot CRM Integration</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Analytics & SEO</h4>
                <ul className="pl-5 list-disc text-gray-700">
                  
                  <li>WebSights ZoomInfo Click Tracking</li>
                  <li>SEO optimization</li>
                  <li>Performance analytics</li>
                  <li>Google Analytics</li>
                  <li>Google Search Console</li>
                  <li>Rich Results Schema</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 