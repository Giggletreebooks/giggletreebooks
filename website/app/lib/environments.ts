import type { DecorMotion } from "@/app/components/decor/DecorItem";

/**
 * A world in the Giggle Tree journey.
 *
 * An environment is data, not code: a palette (declared in globals.css under
 * `[data-environment="…"]`) plus an ordered stack of layers. `EnvironmentScene`
 * renders any stack, so adding a world is an entry here — no new component.
 *
 * Series point at an environment by id, which is how a new series inherits a
 * complete living world for free.
 */

export type EnvironmentId =
  | "forest"
  | "farm"
  | "savanna"
  | "meadow"
  | "library";

/** The shared art vocabulary. Add a piece in `decor/art/` and list it here. */
export type ArtKind =
  | "clouds"
  | "hills"
  | "treeline"
  | "trees"
  | "leaves"
  | "grass"
  | "flowers";

export type LayerSpec = {
  art: ArtKind;
  /** 0 = infinitely far (no parallax travel), 1 = closest. Also sets opacity. */
  depth: number;
  /** How many pieces. Ignored by single-piece art such as grass or hills. */
  count?: number;
  /** Ambient motion for the pieces in this layer. */
  motion?: DecorMotion;
  /** Hide below this breakpoint to keep small screens cheap. */
  minWidth?: "sm" | "md" | "lg";
};

export type Environment = {
  id: EnvironmentId;
  label: string;
  /** One line of scene-setting, used as a chapter's spoken subtitle. */
  mood: string;
  layers: LayerSpec[];
};

/**
 * Layers are listed back-to-front. Depth drives both parallax travel and how
 * faint a layer is, so distance reads without expensive blur filters.
 */
export const ENVIRONMENTS: Record<EnvironmentId, Environment> = {
  forest: {
    id: "forest",
    label: "The Forest",
    mood: "Where the Giggle Tree grows.",
    layers: [
      { art: "clouds", depth: 0.1, count: 3, motion: "drift" },
      { art: "treeline", depth: 0.25, count: 7, motion: "sway", minWidth: "md" },
      { art: "trees", depth: 0.55, count: 2, motion: "sway", minWidth: "lg" },
      { art: "leaves", depth: 0.75, count: 5, motion: "fall" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 3, motion: "sway" },
      { art: "flowers", depth: 1, count: 3, motion: "sway", minWidth: "sm" },
    ],
  },
  farm: {
    id: "farm",
    label: "The Farm",
    mood: "Early mornings and muddy boots.",
    layers: [
      { art: "clouds", depth: 0.1, count: 4, motion: "drift" },
      { art: "hills", depth: 0.2 },
      { art: "treeline", depth: 0.35, count: 5, motion: "sway", minWidth: "md" },
      { art: "leaves", depth: 0.7, count: 3, motion: "fall" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 4, motion: "sway" },
      { art: "flowers", depth: 1, count: 4, motion: "sway", minWidth: "sm" },
    ],
  },
  savanna: {
    id: "savanna",
    label: "The Savanna",
    mood: "Tall grass and long afternoons.",
    layers: [
      { art: "clouds", depth: 0.08, count: 3, motion: "drift" },
      { art: "hills", depth: 0.2 },
      { art: "trees", depth: 0.5, count: 2, motion: "sway", minWidth: "lg" },
      { art: "grass", depth: 0.9 },
      { art: "grass", depth: 1, count: 5, motion: "sway" },
    ],
  },
  meadow: {
    id: "meadow",
    label: "The Meadow",
    mood: "Somewhere to sit and print things out.",
    layers: [
      { art: "clouds", depth: 0.1, count: 3, motion: "drift" },
      { art: "leaves", depth: 0.7, count: 3, motion: "fall" },
      { art: "grass", depth: 0.9 },
      { art: "flowers", depth: 1, count: 5, motion: "sway", minWidth: "sm" },
    ],
  },
  library: {
    id: "library",
    label: "The Library",
    mood: "Every story on one shelf.",
    layers: [
      { art: "clouds", depth: 0.1, count: 2, motion: "drift" },
      { art: "grass", depth: 0.9 },
    ],
  },
};

export function environmentFor(id: EnvironmentId | undefined): Environment {
  return ENVIRONMENTS[id ?? "forest"] ?? ENVIRONMENTS.forest;
}
