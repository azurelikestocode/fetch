import React from "react";
import { Navbar } from "../components/landing/navbar";
import { EditorialHero } from "../components/landing/editorial-hero";
import { MetricsStrip } from "../components/landing/metrics-strip";
import { EngineeringEthos } from "../components/landing/engineering-ethos";
import { InteractivePlaygroundSection } from "../components/landing/interactive-playground-section";
import { CuratedShowcase } from "../components/landing/curated-showcase";
import { FaqSection } from "../components/landing/faq-section";
import { CtaSection } from "../components/landing/cta-section";
import { EditorialFooter } from "../components/landing/editorial-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 selection:text-white">
      <Navbar />
      <main>
        <EditorialHero />
        <MetricsStrip />
        <EngineeringEthos />
        <InteractivePlaygroundSection />
        <CuratedShowcase />
        <FaqSection />
        <CtaSection />
      </main>
      <EditorialFooter />
    </div>
  );
}
