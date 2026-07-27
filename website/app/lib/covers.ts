import { assetDirs } from "@/app/lib/assets";

/**
 * Maps a series slug to its folder under `public/covers/`. Adding a series is
 * one line here plus its entry in `series.ts`.
 */
export const SERIES_COVER_DIRS: Record<string, string> = {
  "farm-animals": "series-1-farm-animals",
  "wild-animals": "series-2-wild-animals",
};

/**
 * Cover files are named after the book title — "Clara the Cow" lives at
 * `covers/series-1-farm-animals/Clara the Cow.jpg`. Titles contain spaces, so
 * the path is URI-encoded. Returns undefined for series with no artwork yet,
 * which makes the card fall back to its placeholder panel.
 *
 * `.jpg` because `scripts/prepare-covers.sh` converts the delivered PNGs to
 * web-sized JPEGs; the site has no image optimisation to do it at runtime.
 */
export function bookCoverPath(
  seriesSlug: string,
  title: string,
): string | undefined {
  const dir = SERIES_COVER_DIRS[seriesSlug];
  return dir ? encodeURI(`${assetDirs.covers}/${dir}/${title}.jpg`) : undefined;
}

/** Title -> URL slug, e.g. "Clara the Cow" -> "clara-the-cow". */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
