export interface SocialPost {
  id: string;
  title: string;
  topic: string;
  thumbnail?: string;
  videoUrl?: string;
  permalink?: string;
}

// Curate personal moments here: photos, conversations, and life beyond work.
// The previews below are suggested themes, not claims about published posts.
export const socialPosts: SocialPost[] = [];
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
