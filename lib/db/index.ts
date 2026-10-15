import { cache } from 'react';
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
 * Loads seeded site content from Postgres. `cache()` dedupes the query
 * across server components within a single request.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const { rows } = await getPool().query<{ key: string; data: unknown }>(
    'SELECT key, data FROM site_content WHERE key = ANY($1::text[])',
    [CONTENT_KEYS],
  );
  const byKey = new Map(rows.map((row) => [row.key, row.data]));
  const get = (key: (typeof CONTENT_KEYS)[number]): unknown => {
    const value = byKey.get(key);
    if (value === undefined) {
      throw new Error(
        `site_content key "${key}" is missing — run "npm run db:migrate && npm run db:seed"`,
      );
    }
    return value;
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

export async function listProjects(options?: { publishedOnly?: boolean }): Promise<Project[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  const { rows } = await getPool().query<Record<string, unknown>>(`
    SELECT id, slug, title, tagline, description, role, year, tech, cover_image_url,
           gallery, live_url, repo_url, featured, sort_order, published, created_at, updated_at
      FROM projects
      ${publishedOnly ? 'WHERE published = true' : ''}
      ORDER BY sort_order ASC, created_at DESC
  `);
  return rows.map((row) =>
    projectSchema.parse({
      id: row.id,
      slug: row.slug,
      title: row.title,
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
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }),
  );
}

export async function createMessage(input: unknown): Promise<MessageInput> {
  const message = messageInputSchema.parse(input);
  await getPool().query(
    'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
    [message.name, message.email, message.message],
  );
  return message;
}
