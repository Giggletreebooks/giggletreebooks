import { existsSync } from "node:fs";
import { join } from "node:path";
import { assetDirs } from "@/app/lib/assets";

/**
 * The Hero's master painted plate — one illustration replacing the composited
 * scene, resolved by convention like covers, characters and scenery.
 *
 *   public/hero/plate.webp   (or .png / .jpg)
 *
 * If it is not there, the Hero falls back to the layer stack it was built
 * from. That fallback is the point of resolving by file existence rather than
 * by a flag: the plate can be dropped in, swapped, or pulled back out without
 * touching a line of component code, and a missing file never ships a broken
 * page — it ships the previous design.
 *
 * See docs/hero-art-brief.md for what the artwork itself has to do.
 */

const PUBLIC_DIR = join(process.cwd(), "public");
const FORMATS = ["webp", "png", "jpg"] as const;

let announced = false;

export function resolveHeroPlate(): string | undefined {
  const found = FORMATS.find((ext) =>
    existsSync(join(PUBLIC_DIR, "hero", `plate.${ext}`)),
  );

  if (!found) {
    if (!announced) {
      announced = true;
      /* Info, not a warning: the composite is a valid state, not a fault. */
      console.log(
        "[hero] no master plate yet (public/hero/plate.webp) — building the Hero from the scenery layers.",
      );
    }
    return undefined;
  }

  return `${assetDirs.hero}/plate.${found}`;
}
