import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { getPool } from './client';
import {
  approachStepsSchema,
  contactEmailSchema,
  messageInputSchema,
  projectSchema,
  servicesTickerSchema,
  skillsSchema,
  socialLinksSchema,
  stackItemsSchema,
  type ApproachStep,
  type MessageInput,
  type Project,
  type SocialLink,
  type StackItem,
} from './schemas';

export type { ApproachStep, MessageInput, Project, SocialLink, StackItem };

export type SiteContent = {
  contactEmail: string;
  skills: string[];
  stackItems: StackItem[];
  approachSteps: ApproachStep[];
  servicesTicker: string[];
  socialLinks: SocialLink[];
};

const CONTENT_KEYS = [
  'contact_email',
  'skills',
  'stack_items',
  'approach_steps',
  'services_ticker',
  'social_links',
] as const;

/**
 * Loads seeded site content from Postgres.
 * `cache()` dedupes across server components within one request;
 * `unstable_cache` keys it with the "site-content" tag so the admin CMS
 * can invalidate instantly via `revalidateTag('site-content')`.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const queryContent = unstable_cache(
    async (): Promise<Record<string, unknown>> => {
      const { rows } = await getPool().query<{ key: string; data: unknown }>(
        'SELECT key, data FROM site_content WHERE key = ANY($1::text[])',
        [CONTENT_KEYS],
      );
      return Object.fromEntries(rows.map((row) => [row.key, row.data]));
    },
    ['site-content'],
    { tags: ['site-content'], revalidate: 60 },
  );

  const byKey = await queryContent();
  const get = (key: (typeof CONTENT_KEYS)[number]): unknown => {
    if (!(key in byKey)) {
      throw new Error(
        `site_content key "${key}" is missing — run "npm run db:migrate && npm run db:seed"`,
      );
    }
    return byKey[key];
  };

  return {
    contactEmail: contactEmailSchema.parse(get('contact_email')),
    skills: skillsSchema.parse(get('skills')),
    stackItems: stackItemsSchema.parse(get('stack_items')),
    approachSteps: approachStepsSchema.parse(get('approach_steps')),
    servicesTicker: servicesTickerSchema.parse(get('services_ticker')),
    socialLinks: socialLinksSchema.parse(get('social_links')),
  };
});

const PROJECT_COLUMNS = `
  id, slug, title, tag, tagline, description, role, year, tech, cover_image_url,
  gallery, live_url, repo_url, featured, sort_order, published, created_at, updated_at
`;

function toProject(row: Record<string, unknown>): Project {
  return projectSchema.parse({
    id: row.id,
    slug: row.slug,
    title: row.title,
    tag: row.tag,
    tagline: row.tagline,
    description: row.description,
    role: row.role,
    year: row.year,
    tech: row.tech,
    coverImageUrl: row.cover_image_url,
    gallery: row.gallery,
    liveUrl: row.live_url,
    repoUrl: row.repo_url,
    featured: row.featured,
    sortOrder: row.sort_order,
    published: row.published,
    createdAt: new Date(row.created_at as string).toISOString(),
    updatedAt: new Date(row.updated_at as string).toISOString(),
  });
}

/** Published projects in showcase order — cached under the "projects" tag. */
export async function listProjects(options?: { publishedOnly?: boolean }): Promise<Project[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  const queryProjects = unstable_cache(
    async (publishedOnly: boolean): Promise<Project[]> => {
      const { rows } = await getPool().query(
        `SELECT ${PROJECT_COLUMNS}
           FROM projects
           ${publishedOnly ? 'WHERE published = true' : ''}
           ORDER BY featured DESC, sort_order ASC, created_at DESC`,
      );
      return (rows as Record<string, unknown>[]).map(toProject);
    },
    ['projects-list'],
    { tags: ['projects'], revalidate: 60 },
  );
  return queryProjects(publishedOnly);
}

/** One published project by slug — cached under "projects" + a per-entity tag. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const queryProject = unstable_cache(
    async (slug: string): Promise<Project | null> => {
      const { rows } = await getPool().query(
        `SELECT ${PROJECT_COLUMNS}
           FROM projects
          WHERE slug = $1 AND published = true
          LIMIT 1`,
        [slug],
      );
      return rows.length ? toProject(rows[0] as Record<string, unknown>) : null;
    },
    ['project-by-slug'],
    { tags: ['projects', `project:${slug}`], revalidate: 60 },
  );
  return queryProject(slug);
}

/** Stores an inbound contact message. Validated with zod; never cached. */
export async function createMessage(input: unknown): Promise<MessageInput> {
  const message = messageInputSchema.parse(input);
  await getPool().query(
    'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
    [message.name, message.email, message.message],
  );
  return message;
}
