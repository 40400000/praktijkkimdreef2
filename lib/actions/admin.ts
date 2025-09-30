'use server';

import { googleCalendar } from '@/lib/google-calendar/events';
import { db, blockedSlots, availabilityRules } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface BlockTimeSlotData {
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
}

export interface BlockTimeResult {
  success: boolean;
  message: string;
  eventId?: string;
}

// Block a time slot manually
export async function blockTimeSlot(data: BlockTimeSlotData): Promise<BlockTimeResult> {
  try {
    const { date, startTime, endTime, reason = 'Blocked Time' } = data;
    
    // Create start and end datetime objects
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);
    
    // Validate dates
    if (startDateTime >= endDateTime) {
      return {
        success: false,
        message: 'Start time must be before end time',
      };
    }
    
    if (startDateTime < new Date()) {
      return {
        success: false,
        message: 'Cannot block time in the past',
      };
    }
    
    // Create blocked event in Google Calendar
    let calendarEventId: string | undefined;
    try {
      const calendarEvent = await googleCalendar.createBlockedTime(
        startDateTime,
        endDateTime,
        reason
      );
      calendarEventId = calendarEvent.id || undefined;
    } catch (calendarError) {
      console.error('Error creating calendar block:', calendarError);
      // Continue with database operation even if calendar fails
    }
    
    // Save to database
    await db.insert(blockedSlots).values({
      date,
      startTime,
      endTime,
      reason,
      googleCalendarEventId: calendarEventId,
    });
    
    // Revalidate pages
    revalidatePath('/afspraak-maken');
    revalidatePath('/admin');
    
    return {
      success: true,
      message: 'Time slot blocked successfully',
      eventId: calendarEventId,
    };
    
  } catch (error) {
    console.error('Error blocking time slot:', error);
    return {
      success: false,
      message: 'Failed to block time slot',
    };
  }
}

// Unblock a time slot
export async function unblockTimeSlot(blockId: number): Promise<BlockTimeResult> {
  try {
    // Get the blocked slot
    const [blockedSlot] = await db
      .select()
      .from(blockedSlots)
      .where(eq(blockedSlots.id, blockId))
      .limit(1);
    
    if (!blockedSlot) {
      return {
        success: false,
        message: 'Blocked slot not found',
      };
    }
    
    // Delete from Google Calendar if event exists
    if (blockedSlot.googleCalendarEventId) {
      try {
        await googleCalendar.deleteEvent(blockedSlot.googleCalendarEventId);
      } catch (calendarError) {
        console.error('Error deleting calendar event:', calendarError);
        // Continue with database operation
      }
    }
    
    // Delete from database
    await db.delete(blockedSlots).where(eq(blockedSlots.id, blockId));
    
    // Revalidate pages
    revalidatePath('/afspraak-maken');
    revalidatePath('/admin');
    
    return {
      success: true,
      message: 'Time slot unblocked successfully',
    };
    
  } catch (error) {
    console.error('Error unblocking time slot:', error);
    return {
      success: false,
      message: 'Failed to unblock time slot',
    };
  }
}

// Block multiple days (e.g., for vacation)
export async function blockDateRange(
  startDate: string,
  endDate: string,
  reason: string = 'Vacation'
): Promise<BlockTimeResult> {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return {
        success: false,
        message: 'Start date must be before end date',
      };
    }
    
    const results: Promise<BlockTimeResult>[] = [];
    const currentDate = new Date(start);
    
    // Block each day in the range (9 AM to 5 PM)
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Skip weekends
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        results.push(
          blockTimeSlot({
            date: dateStr,
            startTime: '09:00',
            endTime: '17:00',
            reason,
          })
        );
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const blockResults = await Promise.all(results);
    const failedBlocks = blockResults.filter(r => !r.success);
    
    if (failedBlocks.length > 0) {
      return {
        success: false,
        message: `Failed to block ${failedBlocks.length} days out of ${blockResults.length}`,
      };
    }
    
    return {
      success: true,
      message: `Successfully blocked ${blockResults.length} days`,
    };
    
  } catch (error) {
    console.error('Error blocking date range:', error);
    return {
      success: false,
      message: 'Failed to block date range',
    };
  }
}

// Update availability rules start time for all working days
export async function updateAvailabilityStartTime(newStartTime: string): Promise<BlockTimeResult> {
  try {
    console.log(`\n🔧 Updating all availability rules to start at ${newStartTime}`);
    
    // Get all availability rules
    const rules = await db.select().from(availabilityRules);
    
    console.log(`📋 Found ${rules.length} availability rules to update`);
    
    // Update each rule
    for (const rule of rules) {
      await db
        .update(availabilityRules)
        .set({ startTime: newStartTime })
        .where(eq(availabilityRules.id, rule.id));
      
      console.log(`✅ Updated day ${rule.dayOfWeek}: ${rule.startTime} → ${newStartTime}`);
    }
    
    // Clear the working hours cache in availability service
    const { availabilityService } = await import('@/lib/google-calendar/availability');
    availabilityService.clearCache();
    
    revalidatePath('/afspraak-maken');
    
    console.log(`✅ All availability rules updated successfully\n`);
    
    return {
      success: true,
      message: `Updated ${rules.length} availability rules to start at ${newStartTime}`,
    };
  } catch (error) {
    console.error('❌ Error updating availability rules:', error);
    return {
      success: false,
      message: 'Failed to update availability rules',
    };
  }
}
