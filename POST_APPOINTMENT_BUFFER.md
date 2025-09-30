# Post-Appointment Buffer

## Overview
A **15-minute buffer** is automatically added after EVERY appointment to prevent back-to-back bookings and ensure time for cleanup, notes, or breaks.

## How It Works

When a client tries to book, the system:
1. Checks all appointments from both calendars
2. Adds 15 minutes to the END of each appointment
3. Blocks time slots that fall within this buffer period

### Example

**Scenario: Appointment from 14:00 - 15:00**

```
Appointment:     14:00 ████████████████ 15:00
Buffer:          15:00 ████ 15:15
Available:       15:15 ✓✓✓✓ → (Can book here)
```

**What clients see:**
- ❌ 14:00 - Blocked (appointment)
- ❌ 14:15 - Blocked (appointment)
- ❌ 14:30 - Blocked (appointment) 
- ❌ 14:45 - Blocked (appointment)
- ❌ 15:00 - Blocked (buffer)
- ✅ 15:15 - Available (first slot after buffer)

## Configuration

**Location**: `lib/google-calendar/availability.ts` (Line 18-20)

```typescript
// ⚠️ EASY TO CHANGE: Buffer time after each appointment (in minutes)
// This blocks time slots for X minutes after an appointment ends
const POST_APPOINTMENT_BUFFER_MINUTES = 15;
```

### To Change the Buffer:

1. Open `lib/google-calendar/availability.ts`
2. Find line 20: `const POST_APPOINTMENT_BUFFER_MINUTES = 15;`
3. Change `15` to your desired minutes (e.g., `30` for 30-minute buffer)
4. Save the file
5. Restart the application

**Common values:**
- `0` = No buffer (immediate back-to-back bookings)
- `10` = 10-minute buffer
- `15` = 15-minute buffer (current default)
- `30` = 30-minute buffer
- `60` = 1-hour buffer

## Benefits

✅ **Prevents burnout**: Ensures breaks between appointments
✅ **Note-taking time**: Time to write up notes from previous client
✅ **Cleanup time**: Time to prepare room for next client
✅ **Flexibility**: Easy to adjust buffer duration
✅ **Automatic**: Applied to all appointments, no manual management

## Technical Details

### Where It's Applied

The buffer is added in two places:

1. **Conflict checking** (`findConflictingEvent` method):
   - When checking if a time slot conflicts with an appointment
   - Extends the appointment's end time by buffer minutes

2. **Availability calculation** (`hasAnyAvailability` method):
   - When calculating how much of the day is booked
   - Includes buffer time in the booked minutes total

### Applies To

- ✅ Client appointments (bookings from the system)
- ✅ Regular calendar events
- ❌ NOT applied to VRIJ events (they extend availability, not block it)
- ❌ NOT applied to personal events (see list below)

### Personal Events (No Buffer)

The following event types do NOT get the 15-minute buffer:
- Events with "Privé" in the title
- Events with "Prive" in the title  
- Events with "Personal" in the title
- Events with "Private" in the title
- Events with "Eigen" in the title

**Example:**
- Event: "Privé" from 08:00-12:00
- Buffer: NONE - slot at 12:00 is immediately available ✓

**Why?** Personal events are breaks/private time, not client appointments. You don't need recovery time after personal activities.

## Testing

To verify the buffer is working:

1. Look at your calendar with an appointment ending at 15:00
2. Try to book on the website
3. The first available slot should be 15:15 (not 15:00)
4. Check server logs for buffer confirmation

## Notes

- Buffer applies to ALL events from BOTH calendars
- VRIJ events are excluded (they extend availability, not block it)
- Buffer is added AFTER the appointment ends
- No buffer is added BEFORE appointments (that's handled separately by time slot generation)
