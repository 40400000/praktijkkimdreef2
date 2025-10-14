import { NextResponse } from 'next/server';
import { availabilityService } from '@/lib/google-calendar/availability';

export async function GET() {
  try {
    const date = new Date('2025-10-17T00:00:00');
    const treatmentDuration = 60; // Assuming a 60-minute treatment for debugging

    const debugInfo = await availabilityService.debugDateAvailability(date, {
      treatmentDuration,
    });

    return NextResponse.json(debugInfo);
  } catch (error) {
    console.error('Error in debug-availability-oct17 route:', error);
    return NextResponse.json(
      { error: 'Failed to get availability debug information' },
      { status: 500 }
    );
  }
}
