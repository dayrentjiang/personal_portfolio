export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  summary: string;
  thumbnailPosition?: string;
  // Detailed content for individual project page
  details: {
    overview: string;
    features: string[];
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    videoUrl?: string;
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
    image: "/projects/keep-it-reel-thumbnail.png",
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
