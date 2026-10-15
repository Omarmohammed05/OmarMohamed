/**
 * Applies the database schema to Neon Postgres.
 * Uses DATABASE_URL_UNPOOLED (the direct connection) — DDL must not go
 * through the PgBouncer pooled endpoint.
 * Run: npm run db:migrate
 */
import { Pool } from 'pg';

const MIGRATION_SQL = `
  CREATE TABLE IF NOT EXISTS site_content (
    key        text PRIMARY KEY,
    data       jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS projects (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            text NOT NULL UNIQUE,
    title           text NOT NULL,
    tag             text NOT NULL DEFAULT '',
    tagline         text NOT NULL DEFAULT '',
    description     text NOT NULL DEFAULT '',
    role            text NOT NULL DEFAULT '',
    year            integer,
    tech            jsonb NOT NULL DEFAULT '[]'::jsonb,
    cover_image_url text,
    gallery         jsonb NOT NULL DEFAULT '[]'::jsonb,
    live_url        text,
    repo_url        text,
    featured        boolean NOT NULL DEFAULT false,
    sort_order      integer NOT NULL DEFAULT 0,
    published       boolean NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS messages (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text NOT NULL,
    email      text NOT NULL,
    message    text NOT NULL,
    read       boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
  );

  CREATE INDEX IF NOT EXISTS projects_published_idx ON projects (published, sort_order);

  -- Idempotent column adds for databases created before this revision.
  ALTER TABLE projects ADD COLUMN IF NOT EXISTS tag text NOT NULL DEFAULT '';
`;

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;
  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED is required (run "neon deploy" to write .env.local).');
  }
  const pool = new Pool({ connectionString, max: 1 });
  try {
    await pool.query(MIGRATION_SQL);
    console.log('db:migrate — schema applied (site_content, projects, messages).');
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
