/** Butterfly seen from above: two wing pairs, a body, and antennae. */
export default function Butterfly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" fill="none" aria-hidden className={className}>
      <path
        d="M19 16C15 6 9 2 5 4 1 6 1 13 5 17c3 3 9 2 14-1z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M21 16c4-10 10-14 14-12 4 2 4 9 0 13-3 3-9 2-14-1z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M19 16c-3 8-8 12-12 11-3-1-4-6-1-9 2-3 8-4 13-2z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M21 16c3 8 8 12 12 11 3-1 4-6 1-9-2-3-8-4-13-2z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M20 10v13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20 10c-1-3-3-4-5-4M20 10c1-3 3-4 5-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
