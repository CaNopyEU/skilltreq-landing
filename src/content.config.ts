import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['en', 'sk', 'cs']),
    lastUpdated: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['en', 'sk', 'cs']),
    date: z.string(),
    author: z.string(),
    type: z.enum(['devlog', 'guide', 'roadmap', 'announcement']),
    tags: z.array(z.string()),
    slug: z.string(),
    linkedChanges: z
      .array(
        z.object({
          ref: z.string(),
          repo: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    readingTime: z.string().optional(),
    no_hype_language: z.boolean(),
    no_gamification: z.boolean(),
    no_fake_urgency: z.boolean(),
    has_value_for_reader: z.boolean(),
    matches_brand_voice: z.boolean(),
  }),
});

export const collections = { legal, blog };
