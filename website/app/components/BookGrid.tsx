import BookCard from "@/app/components/BookCard";
import { type Book } from "@/app/lib/books";

/** Four columns at xl so the hub still reads well at hundreds of books. */
export default function BookGrid({ books }: { books: Book[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <li key={book.slug} className="flex">
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}
