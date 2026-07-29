import { existsSync } from "node:fs";
import { join } from "node:path";
import { assetDirs } from "@/app/lib/assets";

/**
 * Painted scenery assets, resolved by convention like covers and characters.
 *
 *   public/scenery/<name>.png
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

export function resolveScenery(name: string): SceneryAsset | undefined {
  const relative = `scenery/${name}.png`;

  if (!existsSync(join(PUBLIC_DIR, relative))) {
    if (!missing.has(name)) {
      missing.add(name);
      /* Info, not a warning: the vector fallback is a valid state, not a fault. */
      console.log(
        `[scenery] ${name}: no painting yet (public/${relative}) — drawing the vector version.`,
      );
    }
    return undefined;
  }

  return { src: `${assetDirs.scenery}/${name}.png`, name };
}
