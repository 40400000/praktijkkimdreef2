import { pgTable, serial, varchar, integer, decimal, boolean, timestamp, date, time, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Treatments table
export const treatments = pgTable('treatments', {
  id: serial('id').primaryKey(),
  value: varchar('value', { length: 100 }).notNull().unique(),
  label: varchar('label', { length: 200 }).notNull(),
  duration: integer('duration').notNull(), // in minutes
  price: decimal('price', { precision: 10, scale: 2 }),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Working hours / availability rules
export const availabilityRules = pgTable('availability_rules', {
  id: serial('id').primaryKey(),
  dayOfWeek: integer('day_of_week').notNull(), // 0=Sunday, 1=Monday, etc.
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Blocked time slots (manual blocking via Google Calendar)
export const blockedSlots = pgTable('blocked_slots', {
  id: serial('id').primaryKey(),
  date: date('date').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  reason: varchar('reason', { length: 255 }),
  googleCalendarEventId: varchar('google_calendar_event_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Appointments
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  treatmentId: integer('treatment_id').references(() => treatments.id),
  appointmentDate: date('appointment_date').notNull(),
  appointmentTime: time('appointment_time').notNull(),
  duration: integer('duration').notNull(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 50 }).notNull(),
  message: text('message'),
  status: varchar('status', { length: 50 }).default('pending'), // pending, confirmed, cancelled
  googleCalendarEventId: varchar('google_calendar_event_id', { length: 255 }),
  transferredToCms: boolean('transferred_to_cms').default(false), // Track if manually transferred to CMS
  transferredAt: timestamp('transferred_at'), // When it was transferred
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Optional: Recurring blocked periods (vacations, etc.)
export const recurringBlocks = pgTable('recurring_blocks', {
  id: serial('id').primaryKey(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  reason: varchar('reason', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const treatmentsRelations = relations(treatments, ({ many }) => ({
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  treatment: one(treatments, {
    fields: [appointments.treatmentId],
    references: [treatments.id],
  }),
}));

// Types
export type Treatment = typeof treatments.$inferSelect;
export type NewTreatment = typeof treatments.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type AvailabilityRule = typeof availabilityRules.$inferSelect;
export type BlockedSlot = typeof blockedSlots.$inferSelect;
export type RecurringBlock = typeof recurringBlocks.$inferSelect;
