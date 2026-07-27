import { existsSync } from "node:fs";
import { join } from "node:path";
import { assetDirs } from "@/app/lib/assets";

/**
 * Cover artwork is resolved by convention, never mapped per book:
 *
 *   public/covers/<series coverDir>/<Book Title>.jpg
 *
 * So `Clara the Cow` in `series-1-farm-animals` resolves to
 * `covers/series-1-farm-animals/Clara the Cow.jpg`. Adding artwork needs no
 * code change — drop the file in with a filename matching the title exactly.
 */

/**
 * `.jpg` first: `scripts/prepare-covers.sh` converts delivered PNGs to
 * web-sized JPEGs. `.png` is accepted so freshly-dropped artwork still shows
 * before the script has been run — it just warns about the file size.
 */
const COVER_EXTENSIONS = [".jpg", ".png"] as const;

const PUBLIC_DIR = join(process.cwd(), "public");

/** Warn once per path — these resolvers run for every page in the export. */
const warned = new Set<string>();

function warnOnce(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(message);
}

/** Title -> URL slug, e.g. "Clara the Cow" -> "clara-the-cow". */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Public URL for a book's cover, or undefined when the file is missing — in
 * which case the card renders its placeholder panel instead of a broken image.
 *
 * Runs server-side only (during `next dev` and the static export), so the
 * existence check is a real filesystem lookup and warnings land in the terminal
 * and in CI build logs.
 */
export function resolveCover(
  coverDir: string | undefined,
  title: string,
  context: string,
): string | undefined {
  if (!coverDir) return undefined;

  for (const ext of COVER_EXTENSIONS) {
    const relative = `covers/${coverDir}/${title}${ext}`;
    if (!existsSync(join(PUBLIC_DIR, relative))) continue;

    if (ext === ".png") {
      warnOnce(
        `[covers] ${relative} is still a PNG — run ./scripts/prepare-covers.sh ` +
          `to shrink it, or the full-size file ships to every visitor.`,
      );
    }
    return encodeURI(`${assetDirs.covers}/${coverDir}/${title}${ext}`);
  }

  warnOnce(
    `[covers] Missing cover for ${context}: expected ` +
      `public/covers/${coverDir}/${title}.jpg ` +
      `(filename must match the title exactly, including capitals and spaces). ` +
      `Showing the placeholder panel instead.`,
  );
  return undefined;
}
