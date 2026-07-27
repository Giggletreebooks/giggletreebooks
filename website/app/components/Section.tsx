export default function Section({
  title,
  description,
  emptyMessage = "Coming soon",
  children,
}: {
  title: string;
  description?: string;
  /** Shown in place of `children` when there is nothing to render. */
  emptyMessage?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-muted text-pretty">{description}</p>
        )}
        <div className="mt-8 lg:mt-10">
          {children ?? (
            <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted text-pretty">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
