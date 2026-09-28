import type { Metadata } from "next";
import Projects from "@/components/homepage/Projects";

export const metadata: Metadata = {
  title: "Projects | Dayrent Tjiang",
  description: "Selected projects by Dayrent Tjiang, including Keep It Reel sports replay and Enroute Workshop management software.",
};

export default function ProjectsPage() {
  return <main className="portfolio-page"><Projects standalone /></main>;
}
