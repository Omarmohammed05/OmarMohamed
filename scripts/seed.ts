/**
 * Seeds site content into Neon Postgres from lib/sample-data.ts.
 * Idempotent: re-running refreshes the seeded keys.
 * Run: npm run db:seed
 */
import { Pool } from 'pg';
import {
  APPROACH_STEPS,
  CONTACT_EMAIL,
  SAMPLE_PROJECTS,
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
    for (const project of SAMPLE_PROJECTS) {
      await pool.query(
        `INSERT INTO projects (slug, title, tag, tagline, description, role, year, tech,
                               cover_image_url, gallery, live_url, repo_url, featured,
                               sort_order, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10::jsonb, $11, $12, $13, $14, $15)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title, tag = EXCLUDED.tag, tagline = EXCLUDED.tagline,
           description = EXCLUDED.description, role = EXCLUDED.role, year = EXCLUDED.year,
           tech = EXCLUDED.tech, cover_image_url = EXCLUDED.cover_image_url,
           gallery = EXCLUDED.gallery, live_url = EXCLUDED.live_url, repo_url = EXCLUDED.repo_url,
           featured = EXCLUDED.featured, sort_order = EXCLUDED.sort_order,
           published = EXCLUDED.published, updated_at = now()`,
        [
          project.slug,
          project.title,
          project.tag,
          project.tagline,
          project.description,
          project.role,
          project.year,
          JSON.stringify(project.tech),
          null,
          '[]',
          project.liveUrl,
          project.repoUrl,
          project.featured,
          project.sortOrder,
          project.published,
        ],
      );
    }
    console.log(
      `db:seed — wrote ${CONTENT.length} content keys + ${SAMPLE_PROJECTS.length} projects.`,
    );
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
