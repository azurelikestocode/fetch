import React from "react";
import { Navbar } from "../components/landing/navbar";
import { EditorialHero } from "../components/landing/editorial-hero";
import { EngineeringEthos } from "../components/landing/engineering-ethos";
import { CuratedShowcase } from "../components/landing/curated-showcase";
import { EditorialFooter } from "../components/landing/editorial-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 selection:text-white">
      <Navbar />
      <main>
        <EditorialHero />
        <EngineeringEthos />
        <CuratedShowcase />
      </main>
      <EditorialFooter />
    </div>
  );
}
