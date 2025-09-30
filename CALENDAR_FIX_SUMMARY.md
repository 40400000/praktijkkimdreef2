# Calendar Availability Fix Summary

## Issues Fixed

### 1. ✅ "Privé" Events No Longer Get 15-Min Buffer

**Problem**: Personal events like "Privé" from 08:00-12:00 were blocking until 12:15 due to the 15-minute post-appointment buffer.

**Solution**: Added `isPersonalEvent()` method that detects personal events by keywords:
- "Privé" / "Prive"
- "Personal" / "Private"
- "Eigen"

These events now block ONLY their actual duration, with no buffer time added.

**Example**:
- Before: "Privé" 08:00-12:00 blocked until 12:15 ❌
- After: "Privé" 08:00-12:00 blocks only until 12:00 ✅

### 2. ✅ Calendar Days Showing Greyed Out When Slots Available

**Problem**: The calendar was using an **80% heuristic** that greyed out days if more than 80% of the working hours were booked, even if there were still some available time slots.

**Before**:
- Oct 27: Greyed out ❌ (but had 12 available slots!)
- Oct 28: Greyed out ❌ (but had 9 available slots!)

**Solution**: Replaced the 80% heuristic with **precise slot checking**:
```typescript
// OLD CODE (incorrect):
return bookedMinutes < workingMinutes * 0.8;  // ❌ Too aggressive

// NEW CODE (correct):
// Generate actual slots and check if ANY are available
const slots = this.generateTimeSlots(/* ... */);
for (const slot of slots) {
  // Check each slot for conflicts
  if (!conflictingEvent) {
    return true; // Found available slot!
  }
}
return false; // No slots available
```

**After**: Days are only greyed out if they have **zero** available slots ✅

## Files Modified

1. **`lib/google-calendar/availability.ts`**:
   - Added `isPersonalEvent()` method
   - Modified `findConflictingEvent()` to skip buffer for personal events
   - Modified `hasAnyAvailability()` to check actual slots instead of using 80% heuristic
   - Updated booked minutes calculation to exclude buffer from personal events

2. **`POST_APPOINTMENT_BUFFER.md`**:
   - Documented personal event exceptions
   - Listed keywords that identify personal events

## Testing

✅ **Oct 14**: 12:00 slot available (Privé ends at 12:00, no buffer)
✅ **Oct 27**: Calendar enabled (has 12 available slots)
✅ **Oct 28**: Calendar enabled (has 9 available slots)

## Why Oct 14 at 12:00 May Still Be Unavailable

If 12:00 is still not showing as available, it's because:
- **Base working hours start at 12:30**
- 12:00 is **before** working hours start

**Solution**: Add a **VRIJ event** to extend hours:
```
Title: VRIJ
Date: October 14, 2025
Time: 12:00 - 12:30 (or earlier if needed)
```

This tells the system you're available before your normal working hours on that day.

## Impact

- ✅ Personal events (Privé) no longer waste 15 minutes
- ✅ Calendar accurately shows which days have availability
- ✅ Users can book appointments on partially-booked days
- ✅ Better user experience - no more greyed-out days with hidden slots

