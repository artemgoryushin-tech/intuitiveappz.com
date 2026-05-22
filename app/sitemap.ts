import type { MetadataRoute } from "next";
import { calculators, cloneScriptPages, editorialProfile, guides, programs, rankings, siteConfig, whiteLabelPages } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const editorialDate = new Date(editorialProfile.lastUpdated);
  const staticRoutes = [
    "",
    "/programas",
    "/reviews",
    "/clone-script",
    "/guias",
    "/white-label",
    "/calculators",
    "/metodologia",
    "/sobre",
    "/divulgacao",
    "/privacidade",
    "/contato"
  ];

  const dynamicRoutes = [
    ...rankings.map((item) => `/programas/${item.slug}`),
    ...programs.map((item) => `/reviews/${item.slug}`),
    ...cloneScriptPages.map((item) => `/clone-script/${item.slug}`),
    ...calculators.map((item) => `/calculators/${item.slug}`),
    ...guides.map((item) => `/guias/${item.slug}`),
    ...whiteLabelPages.map((item) => `/white-label/${item.slug}`)
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => {
    const isHome = route === "";
    const isMoneyPage = route.startsWith("/programas/") || route.startsWith("/clone-script/");
    const isReview = route.startsWith("/reviews/");
    const isGuide = route.startsWith("/guias/");
    const isCalculator = route.startsWith("/calculators/");
    const isWhiteLabel = route.startsWith("/white-label/");

    const review = route.startsWith("/reviews/")
      ? programs.find((program) => route === `/reviews/${program.slug}`)
      : undefined;

    return {
      url: `${siteConfig.domain}${route}`,
      lastModified: review ? new Date(review.lastChecked) : editorialDate,
      changeFrequency: isHome || isMoneyPage ? "daily" : "weekly",
      priority: isHome ? 1 : isMoneyPage ? 0.95 : isReview ? 0.85 : isCalculator ? 0.8 : isGuide || isWhiteLabel ? 0.75 : 0.7
    };
  });
}
