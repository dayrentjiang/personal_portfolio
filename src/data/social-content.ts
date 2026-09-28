export interface SocialPost {
  id: string;
  title: string;
  topic: string;
  thumbnail?: string;
  alt?: string;
  imageFit?: "cover" | "contain";
  videoUrl?: string;
  permalink?: string;
}

// Curate personal moments here: photos, conversations, and life beyond work.
// The previews below are suggested themes, not claims about published posts.
export const socialPosts: SocialPost[] = [
  { id: "enroute-tech", title: "EnrouteTech.", topic: "Behind the brand", thumbnail: "/moments/enroute-tech.webp", alt: "EnrouteTech logo concepts in orange, white, and navy", imageFit: "contain" },
  { id: "lifeblood", title: "At Lifeblood.", topic: "People & places", thumbnail: "/moments/lifeblood.webp", alt: "Dayrent outside Australian Red Cross Lifeblood" },
  { id: "a-moment-outside", title: "A moment outside.", topic: "Everyday moments", thumbnail: "/moments/a-moment-outside.webp", alt: "Dayrent standing in front of a leafy green hedge" },
  { id: "work-on-the-go", title: "Work on the go.", topic: "Life behind the work", thumbnail: "/moments/work-on-the-go.webp", alt: "Dayrent working on a laptop outdoors at night" },
  { id: "after-hours", title: "After hours.", topic: "Behind the scenes", thumbnail: "/moments/after-hours.webp", alt: "Dayrent wearing headphones while coding at a desk at night" },
  { id: "at-the-desk", title: "At the desk.", topic: "Making things happen", thumbnail: "/moments/at-the-desk.webp", alt: "Dayrent working at a desk with a laptop and two monitors" },
];
export const socialProfileUrl: string | undefined = undefined;

export const socialPreviews: SocialPost[] = [
  { id: "conversations", title: "Conversations that spark ideas.", topic: "Connecting with people" },
  { id: "curiosity", title: "Learning by trying.", topic: "A curious mind", thumbnail: "/IMG_7575.jpg" },
  { id: "perspectives", title: "Shared ideas. Different perspectives.", topic: "Thinking together" },
  { id: "me", title: "The person behind the work.", topic: "A little about me", thumbnail: "/IMG_2749.jpg" },
  { id: "company", title: "Small moments. Good company.", topic: "Life outside work" },
  { id: "exploring", title: "Making room for curiosity.", topic: "New experiences" },
  { id: "growing", title: "A little outside my comfort zone.", topic: "Learning & growing" },
];
