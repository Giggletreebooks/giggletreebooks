import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCoverFrame from "@/app/components/BookCoverFrame";
import Character from "@/app/components/story/Character";
import BookGrid from "@/app/components/BookGrid";
import Breadcrumb from "@/app/components/Breadcrumb";
import PageHero from "@/app/components/PageHero";
import PrintableGrid from "@/app/components/PrintableGrid";
import Section from "@/app/components/Section";
import { getBook, getBooks, getBooksBySeries } from "@/app/lib/books";
import { resolveCharacter } from "@/app/lib/characters";
import { getPrintablesBySeries } from "@/app/lib/printables";
import { getSeriesBySlug } from "@/app/lib/series";

export async function generateStaticParams() {
  return (await getBooks()).map((book) => ({
    series: book.seriesSlug,
    book: book.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/books/[series]/[book]">,
): Promise<Metadata> {
  const { series: seriesSlug, book: bookSlug } = await props.params;
  const book = await getBook(seriesSlug, bookSlug);
  if (!book) return {};

  const series = await getSeriesBySlug(seriesSlug);

  return {
    title: `${book.title} | Giggle Tree Books`,
    description:
      book.description ??
      `${book.title} — part of the ${series?.title ?? "Giggle Tree"} series.`,
  };
}

export default async function BookPage(
  props: PageProps<"/books/[series]/[book]">,
) {
  const { series: seriesSlug, book: bookSlug } = await props.params;

  const [book, series, siblings, printables] = await Promise.all([
    getBook(seriesSlug, bookSlug),
    getSeriesBySlug(seriesSlug),
    getBooksBySeries(seriesSlug),
    getPrintablesBySeries(seriesSlug),
  ]);

  if (!book || !series) notFound();

  /* Seed order is the reading order from the master book folders. */
  const position = siblings.findIndex((item) => item.slug === book.slug) + 1;
  const others = siblings.filter((item) => item.slug !== book.slug);
  /* Renders nothing until a cutout exists; the build logs what's missing. */
  const character = resolveCharacter(seriesSlug, book.title);

  return (
    <>
      <PageHero
        environment={series.environment}
        breadcrumb={
          <Breadcrumb
            trail={[
              { href: "/books", label: "Books" },
              { href: `/books/${series.slug}`, label: series.title },
              { label: book.title },
            ]}
          />
        }
        eyebrow={series.title}
        title={book.title}
        description={book.description}
        aside={
          <div className="relative">
            <BookCoverFrame book={book} />
            {character && (
              <Character
                character={character}
                priority
                /* Beside the book, standing on the same ground line. */
                className="pointer-events-none absolute -right-6 -bottom-4 h-40 w-32 sm:-right-10 sm:h-52 sm:w-40 lg:-right-16 lg:h-64 lg:w-48"
              />
            )}
          </div>
        }
      >
        <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Detail label="Series">
            <Link
              href={`/books/${series.slug}`}
              className="rounded font-medium text-brand transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {series.title}
            </Link>
          </Detail>
          {position > 0 && (
            <Detail label="In the series">
              Book {position} of {siblings.length}
            </Detail>
          )}
          {book.ageRange && <Detail label="Reading age">{book.ageRange}</Detail>}
        </dl>
      </PageHero>

      {book.description && (
        <Section title="About this book">
          <p className="max-w-3xl text-lg leading-relaxed text-muted text-pretty">
            {book.description}
          </p>
        </Section>
      )}

      <Section
        title={`More from ${series.title}`}
        description={`The other ${others.length} ${
          others.length === 1 ? "title" : "titles"
        } in this series.`}
        emptyMessage={`${series.title} has no other titles yet.`}
      >
        {others.length > 0 ? <BookGrid books={others} /> : undefined}
      </Section>

      <Section
        title="Free printables"
        description={`Activity sheets that pair with the ${series.title} books.`}
        emptyMessage={`Printables for ${series.title} are on the way.`}
      >
        {printables.length > 0 ? (
          <PrintableGrid printables={printables} />
        ) : undefined}
      </Section>
    </>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-medium">{children}</dd>
    </div>
  );
}
