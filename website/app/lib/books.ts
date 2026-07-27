export type Book = {
  /** Folder name once scanning is wired up — also the URL segment. */
  slug: string;
  title: string;
  /** Matches a `Series.slug`; drives the placeholder cover tint. */
  seriesSlug: string;
  ageRange: string;
  description: string;
  /** Public path to cover artwork. Absent until the file exists. */
  coverImage?: string;
};

const PLACEHOLDER: Book[] = [
  {
    slug: "the-morning-rooster",
    title: "The Morning Rooster",
    seriesSlug: "farm-animals",
    ageRange: "3–5 years",
    description:
      "Someone has to wake the farm, and today it is not going smoothly.",
  },
  {
    slug: "where-the-woolly-sheep-went",
    title: "Where the Woolly Sheep Went",
    seriesSlug: "farm-animals",
    ageRange: "3–5 years",
    description: "One gap in the hedge, and the whole flock has an opinion.",
  },
  {
    slug: "duckling-counts-to-ten",
    title: "Duckling Counts to Ten",
    seriesSlug: "farm-animals",
    ageRange: "2–4 years",
    description: "A counting story that keeps losing track of number seven.",
  },
  {
    slug: "the-barn-at-night",
    title: "The Barn at Night",
    seriesSlug: "farm-animals",
    ageRange: "4–6 years",
    description: "After the lights go out, the barn is not nearly as quiet.",
  },
  {
    slug: "goat-on-the-roof",
    title: "Goat on the Roof",
    seriesSlug: "farm-animals",
    ageRange: "3–6 years",
    description: "Nobody knows how she got up there. She is not coming down.",
  },
  {
    slug: "where-the-lions-nap",
    title: "Where the Lions Nap",
    seriesSlug: "wild-animals",
    ageRange: "4–7 years",
    description:
      "A quiet afternoon on the savanna, told from the tall grass down.",
  },
  {
    slug: "the-tallest-neck",
    title: "The Tallest Neck",
    seriesSlug: "wild-animals",
    ageRange: "3–6 years",
    description: "A young giraffe discovers the trouble with seeing everything.",
  },
  {
    slug: "stripes-in-the-long-grass",
    title: "Stripes in the Long Grass",
    seriesSlug: "wild-animals",
    ageRange: "4–7 years",
    description: "Every zebra looks the same, until you know what to look for.",
  },
  {
    slug: "the-elephant-who-remembered",
    title: "The Elephant Who Remembered",
    seriesSlug: "wild-animals",
    ageRange: "5–8 years",
    description: "A herd walks an old route, and the eldest leads from memory.",
  },
];

/**
 * Async so the folder-scanning implementation can drop in behind it without
 * touching any component. Callers already await.
 */
export async function getBooks(): Promise<Book[]> {
  return PLACEHOLDER;
}

export async function getBooksBySeries(seriesSlug: string): Promise<Book[]> {
  return (await getBooks()).filter((book) => book.seriesSlug === seriesSlug);
}
