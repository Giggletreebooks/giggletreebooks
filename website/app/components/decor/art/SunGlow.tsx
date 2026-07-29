/**
 * Warm light source — the natural lighting the scene is lit by.
 * One radial gradient, so it costs one element and no filters.
 *
 * It used to fan out hard-edged rays. Over a painted scene they read as
 * streaks of dirt rather than light, and they cut straight across the
 * headline, so the glow is now only the falloff.
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
      </defs>
      <circle cx="150" cy="150" r="150" fill="url(#gt-sun-core)" />
    </svg>
  );
}
