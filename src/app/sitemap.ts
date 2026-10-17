import type { MetadataRoute } from "next";
import { trainer } from "@/data/trainer";
export default function sitemap(): MetadataRoute.Sitemap {
  if (trainer.isDemo || !trainer.seo.siteUrl) return [];
  return [{ url: new URL("/", trainer.seo.siteUrl).toString(), changeFrequency: "monthly", priority: 1 }];
}
