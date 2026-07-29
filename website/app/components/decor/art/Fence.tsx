/** Post-and-rail fence that stretches to any width. One element, one layer. */
export default function Fence({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path d="M0 22h400v7H0zM0 40h400v7H0z" fill="currentColor" opacity="0.9" />
      {[10, 60, 110, 160, 210, 260, 310, 360].map((x) => (
        <path key={x} d={`M${x} 8h10v52h-10z`} fill="currentColor" />
      ))}
    </svg>
  );
}
