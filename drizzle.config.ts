import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/db/schema',
  out: 'src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
