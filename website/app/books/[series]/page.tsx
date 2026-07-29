import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookGrid from "@/app/components/BookGrid";
import FeatureCard from "@/app/components/FeatureCard";
import StaggerItem from "@/app/components/motion/StaggerItem";
import PageHero from "@/app/components/PageHero";
import PrintableGrid from "@/app/components/PrintableGrid";
import Section from "@/app/components/Section";
import SeriesEmblem from "@/app/components/SeriesEmblem";
import SeriesGrid from "@/app/components/SeriesGrid";
import { getBooksBySeries } from "@/app/lib/books";
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

export default async function SeriesPage(props: PageProps<"/books/[series]">) {
  const { series: slug } = await props.params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  const [books, printables, allSeries] = await Promise.all([
    getBooksBySeries(slug),
    getPrintablesBySeries(slug),
    getSeries(),
  ]);

  const available = series.status === "available";
  const learnings = series.learnings ?? DEFAULT_LEARNINGS;
  const others = allSeries.filter((item) => item.slug !== slug);

  return (
    <>
      <PageHero
        environment={series.environment}
        eyebrow={available ? "Series" : "Coming soon"}
        title={series.title}
        description={series.description}
        aside={<SeriesEmblem series={series} />}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium">
          {available
            ? `${series.bookCount} ${series.bookCount === 1 ? "book" : "books"} in this series`
            : "In progress — first titles on the way"}
        </p>
      </PageHero>

      <Section title="About this series">
        <p className="max-w-3xl text-lg leading-relaxed text-muted text-pretty">
          {series.about ?? series.description}
        </p>
      </Section>

      <Section
        title="What children will learn"
        description={`What the ${series.title} books build, beyond the story itself.`}
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
      </Section>

      <Section
        title={`All ${series.title} books`}
        description={
          available
            ? "Every title in the series, banded by reading age."
            : undefined
        }
        emptyMessage={`The first ${series.title} books are being written. Check back soon, or explore a series that's ready to read below.`}
      >
        {books.length > 0 ? <BookGrid books={books} /> : undefined}
      </Section>

      <Section
        title="Related free printables"
        description="Activity sheets that pair with this series."
        emptyMessage={`Printables for ${series.title} are on the way.`}
      >
        {printables.length > 0 ? (
          <PrintableGrid printables={printables} />
        ) : undefined}
      </Section>

      <Section
        title="Explore other series"
        description="More collections from across the Giggle Tree shelf."
      >
        <SeriesGrid series={others} />
      </Section>
    </>
  );
}
