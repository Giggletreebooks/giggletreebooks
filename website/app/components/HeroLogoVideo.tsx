"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/app/components/Logo";
import { logoAnimation } from "@/app/lib/assets";

/**
 * The animated logo in the hero card.
 *
 * The static logo is always rendered underneath, optimised through
 * `next/image`. It paints immediately, so the card is never empty while the
 * video loads, and it is what remains if the video fails — which means the
 * fallback needs no separate error artwork and no `poster` attribute. A poster
 * would be the raw 2.3MB PNG, since `next/image` cannot optimise that path.
 *
 * The video fades in once it can actually play, so a slow connection shows the
 * logo rather than a black rectangle.
 */
export default function HeroLogoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    /* React can drop `muted` from the server-rendered markup, and an unmuted
       video is refused autoplay. Setting it on the element is the reliable fix. */
    video.muted = true;

    /* Autoplay may still be refused by policy — not an error worth showing,
       the static logo is already visible underneath. */
    void video.play().catch(() => {});
  }, [failed, reducedMotion]);

  const showVideo = !failed && !reducedMotion;

  return (
    <div className="relative h-full w-full">
      <Logo
        className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8"
        sizes="(min-width: 1024px) 28rem, 90vw"
        priority
      />

      {showVideo && (
        <video
          ref={ref}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={logoAnimation.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
