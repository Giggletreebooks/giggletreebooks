import Reveal from "@/app/components/motion/Reveal";
import Chapter from "@/app/components/story/Chapter";
import { environmentFor, type EnvironmentId } from "@/app/lib/environments";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * A chapter of the homepage journey: its own world, its own heading, and a
 * content slot.
 *
 * The heading names the world you have just walked into rather than labelling
 * a website section — "Chapter II · The Farm" instead of "Featured Series".
 * That framing is the whole point of the journey; the content underneath is
 * ordinary.
 *
 * Deliberately taller than an interior-page `Section`. Chapters need room to
 * breathe or the transition between worlds happens too fast to register.
 */
export default function ChapterSection({
  environment,
  from,
  index,
  title,
  description,
  action,
  seamTop = true,
  seamBottom = true,
  children,
}: {
  environment: EnvironmentId;
  /** The world above this one, so the seam cross-dissolves out of it. */
  from?: EnvironmentId;
  /** Position in the journey, rendered as a numeral. */
  index: number;
  title: string;
  description?: string;
  /** Closing call to action, spaced consistently across chapters. */
  action?: React.ReactNode;
  seamTop?: boolean;
  seamBottom?: boolean;
  children: React.ReactNode;
}) {
  const env = environmentFor(environment);

  return (
    <Chapter
      environment={environment}
      from={from}
      seamTop={seamTop}
      seamBottom={seamBottom}
    >
      <Reveal className="mx-auto max-w-6xl px-6 py-24 sm:py-28 lg:py-36">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-[0.18em] uppercase">
          <span style={{ color: "var(--env-accent)" }}>
            Chapter {NUMERALS[index - 1] ?? index}
          </span>
          <span aria-hidden className="opacity-30">
            ·
          </span>
          <span className="text-muted">{env.label}</span>
        </p>

        <h2 className="mt-5 max-w-3xl font-display text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
          {description ?? env.mood}
        </p>

        <div className="mt-12 lg:mt-16">{children}</div>
        {action && (
          <div className="mt-14 flex justify-center lg:mt-16">{action}</div>
        )}
      </Reveal>
    </Chapter>
  );
}
