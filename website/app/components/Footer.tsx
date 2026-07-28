import Link from "next/link";
import { LogoPlate } from "@/app/components/Logo";
import Reveal from "@/app/components/motion/Reveal";

const nav = [
  { href: "/books", label: "Books" },
  { href: "/printables", label: "Free Printables" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="Giggle Tree Books, home">
          <LogoPlate
            className="h-24 w-auto sm:h-28"
            sizes="(min-width: 640px) 112px, 96px"
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
      </Reveal>
    </footer>
  );
}
