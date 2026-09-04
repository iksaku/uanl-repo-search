# UANL Repo Search

Discover repositories created by students and faculty of the Universidad Autónoma de Nuevo León.
SvelteKit app deployed on Cloudflare Workers. The index page is prerendered (static assets); `/api/stats` is a Worker endpoint that aggregates counts from GitHub's GraphQL API, cached in three tiers: KV (`STATS_KV` binding, 24h TTL), the CDN edge cache (`s-maxage=86400`), and the browser (`max-age=300`).

## Developing

```bash
pnpm install
pnpm dev        # vite dev server
```

To exercise the Worker runtime (and `/api/stats`) locally:

```bash
pnpm build
pnpm exec wrangler dev
```

`/api/stats` needs a GitHub token (fine-grained PAT, public read-only is enough). Copy `.dev.vars.example` to `.dev.vars` (gitignored, loaded by `wrangler dev`) and fill it in:

```
GITHUB_TOKEN=ghp_...
```

Without the binding, `/api/stats` responds 500 with `GITHUB_TOKEN binding is not configured` — expected.

To set up the token for both local dev and production, run the wizard:

```bash
./scripts/setup-github-token.sh
```

## Building

```bash
pnpm build      # emits the Cloudflare Worker + assets into .svelte-kit/cloudflare
```

Deploy with `pnpm exec wrangler deploy`.

## Linting

```bash
pnpm check      # svelte-check
pnpm lint       # prettier --check + eslint
pnpm format     # prettier --write
```
