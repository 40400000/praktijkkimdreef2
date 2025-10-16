import { NextResponse, NextRequest } from 'next/server';
import { availabilityService } from '@/lib/google-calendar/availability';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date') || '2025-10-17';
    const durationParam = searchParams.get('duration') || '60';
    const monthParam = searchParams.get('month') === 'true';

    const treatmentDuration = parseInt(durationParam, 10);

    if (monthParam) {
      // Fetch debug info for entire month
      const date = new Date(`${dateParam}T00:00:00`);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      const debugInfo = await availabilityService.debugMonthAvailability(year, month, treatmentDuration);
      return NextResponse.json(debugInfo);
    } else {
      // Fetch debug info for single day
      const date = new Date(`${dateParam}T00:00:00`);
      const debugInfo = await availabilityService.debugDateAvailability(date, {
        treatmentDuration,
      });
      return NextResponse.json(debugInfo);
    }
  } catch (error) {
    console.error('Error in debug-availability route:', error);
    return NextResponse.json(
      { error: 'Failed to get availability debug information' },
      { status: 500 }
    );
  }
}
