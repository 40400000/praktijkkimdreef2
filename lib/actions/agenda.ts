'use server';

import { db, appointments, treatments } from '@/lib/db';
import { eq, desc, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface AppointmentWithTreatment {
  id: number;
  treatmentId: number | null;
  appointmentDate: string;
  appointmentTime: string;
  duration: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string | null;
  status: string | null;
  transferredToCms: boolean | null;
  transferredAt: Date | null;
  createdAt: Date | null;
  treatment: {
    label: string;
    value: string;
  } | null;
}

export async function getAppointments(): Promise<AppointmentWithTreatment[]> {
  try {
    const result = await db
      .select({
        id: appointments.id,
        treatmentId: appointments.treatmentId,
        appointmentDate: appointments.appointmentDate,
        appointmentTime: appointments.appointmentTime,
        duration: appointments.duration,
        clientName: appointments.clientName,
        clientEmail: appointments.clientEmail,
        clientPhone: appointments.clientPhone,
        message: appointments.message,
        status: appointments.status,
        transferredToCms: appointments.transferredToCms,
        transferredAt: appointments.transferredAt,
        createdAt: appointments.createdAt,
        treatment: {
          label: treatments.label,
          value: treatments.value,
        },
      })
      .from(appointments)
      .leftJoin(treatments, eq(appointments.treatmentId, treatments.id))
      .orderBy(
        // First sort by transferred status (not transferred first)
        asc(appointments.transferredToCms),
        // Then by date (earliest first for pending, latest first for transferred)
        asc(appointments.appointmentDate),
        asc(appointments.appointmentTime)
      );

    return result;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw new Error('Failed to fetch appointments');
  }
}

export async function markAppointmentAsTransferred(appointmentId: number): Promise<void> {
  try {
    await db
      .update(appointments)
      .set({
        transferredToCms: true,
        transferredAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, appointmentId));

    revalidatePath('/agenda');
  } catch (error) {
    console.error('Failed to mark appointment as transferred:', error);
    throw new Error('Failed to mark appointment as transferred');
  }
}

export async function unmarkAppointmentAsTransferred(appointmentId: number): Promise<void> {
  try {
    await db
      .update(appointments)
      .set({
        transferredToCms: false,
        transferredAt: null,
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, appointmentId));

    revalidatePath('/agenda');
  } catch (error) {
    console.error('Failed to unmark appointment:', error);
    throw new Error('Failed to unmark appointment');
  }
}






