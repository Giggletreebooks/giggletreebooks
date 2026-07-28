/**
 * Storybook tree: a trunk with three overlapping canopy blobs.
 *
 * Draws in `currentColor` so a layer can tint it by depth — pale and flat for
 * the far treeline, fuller for the mid-ground.
 */
export default function Tree({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <path
        d="M56 200V104h8v96z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M60 132 38 112M60 148l22-18"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="60" cy="52" r="40" fill="currentColor" />
      <circle cx="28" cy="80" r="28" fill="currentColor" opacity="0.9" />
      <circle cx="92" cy="80" r="28" fill="currentColor" opacity="0.9" />
      <circle cx="60" cy="92" r="26" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
