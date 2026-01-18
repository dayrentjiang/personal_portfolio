import Hero from "@/components/homepage/Hero";
import Gallery from "@/components/homepage/Gallery";
import Skills from "@/components/homepage/Skills";
import Projects from "@/components/homepage/Projects";
import Services from "@/components/homepage/Services";
import Process from "@/components/homepage/Process";
import Clients from "@/components/homepage/Clients";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <Skills />
      <Projects />
      <Services />
      <Process />
      <Clients />
    </main>
  );
}
