import type { ReactNode } from "react";

export type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

/**
 * 24px Lucide-style outline shell; paths inherit colour and stroke from the
 * card. A component rather than a spread object: spreading props onto an <svg>
 * makes React treat its static children as a dynamic list and demand keys.
 */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/**
 * Cycled through by the series pages so `Series.learnings` can stay plain data
 * (no JSX) and still get iconography. Any length works.
 */
export const LEARNING_ICONS: ReactNode[] = [
  <Icon key="spark">
    <path d="M12 2.5 13.9 8a2 2 0 0 0 1.3 1.3L20.5 11 15.2 12.9A2 2 0 0 0 13.9 14.2L12 19.5 10.1 14.2A2 2 0 0 0 8.8 12.9L3.5 11l5.3-1.7A2 2 0 0 0 10.1 8z" />
  </Icon>,
  <Icon key="eye">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>,
  <Icon key="chat">
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8M8 13h5" />
  </Icon>,
  <Icon key="compass">
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </Icon>,
  <Icon key="ruler">
    <path d="M3 15 15 3l6 6L9 21z" />
    <path d="m7 11 2 2M11 7l2 2M11 15l2 2" />
  </Icon>,
  <Icon key="heart">
    <path d="M12 20.5S3.5 15.5 3.5 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2.5c0 6-8.5 11-8.5 11Z" />
  </Icon>,
];

/**
 * Add, remove, or reorder freely — the section lays out any number of entries.
 */
export const FEATURES: Feature[] = [
  {
    title: "Engaging stories",
    description:
      "Warm, characterful writing with a rhythm that holds attention right through to the last page.",
    icon: (
      <Icon>
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      </Icon>
    ),
  },
  {
    title: "Beautiful illustrations",
    description:
      "Original artwork on every spread, printed with the care usually reserved for grown-up books.",
    icon: (
      <Icon>
        <path d="M12 22a10 10 0 1 1 10-10c0 1.9-1.4 3-3 3h-1.8a2.1 2.1 0 0 0-1.5 3.6c.4.4.6.9.6 1.4a2 2 0 0 1-2 2z" />
        <circle cx="8" cy="9.5" r="1.1" />
        <circle cx="12" cy="7" r="1.1" />
        <circle cx="16" cy="9.5" r="1.1" />
      </Icon>
    ),
  },
  {
    title: "Educational value",
    description:
      "Real facts woven into the story, so curiosity does the teaching instead of a worksheet.",
    icon: (
      <Icon>
        <path d="M12 2.5 13.9 8a2 2 0 0 0 1.3 1.3L20.5 11 15.2 12.9A2 2 0 0 0 13.9 14.2L12 19.5 10.1 14.2A2 2 0 0 0 8.8 12.9L3.5 11l5.3-1.7A2 2 0 0 0 10.1 8z" />
        <path d="M18.5 17.5 19 19l1.5.5-1.5.5-.5 1.5-.5-1.5L16.5 19.5 18 19z" />
      </Icon>
    ),
  },
  {
    title: "Age-appropriate content",
    description:
      "Every title is banded by reading age, so you always know what fits before you open it.",
    icon: (
      <Icon>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </Icon>
    ),
  },
  {
    title: "Screen-free learning",
    description:
      "Paper, ink, and a quiet half hour together — no batteries, notifications, or autoplay.",
    icon: (
      <Icon>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </Icon>
    ),
  },
];
