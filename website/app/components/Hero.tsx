import Link from "next/link";
import ForestScene from "@/app/components/decor/ForestScene";
import Logo from "@/app/components/Logo";
import Reveal from "@/app/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <ForestScene />

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
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-background shadow-sm transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Explore Books
              </Link>
              <Link
                href="/printables"
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-border bg-surface px-7 text-sm font-semibold transition-all duration-200 hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Free Printables
              </Link>
            </div>
          </Reveal>

          {/* The logo carries the wordmark itself — no text beside it. */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-border bg-brand-soft/60" />
            {/* bg-white, not bg-surface: the logo's dark ink needs a light ground in both themes. */}
            <div className="relative flex aspect-square items-center justify-center rounded-[2rem] border border-border bg-white p-8 shadow-[0_24px_60px_-32px_rgb(59_28_0_/_0.4)] sm:p-10">
              <Logo
                className="h-full w-full object-contain"
                sizes="(min-width: 640px) 28rem, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
