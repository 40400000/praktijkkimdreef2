# VRIJ System - Extended Availability

## Overview
The VRIJ system allows you to extend your booking availability beyond regular working hours by simply adding events to your Google Calendar with "VRIJ" in the title.

## How It Works

### Base Working Hours
- **Current schedule**: 12:30 - 17:00 (Monday-Friday)
- Weekends are blocked by default

### Adding Extended Hours (Avonddienst)

Simply create a Google Calendar event with the title **"VRIJ"** (or "VRIJ: description") for the extended time period.

## Examples

### Example 1: Evening Shift (Avonddienst)
```
Base hours: 12:30 - 17:00
Add calendar event: "VRIJ" from 17:00 - 20:00
Result: Appointments can be booked from 12:30 - 20:00
```

### Example 2: Morning Exception
```
Base hours: 12:30 - 17:00
Add calendar event: "VRIJ" from 09:00 - 12:30
Result: Appointments can be booked from 09:00 - 17:00
```

### Example 3: Full Day Extension
```
Base hours: 12:30 - 17:00
Add calendar event: "VRIJ" from 09:00 - 20:00
Result: Appointments can be booked from 09:00 - 20:00
```

### Example 4: Weekend Availability
```
Base hours: None (weekends blocked)
Add calendar event: "VRIJ" on Saturday from 10:00 - 14:00
Result: Appointments can be booked on Saturday from 10:00 - 14:00
```

### Example 5: Multiple VRIJ Blocks
```
Base hours: 12:30 - 17:00
Add calendar event: "VRIJ" from 09:00 - 12:30
Add calendar event: "VRIJ" from 17:00 - 19:00
Result: Appointments can be booked from 09:00 - 19:00
```

## Event Title Formats

All these formats work:
- `VRIJ`
- `vrij`
- `Vrij`
- `VRIJ: Avonddienst`
- `VRIJ beschikbaar`

## Important Notes

1. **VRIJ events extend availability** - they don't block time
2. **Other appointments still block time** - if you have a regular appointment during VRIJ hours, that slot will be unavailable
3. **Instant effect** - changes appear immediately in the booking system
4. **Flexible** - you can add VRIJ blocks for any day, any time
5. **No admin panel needed** - manage everything through your Google Calendar

## Use Cases

✅ **Avonddienst** (Evening shift)
✅ **Ochtend beschikbaar** (Morning availability)
✅ **Weekend availability**
✅ **Special consultation hours**
✅ **Holiday catch-up days**
✅ **Flexible scheduling around personal appointments**

## How Clients See It

When a client visits the booking page:
1. Days with availability show as selectable in the calendar
2. When they select a date, they see all available time slots
3. Time slots during VRIJ periods are shown alongside regular slots
4. They can't see that these are "extended" hours - it's seamless

## Tips

- Add VRIJ events in advance when you know you'll have avonddienst
- Use descriptive titles like "VRIJ: Avonddienst" for your own reference
- You can edit or delete VRIJ events anytime
- The system automatically recalculates availability when you make changes






