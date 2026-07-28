/** Soft rounded cloud. One path so it stays cheap to composite. */
export default function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" fill="none" aria-hidden className={className}>
      <path
        d="M42 72c-18 0-32-12-32-27S24 18 42 18c5 0 10 1 14 4C63 9 78 0 95 0c23 0 42 16 46 37 3-2 7-3 11-3 13 0 24 10 24 23s-11 22-24 22z"
        fill="currentColor"
      />
    </svg>
  );
}
