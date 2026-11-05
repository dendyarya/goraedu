# Writing a news post

News covers changes to EPA refrigerant rules and Section 608 technician certification. Every post follows the
accuracy principles in `CLAUDE.md`: only what an official source states, with links and check dates.

## Add a post (on GitHub, no computer needed)

1. Open https://github.com/dendyarya/goraedu/tree/main/content/news and choose **Add file → Create new file**.
2. Name the file after the URL, lowercase words joined by hyphens, ending in `.md`:
   `epa-proposes-new-leak-repair-rule.md` becomes https://goraedu.com/news/epa-proposes-new-leak-repair-rule/.
   The name can never change after publishing.
3. Paste the template below, fill it in, and **Commit changes** to `main`. The site deploys in about two minutes.

```markdown
---
title: "EPA Proposes ..."
summary: "One or two sentences: what happened, when, and whether it is proposed or final."
published: 2026-11-05
sources:
  - title: "Federal Register: <document title> (<proposed/final>, <date>)"
    url: "https://www.federalregister.gov/documents/..."
    checked: 2026-11-05
---

Opening paragraph: what EPA did, the date, and whether it is proposed or final.

## What changes

Only what the sources state.

## What this means for EPA 608 study

Say plainly if the sources do not mention Section 608 certification.
```

## Rules

- Sources: Federal Register, eCFR, EPA.gov. Trade press only as background, never as the only source.
- Say "proposed" or "final" in the title or first paragraph. A proposal is never described as in effect.
- No guesses about future dates, no opinions, no copying text from other news sites.
- `published` is the date the post first goes live on goraedu. To correct a post later, fix it, add
  `updated: YYYY-MM-DD`, and log the fix on /corrections/.
- `draft: true` in the front matter keeps a post off the site.
- A post missing a title, summary, date or source fails the build, so nothing broken goes live.

## Sitemaps

- `/sitemap.xml` lists every post.
- `/news-sitemap.xml` (Google News format) lists only posts first published in the last two days, as Google
  requires. It is rebuilt on every deploy, and stays empty until the site is launched (`SITE_ENV=production`).
