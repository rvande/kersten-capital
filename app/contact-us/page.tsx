'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

interface FormData {
  companyName: string;
  title: string;
  email: string;
  name: string;
  notes: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    title: '',
    email: '',
    name: '',
    notes: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.email || !formData.name) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending your message...'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you soon.'
        });
        setFormData({
          companyName: '',
          title: '',
          email: '',
          name: '',
          notes: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full pt-10 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #002C5F/95 0%, #0C6BAF/90 50%, #187CC1/95 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-center items-center text-center max-w-4xl mx-auto py-8 md:py-12">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="mb-6"
            >
              <FaEnvelope className="w-12 h-12 md:w-16 md:h-16 text-[#002C5F] mx-auto" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="font-montserrat text-3xl md:text-5xl lg:text-6xl leading-tight font-black text-[#002C5F] mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Contact Us
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-[#005A9C] font-open-sans text-base md:text-lg max-w-3xl leading-relaxed"
            >
              Ready to accelerate your leadership journey? Let's discuss how we can help you achieve your career goals.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-black text-[#002C5F] mb-6 font-montserrat">
                  Get In Touch
                </h2>
                <p className="text-gray-700 font-open-sans text-lg leading-relaxed mb-8">
                  Fill out the form below and we'll get back to you within 24 hours to discuss your leadership opportunities.
                </p>
              </motion.div>

              <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name - Required */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-[#002C5F] mb-2 font-montserrat">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#187CC1] rounded-lg bg-white text-gray-900 placeholder-[#005A9C] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] transition-all duration-200 font-open-sans"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Title - Optional */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-[#002C5F] mb-2 font-montserrat">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#187CC1] rounded-lg bg-white text-gray-900 placeholder-[#005A9C] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] transition-all duration-200 font-open-sans"
                    placeholder="Your current title (optional)"
                  />
                </div>

                {/* Email - Required */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#002C5F] mb-2 font-montserrat">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#187CC1] rounded-lg bg-white text-gray-900 placeholder-[#005A9C] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] transition-all duration-200 font-open-sans"
                    placeholder="your.email@company.com"
                  />
                </div>

                {/* Name - Required */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#002C5F] mb-2 font-montserrat">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#187CC1] rounded-lg bg-white text-gray-900 placeholder-[#005A9C] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] transition-all duration-200 font-open-sans"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Notes - Optional */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-[#002C5F] mb-2 font-montserrat">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#187CC1] rounded-lg bg-white text-gray-900 placeholder-[#005A9C] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] transition-all duration-200 font-open-sans resize-vertical"
                    placeholder="Tell us about your leadership goals, current challenges, or any specific questions you have..."
                  />
                </div>

                {/* Status Message */}
                {status.type !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-center space-x-3 ${
                      status.type === 'success' ? 'bg-green-50 border border-green-200' :
                      status.type === 'error' ? 'bg-red-50 border border-red-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    {status.type === 'success' && <FaCheck className="text-green-600 flex-shrink-0" />}
                    {status.type === 'error' && <FaExclamationTriangle className="text-red-600 flex-shrink-0" />}
                    {status.type === 'loading' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent flex-shrink-0"></div>
                    )}
                    <p className={`font-open-sans ${
                      status.type === 'success' ? 'text-green-700' :
                      status.type === 'error' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {status.message}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 font-montserrat text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {status.type === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-black text-[#002C5F] mb-6 font-montserrat">
                  Let's Connect
                </h2>
                <p className="text-gray-700 font-open-sans text-lg leading-relaxed mb-8">
                  Ready to take the next step in your leadership journey? We're here to help you navigate your career path and unlock new opportunities.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#002C5F] text-lg mb-1">Email</h3>
                    <a 
                      href="mailto:michael@kerstentalentcapital.com" 
                      className="text-gray-700 hover:text-[#0C6BAF] transition-colors duration-300 font-open-sans"
                    >
                      michael@kerstentalentcapital.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#002C5F] text-lg mb-1">Phone</h3>
                    <a 
                      href="tel:+13035241199" 
                      className="text-gray-700 hover:text-[#0C6BAF] transition-colors duration-300 font-open-sans"
                    >
                      +1 (303) 524-1199
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#002C5F] text-lg mb-1">Office</h3>
                    <address className="text-gray-700 not-italic font-open-sans">
                      8310 South Valley Highway, Suite 300<br />
                      Englewood, CO 80112
                    </address>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaLinkedin className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#002C5F] text-lg mb-1">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/company/kersten-talent-capital/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-[#0C6BAF] transition-colors duration-300 font-open-sans"
                    >
                      /kerstentalentcapital
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* CTA Box */}
              <motion.div 
                variants={itemVariants}
                className="mt-12 p-6 bg-gradient-to-br from-[#002C5F] to-[#187CC1] rounded-xl text-white"
              >
                <h3 className="font-montserrat font-bold text-xl mb-3">Ready to Get Started?</h3>
                <p className="font-open-sans leading-relaxed mb-4">
                  Whether you're looking for your next leadership role or seeking top talent for your organization, we're here to help you succeed.
                </p>
                <div className="flex items-center space-x-2 text-[#71C8F3]">
                  <FaCheck className="flex-shrink-0" />
                  <span className="font-open-sans text-sm">We typically respond within 24 hours</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 