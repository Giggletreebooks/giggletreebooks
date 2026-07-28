import Book3D from "@/app/components/book/Book3D";
import { type Book } from "@/app/lib/books";
import { slugTint, tintSurface } from "@/app/lib/tint";

/** The book at display size for the detail page header. */
export default function BookCoverFrame({ book }: { book: Book }) {
  const tint = slugTint(book.seriesSlug);

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-border bg-brand-soft/60" />
      <div
        className="relative flex aspect-4/5 items-center justify-center rounded-[2rem] border border-border px-8 pt-10 pb-12 shadow-[0_24px_60px_-32px_rgb(59_28_0_/_0.4)]"
        style={{ backgroundColor: tintSurface(tint) }}
      >
        <Book3D
          cover={book.coverImage}
          title={book.title}
          tintSlug={book.seriesSlug}
          alt={`Cover of ${book.title}`}
          sizes="(min-width: 1024px) 18rem, 60vw"
          priority
        />
      </div>
    </div>
  );
}
