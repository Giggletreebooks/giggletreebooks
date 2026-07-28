import DecorDots from "@/app/components/decor/DecorDots";
import DecorItem from "@/app/components/decor/DecorItem";
import DecorLayer from "@/app/components/decor/DecorLayer";

/**
 * The soft colour wash behind hero sections.
 *
 * Composed from decor primitives rather than hand-positioned divs, so new art
 * (leaves, clouds, butterflies) drops in as another `DecorItem` and animates
 * independently of everything else.
 */
export default function HeroBackdrop() {
  return (
    <DecorLayer>
      <DecorDots />
      <DecorItem
        float
        duration={11}
        drift="1.5rem"
        className="-top-24 -left-32 size-[26rem] rounded-full bg-brand-soft blur-3xl"
      />
      <DecorItem
        float
        duration={14}
        delay={-3}
        drift="1.5rem"
        className="top-32 -right-24 size-[22rem] rounded-full bg-accent-soft blur-3xl"
      />
    </DecorLayer>
  );
}
