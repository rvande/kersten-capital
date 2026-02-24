'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaShieldAlt, FaUserShield, FaLock, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';

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

export default function PrivacyPolicyPage() {
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
              <FaShieldAlt className="w-12 h-12 md:w-16 md:h-16 text-[#002C5F] mx-auto" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="font-montserrat text-3xl md:text-5xl lg:text-6xl leading-tight font-black text-[#002C5F] mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Privacy Policy
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-[#005A9C] font-open-sans text-base md:text-lg max-w-3xl leading-relaxed"
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                  Kersten Talent Capital LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us through various channels including SMS communications.
                </p>
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.
                </p>
              </div>
            </motion.div>

            {/* Information We Collect */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaUserShield className="w-8 h-8 text-[#187CC1] mr-3" />
                What Personal Information We Collect
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#002C5F] mb-4 font-montserrat">Personal Information</h3>
                <ul className="space-y-3 text-gray-700 font-open-sans">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Contact Information:</strong> Name, email address, phone number, mailing address</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Professional Information:</strong> Resume, work history, education, skills, career preferences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Communication Data:</strong> Messages, inquiries, and correspondence with our team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Technical Information:</strong> IP address, browser type, device information, website usage data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>SMS Information:</strong> Phone number and message content when you opt-in to SMS communications</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* How We Use Information */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaGlobe className="w-8 h-8 text-[#187CC1] mr-3" />
                How Personal Information Is Used
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="space-y-3 text-gray-700 font-open-sans">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>To provide executive search and recruitment services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>To match candidates with appropriate job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>To communicate with you about services, opportunities, and updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>To send SMS notifications about appointments, opportunities, and service updates (with your consent)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>To improve our website and services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>To comply with legal obligations</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Information Sharing */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaLock className="w-8 h-8 text-[#187CC1] mr-3" />
                Who Personal Information Is Shared With
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="space-y-3 text-gray-700 font-open-sans mb-6">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>With Client Companies:</strong> When presenting you as a candidate for positions (with your consent)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Service Providers:</strong> Third-party vendors who assist with our operations (under strict confidentiality agreements)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Legal Requirements:</strong> When required by law or to protect our rights</span>
                  </li>
                </ul>
                
                <div className="bg-[#187CC1]/10 border-l-4 border-[#187CC1] p-4 rounded-r-lg">
                  <p className="text-[#002C5F] font-open-sans font-semibold">
                    <strong>SMS Privacy Protection:</strong> SMS consent is not shared with third parties or affiliates for marketing purposes. Your phone number and SMS preferences remain confidential and are used solely for the services you've requested.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* SMS Communications */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat flex items-center">
                <FaEnvelope className="w-8 h-8 text-[#187CC1] mr-3" />
                SMS Communications
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  By opting into SMS communications, you agree to receive text messages from Kersten Talent Capital LLC. This includes:
                </p>
                <ul className="space-y-3 text-gray-700 font-open-sans mb-6">
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
                    <span>Service updates and important communications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Follow-up messages related to our services</span>
                  </li>
                </ul>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-[#002C5F] mb-2 font-montserrat">SMS Terms:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-open-sans">
                    <li>• Message frequency may vary</li>
                    <li>• Message and data rates may apply</li>
                    <li>• To opt out at any time, text STOP</li>
                    <li>• For assistance, text HELP or visit our website</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Data Security
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Your Rights
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-3 text-gray-700 font-open-sans">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Access and review your personal information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Request corrections to inaccurate information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Request deletion of your information (subject to legal requirements)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Opt out of SMS communications at any time by texting STOP</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#187CC1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Withdraw consent for data processing where applicable</span>
                  </li>
                </ul>
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
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="font-bold space-y-2 font-open-sans">
                  <p>Kersten Talent Capital LLC</p>
                  <p>Email: <a href="mailto:michael@kerstentalentcapital.com" className="text-white/90 hover:text-white underline">michael@kerstentalentcapital.com</a></p>
                  <p>Website: <a href="https://www.kerstentalentcapital.com" className="text-white/90 hover:text-white underline">www.kerstentalentcapital.com</a></p>
                </div>
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                Policy Updates
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p className="text-gray-700 font-open-sans leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants} className="text-center">
              <Link 
                href="/terms-conditions"
                className="inline-block px-8 py-4 bg-[#187CC1] text-white rounded-full hover:bg-[#0C6BAF] transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl mr-4"
              >
                View Terms & Conditions
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