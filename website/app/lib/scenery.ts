import { existsSync } from "node:fs";
import { join } from "node:path";
import { assetDirs } from "@/app/lib/assets";

/**
 * Painted scenery assets, resolved by convention like covers and characters.
 *
 *   public/scenery/<name>.webp   (or .png)
 *
 * Every piece of scenery checks here first and falls back to its vector
 * drawing if no painting exists. That makes the upgrade incremental: drop in
 * `tree-oak.png` and every oak in every world becomes painted, with no config
 * change and nothing to keep in sync. A half-finished set never breaks a page.
 *
 * Assets must be transparent PNGs — the layers sit over each other and over
 * the sky wash, so any baked-in background would occlude the layers behind.
 */

const PUBLIC_DIR = join(process.cwd(), "public");
const missing = new Set<string>();

export type SceneryAsset = {
  src: string;
  /** Intrinsic size is unknown at build time; layers size by CSS anyway. */
  name: string;
};

/**
 * WebP first: these are large, soft, alpha-heavy paintings, where it runs
 * about ten times smaller than PNG for no visible loss. PNG still works, so a
 * freshly painted asset can be dropped straight in and squeezed later.
 */
const FORMATS = ["webp", "png"] as const;

export function resolveScenery(name: string): SceneryAsset | undefined {
  const found = FORMATS.find((ext) =>
    existsSync(join(PUBLIC_DIR, "scenery", `${name}.${ext}`)),
  );

  if (!found) {
    if (!missing.has(name)) {
      missing.add(name);
      /* Info, not a warning: the vector fallback is a valid state, not a fault. */
      console.log(
        `[scenery] ${name}: no painting yet (public/scenery/${name}.webp) — drawing the vector version.`,
      );
    }
    return undefined;
  }

  return { src: `${assetDirs.scenery}/${name}.${found}`, name };
}
