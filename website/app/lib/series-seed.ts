/**
 * Raw series data. Kept in its own module with no imports so that both
 * `books.ts` (which needs `coverDir` to resolve cover paths) and `series.ts`
 * (which needs book counts) can read it without a circular import.
 */

import type { EnvironmentId } from "@/app/lib/environments";

export type SeriesStatus = "available" | "coming-soon";

export type Learning = {
  title: string;
  description: string;
};

export type SeriesSeed = {
  /** URL segment. */
  slug: string;
  title: string;
  description: string;
  status: SeriesStatus;
  /**
   * Folder under `public/covers/` holding this series' artwork, e.g.
   * `series-1-farm-animals`. Omit until artwork exists — cards then fall back
   * to the placeholder panel.
   */
  coverDir?: string;
  /** The world this series lives in. Drives its page environment. */
  environment?: EnvironmentId;
  /** Longer blurb for the series page. Falls back to `description`. */
  about?: string;
  /** Falls back to `DEFAULT_LEARNINGS` so a new series renders without them. */
  learnings?: Learning[];
  /** Overrides the default of using the first book's cover. */
  coverImage?: string;
};

/** Used by any series that hasn't defined its own learning outcomes yet. */
export const DEFAULT_LEARNINGS: Learning[] = [
  {
    title: "Vocabulary",
    description:
      "New words introduced in context, repeated often enough to stick.",
  },
  {
    title: "Observation",
    description:
      "Details in the artwork that reward a second and third read-through.",
  },
  {
    title: "Empathy",
    description:
      "Characters with feelings worth talking about once the book is closed.",
  },
];

export const SERIES_SEED: SeriesSeed[] = [
  {
    slug: "farm-animals",
    environment: "farm",
    title: "Farm Animals",
    description: "Early mornings, muddy boots, and the friends who live nearby.",
    status: "available",
    coverDir: "series-1-farm-animals",
    about:
      "The farm is the first place most children meet an animal that isn't a pet. This series takes that meeting seriously — the noise of the yard at dawn, the size of a cow up close, the particular stubbornness of a goat. Every title is set across a single day or season, so the rhythm of the place does as much storytelling as the words do.",
    learnings: [
      {
        title: "Animal names and sounds",
        description:
          "The everyday farm vocabulary, introduced through repetition rather than labels.",
      },
      {
        title: "Where food comes from",
        description:
          "Eggs, milk, and wool traced back to the animal and the work involved.",
      },
      {
        title: "Counting and grouping",
        description:
          "Flocks, litters, and clutches give small numbers something to hold onto.",
      },
      {
        title: "Daily routines",
        description:
          "Morning, feeding, and bedtime map neatly onto a child's own day.",
      },
    ],
  },
  {
    slug: "wild-animals",
    environment: "savanna",
    title: "Wild Animals",
    description: "Big cats, tall grass, and the quiet moments in between.",
    status: "available",
    coverDir: "series-2-wild-animals",
    about:
      "Wild animals are usually drawn at their most dramatic — mid-roar, mid-chase. This series is interested in the other ninety per cent: the napping, the waiting, the walking. Children who already know a lion is fierce learn something more surprising about how it actually spends its day.",
    learnings: [
      {
        title: "Habitats",
        description:
          "Savanna, waterhole, and shade, and why an animal chooses each one.",
      },
      {
        title: "Animal families",
        description: "Herds, prides, and the different jobs within them.",
      },
      {
        title: "Patience and observation",
        description:
          "Stories where nothing rushes, modelling how watching actually works.",
      },
      {
        title: "Size and scale",
        description:
          "Comparisons a child can feel — taller than a door, heavier than a car.",
      },
    ],
  },
  {
    slug: "sea-animals",
    environment: "meadow",
    title: "Sea Animals",
    description: "Down past the shallows, where the light turns blue.",
    status: "coming-soon",
  },
  {
    slug: "birds",
    environment: "forest",
    title: "Birds",
    description: "Nests, migrations, and songs worth waking up for.",
    status: "coming-soon",
  },
  {
    slug: "dinosaurs",
    environment: "forest",
    title: "Dinosaurs",
    description: "Footprints the size of ponds, from a very long time ago.",
    status: "coming-soon",
  },
  {
    slug: "jungle-animals",
    environment: "forest",
    title: "Jungle Animals",
    description: "Vines, canopies, and voices calling through the leaves.",
    status: "coming-soon",
  },
  {
    slug: "pets",
    environment: "meadow",
    title: "Pets",
    description: "The small companions who share the sofa and the routine.",
    status: "coming-soon",
  },
  {
    slug: "insects",
    environment: "meadow",
    title: "Insects",
    description: "Six legs, busy work, and a whole world underfoot.",
    status: "coming-soon",
  },
];

/** Cover folder for a series slug, or undefined if it has no artwork yet. */
export function coverDirFor(seriesSlug: string): string | undefined {
  return SERIES_SEED.find((s) => s.slug === seriesSlug)?.coverDir;
}
