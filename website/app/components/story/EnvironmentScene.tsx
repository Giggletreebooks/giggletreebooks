import Barn from "@/app/components/decor/art/Barn";
import Bird from "@/app/components/decor/art/Bird";
import Bush from "@/app/components/decor/art/Bush";
import Butterfly from "@/app/components/decor/art/Butterfly";
import Cloud from "@/app/components/decor/art/Cloud";
import Fence from "@/app/components/decor/art/Fence";
import Flower from "@/app/components/decor/art/Flower";
import Grass from "@/app/components/decor/art/Grass";
import Hills from "@/app/components/decor/art/Hills";
import HillsSoft from "@/app/components/decor/art/HillsSoft";
import Leaf from "@/app/components/decor/art/Leaf";
import Path from "@/app/components/decor/art/Path";
import Rocks from "@/app/components/decor/art/Rocks";
import SunGlow from "@/app/components/decor/art/SunGlow";
import Tree from "@/app/components/decor/art/Tree";
import TreeStorybook from "@/app/components/decor/art/TreeStorybook";
import Waterfall from "@/app/components/decor/art/Waterfall";
import DecorItem from "@/app/components/decor/DecorItem";
import DecorLayer from "@/app/components/decor/DecorLayer";
import ParallaxLayer from "@/app/components/story/ParallaxLayer";
import type { Environment, LayerSpec } from "@/app/lib/environments";

/**
 * Renders any environment from its layer spec.
 *
 * This is the piece that makes worlds pluggable: it knows how to draw the art
 * vocabulary, and the environment registry decides which pieces appear, how
 * deep, how many, and how they move. A new world is data.
 *
 * Positions are spread deterministically across the width rather than randomly,
 * so a given environment renders identically on server and client and the
 * static export stays stable between builds.
 */
export default function EnvironmentScene({
  environment,
}: {
  environment: Environment;
}) {
  return (
    <DecorLayer>
      {/* Atmospheric haze pooling at the edges, behind everything. */}
      <ParallaxLayer depth={0.05}>
        <DecorItem
          motion="float"
          duration={18}
          drift="1rem"
          className="-top-24 -left-32 size-[26rem] rounded-full blur-3xl"
          style={{ background: "var(--env-haze)", opacity: 0.55 }}
        />
        <DecorItem
          motion="float"
          duration={24}
          delay={-8}
          drift="0.75rem"
          className="top-24 -right-28 size-[22rem] rounded-full blur-3xl"
          style={{ background: "var(--env-sky)", opacity: 0.5 }}
        />
      </ParallaxLayer>

      {environment.layers.map((layer, index) => (
        <ParallaxLayer
          key={`${layer.art}-${index}`}
          depth={layer.depth}
          className={VISIBILITY[layer.minWidth ?? "all"]}
        >
          {renderLayer(layer)}
        </ParallaxLayer>
      ))}
    </DecorLayer>
  );
}

const VISIBILITY = {
  all: "",
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
} as const;

/** Evenly spread across the width, inset from the edges. */
function spread(count: number, index: number): string {
  return `${4 + ((index + 0.5) * 92) / count}%`;
}

/** Varies a base value per index so nothing shares a cycle. */
function vary(base: number, index: number, step = 1.7): number {
  return base + ((index * step) % (base * 0.5));
}

function renderLayer(layer: LayerSpec) {
  const count = layer.count ?? 1;
  const items = Array.from({ length: count }, (_, i) => i);

  switch (layer.art) {
    case "clouds":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={150 + i * 30}
          delay={-40 * (i + 1)}
          className="left-0 w-32 sm:w-48"
          style={{
            top: `${5 + i * 9}%`,
            color: "var(--surface)",
            opacity: 0.75 - i * 0.12,
          }}
        >
          <Cloud className="h-full w-full" />
        </DecorItem>
      ));

    case "sun":
      return (
        <DecorItem
          motion="float"
          duration={26}
          drift="0.75rem"
          className="-top-32 -left-24 h-[34rem] w-[34rem] sm:-top-40 sm:-left-16"
          style={{ color: "var(--env-haze)", opacity: 0.85 }}
        >
          <SunGlow className="h-full w-full" />
        </DecorItem>
      );

    case "softHills":
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-40 sm:h-56 lg:h-64"
          style={{ color: "var(--env-ground)", opacity: 0.2 }}
        >
          <HillsSoft className="h-full w-full" />
        </DecorItem>
      );

    case "haze":
      /* Aerial perspective: everything behind this washes toward the sky. */
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-[62%]"
          style={{
            background:
              "linear-gradient(to top, transparent, var(--env-sky) 62%)",
            opacity: 0.5,
          }}
        />
      );

    case "path":
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-32 sm:h-44"
          style={{ color: "var(--env-haze)", opacity: 0.5 }}
        >
          <Path className="h-full w-full" />
        </DecorItem>
      );

    case "storybookTrees":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={vary(12, i, 2.8)}
          delay={-i * 5}
          angle="0.8deg"
          className="bottom-0 h-[22rem] w-64 xl:h-[26rem] xl:w-80"
          style={{
            /* Outer edges only, so the headline column keeps clear ground. */
            [i % 2 === 0 ? "left" : "right"]: "-5rem",
            color: "var(--env-foliage)",
            opacity: 0.34,
          }}
        >
          <TreeStorybook className="h-full w-full" />
        </DecorItem>
      ));

    case "bushes":
      return items.map((i) => (
        <DecorItem
          key={i}
          className="bottom-[3%] h-14 w-28 sm:h-16 sm:w-36"
          style={{
            left: spread(count, i),
            color: "var(--env-foliage)",
            opacity: 0.24,
          }}
        >
          <Bush className="h-full w-full" />
        </DecorItem>
      ));

    case "hills":
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-24 sm:h-32"
          style={{ color: "var(--env-ground)", opacity: 0.16 }}
        >
          <Hills className="h-full w-full" />
        </DecorItem>
      );

    case "treeline":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={vary(9, i)}
          delay={-i * 1.7}
          angle="0.5deg"
          className="bottom-[7%] h-16 w-12 lg:h-20 lg:w-16"
          style={{
            left: spread(count, i),
            color: "var(--env-foliage)",
            opacity: 0.16,
          }}
        >
          <Tree className="h-full w-full" />
        </DecorItem>
      ));

    case "trees":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={vary(10, i, 2.4)}
          delay={-i * 4}
          angle="1.1deg"
          className="bottom-[4%] h-64 w-40 xl:h-72 xl:w-48"
          style={{
            /* Held to the outer edges so text stays clear. */
            [i % 2 === 0 ? "left" : "right"]: "-2.5rem",
            color: "var(--env-foliage)",
            opacity: 0.22,
          }}
        >
          <Tree className="h-full w-full" />
        </DecorItem>
      ));

    case "leaves":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={26 + i * 3}
          delay={-i * 7}
          fallX={i % 2 === 0 ? "5rem" : "-4rem"}
          fallDistance="30rem"
          spin={i % 2 === 0 ? "240deg" : "-200deg"}
          opacity={0.4}
          className="top-0 h-4 w-4 sm:h-5 sm:w-5"
          style={{ left: spread(count, i), color: "var(--env-foliage)" }}
        >
          <Leaf className="h-full w-full" />
        </DecorItem>
      ));

    case "grass":
      /* Without motion this is the still ground band; with it, swaying clumps. */
      return layer.motion
        ? items.map((i) => (
            <DecorItem
              key={i}
              motion={layer.motion}
              duration={vary(6.4, i, 0.9)}
              delay={-i * 1.4}
              angle="2deg"
              className="bottom-0 h-8 w-20 sm:h-10 sm:w-28"
              style={{
                left: spread(count, i),
                color: "var(--env-ground)",
                opacity: 0.26,
              }}
            >
              <Grass className="h-full w-full" />
            </DecorItem>
          ))
        : (
            <DecorItem
              className="inset-x-0 bottom-0 h-10 sm:h-14"
              style={{ color: "var(--env-ground)", opacity: 0.18 }}
            >
              <Grass className="h-full w-full" />
            </DecorItem>
          );

    case "barn":
      return (
        <DecorItem
          className="right-[6%] bottom-[10%] h-32 w-44 lg:h-40 lg:w-56"
          style={{ color: "var(--env-accent)", opacity: 0.17 }}
        >
          <Barn className="h-full w-full" />
        </DecorItem>
      );

    case "fences":
      return (
        <DecorItem
          className="inset-x-0 bottom-[6%] h-10 sm:h-12"
          style={{ color: "var(--env-ground)", opacity: 0.2 }}
        >
          <Fence className="h-full w-full" />
        </DecorItem>
      );

    case "rocks":
      return items.map((i) => (
        <DecorItem
          key={i}
          className="bottom-[2%] h-10 w-20 sm:h-12 sm:w-28"
          style={{
            [i % 2 === 0 ? "left" : "right"]: `${6 + i * 4}%`,
            color: "var(--env-ground)",
            opacity: 0.22,
          }}
        >
          <Rocks className="h-full w-full" />
        </DecorItem>
      ));

    case "waterfall":
      return (
        <DecorItem
          className="top-[8%] left-[7%] h-[46%] w-14 rounded-b-full xl:w-20"
          style={{ color: "var(--env-sky)", opacity: 0.55 }}
        >
          <Waterfall className="h-full w-full" />
        </DecorItem>
      );

    case "butterflies":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={16 + i * 5}
          delay={-i * 6}
          className="h-4 w-5 sm:h-5 sm:w-6"
          style={{
            left: `${12 + i * 26}%`,
            top: `${46 + i * 9}%`,
            color: "var(--env-accent)",
            opacity: 0.5,
          }}
        >
          <Butterfly className="h-full w-full" />
        </DecorItem>
      ));

    case "birds":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={65 + i * 22}
          delay={-i * 25}
          className="left-0 h-3 w-8 sm:h-4 sm:w-11"
          style={{
            top: `${9 + i * 7}%`,
            color: "var(--env-foliage)",
            opacity: 0.32 - i * 0.06,
          }}
        >
          <Bird className="h-full w-full" />
        </DecorItem>
      ));

    case "flowers":
      return items.map((i) => (
        <DecorItem
          key={i}
          motion={layer.motion}
          duration={vary(5.8, i, 0.7)}
          delay={-i * 2}
          angle="2.4deg"
          className="bottom-0 h-12 w-7"
          style={{
            left: spread(count, i),
            color: "var(--env-ground)",
            opacity: 0.32,
          }}
        >
          <Flower
            className="h-full w-full"
            petal="var(--env-haze)"
            centre="var(--env-accent)"
          />
        </DecorItem>
      ));
  }
}
