import Link from "next/link";
import BookGrid from "@/app/components/BookGrid";
import Section from "@/app/components/Section";
import { getBooks } from "@/app/lib/books";

export default async function FeaturedBooks({ limit }: { limit?: number }) {
  const books = await getBooks();
  const shown = limit ? books.slice(0, limit) : books;

  return (
    <Section
      title="Featured Books"
      description="Hand-picked titles from across the Giggle Tree shelf."
    >
      <BookGrid books={shown} />

      <div className="mt-12 flex justify-center">
        <Link
          href="/books"
          className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-background shadow-sm transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          View All Books
        </Link>
      </div>
    </Section>
  );
}
