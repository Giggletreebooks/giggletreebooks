"use client";

import { useEffect } from "react";

/**
 * Inertial scrolling — the weighted glide that separates a cinematic site from
 * a normal one. Native scroll cannot do this, which is the only reason a
 * dependency is here at all.
 *
 * Lenis drives real window scroll position rather than transforming a wrapper,
 * so CSS scroll-driven parallax, `position: sticky`, anchor links, and the
 * browser's own scrollbar all keep working.
 *
 * Renders nothing. Mounted once in the root layout.
 */
export default function SmoothScroll() {
  useEffect(() => {
    /*
      Smooth scrolling is exactly the kind of motion that triggers nausea, and
      it hijacks a control the user owns. Anyone asking for reduced motion gets
      plain native scroll.
    */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    /* Dynamic import keeps Lenis out of the initial bundle. */
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        /* Long enough to glide, short enough not to feel laggy. */
        lerp: 0.09,
        wheelMultiplier: 1,
        /* Touch keeps native scrolling — phones already have their own inertia. */
        smoothWheel: true,
        syncTouch: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
