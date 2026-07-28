import Image from "next/image";
import Link from "next/link";
import {
  CARD_FOCUS_WITHIN,
  CARD_INTERACTIVE,
  CARD_MEDIA,
  CARD_SHELL,
  cardAttrs,
  cardMediaAttrs,
} from "@/app/lib/cardStyles";
import { type Printable } from "@/app/lib/printables";
import { slugTint, tintInk, tintSurface } from "@/app/lib/tint";

export default function PrintableCard({ printable }: { printable: Printable }) {
  const tint = slugTint(printable.slug);
  const downloadable = Boolean(printable.fileUrl);

  return (
    <article
      {...cardAttrs}
      className={`${CARD_SHELL} ${CARD_INTERACTIVE} ${CARD_FOCUS_WITHIN}`}
    >
      <div
        {...cardMediaAttrs}
        className={`${CARD_MEDIA} aspect-4/3`}
        style={{ backgroundColor: tintSurface(tint) }}
      >
        {printable.thumbnail ? (
          <Image
            src={printable.thumbnail}
            alt={`Preview of ${printable.title}`}
            fill
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          /* Sheet motif stands in until preview artwork lands. */
          <svg
            aria-hidden
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-24"
            style={{ color: tintInk(tint) }}
          >
            <rect x="14" y="6" width="36" height="48" rx="4" opacity="0.5" />
            <path d="M22 20h20M22 28h20M22 36h13" />
            <path d="M20 58h24" opacity="0.4" />
          </svg>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          {printable.category}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight break-words">
          {printable.title}
        </h3>
        <p className="mt-2 mb-5 text-sm leading-relaxed text-muted text-pretty">
          {printable.description}
        </p>

        <PrintableAction printable={printable} downloadable={downloadable} />
      </div>
    </article>
  );
}

const actionClass =
  "mt-auto inline-flex h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-semibold transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Real download once a PDF exists; until then, a link to the printable's page. */
function PrintableAction({
  printable,
  downloadable,
}: {
  printable: Printable;
  downloadable: boolean;
}) {
  const label = downloadable ? "Download" : "View Printable";
  const suffix = <span className="sr-only">: {printable.title}</span>;

  if (downloadable) {
    return (
      <a href={printable.fileUrl} download className={actionClass}>
        <DownloadIcon />
        {label}
        {suffix}
      </a>
    );
  }

  return (
    <Link href={`/printables/${printable.slug}`} className={actionClass}>
      {label}
      {suffix}
    </Link>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
