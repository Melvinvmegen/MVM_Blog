import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  category: z.string(),
  last_updated: z.string(),
  draft: z.boolean().optional(),
});

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "**/posts/**/*.md",
      schema: blogSchema,
    }),
    snippets: defineCollection({
      type: "page",
      source: "**/snippets/*.md",
      schema: blogSchema,
    }),
    files: defineCollection({
      type: "page",
      source: "**/files/*.md",
      schema: blogSchema,
    }),
  },
});
