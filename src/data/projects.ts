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
    videoUrl?: string;
    images: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "deepway",
    title: "Deepway",
    description:
      "Website for an Australian electric truck manufacturer. Clean, modern design showcasing their vehicles and vision for sustainable transport.",
    image: "/deepway.jpeg",
    tags: ["Next.js", "Sanity CMS", "TypeScript"],
    details: {
      overview:
        "Built the marketing website for Deepway, an Australian company manufacturing electric heavy-duty trucks for commercial logistics.",
      features: [
        "Responsive design across all devices",
        "Product showcase sections",
        "Content managed with Sanity CMS",
        "Performance optimized",
      ],
      techStack: ["Next.js", "Sanity CMS", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://deepway.com.au",
      images: ["/projects/deepway.png"],
    },
  },
  {
    slug: "enroute",
    title: "Enroute",
    description:
      "Full system for a platform connecting automotive workshops, logistics, drivers, and mechanics. Built with a team, end to end.",
    image: "/enroute.jpeg",
    tags: ["Vue.js", "PHP", "Docker", "GCP"],
    details: {
      overview:
        "Built the entire Enroute platform with a team, from workshop management to logistics coordination, driver apps, and worker tools. A complete system connecting all parts of automotive operations.",
      features: [
        "Workshop management platform",
        "Logistics and fleet coordination",
        "Driver mobile app",
        "Worker task tracking app",
        "Real-time updates across all apps",
      ],
      techStack: ["Vue.js", "PHP", "Docker", "Google Cloud Platform", "MySQL"],
      liveUrl: "https://enroute-tech.com",
      images: ["/projects/enroute.png"],
    },
  },
  {
    slug: "asg",
    title: "ASG Automotive",
    description:
      "Website for Australia's leading Sitrak truck dealership. Showcases their vehicle range, services, and financing options.",
    image: "/asg.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    details: {
      overview:
        "Built the website for ASG Automotive, a Melbourne-based commercial vehicle dealership specializing in Sitrak trucks.",
      features: [
        "Vehicle catalog and showcase",
        "Service and parts information",
        "Financing calculator",
        "Responsive design",
      ],
      techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://asgau.com.au",
      images: ["/projects/asg.png"],
    },
  },
  {
    slug: "keepitreelcam",
    title: "KeepIt Reel",
    description:
      "Instant replay device system that lets athletes capture their best moments in 1080p HD.",
    image: "/keepitreel.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    details: {
      overview:
        "Built KeepIt Reel, a sports tech product that captures the last 45 seconds of gameplay with one button press.",
      features: [
        "Product showcase",
        "How it works section",
        "Clean, modern design",
        "Responsive layout",
      ],
      techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://www.keepitreelcam.com",
      images: ["/projects/keepitreelcam.png"],
    },
  },
  {
    slug: "smart-trashcan",
    title: "Smart Trashcan",
    description:
      "A trashcan that automatically sorts your waste when you throw it in. Built with Arduino, Raspberry Pi, and sensors for a uni project.",
    image: "/smarttrash.png",
    tags: ["Arduino", "Raspberry Pi", "Hardware"],
    details: {
      overview:
        "Built a smart trashcan that detects and sorts waste automatically. Throw something in and it figures out where it should go.",
      features: [
        "Automatic waste detection",
        "Real-time sorting mechanism",
        "Sensor integration",
        "Embedded systems programming",
      ],
      techStack: ["Arduino", "Raspberry Pi", "Sensors", "C++"],
      videoUrl: "https://youtu.be/F4YQMTxKXPc",
      images: [],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
