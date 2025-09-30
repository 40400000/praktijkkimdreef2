# Environment Setup Guide

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Database (already configured)
NEON=postgresql://neondb_owner:npg_nztmVrP2WgD7@ep-falling-base-adec3vaf-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Google Calendar OAuth (Personal Account)
GOOGLE_CLIENT_ID=your-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_CALENDAR_ID=primary
```

## Google Calendar Setup Steps (OAuth for Personal Account)

### Step 1: Create Google Cloud Project & OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Calendar API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

4. Configure OAuth consent screen:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" (unless you have Google Workspace)
   - Fill in the app name: "Praktijk Kim Dreef Booking"
   - Add your email as user support email
   - Add your email as developer contact
   - Click "Save and Continue"

5. Add yourself as test user:
   - In OAuth consent screen, go to "Test users"
   - Click "Add Users"
   - Add your email: `thijmendreef@gmail.com`
   - Save

6. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add these authorized redirect URIs:
     - `http://localhost:3000`
     - `https://developers.google.com/oauthplayground`
   - Save and copy the Client ID and Client Secret

### Step 2: Get Refresh Token

1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from step 1
5. In the left panel, find "Calendar API v3" and select:
   - `https://www.googleapis.com/auth/calendar`
6. Click "Authorize APIs"
7. Log in with YOUR Google account (the one with the calendar)
8. Click "Exchange authorization code for tokens"
9. Copy the **refresh_token** value

### Step 3: Add to Environment File

Add to your `.env.local`:
```bash
GOOGLE_CLIENT_ID=your-client-id-from-step1.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-from-step1
GOOGLE_REFRESH_TOKEN=your-refresh-token-from-step2
GOOGLE_CALENDAR_ID=primary
```

## Testing the Setup

Once configured, you can test the integration by:

1. Starting the development server: `pnpm dev`
2. Going to `/afspraak-maken`
3. Selecting a treatment and date
4. The system should now pull real availability from your Google Calendar

## Fallback Behavior

If Google Calendar is not configured, the system will:
- Use hardcoded treatment data
- Show random availability (fallback mode)
- Still save appointments to the database
- Display appropriate error messages in the console
