import Image from "next/image";
import { LogoWatermark } from "@/app/components/Logo";
import { type Book } from "@/app/lib/books";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

/** Full-size cover for the book detail header. Falls back to a tinted panel. */
export default function BookCoverFrame({ book }: { book: Book }) {
  const tint = slugTint(book.seriesSlug);

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-border bg-brand-soft/60" />
      <div
        className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[2rem] border border-border shadow-[0_24px_60px_-32px_rgb(59_28_0_/_0.4)]"
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover"
            priority
          />
        ) : (
          <>
            <LogoWatermark className="absolute -right-10 -bottom-12 h-52 w-auto opacity-[0.08]" />
            <span
              aria-hidden
              className="px-8 text-center font-display text-2xl leading-tight font-semibold tracking-tight break-words text-balance sm:text-3xl"
              style={{ color: tintInk(tint) }}
            >
              {book.title}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
