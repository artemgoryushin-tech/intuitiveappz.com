import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionHeader } from "@/components/SectionHeader";
import { brandReviewSeoContent, programs, siteConfig, type BrandReviewSeoContent } from "@/data/site";

const priorityReviewSlugs = [
  "pocket-option-affiliate-program",
  "quotex-affiliate-program",
  "vantage-affiliate-program",
  "pepperstone-affiliate-program",
  "eightcap-affiliate-program",
  "etoro-affiliate-program",
  "iq-option-affiliate-program",
  "olymp-trade-affiliate-program",
  "axi-affiliate-program",
  "fxtm-affiliate-program",
  "bybit-affiliate-program",
  "coinbase-affiliate-program",
  "kraken-affiliate-program",
  "deriv-affiliate-program"
];

const sortedPrograms = [
  ...priorityReviewSlugs
    .map((slug) => programs.find((program) => program.slug === slug))
    .filter((program): program is (typeof programs)[number] => Boolean(program)),
  ...programs.filter((program) => !priorityReviewSlugs.includes(program.slug))
];

const priorityKeywordLinks = priorityReviewSlugs
  .map((slug) => ({ slug, content: brandReviewSeoContent[slug] }))
  .filter((item): item is { slug: string; content: BrandReviewSeoContent } => Boolean(item.content));

export const metadata: Metadata = {
  title: "Reviews of trading and broker affiliate programs",
  description:
    "English reviews of affiliate programs such as Pocket Option, Quotex, Vantage, Pepperstone, Eightcap, eToro, Axi, FXTM, Bybit, Coinbase, Kraken, Exness, XM and AvaTrade.",
  alternates: {
    canonical: "/reviews"
  },
  openGraph: {
    title: "Reviews of trading and broker affiliate programs",
    description:
      "English reviews of affiliate programs such as Pocket Option, Quotex, Vantage, Pepperstone, Eightcap, eToro, Axi, FXTM, Bybit, Coinbase, Kraken, Exness, XM and AvaTrade.",
    url: `${siteConfig.domain}/reviews`
  }
};

export default function ReviewsIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Reviews of trading and broker affiliate programs",
          url: `${siteConfig.domain}/reviews`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: sortedPrograms.map((program, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: program.name,
              url: `${siteConfig.domain}/reviews/${program.slug}`
            }))
          }
        }}
      />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
          <SectionHeader
            eyebrow="Reviews"
            title="Reviews of trading and broker affiliate programs"
            description="English reviews for people comparing brands: commission, CPA, RevShare, payouts, traffic sources, risks and alternatives."
            titleAs="h1"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
          <div className="surface-card rounded-[2rem] p-7">
            <h2 className="text-2xl font-black tracking-tight text-ink">
              Start with priority reviews
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              These reviews are prioritized for searches such as Pocket Option affiliate program,
              Quotex affiliate program, Vantage Partners, Pepperstone affiliates, Eightcap
              affiliates, eToro Partners, Axi forex affiliate, FXTM affiliates, Bybit affiliates,
              Coinbase affiliates and Kraken affiliates. The goal is to answer what pays, how it
              works, which rules to validate and when to compare alternatives.
            </p>
          </div>
          <div className="surface-card rounded-[2rem] p-7">
            <p className="text-xs font-black uppercase tracking-[0.01em] text-brand">
              Popular searches
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {priorityKeywordLinks.map(({ slug, content }) => (
                <Link
                  key={content.primaryKeyword}
                  href={`/reviews/${slug}`}
                  className="rounded-full bg-cream px-3 py-1 text-xs font-black text-muted transition hover:bg-brand hover:text-white"
                >
                  {content.primaryKeyword}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>
    </>
  );
}
