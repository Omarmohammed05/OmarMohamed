/**
 * Design-reference sample content for Phase 1.
 * Phase 3 replaces these with live data from the Google Sheet
 * (settings / about / stack / services tabs) via lib/db.
 */

export const SKILLS = [
  'FULL-STACK WEB DEV',
  'API & MICROSERVICES',
  'SAAS CLOUD PLATFORMS',
  'HIGH-CONVERSION UX',
  'PERFORMANCE AUDITING',
  'DATABASE ARCHITECTURE',
] as const;

export type StackItem = { abbr: string; name: string };

export const STACK_ITEMS: StackItem[] = [
  { abbr: 'N', name: 'NEXT.JS' },
  { abbr: 'Re', name: 'REACT' },
  { abbr: 'TS', name: 'TYPESCRIPT' },
  { abbr: 'Tw', name: 'TAILWIND' },
  { abbr: 'No', name: 'NODE.JS' },
  { abbr: 'Pg', name: 'POSTGRES' },
  { abbr: 'Dk', name: 'DOCKER' },
  { abbr: '▲', name: 'VERCEL' },
  { abbr: 'Rd', name: 'REDIS' },
];

export type ApproachStep = { title: string; body: string };

export const APPROACH_STEPS: ApproachStep[] = [
  {
    title: '01. RESEARCH & SPECIFICATION',
    body: 'Understanding bottlenecks, user journeys, data shape, and technical constraints before writing a single line of markup.',
  },
  {
    title: '02. RAPID TACTILE PROTOTYPE',
    body: 'Validating interaction, wireframing layout ergonomics, and structuring robust state schemas early.',
  },
  {
    title: '03. BULLETPROOF EXECUTION',
    body: 'Clean type-safety, semantic components, automated test suites, and sub-100ms API response loops.',
  },
  {
    title: '04. DEPLOY & SCALE',
    body: 'Automated CI/CD pipelines, instant rollbacks, and edge CDN cache invalidation for maximum reliability.',
  },
];

export const SERVICES_TICKER = [
  'WEB ARCHITECTURE',
  'NEXT.JS & REACT',
  'SAAS DASHBOARDS',
  'API & CLOUD INFRASTRUCTURE',
  'HIGH-CONVERSION UI',
] as const;

export type SocialLink = { label: string; abbr: string; href: string };

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', abbr: 'GH', href: 'https://github.com' },
  { label: 'LinkedIn', abbr: 'in', href: 'https://linkedin.com' },
  { label: 'Twitter / X', abbr: '𝕏', href: 'https://twitter.com' },
  { label: 'Email', abbr: '@', href: 'mailto:hello@omar.dev' },
];

export const CONTACT_EMAIL = 'hello@omar.dev';
