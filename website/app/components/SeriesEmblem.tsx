import Image from "next/image";
import { LogoWatermark } from "@/app/components/Logo";
import { type Series } from "@/app/lib/series";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

/** Large series artwork for page headers. Falls back to a tinted initial. */
export default function SeriesEmblem({ series }: { series: Series }) {
  const tint = slugTint(series.slug);

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-border bg-brand-soft/60" />
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-border shadow-[0_24px_60px_-32px_rgb(59_28_0_/_0.4)]"
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {series.coverImage ? (
          <Image
            src={series.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
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
