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
    const [year, month, day] = date.split('-').map(Number);
    const appointmentDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00+02:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow booking in the past
    if (appointmentDate < today) {
      console.log('❌ Cannot book in the past');
      return [];
    }

    console.log('🚀 Calling Google Calendar availability service...');
    // Get availability from Google Calendar
    const slots = await availabilityService.getDateAvailability(appointmentDate, {
      treatmentDuration: treatment[0].duration,
      bufferTime: 15, // 15 minutes between appointments
    });

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
      
      calendar.push({
        date: dateStr,
        day: currentDate.getDate(),
        isCurrentMonth,
        isPastDate,
        isWeekend,
        hasAvailability: isCurrentMonth && !isPastDate && !isToday && (monthAvailability[dateStr] || false),
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
      hasAvailability: isCurrentMonth && !isPastDate && !isToday && Math.random() > 0.3, // Fallback random
      isToday,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return calendar;
}
