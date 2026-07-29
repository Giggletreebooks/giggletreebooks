import Link from "next/link";
import BookGrid from "@/app/components/BookGrid";
import FeatureGrid from "@/app/components/FeatureGrid";
import Hero from "@/app/components/Hero";
import PrintableGrid from "@/app/components/PrintableGrid";
import SeriesGrid from "@/app/components/SeriesGrid";
import ChapterSection from "@/app/components/story/ChapterSection";
import { getBooks } from "@/app/lib/books";
import { BUTTON_PRIMARY } from "@/app/lib/buttonStyles";
import { getFeaturedPrintables } from "@/app/lib/printables";
import { getSeries } from "@/app/lib/series";

/**
 * The homepage is a journey rather than a stack of sections: five chapters,
 * each its own world, bleeding into one another through soft seams.
 *
 * Forest (arrival) → Farm (the worlds) → Library (the shelf) →
 * Meadow (printables) → Forest (why we make them)
 *
 * It closes back under the tree it opened beneath, which is what makes it read
 * as a round trip instead of a list.
 */
export default async function Home() {
  const [series, books, printables] = await Promise.all([
    getSeries(),
    getBooks(),
    getFeaturedPrintables(3),
  ]);

  const available = series.filter((item) => item.status === "available");

  return (
    <>
      <Hero />

      <ChapterSection
        environment="farm"
        index={2}
        title="Every series is a world of its own."
        description="Each collection has its own place, its own weather, and its own cast. Step into one and the whole page comes with you."
      >
        <SeriesGrid series={series.slice(0, 6)} />
      </ChapterSection>

      <ChapterSection
        environment="library"
        index={3}
        title="Books worth reading twice."
        description={`${books.length} titles across ${available.length} series, each one made to be read aloud, then read again.`}
      >
        <BookGrid books={books.slice(0, 4)} />
        <div className="mt-14 flex justify-center">
          <Link href="/books" className={BUTTON_PRIMARY}>
            Explore all {books.length} books
          </Link>
        </div>
      </ChapterSection>

      <ChapterSection
        environment="meadow"
        index={4}
        title="Something to do when the book closes."
        description="Coloring pages, activity sheets, and games that pick up where the story leaves off. Free, with no account and no sign-up."
      >
        <PrintableGrid printables={printables} />
        <div className="mt-14 flex justify-center">
          <Link href="/printables" className={BUTTON_PRIMARY}>
            Browse the printables
          </Link>
        </div>
      </ChapterSection>

      <ChapterSection
        environment="forest"
        index={5}
        title="Why families keep coming back."
        description="What parents, teachers, and small readers get out of every book on the shelf."
        seamBottom={false}
      >
        <FeatureGrid />
      </ChapterSection>
    </>
  );
}
