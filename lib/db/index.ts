import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.NEON) {
  throw new Error('NEON environment variable is not set');
}

const sql = neon(process.env.NEON);
export const db = drizzle(sql, { schema });

export type DB = typeof db;
export * from './schema';

