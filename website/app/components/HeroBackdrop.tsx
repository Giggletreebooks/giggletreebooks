/** Purely presentational: soft colour wash + dot field fading out at the edges. */
export default function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0 text-border opacity-70"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <div className="absolute -top-24 -left-32 size-[26rem] rounded-full bg-brand-soft blur-3xl motion-safe:animate-[drift_11s_ease-in-out_infinite_alternate]" />
      <div className="absolute top-32 -right-24 size-[22rem] rounded-full bg-accent-soft blur-3xl motion-safe:animate-[drift_14s_ease-in-out_infinite_alternate-reverse]" />
    </div>
  );
}
