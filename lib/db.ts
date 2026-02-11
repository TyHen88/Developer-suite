import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema';

// This utility ensures the database connection is managed as a singleton in the app.
// It uses the Neon serverless driver for high-performance edge-ready connectivity.

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    // We don't throw here to allow for build-time checks or development without DB
    console.warn('DATABASE_URL is not defined in environment variables.');
}

const sql = neon(connectionString || '');
export const db = drizzle(sql, { schema });
