import Hero from "@/components/homepage/Hero";
import Introduction from "@/components/homepage/Introduction";
import Skills from "@/components/homepage/Skills";
import Projects from "@/components/homepage/Projects";
import Services from "@/components/homepage/Services";
import Process from "@/components/homepage/Process";

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Skills />
      <Projects />
      <Services />
      <Process />
    </main>
  );
}
