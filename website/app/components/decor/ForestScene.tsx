import Cloud from "@/app/components/decor/art/Cloud";
import Flower from "@/app/components/decor/art/Flower";
import Grass from "@/app/components/decor/art/Grass";
import Leaf from "@/app/components/decor/art/Leaf";
import Tree from "@/app/components/decor/art/Tree";
import DecorItem from "@/app/components/decor/DecorItem";
import DecorLayer from "@/app/components/decor/DecorLayer";

/**
 * The living forest behind hero sections.
 *
 * Built back-to-front in depth layers — sky, clouds, distant treeline,
 * mid-ground trees, drifting leaves, then the ground. Depth is conveyed by
 * scale and opacity rather than blur, which is far cheaper to composite.
 *
 * Adding a butterfly, a mushroom, a bird: write the SVG in `art/`, drop it in
 * a `DecorItem` at the right layer, pick a motion. Nothing here restructures.
 *
 * Every animated piece gets its own duration and delay so nothing beats in
 * time with anything else — lockstep is what makes ambient motion feel
 * mechanical.
 *
 * `variant="band"` is the lighter mix for interior page headers, which are
 * shorter and shouldn't carry a full forest.
 */
export default function ForestScene({
  variant = "full",
}: {
  variant?: "full" | "band";
}) {
  const full = variant === "full";

  return (
    <DecorLayer>
      {/* Sky: a soft wash rather than a hard gradient band. */}
      <DecorItem className="inset-x-0 top-0 h-2/3 bg-gradient-to-b from-brand-soft/50 to-transparent" />

      {/* Warm light pooling at the edges. */}
      <DecorItem
        motion="float"
        duration={16}
        drift="1.25rem"
        className="-top-24 -left-32 size-[26rem] rounded-full bg-brand-soft/70 blur-3xl"
      />
      <DecorItem
        motion="float"
        duration={21}
        delay={-6}
        drift="1rem"
        className="top-24 -right-28 size-[22rem] rounded-full bg-accent-soft/70 blur-3xl"
      />

      {/* Clouds. Long, linear, unhurried — one crossing takes minutes. */}
      <DecorItem
        motion="drift"
        duration={150}
        delay={-40}
        className="top-[6%] left-0 w-40 text-surface opacity-70 sm:w-56"
      >
        <Cloud />
      </DecorItem>
      <DecorItem
        motion="drift"
        duration={210}
        delay={-120}
        className="top-[18%] left-0 w-28 text-surface opacity-50 sm:w-40"
      >
        <Cloud />
      </DecorItem>
      {full && (
        <DecorItem
          motion="drift"
          duration={180}
          delay={-90}
          className="top-[30%] left-0 hidden w-32 text-surface opacity-40 sm:block sm:w-44"
        >
          <Cloud />
        </DecorItem>
      )}

      {/* Distant treeline: small, pale, barely stirring. Positioned absolutely
          rather than in a flex row — DecorItem is always position:absolute. */}
      {full &&
        [
          { left: "3%", duration: 9 },
          { left: "16%", duration: 11 },
          { left: "29%", duration: 8 },
          { left: "42%", duration: 12 },
          { left: "57%", duration: 10 },
          { left: "71%", duration: 9.5 },
          { left: "86%", duration: 11.5 },
        ].map((tree, index) => (
          <DecorItem
            key={tree.left}
            motion="sway"
            duration={tree.duration}
            delay={-index * 1.7}
            angle="0.5deg"
            className="bottom-[7%] hidden h-16 w-12 text-brand opacity-[0.14] md:block lg:h-20 lg:w-16"
            style={{ left: tree.left }}
          >
            <Tree className="h-full w-full" />
          </DecorItem>
        ))}

      {/* Mid-ground trees, held to the outer edges so text stays clear. */}
      {full && (
        <>
          <DecorItem
            motion="sway"
            duration={9}
            angle="1.1deg"
            className="bottom-[4%] -left-10 hidden h-64 w-40 text-brand opacity-[0.22] lg:block xl:-left-4 xl:h-72 xl:w-48"
          >
            <Tree className="h-full w-full" />
          </DecorItem>
          <DecorItem
            motion="sway"
            duration={12}
            delay={-4}
            angle="0.9deg"
            className="-right-12 bottom-[4%] hidden h-56 w-36 text-brand opacity-[0.18] lg:block xl:-right-6 xl:h-64 xl:w-44"
          >
            <Tree className="h-full w-full" />
          </DecorItem>
        </>
      )}

      {/* Leaves. Staggered so one drifts past every few seconds, never a shower. */}
      {full &&
        [
          { left: "12%", duration: 26, delay: 0, x: "5rem", spin: "220deg" },
          { left: "34%", duration: 34, delay: -12, x: "-4rem", spin: "-180deg" },
          { left: "58%", duration: 29, delay: -22, x: "6rem", spin: "260deg" },
          { left: "78%", duration: 38, delay: -8, x: "-3rem", spin: "-200deg" },
          { left: "92%", duration: 31, delay: -30, x: "4rem", spin: "300deg" },
        ].map((leaf) => (
          <DecorItem
            key={leaf.left}
            motion="fall"
            duration={leaf.duration}
            delay={leaf.delay}
            fallX={leaf.x}
            fallDistance="30rem"
            spin={leaf.spin}
            opacity={0.4}
            className="top-0 h-4 w-4 text-brand sm:h-5 sm:w-5"
            style={{ left: leaf.left }}
          >
            <Leaf className="h-full w-full" />
          </DecorItem>
        ))}

      {/* Ground: a still band of grass with a few clumps and flowers stirring. */}
      <DecorItem className="inset-x-0 bottom-0 h-10 text-brand opacity-[0.16] sm:h-14">
        <Grass className="h-full w-full" />
      </DecorItem>

      {full && (
        <>
          {[
            { left: "6%", duration: 6, delay: 0, angle: "2deg" },
            { left: "44%", duration: 7.5, delay: -3, angle: "1.6deg" },
            { left: "82%", duration: 6.8, delay: -1.5, angle: "2.2deg" },
          ].map((tuft) => (
            <DecorItem
              key={tuft.left}
              motion="sway"
              duration={tuft.duration}
              delay={tuft.delay}
              angle={tuft.angle}
              className="bottom-0 h-8 w-20 text-brand opacity-[0.24] sm:h-10 sm:w-28"
              style={{ left: tuft.left }}
            >
              <Grass className="h-full w-full" />
            </DecorItem>
          ))}

          {[
            { left: "18%", duration: 5.5, delay: -2, angle: "2.4deg" },
            { left: "64%", duration: 6.5, delay: -4, angle: "2deg" },
            { left: "90%", duration: 7, delay: -1, angle: "2.6deg" },
          ].map((flower) => (
            <DecorItem
              key={flower.left}
              motion="sway"
              duration={flower.duration}
              delay={flower.delay}
              angle={flower.angle}
              className="bottom-0 hidden h-12 w-7 text-brand opacity-[0.3] sm:block"
              style={{ left: flower.left }}
            >
              <Flower
                className="h-full w-full"
                petal="var(--accent-soft)"
                centre="var(--accent)"
              />
            </DecorItem>
          ))}
        </>
      )}
    </DecorLayer>
  );
}
