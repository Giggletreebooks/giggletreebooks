# The Giggle Tree storybook architecture

How the cinematic experience is put together, and how to add to it without
touching component code.

The guiding rule: **worlds, books, and characters are data.** Adding a series
should never mean writing a component.

---

## The four layers

```
Chapter            a world with its own palette and seams
  └ EnvironmentScene   renders the world from its layer spec
      └ ParallaxLayer      a depth slice, travels with scroll
          └ DecorItem          one piece of art, with ambient motion
```

Each layer owns exactly one thing, which is what keeps them composable:

| Layer | Owns | Does not own |
|---|---|---|
| `Chapter` | palette, seams, content slot | what art appears |
| `EnvironmentScene` | turning a layer spec into art | scroll behaviour |
| `ParallaxLayer` | scroll-linked depth travel | ambient motion |
| `DecorItem` | ambient motion (sway, drift, fall) | position in depth |

**Parallax and ambient motion sit on different elements on purpose.** Both are
CSS `transform`; on one element the second would overwrite the first. A layer
drifts with scroll while the leaves inside it fall independently.

---

## Adding a world

Worlds live in `app/lib/environments.ts`. A world is a palette plus an ordered
list of layers, back to front.

**1. Palette** — in `globals.css`:

```css
[data-environment="ocean"] {
  --env-sky: #e6f1f6;
  --env-haze: #f0f7f9;
  --env-foliage: #2c6b7a;
  --env-ground: #3f8496;
  --env-accent: #d0873a;
}
```

**2. Layer stack** — in `environments.ts`:

```ts
ocean: {
  id: "ocean",
  label: "The Shallows",
  mood: "Down past the light.",
  layers: [
    { art: "clouds", depth: 0.1, count: 3, motion: "drift" },
    { art: "hills",  depth: 0.2 },
    { art: "grass",  depth: 0.9 },
    { art: "grass",  depth: 1, count: 4, motion: "sway" },
  ],
},
```

**3. Point a series at it** — in `series-seed.ts`:

```ts
{ slug: "sea-animals", environment: "ocean", ... }
```

That series' page now has its own living world. No component changed.

### Layer spec

| Field | Meaning |
|---|---|
| `art` | which piece from the shared vocabulary |
| `depth` | `0` = infinitely far (no travel), `1` = closest. Drives parallax *and* opacity |
| `count` | how many pieces; ignored by single-piece art like `grass` and `hills` |
| `motion` | `sway` · `drift` · `fall` · `float` |
| `minWidth` | hide below `sm`/`md`/`lg` to keep phones cheap |

**Depth reads through scale and opacity, not blur.** Blur on a dozen layers is
expensive to composite; opacity is free.

### Adding new art

1. Write the SVG in `app/components/decor/art/`. Use `currentColor` so it tints
   from the environment palette.
2. Add its name to `ArtKind` in `environments.ts`.
3. Add a `case` to `renderLayer()` in `EnvironmentScene.tsx`.

A butterfly is one file plus one case.

### Painted scenery

Every piece wrapped in `<Scenery>` checks for a painting first:

```
public/scenery/<name>.webp     (.png also works)
```

Eleven are painted today: `tree-oak`, `tree-distant`, `bush`, `hills`,
`rocks`, `path`, `grass`, `flowers`, `barn`, `cloud`, `fence`. Anything with
no painting draws its vector version instead, so the set can be filled in one
piece at a time and a missing file never breaks a page.

**Paintings are not tinted.** They arrive with their own light, which is the
point of them; vector art keeps inheriting `--env-*` through `currentColor`.

**Asset spec**
- Transparent, no baked-in background — layers sit over each other
- ~800px on the long side, object standing on the bottom edge
- WebP: `cwebp -q 82 -alpha_q 90 piece.png -o piece.webp`. These are soft
  alpha-heavy paintings, so WebP lands ~10× under PNG (2.5 MB → 240 KB for
  the set) with nothing visible lost. The site serves what is committed.

Full-width bands — `hills`, `path`, `fence`, and the ground `grass` — pass
`fit="stretch"` to `<Scenery>`, because their boxes are far wider than any
painting. That matches the vector versions, which are drawn with
`preserveAspectRatio="none"`. Discrete objects keep `contain` and their
proportions.

---

## Characters

One transparent cutout per character:

```
public/characters/<series coverDir>/<Book Title>.png
```

So `Henrietta the Chicken` in the farm series lives at
`public/characters/series-1-farm-animals/Henrietta the Chicken.png`.

Same convention as covers: filename matches the book title exactly, capitals
and spaces included.

**Asset spec**
- Transparent PNG
- Character fully inside the frame, standing on the bottom edge (idles rotate
  and scale from `bottom center`)
- Roughly 800px on the long side — served unoptimised, so keep under ~300KB
- No drop shadow baked in; the page supplies the grounding

**A missing cutout renders nothing** rather than a placeholder, so an
unfinished series never ships looking broken. The build prints exactly which
file it expected — visible in `npm run dev` and in the CI log.

### Idle vocabulary

Whole-body only, because the artwork is a single cutout:

| Idle | Motion | Suits |
|---|---|---|
| `breathe` | slow scale | anything — the default |
| `bob` | vertical rise and settle | birds, ducks, chickens |
| `sway` | gentle rotation | horses, giraffes, tall animals |
| `lean` | tilt and settle | cats, dogs, foxes, koalas |
| `hop` | crouch, spring, land | rabbits, kangaroos |

Assigned automatically from the title in `characters.ts` (`idleFor`), falling
back to `breathe`, so a new book animates without an entry.

**Blinking, waving, and head turns are not possible with one flat cutout.**
They need the character split into parts — body, head, eyes open/closed, limbs.
If you later supply layered art, the idle vocabulary extends without changing
how pages consume it.

---

## Scroll

**Lenis** (~3KB) provides inertial scrolling — the weighted glide. It drives
real window scroll position rather than transforming a wrapper, so `sticky`,
anchor links, the scrollbar, and CSS scroll timelines all keep working.

**Parallax is native CSS**, not a scroll listener:

```css
@supports (animation-timeline: view()) {
  [data-parallax] { animation-timeline: view(); }
}
```

The browser runs it off the main thread. Where scroll timelines aren't
supported the layers sit still and the scene is a flat illustration — a good
fallback, and the reason no browser-support matrix is needed.

**Chapters clip with `overflow: clip`, never `overflow: hidden`.** `hidden`
makes an element a scroll container, and `view()` measures the subject against
its nearest scroll container — so `hidden` silently pins every layer inside at
50% progress and nothing ever travels. `clip` cuts the overflow without
creating a scroller.

Layers travel **upward only**, and each hangs below its chapter by exactly its
own travel distance. Symmetric travel looks the same but lifts the ground band
off the bottom edge halfway through, leaving a bare strip under the grass.

Lenis is **disabled entirely** under `prefers-reduced-motion`. Smooth scroll is
a common nausea trigger and it overrides a control the user owns.

---

## Motion tokens

Everything tunable lives at the top of `globals.css`:

| Token | Controls |
|---|---|
| `--duration-fast/base/slow` | transition speeds |
| `--ease-out`, `--ease-in-out` | easing curves |
| `--reveal-distance`, `--stagger-step` | section entrances |
| `--book-depth`, `--book-rotate` | 3D book geometry |
| `--idle-duration`, `--idle-amount` | character idles |
| `--depth` (per layer) | parallax travel |

Retuning the feel of the whole site is editing that block.

---

## Reduced motion

One global block. Everything added later inherits it.

The principle: **the world stays, the movement stops.** Forest, characters, and
book depth all remain — they're the atmosphere. Only travel, drift, and
transitions are removed. Stripping the scene would take away the storybook
rather than the motion.

---

## Theme

There is **no dark variant**, deliberately. A storybook is a printed,
paper-white object. A dark theme fought that identity and inverted every piece
of illustrated artwork, all of which is authored for a light ground.

Base palette: warm off-white `#fffcf6`, brand green `#19680F`, brand brown
`#3B1C00`. Environment palettes layer on top per chapter.
