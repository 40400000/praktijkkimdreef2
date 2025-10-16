# Dual Calendar System

## Overview
The booking system now checks **TWO Google Calendars** simultaneously for availability and conflicts.

## Calendars Being Checked

1. **Primary Calendar**: `8d787655164082542b3a8556cae927ae94af2ff588fb8d50922f02a4fa38d6b5@group.calendar.google.com`
   - Appointments created through the booking system go here
   - VRIJ events from this calendar extend availability

2. **Secondary Calendar**: `70d3477c8b3515eaed62d0ed6e66438004fbd53cef403271d363cb95d2956d18@group.calendar.google.com`
   - Personal calendar
   - All events from this calendar block time slots
   - VRIJ events from this calendar also extend availability

## How It Works

### Event Fetching
- Both calendars are queried in **parallel** (fast!)
- All events are **merged** and **sorted by time**
- If one calendar fails, the other continues working

### Availability Checking
The system treats events from BOTH calendars equally:
- **Regular appointments**: Block time slots (prevent booking)
- **VRIJ events**: Extend available hours (enable booking)
- **"Privé" or other events**: Block time slots (prevent booking)

### Example Scenarios

**Scenario 1: Personal Event Blocks Booking**
```
Calendar 1: Empty
Calendar 2: "Privé" 14:00-16:00
Result: Time slots 14:00-16:00 are NOT available for booking
```

**Scenario 2: VRIJ from Either Calendar**
```
Calendar 1: "VRIJ" 09:00-12:30
Calendar 2: Empty
Result: Morning slots 09:00-12:30 ARE available for booking
```

**Scenario 3: Mixed Events**
```
Calendar 1: "VRIJ" 17:00-20:00 (extends hours)
Calendar 2: "Meeting" 18:00-19:00 (blocks time)
Result: 
- 17:00-18:00 available ✓
- 18:00-19:00 blocked ✗
- 19:00-20:00 available ✓
```

## Benefits

✅ **No double bookings**: Personal appointments automatically block booking slots
✅ **Flexible availability**: VRIJ events from either calendar work
✅ **Single source of truth**: All calendars checked together
✅ **Resilient**: If one calendar fails, the other keeps working
✅ **Fast**: Calendars fetched in parallel

## Implementation Details

**Modified File**: `lib/google-calendar/events.ts`

Key changes:
1. Changed `calendarId` (string) to `calendarIds` (array)
2. Updated `getEvents()` to fetch from all calendars in parallel
3. Merge and sort all events by start time
4. Keep using primary calendar for creating new appointments

## Testing

To verify both calendars are being checked, look at the server console logs:
```
📅 Fetching calendar events from X to Y
🆔 Checking 2 calendars:
   1. 8d787655164082542b3a8556cae927ae94af2ff588fb8d50922f02a4fa38d6b5@group.calendar.google.com
   2. 70d3477c8b3515eaed62d0ed6e66438004fbd53cef403271d363cb95d2956d18@group.calendar.google.com
   ✅ Calendar 8d78765516...: X events
   ✅ Calendar 70d3477c8b...: Y events
✅ Total events from all calendars: Z
```

## Notes

- New appointments are still created in the **primary calendar** only
- Both calendars must be accessible with the service account credentials
- Events are deduplicated if they appear in both calendars (though this shouldn't happen)







