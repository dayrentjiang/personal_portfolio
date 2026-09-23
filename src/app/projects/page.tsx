import type { Metadata } from "next";
import Projects from "@/components/homepage/Projects";

export const metadata: Metadata = {
  title: "Projects | Dayrent Tjiang",
  description: "A selection of work by Dayrent Tjiang. Project details coming soon.",
};

export default function ProjectsPage() {
  return <main className="portfolio-page"><Projects standalone /></main>;
}
