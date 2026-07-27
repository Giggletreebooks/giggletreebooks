/* Kept inside the brand family: the two logo colours plus shades between them,
   so placeholder covers never introduce an off-brand hue. */
const TINTS = [
  "25 104 15", // #19680F brand green
  "59 28 0", // #3B1C00 brand brown
  "74 110 40", // olive
  "110 68 20", // warm brown
  "38 86 46", // deep moss
  "92 58 24", // chestnut
];

/**
 * Stable colour derived from a slug, so folder-scanned content keeps the same
 * tint across builds without anyone assigning one by hand.
 */
export function slugTint(slug: string): string {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return TINTS[hash % TINTS.length];
}

/** Placeholder panel background — blends the tint into the card surface. */
export function tintSurface(tint: string): string {
  return `color-mix(in oklab, rgb(${tint}) 14%, var(--surface))`;
}

/** Placeholder panel foreground — readable against `tintSurface` either mode. */
export function tintInk(tint: string): string {
  return `color-mix(in oklab, rgb(${tint}) 60%, var(--foreground))`;
}
