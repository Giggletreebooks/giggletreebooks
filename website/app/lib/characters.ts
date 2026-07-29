import { existsSync } from "node:fs";
import { join } from "node:path";
import { assetDirs } from "@/app/lib/assets";
import { coverDirFor } from "@/app/lib/series-seed";

/**
 * Book characters, resolved by convention exactly like covers.
 *
 *   public/characters/<series coverDir>/<Book Title>.png
 *
 * One transparent cutout per character, whole-body. That constrains idles to
 * whole-body motion — breathing, bobbing, swaying — which is why the vocabulary
 * below has no blink or wave. Layered art would allow those; see the docs.
 *
 * A character with no artwork renders nothing rather than a placeholder, so an
 * unfinished series never ships looking broken. The build logs what's missing.
 */

/** Whole-body idles. Behaviour lives in globals.css under `[data-idle]`. */
export type Idle = "breathe" | "bob" | "sway" | "lean" | "hop";

export type Character = {
  /** Public path to the transparent cutout. */
  src: string;
  /** Names the character for assistive tech. */
  name: string;
  idle: Idle;
};

const PUBLIC_DIR = join(process.cwd(), "public");
const warned = new Set<string>();

/**
 * Which idle suits which animal. Falls back to `breathe`, which reads as alive
 * for anything, so a new book never needs an entry here to work.
 */
const IDLE_BY_KEYWORD: [RegExp, Idle][] = [
  [/rabbit|kangaroo|frog/i, "hop"],
  [/chicken|duck|goose|turkey|bird/i, "bob"],
  [/horse|donkey|zebra|giraffe|deer/i, "sway"],
  [/cat|dog|fox|koala|sloth|panda/i, "lean"],
];

export function idleFor(title: string): Idle {
  return IDLE_BY_KEYWORD.find(([pattern]) => pattern.test(title))?.[1] ?? "breathe";
}

/**
 * Runs server-side only (dev and static export), so the existence check is a
 * real filesystem lookup and warnings surface in the terminal and CI log.
 */
export function resolveCharacter(
  seriesSlug: string,
  title: string,
): Character | undefined {
  const dir = coverDirFor(seriesSlug);
  if (!dir) return undefined;

  const relative = `characters/${dir}/${title}.png`;

  if (!existsSync(join(PUBLIC_DIR, relative))) {
    const message =
      `[characters] No cutout for "${title}" — expected public/${relative} ` +
      `(transparent PNG, filename matching the book title exactly). ` +
      `The page renders without a character until it exists.`;
    if (!warned.has(message)) {
      warned.add(message);
      console.warn(message);
    }
    return undefined;
  }

  return {
    src: encodeURI(`${assetDirs.characters}/${dir}/${title}.png`),
    name: title,
    idle: idleFor(title),
  };
}
