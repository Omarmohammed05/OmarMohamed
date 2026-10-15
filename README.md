# OmarMohamed — Portfolio & CMS

Personal portfolio website with a custom CMS/admin panel for Omar — Web Developer & Software
Engineer. Neo-brutalist torn-paper collage design.

**Stack:** Next.js (App Router) + TypeScript + Tailwind · Google Sheets as the database
(server-side only, behind a typed data-access layer) · imgbb for image uploads · zod
validation · Framer Motion · self-built admin auth (bcrypt + JWT cookie).

## Development

```bash
docker compose -f docker-compose.base44.yml up -d   # app on http://localhost:3000
docker compose -f docker-compose.base44.yml exec -T web sh -ec "npx tsc --noEmit && npm run lint"
```

The web service bind-mounts the repo, installs dependencies on start, and runs `next dev`
with file-watcher polling — source edits hot-reload.

Or run natively: `npm install && npm run dev`.

## Environment variables

Copy `.env.example` to `.env` and fill in Google Sheets credentials, the imgbb key, and the
admin auth values. Then set up the database tabs + sample data:

```bash
npm run setup:sheet
```

Full deployment docs (Vercel, service account setup, custom domain) arrive in Phase 7.
