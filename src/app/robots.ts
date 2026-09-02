import type { MetadataRoute } from "next";

// Required for static export — robots.txt has no request-time data to react to.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://juan-rome.github.io/sitemap.xml",
  };
}
