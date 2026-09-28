import type { Metadata } from "next";
import Projects from "@/components/homepage/Projects";

export const metadata: Metadata = {
  title: "Projects | Dayrent Tjiang",
  description: "Selected projects by Dayrent Tjiang: Keep It Reel sports replay, Enroute Workshop management software, and a Lifeblood regulatory knowledge assistant.",
};

export default function ProjectsPage() {
  return <main className="portfolio-page"><Projects standalone /></main>;
}
