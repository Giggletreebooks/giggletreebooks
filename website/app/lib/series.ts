import { getBooks } from "@/app/lib/books";
import { SERIES_SEED, type SeriesSeed } from "@/app/lib/series-seed";

export {
  DEFAULT_LEARNINGS,
  type Learning,
  type SeriesStatus,
} from "@/app/lib/series-seed";

export type Series = SeriesSeed & {
  /** Derived from the books that belong to this series — never hand-set. */
  bookCount: number;
};

/**
 * Async so the folder-scanning implementation can drop in behind it without
 * touching any component. Callers already await.
 */
export async function getSeries(): Promise<Series[]> {
  const books = await getBooks();

  return SERIES_SEED.map((seed) => {
    const own = books.filter((book) => book.seriesSlug === seed.slug);
    return {
      ...seed,
      bookCount: own.length,
      /* The first book's cover stands in unless the series names its own. */
      coverImage: seed.coverImage ?? own[0]?.coverImage,
    };
  });
}

export async function getSeriesBySlug(
  slug: string,
): Promise<Series | undefined> {
  return (await getSeries()).find((series) => series.slug === slug);
}
