/** Distant bird — the classic two-stroke silhouette, read at any size. */
export default function Bird({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 20" fill="none" aria-hidden className={className}>
      <path
        d="M2 14c6 0 9-3 12-7 2-3 4-4 6-1 2 4 6 8 12 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 17c4 0 6-2 8-5 1-2 3-2 4 0 1 3 3 5 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
}
