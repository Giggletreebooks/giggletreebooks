import FeatureCard from "@/app/components/FeatureCard";
import StaggerItem from "@/app/components/motion/StaggerItem";
import { FEATURES } from "@/app/lib/features";

/**
 * Content only — the chapter around it supplies heading and framing.
 *
 * Flex-wrap rather than a grid: a short final row centres itself, so the
 * layout stays balanced whatever the feature count.
 */
export default function FeatureGrid() {
  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {FEATURES.map((feature, index) => (
        <StaggerItem
          key={feature.title}
          index={index}
          className="basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
        >
          <FeatureCard feature={feature} />
        </StaggerItem>
      ))}
    </ul>
  );
}
