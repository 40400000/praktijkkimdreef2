import { calendar_v3 } from 'googleapis';
import { getCalendarClient } from './auth';

export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;
  private calendarIds: string[];

  constructor(calendarIds?: string | string[]) {
    this.calendar = getCalendarClient();
    
    // Support both single calendar ID and multiple calendar IDs
    if (Array.isArray(calendarIds)) {
      this.calendarIds = calendarIds;
    } else if (calendarIds) {
      this.calendarIds = [calendarIds];
    } else {
      // Use both calendars from environment or default
      const primaryCalendar = process.env.GOOGLE_CALENDAR_ID || 'primary';
      const secondaryCalendar = '70d3477c8b3515eaed62d0ed6e66438004fbd53cef403271d363cb95d2956d18@group.calendar.google.com';
      this.calendarIds = [primaryCalendar, secondaryCalendar];
    }
  }

  // Get primary calendar ID (for creating events)
  private get primaryCalendarId(): string {
    return this.calendarIds[0];
  }

  // Get events for a specific date range from ALL calendars
  async getEvents(startDate: Date, endDate: Date): Promise<calendar_v3.Schema$Event[]> {
    try {
      console.log(`📅 Fetching calendar events from ${startDate.toISOString()} to ${endDate.toISOString()}`);
      console.log(`🆔 Checking ${this.calendarIds.length} calendars:`);
      this.calendarIds.forEach((id, index) => console.log(`   ${index + 1}. ${id}`));
      
      // Fetch events from all calendars in parallel
      const allEventsPromises = this.calendarIds.map(async (calendarId) => {
        try {
          const response = await this.calendar.events.list({
            calendarId: calendarId,
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
          });
          
          const events = response.data.items || [];
          console.log(`   ✅ Calendar ${calendarId.substring(0, 20)}...: ${events.length} events`);
          return events;
        } catch (error) {
          console.error(`   ❌ Error fetching from calendar ${calendarId}:`, error);
          return []; // Return empty array on error, don't fail the whole request
        }
      });
      
      const allEventsArrays = await Promise.all(allEventsPromises);
      const allEvents = allEventsArrays.flat();
      
      console.log(`✅ Total events from all calendars: ${allEvents.length}`);
      
      // Sort by start time
      allEvents.sort((a, b) => {
        const aTime = new Date(a.start?.dateTime || a.start?.date || 0).getTime();
        const bTime = new Date(b.start?.dateTime || b.start?.date || 0).getTime();
        return aTime - bTime;
      });
      
      // Log first few events for debugging
      if (allEvents.length > 0) {
        console.log('📋 Sample events (from all calendars):');
        allEvents.slice(0, 5).forEach((event, index) => {
          console.log(`  ${index + 1}. ${event.summary} (${event.start?.dateTime || event.start?.date})`);
        });
      } else {
        console.log('📋 No events found in this date range');
      }

      return allEvents;
    } catch (error) {
      console.error('❌ Error fetching calendar events:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }

  // Create a new calendar event (for appointments or blocking time)
  async createEvent(event: {
    summary: string;
    description?: string;
    start: Date;
    end: Date;
    attendees?: { email: string; displayName?: string }[];
    isBlocked?: boolean;
  }): Promise<calendar_v3.Schema$Event> {
    try {
      // Debug logging for timezone issues
      console.log(`📅 Creating Google Calendar event: ${event.summary}`);
      console.log(`🕐 Start time: ${event.start.toISOString()} (${event.start.toString()})`);
      console.log(`🕐 End time: ${event.end.toISOString()} (${event.end.toString()})`);
      
      const eventData: calendar_v3.Schema$Event = {
        summary: event.summary,
        description: event.description,
        start: {
          dateTime: event.start.toISOString(),
          timeZone: 'Europe/Amsterdam',
        },
        end: {
          dateTime: event.end.toISOString(),
          timeZone: 'Europe/Amsterdam',
        },
        attendees: event.attendees?.map(attendee => ({
          email: attendee.email,
          displayName: attendee.displayName,
        })),
        // Mark blocked time with specific color/status
        colorId: event.isBlocked ? '8' : '1', // Red for blocked, blue for appointments
        status: 'confirmed',
      };

      const response = await this.calendar.events.insert({
        calendarId: this.primaryCalendarId,
        requestBody: eventData,
        sendUpdates: 'none', // Don't send email invitations to attendees
      });

      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }

  // Update an existing calendar event
  async updateEvent(
    eventId: string,
    updates: Partial<calendar_v3.Schema$Event>
  ): Promise<calendar_v3.Schema$Event> {
    try {
      const response = await this.calendar.events.patch({
        calendarId: this.primaryCalendarId,
        eventId,
        requestBody: updates,
        sendUpdates: 'none', // Don't send email notifications
      });

      return response.data;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  }

  // Delete a calendar event
  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: this.primaryCalendarId,
        eventId,
      });
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  }

  // Create a blocked time slot
  async createBlockedTime(
    startDate: Date,
    endDate: Date,
    reason: string = 'Blocked Time'
  ): Promise<calendar_v3.Schema$Event> {
    return this.createEvent({
      summary: `🚫 ${reason}`,
      description: `Time blocked: ${reason}`,
      start: startDate,
      end: endDate,
      isBlocked: true,
    });
  }

  // Create an appointment
  async createAppointment(appointment: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    treatmentName: string;
    startDate: Date;
    endDate: Date;
    message?: string;
  }): Promise<calendar_v3.Schema$Event> {
    return this.createEvent({
      summary: `${appointment.treatmentName} - ${appointment.clientName}`,
      description: `Klant - ${appointment.clientName}
Behandeling - ${appointment.treatmentName}
E-mail - ${appointment.clientEmail}
Telefoonnummer - ${appointment.clientPhone || 'Niet opgegeven'}${appointment.message ? `\n\nNotities:\n${appointment.message}` : ''}`,
      start: appointment.startDate,
      end: appointment.endDate,
      attendees: [
        {
          email: appointment.clientEmail,
          displayName: appointment.clientName,
        },
      ],
    });
  }
}

export const googleCalendar = new GoogleCalendarService();
