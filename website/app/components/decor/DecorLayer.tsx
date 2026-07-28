/**
 * Container for decorative artwork — trees, leaves, clouds, butterflies.
 *
 * Always a sibling of content, never a wrapper, so decor can move, float, or
 * parallax without reflowing a single word. Positioning and the pointer-events
 * / z-index guards live in globals.css under `[data-decor]`.
 *
 * The parent must be `relative isolate overflow-hidden`.
 */
export default function DecorLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-decor="" aria-hidden>
      {children}
    </div>
  );
}
