/**
 * A strip of grass blades that stretches to any width.
 *
 * Deliberately one SVG rather than many blade elements: the whole strip sways
 * as a single composited layer, so a full-width band costs one animation
 * instead of dozens.
 */
export default function Grass({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 60V44c8 0 14-8 18-20 3 12 8 20 16 20 6 0 11-6 14-16 3 14 9 22 18 22 7 0 12-7 15-18 4 13 10 20 19 20 8 0 13-8 16-20 4 12 9 20 17 20 7 0 12-6 15-17 4 13 10 21 19 21 8 0 13-8 16-20 3 12 8 20 16 20 6 0 11-6 15-17 3 13 9 21 18 21 8 0 13-8 17-20 3 12 8 20 16 20 7 0 12-7 15-18 4 13 10 20 19 20 8 0 14-8 17-20 4 12 9 20 17 20 7 0 12-6 15-17 4 13 10 21 19 21 8 0 14-8 18-22v22z"
        fill="currentColor"
      />
    </svg>
  );
}
