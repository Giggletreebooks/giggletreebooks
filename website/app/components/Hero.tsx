import Link from "next/link";
import Chapter from "@/app/components/story/Chapter";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/app/lib/buttonStyles";
import HeroLogoVideo from "@/app/components/HeroLogoVideo";
import Reveal from "@/app/components/motion/Reveal";
import { resolveHeroPlate } from "@/app/lib/heroPlate";

export default function Hero() {
  /*
    Resolved from disk, not from a flag. Drop public/hero/plate.webp in and the
    Hero becomes one painted illustration with only the moving pieces layered
    over it; take it away and it rebuilds itself from the scenery layers. No
    component changes either way, and a missing file ships the previous design
    rather than a hole. See docs/hero-art-brief.md.
  */
  const plate = resolveHeroPlate();

  return (
    <Chapter
      environment="forest"
      seamTop={false}
      seamBottom={false}
      plate={plate}
    >

      {/* max-w-6xl, like the masthead and every chapter below. At 7xl the
          headline sat 64px left of everything else on the page, including the
          logo directly above it. */}
      {/* Tall enough to be somewhere rather than something to scroll past.
          The scene needs room above and below the content for the sky and the
          ground to read as distance. */}
      <div className="mx-auto flex min-h-[86vh] max-w-6xl items-center px-6 py-16 sm:py-24 lg:py-28">
        {/* The media column carries more weight than the text so the logo can
            grow without the headline losing its measure. */}
        <div className="grid w-full items-center gap-12 sm:gap-16 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16 xl:gap-20">
          {/* Only the text column reveals — the logo card is the LCP element
              and fading it in would delay Largest Contentful Paint. */}
          <Reveal>
            {/* Warm and translucent, not a bordered white chip: a hard-edged
                white pill on painted ground is the most product-page thing on
                the page, and it sat directly above the headline. */}
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent uppercase ring-1 ring-[rgb(59_28_0_/_0.08)] backdrop-blur-[2px]">
              <span className="size-1.5 rounded-full bg-brand" />
              Independent children&rsquo;s publisher
            </p>

            <h1 className="mt-7 font-display text-[2.375rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Stories that take root.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted text-pretty sm:text-lg lg:text-xl">
              Beautifully made picture books and thoughtfully designed
              printables that turn reading time into the best part of the day.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/books"
                className={BUTTON_PRIMARY}
              >
                Explore Books
              </Link>
              <Link
                href="/printables"
                className={BUTTON_SECONDARY}
              >
                Free Printables
              </Link>
            </div>
          </Reveal>

          {/*
            The logo, standing in the scene.

            No card, no frame, no plate, no shadow under it. The animation is
            drawn on white paper; HeroLogoVideo dissolves that paper with a
            multiply blend and a feathered edge, so what lands on the page is
            the artwork alone with nothing round it. A frame was the last thing
            making this read as a video placed on a background rather than
            something growing in the world beside the trees.

            16:9 rather than the old 5:4 crop: with the paper invisible there
            is no reason to crop the lockup to fill a frame that no longer
            exists, so the whole illustration shows.
          */}
          <div
            data-hero-stage=""
            className="relative mx-auto w-full max-w-lg sm:max-w-2xl lg:mx-0 lg:max-w-none"
          >
            {/* Warm light gathering behind it, as though the clearing opens
                here. The only thing left that is not the artwork. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-16 -z-10 rounded-[50%] blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, var(--env-haze), transparent 74%)",
                opacity: 0.9,
              }}
            />

            <div className="relative aspect-video">
              <HeroLogoVideo />
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
