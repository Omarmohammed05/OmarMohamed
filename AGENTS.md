# AGENTS.md

## Project
Personal portfolio + custom CMS for Omar. Next.js 15 (App Router) + TypeScript strict + Tailwind v3. Fonts are loaded with `next/font` in `lib/fonts.ts` (Anton / Montserrat / Permanent Marker). Neo-brutalist torn-paper design tokens live in `app/globals.css` + `tailwind.config.ts` (brand.red/blue/black/paper).

## Run (Base44 sandbox)
- `docker compose -f docker-compose.base44.yml up -d` — web on http://localhost:3000.
- The web service bind-mounts the repo, runs `npm install` on start (deps live in the `web_node_modules` volume, lockfile lands in the repo), and runs `next dev` with watcher polling, so source edits hot-reload.
- Verify: `docker compose -f docker-compose.base44.yml exec -T web sh -ec "npx tsc --noEmit && npm run lint"`
- Database: `npm run db:migrate && npm run db:seed` applies the schema and seeds site content to Neon.

## Environment
- Real secrets are delivered by the platform to `/run/base44/app.env` (compose `env_file`, listed after `.env.base44-defaults`, so user values always win). `.env.base44-defaults` holds non-secret placeholders only — keep it that way.
- Neon Postgres connection strings live in `.env.local` (gitignored, written by `neon deploy`): `DATABASE_URL` (pooled) for app queries, `DATABASE_URL_UNPOOLED` (direct) for migrations/seeds.
- Sandbox-only overrides are gated on `BASE44_PREVIEW_MODE === '1'` (see `next.config.mjs` `allowedDevOrigins`). With the flag unset the config is untouched.

## Architecture rules
- Neon Postgres is the database: ALL access goes through `lib/db` (pg pool on `DATABASE_URL`, zod-validated queries). Never import `pg` outside `lib/db` and `scripts/`.
- Schema lives in `scripts/migrate.ts`, content seed in `scripts/seed.ts` — run `npm run db:migrate && npm run db:seed` (both use the direct `DATABASE_URL_UNPOOLED`; DDL must not go through PgBouncer).
- Public pages must be statically generated with ISR + per-entity cache tags; admin writes call `revalidateTag`.
- Design components live in `components/design/` (TornEdge, Tape, StickerLabel, TwoToneHeading, Mascot, MockupFrame, SectionHeader, Reveal) — reuse them instead of re-deriving collage markup.
- Strict TypeScript, no `any`.
