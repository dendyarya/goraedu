# goraedu

Free practice tests and study guides for U.S. skilled trades certifications, starting with EPA Section 608.
Every answer links to the official source, with the date it was checked.

Stack: Next.js 16 (static export) on Cloudflare Workers static assets.

## Deploy

Every push to `main` builds and deploys automatically through Cloudflare Workers Builds.
Pushes to other branches get a preview URL without touching the live site.

| Setting           | Value                                             |
| ----------------- | ------------------------------------------------- |
| Worker name       | `goraedu` (must match `name` in `wrangler.jsonc`) |
| Production branch | `main`                                            |
| Build command     | `npm run build`                                   |
| Deploy command    | `npx wrangler deploy`                             |
| Build output      | `out/`                                            |

### One-time setup (Cloudflare dashboard)

1. Workers & Pages > Create > Import a repository > `dendyarya/goraedu`.
2. Keep the settings above and deploy.
3. At launch: Settings > Build > Variables, add `SITE_ENV=production` and `SITE_URL=https://goraedu.com`,
   then add `goraedu.com` under Settings > Domains & Routes.

Until `SITE_ENV=production` is set, every build sends `noindex` (meta tag, `X-Robots-Tag` and robots.txt),
so the early site never gets indexed by accident.

## Local

```sh
npm ci
npm run dev      # http://localhost:3000
npm run check    # typecheck, lint, build
npm run preview  # build and serve with wrangler like production
```

## Planning documents

Roadmap, EPA 608 content map, runbook and the production tracker live outside the repo
(Claude Docs and `goraedu-tracker-epa608.xlsx`).
