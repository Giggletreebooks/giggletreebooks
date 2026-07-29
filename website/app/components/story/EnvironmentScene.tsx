import Image from "next/image";
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
import Scenery from "@/app/components/decor/Scenery";
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
/**
 * What a master plate cannot contain, because these move. Everything else in
 * the layer stack is painted into the plate. See docs/hero-art-brief.md §13.
 */
const KEEPS_MOVING = new Set(["motes", "leaves", "butterflies", "birds"]);

export default function EnvironmentScene({
  environment,
  plate,
}: {
  environment: Environment;
  /**
   * A single painted illustration standing in for the whole layer stack.
   * When present, only the things that move are still drawn on top of it.
   */
  plate?: string;
}) {
  const backLayers = environment.layers.filter(
    (layer) => !layer.front && (!plate || KEEPS_MOVING.has(layer.art)),
  );

  return (
    <>
      <DecorLayer>
        {plate && (
          /* Travels slowly, as the furthest thing that still moves at all. */
          <ParallaxLayer depth={0.2}>
            <DecorItem className="inset-0">
              <Image
                src={plate}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-bottom"
                /* The top dissolves so the sky meets the masthead's paper
                   without a line, the same seam the chapters use. */
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0, #000 9%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0, #000 9%)",
                }}
              />
            </DecorItem>
          </ParallaxLayer>
        )}

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

        {backLayers.map((layer, index) => (
          <ParallaxLayer
            key={`${layer.art}-${index}`}
            depth={layer.depth}
            className={VISIBILITY[layer.minWidth ?? "all"]}
          >
            {renderLayer(layer)}
          </ParallaxLayer>
        ))}
      </DecorLayer>

      {/* The near field, over the content. */}
      <DecorLayer front>
        {environment.layers
          .filter((layer) => layer.front)
          .map((layer, index) => (
            <ParallaxLayer
              key={`front-${layer.art}-${index}`}
              depth={layer.depth}
              className={VISIBILITY[layer.minWidth ?? "all"]}
            >
              {renderLayer(layer)}
            </ParallaxLayer>
          ))}
      </DecorLayer>
    </>
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

/**
 * Per-index size and handedness for repeated art.
 *
 * There is one painting per kind, so a row of nine is the same nine pixels
 * nine times — the single loudest tell that a scene is assembled rather than
 * illustrated. Scaling from the base and flipping alternate copies costs
 * nothing and breaks the row. Deterministic, so server and client agree.
 */
function varied(index: number, spread = 0.26): string {
  const scale = 1 - spread / 2 + ((index * 0.37) % 1) * spread;
  return `scaleX(${index % 2 ? -scale : scale}) scaleY(${scale})`;
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
          /*
            Explicit height: a painted cloud fills its box, and a box with
            only a width would be zero tall.

            Few and large, not many and small. Repeating one painting across
            the sky reads as a tiled asset; two big soft ones read as weather.
            A phone gets one — its sky is barely wider than a single cloud.
          */
          className={`h-[6.25rem] w-44 sm:h-[9rem] sm:w-64 lg:h-[11rem] lg:w-[19.5rem] ${i > 0 ? "hidden sm:block" : ""}`}
          style={{
            /* Spread across the sky. Drift only travels a cloud's own width,
               so clouds parked at a shared edge stay stacked on each other —
               copies of one painting piled up read as a smudge. */
            left: spread(count, i),
            /* Fixed offsets, not percentages: clouds belong near the top of
               the sky. A percentage walks them down a tall chapter and parks
               them on the headline. */
            top: `${0.5 + i * 3.5}rem`,
            color: "var(--surface)",
            /* Faint enough to sit in the air rather than on top of it. */
            opacity: 0.4 - i * 0.12,
          }}
        >
          {/*
            Mirrored alternately and softened. One painting used twice is
            obvious side by side; flipped and blurred it reads as two banks of
            the same weather.
          */}
          <div
            className={`h-full w-full blur-[3px] ${i % 2 ? "-scale-x-100" : ""}`}
          >
            <Scenery name="cloud" sizes="24rem">
              <Cloud className="h-full w-full" />
            </Scenery>
          </div>
        </DecorItem>
      ));

    case "sun":
      return (
        <DecorItem
          motion="float"
          duration={26}
          drift="0.75rem"
          /* Wide enough that its falloff pools over the copy. The clearing a
             headline sits in should read as light falling on the scene, not
             as an empty patch of canvas left for the text. */
          className="-top-40 -left-32 h-[46rem] w-[46rem] sm:-top-48 sm:-left-24"
          style={{ color: "var(--env-haze)", opacity: 0.85 }}
        >
          <SunGlow className="h-full w-full" />
        </DecorItem>
      );

    case "motes":
      /*
        Dust hanging in the morning light. Only ever where the sun is — motes
        in shade are just specks, and specks read as dirt on the screen. They
        are the cheapest magic available: no artwork, one small element each,
        and they turn a lit corner into air you could walk through.
      */
      return items.map((i) => (
        <DecorItem
          key={i}
          motion="float"
          duration={vary(16, i, 3.1)}
          delay={-i * 5}
          drift={`${2 + (i % 3) * 1.5}rem`}
          className="rounded-full blur-[1.5px]"
          style={{
            left: `${5 + i * 7}%`,
            top: `${10 + ((i * 17) % 42)}%`,
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            background: "rgb(255 238 196)",
            opacity: 0.6 - (i % 3) * 0.15,
          }}
        />
      ));

    case "softHills":
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-40 sm:h-56 lg:h-64"
          style={{ color: "var(--env-ground)", opacity: 0.32 }}
        >
          <Scenery name="hills" sizes="100vw" fit="stretch">
            <HillsSoft className="h-full w-full" />
          </Scenery>
        </DecorItem>
      );

    case "haze":
      /*
        Aerial perspective: everything behind this washes toward the sky.

        Both ends fade. Held at full strength to the top of its box, the wash
        ended on a straight horizontal line across the whole chapter — the
        single most obvious layer boundary in the scene.
      */
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-[72%]"
          style={{
            background:
              "linear-gradient(to top, transparent 0%, var(--env-sky) 42%, transparent 100%)",
            opacity: 0.55,
          }}
        />
      );

    case "path":
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-32 sm:h-44"
          style={{ color: "var(--env-haze)", opacity: 0.68 }}
        >
          <Scenery name="path" sizes="100vw" fit="stretch">
            <Path className="h-full w-full" />
          </Scenery>
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
          rooted
          rootFade="15%"
          className="bottom-0 h-[22rem] w-64 xl:h-[26rem] xl:w-80"
          style={{
            /* Outer edges only, so the headline column keeps clear ground.
               Held further out than the canopy is wide: at full strength the
               foliage was reaching into the body copy. */
            [i % 2 === 0 ? "left" : "right"]: "-7rem",
            color: "var(--env-foliage)",
            opacity: 0.62,
          }}
        >
          <Scenery name="tree-oak" sizes="(min-width: 1280px) 20rem, 16rem">
            <TreeStorybook className="h-full w-full" />
          </Scenery>
        </DecorItem>
      ));

    case "bushes":
      return items.map((i) => (
        <DecorItem
          key={i}
          rooted
          rootFade="24%"
          className="h-14 w-28 sm:h-16 sm:w-36"
          style={{
            left: spread(count, i),
            bottom: `${1 + ((i * 1.7) % 2)}%`,
            color: "var(--env-foliage)",
            opacity: 0.5,
          }}
        >
          <div
            className="h-full w-full origin-bottom"
            style={{ transform: varied(i, 0.3) }}
          >
            <Scenery name="bush" sizes="9rem">
              <Bush className="h-full w-full" />
            </Scenery>
          </div>
        </DecorItem>
      ));

    case "hills":
      return (
        <DecorItem
          className="inset-x-0 bottom-0 h-24 sm:h-32"
          style={{ color: "var(--env-ground)", opacity: 0.26 }}
        >
          <Scenery name="hills" sizes="100vw" fit="stretch">
            <Hills className="h-full w-full" />
          </Scenery>
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
          rooted
          /*
            Deep enough to swallow the trunk entirely. At this distance a tree
            is a mass of canopy on a ridge — a visible trunk just draws a thin
            line that stops in mid-air, which is what made these read as
            stickers on the hillside.
          */
          rootFade="52%"
          className="h-16 w-12 lg:h-20 lg:w-16"
          style={{
            left: spread(count, i),
            /* Rolling ground, so no two stand on the same line. */
            bottom: `${4 + ((i * 2.3) % 3)}%`,
            color: "var(--env-foliage)",
            /* Furthest thing with a shape. Anything stronger and the
               distance collapses. */
            opacity: 0.22,
          }}
        >
          <div
            className="h-full w-full origin-bottom"
            style={{ transform: varied(i, 0.34) }}
          >
            <Scenery name="tree-distant" sizes="5rem">
              <Tree className="h-full w-full" />
            </Scenery>
          </div>
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
          rooted
          rootFade="16%"
          className="bottom-[1%] h-64 w-40 xl:h-72 xl:w-48"
          style={{
            /* Held to the outer edges so text stays clear. */
            [i % 2 === 0 ? "left" : "right"]: "-2.5rem",
            color: "var(--env-foliage)",
            opacity: 0.32,
          }}
        >
          <Scenery name="tree-distant" sizes="5rem">
            <Tree className="h-full w-full" />
          </Scenery>
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
          /* Nearest leaves fall faster, larger and more solid than far ones —
             the whole reason for having them in front. */
          opacity={layer.front ? 0.7 : 0.4}
          className={
            layer.front ? "top-0 h-7 w-7 sm:h-8 sm:w-8" : "top-0 h-4 w-4 sm:h-5 sm:w-5"
          }
          style={{
            /* Front leaves fall down the sides of the illustration rather
               than through the middle of it. */
            left: layer.front ? `${46 + i * 44}%` : spread(count, i),
            color: "var(--env-foliage)",
          }}
        >
          <Scenery name="leaf" sizes={layer.front ? "2.5rem" : "1.25rem"}>
            <Leaf className="h-full w-full" />
          </Scenery>
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
                /* Nearest thing in the scene, so the strongest. */
                opacity: 0.55,
              }}
            >
              <div
                className="h-full w-full origin-bottom"
                style={{ transform: varied(i, 0.22) }}
              >
                <Scenery name="grass" sizes="8rem">
                  <Grass className="h-full w-full" />
                </Scenery>
              </div>
            </DecorItem>
          ))
        : (
            /*
              The turf the whole chapter stands on. Deep enough to swallow the
              base of everything rooted in front of it — a 40px strip left
              trunks ending in mid-air.
            */
            <DecorItem
              className="inset-x-0 bottom-0 h-20 sm:h-28"
              style={{ color: "var(--env-ground)", opacity: 0.46 }}
            >
              <Scenery name="grass" sizes="100vw" fit="stretch">
                <Grass className="h-full w-full" />
              </Scenery>
            </DecorItem>
          );

    case "barn":
      return (
        <DecorItem
          rooted
          rootFade="12%"
          className="right-[6%] bottom-[7%] h-32 w-44 lg:h-40 lg:w-56"
          style={{ color: "var(--env-accent)", opacity: 0.4 }}
        >
          <Scenery name="barn" sizes="14rem">
            <Barn className="h-full w-full" />
          </Scenery>
        </DecorItem>
      );

    case "fences":
      return (
        <DecorItem
          rooted
          rootFade="16%"
          className="inset-x-0 bottom-[5%] h-10 sm:h-12"
          style={{ color: "var(--env-ground)", opacity: 0.4 }}
        >
          <Scenery name="fence" sizes="100vw" fit="stretch">
            <Fence className="h-full w-full" />
          </Scenery>
        </DecorItem>
      );

    case "rocks":
      return items.map((i) => (
        <DecorItem
          key={i}
          rooted
          rootFade="20%"
          className="bottom-[1%] h-10 w-20 sm:h-12 sm:w-28"
          style={{
            [i % 2 === 0 ? "left" : "right"]: `${6 + i * 4}%`,
            color: "var(--env-ground)",
            opacity: 0.48,
          }}
        >
          <div
            className="h-full w-full origin-bottom"
            style={{ transform: varied(i, 0.3) }}
          >
            <Scenery name="rocks" sizes="7rem">
              <Rocks className="h-full w-full" />
            </Scenery>
          </div>
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
          /* In front, it is the nearest thing in the scene, so it is bigger. */
          className={
            layer.front ? "h-7 w-8 sm:h-8 sm:w-10" : "h-4 w-5 sm:h-5 sm:w-6"
          }
          style={{
            /* A front butterfly grazes the edge of the illustration, not the
               copy and not the middle of the artwork. Crossing a boundary is
               what fuses two things; crossing a face just hides it. */
            left: layer.front ? `${57 + i * 12}%` : `${12 + i * 26}%`,
            top: layer.front ? `${62 + i * 12}%` : `${46 + i * 9}%`,
            color: "var(--env-accent)",
            opacity: layer.front ? 0.72 : 0.5,
          }}
        >
          <Scenery name="butterfly" sizes="2.5rem">
            <Butterfly className="h-full w-full" />
          </Scenery>
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
          rooted
          rootFade="22%"
          className="bottom-0 h-12 w-7"
          style={{
            left: spread(count, i),
            color: "var(--env-ground)",
            opacity: 0.6,
          }}
        >
          <div
            className="h-full w-full origin-bottom"
            style={{ transform: varied(i, 0.3) }}
          >
            <Scenery name="flowers" sizes="3rem">
              <Flower
                className="h-full w-full"
                petal="var(--env-haze)"
                centre="var(--env-accent)"
              />
            </Scenery>
          </div>
        </DecorItem>
      ));
  }
}
