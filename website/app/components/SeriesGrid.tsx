import SeriesCard from "@/app/components/SeriesCard";
import { type Series } from "@/app/lib/series";

export default function SeriesGrid({ series }: { series: Series[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {series.map((item) => (
        <li key={item.slug} className="flex">
          <SeriesCard series={item} />
        </li>
      ))}
    </ul>
  );
}
