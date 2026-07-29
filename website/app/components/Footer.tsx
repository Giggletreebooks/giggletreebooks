import Link from "next/link";
import { LogoPlate } from "@/app/components/Logo";
import Reveal from "@/app/components/motion/Reveal";
import Chapter from "@/app/components/story/Chapter";

const nav = [
  { href: "/books", label: "Books" },
  { href: "/printables", label: "Free Printables" },
];

/**
 * The closing chapter. Evening under the tree — the journey ends where it
 * began rather than dropping off a hard edge into a footer bar.
 *
 * A chapter rather than a plain footer so every page, not just the homepage,
 * finishes inside the world.
 */
export default function Footer() {
  return (
    <footer>
      <Chapter environment="dusk" seamBottom={false}>
        <Reveal className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <p
            className="text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: "var(--env-accent)" }}
          >
            The end, for now
          </p>
          <p className="mt-5 max-w-lg font-display text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
            Small books for big imaginations.
          </p>

          <div className="mt-12 flex flex-col gap-8 border-t border-border/60 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" aria-label="Giggle Tree Books, home">
              <LogoPlate
                className="h-20 w-auto sm:h-24"
                sizes="(min-width: 640px) 96px, 80px"
                padding="p-3"
              />
            </Link>

            <div className="flex flex-col gap-4 sm:items-end">
              <nav aria-label="Footer">
                <ul className="flex flex-wrap items-center gap-x-6 text-sm font-medium text-muted">
                  {nav.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center rounded transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="text-sm text-muted">
                © {new Date().getFullYear()} Giggle Tree Books
              </p>
            </div>
          </div>
        </Reveal>
      </Chapter>
    </footer>
  );
}
