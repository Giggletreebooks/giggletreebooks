/** Boulder cluster for woodland ground. */
export default function Rocks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden className={className}>
      <path d="M4 60c0-16 10-28 24-28s24 12 24 28z" fill="currentColor" opacity="0.7" />
      <path d="M38 60c0-22 14-38 33-38s33 16 33 38z" fill="currentColor" />
      <path d="M84 60c0-13 8-22 18-22s18 9 18 22z" fill="currentColor" opacity="0.8" />
      <path d="M60 30c6 2 11 7 14 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}
