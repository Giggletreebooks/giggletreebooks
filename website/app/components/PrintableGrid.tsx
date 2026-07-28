import PrintableCard from "@/app/components/PrintableCard";
import StaggerItem from "@/app/components/motion/StaggerItem";
import { type Printable } from "@/app/lib/printables";

export default function PrintableGrid({
  printables,
}: {
  printables: Printable[];
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {printables.map((printable, index) => (
        <StaggerItem key={printable.slug} index={index} className="flex">
          <PrintableCard printable={printable} />
        </StaggerItem>
      ))}
    </ul>
  );
}
