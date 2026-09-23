import type { Metadata } from "next";
import Projects from "@/components/homepage/Projects";

export const metadata: Metadata = {
  title: "Projects | Dayrent Tjiang",
  description: "Selected websites, platforms, and connected products built by Dayrent Tjiang.",
};

export default function ProjectsPage() {
  return <main className="portfolio-page"><Projects standalone /></main>;
}
