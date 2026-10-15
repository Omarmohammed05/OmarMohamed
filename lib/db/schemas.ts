import { z } from 'zod';

export const stackItemSchema = z.object({
  abbr: z.string(),
  name: z.string(),
});
export type StackItem = z.infer<typeof stackItemSchema>;
export const stackItemsSchema = z.array(stackItemSchema);

export const approachStepSchema = z.object({
  title: z.string(),
  body: z.string(),
});
export type ApproachStep = z.infer<typeof approachStepSchema>;
export const approachStepsSchema = z.array(approachStepSchema);

export const socialLinkSchema = z.object({
  label: z.string(),
  abbr: z.string(),
  href: z.string(),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;
export const socialLinksSchema = z.array(socialLinkSchema);

export const contactEmailSchema = z.string().min(3);
export const skillsSchema = z.array(z.string());
export const servicesTickerSchema = z.array(z.string());

export const projectSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string(),
  description: z.string(),
  role: z.string(),
  year: z.number().int().nullable(),
  tech: z.array(z.string()),
  coverImageUrl: z.string().nullable(),
  gallery: z.array(z.string()),
  liveUrl: z.string().nullable(),
  repoUrl: z.string().nullable(),
  featured: z.boolean(),
  sortOrder: z.number().int(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Project = z.infer<typeof projectSchema>;

export const messageInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  message: z.string().trim().min(10).max(5000),
});
export type MessageInput = z.infer<typeof messageInputSchema>;
