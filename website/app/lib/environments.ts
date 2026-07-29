import type { DecorMotion } from "@/app/components/decor/DecorItem";

/**
 * A world in the Giggle Tree journey.
 *
 * An environment is entirely data: a palette plus an ordered stack of layers.
 * `EnvironmentScene` renders any stack and `Chapter` applies any palette, so a
 * new world is an entry here — no component changes.
 *
 * The palette lives here rather than in CSS because chapters blend into each
 * other: a chapter needs the *previous* world's sky colour to fade from, which
 * means the values have to be readable from JavaScript.
 */

export type EnvironmentId =
  | "forest"
  | "farm"
  | "savanna"
  | "library"
  | "meadow"
  | "dusk";

/** The shared art vocabulary. Add a piece in `decor/art/` and list it here. */
export type ArtKind =
  | "clouds"
  | "hills"
  | "treeline"
  | "trees"
  | "leaves"
  | "grass"
  | "flowers"
  | "butterflies"
  | "birds";

export type Palette = {
  /** Wash at the top of the chapter, and what the next chapter fades from. */
  sky: string;
  /** Atmospheric glow pooling at the edges. */
  haze: string;
  /** Trees and leaves. */
  foliage: string;
  /** Grass, hills, the ground band. */
  ground: string;
  /** Chapter numeral, flower centres, small highlights. */
  accent: string;
};

export type LayerSpec = {
  art: ArtKind;
  /** 0 = infinitely far (no parallax travel), 1 = closest. Also sets opacity. */
  depth: number;
  /** How many pieces. Ignored by single-piece art such as grass or hills. */
  count?: number;
  motion?: DecorMotion;
  /** Hide below this breakpoint to keep small screens cheap. */
  minWidth?: "sm" | "md" | "lg";
};

export type Environment = {
  id: EnvironmentId;
  label: string;
  /** One line of scene-setting, used when a chapter gives no description. */
  mood: string;
  palette: Palette;
  layers: LayerSpec[];
};

/**
 * Layers run back-to-front. Depth drives both parallax travel and opacity, so
 * distance reads without expensive blur filters.
 *
 * Each world gets a different mix on purpose — the farm is open and bright,
 * the savanna is hazy and sparse, the library is quiet. If every world used
 * the same layer list the journey would feel recoloured rather than travelled.
 */
export const ENVIRONMENTS: Record<EnvironmentId, Environment> = {
  forest: {
    id: "forest",
    label: "The Welcome Forest",
    mood: "Where the Giggle Tree grows.",
    palette: {
      sky: "#e8f1e4",
      haze: "#f4ead8",
      foliage: "#2f6b1f",
      ground: "#3f7a2a",
      accent: "#c98a2e",
    },
    layers: [
      { art: "clouds", depth: 0.1, count: 3, motion: "drift" },
      { art: "treeline", depth: 0.25, count: 7, motion: "sway", minWidth: "md" },
      { art: "trees", depth: 0.55, count: 2, motion: "sway", minWidth: "lg" },
      { art: "leaves", depth: 0.75, count: 5, motion: "fall" },
      { art: "butterflies", depth: 0.85, count: 2, motion: "flutter", minWidth: "sm" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 3, motion: "sway" },
      { art: "flowers", depth: 1, count: 3, motion: "sway", minWidth: "sm" },
    ],
  },
  farm: {
    id: "farm",
    label: "The Farm",
    mood: "Early mornings and muddy boots.",
    palette: {
      sky: "#eaf2f7",
      haze: "#fbeed6",
      foliage: "#5d8c33",
      ground: "#7aa33f",
      accent: "#d08b2c",
    },
    layers: [
      { art: "clouds", depth: 0.1, count: 4, motion: "drift" },
      { art: "birds", depth: 0.15, count: 2, motion: "glide", minWidth: "sm" },
      { art: "hills", depth: 0.2 },
      { art: "treeline", depth: 0.35, count: 5, motion: "sway", minWidth: "md" },
      { art: "butterflies", depth: 0.8, count: 2, motion: "flutter", minWidth: "sm" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 4, motion: "sway" },
      { art: "flowers", depth: 1, count: 4, motion: "sway", minWidth: "sm" },
    ],
  },
  savanna: {
    id: "savanna",
    label: "The Wild",
    mood: "Tall grass and long afternoons.",
    palette: {
      sky: "#fbf0dc",
      haze: "#f6e0bb",
      foliage: "#8a7a34",
      ground: "#b09447",
      accent: "#c2702a",
    },
    layers: [
      { art: "clouds", depth: 0.08, count: 2, motion: "drift" },
      { art: "birds", depth: 0.14, count: 3, motion: "glide", minWidth: "sm" },
      { art: "hills", depth: 0.2 },
      { art: "trees", depth: 0.5, count: 2, motion: "sway", minWidth: "lg" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 5, motion: "sway" },
    ],
  },
  library: {
    id: "library",
    label: "The Reading Room",
    mood: "Quiet enough to hear the page turn.",
    palette: {
      sky: "#f6ecdd",
      haze: "#f0dfc4",
      foliage: "#7a4a24",
      ground: "#6b4020",
      accent: "#b4622a",
    },
    layers: [
      { art: "clouds", depth: 0.1, count: 2, motion: "drift" },
      { art: "leaves", depth: 0.7, count: 2, motion: "fall" },
      { art: "grass", depth: 0.9 },
    ],
  },
  meadow: {
    id: "meadow",
    label: "The Meadow",
    mood: "Somewhere to sit and make something.",
    palette: {
      sky: "#eef3e6",
      haze: "#fbf0d8",
      foliage: "#4f8a35",
      ground: "#6aa143",
      accent: "#d2953a",
    },
    layers: [
      { art: "clouds", depth: 0.1, count: 3, motion: "drift" },
      { art: "butterflies", depth: 0.75, count: 3, motion: "flutter", minWidth: "sm" },
      { art: "leaves", depth: 0.7, count: 3, motion: "fall" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 3, motion: "sway" },
      { art: "flowers", depth: 1, count: 5, motion: "sway", minWidth: "sm" },
    ],
  },
  dusk: {
    id: "dusk",
    label: "Evening",
    mood: "The end of the day under the tree.",
    palette: {
      sky: "#f5e6d2",
      haze: "#f7dcbb",
      foliage: "#3d4a2c",
      ground: "#4a4230",
      accent: "#b8722c",
    },
    layers: [
      { art: "birds", depth: 0.12, count: 2, motion: "glide", minWidth: "sm" },
      { art: "treeline", depth: 0.3, count: 6, motion: "sway", minWidth: "md" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 3, motion: "sway" },
    ],
  },
};

export function environmentFor(id: EnvironmentId | undefined): Environment {
  return ENVIRONMENTS[id ?? "forest"] ?? ENVIRONMENTS.forest;
}
