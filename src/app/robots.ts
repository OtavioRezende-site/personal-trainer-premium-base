import type { MetadataRoute } from "next";
import { trainer } from "@/data/trainer";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const live = !trainer.isDemo && !!trainer.seo.siteUrl;
  return { rules: { userAgent: "*", ...(live ? { allow: "/", disallow: "/privacidade" } : { disallow: "/" }) }, ...(live ? { sitemap: `${trainer.seo.siteUrl!.replace(/\/$/, "")}/sitemap.xml` } : {}) };
}
