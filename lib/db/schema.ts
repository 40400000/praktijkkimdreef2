import { pgTable, serial, varchar, integer, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';

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

// Types
export type Treatment = typeof treatments.$inferSelect;
export type NewTreatment = typeof treatments.$inferInsert;
