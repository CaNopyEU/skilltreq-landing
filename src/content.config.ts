import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

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

// Written by the content engine on every weekly run, not by hand. The schema is what
// makes `npm run build` fail loudly on malformed data instead of rendering broken HTML.
const changelog = defineCollection({
  loader: file('./src/data/changelog.json'),
  schema: z.object({
    week: z.string(),
    weekStart: z.string(),
    date: z.string(),
    tags: z.array(z.enum(['features', 'tech'])).nonempty(),
    text: z.object({
      en: z.string(),
      sk: z.string(),
      cs: z.string(),
    }),
  }),
});

export const collections = { legal, blog, changelog };
