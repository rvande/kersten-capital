import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';

// Define the interface for the form data
interface CandidateFormData {
  fullName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  currentTitle?: string;
  linkedinProfile?: string;
  coverLetter?: string;
  compensationRequirements?: string;
  availabilityTimeframe?: string;
  positionTitle?: string;
  positionId?: string;
  positionType?: string;
}

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Save resume file to temporary location and return the path
const saveResumeFile = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Create a unique filename
  const uniqueId = uuidv4();
  const fileExtension = path.extname(file.name);
  const filename = `resume_${uniqueId}${fileExtension}`;
  
  // Save to temp directory
  const tempDir = os.tmpdir();
  const filepath = path.join(tempDir, filename);
  
  await writeFile(filepath, buffer);
  return filepath;
};

// Send email notification with resume attachment
const sendEmailNotification = async (data: CandidateFormData, resumePath: string | null, resumeName: string | null) => {
  const transporter = createTransporter();
  
  // Send all emails to the recruiter's address
  const recipient = 'michael@kerstentalentcapital.com';
  
  const positionInfo = data.positionTitle 
    ? `${data.positionTitle} (ID: ${data.positionId})` 
    : data.positionType || 'General Executive Consideration';
  
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #002C5F 0%, #0C6BAF 50%, #187CC1 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Executive Candidate Profile</h1>
        <p style="color: #71C8F3; margin: 10px 0 0 0; font-size: 16px;">Kersten Talent Capital</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="margin-bottom: 25px;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #187CC1; padding-bottom: 10px;">Position Interest</h3>
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Position:</strong>
            <span style="color: #333;">${positionInfo}</span>
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #187CC1; padding-bottom: 10px;">Candidate Information</h3>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Name:</strong>
            <span style="color: #333;">${data.fullName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Email:</strong>
            <a href="mailto:${data.email}" style="color: #0C6BAF; text-decoration: none;">${data.email}</a>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Phone:</strong>
            <span style="color: #333;">${data.phone}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Current Company:</strong>
            <span style="color: #333;">${data.currentCompany || 'N/A'}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Current Title:</strong>
            <span style="color: #333;">${data.currentTitle || 'N/A'}</span>
          </div>
          
          ${data.linkedinProfile ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">LinkedIn:</strong>
            <a href="${data.linkedinProfile}" style="color: #0C6BAF; text-decoration: none;">${data.linkedinProfile}</a>
          </div>
          ` : ''}
          
          ${data.compensationRequirements ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Compensation:</strong>
            <span style="color: #333;">${data.compensationRequirements}</span>
          </div>
          ` : ''}
          
          ${data.availabilityTimeframe ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 150px;">Availability:</strong>
            <span style="color: #333;">${data.availabilityTimeframe}</span>
          </div>
          ` : ''}
        </div>
        
        ${data.coverLetter ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #187CC1; padding-bottom: 10px;">Additional Information</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #187CC1;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.coverLetter}</p>
          </div>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            Submitted on ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: `New Executive Candidate: ${data.fullName} - ${data.currentTitle} at ${data.currentCompany || 'N/A'}`,
    html: emailHtml,
    replyTo: data.email,
    attachments: resumePath ? [
      {
        filename: resumeName || 'resume.pdf',
        path: resumePath
      }
    ] : []
  };

  await transporter.sendMail(mailOptions);
};

// Send confirmation email to candidate
const sendConfirmationEmail = async (data: CandidateFormData) => {
  const transporter = createTransporter();
  
  const confirmationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #002C5F 0%, #0C6BAF 50%, #187CC1 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Thank You For Your Interest!</h1>
        <p style="color: #71C8F3; margin: 10px 0 0 0; font-size: 16px;">Kersten Talent Capital</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Dear ${data.fullName},
        </p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for submitting your profile to Kersten Talent Capital. We appreciate your interest in partnering with us for your executive career journey.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #187CC1; margin: 25px 0;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 18px;">What happens next?</h3>
          <ul style="color: #333; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Our executive search team will review your profile</li>
            <li style="margin-bottom: 8px;">If there's a potential match with current or upcoming opportunities, we'll reach out directly</li>
            <li style="margin-bottom: 8px;">Your information will be kept confidential and secure</li>
          </ul>
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Even if we don't have an immediate match, we'll keep your profile in our talent network for future opportunities that align with your experience and career goals.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.kerstentalentcapital.com" style="background: linear-gradient(135deg, #0C6BAF 0%, #187CC1 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Visit Our Website
          </a>
        </div>
        
        <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Best regards,<br>
            <strong style="color: #002C5F;">The Kersten Talent Capital Team</strong>
          </p>
          
          <div style="color: #6c757d; font-size: 14px;">
            <p style="margin: 5px 0;">📧 michael@kerstentalentcapital.com</p>
            <p style="margin: 5px 0;">📞 +1 (303) 524-1199</p>
            <p style="margin: 5px 0;">🏢 8310 South Valley Highway, Suite 300, Englewood, CO 80112</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Thank you for your interest in Kersten Talent Capital',
    html: confirmationHtml,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  try {
    // This is a multipart form data request, so we need to parse it differently
    const formData = await request.formData();
    
    // Extract form fields
    const candidateData: CandidateFormData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      currentCompany: formData.get('currentCompany') as string || '',
      currentTitle: formData.get('currentTitle') as string || '',
      linkedinProfile: formData.get('linkedinProfile') as string || undefined,
      coverLetter: formData.get('coverLetter') as string || undefined,
      compensationRequirements: formData.get('compensationRequirements') as string || undefined,
      availabilityTimeframe: formData.get('availabilityTimeframe') as string || undefined,
      positionTitle: formData.get('positionTitle') as string || undefined,
      positionId: formData.get('positionId') as string || undefined,
      positionType: formData.get('positionType') as string || undefined,
    };

    // Validate required fields
    if (!candidateData.fullName || !candidateData.email || !candidateData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Handle resume file
    const resumeFile = formData.get('resume') as File;
    let resumePath = null;
    let resumeName = null;
    
    if (!resumeFile || !(resumeFile instanceof File) || resumeFile.size === 0) {
      return NextResponse.json(
        { error: 'Resume file is required' },
        { status: 400 }
      );
    }
    
    // Check file size (5MB limit)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume file exceeds 5MB limit' },
        { status: 400 }
      );
    }
    
    // Check file type
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.' },
        { status: 400 }
      );
    }
    
    // Save the file
    try {
      resumePath = await saveResumeFile(resumeFile);
      resumeName = resumeFile.name;
    } catch (error) {
      console.error('Error saving resume file:', error);
      return NextResponse.json(
        { error: 'Failed to save resume file' },
        { status: 500 }
      );
    }

    // Process the form submission
    await Promise.allSettled([
      sendEmailNotification(candidateData, resumePath, resumeName),
      sendConfirmationEmail(candidateData),
    ]);

    return NextResponse.json(
      { message: 'Profile submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing candidate form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 