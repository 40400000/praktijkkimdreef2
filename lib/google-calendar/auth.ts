import { google } from 'googleapis';

// OAuth authentication for personal Google account
export function getGoogleCalendarAuth() {
  console.log('🔑 Initializing Google Calendar authentication...');
  
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
    console.error('❌ Missing Google Calendar credentials');
    console.log('Available env vars:', {
      hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
    });
    throw new Error('Google Calendar OAuth credentials not configured. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in your .env.local file');
  }

  console.log('✅ All Google Calendar credentials found');
  console.log('📱 Client ID (first 20 chars):', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
  console.log('🔐 Refresh Token (first 20 chars):', process.env.GOOGLE_REFRESH_TOKEN.substring(0, 20) + '...');

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  console.log('🚀 OAuth2 client configured successfully');
  return oauth2Client;
}

export function getCalendarClient() {
  console.log('📅 Creating Google Calendar client...');
  const auth = getGoogleCalendarAuth();
  const calendar = google.calendar({ version: 'v3', auth });
  console.log('✅ Google Calendar client created');
  return calendar;
}

// Alternative: API Key for public availability calendar only
export function getPublicCalendarClient() {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Google API Key not configured');
  }
  
  return google.calendar({ 
    version: 'v3', 
    auth: process.env.GOOGLE_API_KEY 
  });
}
