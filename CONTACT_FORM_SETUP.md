# Contact Form Setup Guide

This guide explains how to set up the contact form with email notifications and Google Sheets integration.

## Required Environment Variables

Add these variables to your `.env` file:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Google Sheets Integration
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID=your-google-sheet-id

# Environment
NODE_ENV=development
```

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

## Google Sheets Setup

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API

### 2. Create a Service Account
1. Go to IAM & Admin → Service Accounts
2. Click "Create Service Account"
3. Fill in the details and create
4. Click on the created service account
5. Go to "Keys" tab → "Add Key" → "Create new key" → JSON
6. Download the JSON file

### 3. Extract Credentials
From the downloaded JSON file, extract:
- `client_email` → Use as `GOOGLE_CLIENT_EMAIL`
- `private_key` → Use as `GOOGLE_PRIVATE_KEY`

### 4. Create Google Sheet
1. Create a new Google Sheet
2. Add headers in row 1: `Timestamp | Name | Email | Company | Title | Notes`
3. Share the sheet with your service account email (from step 2)
4. Give "Editor" permissions
5. Copy the sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

## Form Behavior

### Development Environment
- Emails sent to: `vandehey12@gmail.com`
- Form data logged to Google Sheets

### Production Environment  
- Emails sent to: `michael@kerstentalentcapital.com`
- Form data logged to Google Sheets

## Form Fields

- **Company Name** (Required)
- **Title** (Optional)
- **Email** (Required)
- **Name** (Required)
- **Notes** (Optional)

## Email Features

### Notification Email (to recipient)
- Professional HTML template with brand colors
- All form data included
- Responsive design
- Reply-to set to user's email

### Confirmation Email (to user)
- Thank you message
- Next steps information
- Company contact details
- Professional branding

## Google Sheets Integration

Data is automatically added to the sheet with:
- Timestamp
- All form fields
- Proper error handling (won't fail if sheets is down)

## Testing

1. Set up environment variables
2. Test in development mode first
3. Verify emails are received
4. Check Google Sheets for data
5. Test form validation
6. Test error handling

## Troubleshooting

### Email Issues
- Verify Gmail app password is correct
- Check 2FA is enabled
- Ensure EMAIL_USER and EMAIL_PASS are set

### Google Sheets Issues
- Verify service account has access to sheet
- Check GOOGLE_SHEET_ID is correct
- Ensure private key format is correct (with \n for newlines)
- Verify Google Sheets API is enabled

### Form Issues
- Check browser console for errors
- Verify API endpoint is accessible
- Test with simple data first 