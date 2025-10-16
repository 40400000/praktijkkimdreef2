'use server';

import { db, appointments, treatments } from '@/lib/db';
import { googleCalendar } from '@/lib/google-calendar/events';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface AppointmentData {
  treatment: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AppointmentResult {
  success: boolean;
  message: string;
  appointmentId?: number;
  calendarEventId?: string;
}

// Create a new appointment
export async function createAppointment(
  appointmentData: AppointmentData
): Promise<AppointmentResult> {
  try {
    // Get treatment details
    const treatment = await db
      .select()
      .from(treatments)
      .where(eq(treatments.value, appointmentData.treatment))
      .limit(1);

    if (!treatment[0]) {
      return {
        success: false,
        message: 'Behandeling niet gevonden',
      };
    }

    // Parse appointment date and time in Amsterdam timezone
    // Create date in Amsterdam timezone to match availability system
    const appointmentDateTimeString = `${appointmentData.date}T${appointmentData.time}:00`;
    
    // Create date object - this will be interpreted in the local timezone
    // The Google Calendar API will handle the timezone conversion properly
    const appointmentDateTime = new Date(appointmentDateTimeString);
    const endDateTime = new Date(appointmentDateTime.getTime() + treatment[0].duration * 60000);
    
    // Debug logging to help identify timezone issues
    console.log(`📅 Creating appointment: ${appointmentData.date} at ${appointmentData.time}`);
    console.log(`🕐 Appointment DateTime: ${appointmentDateTime.toISOString()}`);
    console.log(`🕐 End DateTime: ${endDateTime.toISOString()}`);
    console.log(`🌍 Local timezone offset: ${appointmentDateTime.getTimezoneOffset()} minutes`);

    // Check if the time slot is still available
    // This is a basic check - in production you might want more sophisticated validation
    const now = new Date();
    if (appointmentDateTime <= now) {
      return {
        success: false,
        message: 'Kan geen afspraak maken in het verleden',
      };
    }

    // Create Google Calendar event first
    let calendarEventId: string | undefined;
    try {
      const calendarEvent = await googleCalendar.createAppointment({
        clientName: appointmentData.name,
        clientEmail: appointmentData.email,
        clientPhone: appointmentData.phone,
        treatmentName: treatment[0].label,
        startDate: appointmentDateTime,
        endDate: endDateTime,
        message: appointmentData.message,
      });
      
      calendarEventId = calendarEvent.id || undefined;
    } catch (calendarError) {
      console.error('Error creating calendar event:', calendarError);
      // Continue with database insertion even if calendar fails
    }

    // Save appointment to database
    const [newAppointment] = await db
      .insert(appointments)
      .values({
        treatmentId: treatment[0].id,
        appointmentDate: appointmentData.date,
        appointmentTime: appointmentData.time,
        duration: treatment[0].duration,
        clientName: appointmentData.name,
        clientEmail: appointmentData.email,
        clientPhone: appointmentData.phone,
        message: appointmentData.message,
        status: 'pending',
        googleCalendarEventId: calendarEventId,
        updatedAt: new Date(),
      })
      .returning();

    // Revalidate relevant pages
    revalidatePath('/afspraak-maken');
    revalidatePath('/admin/appointments'); // If you have an admin page

    return {
      success: true,
      message: 'Afspraak succesvol aangevraagd! Kim zal contact met u opnemen ter bevestiging.',
      appointmentId: newAppointment.id,
      calendarEventId,
    };

  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      success: false,
      message: 'Er is een fout opgetreden bij het aanvragen van de afspraak. Probeer het opnieuw.',
    };
  }
}

// Get appointment by ID
export async function getAppointment(id: number) {
  try {
    const appointment = await db
      .select({
        appointment: appointments,
        treatment: treatments,
      })
      .from(appointments)
      .leftJoin(treatments, eq(appointments.treatmentId, treatments.id))
      .where(eq(appointments.id, id))
      .limit(1);

    return appointment[0] || null;
  } catch (error) {
    console.error('Error getting appointment:', error);
    return null;
  }
}

// Update appointment status
export async function updateAppointmentStatus(
  id: number,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<AppointmentResult> {
  try {
    const [updatedAppointment] = await db
      .update(appointments)
      .set({ 
        status,
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, id))
      .returning();

    if (!updatedAppointment) {
      return {
        success: false,
        message: 'Afspraak niet gevonden',
      };
    }

    // Update Google Calendar event if needed
    if (updatedAppointment.googleCalendarEventId) {
      try {
        if (status === 'cancelled') {
          await googleCalendar.deleteEvent(updatedAppointment.googleCalendarEventId);
        } else if (status === 'confirmed') {
          await googleCalendar.updateEvent(updatedAppointment.googleCalendarEventId, {
            summary: `✅ ${updatedAppointment.clientName} - Bevestigd`,
            description: `Status: Bevestigd\n\nOriginele beschrijving: ${updatedAppointment.message || 'Geen notities'}`,
          });
        }
      } catch (calendarError) {
        console.error('Error updating calendar event:', calendarError);
        // Continue even if calendar update fails
      }
    }

    revalidatePath('/admin/appointments');

    return {
      success: true,
      message: `Afspraak status bijgewerkt naar: ${status}`,
      appointmentId: id,
    };

  } catch (error) {
    console.error('Error updating appointment status:', error);
    return {
      success: false,
      message: 'Er is een fout opgetreden bij het bijwerken van de afspraak',
    };
  }
}

// Cancel appointment
export async function cancelAppointment(id: number): Promise<AppointmentResult> {
  return updateAppointmentStatus(id, 'cancelled');
}

// Confirm appointment
export async function confirmAppointment(id: number): Promise<AppointmentResult> {
  return updateAppointmentStatus(id, 'confirmed');
}
