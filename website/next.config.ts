import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project site from `https://<user>.github.io/<repo>/`,
 * so the whole app lives under a sub-path. The deploy workflow sets this to
 * `/<repo-name>`; local `npm run dev` leaves it empty and serves from `/`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* Static HTML export — GitHub Pages cannot run a Node server. */
  output: "export",
  basePath,
  /* Emits `books/index.html` rather than `books.html`, which Pages resolves. */
  trailingSlash: true,
  /* Image optimisation needs a server, so images are served at their full size. */
  images: { unoptimized: true },
};

export default nextConfig;
