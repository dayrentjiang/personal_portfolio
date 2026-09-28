export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  summary: string;
  thumbnailPosition?: string;
  imageCaption?: string;
  // Detailed content for individual project page
  details: {
    overview: string;
    features: string[];
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    videoUrl?: string;
    video?: { src: string; poster: string };
    instagramUrl?: string;
    images: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "keep-it-reel",
    title: "Keep It Reel",
    category: "Sports replay · Co-founder",
    summary: "Your game. Ready to replay.",
    description: "A courtside replay product that saves the last 45 seconds with one press, so players can watch, download, and share their best moments.",
    image: "/projects/keep-it-reel-thumbnail-v2.png",
    tags: ["Python", "FastAPI", "Linux", "AWS"],
    details: {
      overview: "As Co-Founder & Lead Developer, I helped take Keep It Reel from a single-venue prototype to paying customers across multiple venues. The product connects a courtside camera and a physical replay button with software that captures recent play and makes the resulting clips available to players.",
      features: [
        "One button press saves the previous 45 seconds of play.",
        "1080p clips that players can watch, download, and share.",
        "A camera that stays courtside, so players can focus on their game.",
        "A replay experience designed for padel, tennis, and futsal venues.",
      ],
      techStack: ["Python", "FastAPI", "Linux", "AWS"],
      liveUrl: "https://www.keepitreelcam.com/",
      images: [],
    },
  },
  {
    slug: "enroute-workshop",
    title: "Enroute Workshop",
    category: "Workshop management",
    summary: "Keep the workshop moving.",
    description: "A connected workspace for workshop teams to plan bookings, manage work orders, and keep daily operations moving.",
    image: "/projects/enroute-workshop-thumbnail.png",
    tags: ["Scheduling", "Work orders", "Operations"],
    details: {
      overview: "Enroute Workshop brings the workshop diary, work orders, customers, vehicles, and inventory into one workspace. My work at Enroute Tech focuses on turning paper-based transport and workshop processes into connected digital operations, giving teams a clearer view of what needs doing and who is working on it.",
      features: [
        "Plan bookings and jobs with daily, weekly, and monthly workshop diary views.",
        "Track work orders from booking through to completion with status filters and worker assignments.",
        "Find jobs by work order, vehicle, customer, purchase order, or notes.",
        "Bring customer and vehicle records, inventory, invoices, and service schedules into the same workspace.",
      ],
      techStack: [],
      video: { src: "/projects/enroute-workshop-launch.mp4", poster: "/projects/enroute-workshop-launch-poster.webp" },
      images: [],
    },
  },
  {
    slug: "regulatory-rag",
    title: "Regulatory RAG",
    category: "AI · Regulatory knowledge",
    summary: "50+ documents. One place to ask.",
    description: "A regulatory knowledge assistant built for an enterprise company, helping users ask questions across a knowledge base of more than 50 regulatory documents.",
    image: "/projects/regulatory-rag-thumbnail.png",
    imageCaption: "Concept preview — an illustrative interface created for this portfolio, using sample content.",
    tags: ["RAG", "Knowledge retrieval", "50+ documents"],
    details: {
      overview: "I built a regulatory RAG system for an enterprise company. The project brings more than 50 regulatory documents into a searchable knowledge base. Users ask a question in plain language, and the system uses retrieval-augmented generation (RAG) to find relevant material and use it as context for a response. The goal is to make regulatory information easier to find without manually searching through each document.",
      features: [
        "Ask regulatory questions in natural language.",
        "Search a knowledge base of more than 50 regulatory documents.",
        "Retrieve relevant document passages to provide context for an AI-generated response.",
        "Bring document search and question answering into one workflow.",
      ],
      techStack: ["React", "LLMs & retrieval", "Azure", "Terraform"],
      images: [],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
