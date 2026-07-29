/** Two rolling ridges, for open worlds like the farm and savanna. */
export default function Hills({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 90"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 90V52c34-22 70-30 106-22 30 7 52 22 84 22 34 0 60-19 96-24 44-6 84 6 114 30v32z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M0 90V68c40-16 76-20 110-12 32 8 56 20 92 18 38-2 66-18 104-18 34 0 66 8 94 24v10z"
        fill="currentColor"
      />
    </svg>
  );
}
