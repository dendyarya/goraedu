import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// Add every indexable page here as it is published (noindex pages never go in the sitemap).
const PATHS = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: `${SITE.url}${path}` }));
}
