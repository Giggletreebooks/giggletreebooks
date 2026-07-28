import Link from "next/link";
import Book3D from "@/app/components/book/Book3D";
import { LogoWatermark } from "@/app/components/Logo";
import {
  CARD_FOCUS,
  CARD_INTERACTIVE,
  CARD_MEDIA,
  CARD_SHELL,
  cardAttrs,
  staticCardAttrs,
} from "@/app/lib/cardStyles";
import { type Series } from "@/app/lib/series";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

export default function SeriesCard({ series }: { series: Series }) {
  const tint = slugTint(series.slug);
  const available = series.status === "available";

  const body = (
    <>
      {/* No data-card-media here: the book supplies its own hover motion, and
          the image-zoom hook would fight the tilt. */}
      <div
        className={`${CARD_MEDIA} aspect-4/3 px-6 pt-6 pb-8`}
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {series.coverImage ? (
          /* A series is represented by its first book, shown the same way. */
          <Book3D
            cover={series.coverImage}
            title={series.title}
            tintSlug={series.slug}
            sizes="(min-width: 1024px) 9rem, (min-width: 640px) 20vw, 40vw"
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
    return (
      <article {...staticCardAttrs} className={CARD_SHELL}>
        {body}
      </article>
    );
  }

  return (
    <Link
      href={`/books/${series.slug}`}
      {...cardAttrs}
      className={`${CARD_SHELL} ${CARD_INTERACTIVE} ${CARD_FOCUS}`}
    >
      {body}
    </Link>
  );
}
