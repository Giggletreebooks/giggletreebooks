/** Classic gambrel-roof barn with a silo. Reads at small sizes as a silhouette. */
export default function Barn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      {/* Silo */}
      <path d="M118 120V54a13 13 0 0 1 26 0v66z" fill="currentColor" opacity="0.75" />
      <path d="M118 54a13 13 0 0 1 26 0z" fill="currentColor" />
      {/* Barn body and gambrel roof */}
      <path d="M12 120V64h96v56z" fill="currentColor" />
      <path d="M60 20 8 62c-3 2-1 6 2 6h100c3 0 5-4 2-6z" fill="currentColor" opacity="0.85" />
      {/* Door and hayloft, punched out so the silhouette reads */}
      <path d="M46 120V88a14 14 0 0 1 28 0v32z" fill="#fff" opacity="0.35" />
      <path d="M52 62h16v14H52z" fill="#fff" opacity="0.3" />
    </svg>
  );
}
