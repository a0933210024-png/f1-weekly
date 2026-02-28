import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    coverKeyword: z.string().optional(),
    coverImage: z.string().optional(),
    summary: z.string(),
    readTime: z.string(),
    images: z.array(z.string()).optional(),
  }),
});

const teamsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    nationality: z.string(),
    base: z.string(),
    teamPrincipal: z.string(),
    color: z.string(),
    accentColor: z.string(),
    drivers: z.array(z.object({
      name: z.string(),
      number: z.number(),
      nationality: z.string(),
    })),
    stats: z.object({
      championships: z.number(),
      wins: z.number(),
      podiums: z.number(),
      firstSeason: z.number(),
    }),
    coverImage: z.string(),
    carImage: z.string().optional(),
    founded: z.number(),
    engine: z.string(),
  }),
});

export const collections = {
  articles: articlesCollection,
  teams: teamsCollection,
};
