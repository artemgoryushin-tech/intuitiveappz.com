import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { calculators, siteConfig } from "@/data/site";

const pageDescription =
  "Free calculators for broker affiliates: LTV, P&L, CPA vs RevShare, CAC and payback models for forex, trading and fintech campaigns.";

export const metadata: Metadata = {
  title: "Broker affiliate calculators: LTV, P&L, CPA vs RevShare",
  description: pageDescription,
  alternates: {
    canonical: "/calculators"
  },
  openGraph: {
    title: "Broker affiliate calculators: LTV, P&L, CPA vs RevShare",
    description: pageDescription,
    url: `${siteConfig.domain}/calculators`
  }
};

export default function CalculatorsIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Broker affiliate calculators",
          description: pageDescription,
          url: `${siteConfig.domain}/calculators`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: calculators.map((calculator, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: calculator.title,
              url: `${siteConfig.domain}/calculators/${calculator.slug}`
            }))
          }
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
            { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteConfig.domain}/calculators` }
          ]
        }}
      />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
          <SectionHeader
            eyebrow="Affiliate calculators"
            title="Model campaign economics before you scale"
            description="Estimate LTV, P&L, CPA vs RevShare and payback periods for broker, forex, trading and fintech affiliate traffic."
            titleAs="h1"
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {calculators.map((calculator) => (
            <Link
              key={calculator.slug}
              href={`/calculators/${calculator.slug}`}
              className="surface-card group rounded-[1.5rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <p className="text-xs font-black uppercase tracking-[0.02em] text-brand">
                {calculator.keyword}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-ink group-hover:text-brand">
                {calculator.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{calculator.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {calculator.metrics.slice(0, 3).map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs font-black text-muted"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
