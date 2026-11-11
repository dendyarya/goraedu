# Writing a news post

There are two kinds of post (front matter `kind`):

- `rule-change` (the default): an official proposed or final change. Say "proposed" or "final" in the title or first
  paragraph.
- `explainer`: an evergreen article that explains one rule, requirement or process for a certification on the
  roadmap, built only from official sources (eCFR, the agency's own pages, the Federal Register). It never says a
  rule changed, never predicts, and never repeats a page already on goraedu: it answers one practical question and
  links to our practice tests or study guides where they cover it.

The daily schedule is in `docs/daily-news.md`.

News covers official changes that affect any certification on the roadmap
(`lib/clusters.ts`): EPA 608 and 609, CDL, OSHA, FAA Part 107 and the rest as they launch. Every post follows the
accuracy principles in `CLAUDE.md`: only what an official source states, with links and check dates.

## Post from the CMS (https://www.goraedu.com/admin/)

The CMS (Sveltia CMS, `public/admin/`) is a form for news posts. **Save** commits the post to `main` on GitHub; the
normal checks and deploy run, and the post is live about 3 minutes later. A post that breaks a rule in `lib/news.ts`
(missing source, image under 1200 px wide, bad date) fails the build and does not go live; GitHub e-mails the
failure and the run shows the reason under **Actions**.

- Sign in: **Sign In Using Access Token** with a GitHub fine-grained personal access token that only you hold:
  github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token;
  Repository access: only `dendyarya/goraedu`; Permissions → Repository permissions → **Contents: Read and write**
  (Metadata: Read-only is added automatically); expiry 90 days. The token stays in that browser only. Never put it in the
  repo, in chat or anywhere else. Revoke it on GitHub if a device is lost.
- Posts cannot be deleted from the CMS (URLs never change); tick **Draft** to take one off the site.
- The page needs the `location /admin/` block of `deploy/nginx/goraedu.com.conf` on the server (its own CSP).
- Everything below about what a post may say applies to CMS posts too.

## Add a post (on GitHub, no computer needed)

1. Open https://github.com/dendyarya/goraedu/tree/main/content/news and choose **Add file → Create new file**.
2. Name the file after the URL, lowercase words joined by hyphens, ending in `.md`:
   `epa-proposes-new-leak-repair-rule.md` becomes https://www.goraedu.com/news/epa-proposes-new-leak-repair-rule/.
   The name can never change after publishing.
3. Paste the template below, fill it in, and **Commit changes** to `main`. The site deploys in about two minutes.

```markdown
---
title: "EPA Proposes ..."
kind: rule-change # or: explainer
topic: "EPA 608"
summary: "One or two sentences: what happened, when, and whether it is proposed or final."
published: 2026-11-05
# image: optional, see "Images" below
sources:
  - title: "Federal Register: <document title> (<proposed/final>, <date>)"
    url: "https://www.federalregister.gov/documents/..."
    checked: 2026-11-05
---

Opening paragraph: what EPA did, the date, and whether it is proposed or final.

## What changes

Only what the sources state.

## What this means for exam study

Say plainly if the sources do not mention the certification or its exam.
```

## Rules

- `topic` is the certification the post is about, written as on the certifications page ("EPA 608", "CDL",
  "OSHA 10 and OSHA 30", "FAA Part 107").
- Sources: Federal Register, eCFR, govinfo.gov, the agency's own site (EPA.gov, FMCSA.dot.gov, OSHA.gov, FAA.gov),
  a state licensing board's own .gov site, or the certifying body's own site for changes to its own program (for
  example ASE, NABCEP, AWS, an EPA-approved 608 certifying organization). Trade press and news media only as
  background, never as the only source; a news story is a lead to the official source, not the source itself.
- Say "proposed" or "final" in the title or first paragraph. A proposal is never described as in effect.
- No guesses about future dates, no opinions, no copying text from other news sites.
- `published` is the date the post first goes live on goraedu. To correct a post later, fix it, add
  `updated: YYYY-MM-DD`, and log the fix on /corrections/.
- `draft: true` in the front matter keeps a post off the site.
- A post missing a title, summary, date or source fails the build, so nothing broken goes live.

## Images (optional)

A post may have one lead image. It shows at the top of the post, as a thumbnail on the news list and home page,
and as the preview picture when the link is shared or shown by Google.

1. Upload the file to `public/news/` on GitHub (**Add file → Upload files**). Name it in lowercase words joined
   by hyphens, ending in `.jpg`, `.png` or `.webp`. It must be at least **1200 px wide**; 1600 × 900 (16:9) is ideal.
2. Add this to the post's front matter:

```yaml
image:
  src: /news/my-image-name.jpg
  alt: "What the image shows, for people who cannot see it"
  credit: "Who made it, e.g. goraedu or U.S. EPA"
  license: "Own work"
  url: "https://page-the-image-came-from (not needed for Own work)"
```

`license` must be one of: `Own work`, `Public domain (U.S. government work)`, `CC0`, `CC BY 4.0`,
`Unsplash License`, `Pexels License`. Credit and license are always shown under the image.

Legal rules for images (the build checks the fields, you check the rights):

- Easiest: `node scripts/news-card.mjs --out public/news/<slug>.png --topic "CDL" --tag "Final rule" --title "Line one|Line two|Line three" --source "Federal Register" --date "Nov 6, 2026"`
  makes a 1600 × 900 title card in the site's style (license `Own work`, credit `goraedu`).
- Best choice: our own graphics (a title card made in Canva from our own design is "Own work") or our own photos.
- U.S. federal government photos are public domain, but check the page: some agency pages use photos from
  contractors or stock sites that are not public domain. If the page names another photographer or agency, do not use it.
- Never use agency or company logos or seals, screenshots of other news sites, or photos of identifiable people
  without a model release (stock photos with people are fine only under the licenses above).
- No images from Google Images, Facebook or other sites unless the page itself grants one of the licenses above.

A missing file, a missing alt text, credit or license, or an image narrower than 1200 px fails the build, so nothing
broken goes live.

## Sitemaps

- `/sitemap.xml` lists every post.
- `/news-sitemap.xml` (Google News format) lists only posts first published in the last two days, as Google
  requires. It is rebuilt on every deploy, and stays empty until the site is launched (`SITE_ENV=production`).
