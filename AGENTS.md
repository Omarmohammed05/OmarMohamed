# AGENTS.md

## Project
Personal portfolio + custom CMS for Omar. Next.js 15 (App Router) + TypeScript strict + Tailwind v3. Fonts are loaded with `next/font` in `lib/fonts.ts` (Anton / Montserrat / Permanent Marker). Neo-brutalist torn-paper design tokens live in `app/globals.css` + `tailwind.config.ts` (brand.red/blue/black/paper).

## Run (Base44 sandbox)
- `docker compose -f docker-compose.base44.yml up -d` — web on http://localhost:3000.
- The web service bind-mounts the repo, runs `npm install` on start (deps live in the `web_node_modules` volume, lockfile lands in the repo), and runs `next dev` with watcher polling, so source edits hot-reload.
- Verify: `docker compose -f docker-compose.base44.yml exec -T web sh -ec "npx tsc --noEmit && npm run lint"`

## Environment
- Real secrets are delivered by the platform to `/run/base44/app.env` (compose `env_file`, listed after `.env.base44-defaults`, so user values always win). `.env.base44-defaults` holds non-secret placeholders only — keep it that way.
- Sandbox-only overrides are gated on `BASE44_PREVIEW_MODE === '1'` (see `next.config.mjs` `allowedDevOrigins`). With the flag unset the config is untouched.

## Architecture rules
- Google Sheets is the database (Phase 2): ALL access goes through `lib/db` (typed CRUD + zod). Never import `googleapis` outside `lib/db` and `scripts/`.
- Public pages must be statically generated with ISR + per-entity cache tags; admin writes call `revalidateTag`.
- Design components live in `components/design/` (TornEdge, Tape, StickerLabel, TwoToneHeading, Mascot, MockupFrame, SectionHeader, Reveal) — reuse them instead of re-deriving collage markup.
- Strict TypeScript, no `any`.
