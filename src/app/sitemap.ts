import type { MetadataRoute } from "next";

// Required for static export — sitemap.xml has no request-time data to react to.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://juan-rome.github.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
