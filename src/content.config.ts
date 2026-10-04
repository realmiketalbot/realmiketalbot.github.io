import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import { parse } from "yaml";

// Each YAML file is a plain list; entries get an id from their position so
// there's no need to write one by hand. Order in the file is display order.
const yamlList = (path: string) =>
  file(path, {
    parser: (text) =>
      (parse(text) as Record<string, unknown>[]).map((entry, i) => ({
        id: String(i).padStart(3, "0"),
        ...entry,
      })),
  });

const link = z.string().url().optional();

const experience = defineCollection({
  loader: yamlList("src/content/experience.yaml"),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    location: z.string().optional(),
    dates: z.string(),
    bullets: z.array(z.string()).optional(),
    summary: z.string().optional(),
  }),
});

const education = defineCollection({
  loader: yamlList("src/content/education.yaml"),
  schema: z.object({
    degree: z.string(),
    school: z.string(),
    dates: z.string(),
    details: z
      .array(z.object({ label: z.string(), text: z.string(), url: link }))
      .optional(),
    areas: z.array(z.string()).optional(),
  }),
});

const teaching = defineCollection({
  loader: yamlList("src/content/teaching.yaml"),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    department: z.string().optional(),
    location: z.string().optional(),
    dates: z.string(),
    courses: z.array(z.string()).optional(),
  }),
});

const publications = defineCollection({
  loader: yamlList("src/content/publications.yaml"),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number(),
    venue: z.string(),
    category: z.enum([
      "peer-reviewed",
      "submitted",
      "in-prep",
      "proceedings",
      "contributions",
    ]),
    doi: link,
    url: link,
  }),
});

const talks = defineCollection({
  loader: yamlList("src/content/talks.yaml"),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    type: z.enum(["Talk", "Poster"]),
    event: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    slides: link,
    link: link,
  }),
});

const datedItem = z.object({
  title: z.string(),
  date: z.string(),
  note: z.string().optional(),
  url: link,
});

const awards = defineCollection({
  loader: yamlList("src/content/awards.yaml"),
  schema: datedItem,
});

const service = defineCollection({
  loader: yamlList("src/content/service.yaml"),
  schema: datedItem,
});

const credentials = defineCollection({
  loader: yamlList("src/content/credentials.yaml"),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    kind: z.enum(["training", "certification"]),
    note: z.string().optional(),
    bullets: z.array(z.string()).optional(),
  }),
});

const affiliations = defineCollection({
  loader: yamlList("src/content/affiliations.yaml"),
  schema: z.object({ org: z.string(), role: z.string() }),
});

export const collections = {
  experience,
  education,
  teaching,
  publications,
  talks,
  awards,
  service,
  credentials,
  affiliations,
};
