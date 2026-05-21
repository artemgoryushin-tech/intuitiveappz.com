import type { Metadata } from "next";
import Link from "next/link";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig, whiteLabelPages } from "@/data/site";

export const metadata: Metadata = {
  title: "White label solutions for brokers",
  description:
    "B2B content for affiliates who want to understand white label solutions for launching a broker brand.",
  alternates: {
    canonical: "/white-label"
  },
  openGraph: {
    title: "White label solutions for brokers",
    description:
      "B2B content for affiliates who want to understand white label solutions for launching a broker brand.",
    url: `${siteConfig.domain}/white-label`
  }
};

export default function WhiteLabelIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "White label solutions for brokers",
          url: `${siteConfig.domain}/white-label`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: whiteLabelPages.map((page, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: page.title,
              url: `${siteConfig.domain}/white-label/${page.slug}`
            }))
          }
        }}
      />
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-16 lg:grid-cols-[1fr_0.45fr]">
        <div>
          <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
            <SectionHeader
              eyebrow="White label"
              title="When the affiliate becomes the brand owner"
              description="Guides to understand technology, costs and decisions before launching an online brokerage with a white label solution."
              titleAs="h1"
            />
          </div>
          <div className="mt-10 grid gap-5">
            {whiteLabelPages.map((page) => (
              <Link
                key={page.slug}
                href={`/white-label/${page.slug}`}
                className="surface-card group rounded-[1.75rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
                  {page.keyword}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-ink group-hover:text-brand">{page.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{page.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <BeBrokerCTA compact />
      </section>
    </>
  );
}
