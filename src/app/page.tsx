import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import Gallery from "@/components/sections/Gallery";
import Journey from "@/components/sections/Journey";
import Intro from "@/components/sections/Intro";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ServiceFinder from "@/components/sections/ServiceFinder";
import WhyPeak from "@/components/sections/WhyPeak";
import MissionVision from "@/components/sections/MissionVision";
import WhoWeServe from "@/components/sections/WhoWeServe";
import HowWeHelp from "@/components/sections/HowWeHelp";
import LiberiaFocus from "@/components/sections/LiberiaFocus";
import FaqSection from "@/components/sections/FaqSection";
import CTABand from "@/components/CTABand";
import StructuredData from "@/components/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <StatsBand label="Peak Logistics in numbers" />
      <Intro />
      <ServicesGrid />
      <ServiceFinder />
      <WhyPeak />
      <StatsBand set="performance" label="Delivery performance" />
      <MissionVision />
      <Journey />
      <WhoWeServe />
      <HowWeHelp />
      <Gallery />
      <LiberiaFocus />
      <FaqSection />
      <CTABand />
    </>
  );
}
