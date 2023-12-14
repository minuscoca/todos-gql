import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'db/migrations' });
await sql.end();
