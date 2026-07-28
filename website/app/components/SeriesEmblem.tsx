import Book3D from "@/app/components/book/Book3D";
import { LogoWatermark } from "@/app/components/Logo";
import { type Series } from "@/app/lib/series";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

/** Series artwork for page headers: its first book, at display size. */
export default function SeriesEmblem({ series }: { series: Series }) {
  const tint = slugTint(series.slug);

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-border bg-brand-soft/60" />
      <div
        className="relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-[2rem] border border-border px-8 pt-10 pb-12 shadow-[0_24px_60px_-32px_rgb(59_28_0_/_0.4)]"
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {series.coverImage ? (
          <Book3D
            cover={series.coverImage}
            title={series.title}
            tintSlug={series.slug}
            sizes="(min-width: 1024px) 16rem, 55vw"
            priority
          />
        ) : (
          <>
            <LogoWatermark className="absolute -right-12 -bottom-14 h-56 w-auto opacity-[0.08]" />
            <span
              aria-hidden
              className="font-display text-7xl font-semibold tracking-tight sm:text-8xl"
              style={{ color: tintInk(tint) }}
            >
              {series.title.charAt(0)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
