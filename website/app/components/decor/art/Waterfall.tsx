/**
 * Falling water. The stream is drawn twice, stacked, so the `cascade` motion
 * can translate it a full copy's height and loop seamlessly.
 */
export default function Waterfall({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div data-waterfall-stream="" className="h-[200%] w-full">
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox="0 0 60 120"
            fill="none"
            aria-hidden
            className="h-1/2 w-full"
            preserveAspectRatio="none"
          >
            <rect width="60" height="120" fill="currentColor" opacity="0.35" />
            <path d="M10 0v120M26 0v120M44 0v120" stroke="#fff" strokeWidth="4" opacity="0.35" />
            <path d="M18 0v120M36 0v120M52 0v120" stroke="#fff" strokeWidth="2" opacity="0.2" />
          </svg>
        ))}
      </div>
    </div>
  );
}
