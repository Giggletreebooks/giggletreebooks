import EnvironmentScene from "@/app/components/story/EnvironmentScene";
import { environmentFor, type EnvironmentId } from "@/app/lib/environments";

/**
 * One chapter of the journey: a full world with its own palette, its own
 * living environment, and soft seams that bleed into the chapters either side
 * so the page reads as one continuous place rather than stacked boxes.
 *
 * `data-environment` sets the palette; every layer inside reads those
 * variables. Changing a chapter's world is changing one prop.
 *
 * Content is a normal child, above the scene. Chapters compose — a chapter can
 * hold a hero, a grid, or a whole page's worth of sections.
 */
export default function Chapter({
  environment,
  /** Softens the join with the previous / next chapter. */
  seamTop = true,
  seamBottom = true,
  className,
  children,
}: {
  environment: EnvironmentId;
  seamTop?: boolean;
  seamBottom?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const env = environmentFor(environment);

  return (
    <section
      data-chapter=""
      data-environment={env.id}
      aria-label={env.label}
      className={className}
    >
      <EnvironmentScene environment={env} />
      {seamTop && <div data-chapter-seam="top" aria-hidden />}
      <div className="relative z-[2]">{children}</div>
      {seamBottom && <div data-chapter-seam="bottom" aria-hidden />}
    </section>
  );
}
