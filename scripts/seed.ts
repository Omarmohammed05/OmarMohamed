/**
 * Seeds site content into Neon Postgres from lib/sample-data.ts.
 * Idempotent: re-running refreshes the seeded keys.
 * Run: npm run db:seed
 */
import { Pool } from 'pg';
import {
  APPROACH_STEPS,
  CONTACT_EMAIL,
  SERVICES_TICKER,
  SKILLS,
  SOCIAL_LINKS,
  STACK_ITEMS,
} from '../lib/sample-data';

const CONTENT: Array<[string, unknown]> = [
  ['contact_email', CONTACT_EMAIL],
  ['skills', SKILLS],
  ['stack_items', STACK_ITEMS],
  ['approach_steps', APPROACH_STEPS],
  ['services_ticker', SERVICES_TICKER],
  ['social_links', SOCIAL_LINKS],
];

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;
  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED is required (run "neon deploy" to write .env.local).');
  }
  const pool = new Pool({ connectionString, max: 1 });
  try {
    for (const [key, data] of CONTENT) {
      await pool.query(
        `INSERT INTO site_content (key, data) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
        [key, JSON.stringify(data)],
      );
    }
    console.log(`db:seed — wrote ${CONTENT.length} content keys.`);
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
