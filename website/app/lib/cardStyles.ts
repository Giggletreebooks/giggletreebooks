/**
 * Shared card styling and animation hooks.
 *
 * The three card types have different semantic roots — SeriesCard is a link,
 * BookCard an article with a stretched link, PrintableCard an article with a
 * download button — so they can't share one component without contorting the
 * markup. They share these class strings and data attributes instead.
 *
 * Motion lives in globals.css keyed off the data attributes:
 *   [data-card]              transform/shadow pre-declared as animatable
 *   [data-card-interactive]  hover lift, reading --card-lift / --card-tilt-*
 *   [data-card-media]        image zoom on hover
 *   [data-card-perspective]  perspective for a future 3D tilt
 *
 * A tilt effect is then a client wrapper that writes --card-tilt-x/y on
 * pointer move. No card component changes.
 */

/** Base shell: surface, border, radius. No motion of its own. */
export const CARD_SHELL =
  "group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface";

/** Hover lift plus brand border. Omit for inert cards (unreleased series). */
export const CARD_INTERACTIVE =
  "hover:border-brand hover:shadow-[0_20px_40px_-24px_rgb(59_28_0_/_0.45)]";

/** Focus ring for cards whose whole surface is one link. */
export const CARD_FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Focus ring for cards containing an interactive child. */
export const CARD_FOCUS_WITHIN =
  "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand";

/** Media well. Pair with an aspect-ratio class on the same element. */
export const CARD_MEDIA =
  "relative flex items-center justify-center overflow-hidden";

/** Attributes marking a card root as animatable and hover-responsive. */
export const cardAttrs = {
  "data-card": "",
  "data-card-interactive": "",
} as const;

/** Attributes for an inert card — animatable, but no hover response. */
export const staticCardAttrs = {
  "data-card": "",
} as const;

/** Attributes for the media well, enabling the hover image zoom. */
export const cardMediaAttrs = {
  "data-card-media": "",
} as const;
