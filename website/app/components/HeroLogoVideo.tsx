"use client";

import { useEffect, useRef, useState } from "react";
import { logoAnimation } from "@/app/lib/assets";

/**
 * The animated logo. Always the video — there is no swap to a different asset.
 *
 * The poster is a frame lifted from the animation itself (its final, fully
 * drawn lockup), so the card paints instantly and still shows the brand if the
 * video never arrives. It is the same artwork, not a substitute for it.
 *
 * Reduced motion gets the animation held on that final frame rather than
 * looping: the logo is fully present, it simply doesn't move. Removing it
 * entirely would cost those visitors the brand, and playing it would ignore a
 * preference they have set deliberately.
 */
/** Feathers all four edges so the artwork has no boundary, only a falloff. */
const FEATHER = [
  "linear-gradient(to right, transparent 0, #000 15%, #000 85%, transparent 100%)",
  /* The bottom fades earliest and longest: the artwork has its own ground
     shadow down there, which is the one part dark enough to survive multiply
     and draw a visible edge. */
  "linear-gradient(to bottom, transparent 0, #000 9%, #000 74%, transparent 100%)",
].join(", ");

export default function HeroLogoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
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

    /* React can drop `muted` from server-rendered markup, and an unmuted video
       is refused autoplay. Setting it on the element is the reliable fix. */
    video.muted = true;

    if (reducedMotion) {
      video.pause();
      /* Hold the finished lockup. Seeking needs metadata, so wait for it. */
      const seekToEnd = () => {
        if (video.duration) video.currentTime = Math.max(0, video.duration - 0.05);
      };
      if (video.readyState >= 1) seekToEnd();
      else video.addEventListener("loadedmetadata", seekToEnd, { once: true });
      return;
    }

    /* Autoplay may still be refused by policy; the poster frame remains. */
    void video.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      autoPlay={!reducedMotion}
      loop={!reducedMotion}
      muted
      playsInline
      preload="metadata"
      poster={logoAnimation.poster}
      aria-label="Giggle Tree Books"
      role="img"
      tabIndex={-1}
      /* No fade-in: the poster is rendered by this element, so fading from
         zero would hide it and leave the frame blank while the video loads. */
      className="h-full w-full object-cover"
      /*
        The animation is drawn on white paper. Rather than hide that behind a
        card, two things dissolve it into the scene:

        `multiply` drops white to nothing — white multiplied by any backdrop is
        that backdrop — so the paper vanishes and only the artwork remains. It
        needs no isolating ancestor between here and the chapter, which is why
        Chapter drops its z-index when a chapter has no seams.

        The mask then feathers all four edges, because the paper is a warm
        off-white rather than pure white and multiply alone still leaves a
        faint rectangle. A small levels lift finishes clipping it.
      */
      style={{
        mixBlendMode: "multiply",
        filter: "brightness(1.075) contrast(1.02) saturate(1.05)",
        maskImage: FEATHER,
        WebkitMaskImage: FEATHER,
        maskComposite: "intersect",
      }}
    >
      <source src={logoAnimation.src} type="video/mp4" />
    </video>
  );
}
