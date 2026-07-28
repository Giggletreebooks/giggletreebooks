import Image from "next/image";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

/**
 * A book rendered as a physical object: front cover, a spine plane hinged at
 * its left edge, printed-gutter shading, and a contact shadow on the ground.
 *
 * Every book on the site goes through here, so the shelf stays consistent.
 * All geometry lives in globals.css under `[data-book*]` — depth, angles, and
 * hover travel are CSS variables, so retuning the whole shelf is one edit.
 *
 * Cover artwork is a wraparound spread: back cover on the left half, front on
 * the right, split at 50%. The front alone is a 2:3 portrait, so the frame is
 * 2:3 and `object-right` crops to exactly the front. A front-only cover would
 * need that crop removed.
 */
export default function Book3D({
  cover,
  title,
  tintSlug,
  alt,
  sizes,
  priority = false,
}: {
  cover?: string;
  title: string;
  /** Drives the spine and fallback colour, so a series stays visually coherent. */
  tintSlug: string;
  /** Omit for decorative use; the surrounding link already names the book. */
  alt?: string;
  sizes: string;
  priority?: boolean;
}) {
  const tint = slugTint(tintSlug);

  return (
    <div
      data-book-scene=""
      className="flex h-full w-full items-center justify-center"
    >
      <div
        data-book=""
        className="h-full max-h-full w-auto"
        style={
          {
            aspectRatio: "2 / 3",
            "--book-spine-color": `rgb(${tint})`,
          } as React.CSSProperties
        }
      >
        <div data-book-shadow="" aria-hidden />
        <div data-book-spine="" aria-hidden />

        <div data-book-face="" style={{ backgroundColor: tintSurface(tint) }}>
          {cover ? (
            <Image
              src={cover}
              alt={alt ?? ""}
              fill
              sizes={sizes}
              priority={priority}
              /* Right half of the wraparound spread = the front cover. */
              className="object-cover object-right"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-full w-full items-center justify-center px-4 text-center font-display text-lg leading-tight font-semibold tracking-tight break-words text-balance"
              style={{ color: tintInk(tint) }}
            >
              {title}
            </span>
          )}
          <div data-book-gutter="" aria-hidden />
        </div>
      </div>
    </div>
  );
}
