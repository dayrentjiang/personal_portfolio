import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Clients from "@/components/Clients";
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
      <Footer />
    </main>
  );
}
