import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/story/SmoothScroll";
import { logo } from "@/app/lib/assets";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giggle Tree Books",
  description:
    "Beautifully made picture books and free printables for curious young readers.",
  /* Sourced from assets.ts so the logo path stays defined in one place. */
  icons: { icon: logo.src, apple: logo.src },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/*
          Marks the document as motion-capable before first paint. Entrance
          animations only hide content once this is set, so with JS disabled
          or still loading everything renders visible — no blank sections.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.motion="ready"`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
