/** Faint dot field that fades out toward the edges. Fills its decor layer. */
export default function DecorDots() {
  return (
    <div
      data-decor-item=""
      className="inset-0 text-border opacity-70"
      style={{
        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        maskImage:
          "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
      }}
    />
  );
}
