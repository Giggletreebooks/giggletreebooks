import Link from "next/link";
import BookGrid from "@/app/components/BookGrid";
import FeatureGrid from "@/app/components/FeatureGrid";
import Hero from "@/app/components/Hero";
import PrintableGrid from "@/app/components/PrintableGrid";
import ChapterSection from "@/app/components/story/ChapterSection";
import { getBooksBySeries } from "@/app/lib/books";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/app/lib/buttonStyles";
import { getFeaturedPrintables } from "@/app/lib/printables";
import { getSeriesBySlug } from "@/app/lib/series";

/**
 * The homepage is one continuous story, not a stack of sections.
 *
 *   I   Welcome Forest   arrival, under the tree
 *   II  The Farm         the farm series and its books
 *   III The Wild         the wild series and its books
 *   IV  Reading Room     why the books are made the way they are
 *   V   The Meadow       printables
 *   VI  Evening          the closing chapter (in Footer)
 *
 * Each chapter passes its world to the next as `from`, so the seam between
 * them cross-dissolves out of the previous sky instead of both washing out to
 * page background — that is what removes the hard breaks.
 *
 * The two series chapters lead with books rather than series cards. The whole
 * page exists to get someone to a book, and a cover does that better than a
 * category tile.
 */
export default async function Home() {
  const [farm, wild, farmBooks, wildBooks, printables] = await Promise.all([
    getSeriesBySlug("farm-animals"),
    getSeriesBySlug("wild-animals"),
    getBooksBySeries("farm-animals"),
    getBooksBySeries("wild-animals"),
    getFeaturedPrintables(3),
  ]);

  return (
    <>
      <Hero />

      <ChapterSection
        environment="farm"
        from="forest"
        index={2}
        title="Down the path, the farm wakes up."
        description={`${farm?.bookCount ?? 0} stories about the animals a child meets first — the rooster who runs the morning, the goat who will not come down.`}
        action={
          <Link href="/books/farm-animals" className={BUTTON_SECONDARY}>
            Visit the Farm Animals series
          </Link>
        }
      >
        <BookGrid books={farmBooks.slice(0, 4)} />
      </ChapterSection>

      <ChapterSection
        environment="wildwood"
        from="farm"
        index={3}
        title="Past the fence, the trees close in."
        description={`${wild?.bookCount ?? 0} stories from further out, where the animals are bigger and the afternoons are longer.`}
        action={
          <Link href="/books/wild-animals" className={BUTTON_SECONDARY}>
            Visit the Wild Animals series
          </Link>
        }
      >
        <BookGrid books={wildBooks.slice(0, 4)} />
      </ChapterSection>

      <ChapterSection
        environment="library"
        from="wildwood"
        index={4}
        title="Every book is built to be read twice."
        description="What parents, teachers, and small readers get out of each one — beyond the story itself."
        action={
          <Link href="/books" className={BUTTON_PRIMARY}>
            Explore every book
          </Link>
        }
      >
        <FeatureGrid />
      </ChapterSection>

      <ChapterSection
        environment="meadow"
        from="library"
        index={5}
        title="And something to make when the book closes."
        description="Coloring pages, activity sheets, and games that carry the story off the page. Free, with no account and no sign-up."
        action={
          <Link href="/printables" className={BUTTON_PRIMARY}>
            Browse the printables
          </Link>
        }
        seamBottom={false}
      >
        <PrintableGrid printables={printables} />
      </ChapterSection>
    </>
  );
}
