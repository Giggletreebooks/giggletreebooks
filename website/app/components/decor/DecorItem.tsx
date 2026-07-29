import type { CSSProperties } from "react";

/** Ambient motions available to decorative art. Behaviour lives in globals.css. */
export type DecorMotion =
  | "float"
  | "sway"
  | "drift"
  | "fall"
  /** Wandering loop — butterflies. */
  | "flutter"
  /** Long crossing that rises and settles — birds. */
  | "glide";

/**
 * A single decorative piece inside a `DecorLayer`.
 *
 * Wraps whatever art you give it — a tree, cloud, leaf, flower — and exposes
 * the knobs an ambient animation needs. Every value is a CSS variable, so two
 * items sharing a motion still move independently: give them different
 * durations and delays and they never fall into lockstep.
 *
 * All motion honours prefers-reduced-motion globally; nothing to handle here.
 */
export default function DecorItem({
  children,
  className,
  motion,
  /** Seconds for one cycle. Longer reads calmer. */
  duration,
  /** Seconds to offset the start. Negative values start mid-cycle. */
  delay,
  /** float: travel distance. Any CSS length. */
  drift,
  /** sway: peak rotation, e.g. "1.5deg". */
  angle,
  /** fall: horizontal drift, vertical distance, and tumble. */
  fallX,
  fallDistance,
  spin,
  /** drift/fall: peak opacity. */
  opacity,
  /**
   * Anything standing on the ground. Dissolves its base into the terrain
   * instead of ending on a cut edge — a trunk that stops dead reads as a
   * sticker on the sky, however well it is painted.
   */
  rooted,
  /** How much of the base dissolves, e.g. "18%". Taller art needs less. */
  rootFade,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  motion?: DecorMotion;
  duration?: number;
  delay?: number;
  drift?: string;
  angle?: string;
  fallX?: string;
  fallDistance?: string;
  spin?: string;
  opacity?: number;
  rooted?: boolean;
  rootFade?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      data-decor-item=""
      data-decor-motion={motion}
      data-rooted={rooted ? "" : undefined}
      className={className}
      style={
        {
          ...(duration !== undefined && { "--decor-duration": `${duration}s` }),
          ...(delay !== undefined && { "--decor-delay": `${delay}s` }),
          ...(drift !== undefined && { "--decor-drift": drift }),
          ...(angle !== undefined && { "--decor-angle": angle }),
          ...(fallX !== undefined && { "--decor-fall-x": fallX }),
          ...(fallDistance !== undefined && {
            "--decor-fall-distance": fallDistance,
          }),
          ...(spin !== undefined && { "--decor-spin": spin }),
          ...(opacity !== undefined && { "--decor-opacity": opacity }),
          ...(rootFade !== undefined && { "--decor-root-fade": rootFade }),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
