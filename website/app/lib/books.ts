import { resolveCover, slugify } from "@/app/lib/covers";
import { coverDirFor } from "@/app/lib/series-seed";

export type Book = {
  /** Derived from the title — also the URL segment. */
  slug: string;
  title: string;
  /** Matches a `Series.slug`; also selects the cover folder. */
  seriesSlug: string;
  /** Public path to cover artwork, resolved from the title. */
  coverImage?: string;
  /** Not yet supplied for the real catalogue; cards omit it when absent. */
  ageRange?: string;
  description?: string;
};

/**
 * Title and series only — everything else is derived. Order matches the
 * numbering on the master book folders. Adding a book is one line here plus
 * dropping `<Title>.png` into the series' covers folder.
 */
type BookSeed = Pick<Book, "title" | "seriesSlug"> &
  Partial<Pick<Book, "ageRange" | "description">>;

const SEED: BookSeed[] = [
  // Series 1 — Farm Animals
  { title: "Henrietta the Chicken", seriesSlug: "farm-animals" },
  { title: "Penelope the Pig", seriesSlug: "farm-animals" },
  { title: "Clara the Cow", seriesSlug: "farm-animals" },
  { title: "Sam the Sheep", seriesSlug: "farm-animals" },
  { title: "Toby the Horse", seriesSlug: "farm-animals" },
  { title: "Ducky the Duck", seriesSlug: "farm-animals" },
  { title: "Gilbert the Goat", seriesSlug: "farm-animals" },
  { title: "Whiskers the Barn Cat", seriesSlug: "farm-animals" },
  { title: "Daisy the Dog", seriesSlug: "farm-animals" },
  { title: "Danny the Donkey", seriesSlug: "farm-animals" },
  { title: "Tom the Turkey", seriesSlug: "farm-animals" },
  { title: "Rosie the Rabbit", seriesSlug: "farm-animals" },
  { title: "Gus the Goose", seriesSlug: "farm-animals" },

  // Series 2 — Wild Animals
  { title: "Ella the Elephant", seriesSlug: "wild-animals" },
  { title: "Leo the Lion", seriesSlug: "wild-animals" },
  { title: "Zuri the Zebra", seriesSlug: "wild-animals" },
  { title: "Gia the Giraffe", seriesSlug: "wild-animals" },
  { title: "Pippa the Panda", seriesSlug: "wild-animals" },
  { title: "Sunny the Sloth", seriesSlug: "wild-animals" },
  { title: "Kiki the Kangaroo", seriesSlug: "wild-animals" },
  { title: "Benny the Bear", seriesSlug: "wild-animals" },
  { title: "Mimi the Monkey", seriesSlug: "wild-animals" },
  { title: "Tia the Tiger", seriesSlug: "wild-animals" },
  { title: "Fia the Fox", seriesSlug: "wild-animals" },
  { title: "Koko the Koala", seriesSlug: "wild-animals" },
];

/**
 * Async so the folder-scanning implementation can drop in behind it without
 * touching any component. Callers already await.
 */
export async function getBooks(): Promise<Book[]> {
  return SEED.map((seed) => ({
    ...seed,
    slug: slugify(seed.title),
    coverImage: resolveCover(
      coverDirFor(seed.seriesSlug),
      seed.title,
      `book "${seed.title}" (${seed.seriesSlug})`,
    ),
  }));
}

export async function getBooksBySeries(seriesSlug: string): Promise<Book[]> {
  return (await getBooks()).filter((book) => book.seriesSlug === seriesSlug);
}
