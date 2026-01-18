import AboutHero from "@/components/about/AboutHero";
import Experience from "@/components/about/Experience";
import Awards from "@/components/about/Awards";

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a]">
      <AboutHero />
      <Experience />
      <Awards />
    </main>
  );
}
