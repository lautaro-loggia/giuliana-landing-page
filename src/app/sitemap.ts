import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-url";

// Solo la portada: /oscura y /mixto son variantes de diseño que no se indexan
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", resolveSiteUrl()).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
