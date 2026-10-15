/**
 * Seed content for the Neon Postgres database (loaded by scripts/seed.ts
 * into the site_content table). The site reads live data via lib/db,
 * never from this file directly.
 */
import type { ApproachStep, SocialLink, StackItem } from './db/schemas';

export type { ApproachStep, SocialLink, StackItem };

export const SKILLS = [
  'FULL-STACK WEB DEV',
  'API & MICROSERVICES',
  'SAAS CLOUD PLATFORMS',
  'HIGH-CONVERSION UX',
  'PERFORMANCE AUDITING',
  'DATABASE ARCHITECTURE',
] as const;

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

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', abbr: 'GH', href: 'https://github.com' },
  { label: 'LinkedIn', abbr: 'in', href: 'https://linkedin.com' },
  { label: 'Twitter / X', abbr: '𝕏', href: 'https://twitter.com' },
  { label: 'Email', abbr: '@', href: 'mailto:hello@omar.dev' },
];

export const CONTACT_EMAIL = 'hello@omar.dev';

export type SeedProject = {
  slug: string;
  title: string;
  tag: string;
  tagline: string;
  description: string;
  role: string;
  year: number;
  tech: string[];
  liveUrl: string;
  repoUrl: string | null;
  featured: boolean;
  sortOrder: number;
  published: boolean;
};

export const SAMPLE_PROJECTS: SeedProject[] = [
  {
    slug: 'krooked-streetwear',
    title: 'Krooked Streetwear',
    tag: 'E-COMMERCE',
    tagline: 'Headless streetwear storefront built for sub-second drops.',
    description:
      'Custom headless Shopify storefront with sub-second page loads, algorithmic size advisor, and Stripe 1-click checkout.',
    role: 'DESIGN + FULL-STACK BUILD',
    year: 2025,
    tech: ['NEXT.JS', 'GRAPHQL', 'SHOPIFY', 'STRIPE'],
    liveUrl: 'https://krooked-apparel.com',
    repoUrl: null,
    featured: true,
    sortOrder: 1,
    published: true,
  },
  {
    slug: 'monolith-architecture',
    title: 'Monolith Architecture',
    tag: 'PORTFOLIO',
    tagline: 'Interactive 3D model inspector for an architecture studio.',
    description:
      'Interactive 3D model inspector with smooth inertial camera controls, dynamic daylight simulation, and zero bundle bloat.',
    role: 'DESIGN + FRONT-END BUILD',
    year: 2026,
    tech: ['THREE.JS', 'TAILWIND'],
    liveUrl: 'https://monolith-arch.ch',
    repoUrl: null,
    featured: true,
    sortOrder: 2,
    published: true,
  },
  {
    slug: 'kissa-vinyl-lounge',
    title: 'Kissa Vinyl Lounge',
    tag: 'HOSPITALITY / AUDIO',
    tagline: 'Low-latency audio streaming with live table reservations.',
    description:
      'Low-latency WebAudio live-stream player with real-time seat reservation scheduler and SMS table confirmations.',
    role: 'FULL-STACK BUILD',
    year: 2026,
    tech: ['NEXT.JS', 'WEBAUDIO'],
    liveUrl: 'https://kissa-hi-fi.club',
    repoUrl: null,
    featured: false,
    sortOrder: 3,
    published: true,
  },
];
