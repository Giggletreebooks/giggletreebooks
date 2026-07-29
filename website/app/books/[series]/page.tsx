import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookShowcase from "@/app/components/book/BookShowcase";
import FeatureCard from "@/app/components/FeatureCard";
import StaggerItem from "@/app/components/motion/StaggerItem";
import PageHero from "@/app/components/PageHero";
import PrintableGrid from "@/app/components/PrintableGrid";
import SeriesEmblem from "@/app/components/SeriesEmblem";
import SeriesGrid from "@/app/components/SeriesGrid";
import Character from "@/app/components/story/Character";
import ChapterSection from "@/app/components/story/ChapterSection";
import { getBooksBySeries } from "@/app/lib/books";
import { resolveCharacter } from "@/app/lib/characters";
import { environmentFor } from "@/app/lib/environments";
import { LEARNING_ICONS } from "@/app/lib/features";
import { getPrintablesBySeries } from "@/app/lib/printables";
import {
  DEFAULT_LEARNINGS,
  getSeries,
  getSeriesBySlug,
} from "@/app/lib/series";

/** Every series gets a static page, including the unreleased ones. */
export async function generateStaticParams() {
  return (await getSeries()).map(({ slug }) => ({ series: slug }));
}

export async function generateMetadata(
  props: PageProps<"/books/[series]">,
): Promise<Metadata> {
  const { series: slug } = await props.params;
  const series = await getSeriesBySlug(slug);
  if (!series) return {};

  return {
    title: `${series.title} | Giggle Tree Books`,
    description: series.description,
  };
}

/**
 * A series page is that series' world, not a catalogue page.
 *
 * The hero and the books share one continuous environment with no seam between
 * them, so a visitor arrives in the world and the books appear standing inside
 * it rather than in a separate section below it. Only past the books does the
 * page hand off to other worlds.
 *
 * Everything a series contributes is configuration — environment, palette,
 * decorations, greeting character. No series-specific code anywhere.
 */
export default async function SeriesPage(props: PageProps<"/books/[series]">) {
  const { series: slug } = await props.params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  const [books, printables, allSeries] = await Promise.all([
    getBooksBySeries(slug),
    getPrintablesBySeries(slug),
    getSeries(),
  ]);

  const env = environmentFor(series.environment);
  const available = series.status === "available";
  const learnings = series.learnings ?? DEFAULT_LEARNINGS;
  const others = allSeries.filter((item) => item.slug !== slug);

  /* Renders nothing until a cutout exists; the build logs what's missing. */
  const greeter = books.length
    ? resolveCharacter(slug, series.featuredCharacter ?? books[0].title)
    : undefined;

  return (
    <>
      <PageHero
        environment={series.environment}
        eyebrow={available ? env.label : "Coming soon"}
        title={series.title}
        description={series.about ?? series.description}
        seamBottom={false}
        aside={
          <div className="relative">
            <SeriesEmblem series={series} />
            {greeter && (
              <Character
                character={greeter}
                priority
                duration={7}
                className="pointer-events-none absolute -right-4 -bottom-6 h-36 w-28 sm:-right-8 sm:h-48 sm:w-36 lg:-right-12 lg:h-56 lg:w-44"
              />
            )}
          </div>
        }
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium">
          {available
            ? `${series.bookCount} ${series.bookCount === 1 ? "book" : "books"} in this series`
            : "In progress — first titles on the way"}
        </p>
      </PageHero>

      {/* Same world, no seam: the books stand in the environment above them. */}
      <ChapterSection
        environment={series.environment ?? "forest"}
        eyebrow="The books"
        title={
          available
            ? `Every ${series.title} story.`
            : `${series.title} is being written.`
        }
        description={available ? env.mood : undefined}
        seamTop={false}
      >
        {books.length > 0 ? (
          <BookShowcase books={books} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted text-pretty">
            The first {series.title} books are on the way. Explore a series
            that&rsquo;s ready to read below.
          </p>
        )}
      </ChapterSection>

      <ChapterSection
        environment="library"
        from={series.environment}
        eyebrow="What they take away"
        title={`What the ${series.title} books build.`}
        description="Beyond the story itself."
      >
        {/* Flex-wrap so a short final row centres itself at any count. */}
        <ul className="flex flex-wrap justify-center gap-6">
          {learnings.map((learning, index) => (
            <StaggerItem
              key={learning.title}
              index={index}
              className="basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
            >
              <FeatureCard
                feature={{
                  ...learning,
                  icon: LEARNING_ICONS[index % LEARNING_ICONS.length],
                }}
              />
            </StaggerItem>
          ))}
        </ul>
      </ChapterSection>

      {printables.length > 0 && (
        <ChapterSection
          environment="meadow"
          from="library"
          eyebrow="To print"
          title="Sheets that pair with these books."
          description="Free to download for home or the classroom."
        >
          <PrintableGrid printables={printables} />
        </ChapterSection>
      )}

      <ChapterSection
        environment="forest"
        from={printables.length > 0 ? "meadow" : "library"}
        eyebrow="Elsewhere"
        title="Other worlds to visit."
        description="More collections from across the Giggle Tree shelf."
        seamBottom={false}
      >
        <SeriesGrid series={others} />
      </ChapterSection>
    </>
  );
}
