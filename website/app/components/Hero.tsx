import Link from "next/link";
import Chapter from "@/app/components/story/Chapter";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/app/lib/buttonStyles";
import HeroLogoVideo from "@/app/components/HeroLogoVideo";
import Reveal from "@/app/components/motion/Reveal";

export default function Hero() {
  return (
    <Chapter environment="forest" seamTop={false} seamBottom={false}>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
        {/* The media column carries more weight than the text so the logo can
            grow without the headline losing its measure. */}
        <div className="grid items-center gap-12 sm:gap-16 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16 xl:gap-20">
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
            The logo stage. 5:4 crops the animation's wide framing so the
            lockup fills the frame, and the wider column lets it run to
            max-w-2xl — together about 40% larger than before.

            No mat, no plates, no border. A frame around an illustration makes
            the page read as a gallery of assets; the animation should sit in
            the world with the trees. All that is left is light behind it and
            a shadow under it, so it reads as resting in the scene rather than
            mounted on it.
          */}
          <div
            data-hero-stage=""
            className="relative mx-auto w-full max-w-md sm:max-w-xl lg:mx-0 lg:max-w-2xl"
          >
            {/* Soft light behind the glass, bleeding past its edges. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-12 -z-10 rounded-[50%] blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, var(--env-haze), transparent 76%)",
                opacity: 0.95,
              }}
            />

            {/*
              Contact shadow on the ground. Without it the card hangs in the
              air: the ambient shadow says "raised", only a shadow that meets
              the ground says "resting on something".
            */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 -bottom-6 -z-10 h-10 rounded-[50%] blur-2xl"
              style={{ background: "rgb(59 28 0 / 0.22)" }}
            />

            {/* The hairline is warm brown, not grey: black at any opacity
                reads cold against paper and puts a screen edge round the
                artwork. */}
            <div className="relative aspect-5/4 overflow-hidden rounded-[2.5rem] outline outline-[rgb(59_28_0_/_0.07)] -outline-offset-1 shadow-[0_28px_56px_-24px_rgb(59_28_0_/_0.34),0_2px_6px_-1px_rgb(59_28_0_/_0.10)]">
              <HeroLogoVideo />
              {/*
                The artwork is drawn on white; the page is warm paper. Feather
                the inside of the edge into the chapter's own haze so the two
                whites meet in a glow rather than on a line. This is most of
                what stops it reading as a screen set into a painting.
              */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2.5rem]"
                style={{ boxShadow: "inset 0 0 44px 14px var(--env-haze)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
