import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

interface ContactFormData {
  companyName: string;
  title: string;
  email: string;
  name: string;
  notes: string;
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

// Google Sheets configuration
const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
};

// Add data to Google Sheets
const addToGoogleSheets = async (data: ContactFormData) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error('Google Sheet ID not configured');
      return;
    }

    const values = [
      [
        new Date().toISOString(),
        data.name,
        data.email,
        data.companyName,
        data.title || '',
        data.notes || '',
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Data added to Google Sheets successfully');
  } catch (error) {
    console.error('Error adding to Google Sheets:', error);
    // Don't throw error - we don't want to fail the whole request if sheets fails
  }
};

// Send email notification
const sendEmailNotification = async (data: ContactFormData) => {
  const transporter = createTransporter();
  
  // Send all emails to Michael's Microsoft 365 address
  const recipient = 'michael@kerstentalentcapital.com';
  
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #002C5F 0%, #0C6BAF 50%, #187CC1 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
        <p style="color: #71C8F3; margin: 10px 0 0 0; font-size: 16px;">Kersten Talent Capital</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="margin-bottom: 25px;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #187CC1; padding-bottom: 10px;">Contact Information</h3>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 120px;">Name:</strong>
            <span style="color: #333;">${data.name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 120px;">Email:</strong>
            <a href="mailto:${data.email}" style="color: #0C6BAF; text-decoration: none;">${data.email}</a>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 120px;">Company:</strong>
            <span style="color: #333;">${data.companyName}</span>
          </div>
          
          ${data.title ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #002C5F; display: inline-block; width: 120px;">Title:</strong>
            <span style="color: #333;">${data.title}</span>
          </div>
          ` : ''}
        </div>
        
        ${data.notes ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #187CC1; padding-bottom: 10px;">Message</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #187CC1;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.notes}</p>
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
    subject: `New Contact Form Submission - ${data.name} from ${data.companyName}`,
    html: emailHtml,
    replyTo: data.email,
  };

  await transporter.sendMail(mailOptions);
};

// Send confirmation email to user
const sendConfirmationEmail = async (data: ContactFormData) => {
  const transporter = createTransporter();
  
  const confirmationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #002C5F 0%, #0C6BAF 50%, #187CC1 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Thank You for Contacting Us!</h1>
        <p style="color: #71C8F3; margin: 10px 0 0 0; font-size: 16px;">Kersten Talent Capital</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Dear ${data.name},
        </p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out to Kersten Talent Capital. We have received your message and appreciate your interest in our executive search and leadership development services.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #187CC1; margin: 25px 0;">
          <h3 style="color: #002C5F; margin: 0 0 15px 0; font-size: 18px;">What happens next?</h3>
          <ul style="color: #333; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">We'll review your inquiry within 24 hours</li>
            <li style="margin-bottom: 8px;">A member of our team will reach out to discuss your needs</li>
            <li style="margin-bottom: 8px;">We'll schedule a consultation to explore how we can help</li>
          </ul>
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          In the meantime, feel free to explore our website to learn more about our approach to executive search and leadership development.
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
    subject: 'Thank you for contacting Kersten Talent Capital',
    html: confirmationHtml,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.companyName || !data.email || !data.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Process the form submission
    await Promise.allSettled([
      sendEmailNotification(data),
      sendConfirmationEmail(data),
      addToGoogleSheets(data),
    ]);

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 