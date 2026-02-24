'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFileContract, FaEnvelope, FaPhone, FaGavel, FaExclamationTriangle, FaHandshake } from 'react-icons/fa';

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

export default function TermsConditionsPage() {
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
              <FaFileContract className="w-12 h-12 md:w-16 md:h-16 text-[#002C5F] mx-auto" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="font-montserrat text-3xl md:text-5xl lg:text-6xl leading-tight font-black text-[#002C5F] mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Terms & Conditions
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-[#005A9C] font-open-sans text-base md:text-lg max-w-3xl leading-relaxed"
            >
              Please read these terms carefully before using our services or opting into SMS communications.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Last Updated */}
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-gray-600 font-open-sans text-sm">
                <strong>Last Updated:</strong> June 2025
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Introduction
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  Welcome to Kersten Talent Capital LLC ("Company," "we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website, services, and SMS communications. By accessing our website, using our services, or opting into SMS communications, you agree to be bound by these Terms.
                </p>
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  If you do not agree with any part of these Terms, please do not use our services or opt into SMS communications.
                </p>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaHandshake className="w-8 h-8 text-[#187CC1] mr-3" />
                Our Services
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  Kersten Talent Capital LLC provides executive search, recruitment, and talent acquisition services. Our services include:
                </p>
                <ul className="space-y-3 text-gray-700 font-open-sans">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Executive search and placement services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Fractional hiring and consulting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Contingency recruitment services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Career consultation and guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>SMS communications for service updates and opportunities</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* SMS Terms of Service */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaEnvelope className="w-8 h-8 text-[#187CC1] mr-3" />
                SMS Terms of Service
              </h2>
              <div className="bg-gradient-to-br from-[#187CC1]/10 to-[#0C6BAF]/10 rounded-xl p-6 md:p-8 border border-[#187CC1]/20">
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-[#002C5F] mb-4 font-montserrat">SMS Communications Agreement</h3>
                  <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                    By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Kersten Talent Capital LLC. This includes SMS messages for:
                  </p>
                  <ul className="space-y-2 text-gray-700 font-open-sans mb-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Appointment scheduling and reminders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Job opportunity notifications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Post-visit instructions and follow-ups</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Service notifications and updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Account and billing notifications</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-[#002C5F] mb-3 font-montserrat">Message Frequency & Rates</h4>
                    <ul className="space-y-2 text-sm text-gray-600 font-open-sans">
                      <li>• Messaging frequency may vary</li>
                      <li>• Message and data rates may apply</li>
                      <li>• Standard carrier charges apply</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-[#002C5F] mb-3 font-montserrat">Opt-Out & Help</h4>
                    <ul className="space-y-2 text-sm text-gray-600 font-open-sans">
                      <li>• To opt out at any time, text <strong>STOP</strong></li>
                      <li>• For assistance, text <strong>HELP</strong> or visit our website at <a href="https://www.kerstentalentcapital.com" className="text-[#187CC1] hover:underline">https://www.kerstentalentcapital.com</a></li>
                      <li>• Reply <strong>STOP</strong> to any message to opt out</li>
                    </ul>
                  </div>
                </div>

                
              </div>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaGavel className="w-8 h-8 text-[#187CC1] mr-3" />
                User Responsibilities
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="space-y-3 text-gray-700 font-open-sans">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide accurate and truthful information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Maintain the confidentiality of any sensitive information shared</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use our services only for lawful purposes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Respect intellectual property rights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Notify us promptly of any changes to your contact information</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Limitations and Disclaimers */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaExclamationTriangle className="w-8 h-8 text-[#187CC1] mr-3" />
                Limitations and Disclaimers
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <div className="space-y-4 text-gray-700 font-open-sans leading-relaxed">
                  <p>
                    <strong>Service Availability:</strong> While we strive to provide excellent service, we cannot guarantee specific outcomes, job placements, or hiring decisions.
                  </p>
                  <p>
                    <strong>SMS Delivery:</strong> We cannot guarantee the delivery of SMS messages due to factors beyond our control, including carrier limitations, device compatibility, or network issues.
                  </p>
                  <p>
                    <strong>Third-Party Services:</strong> Our website may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites.
                  </p>
                  <p>
                    <strong>Information Accuracy:</strong> While we strive to provide accurate information, we make no warranties about the completeness, reliability, or accuracy of information on our website.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Intellectual Property
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  All content on our website, including text, graphics, logos, images, and software, is the property of Kersten Talent Capital LLC or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </div>
            </motion.div>

            {/* Termination */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Termination
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  We reserve the right to terminate or suspend your access to our services at any time, with or without cause or notice. You may also terminate your relationship with us at any time by discontinuing use of our services and opting out of SMS communications by texting STOP.
                </p>
              </div>
            </motion.div>

            {/* Governing Law */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Governing Law
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of the jurisdiction where Kersten Talent Capital LLC is incorporated, without regard to conflict of law principles.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaPhone className="w-8 h-8 text-[#187CC1] mr-3" />
                Contact Us
              </h2>
              <div className="bg-gradient-to-br from-[#002C5F] to-[#187CC1] rounded-xl p-6 md:p-8 text-white">
                <p className="font-open-sans leading-relaxed mb-4">
                  If you have questions about these Terms & Conditions, please contact us:
                </p>
                <div className="font-bold space-y-2 font-open-sans">
                  <p>Kersten Talent Capital LLC</p>
                  <p>Email: <a href="mailto:michael@kerstentalentcapital.com" className="text-white/90 hover:text-white underline">michael@kerstentalentcapital.com</a></p>
                  <p>Website: <a href="https://www.kerstentalentcapital.com" className="text-white/90 hover:text-white underline">www.kerstentalentcapital.com</a></p>
                  <p className="text-sm text-white/80 mt-4">
                    For SMS support: Text HELP or visit our website for assistance
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Changes to Terms
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the new Terms.
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants} className="text-center">
              <Link 
                href="/privacy-policy"
                className="inline-block px-8 py-4 bg-[#187CC1] text-white rounded-full hover:bg-[#0C6BAF] transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl mr-4"
              >
                View Privacy Policy
              </Link>
              <Link 
                href="/contact-us"
                className="inline-block px-8 py-4 bg-transparent border-2 border-[#187CC1] text-[#187CC1] rounded-full hover:bg-[#187CC1] hover:text-white transition-all duration-300 font-montserrat font-semibold"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 