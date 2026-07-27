import FeaturedBooks from "@/app/components/FeaturedBooks";
import FeaturedSeries from "@/app/components/FeaturedSeries";
import FreePrintables from "@/app/components/FreePrintables";
import Hero from "@/app/components/Hero";
import WhyGiggleTree from "@/app/components/WhyGiggleTree";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSeries limit={3} />
      <FeaturedBooks limit={4} />
      <WhyGiggleTree />
      <FreePrintables limit={3} />
    </>
  );
}
