/** Single leaf with a centre vein, for the drifting-leaf layer. */
export default function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path
        d="M28 4C14 4 4 12 4 22c0 3 1 5 2 6C10 20 18 14 26 12c-6 4-13 10-17 18 2 1 4 2 7 2 10 0 16-12 12-28z"
        fill="currentColor"
      />
    </svg>
  );
}
