/** Small five-petal flower on a stem. Petals and centre tint separately. */
export default function Flower({
  className,
  petal = "currentColor",
  centre = "currentColor",
}: {
  className?: string;
  petal?: string;
  centre?: string;
}) {
  return (
    <svg viewBox="0 0 40 64" fill="none" aria-hidden className={className}>
      <path
        d="M20 64V26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M20 44c-6 0-10-4-11-9 6-1 10 3 11 9zM20 38c6-1 10-5 10-10-6 0-10 4-10 10z"
        fill="currentColor"
        opacity="0.55"
      />
      <g fill={petal}>
        <circle cx="20" cy="10" r="7" />
        <circle cx="30" cy="17" r="7" />
        <circle cx="26" cy="28" r="7" />
        <circle cx="14" cy="28" r="7" />
        <circle cx="10" cy="17" r="7" />
      </g>
      <circle cx="20" cy="19" r="5" fill={centre} />
    </svg>
  );
}
