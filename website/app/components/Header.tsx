import Link from "next/link";
import { LogoPlate } from "@/app/components/Logo";

const nav = [
  { href: "/books", label: "Books" },
  { href: "/printables", label: "Free Printables" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-2 sm:py-2.5">
        <Link
          href="/"
          aria-label="Giggle Tree Books, home"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <LogoPlate
            className="h-14 w-auto sm:h-16"
            sizes="(min-width: 640px) 64px, 56px"
            padding="p-2 sm:p-2.5"
            priority
          />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-5 text-sm font-medium text-muted sm:gap-x-6">
            {nav.map(({ href, label }) => (
              <li key={href}>
                {/* min-h-11 keeps the tap target at 44px without growing the bar. */}
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
      </div>
    </header>
  );
}
