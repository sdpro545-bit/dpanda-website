import { MetadataRoute } from "next";
import { BRAND } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/gift-cards",
    "/crypto",
    "/locked-wallet-funds",
    "/how-it-works",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${BRAND.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/gift-cards" || route === "/crypto" ? "hourly" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/gift-cards") || route.startsWith("/crypto") ? 0.9 : 0.7,
  }));
}
