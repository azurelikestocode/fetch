import React from "react";
import { Navbar } from "../components/landing/navbar";
import { Hero } from "../components/landing/hero";
import { Features } from "../components/landing/features";
import { ShowcaseGrid } from "../components/landing/showcase-grid";
import { Quickstart } from "../components/landing/quickstart";
import { Footer } from "../components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-indigo-500/20 selection:text-indigo-300">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ShowcaseGrid />
        <Quickstart />
      </main>
      <Footer />
    </div>
  );
}
