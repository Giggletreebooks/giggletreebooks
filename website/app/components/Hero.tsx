import Link from "next/link";
import Chapter from "@/app/components/story/Chapter";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/app/lib/buttonStyles";
import HeroLogoVideo from "@/app/components/HeroLogoVideo";
import Reveal from "@/app/components/motion/Reveal";

export default function Hero() {
  return (
    <Chapter environment="forest" seamTop={false} seamBottom={false}>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 sm:gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
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

          {/* The logo carries the wordmark itself — no text beside it. */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-border bg-brand-soft/60" />
            {/*
              16:9 to match the animation, and overflow-hidden with no padding
              so the video fills the card edge to edge inside the rounded
              corners. bg-white because the artwork's dark ink needs a light
              ground and the video letterboxes to it while loading.
            */}
            <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_60px_-32px_rgb(59_28_0_/_0.4)]">
              <HeroLogoVideo />
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
