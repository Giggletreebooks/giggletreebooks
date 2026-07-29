import type { CSSProperties } from "react";

/**
 * A depth slice of a chapter. Travels as the chapter passes the viewport, at a
 * rate set by `depth` — far layers barely move, near ones move most. That
 * differential is what the eye reads as depth.
 *
 * A server component: it sets a CSS variable and an attribute, and the
 * browser's scroll timeline does the rest. No scroll listener, no JS on the
 * main thread, nothing to throttle.
 *
 * Parallax lives here, on the layer. Ambient motion (sway, drift) lives on the
 * `DecorItem`s inside. Keeping them on separate elements means the two
 * transforms compose instead of overwriting each other.
 */
export default function ParallaxLayer({
  depth,
  className,
  children,
}: {
  /** 0 = infinitely far, 1 = closest to the viewer. */
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-parallax=""
      /* `bottom` is left to globals.css: when the layer travels, it hangs
         below the chapter by exactly its travel distance, and when it cannot
         travel it sits flush. Both cases keep the ground on the bottom edge. */
      className={`absolute inset-x-0 top-0 ${className ?? ""}`}
      style={{ "--depth": depth } as CSSProperties}
    >
      {children}
    </div>
  );
}
