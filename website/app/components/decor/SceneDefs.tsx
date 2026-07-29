/**
 * Shared SVG gradients for the scenery, rendered once per document.
 *
 * Defined here rather than inside each art component because duplicate
 * gradient ids across dozens of inlined SVGs is invalid markup — and because
 * these are reused by every piece of art.
 *
 * The stops are deliberately neutral white and black rather than
 * `currentColor`: a gradient resolves `currentColor` against where it is
 * *defined*, not where it is used, so a tinted gradient here would lock every
 * world to one colour. Instead art fills its base shape with `currentColor`
 * and lays these over the top as light and shade, which keeps per-world
 * tinting intact while still giving real volume.
 */
export default function SceneDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* Sunlight falling from the upper left. */}
        <linearGradient id="gt-light" x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.62" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* The shadowed underside, opposite the light. */}
        <linearGradient id="gt-shade" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#0b2b10" stopOpacity="0" />
          <stop offset="55%" stopColor="#0b2b10" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0b2b10" stopOpacity="0.42" />
        </linearGradient>

        {/* Bark: vertical banding down the trunk. */}
        <linearGradient id="gt-bark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="38%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="70%" stopColor="#000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>

        {/*
          Aerial perspective: distance washes toward the sky. Laid over far
          layers so they lose contrast the way real distance does — far cheaper
          than blurring them.
        */}
        <linearGradient id="gt-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* Soft contact shadow beneath anything standing on the ground. */}
        <radialGradient id="gt-cast">
          <stop offset="0%" stopColor="#2a3d1c" stopOpacity="0.38" />
          <stop offset="70%" stopColor="#2a3d1c" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2a3d1c" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="gt-sun-core">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="45%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="gt-sun-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
