import HeroBackdrop from "@/app/components/HeroBackdrop";

/** Page-level header band. Shorter than the homepage Hero, same backdrop. */
export default function PageHero({
  eyebrow,
  title,
  description,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional artwork column; the header goes two-up when present. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    // No bottom border: the following Section supplies the divider, and two
    // adjacent 1px borders read as a 2px rule.
    <section className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <div
        className={`mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24${
          aside
            ? " grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16"
            : ""
        }`}
      >
        <div>
          {eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent uppercase">
              <span className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-6 max-w-3xl font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div className="mx-auto w-full max-w-sm lg:mx-0">{aside}</div>}
      </div>
    </section>
  );
}
