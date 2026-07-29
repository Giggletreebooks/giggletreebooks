/**
 * Storybook tree with real canopy structure: a tapered trunk, spreading
 * branches, and overlapping foliage clusters in three tones.
 *
 * Tones are layered `currentColor` at different opacities rather than fixed
 * colours, so one tree tints itself to whatever world it stands in.
 */
export default function TreeLush({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Trunk, wider at the roots */}
      <path
        d="M88 260c2-30 4-58 4-86 0-14-1-27-2-40h20c-1 13-2 26-2 40 0 28 2 56 4 86z"
        fill="currentColor"
      />
      {/* Root flare */}
      <path
        d="M72 260c4-12 10-18 16-20v20zm56 0c-4-12-10-18-16-20v20z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Branches reaching into the canopy */}
      <path
        d="M100 150 66 118M100 168l36-30M100 132 78 108M100 186l28-22"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Canopy — back layer, darkest and widest */}
      <g opacity="0.55">
        <circle cx="60" cy="96" r="40" fill="currentColor" />
        <circle cx="140" cy="96" r="40" fill="currentColor" />
        <circle cx="100" cy="62" r="46" fill="currentColor" />
      </g>
      {/* Canopy — mid layer */}
      <g opacity="0.8">
        <circle cx="74" cy="80" r="34" fill="currentColor" />
        <circle cx="128" cy="80" r="34" fill="currentColor" />
        <circle cx="101" cy="54" r="38" fill="currentColor" />
        <circle cx="100" cy="104" r="32" fill="currentColor" />
      </g>
      {/* Canopy — front highlights, catching the light from above left */}
      <g opacity="0.35">
        <circle cx="84" cy="46" r="22" fill="#fff" />
        <circle cx="62" cy="74" r="15" fill="#fff" />
        <circle cx="116" cy="40" r="12" fill="#fff" />
      </g>
      {/* A few leaves reading as individual foliage */}
      <g opacity="0.5" fill="#fff">
        <ellipse cx="52" cy="106" rx="7" ry="4" transform="rotate(-24 52 106)" />
        <ellipse cx="150" cy="98" rx="7" ry="4" transform="rotate(20 150 98)" />
        <ellipse cx="104" cy="24" rx="7" ry="4" transform="rotate(-8 104 24)" />
      </g>
    </svg>
  );
}
