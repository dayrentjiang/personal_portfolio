import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";

export async function GET(request: Request) {
  if (!client || !process.env.SANITY_API_READ_TOKEN) return new Response("Draft preview is not configured.", { status: 503 });
  const handler = defineEnableDraftMode({ client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN, useCdn: false }) });
  return handler.GET(request);
}
