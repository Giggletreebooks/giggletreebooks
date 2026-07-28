import Link from "next/link";

export type Crumb = { href?: string; label: string };

/** Trail of ancestor links; the final crumb is the current page, unlinked. */
export default function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-x-2">
              {crumb.href && !last ? (
                <Link
                  href={crumb.href}
                  className="rounded transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>
                  {crumb.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="opacity-50">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
