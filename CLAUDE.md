# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

No test or lint scripts are configured.

## Architecture

**Stack:** Next.js 16 (Pages Router) + Sanity CMS + SCSS + Mailchimp

### Data Layer

All Sanity queries live in [lib/api.js](lib/api.js). Two Sanity clients are configured in [lib/sanity.js](lib/sanity.js): a CDN-backed public client and an authenticated `previewClient` for draft content. Queries use GROQ.

Pages use `getStaticProps` with `revalidate: 1` (ISR) for initial data. The blog listing uses SWR-based infinite pagination: the hook in [actions/pagination.js](actions/pagination.js) fetches from the [/api/blogs](pages/api/blogs.js) REST endpoint on each page load/filter change.

### Content Rendering

Blog post body content is Sanity Portable Text rendered via `@portabletext/react`. Custom overrides are defined in [components/TextBlock.js](components/TextBlock.js) — this is where heading fragment links, blockquotes, and embedded block types (images, galleries, YouTube, file downloads) are wired up.

### Authentication / Protected Posts

Some blog posts are marked protected in Sanity. When a user subscribes via Mailchimp, the webhook at [/api/mailchimp-webhook](pages/api/mailchimp-webhook.js) creates a `subscriber` document in Sanity with a UUID token. The token is verified via [/api/auth/verify](pages/api/auth/verify.js) and stored in a cookie to gate access to protected content in [[slug].js](pages/blog/[slug].js).

### Feeds

RSS/Atom/JSON feeds are generated on-demand at `/api/feed/rss`, `/api/feed/atom`, and `/api/feed/json`. The URL `/feed` rewrites to `/api/feed/rss` (configured in [vercel.json](vercel.json)). Feed building logic is in [pages/api/feed/buildRss.js](pages/api/feed/buildRss.js).

### Styling

SCSS using a 7-1 pattern under [styles/](styles/). Global variables, mixins, and functions are in `styles/abstracts/`. Component-specific styles are colocated under `styles/components/` matching their React counterparts.

## Environment Variables

Required in `.env.local`:

| Variable | Purpose |
|---|---|
| `SANITY_PROJECT_ID` | Sanity project ID |
| `SANITY_DATASET_NAME` | Dataset (e.g. `production`) |
| `SANITY_PREVIEW_SECRET` | Secret for preview mode |
| `SANITY_READ_TOKEN` | Read-only Sanity token |
| `SANITY_API_TOKEN` | Write token (used for subscriber creation) |
| `MAILCHIMP_API_KEY` | Mailchimp API key |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp server region (e.g. `us7`) |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp list/audience ID |

Sanity env vars are exposed to the client via `next.config.js` `env` block (not `NEXT_PUBLIC_` prefix).
