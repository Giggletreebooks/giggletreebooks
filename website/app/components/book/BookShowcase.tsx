import Link from "next/link";
import Book3D from "@/app/components/book/Book3D";
import StaggerItem from "@/app/components/motion/StaggerItem";
import { type Book } from "@/app/lib/books";

/**
 * Books standing in the world rather than sitting in cards.
 *
 * On a series page the environment is the container, so card chrome — border,
 * surface fill, shadow — would put a box between the visitor and the world
 * they have just walked into. Here the books are the only solid objects: 3D,
 * grounded by their own contact shadow, with the scene visible around them.
 *
 * Alternating vertical offsets break the grid line so the row reads as objects
 * on uneven ground instead of cells in a table.
 */
export default function BookShowcase({ books }: { books: Book[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
      {books.map((book, index) => (
        <StaggerItem
          key={book.slug}
          index={index}
          /* Every other book sits a little lower, as if on uneven ground. */
          className={index % 2 === 1 ? "lg:mt-10" : undefined}
        >
          <Link
            href={`/books/${book.seriesSlug}/${book.slug}`}
            className="group flex flex-col items-center rounded-2xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <div className="h-44 w-full sm:h-52 lg:h-56">
              <Book3D
                cover={book.coverImage}
                title={book.title}
                tintSlug={book.seriesSlug}
                sizes="(min-width: 1024px) 11rem, (min-width: 640px) 22vw, 40vw"
              />
            </div>

            <h3 className="mt-6 text-center font-display text-base font-semibold tracking-tight break-words text-balance transition-colors group-hover:text-brand sm:text-lg">
              {book.title}
            </h3>
            {book.ageRange && (
              <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">
                {book.ageRange}
              </p>
            )}
          </Link>
        </StaggerItem>
      ))}
    </ul>
  );
}
