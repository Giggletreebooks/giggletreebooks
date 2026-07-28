import type { CSSProperties } from "react";

/**
 * A single decorative piece inside a `DecorLayer`.
 *
 * Wraps whatever art you give it — an SVG leaf, a cloud, a butterfly — and
 * exposes the knobs a future animation needs: an ambient float, its speed,
 * distance, and an offset so neighbouring pieces drift out of sync.
 *
 * `float` is opt-in and honours prefers-reduced-motion globally.
 */
export default function DecorItem({
  children,
  className,
  float = false,
  /** Seconds for one drift cycle. */
  duration,
  /** Seconds to offset the start, so items don't move in lockstep. */
  delay,
  /** How far it travels, any CSS length. */
  drift,
  style,
}: {
  /** The artwork. Omit for pure-CSS decor such as a blurred colour blob. */
  children?: React.ReactNode;
  className?: string;
  float?: boolean;
  duration?: number;
  delay?: number;
  drift?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      data-decor-item=""
      data-decor-float={float ? "" : undefined}
      className={className}
      style={
        {
          ...(duration !== undefined && { "--decor-duration": `${duration}s` }),
          ...(delay !== undefined && { "--decor-delay": `${delay}s` }),
          ...(drift !== undefined && { "--decor-drift": drift }),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
