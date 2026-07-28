import SeriesCard from "@/app/components/SeriesCard";
import StaggerItem from "@/app/components/motion/StaggerItem";
import { type Series } from "@/app/lib/series";

export default function SeriesGrid({ series }: { series: Series[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {series.map((item, index) => (
        <StaggerItem key={item.slug} index={index} className="flex">
          <SeriesCard series={item} />
        </StaggerItem>
      ))}
    </ul>
  );
}
