import type { Metadata } from "next";
import Link from "next/link";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { JsonLd } from "@/components/JsonLd";
import { WhiteLabelFlowVisual } from "@/components/Visuals";
import { cloneScriptPages, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Trading platform clone scripts and white label alternatives",
  description:
    "Guides for Quotex clone script, Pocket Option clone script and similar trading platform build requests, with brand-safe white label guidance.",
  alternates: {
    canonical: "/clone-script"
  },
  openGraph: {
    title: "Trading platform clone scripts and white label alternatives",
    description:
      "Brand-safe guides for clone script searches and compliant trading platform launch planning.",
    url: `${siteConfig.domain}/clone-script`
  }
};

export default function CloneScriptIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Trading platform clone scripts and white label alternatives",
          description: metadata.description,
          url: `${siteConfig.domain}/clone-script`,
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${siteConfig.domain}#website`,
            name: siteConfig.name,
            url: siteConfig.domain
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: cloneScriptPages.map((page, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: page.title,
              url: `${siteConfig.domain}/clone-script/${page.slug}`
            }))
          }
        }}
      />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_0.45fr]">
          <div className="rounded-[1.5rem] bg-ink p-7 text-white shadow-soft md:p-10">
            <p className="inline-flex rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-accent">
              Platform build guides
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black tracking-tight text-white md:text-5xl">
              Plan platform builds without copying brands
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              These briefs translate requests like Quotex clone script and Pocket
              Option clone script into legal white label, custom build and broker infrastructure
              requirements.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Platform needs", "Teams are asking for trading functionality, launch speed and vendor options."],
                ["Brand safety", "Names are search references only; the product needs original identity and legal review."],
                ["Launch planning", "Compare white label, CRM, payments and affiliate tools before choosing a build path."]
              ].map(([title, copy]) => (
                <div key={title} className="rounded-xl border border-white/15 bg-white/10 p-5">
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <BeBrokerCTA compact />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cloneScriptPages.map((page) => (
            <Link
              key={page.slug}
              href={`/clone-script/${page.slug}`}
              className="visual-card group rounded-[1.25rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
                {page.keyword}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-black tracking-tight text-ink group-hover:text-brand">
                {page.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{page.description}</p>
              <p className="mt-5 text-sm font-black text-accent">Read the build brief</p>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <WhiteLabelFlowVisual />
        </div>
      </section>
    </>
  );
}
