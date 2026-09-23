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

// An empty collection displays placeholders until new projects are ready.
export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
