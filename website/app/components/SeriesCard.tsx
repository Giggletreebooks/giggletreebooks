import Image from "next/image";
import Link from "next/link";
import { LogoWatermark } from "@/app/components/Logo";
import { type Series } from "@/app/lib/series";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

const BASE =
  "group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200";

const INTERACTIVE =
  " hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_40px_-24px_rgb(59_28_0_/_0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:hover:translate-y-0";

export default function SeriesCard({ series }: { series: Series }) {
  const tint = slugTint(series.slug);
  const available = series.status === "available";

  const body = (
    <>
      <div
        className="relative flex aspect-4/3 items-center justify-center overflow-hidden"
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {series.coverImage ? (
          <Image
            src={series.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        ) : (
          /* Watermark + initial stand in until cover artwork lands. */
          <>
            <LogoWatermark className="absolute -right-8 -bottom-10 h-40 w-auto opacity-[0.08]" />
            <span
              aria-hidden
              className="font-display text-5xl font-semibold tracking-tight sm:text-6xl"
              style={{ color: tintInk(tint) }}
            >
              {series.title.charAt(0)}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`font-display text-lg font-semibold tracking-tight break-words transition-colors sm:text-xl${
              available ? " group-hover:text-brand" : ""
            }`}
          >
            {series.title}
          </h3>
          <span
            className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
              available
                ? "border border-border text-muted"
                : "bg-accent-soft text-accent"
            }`}
          >
            {available
              ? `${series.bookCount} ${series.bookCount === 1 ? "book" : "books"}`
              : "Coming soon"}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
          {series.description}
        </p>
      </div>
    </>
  );

  /* Unreleased series have no page to link to, so they stay inert. */
  if (!available) {
    return <article className={BASE}>{body}</article>;
  }

  return (
    <Link href={`/books/${series.slug}`} className={BASE + INTERACTIVE}>
      {body}
    </Link>
  );
}
