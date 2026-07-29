/**
 * A winding path receding into the scene — narrow at the horizon, wide at the
 * viewer, which is what gives the ground actual depth rather than a flat band.
 */
export default function Path({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M186 0c-6 24 10 40 4 60-6 22-44 32-60 60h270c-30-28-84-38-96-60-11-20 2-36-6-60z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M186 0c-6 24 10 40 4 60-6 22-44 32-60 60h270c-30-28-84-38-96-60-11-20 2-36-6-60z"
        fill="url(#gt-light)"
      />
      {/* Stones scattered along the edge. */}
      <g fill="currentColor" opacity="0.4">
        <ellipse cx="150" cy="98" rx="9" ry="4" />
        <ellipse cx="252" cy="104" rx="11" ry="4.5" />
        <ellipse cx="196" cy="72" rx="7" ry="3" />
        <ellipse cx="230" cy="64" rx="6" ry="2.6" />
      </g>
    </svg>
  );
}
