export interface JourneyStop {
  id: string;
  name: string;
  shortName: string;
  mark: string;
  logo?: string;
  dates: string;
  year: string;
  type: string;
  role: string;
  description: string;
  highlight: string;
  tools: string[];
}

// Logos can be added as local /journey-logos/... asset paths.
// Dates and experience summaries are taken from Dayrent's September 2026 résumé.
export const journeyStops: JourneyStop[] = [
  {
    id: "monash", name: "Monash University", shortName: "Monash", mark: "M",
    logo: "/journey-logos/monash.svg",
    dates: "Oct 2023 – Jun 2026", year: "2023", type: "Education",
    role: "Bachelor of Information Technology",
    description: "Majored in Software Development, studying how applications, databases, and computer systems work together.",
    highlight: "Monash Diploma Academic Excellence · Semesters 1 & 2",
    tools: ["Software development", "Architecture", "Databases"],
  },
  {
    id: "keep-it-reel", name: "Keep It Reel", shortName: "Keep It Reel", mark: "KR",
    logo: "/journey-logos/keep-it-reel.png",
    dates: "Jun 2025 – Present", year: "2025", type: "Co-founder",
    role: "Co-Founder & Lead Developer",
    description: "Co-founded a sports replay product, taking it from one venue prototype to paying customers across multiple venues.",
    highlight: "15+ devices deployed · 500+ sessions in the first two months",
    tools: ["Python", "FastAPI", "Linux & AWS"],
  },
  {
    id: "lifeblood", name: "Australian Red Cross Lifeblood", shortName: "Lifeblood", mark: "L",
    dates: "Feb 2026 – Jul 2026", year: "2026", type: "Industry placement",
    role: "Application Developer",
    description: "Built Rhonda, an AI regulatory assistant, from proof of concept to MVP alongside Regulatory, Cybersecurity, and ICT teams.",
    highlight: "An AI assistant designed for a 20-person regulatory team",
    tools: ["React", "LLMs & retrieval", "Azure & Terraform"],
  },
  {
    id: "superstat", name: "Superstat", shortName: "Superstat", mark: "S",
    logo: "/journey-logos/superstat.svg",
    dates: "Feb 2026 – Jun 2026", year: "2026", type: "Product team",
    role: "Software Engineer",
    description: "Shipped weekly across web and mobile in an early-stage product team, building reporting, accounting integrations, and reliable customer flows.",
    highlight: "Contributed as the platform grew to 4,500+ sign-ups",
    tools: ["Flutter", "Next.js", "Supabase"],
  },
  {
    id: "enroute", name: "Enroute Tech", shortName: "Enroute", mark: "E",
    logo: "/journey-logos/enroute-navy.png",
    dates: "May 2025 – Present", year: "2025", type: "Full-time",
    role: "Software Engineer",
    description: "Building an enterprise platform for transport and workshop teams, replacing paper logbooks with connected digital operations.",
    highlight: "Used daily by 50+ staff, supporting 100+ trucks",
    tools: ["Next.js", "Node.js", "PostgreSQL"],
  },
];
