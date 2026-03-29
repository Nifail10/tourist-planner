import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { FeaturedDestinationsSection } from "@/components/sections/featured-destinations-section";
import { CtaBannerSection } from "@/components/sections/cta-banner-section";

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <HeroSection />
      <HowItWorksSection />
      <FeaturedDestinationsSection />
      <CtaBannerSection />
    </div>
  );
}
