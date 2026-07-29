import type { CSSProperties } from "react";
import EnvironmentScene from "@/app/components/story/EnvironmentScene";
import { environmentFor, type EnvironmentId } from "@/app/lib/environments";

/**
 * One chapter of the journey: a full world with its own palette, its own
 * living environment, and seams that dissolve into the chapters either side.
 *
 * `from` is what makes the page continuous. Without it a chapter fades out to
 * page background and the next fades in from it, which reads as two boxes with
 * a gap. Given the previous world's sky, the top seam fades directly out of
 * that colour and the two worlds cross-dissolve instead.
 *
 * The palette is applied inline from the registry rather than via a CSS class,
 * so a world is defined in exactly one place.
 */
export default function Chapter({
  environment,
  /** The world above this one. Omit for the first chapter on a page. */
  from,
  seamTop = true,
  seamBottom = true,
  className,
  children,
}: {
  environment: EnvironmentId;
  from?: EnvironmentId;
  seamTop?: boolean;
  seamBottom?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const env = environmentFor(environment);
  const previous = from ? environmentFor(from) : undefined;

  return (
    <section
      data-chapter=""
      data-environment={env.id}
      aria-label={env.label}
      className={className}
      style={
        {
          "--env-sky": env.palette.sky,
          "--env-haze": env.palette.haze,
          "--env-foliage": env.palette.foliage,
          "--env-ground": env.palette.ground,
          "--env-accent": env.palette.accent,
          ...(previous && { "--from-sky": previous.palette.sky }),
        } as CSSProperties
      }
    >
      <EnvironmentScene environment={env} />
      {seamTop && <div data-chapter-seam="top" aria-hidden />}
      <div className="relative z-[2]">{children}</div>
      {seamBottom && <div data-chapter-seam="bottom" aria-hidden />}
    </section>
  );
}
