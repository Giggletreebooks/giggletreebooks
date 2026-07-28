import FeatureCard from "@/app/components/FeatureCard";
import StaggerItem from "@/app/components/motion/StaggerItem";
import Section from "@/app/components/Section";
import { FEATURES } from "@/app/lib/features";

export default function WhyGiggleTree() {
  return (
    <Section
      title="Why choose Giggle Tree"
      description="What parents, teachers, and small readers get out of every book on the shelf."
    >
      {/* Flex-wrap rather than a grid: a short final row centres itself, so the
          layout stays balanced whatever the feature count. */}
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
    </Section>
  );
}
