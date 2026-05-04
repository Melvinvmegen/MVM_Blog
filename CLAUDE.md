# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install          # install dependencies
npm run start         # dev server at http://localhost:3000 (maps to nuxt dev)
npm run build         # production build
npm run generate      # static site generation (used for deployment)
npm run preview       # preview the production build locally
npm run test          # run tests
```

## Testing

Vitest with Vue plugin. Two suites:

- `tests/unit/` — composables and server utilities, `node` environment
- `tests/components/` — Vue component tests, `happy-dom` environment

Nuxt auto-imports (`#imports`, `#components`) are stubbed via `tests/__stubs__/`. All tests mock `queryCollection` — no real Nuxt/content runtime needed.

Config: `vitest.config.ts`. Aliases `~` and `@` resolve to `./app`.

## Important Notes

- Always use qmd before reading files
  Before reading files or exploring directories, always use qmd to search for information in local projects.
  Available tools:
- `qmd search “query”` — fast keyword search (BM25)
- `qmd query “query”` — hybrid search with reranking (best quality)
- `qmd vsearch “query”` — semantic vector search
- `qmd get <file>` — retrieve a specific document

Use qmd search for quick lookups and qmd query for complex questions.

Use Read/Glob only if qmd doesn’t return enough results.

## Architecture

**MVM Blog** is a statically-generated Nuxt 4 blog site built with `@nuxt/content` v3. It runs `nuxt generate` at deploy time and serves the output via nginx (see `Dockerfile`).

### Content

All blog content lives in `content/posts/` (tutorials) and `content/snippets/` (code snippets). These are Markdown files queried at build/request time via `queryContent()`. Key frontmatter fields:

- `id` — numeric, used for sort order (descending)
- `category` — string; post categories are derived dynamically from this field, not predefined
- `draft: true` — excludes the post from all listings
- `last_updated` — date string, formatted with `dayjs`
- `cover` — Cloudinary image path (relative to the configured base URL)
- `linkedPosts` — array of `id` values for multi-part series

### Data fetching

`composables/fetch.js` exports `useFetch()` with two methods:
- `fetchAll(endpoint, url, where?, limit?)` — queries a content directory, returns `id`, `title`, `description`, `category`, `_path`, `last_updated`, sorted by `id` desc, excluding drafts
- `fetchOne(endpoint, query)` — returns a single content item by arbitrary query

Both wrap Nuxt's `useAsyncData` + `queryContent`.

### Routing

| Route | Source |
|---|---|
| `/` | `pages/index.vue` — recent posts + categories + top snippets |
| `/posts` | `pages/posts/index.vue` |
| `/posts/[category]` | `pages/posts/[category]/index.vue` |
| `/posts/[category]/[...slug]` | `pages/posts/[category]/[...slug].vue` — full post view |
| `/snippets` | `pages/snippets/index.vue` |
| `/snippets/[...slug]` | `pages/snippets/[...slug].vue` |
| `/rss.xml` | `server/routes/rss.xml.ts` — prerendered RSS feed |

### Layout

`layouts/default.vue` wraps every page and handles: `Navbar`, `CustomFooter`, cookie consent banner, and the mobile slide-in drawer. Post categories passed to the footer are fetched here from `/posts`.

### Server component for content rendering

`components/StaticContentRenderer.server.vue` is a Nuxt component island (requires `experimental.componentIslands: true` in `nuxt.config.ts`). It renders a Markdown document by path via `ContentRendererMarkdown`. In dev mode it uses `useAsyncData`; in production it queries directly. The post detail page uses this component to render the body.

### Styling

**Not Tailwind** — despite similar class names, the project uses hand-written CSS utilities. `tailwind.config.ts` has been deleted. Global styles are in `assets/css/main.css`. Responsive variants use custom breakpoint prefixes (`md-`, `lg-`) defined per-component in `<style>` blocks. Design tokens are CSS variables (`--color-primary`, `--color-secondary`, `--color-third`, etc.).

### Images

All images are served through Cloudinary (`@nuxt/image` with `provider: 'cloudinary'`). The base URL is `https://res.cloudinary.com/dhpgnuli7/image/upload/blog`. Use `<NuxtImg provider="cloudinary" :src="...">` where the `src` is a path relative to that base.

### i18n

`@nuxtjs/i18n` with a single active locale (`en`). Translation strings are in `i18n/locales/en.json`. A `fr.json` exists but is not wired up in `nuxt.config.ts`. All user-visible strings in components use `$t("key")` or `useI18n().t`.
