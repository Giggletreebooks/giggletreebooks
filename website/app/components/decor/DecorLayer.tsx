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
  /**
   * Paint above the content instead of behind it.
   *
   * A handful of near things — a leaf, a butterfly — crossing in front of the
   * copy and the logo is what stops the logo reading as a video pasted onto a
   * background. Nothing you can put *behind* an element makes it belong to
   * the scene; something in front of it does.
   */
  front,
  children,
}: {
  front?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div data-decor={front ? "front" : ""} aria-hidden>
      {children}
    </div>
  );
}
