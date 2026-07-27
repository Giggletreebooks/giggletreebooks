import type { Metadata } from "next";
import BookGrid from "@/app/components/BookGrid";
import FilterBar from "@/app/components/FilterBar";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/Section";
import SeriesGrid from "@/app/components/SeriesGrid";
import Stat from "@/app/components/Stat";
import { getBooks } from "@/app/lib/books";
import { getSeries } from "@/app/lib/series";

export const metadata: Metadata = {
  title: "Books | Giggle Tree Books",
  description:
    "Every Giggle Tree picture book, grouped by series and banded by reading age.",
};

export default async function BooksPage() {
  const [books, series] = await Promise.all([getBooks(), getSeries()]);
  const available = series.filter((item) => item.status === "available");

  return (
    <>
      <PageHero
        eyebrow="The bookshelf"
        title="Every Giggle Tree book, in one place."
        description="Browse by series or scroll the full shelf. Each title is banded by reading age, so you always know what fits."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <Stat value={books.length} label="Books in print" />
          <Stat value={available.length} label="Series available" />
          <Stat
            value={series.length - available.length}
            label="Series in progress"
          />
        </dl>
      </PageHero>

      <Section
        title="Browse by series"
        description="Collections grow over time — released series are ready to read, the rest are on the way."
      >
        <SeriesGrid series={series} />
      </Section>

      <Section
        title="All books"
        description={`${books.length} titles across ${available.length} series.`}
      >
        <FilterBar
          searchLabel="Search books"
          searchPlaceholder="Search titles, series, or age range"
          sortOptions={[
            { value: "newest", label: "Newest first" },
            { value: "title", label: "Title A–Z" },
            { value: "age", label: "Reading age" },
          ]}
          allLabel="All books"
          chips={available.map((item) => ({
            key: item.slug,
            label: item.title,
            count: item.bookCount,
          }))}
        />
        <BookGrid books={books} />
      </Section>
    </>
  );
}
