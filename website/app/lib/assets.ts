/**
 * Every image path used by the site lives here. Components import from this
 * file rather than hardcoding `/…` strings, so swapping an asset is a one-line
 * change. Files are copied into `public/` from the master library — nothing
 * here should point outside `public/`.
 */

/**
 * On GitHub Pages the site lives under `/<repo-name>`. `next/link` applies that
 * prefix automatically, but `next/image` `src` values and metadata icons do not
 * — so image paths get it here. Empty during local development.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Base folders under `public/`, for paths built from data at runtime. */
export const assetDirs = {
  branding: `${BASE}/branding`,
  covers: `${BASE}/covers`,
  characters: `${BASE}/characters`,
  printables: `${BASE}/printables`,
} as const;

/**
 * The primary logo: tree, children, and the "Giggle Tree" wordmark, no tagline.
 * It carries the brand name itself, so it is never paired with adjacent text.
 *
 * `logo.png` in the same folder is the older lockup that also bakes in the
 * "Small books for big imaginations" tagline — switch `src` back to it only if
 * the tagline is wanted again.
 */
export const logo = {
  src: `${assetDirs.branding}/logo-without-text.png`,
  width: 1740,
  height: 1799,
  alt: "Giggle Tree Books",
} as const;

/**
 * Animated logo for the hero card. 1280×720 native, but the card is 4:3 and
 * crops it: the logo lockup fills only ~51% of the frame width, so the wider
 * framing wasted a third of the card on empty background. Full resolution is
 * kept precisely because the card crops in — downscaling first would show.
 */
export const logoAnimation = {
  src: `${assetDirs.branding}/logo-animation.mp4`,
  width: 1280,
  height: 720,
} as const;
