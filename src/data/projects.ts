export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  // Detailed content for individual project page
  details: {
    overview: string;
    features: string[];
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    images: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "techzo",
    title: "Techzo",
    description:
      "Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online",
    image: "/projects/techzo.png",
    tags: ["HTML5 & CSS", "Framer Motion", "Vite"],
    details: {
      overview:
        "Techzo is a modern, responsive design agency template that combines sleek aesthetics with powerful functionality. Built for creative agencies looking to make a bold statement online.",
      features: [
        "Fully responsive design",
        "Smooth scroll animations",
        "Interactive UI components",
        "SEO optimized",
        "Fast loading performance",
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Framer Motion", "Vite"],
      liveUrl: "https://techzo.example.com",
      githubUrl: "https://github.com/yourusername/techzo",
      images: [
        "/projects/techzo-1.png",
        "/projects/techzo-2.png",
        "/projects/techzo-3.png",
      ],
    },
  },
  {
    slug: "lumin-studio",
    title: "Lumin Studio",
    description:
      "LuminStudio blends elegance and clarity — a modern design agency template crafted to highlight creative work and impress potential clients",
    image: "/projects/lumin.png",
    tags: ["HTML5 & Tailwind CSS", "React", "Vite"],
    details: {
      overview:
        "Lumin Studio is an elegant portfolio template designed for creative professionals. It features a clean, minimalist design that puts your work front and center.",
      features: [
        "Dark/Light mode toggle",
        "Project showcase gallery",
        "Contact form integration",
        "Blog section",
        "Client testimonials",
      ],
      techStack: ["React", "Tailwind CSS", "Vite", "TypeScript"],
      liveUrl: "https://lumin.example.com",
      githubUrl: "https://github.com/yourusername/lumin-studio",
      images: [
        "/projects/lumin-1.png",
        "/projects/lumin-2.png",
        "/projects/lumin-3.png",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
