import Section from "@/app/components/Section";
import SeriesGrid from "@/app/components/SeriesGrid";
import { getSeries } from "@/app/lib/series";

export default async function FeaturedSeries({ limit }: { limit?: number }) {
  const series = await getSeries();
  const shown = limit ? series.slice(0, limit) : series;

  return (
    <Section
      title="Featured Series"
      description="Story collections to grow with, one book at a time."
    >
      <SeriesGrid series={shown} />
    </Section>
  );
}
