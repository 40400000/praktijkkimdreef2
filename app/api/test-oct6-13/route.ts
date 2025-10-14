import { NextResponse } from 'next/server';
import { getAvailableTimeSlots } from '@/lib/actions/availability';

export async function GET() {
  try {
    console.log('🔍 Testing October 6, 2025 at 13:00 for 30-min appointment...');
    
    const slots = await getAvailableTimeSlots('2025-10-06', 'orthomoleculair-vervolg');
    
    const slot1300 = slots.find(s => s.time === '13:00');
    const slot1245 = slots.find(s => s.time === '12:45');
    const slot1315 = slots.find(s => s.time === '13:15');
    const slot1330 = slots.find(s => s.time === '13:30');
    
    const around13 = slots.filter(s => {
      const [hour] = s.time.split(':').map(Number);
      return hour === 12 || hour === 13 || hour === 14;
    });
    
    return NextResponse.json({
      test: 'October 6, 2025 - 30 minute appointment availability',
      issue: 'Should NOT be able to book at 13:00 (ends 13:30, next appt at 13:30)',
      expected: 'Last available should be 12:45 (ends 13:15, leaves 15 min before 13:30)',
      slots_around_13: around13,
      slot_12_45: slot1245,
      slot_13_00: slot1300,
      slot_13_15: slot1315,
      slot_13_30: slot1330,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}






