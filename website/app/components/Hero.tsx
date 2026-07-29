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
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent uppercase">
              <span className="size-1.5 rounded-full bg-accent" />
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
          */}
          <div
            data-hero-stage=""
            className="relative mx-auto w-full max-w-md sm:max-w-xl lg:mx-0 lg:max-w-2xl"
          >
            {/* Soft light behind the glass, bleeding past its edges. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[50%] blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, var(--env-haze), transparent 78%)",
                opacity: 0.9,
              }}
            />
            {/* Two offset plates behind the stage, for physical depth. */}
            <div
              aria-hidden
              className="absolute inset-0 -rotate-3 rounded-[2.75rem] border border-border/70"
              style={{ background: "var(--env-sky)", opacity: 0.75 }}
            />
            <div
              aria-hidden
              className="absolute inset-0 rotate-2 rounded-[2.75rem] border border-border/50 bg-white/60"
            />

            {/* The frame itself: a warm mat around the picture. */}
            <div className="relative rounded-[2.75rem] border border-border bg-gradient-to-b from-white to-brand-soft/40 p-2.5 shadow-[0_40px_80px_-32px_rgb(59_28_0_/_0.45)] sm:p-3">
              <div className="relative aspect-5/4 overflow-hidden rounded-[2rem] bg-white ring-1 ring-black/5">
                <HeroLogoVideo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
