import type { MetadataRoute } from "next";
import { trainer } from "@/data/trainer";
export default function robots(): MetadataRoute.Robots {
  const live = !trainer.isDemo && !!trainer.seo.siteUrl;
  return { rules: { userAgent: "*", ...(live ? { allow: "/", disallow: "/privacidade" } : { disallow: "/" }) }, ...(live ? { sitemap: new URL("/sitemap.xml", trainer.seo.siteUrl!).toString() } : {}) };
}
