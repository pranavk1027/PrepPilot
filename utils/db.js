import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {schema} from './schema'
import dotenv from  'dotenv'
dotenv.config({ path: '.env.local' })
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle({ client: sql },{schema});
