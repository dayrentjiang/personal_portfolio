import Hero from "@/components/homepage/Hero";
import Introduction from "@/components/homepage/Introduction";
import Projects from "@/components/homepage/Projects";
import Services from "@/components/homepage/Services";
import PortfolioTransition from "@/components/homepage/PortfolioTransition";
import SocialContent from "@/components/homepage/SocialContent";
import WorkJourney from "@/components/homepage/WorkJourney";
import LatestResources from "@/components/homepage/LatestResources";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <PortfolioTransition>
        <Introduction />
        <Projects />
      </PortfolioTransition>
      <Suspense><LatestResources /></Suspense>
      <SocialContent />
      <WorkJourney />
      <Services />
    </main>
  );
}
