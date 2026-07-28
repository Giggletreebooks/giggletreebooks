"use client";

import { useEffect, useRef, useState } from "react";
import { observe } from "@/app/components/motion/observer";

/**
 * Fades and lifts its children in when they scroll into view.
 *
 * A client component, but children are passed through as a prop, so anything
 * wrapped in it stays a server component and ships no extra JS.
 *
 * The visual behaviour lives entirely in globals.css under `[data-reveal]`.
 * This only decides *when* to flip the attribute — so retuning the animation
 * is a CSS edit, and reduced-motion is handled globally rather than here.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  stagger,
  className,
}: {
  children: React.ReactNode;
  /** Element to render. Use "section"/"li" to avoid an extra wrapper div. */
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
  /** Position in a staggered group; delays this item by index * step. */
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || revealed) return;
    return observe(element, () => setRevealed(true));
  }, [revealed]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
      className={className}
      style={
        stagger === undefined
          ? undefined
          : ({ "--stagger": stagger } as React.CSSProperties)
      }
    >
      {children}
    </Tag>
  );
}
