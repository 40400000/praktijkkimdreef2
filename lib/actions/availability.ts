'use server';

import { availabilityService } from '@/lib/google-calendar/availability';
import { db, treatments } from '@/lib/db';
import { eq } from 'drizzle-orm';

export interface TimeSlot {
  time: string;
  available: boolean;
  isBlocked?: boolean;
  eventSummary?: string;
}

export interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isPastDate: boolean;
  isWeekend: boolean;
  hasAvailability: boolean;
  isToday: boolean;
}

export interface QuickPickSlot {
  date: string;
  time: string;
}

// Get available time slots for a specific date and treatment
export async function getAvailableTimeSlots(
  date: string,
  treatmentValue: string
): Promise<TimeSlot[]> {
  console.log(`🎯 Getting time slots for ${date}, treatment: ${treatmentValue}`);
  
  try {
    // Get treatment details
    console.log('🔍 Looking up treatment in database...');
    const treatment = await db
      .select()
      .from(treatments)
      .where(eq(treatments.value, treatmentValue))
      .limit(1);

    if (!treatment[0]) {
      console.error(`❌ Treatment not found: ${treatmentValue}`);
      throw new Error('Treatment not found');
    }

    console.log(`✅ Treatment found: ${treatment[0].label} (${treatment[0].duration} minutes)`);

    // Parse date string in Amsterdam timezone to match Google Calendar events
    const appointmentDate = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow booking in the past
    if (appointmentDate < today) {
      console.log('❌ Cannot book in the past');
      return [];
    }

    console.log('🚀 Calling Google Calendar availability service (using debug function)...');
    console.log(`🔍 [getAvailableTimeSlots] Date being passed:`, appointmentDate.toISOString());
    // Get availability from Google Calendar using debug function for consistency
    const debugInfo = await availabilityService.debugDateAvailability(appointmentDate, {
      treatmentDuration: treatment[0].duration,
      bufferTime: 15, // 15 minutes between appointments
    });

    console.log(`🔍 [getAvailableTimeSlots] Debug info received:`, {
      hasSlots: !!debugInfo.slots,
      slotsLength: debugInfo.slots?.length || 0,
      slots: debugInfo.slots?.slice(0, 3) // Show first 3 slots
    });

    let slots: TimeSlot[] = debugInfo.slots.map((slot: any) => ({
      time: slot.time,
      available: slot.available,
      isBlocked: slot.isBlocked,
      eventSummary: slot.conflictingEvent?.summary,
    }));

    // Filter out past time slots on the current day
    const now = new Date();
    if (
      appointmentDate.getFullYear() === now.getFullYear() &&
      appointmentDate.getMonth() === now.getMonth() &&
      appointmentDate.getDate() === now.getDate()
    ) {
      const currentTime = now.getHours() * 60 + now.getMinutes();
      slots = slots.filter(slot => {
        const [hours, minutes] = slot.time.split(':').map(Number);
        return hours * 60 + minutes > currentTime;
      });
    }

    console.log(`✅ Got ${slots.length} time slots from Google Calendar`);
    const availableSlots = slots.filter(slot => slot.available);
    console.log(`📅 ${availableSlots.length} slots are available`);

    return slots;
  } catch (error) {
    console.error('❌ Error getting available time slots:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Failed to get available time slots');
  }
}

// Get calendar data with availability for a specific month
export async function getCalendarAvailability(
  year: number,
  month: number,
  treatmentDuration: number = 60
): Promise<CalendarDay[]> {
  const functionStart = performance.now();
  console.log(`\n📅 [getCalendarAvailability] Starting for ${year}-${month + 1}`);
  
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = new Date(year, month, 1);
    const startOfCalendar = new Date(currentMonth);
    
    // Start from the first day of the week (Monday = 1)
    const startDay = currentMonth.getDay();
    const daysToSubtract = startDay === 0 ? 6 : startDay - 1;
    startOfCalendar.setDate(startOfCalendar.getDate() - daysToSubtract);
    
    console.log(`⏱️ [getCalendarAvailability] Fetching month availability from Google Calendar...`);
    const availStart = performance.now();
    
    // Get availability data from Google Calendar for the month
    const monthAvailability = await availabilityService.getMonthAvailability(year, month, treatmentDuration);
    
    const availEnd = performance.now();
    console.log(`✅ [getCalendarAvailability] Month availability fetched in ${(availEnd - availStart).toFixed(0)}ms`);
    console.log(`🔍 [getCalendarAvailability] Month availability data:`, Object.keys(monthAvailability).length, 'days');
    console.log(`🔍 [getCalendarAvailability] Available days:`, Object.entries(monthAvailability).filter(([_, available]) => available).length);
    
    const calendar: CalendarDay[] = [];
    const currentDate = new Date(startOfCalendar);
    
    // Generate 6 weeks worth of days (42 days)
    for (let i = 0; i < 42; i++) {
      // Format date as YYYY-MM-DD without timezone conversion
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      const isCurrentMonth = currentDate.getMonth() === month;
      const checkDate = new Date(currentDate);
      checkDate.setHours(0, 0, 0, 0);
      const isPastDate = checkDate < today;
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      
      const hasAvailability = isCurrentMonth && !isPastDate && (monthAvailability[dateStr] === true);
      
      // Debug logging for specific dates
      if (dateStr === '2025-10-27') {
        console.log(`🔍 [getCalendarAvailability] Debug for ${dateStr}:`, {
          isCurrentMonth,
          isPastDate,
          monthAvailabilityValue: monthAvailability[dateStr],
          hasAvailability
        });
      }
      
      calendar.push({
        date: dateStr,
        day: currentDate.getDate(),
        isCurrentMonth,
        isPastDate,
        isWeekend,
        hasAvailability,
        isToday,
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const functionEnd = performance.now();
    console.log(`✅ [getCalendarAvailability] Total time: ${(functionEnd - functionStart).toFixed(0)}ms\n`);
    
    return calendar;
  } catch (error) {
    console.error('❌ [getCalendarAvailability] Error:', error);
    // Return fallback calendar without availability
    return generateFallbackCalendar(year, month);
  }
}

// Get all available treatments
export async function getTreatments() {
  try {
    const allTreatments = await db
      .select()
      .from(treatments)
      .where(eq(treatments.active, true))
      .orderBy(treatments.id);

    return allTreatments;
  } catch (error) {
    console.error('Error getting treatments:', error);
    // Return hardcoded fallback treatments
    return [
      { id: 1, value: "orthomoleculair-intake", label: "Orthomoleculaire therapie - Intake", duration: 60, price: null, active: true, createdAt: new Date() },
      { id: 2, value: "orthomoleculair-vervolg", label: "Orthomoleculaire therapie - Vervolgconsult", duration: 30, price: null, active: true, createdAt: new Date() },
      { id: 3, value: "homeopathie-qest4", label: "Homeopathie met Qest4 test", duration: 60, price: null, active: true, createdAt: new Date() },
      { id: 4, value: "homeopathie-vervolg", label: "Homeopathie - Vervolgconsult", duration: 30, price: null, active: true, createdAt: new Date() },
    ];
  }
}

export async function getFirstAvailableSlots(treatmentValue: string): Promise<QuickPickSlot[]> {
  try {
    console.log(`🎯 Getting first available slots for treatment: ${treatmentValue}`);
    const treatment = await db
      .select()
      .from(treatments)
      .where(eq(treatments.value, treatmentValue))
      .limit(1);

    if (!treatment[0]) {
      console.error(`❌ Treatment not found: ${treatmentValue}`);
      throw new Error('Treatment not found');
    }

    const slots = await availabilityService.findNextAvailableSlots(treatment[0].duration);
    return slots;
  } catch (error) {
    console.error('❌ Error getting first available slots:', error);
    throw new Error('Failed to get first available slots');
  }
}

// Helper function to generate fallback calendar data
function generateFallbackCalendar(year: number, month: number): CalendarDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = new Date(year, month, 1);
  const startOfCalendar = new Date(currentMonth);
  
  const startDay = currentMonth.getDay();
  const daysToSubtract = startDay === 0 ? 6 : startDay - 1;
  startOfCalendar.setDate(startOfCalendar.getDate() - daysToSubtract);
  
  const calendar: CalendarDay[] = [];
  const currentDate = new Date(startOfCalendar);
  
  for (let i = 0; i < 42; i++) {
    // Format date as YYYY-MM-DD without timezone conversion
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const isCurrentMonth = currentDate.getMonth() === month;
    const checkDate = new Date(currentDate);
    checkDate.setHours(0, 0, 0, 0);
    const isPastDate = checkDate < today;
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const isToday = dateStr === todayStr;
    
    calendar.push({
      date: dateStr,
      day: currentDate.getDate(),
      isCurrentMonth,
      isPastDate,
      isWeekend,
      hasAvailability: isCurrentMonth && !isPastDate, // Make all current month days selectable (fallback)
      isToday,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return calendar;
}
