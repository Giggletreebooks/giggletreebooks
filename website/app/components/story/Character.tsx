import Image from "next/image";
import type { CSSProperties } from "react";
import { type Character as CharacterData } from "@/app/lib/characters";

/**
 * A book's character, idling beside the story.
 *
 * Idles are slow, shallow, and looping — the character should read as alive
 * while you look at something else, never as performing for attention. That
 * restraint is the whole brief: support the storytelling, don't compete.
 *
 * Decorative by default. The character is illustration accompanying content
 * that already names the book, so an empty alt keeps screen readers from
 * hearing the title twice.
 */
export default function Character({
  character,
  className,
  /** Seconds per idle cycle. Slower reads calmer. */
  duration = 6,
  /** Offsets the loop so two characters never breathe in unison. */
  delay = 0,
  /** Travel for bob/hop (length) or sway/lean (angle). */
  amount,
  priority = false,
}: {
  character: CharacterData;
  className?: string;
  duration?: number;
  delay?: number;
  amount?: string;
  priority?: boolean;
}) {
  return (
    <div
      data-character=""
      data-idle={character.idle}
      className={`relative ${className ?? ""}`}
      style={
        {
          "--idle-duration": `${duration}s`,
          "--idle-delay": `${delay}s`,
          ...(amount !== undefined && { "--idle-amount": amount }),
        } as CSSProperties
      }
    >
      <Image
        src={character.src}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 1024px) 22rem, 45vw"
        priority={priority}
        className="object-contain object-bottom"
      />
    </div>
  );
}
