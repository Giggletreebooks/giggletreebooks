import type { Metadata } from "next";
import FilterBar from "@/app/components/FilterBar";
import PageHero from "@/app/components/PageHero";
import PrintableGrid from "@/app/components/PrintableGrid";
import Section from "@/app/components/Section";
import SeriesGrid from "@/app/components/SeriesGrid";
import Stat from "@/app/components/Stat";
import {
  getCategories,
  getFeaturedPrintables,
  getPrintables,
  getRecentPrintables,
} from "@/app/lib/printables";
import { getSeries } from "@/app/lib/series";

export const metadata: Metadata = {
  title: "Free Printables | Giggle Tree Books",
  description:
    "Free coloring pages, activity sheets, worksheets, and games to accompany every Giggle Tree series. Made for parents, teachers, and homeschoolers.",
};

export default async function PrintablesPage() {
  const [printables, categories, featured, recent, series] = await Promise.all([
    getPrintables(),
    getCategories(),
    getFeaturedPrintables(3),
    getRecentPrintables(3),
    getSeries(),
  ]);

  /* Series that actually have sheets attached — derived, never hand-listed. */
  const linked = new Set(printables.map((p) => p.seriesSlug).filter(Boolean));
  const relatedSeries = series.filter((item) => linked.has(item.slug));

  return (
    <>
      <PageHero
        eyebrow="Free to download"
        title="Printables to go with every book."
        description="Coloring pages, activity sheets, worksheets, and games that pick up where the story leaves off. Free for parents, teachers, and homeschoolers — no account, no sign-up."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <Stat value={printables.length} label="Printables available" />
          <Stat value={categories.length} label="Categories" />
          <Stat value={relatedSeries.length} label="Series covered" />
        </dl>
      </PageHero>

      <Section
        title="Featured printables"
        description="A good place to start if you're not sure what to print first."
      >
        <PrintableGrid printables={featured} />
      </Section>

      <Section
        title="Browse by category"
        description={`All ${printables.length} sheets, free to download and print at home or in class.`}
      >
        <FilterBar
          searchLabel="Search printables"
          searchPlaceholder="Search printables by title, category, or series"
          sortOptions={[
            { value: "newest", label: "Newest first" },
            { value: "title", label: "Title A–Z" },
            { value: "category", label: "Category" },
          ]}
          allLabel="All printables"
          chips={categories.map((category) => ({
            key: category.name,
            label: category.name,
            count: category.count,
          }))}
        />
        <PrintableGrid printables={printables} />
      </Section>

      <Section
        title="Recently added"
        description="The newest sheets on the shelf."
      >
        <PrintableGrid printables={recent} />
      </Section>

      <Section
        title="Related book series"
        description="The series these printables were built to accompany."
      >
        <SeriesGrid series={relatedSeries} />
      </Section>
    </>
  );
}
