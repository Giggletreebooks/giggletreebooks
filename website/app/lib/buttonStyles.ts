/** Shared call-to-action styling. 48px tall, above the 44px touch minimum. */

const BASE =
  "inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-8 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const BUTTON_PRIMARY = `${BASE} bg-brand text-background shadow-sm hover:brightness-110`;

export const BUTTON_SECONDARY = `${BASE} border border-border bg-surface hover:border-brand hover:text-brand`;
