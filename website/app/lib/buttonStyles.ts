/** Shared call-to-action styling. 48px tall, above the 44px touch minimum. */

const BASE =
  "inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-8 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/*
 * The lift is the whole point. A flat fill on a painted background reads as a
 * UI control dropped onto artwork; a button that sits above the page with its
 * own coloured shadow and rises to meet the cursor reads as something in the
 * scene. The shadow is tinted with the brand green rather than black — a grey
 * shadow under a green button looks like dirt.
 */
export const BUTTON_PRIMARY = `${BASE} bg-brand text-background shadow-[0_8px_18px_-8px_rgb(25_104_15_/_0.55)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_26px_-10px_rgb(25_104_15_/_0.6)] active:translate-y-0 active:shadow-[0_4px_10px_-6px_rgb(25_104_15_/_0.5)] motion-reduce:hover:translate-y-0`;

export const BUTTON_SECONDARY = `${BASE} border border-border bg-surface shadow-[0_6px_14px_-10px_rgb(59_28_0_/_0.4)] hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[0_12px_22px_-12px_rgb(59_28_0_/_0.45)] active:translate-y-0 motion-reduce:hover:translate-y-0`;
