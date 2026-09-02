import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyPeak from "@/components/sections/WhyPeak";
import MissionVision from "@/components/sections/MissionVision";
import WhoWeServe from "@/components/sections/WhoWeServe";
import HowWeHelp from "@/components/sections/HowWeHelp";
import LiberiaFocus from "@/components/sections/LiberiaFocus";
import CTABand from "@/components/CTABand";
import StructuredData from "@/components/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Intro />
      <ServicesGrid />
      <WhyPeak />
      <MissionVision />
      <WhoWeServe />
      <HowWeHelp />
      <LiberiaFocus />
      <CTABand />
    </>
  );
}
