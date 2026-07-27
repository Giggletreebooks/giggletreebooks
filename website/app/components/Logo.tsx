import Image from "next/image";
import { logo } from "@/app/lib/assets";

/**
 * The official logo. It contains the "Giggle Tree" wordmark, so it is never
 * paired with adjacent text — that would print the brand name twice.
 */
export default function Logo({
  className = "h-16 w-auto",
  sizes = "128px",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={className}
      sizes={sizes}
    />
  );
}

/**
 * The logo on a white plate. The artwork has dark green and dark brown baked
 * into it, so on the dark-mode background it all but disappears — it needs a
 * light ground wherever it renders at full opacity.
 */
export function LogoPlate({
  className,
  sizes,
  priority = false,
  padding = "p-2",
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
  padding?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-2xl bg-white shadow-sm ring-1 ring-black/5 ${padding}`}
    >
      <Logo className={className} sizes={sizes} priority={priority} />
    </span>
  );
}

/** Faint background flourish for placeholder covers. Decorative only. */
export function LogoWatermark({ className }: { className?: string }) {
  return (
    <Image
      src={logo.src}
      alt=""
      aria-hidden
      width={logo.width}
      height={logo.height}
      className={className}
      sizes="16rem"
    />
  );
}
