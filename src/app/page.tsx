import Hero from "@/components/homepage/Hero";
import Introduction from "@/components/homepage/Introduction";
import Skills from "@/components/homepage/Skills";
import Projects from "@/components/homepage/Projects";
import Services from "@/components/homepage/Services";
import Process from "@/components/homepage/Process";
import PortfolioTransition from "@/components/homepage/PortfolioTransition";
import SocialContent from "@/components/homepage/SocialContent";
import WorkJourney from "@/components/homepage/WorkJourney";

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <PortfolioTransition>
        <Introduction />
        <Projects />
      </PortfolioTransition>
      <SocialContent />
      <WorkJourney />
      <Skills />
      <Services />
      <Process />
    </main>
  );
}
