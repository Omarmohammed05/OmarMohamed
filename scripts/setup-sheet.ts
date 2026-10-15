/**
 * Creates all required tabs + header rows in the Google Sheet and seeds
 * sample data. Safe to re-run: existing tabs are kept, header rows are
 * rewritten, and sample data is only written into EMPTY tabs.
 *
 * Usage:  npm run setup:sheet
 * Requires: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
 * (see .env.example — share the spreadsheet with the service account email,
 * Editor access, first).
 */
import { google } from 'googleapis';

/** Tab name -> header row (column names). */
const TABS: Record<string, string[]> = {
  settings: ['key', 'value'],
  about: [
    'bio',
    'photo_url',
    'mascot_url',
    'years_experience',
    'location',
    'cv_url',
    'highlights',
  ],
  stack: ['id', 'name', 'category', 'icon_url', 'level', 'order', 'visible'],
  projects: [
    'id',
    'slug',
    'title',
    'tagline',
    'category',
    'cover_url',
    'gallery',
    'description_short',
    'problem',
    'solution',
    'result',
    'role',
    'client',
    'year',
    'tech_stack',
    'live_url',
    'repo_url',
    'featured',
    'status',
    'order',
    'created_at',
    'updated_at',
    'seo_title',
    'seo_description',
  ],
  links: ['id', 'label', 'url', 'icon', 'type', 'order', 'visible'],
  services: ['id', 'title', 'description', 'order', 'visible'],
  messages: ['id', 'name', 'email', 'message', 'created_at', 'read'],
};

/** Tab name -> sample rows (only written when the tab has no data rows). */
const SAMPLE: Record<string, string[][]> = {
  settings: [
    ['site_title', 'OMAR — Web Developer & Software Engineer'],
    ['site_tagline', 'Crafting loud, fast & bulletproof digital systems.'],
    ['hero_title', 'PORTFOLIO'],
    ['hero_sticker_text', 'Web Developer & Software Engineer'],
    ['hero_mascot_url', ''],
    ['cta_text', "LET'S BUILD TOGETHER"],
    ['seo_title', 'OMAR — Web Developer & Software Engineer'],
    [
      'seo_description',
      'Portfolio of Omar, a web developer & software engineer crafting loud, fast & bulletproof digital systems.',
    ],
    ['og_image_url', ''],
    ['contact_email', 'hello@omar.dev'],
    ['whatsapp_number', ''],
    ['availability_status', 'AVAILABLE FOR HIRE'],
    ['footer_text', '© 2026 OMAR. ALL RIGHTS RESERVED. HAND-CODED WITH TACTILE PRECISION.'],
  ],
  about: [
    [
      'With 5+ years building software from the ground up, I bridge the raw tension between daring visual aesthetic and uncompromising technical engineering. Every line of code is measured for performance, accessibility, and conversion.',
      '',
      '',
      '5',
      'Cairo, Egypt',
      '',
      JSON.stringify([
        { title: '01 // FRONTEND OBSESSION', body: 'Pixel-precision, fluid 60fps micro-animations, semantic clean HTML, zero runtime waste.' },
        { title: '02 // SCALABLE BACKEND', body: 'PostgreSQL, Redis caching, robust REST/GraphQL APIs, distributed worker queues.' },
      ]),
    ],
  ],
  stack: [
    ['stk_nextjs', 'Next.js', 'Frontend', '', 'Expert', '1', 'TRUE'],
    ['stk_react', 'React', 'Frontend', '', 'Expert', '2', 'TRUE'],
    ['stk_typescript', 'TypeScript', 'Frontend', '', 'Expert', '3', 'TRUE'],
    ['stk_tailwind', 'Tailwind CSS', 'Frontend', '', 'Expert', '4', 'TRUE'],
    ['stk_node', 'Node.js', 'Backend', '', 'Advanced', '5', 'TRUE'],
    ['stk_postgres', 'PostgreSQL', 'Database', '', 'Advanced', '6', 'TRUE'],
    ['stk_redis', 'Redis', 'Database', '', 'Advanced', '7', 'TRUE'],
    ['stk_docker', 'Docker', 'Tools', '', 'Advanced', '8', 'TRUE'],
    ['stk_vercel', 'Vercel', 'Tools', '', 'Advanced', '9', 'TRUE'],
  ],
  projects: [
    [
      'prj_krooked',
      'krooked-streetwear',
      'Krooked Streetwear',
      'Headless commerce for a streetwear brand',
      'Website',
      '',
      '[]',
      'Custom headless Shopify storefront with sub-second page loads.',
      'The brand drops limited collections that sell out in minutes; the old theme-based store crashed under drop traffic and lost conversions.',
      'Headless Next.js storefront on Shopify Hydrogen APIs, edge-cached product pages, and a 1-click Stripe checkout.',
      '+142% conversion on drop days; page loads under 1s globally.',
      'Lead Developer',
      'Krooked Apparel',
      '2025',
      'stk_nextjs,stk_react,stk_typescript,stk_tailwind',
      'https://krooked-apparel.com',
      '',
      'TRUE',
      'published',
      '1',
      new Date().toISOString(),
      new Date().toISOString(),
      'Krooked Streetwear — Headless E-Commerce',
      'Headless Shopify storefront with sub-second loads and 1-click checkout.',
    ],
    [
      'prj_monolith',
      'monolith-architecture',
      'Monolith Architecture',
      'Interactive 3D portfolio for an architecture studio',
      'Web App',
      '',
      '[]',
      'Interactive 3D model inspector with inertial camera controls and daylight simulation.',
      'The studio needed to present unbuilt pavilions with the weight their models deserve, without shipping gigabytes of assets.',
      'Three.js scene with progressive asset streaming, custom inertial camera, and dynamic daylight simulation — zero bundle bloat.',
      '100 Lighthouse performance with full 3D walkthroughs.',
      'Creative Developer',
      'Monolith Arch',
      '2026',
      'stk_nextjs,stk_typescript,stk_tailwind',
      'https://monolith-arch.ch',
      '',
      'TRUE',
      'published',
      '2',
      new Date().toISOString(),
      new Date().toISOString(),
      'Monolith Architecture — Interactive 3D Portfolio',
      'Interactive 3D model inspector with daylight simulation and zero bundle bloat.',
    ],
    [
      'prj_kissa',
      'kissa-vinyl-lounge',
      'Kissa Vinyl Lounge',
      'Live-audio site for a hi-fi listening bar',
      'Web App',
      '',
      '[]',
      'Low-latency WebAudio live-stream player with a real-time seat reservation scheduler.',
      'A vinyl bar needed online reservations synced with the room and live sessions streamable from the site itself.',
      'WebAudio low-latency player, WebSocket-driven reservation scheduler, and SMS confirmations.',
      '99.9% uptime; table reservations fully online.',
      'Full-Stack Developer',
      'Kissa Hi-Fi Club',
      '2026',
      'stk_nextjs,stk_node',
      'https://kissa-hi-fi.club',
      '',
      'TRUE',
      'published',
      '3',
      new Date().toISOString(),
      new Date().toISOString(),
      'Kissa Vinyl Lounge — Live Audio & Reservations',
      'Low-latency WebAudio live-stream player with real-time seat reservations.',
    ],
  ],
  links: [
    ['lnk_github', 'GitHub', 'https://github.com', 'github', 'social', '1', 'TRUE'],
    ['lnk_linkedin', 'LinkedIn', 'https://linkedin.com', 'linkedin', 'social', '2', 'TRUE'],
    ['lnk_x', 'Twitter / X', 'https://twitter.com', 'x', 'social', '3', 'TRUE'],
    ['lnk_whatsapp', 'WhatsApp', 'https://wa.me/', 'whatsapp', 'contact', '4', 'TRUE'],
    ['lnk_email', 'Email', 'mailto:hello@omar.dev', 'email', 'contact', '5', 'TRUE'],
  ],
  services: [
    ['srv_web_arch', 'Web Architecture', 'High-performance, scalable web application architecture.', '1', 'TRUE'],
    ['srv_next_react', 'Next.js & React', 'Modern React interfaces with Next.js App Router.', '2', 'TRUE'],
    ['srv_saas', 'SaaS Dashboards', 'High-density telemetry and operational dashboards.', '3', 'TRUE'],
    ['srv_api_cloud', 'API & Cloud Infrastructure', 'Robust REST/GraphQL APIs and cloud pipelines.', '4', 'TRUE'],
    ['srv_ui', 'High-Conversion UI', 'Tactile, conversion-focused interface engineering.', '5', 'TRUE'],
  ],
  messages: [
    ['msg_sample', 'Sample Sender', 'sample@example.com', 'Hi Omar — sample message created by the setup script.', new Date().toISOString(), 'FALSE'],
  ],
};

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}. Copy .env.example to .env and fill it in.`);
    process.exit(1);
  }
  return value;
}

async function main(): Promise<void> {
  const email = required('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKey = required('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');
  const sheetId = required('GOOGLE_SHEET_ID');

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  // Create missing tabs.
  const { data } = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const existing = new Set(
    (data.sheets ?? []).map((sheet) => sheet.properties?.title ?? ''),
  );
  const missing = Object.keys(TABS).filter((tab) => !existing.has(tab));
  if (missing.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: missing.map((title) => ({ addSheet: { properties: { title } } })),
      },
    });
    console.log(`Created tabs: ${missing.join(', ')}`);
  } else {
    console.log('All tabs already exist.');
  }

  // Write header rows (idempotent).
  for (const [tab, headers] of Object.entries(TABS)) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${tab}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }
  console.log('Header rows written.');

  // Seed sample data — only into tabs with no data rows yet.
  for (const [tab, rows] of Object.entries(SAMPLE)) {
    const existingTab = existing.has(tab) && !missing.includes(tab);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${tab}!A2:Z2`,
    });
    const hasData = Boolean(response.data.values?.[0]?.[0]);
    if (!existingTab || !hasData) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `${tab}!A2`,
        valueInputOption: 'RAW',
        requestBody: { values: rows },
      });
      console.log(`Seeded ${rows.length} sample row(s) into "${tab}".`);
    } else {
      console.log(`Skipped seeding "${tab}" (already has data).`);
    }
  }

  console.log('Sheet setup complete. Tabs:', Object.keys(TABS).join(', '));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
