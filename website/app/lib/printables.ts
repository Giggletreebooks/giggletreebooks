export type Printable = {
  /** Folder name once scanning is wired up — also the URL segment. */
  slug: string;
  title: string;
  /** Free-form: the category list is derived from whatever appears here. */
  category: string;
  description: string;
  /** ISO date. File mtime once scanning is wired up; drives "Recently added". */
  addedAt: string;
  /** Matches a `Series.slug` when the sheet belongs to one. */
  seriesSlug?: string;
  /** Falls back to "most recent" when nothing is flagged. */
  featured?: boolean;
  /** Public path to a preview image. Absent until artwork exists. */
  thumbnail?: string;
  /** Public path to the PDF. Absent until the file is dropped in. */
  fileUrl?: string;
};

const PLACEHOLDER: Printable[] = [
  {
    slug: "farm-animal-coloring-pack",
    title: "Farm Animal Coloring Pack",
    category: "Coloring Pages",
    description: "Eight line-art scenes from the farmyard, ready to print.",
    addedAt: "2026-07-14",
    seriesSlug: "farm-animals",
    featured: true,
  },
  {
    slug: "farmyard-sound-matching",
    title: "Farmyard Sound Matching",
    category: "Matching Games",
    description: "Match each animal to the noise it makes, then act them out.",
    addedAt: "2026-07-02",
    seriesSlug: "farm-animals",
  },
  {
    slug: "egg-to-breakfast-sequencing",
    title: "Egg to Breakfast Sequencing",
    category: "Activity Sheets",
    description: "Six cards to cut out and put back in the right order.",
    addedAt: "2026-06-18",
    seriesSlug: "farm-animals",
  },
  {
    slug: "farm-animal-word-search",
    title: "Farm Animal Word Search",
    category: "Word Search",
    description: "Twelve farmyard words hidden in a grid, with an answer key.",
    addedAt: "2026-05-30",
    seriesSlug: "farm-animals",
  },
  {
    slug: "savanna-habitat-poster",
    title: "Savanna Habitat Poster",
    category: "Activity Sheets",
    description: "A labelled waterhole scene for the classroom wall.",
    addedAt: "2026-07-21",
    seriesSlug: "wild-animals",
    featured: true,
  },
  {
    slug: "big-cat-size-comparison",
    title: "Big Cat Size Comparison",
    category: "Worksheets",
    description:
      "Measure a lion, a cheetah, and yourself against the same line.",
    addedAt: "2026-07-08",
    seriesSlug: "wild-animals",
  },
  {
    slug: "wild-animal-word-search",
    title: "Wild Animal Word Search",
    category: "Word Search",
    description: "A harder grid for confident readers, savanna edition.",
    addedAt: "2026-06-05",
    seriesSlug: "wild-animals",
  },
  {
    slug: "lion-pride-matching-cards",
    title: "Lion Pride Matching Cards",
    category: "Matching Games",
    description: "Pair each adult with its cub across sixteen cards.",
    addedAt: "2026-05-12",
    seriesSlug: "wild-animals",
  },
  {
    slug: "book-club-discussion-guide",
    title: "Book Club Discussion Guide",
    category: "Books",
    description:
      "Ten open questions that work for any Giggle Tree title, plus notes.",
    addedAt: "2026-07-24",
    featured: true,
  },
  {
    slug: "series-reading-guide",
    title: "Series Reading Guide",
    category: "Books",
    description: "Suggested reading order and age bands for every series.",
    addedAt: "2026-06-28",
  },
  {
    slug: "reading-together-chart",
    title: "Reading Together Chart",
    category: "Activity Sheets",
    description: "A four-week chart for logging books read at home or in class.",
    addedAt: "2026-06-11",
  },
  {
    slug: "story-prompt-cards",
    title: "Story Prompt Cards",
    category: "Worksheets",
    description: "Twelve openings to get a reluctant storyteller started.",
    addedAt: "2026-05-22",
  },
];

/**
 * Async so the folder-scanning implementation can drop in behind it without
 * touching any component. Callers already await.
 */
export async function getPrintables(): Promise<Printable[]> {
  return PLACEHOLDER;
}

export async function getPrintablesBySeries(
  seriesSlug: string,
): Promise<Printable[]> {
  return (await getPrintables()).filter(
    (printable) => printable.seriesSlug === seriesSlug,
  );
}

/** Newest first. */
export async function getRecentPrintables(limit?: number): Promise<Printable[]> {
  const sorted = [...(await getPrintables())].sort((a, b) =>
    b.addedAt.localeCompare(a.addedAt),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Flagged printables, falling back to the most recent so this is never empty. */
export async function getFeaturedPrintables(
  limit = 3,
): Promise<Printable[]> {
  const flagged = (await getPrintables()).filter((p) => p.featured);
  return flagged.length > 0
    ? flagged.slice(0, limit)
    : getRecentPrintables(limit);
}

export type Category = { name: string; count: number };

/**
 * Derived from the printables themselves, so a sheet in a brand-new category
 * adds its filter chip with no code change.
 */
export async function getCategories(): Promise<Category[]> {
  const counts = new Map<string, number>();
  for (const { category } of await getPrintables()) {
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
