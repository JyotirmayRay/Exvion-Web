import { MetadataRoute } from "next";
import { services } from "@/config/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://exvionglobal.com";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const servicePages = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticPages,
    ...servicePages,
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
