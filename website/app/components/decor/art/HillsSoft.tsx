/**
 * Rolling hills in four receding bands, each paler than the one behind it.
 * The stacking is what creates distance — no blur needed.
 */
export default function HillsSoft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 140"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 140V64c46-30 92-38 138-24 40 12 70 30 116 26 44-4 78-24 146-30v104z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M0 140V86c52-24 100-28 144-12 38 14 66 28 108 24 40-4 76-22 148-26v68z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M0 140V104c58-18 108-18 150 0 36 16 62 24 100 20 36-4 78-18 150-20v36z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M0 140v-16c64-12 118-10 160 6 32 12 60 14 96 8 34-6 80-14 144-12v14z"
        fill="currentColor"
      />
    </svg>
  );
}
