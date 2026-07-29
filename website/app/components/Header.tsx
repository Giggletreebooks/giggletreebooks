import Link from "next/link";
import Logo from "@/app/components/Logo";

const nav = [
  { href: "/books", label: "Books" },
  { href: "/printables", label: "Free Printables" },
];

/**
 * The masthead.
 *
 * Printed on the page rather than bolted above it: no rule under it, and no
 * plate under the logo. A hairline border drew a hard line across the top of
 * the illustration, which is the one thing a storybook page never has — so the
 * bar dissolves downward into the scene instead, the same seam trick the
 * chapters use on each other.
 *
 * The backdrop blur is not decoration. The paper is 8% transparent so the bar
 * still feels part of the page; without the blur, book titles scrolling under
 * it read straight through.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background">
      {/* The bar has no bottom edge, it just stops being paper. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-16"
        style={{
          background:
            "linear-gradient(to bottom, var(--background), transparent)",
        }}
      />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-2 sm:py-2.5">
        <Link
          href="/"
          aria-label="Giggle Tree Books, home"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {/* No plate. The artwork is transparent and its greens and browns
              are dark — it sits on warm paper perfectly well, and the white
              rounded plate made the brand read as an app icon. */}
          {/* Larger than it was on the plate: the plate's padding and ring
              gave it presence the bare artwork has to carry itself. */}
          <Logo
            className="h-16 w-auto sm:h-20"
            sizes="(min-width: 640px) 80px, 64px"
            priority
          />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-5 text-sm font-medium text-muted sm:gap-x-6">
            {nav.map(({ href, label }) => (
              <li key={href}>
                {/* min-h-11 keeps the tap target at 44px without growing the bar. */}
                {/* Underlined on hover rather than boxed or filled: a drawn
                    line belongs on a printed page, a button does not. */}
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center rounded underline-offset-8 decoration-1 transition-colors hover:text-brand hover:underline hover:decoration-brand/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
