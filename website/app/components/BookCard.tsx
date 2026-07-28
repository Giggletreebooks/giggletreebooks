import Image from "next/image";
import Link from "next/link";
import { LogoWatermark } from "@/app/components/Logo";
import { type Book } from "@/app/lib/books";
import {
  CARD_FOCUS_WITHIN,
  CARD_INTERACTIVE,
  CARD_MEDIA,
  CARD_SHELL,
  cardAttrs,
  cardMediaAttrs,
} from "@/app/lib/cardStyles";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

export default function BookCard({ book }: { book: Book }) {
  const tint = slugTint(book.seriesSlug);

  return (
    /* Not a <Link> wrapper: the title link is stretched over the whole card so
       the "View Book" affordance stays decorative and nothing nests. */
    <article
      {...cardAttrs}
      className={`relative ${CARD_SHELL} ${CARD_INTERACTIVE} ${CARD_FOCUS_WITHIN}`}
    >
      <div
        {...cardMediaAttrs}
        className={`${CARD_MEDIA} aspect-4/3`}
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(min-width: 1280px) 17rem, (min-width: 1024px) 21rem, (min-width: 640px) 45vw, 92vw"
            className="object-cover"
          />
        ) : (
          /* Stands in until cover artwork lands. */
          <>
            <LogoWatermark className="absolute -right-10 -bottom-12 h-44 w-auto opacity-[0.08]" />
            <span
              aria-hidden
              className="px-6 text-center font-display text-xl leading-tight font-semibold tracking-tight break-words text-balance sm:text-2xl"
              style={{ color: tintInk(tint) }}
            >
              {book.title}
            </span>
          </>
        )}
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
