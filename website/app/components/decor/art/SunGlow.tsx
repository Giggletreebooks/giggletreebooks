/**
 * Warm light source with soft rays — the natural lighting the scene is lit by.
 * Radial gradients only, so it costs one element and no filters.
 */
export default function SunGlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" fill="none" aria-hidden className={className}>
      <defs>
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
      <circle cx="150" cy="150" r="150" fill="url(#gt-sun-core)" />
      <g opacity="0.5">
        {[0, 38, 74, 116, 152, 198, 236, 288, 322].map((angle) => (
          <path
            key={angle}
            d="M146 150 150 24l4 126z"
            fill="url(#gt-sun-ray)"
            transform={`rotate(${angle} 150 150)`}
          />
        ))}
      </g>
    </svg>
  );
}
