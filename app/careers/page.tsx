'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaIndustry, FaFileAlt, FaCheckCircle, FaExclamationCircle, FaAsterisk } from 'react-icons/fa';
import { Metadata } from 'next';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

// Sample executive opportunities - these would typically come from an API or CMS
const executiveOpportunities = [
  {
    id: 1,
    title: 'Chief Operating Officer',
    industry: 'Manufacturing',
    location: 'Denver, CO',
    compensation: '$250K - $350K + Equity',
    description: 'Leading manufacturing company seeks an experienced COO to oversee operations, optimize production processes, and drive operational excellence across multiple facilities.',
    requirements: [
      'Minimum 10+ years of experience in manufacturing operations',
      'Proven track record of operational leadership and process improvement',
      'Experience managing multiple production facilities',
      'Strong background in lean manufacturing principles',
      'MBA or related advanced degree preferred'
    ]
  },
  {
    id: 2,
    title: 'VP of Sales',
    industry: 'Industrial Technology',
    location: 'Chicago, IL',
    compensation: '$200K - $275K + Commission',
    description: 'Growing industrial technology firm is seeking a strategic VP of Sales to lead their national sales team, develop key accounts, and drive revenue growth in competitive markets.',
    requirements: [
      'Minimum 8+ years of sales leadership in industrial or technology sectors',
      'Proven history of exceeding sales targets and building high-performance teams',
      'Experience with complex B2B sales cycles and enterprise accounts',
      'Strong strategic planning and execution skills',
      'Bachelor\'s degree required, MBA preferred'
    ]
  },
  {
    id: 3,
    title: 'Chief Financial Officer',
    industry: 'Utilities',
    location: 'Remote (US)',
    compensation: '$275K - $375K + Bonus',
    description: 'Established utilities company is seeking an experienced CFO to oversee financial operations, strategic planning, and investor relations during a period of significant growth.',
    requirements: [
      'Minimum 12+ years of financial leadership experience, preferably in utilities or energy',
      'Strong background in financial planning, M&A, and capital raising',
      'Experience working with regulatory frameworks and compliance',
      'CPA and/or MBA required',
      'Public company experience highly desired'
    ]
  }
];

export default function CareersPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentCompany: '',
    currentTitle: '',
    linkedinProfile: '',
    coverLetter: '',
    compensationRequirements: '',
    availabilityTimeframe: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formTouched, setFormTouched] = useState<{[key: string]: boolean}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setFormTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let newErrors = { ...formErrors };
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors[name] = 'Full name is required';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Please enter a valid email address';
        } else {
          delete newErrors[name];
        }
        break;
      case 'phone':
        if (!value.trim()) {
          newErrors[name] = 'Phone number is required';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }
    
    setFormErrors(newErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Check file type
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus('error');
        setErrorMessage('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
        return;
      }
      
      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus('error');
        setErrorMessage('File size exceeds 5MB limit.');
        return;
      }
      
      setResumeFile(file);
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    const requiredFields = ['fullName', 'email', 'phone'];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = `${field === 'fullName' ? 'Full name' : field} is required`;
      }
    });
    
    if (!resumeFile) {
      newErrors.resume = 'Resume/CV is required';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    setFormTouched(allTouched);
    
    // Validate all fields
    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage('Please correct the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Create form data to send file
      const submitData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      // Add selected opportunity
      if (selectedOpportunity) {
        const opportunity = executiveOpportunities.find(opp => opp.id === selectedOpportunity);
        if (opportunity) {
          submitData.append('positionTitle', opportunity.title);
          submitData.append('positionId', opportunity.id.toString());
        }
      } else {
        submitData.append('positionType', 'General Executive Consideration');
      }
      
      // Add resume file if exists
      if (resumeFile) {
        submitData.append('resume', resumeFile);
      } else {
        throw new Error('Resume file is required');
      }

      // Submit the form
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      // Success
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        currentCompany: '',
        currentTitle: '',
        linkedinProfile: '',
        coverLetter: '',
        compensationRequirements: '',
        availabilityTimeframe: '',
      });
      setResumeFile(null);
      setSelectedOpportunity(null);
      setFormErrors({});
      setFormTouched({});
      
      // Reset file input
      const fileInput = document.getElementById('resumeUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to determine if a field has an error
  const hasError = (fieldName: string) => {
    return formTouched[fieldName] && formErrors[fieldName];
  };

  // Helper function to render required field indicator
  const RequiredIndicator = () => (
    <span className="text-red-500 ml-1" title="Required field">
      <FaAsterisk className="inline-block text-xs" />
    </span>
  );

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#002C5F] to-[#0C6BAF] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#002C5F]/90 to-[#0C6BAF]/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat">
              Executive Opportunities
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 font-open-sans leading-relaxed">
              Partner with Kersten Talent Capital to advance your executive career. We connect exceptional leaders with 
              organizations where they can make a meaningful impact and achieve their professional goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="applicationForm" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#002C5F] font-montserrat">
                {selectedOpportunity ? 'Express Interest' : 'Submit Your Executive Profile'}
              </h2>
              <p className="text-gray-700 font-open-sans leading-relaxed">
                {selectedOpportunity 
                  ? `You're applying for: ${executiveOpportunities.find(opp => opp.id === selectedOpportunity)?.title}` 
                  : 'Submit your profile for confidential consideration for current and future executive opportunities.'}
              </p>
            </div>

            {/* Success message */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 text-2xl mr-4" />
                  <div>
                    <h3 className="text-green-800 font-semibold text-lg mb-1">Profile Submitted Successfully!</h3>
                    <p className="text-green-700">Thank you for your interest. Our executive search team will review your profile and contact you if there's a potential match.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
                <div className="flex items-center">
                  <FaExclamationCircle className="text-red-500 text-2xl mr-4" />
                  <div>
                    <h3 className="text-red-800 font-semibold text-lg mb-1">Submission Error</h3>
                    <p className="text-red-700">{errorMessage || 'There was a problem submitting your profile. Please try again.'}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 md:p-10 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                    Full Name <RequiredIndicator />
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      hasError('fullName') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black`}
                    placeholder="Your full name"
                  />
                  {hasError('fullName') && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                  )}
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address <RequiredIndicator />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      hasError('email') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black`}
                    placeholder="Your email address"
                  />
                  {hasError('email') && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number <RequiredIndicator />
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      hasError('phone') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black`}
                    placeholder="Your phone number"
                  />
                  {hasError('phone') && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="currentCompany" className="block text-gray-700 font-semibold mb-2">Current Company</label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black"
                    placeholder="Your current company"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="currentTitle" className="block text-gray-700 font-semibold mb-2">Current Title</label>
                  <input
                    type="text"
                    id="currentTitle"
                    name="currentTitle"
                    value={formData.currentTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black"
                    placeholder="Your current title"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="compensationRequirements" className="block text-gray-700 font-semibold mb-2">Compensation Requirements</label>
                  <input
                    type="text"
                    id="compensationRequirements"
                    name="compensationRequirements"
                    value={formData.compensationRequirements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black"
                    placeholder="Expected compensation range"
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="linkedinProfile" className="block text-gray-700 font-semibold mb-2">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    id="linkedinProfile"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="availabilityTimeframe" className="block text-gray-700 font-semibold mb-2">Availability Timeframe</label>
                  <input
                    type="text"
                    id="availabilityTimeframe"
                    name="availabilityTimeframe"
                    value={formData.availabilityTimeframe}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black"
                    placeholder="When would you be available to start a new position?"
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="resumeUpload" className="block text-gray-700 font-semibold mb-2">
                    Resume/CV Upload <RequiredIndicator />
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <div
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 ${
                        isDragging ? 'border-[#0C6BAF] bg-[#0C6BAF]/5' : 
                        hasError('resume') ? 'border-red-500 bg-red-50' : 'border-gray-300 border-dashed'
                      } rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-all`}
                    >
                      <label
                        htmlFor="resumeUpload"
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaFileAlt className={`w-8 h-8 mb-3 ${hasError('resume') ? 'text-red-400' : 'text-gray-400'}`} />
                          <p className={`mb-2 text-sm ${hasError('resume') ? 'text-red-500' : 'text-gray-500'}`}>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className={`text-xs ${hasError('resume') ? 'text-red-500' : 'text-gray-500'}`}>
                            PDF, DOC, or DOCX (Max 5MB)
                          </p>
                        </div>
                        <input
                          id="resumeUpload"
                          type="file"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleFileChange}
                          required={!resumeFile}
                        />
                      </label>
                    </div>
                  </div>
                  {resumeFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {resumeFile.name}
                    </p>
                  )}
                  {hasError('resume') && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.resume}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="coverLetter" className="block text-gray-700 font-semibold mb-2">Additional Information</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none transition-all text-black"
                    placeholder="Tell us about your career goals, industry preferences, and any other information that would help us match you with the right opportunity..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                {Object.keys(formErrors).length > 0 && formTouched.fullName && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                    <p className="font-semibold flex items-center">
                      <FaExclamationCircle className="mr-2" /> Please fix the errors in the form
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Profile'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#002C5F] font-montserrat">
              Why Partner With Kersten Talent Capital?
            </h2>
            <p className="text-gray-700 font-open-sans leading-relaxed">
              We're committed to connecting exceptional leaders with organizations where they can thrive and make a meaningful impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-[#002C5F] mb-4 font-montserrat">Industry Expertise</h3>
              <p className="text-gray-700 font-open-sans">
                We specialize in executive placement for manufacturing, industrial, and utilities sectors, with deep industry knowledge and connections.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-[#002C5F] mb-4 font-montserrat">Confidential Process</h3>
              <p className="text-gray-700 font-open-sans">
                We maintain strict confidentiality throughout the executive search process, protecting your privacy while exploring new opportunities.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-[#002C5F] mb-4 font-montserrat">Strategic Career Guidance</h3>
              <p className="text-gray-700 font-open-sans">
                Our team provides personalized guidance to help you navigate your executive career path and find positions aligned with your goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 