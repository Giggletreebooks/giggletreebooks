import Link from "next/link";
import PrintableGrid from "@/app/components/PrintableGrid";
import Section from "@/app/components/Section";
import { getPrintables } from "@/app/lib/printables";

export default async function FreePrintables({ limit }: { limit?: number }) {
  const printables = await getPrintables();
  const shown = limit ? printables.slice(0, limit) : printables;

  return (
    <Section
      title="Free Printables"
      description="Coloring pages, activity sheets, and reading companions — free to download for home or the classroom."
    >
      <PrintableGrid printables={shown} />

      <div className="mt-12 flex justify-center">
        <Link
          href="/printables"
          className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-background shadow-sm transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          View All Printables
        </Link>
      </div>
    </Section>
  );
}
