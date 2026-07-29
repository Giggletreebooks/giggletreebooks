/** Low shrub for filling the ground line between trees. Lit to match them. */
export default function Bush({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 80" fill="none" aria-hidden className={className}>
      <ellipse cx="72" cy="74" rx="58" ry="8" fill="url(#gt-cast)" />
      <path
        d="M12 74c-8-8-6-22 4-28-2-14 10-24 24-21 6-11 22-14 32-6 12-8 28-3 32 9 14 0 24 12 21 25-2 9-9 15-18 17z"
        fill="currentColor"
      />
      <path
        d="M12 74c-8-8-6-22 4-28-2-14 10-24 24-21 6-11 22-14 32-6 12-8 28-3 32 9 14 0 24 12 21 25-2 9-9 15-18 17z"
        fill="url(#gt-light)"
      />
      <path
        d="M12 74c-8-8-6-22 4-28-2-14 10-24 24-21 6-11 22-14 32-6 12-8 28-3 32 9 14 0 24 12 21 25-2 9-9 15-18 17z"
        fill="url(#gt-shade)"
      />
    </svg>
  );
}
