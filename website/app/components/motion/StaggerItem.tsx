import type { CSSProperties } from "react";

/**
 * A grid/list item that staggers in behind its nearest `Reveal` ancestor.
 *
 * Deliberately a server component: it only sets an attribute and a CSS
 * variable, so a 25-card grid costs one IntersectionObserver on the section
 * rather than one per card.
 */
export default function StaggerItem({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <li
      data-reveal-child=""
      className={className}
      style={{ "--stagger": index } as CSSProperties}
    >
      {children}
    </li>
  );
}
