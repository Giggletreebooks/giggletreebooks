import Image from "next/image";
import { resolveScenery } from "@/app/lib/scenery";

/**
 * One piece of scenery: the painted asset if it exists, otherwise the vector
 * drawing passed as children.
 *
 * Painted assets are NOT tinted — they arrive with their own light and colour,
 * which is the entire point of them. Vector art keeps inheriting the world's
 * palette through `currentColor`, so mixed states still look intentional while
 * a set is being filled in.
 */
export default function Scenery({
  name,
  alt = "",
  sizes,
  fit = "contain",
  children,
}: {
  /** Filename stem under public/scenery, e.g. "tree-oak". */
  name: string;
  alt?: string;
  sizes: string;
  /**
   * `contain` for discrete objects — a tree keeps its proportions.
   * `stretch` for full-width bands: hills, path and the ground grass run edge
   * to edge in boxes far wider than any painting, exactly like their vector
   * versions, which are drawn with `preserveAspectRatio="none"`.
   */
  fit?: "contain" | "stretch";
  /** Vector fallback, drawn until the painting lands. */
  children: React.ReactNode;
}) {
  const painted = resolveScenery(name);

  if (!painted) return <>{children}</>;

  return (
    <Image
      src={painted.src}
      alt={alt}
      fill
      sizes={sizes}
      className={
        fit === "stretch" ? "object-fill" : "object-contain object-bottom"
      }
      /* Scenery is decorative and below the fold on most pages. */
      loading="lazy"
    />
  );
}
