/**
 * Storybook tree.
 *
 * Built as deliberate flat illustration rather than an imitation of painting:
 * cel-shaded tonal bands, a scalloped canopy edge, and a consistent light from
 * the upper left. Trying to fake brushwork in vector reads worse than
 * committing to clean shapes.
 *
 * Foliage is `currentColor` so it tints per world; the trunk reads from
 * `--env-bark` because a green trunk was the single thing most responsible for
 * the old trees looking like clip-art.
 */
export default function TreeStorybook({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 320"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <ellipse cx="122" cy="308" rx="88" ry="14" fill="url(#gt-cast)" />

      {/* Trunk, tapered with a root flare, in bark colour. */}
      <g style={{ color: "var(--env-bark, #6b4423)" }}>
        <path
          d="M104 308c2-16 4-36 5-58 1-30 0-58-3-84h28c-3 26-4 54-3 84 1 22 3 42 5 58z"
          fill="currentColor"
        />
        <path
          d="M76 308c14-2 26-13 33-34l4 34zm92 0c-14-2-26-13-33-34l-4 34z"
          fill="currentColor"
          opacity="0.92"
        />
        {/* Lit edge and shadowed edge of the trunk. */}
        <path d="M104 308c2-16 4-36 5-58 1-30 0-58-3-84h10c-2 26-3 54-2 84 1 22 2 42 4 58z" fill="#fff" opacity="0.16" />
        <path d="M128 166h6c-3 26-4 54-3 84 1 22 3 42 5 58h-12c2-16 3-36 4-58 1-30 0-58 0-84z" fill="#000" opacity="0.16" />
      </g>

      {/* Branches, behind the canopy so they read as structure not scribble. */}
      <g stroke="var(--env-bark, #6b4423)" strokeLinecap="round" fill="none">
        <path d="M112 186 82 156" strokeWidth="9" />
        <path d="M128 198l34-30" strokeWidth="9" />
      </g>

      {/* Canopy base — the darkest tone, widest silhouette. */}
      <path
        d="M120 26c30-8 58 6 68 30 26 4 42 26 40 50-2 20-16 35-36 40-8 18-30 27-52 22-22 6-46-3-56-20-22-3-38-20-38-40 0-20 14-37 34-42 6-22 24-38 40-40z"
        fill="currentColor"
      />

      {/* Mid tone, inset and scalloped along its lower edge. */}
      <path
        d="M120 34c26-7 50 5 59 26 22 4 36 22 34 43-2 17-14 30-31 34-7 16-26 23-45 19-19 5-40-3-48-17-19-3-33-17-33-34 0-17 12-32 29-36 5-19 21-33 35-35z"
        fill="#fff"
        opacity="0.14"
      />

      {/* Sunlit crown, upper left, with a lobed lower boundary. */}
      <path
        d="M118 40c22-6 42 4 51 21 8 12 6 28-6 36-10 7-24 5-32-3-9 8-24 8-33-1-8-8-9-21-2-30 3-13 12-21 22-23z"
        fill="#fff"
        opacity="0.22"
      />

      {/* Shadowed underside. Reuses the canopy silhouette rather than its own
          shape, so the shading can never spill outside the tree. */}
      <path
        d="M120 26c30-8 58 6 68 30 26 4 42 26 40 50-2 20-16 35-36 40-8 18-30 27-52 22-22 6-46-3-56-20-22-3-38-20-38-40 0-20 14-37 34-42 6-22 24-38 40-40z"
        fill="url(#gt-shade)"
      />
    </svg>
  );
}
