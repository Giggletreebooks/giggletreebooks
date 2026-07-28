import Link from "next/link";
import Book3D from "@/app/components/book/Book3D";
import { type Book } from "@/app/lib/books";
import {
  CARD_FOCUS_WITHIN,
  CARD_INTERACTIVE,
  CARD_SHELL,
  cardAttrs,
} from "@/app/lib/cardStyles";
import { slugTint, tintSurface } from "@/app/lib/tint";

export default function BookCard({ book }: { book: Book }) {
  const tint = slugTint(book.seriesSlug);

  return (
    /* Not a <Link> wrapper: the title link is stretched over the whole card so
       the "View Book" affordance stays decorative and nothing nests. */
    <article
      {...cardAttrs}
      className={`relative ${CARD_SHELL} ${CARD_INTERACTIVE} ${CARD_FOCUS_WITHIN}`}
    >
      {/* The book stands on a shelf-like ground rather than filling the well,
          so its depth and contact shadow have somewhere to read against. */}
      <div
        className="relative flex aspect-4/5 items-center justify-center px-6 pt-8 pb-10"
        style={{ backgroundColor: tintSurface(tint) }}
      >
        <Book3D
          cover={book.coverImage}
          title={book.title}
          tintSlug={book.seriesSlug}
          sizes="(min-width: 1280px) 12rem, (min-width: 1024px) 14rem, (min-width: 640px) 30vw, 60vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {book.ageRange && (
          <p className="mb-2 text-xs font-medium tracking-wide text-accent uppercase">
            {book.ageRange}
          </p>
        )}
        <h3 className="font-display text-lg font-semibold tracking-tight break-words transition-colors group-hover:text-brand sm:text-xl">
          <Link
            href={`/books/${book.seriesSlug}/${book.slug}`}
            className="outline-none after:absolute after:inset-0"
          >
            {book.title}
          </Link>
        </h3>
        {book.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            {book.description}
          </p>
        )}
        <div className="mb-5" />
        <span
          aria-hidden
          className="mt-auto inline-flex h-11 w-fit items-center justify-center rounded-full border border-border px-6 text-sm font-semibold transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-background"
        >
          View Book
        </span>
      </div>
    </article>
  );
}
