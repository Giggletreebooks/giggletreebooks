# Giggle Tree Books

Website for Giggle Tree Books, published at
**https://giggletreebooks.github.io/giggletreebooks/**

The site lives in `website/`. Pushing to `main` rebuilds and republishes it
automatically via `.github/workflows/deploy.yml` — usually live within a minute.

---

## Adding a new series

Three steps, none of which touch component code.

### 1. Create the cover folder

```
website/public/covers/series-<n>-<slug>/
```

Follow the existing pattern exactly — lowercase, hyphens, no spaces:

```
website/public/covers/series-1-farm-animals/
website/public/covers/series-2-wild-animals/
website/public/covers/series-3-sea-animals/     <- new
```

### 2. Add the cover images

**One image per book, named exactly after the book title**, including capital
letters and spaces:

```
series-3-sea-animals/
  Ollie the Octopus.png
  Wanda the Whale.png
```

Then shrink them for the web:

```bash
./scripts/prepare-covers.sh
```

This converts every PNG under `public/covers/` to an 800px JPEG in place
(≈3.8 MB → ≈240 KB each). The site has no image optimisation — it serves
whatever is committed — so skipping this step means visitors download the
full-size originals.

### 3. Add the data

**`website/app/lib/series-seed.ts`** — add the series, pointing `coverDir` at
the folder from step 1:

```ts
{
  slug: "sea-animals",
  title: "Sea Animals",
  description: "Down past the shallows, where the light turns blue.",
  status: "available",
  coverDir: "series-3-sea-animals",
}
```

**`website/app/lib/books.ts`** — add one line per book:

```ts
{ title: "Ollie the Octopus", seriesSlug: "sea-animals" },
```

That's it. Cover paths, URL slugs, book counts, and the series image are all
derived. No component changes, no per-book image paths.

---

## How covers resolve

```
public/covers/<series coverDir>/<Book Title>.jpg
```

`resolveCover()` in `app/lib/covers.ts` builds that path and checks the file
exists on disk at build time:

- **Found** → the card shows the cover.
- **`.png` only** → still used, with a warning to run `prepare-covers.sh`.
- **Missing** → the card falls back to a clean placeholder panel, and the build
  logs which file it expected. Warnings appear in your terminal during
  `npm run dev` and in the GitHub Actions build log.

The series image defaults to its first book's cover. To use different artwork,
set `coverImage` on the series in `series-seed.ts`.

**Filenames must match titles exactly** — `Ducky the duck.png` will not match a
book titled `Ducky the Duck`. Mismatches show up as build warnings rather than
broken images.

---

## `public/series/` — book interiors, not published

`website/public/series/` holds the full page scans of each book
(`series-1 farm animals/1_Henrietta the Chicken/1.png` …). It is **gitignored
on purpose** and must stay that way.

Everything under `public/` is published to the open internet. Committing that
folder would give away every book in full to anyone with the link, and at
~2.1 GB it would also exceed the 1 GB GitHub Pages limit. Master copies belong
in `Documents/GT`.

---

## Local development

```bash
cd website
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # static export to website/out
npx tsc --noEmit     # typecheck
npx eslint app       # lint
```

Locally the site is served from `/`. On GitHub Pages it lives under
`/giggletreebooks`, which the deploy workflow supplies via
`NEXT_PUBLIC_BASE_PATH`. `next/link` applies that prefix automatically;
`next/image` and favicons do not, so every image path is built through
`app/lib/assets.ts`.

---

## Still to do

- Book detail pages (`/books/[series]/[book]`) — the "View Book" links 404
- Search and category filters are laid out but disabled
- Book age ranges and descriptions are not yet supplied
- Printables data is still placeholder content
