import { calendar_v3 } from 'googleapis';
import { GoogleCalendarService } from './events';
import { db, availabilityRules, treatments } from '@/lib/db';
import { eq } from 'drizzle-orm';

export interface TimeSlot {
  time: string;
  available: boolean;
  isBlocked?: boolean;
  eventSummary?: string;
}

export interface AvailabilityOptions {
  treatmentDuration: number;
  bufferTime?: number; // minutes between appointments
}

// ⚠️ EASY TO CHANGE: Buffer time after each appointment (in minutes)
// This ensures X minutes gap BETWEEN appointments (not before the first or after the last)
const POST_APPOINTMENT_BUFFER_MINUTES = 15;

export class AvailabilityService {
  private calendarService: GoogleCalendarService;

  constructor() {
    this.calendarService = new GoogleCalendarService();
  }

  // Get availability for a specific date
  async getDateAvailability(
    date: Date,
    options: AvailabilityOptions
  ): Promise<TimeSlot[]> {
    console.log(`🗓️ Getting availability for ${date.toDateString()}`);
    const { treatmentDuration, bufferTime = 15 } = options;
    
    // Get working hours for this day of week
    const dayOfWeek = date.getDay();
    console.log(`📅 Checking working hours for day ${dayOfWeek} (${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]})`);
    
    const workingHours = await this.getWorkingHours(dayOfWeek);
    
    if (workingHours) {
      console.log(`✅ Base working hours: ${workingHours.startTime} - ${workingHours.endTime}`);
    } else {
      console.log(`⚠️  No base working hours for day ${dayOfWeek} - checking for VRIJ events...`);
    }

    // Get all calendar events for this date in Amsterdam timezone
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const startOfDay = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00+02:00`);
    const endOfDay = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T23:59:59+02:00`);
    
    console.log(`🔍 Fetching calendar events for availability check...`);
    const events = await this.calendarService.getEvents(startOfDay, endOfDay);
    
    // Check for "VRIJ" events to extend availability
    const vrijEvents = this.findVrijEvents(events);
    
    // If no working hours and no VRIJ events, return empty
    if (!workingHours && vrijEvents.length === 0) {
      console.log(`❌ No working hours and no VRIJ events for this day`);
      return [];
    }
    
    // Calculate hours based on what we have
    let extendedHours: { startTime: string; endTime: string };
    
    if (workingHours) {
      // Normal case: extend base working hours with VRIJ events
      extendedHours = this.calculateExtendedHours(workingHours, vrijEvents, date);
      if (vrijEvents.length > 0) {
        console.log(`🎉 Found ${vrijEvents.length} VRIJ event(s) - extending hours to: ${extendedHours.startTime} - ${extendedHours.endTime}`);
      }
    } else {
      // Special case: no base hours, only VRIJ events define availability
      extendedHours = this.calculateVrijOnlyHours(vrijEvents, date);
      console.log(`🎉 No base hours, using ${vrijEvents.length} VRIJ event(s): ${extendedHours.startTime} - ${extendedHours.endTime}`);
    }
    
    // Filter out VRIJ events from blocking events
    const blockingEvents = events.filter(event => !this.isVrijEvent(event));
    
    // Generate time slots based on extended hours
    const timeSlots = this.generateTimeSlots(
      extendedHours.startTime,
      extendedHours.endTime,
      treatmentDuration,
      bufferTime
    );

    // Check each slot against calendar events (excluding VRIJ events)
    return timeSlots.map((slot, index) => {
      const slotStart = this.parseTimeToDate(date, slot.time);
      const slotEnd = new Date(slotStart.getTime() + treatmentDuration * 60000);
      
      // For the last slot of the day, don't add buffer time
      const isLastSlot = index === timeSlots.length - 1;
      const slotEndWithBuffer = isLastSlot 
        ? slotEnd 
        : new Date(slotEnd.getTime() + bufferTime * 60000);
      
      const conflictingEvent = this.findConflictingEvent(blockingEvents, slotStart, slotEndWithBuffer);
      
      return {
        ...slot,
        available: !conflictingEvent,
        isBlocked: conflictingEvent ? this.isBlockedEvent(conflictingEvent) : false,
        eventSummary: conflictingEvent?.summary || undefined,
      };
    });
  }

  // Get availability for a specific date with debug info
  async debugDateAvailability(
    date: Date,
    options: AvailabilityOptions
  ): Promise<any> {
    console.log(`🔍 [debugDateAvailability] Called with date:`, date.toISOString(), 'dayOfWeek:', date.getDay());
    const { treatmentDuration, bufferTime = 15 } = options;
    const dayOfWeek = date.getDay();
    const workingHours = await this.getWorkingHours(dayOfWeek);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const startOfDay = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00+02:00`);
    const endOfDay = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T23:59:59+02:00`);
    
    const events = await this.calendarService.getEvents(startOfDay, endOfDay);
    const vrijEvents = this.findVrijEvents(events);
    
    if (!workingHours && vrijEvents.length === 0) {
      return {
        message: "No working hours and no VRIJ events for this day",
        workingHours: null,
        vrijEvents: [],
        events: events,
        slots: [],
      };
    }
    
    let extendedHours: { startTime: string; endTime: string };
    let baseHoursInfo = workingHours ? `${workingHours.startTime} - ${workingHours.endTime}` : 'None';
    let extendedHoursInfo = 'Not extended';

    if (workingHours) {
      extendedHours = this.calculateExtendedHours(workingHours, vrijEvents, date);
      if (vrijEvents.length > 0) {
        extendedHoursInfo = `${extendedHours.startTime} - ${extendedHours.endTime}`;
      }
    } else {
      extendedHours = this.calculateVrijOnlyHours(vrijEvents, date);
      extendedHoursInfo = `VRIJ only: ${extendedHours.startTime} - ${extendedHours.endTime}`;
    }
    
    const blockingEvents = events.filter(event => !this.isVrijEvent(event));
    
    const timeSlots = this.generateTimeSlots(
      extendedHours.startTime,
      extendedHours.endTime,
      treatmentDuration,
      bufferTime
    );

    const slotsWithDebug = timeSlots.map((slot, index) => {
      const slotStart = this.parseTimeToDate(date, slot.time);
      const slotEnd = new Date(slotStart.getTime() + treatmentDuration * 60000);
      
      // For the last slot of the day, don't add buffer time
      const isLastSlot = index === timeSlots.length - 1;
      const slotEndWithBuffer = isLastSlot 
        ? slotEnd 
        : new Date(slotEnd.getTime() + bufferTime * 60000);
      
      const conflictingEvent = this.findConflictingEvent(blockingEvents, slotStart, slotEndWithBuffer);
      
      return {
        time: slot.time,
        available: !conflictingEvent,
        isBlocked: conflictingEvent ? this.isBlockedEvent(conflictingEvent) : false,
        conflictingEvent: conflictingEvent ? {
          summary: conflictingEvent.summary,
          start: conflictingEvent.start?.dateTime,
          end: conflictingEvent.end?.dateTime,
        } : null,
      };
    });

    return {
      date: date.toDateString(),
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek],
      treatmentDuration: treatmentDuration,
      bufferTime: bufferTime,
      workingHours: workingHours,
      baseHoursInfo: baseHoursInfo,
      vrijEvents: vrijEvents.map(e => ({ summary: e.summary, start: e.start?.dateTime, end: e.end?.dateTime })),
      extendedHours: extendedHoursInfo,
      events: events.map(e => ({ summary: e.summary, start: e.start?.dateTime, end: e.end?.dateTime })),
      blockingEvents: blockingEvents.map(e => ({ summary: e.summary, start: e.start?.dateTime, end: e.end?.dateTime })),
      slots: slotsWithDebug,
    };
  }

  // Get debug info for multiple dates (for calendar view)
  async debugMonthAvailability(
    year: number,
    month: number,
    treatmentDuration: number = 60
  ): Promise<Record<string, any>> {
    const functionStart = performance.now();
    console.log(`\n🗓️  [debugMonthAvailability] Starting for ${year}-${month + 1}`);
    
    // Create month boundaries in local timezone
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    
    console.log(`⏱️  [debugMonthAvailability] Fetching calendar events...`);
    const eventsStart = performance.now();
    
    // Get all events for the month
    const events = await this.calendarService.getEvents(startOfMonth, endOfMonth);
    
    const eventsEnd = performance.now();
    console.log(`✅ [debugMonthAvailability] Events fetched in ${(eventsEnd - eventsStart).toFixed(0)}ms (${events.length} events)`);
    
    const debugInfo: Record<string, any> = {};
    
    console.log(`⏱️  [debugMonthAvailability] Checking each day...`);
    const checkStart = performance.now();
    
    // Check each day of the month
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      // Format date as YYYY-MM-DD without timezone conversion
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      
      // Skip past dates and today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(currentDate);
      checkDate.setHours(0, 0, 0, 0);
      if (checkDate <= today) {
        debugInfo[dateStr] = {
          message: "Past date or today",
          workingHours: null,
          vrijEvents: [],
          events: [],
          slots: [],
        };
        continue;
      }
      
      // Get debug info for this day using pre-fetched events
      const dayDebugInfo = await this.debugDateAvailabilityWithEvents(currentDate, events, treatmentDuration);
      debugInfo[dateStr] = dayDebugInfo;
    }
    
    const checkEnd = performance.now();
    console.log(`✅ [debugMonthAvailability] Day checking completed in ${(checkEnd - checkStart).toFixed(0)}ms`);
    
    const functionEnd = performance.now();
    console.log(`✅ [debugMonthAvailability] Total time: ${(functionEnd - functionStart).toFixed(0)}ms\n`);
    
    return debugInfo;
  }

  // Get availability for multiple dates (for calendar view)
  async getMonthAvailability(
    year: number,
    month: number,
    treatmentDuration: number = 60
  ): Promise<Record<string, boolean>> {
    const functionStart = performance.now();
    console.log(`\n🗓️  [getMonthAvailability] Starting for ${year}-${month + 1}`);
    
    // Create month boundaries in local timezone
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    
    console.log(`⏱️  [getMonthAvailability] Fetching calendar events...`);
    const eventsStart = performance.now();
    
    // Get all events for the month
    const events = await this.calendarService.getEvents(startOfMonth, endOfMonth);
    
    const eventsEnd = performance.now();
    console.log(`✅ [getMonthAvailability] Events fetched in ${(eventsEnd - eventsStart).toFixed(0)}ms (${events.length} events)`);
    
    const availability: Record<string, boolean> = {};
    
    console.log(`⏱️  [getMonthAvailability] Checking each day...`);
    const checkStart = performance.now();
    
    // Check each day of the month
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      // Format date as YYYY-MM-DD without timezone conversion
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      
      // Skip past dates and today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(currentDate);
      checkDate.setHours(0, 0, 0, 0);
      if (checkDate <= today) {
        availability[dateStr] = false;
        continue;
      }
      
      // Check if there are any available slots (quick check)
      // NOTE: hasAnyAvailability checks working hours internally and handles VRIJ events
      const hasAvailability = await this.hasAnyAvailability(currentDate, events, treatmentDuration);
      availability[dateStr] = hasAvailability;
    }
    
    const checkEnd = performance.now();
    console.log(`✅ [getMonthAvailability] Day checking completed in ${(checkEnd - checkStart).toFixed(0)}ms`);
    
    const functionEnd = performance.now();
    console.log(`✅ [getMonthAvailability] Total time: ${(functionEnd - functionStart).toFixed(0)}ms\n`);
    
    const availableDays = Object.values(availability).filter(v => v).length;
    console.log(`📊 [getMonthAvailability] ${availableDays} days have availability`);
    
    return availability;
  }

  // Private helper methods
  private workingHoursCache: Map<number, any> = new Map();
  
  // Clear the working hours cache (useful when availability rules are updated)
  clearCache() {
    this.workingHoursCache.clear();
    console.log('🧹 Working hours cache cleared');
  }
  
  private async getWorkingHours(dayOfWeek: number) {
    // Use cache to avoid repeated DB queries
    if (this.workingHoursCache.has(dayOfWeek)) {
      return this.workingHoursCache.get(dayOfWeek);
    }
    
    const rules = await db
      .select()
      .from(availabilityRules)
      .where(eq(availabilityRules.dayOfWeek, dayOfWeek))
      .limit(1);
    
    const result = rules[0] || null;
    this.workingHoursCache.set(dayOfWeek, result);
    
    return result;
  }

  private generateTimeSlots(
    startTime: string,
    endTime: string,
    duration: number,
    bufferTime: number
  ): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const slotInterval = 15; // 15-minute intervals
    
    for (let minutes = startMinutes; minutes + duration <= endMinutes; minutes += slotInterval) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      slots.push({
        time: timeStr,
        available: true, // Will be checked against calendar events
      });
    }
    
    return slots;
  }

  private parseTimeToDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    
    // Create date in Amsterdam timezone to match Google Calendar events
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Create date string in Amsterdam timezone format to match Google Calendar events
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    
    // Parse as Amsterdam timezone (this handles DST automatically)
    return new Date(dateStr + '+02:00'); // Europe/Amsterdam timezone offset
  }

  private findConflictingEvent(
    events: calendar_v3.Schema$Event[],
    slotStart: Date,
    slotEndWithBuffer: Date
  ): calendar_v3.Schema$Event | null {
    return events.find(event => {
      if (!event.start?.dateTime || !event.end?.dateTime) {
        return false; // Skip all-day events
      }
      
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      
      // Note: slotEndWithBuffer already includes the 15-min buffer after the appointment
      // So we check if the slot (with its buffer) overlaps with any event
      // This ensures 15 minutes between appointments
      // Personal/private events don't need buffer consideration
      const isPersonalEvent = this.isPersonalEvent(event);
      
      if (isPersonalEvent) {
        // For personal events, only check direct overlap without buffer
        // Calculate the actual slot end time (without buffer)
        const slotEnd = new Date(slotStart.getTime() + (slotEndWithBuffer.getTime() - slotStart.getTime()) - (POST_APPOINTMENT_BUFFER_MINUTES * 60000));
        return slotStart < eventEnd && slotEnd > eventStart;
      }
      
      // For regular appointments, we need to ensure buffer on both sides:
      // 1. slotEndWithBuffer already has buffer (handled by caller)
      // 2. We need to add buffer AFTER existing events to prevent booking right after them
      const eventEndWithBuffer = new Date(eventEnd.getTime() + POST_APPOINTMENT_BUFFER_MINUTES * 60000);
      
      // Check for overlap
      return slotStart < eventEndWithBuffer && slotEndWithBuffer > eventStart;
    }) || null;
  }

  private isPersonalEvent(event: calendar_v3.Schema$Event): boolean {
    if (!event.summary) return false;
    
    const summary = event.summary.toLowerCase();
    
    // List of keywords that indicate personal/private events (no buffer needed)
    const personalKeywords = ['privé', 'prive', 'personal', 'private', 'eigen'];
    
    return personalKeywords.some(keyword => summary.includes(keyword));
  }

  private isBlockedEvent(event: calendar_v3.Schema$Event): boolean {
    // Identify blocked time by summary prefix or color
    return (
      event.summary?.startsWith('🚫') ||
      event.colorId === '8' || // Red color typically used for blocked time
      event.summary?.toLowerCase().includes('blocked') ||
      event.summary?.toLowerCase().includes('unavailable') ||
      false
    );
  }

  // Check if an event is a "VRIJ" event (extended availability)
  private isVrijEvent(event: calendar_v3.Schema$Event): boolean {
    if (!event.summary) return false;
    const summary = event.summary.toUpperCase().trim();
    return summary === 'VRIJ' || summary.startsWith('VRIJ:') || summary.startsWith('VRIJ ');
  }

  // Find all "VRIJ" events from a list of events
  private findVrijEvents(events: calendar_v3.Schema$Event[]): calendar_v3.Schema$Event[] {
    return events.filter(event => this.isVrijEvent(event));
  }

  // Calculate extended working hours based on VRIJ events
  private calculateExtendedHours(
    baseHours: { startTime: string; endTime: string },
    vrijEvents: calendar_v3.Schema$Event[],
    date: Date
  ): { startTime: string; endTime: string } {
    if (vrijEvents.length === 0) {
      return baseHours;
    }

    // Parse base hours to minutes
    const [baseStartHour, baseStartMin] = baseHours.startTime.split(':').map(Number);
    const [baseEndHour, baseEndMin] = baseHours.endTime.split(':').map(Number);
    let earliestMinutes = baseStartHour * 60 + baseStartMin;
    let latestMinutes = baseEndHour * 60 + baseEndMin;

    // Check each VRIJ event and extend the range
    for (const vrijEvent of vrijEvents) {
      if (!vrijEvent.start?.dateTime || !vrijEvent.end?.dateTime) continue;

      const eventStart = new Date(vrijEvent.start.dateTime);
      const eventEnd = new Date(vrijEvent.end.dateTime);

      // Only process if the event is on the correct date
      if (eventStart.toDateString() !== date.toDateString()) continue;

      const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
      const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();

      // Extend the range
      earliestMinutes = Math.min(earliestMinutes, startMinutes);
      latestMinutes = Math.max(latestMinutes, endMinutes);

      console.log(`  📅 VRIJ event: ${this.formatMinutesToTime(startMinutes)} - ${this.formatMinutesToTime(endMinutes)}`);
    }

    return {
      startTime: this.formatMinutesToTime(earliestMinutes),
      endTime: this.formatMinutesToTime(latestMinutes),
    };
  }

  // Calculate hours based ONLY on VRIJ events (for days with no base working hours)
  private calculateVrijOnlyHours(
    vrijEvents: calendar_v3.Schema$Event[],
    date: Date
  ): { startTime: string; endTime: string } {
    let earliestMinutes = 24 * 60; // Start with end of day
    let latestMinutes = 0; // Start with beginning of day

    for (const vrijEvent of vrijEvents) {
      if (!vrijEvent.start?.dateTime || !vrijEvent.end?.dateTime) continue;

      const eventStart = new Date(vrijEvent.start.dateTime);
      const eventEnd = new Date(vrijEvent.end.dateTime);

      // Only process if the event is on the correct date
      if (eventStart.toDateString() !== date.toDateString()) continue;

      const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
      const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();

      earliestMinutes = Math.min(earliestMinutes, startMinutes);
      latestMinutes = Math.max(latestMinutes, endMinutes);

      console.log(`  📅 VRIJ event: ${this.formatMinutesToTime(startMinutes)} - ${this.formatMinutesToTime(endMinutes)}`);
    }

    return {
      startTime: this.formatMinutesToTime(earliestMinutes),
      endTime: this.formatMinutesToTime(latestMinutes),
    };
  }

  // Helper to format minutes to HH:MM
  private formatMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  // Debug date availability using pre-fetched events
  private async debugDateAvailabilityWithEvents(
    date: Date,
    monthEvents: calendar_v3.Schema$Event[],
    treatmentDuration: number = 60
  ): Promise<any> {
    const dayOfWeek = date.getDay();
    const workingHours = await this.getWorkingHours(dayOfWeek);

    const dayEvents = monthEvents.filter(event => {
      if (!event.start?.dateTime) return false;
      return new Date(event.start.dateTime).toDateString() === date.toDateString();
    });

    const vrijEvents = this.findVrijEvents(dayEvents);
    
    if (!workingHours && vrijEvents.length === 0) {
      return {
        message: "No working hours and no VRIJ events for this day",
        workingHours: null,
        vrijEvents: [],
        events: dayEvents,
        slots: [],
      };
    }
    
    let extendedHours: { startTime: string; endTime: string };
    let baseHoursInfo = workingHours ? `${workingHours.startTime} - ${workingHours.endTime}` : 'None';
    let extendedHoursInfo = 'Not extended';

    if (workingHours) {
      extendedHours = this.calculateExtendedHours(workingHours, vrijEvents, date);
      if (vrijEvents.length > 0) {
        extendedHoursInfo = `${extendedHours.startTime} - ${extendedHours.endTime}`;
      }
    } else {
      extendedHours = this.calculateVrijOnlyHours(vrijEvents, date);
      extendedHoursInfo = `VRIJ only: ${extendedHours.startTime} - ${extendedHours.endTime}`;
    }
    
    const blockingEvents = dayEvents.filter(event => !this.isVrijEvent(event));
    
    const timeSlots = this.generateTimeSlots(
      extendedHours.startTime,
      extendedHours.endTime,
      treatmentDuration,
      15
    );

    const slotsWithDebug = timeSlots.map((slot, index) => {
      const slotStart = this.parseTimeToDate(date, slot.time);
      const slotEnd = new Date(slotStart.getTime() + treatmentDuration * 60000);
      
      // For the last slot of the day, don't add buffer time
      const isLastSlot = index === timeSlots.length - 1;
      const slotEndWithBuffer = isLastSlot 
        ? slotEnd 
        : new Date(slotEnd.getTime() + 15 * 60000);
      
      const conflictingEvent = this.findConflictingEvent(blockingEvents, slotStart, slotEndWithBuffer);
      
      return {
        time: slot.time,
        available: !conflictingEvent,
        isBlocked: conflictingEvent ? this.isBlockedEvent(conflictingEvent) : false,
        conflictingEvent: conflictingEvent ? {
          summary: conflictingEvent.summary,
          start: conflictingEvent.start?.dateTime,
          end: conflictingEvent.end?.dateTime,
        } : null,
      };
    });

    return {
      date: date.toDateString(),
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek],
      treatmentDuration: treatmentDuration,
      bufferTime: 15,
      workingHours: workingHours,
      baseHoursInfo: baseHoursInfo,
      vrijEvents: vrijEvents.map(e => ({ summary: e.summary, start: e.start?.dateTime, end: e.end?.dateTime })),
      extendedHours: extendedHoursInfo,
      events: dayEvents.map(e => ({ summary: e.summary, start: e.start?.dateTime, end: e.end?.dateTime })),
      blockingEvents: blockingEvents.map(e => ({ summary: e.summary, start: e.start?.dateTime, end: e.end?.dateTime })),
      slots: slotsWithDebug,
    };
  }

  private async hasAnyAvailability(
    date: Date,
    monthEvents: calendar_v3.Schema$Event[],
    treatmentDuration: number = 60
  ): Promise<boolean> {
    const dayOfWeek = date.getDay();
    const workingHours = await this.getWorkingHours(dayOfWeek);

    const dayEvents = monthEvents.filter(event => {
      if (!event.start?.dateTime) return false;
      return new Date(event.start.dateTime).toDateString() === date.toDateString();
    });

    const vrijEvents = this.findVrijEvents(dayEvents);
    if (!workingHours && vrijEvents.length === 0) {
      return false;
    }
    
    let extendedHours: { startTime: string; endTime: string };
    if (workingHours) {
      extendedHours = this.calculateExtendedHours(workingHours, vrijEvents, date);
    } else {
      extendedHours = this.calculateVrijOnlyHours(vrijEvents, date);
    }
    
    const blockingEvents = dayEvents.filter(event => !this.isVrijEvent(event));
    
    const timeSlots = this.generateTimeSlots(
      extendedHours.startTime,
      extendedHours.endTime,
      treatmentDuration,
      15 
    );

    for (let i = 0; i < timeSlots.length; i++) {
      const slot = timeSlots[i];
      const slotStart = this.parseTimeToDate(date, slot.time);
      const slotEnd = new Date(slotStart.getTime() + treatmentDuration * 60000);
      
      // For the last slot of the day, don't add buffer time
      const isLastSlot = i === timeSlots.length - 1;
      const slotEndWithBuffer = isLastSlot 
        ? slotEnd 
        : new Date(slotEnd.getTime() + 15 * 60000);
      
      const conflictingEvent = this.findConflictingEvent(blockingEvents, slotStart, slotEndWithBuffer);
      if (!conflictingEvent) {
        return true; 
      }
    }
    
    return false;
  }

  private getWorkingMinutes(startTime: string, endTime: string): number {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    
    return endMinutes - startMinutes;
  }
}

export const availabilityService = new AvailabilityService();
