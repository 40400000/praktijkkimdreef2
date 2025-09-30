import { NextResponse } from 'next/server';
import { googleCalendar } from '@/lib/google-calendar/events';

export async function GET() {
  try {
    console.log('🧪 Testing Google Calendar connection...');
    
    // Test: Get events for today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    console.log(`📅 Testing with date range: ${today.toISOString()} to ${tomorrow.toISOString()}`);
    
    const events = await googleCalendar.getEvents(today, tomorrow);
    
    console.log('✅ Google Calendar connection test successful!');
    
    return NextResponse.json({
      success: true,
      message: 'Google Calendar connection working!',
      data: {
        eventsFound: events.length,
        testDate: today.toISOString(),
        events: events.map(event => ({
          id: event.id,
          summary: event.summary,
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
        }))
      }
    });
    
  } catch (error) {
    console.error('❌ Google Calendar connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Google Calendar connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

