import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ExternalLink";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { SourceList } from "@/components/SourceList";
import { BrandReviewVisual, CommissionVisual, TrafficSourcesVisual } from "@/components/Visuals";
import {
  brandReviewSeoContent,
  editorialProfile,
  programDeepDives,
  programs,
  rankings,
  reviewSeoEnhancements,
  siteConfig
} from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const categoryMarketNotes: Record<string, string[]> = {
  broker: [
    "Confirm entity, accepted country and available product before presenting the offer to a market.",
    "For forex/CFDs, include risk disclosure and do not present bonuses, leverage or copy trading as guaranteed advantages.",
    "Prioritize educational and comparison content; cold traffic often creates cheap signups and low-quality FTDs."
  ],
  forex: [
    "Verify whether the target country is included in the CPA table or IB agreement before projecting ROI.",
    "Compare gross CPA with net CPA after minimum deposit, trading volume, hold and rejected leads.",
    "Educational content, YouTube and comparison SEO usually produce more qualified traders than quick-profit messaging."
  ],
  trading: [
    "Digital options and short-term trading require conservative messaging and very visible risk disclosure.",
    "Separate campaigns by country, creative and source to see which FTDs become active traders.",
    "Before using Telegram, influencers or native ads, ask the program for written rules."
  ],
  crypto: [
    "Validate local availability, affiliate eligibility and product rules for spot, futures, margin or specific campaigns.",
    "Include crypto-asset risk and avoid promising returns from trading, staking or bonuses.",
    "Measure volume and active traders; registration without trading rarely supports recurring commission."
  ],
  fintech: [
    "Confirm data, payment, commercial-message and country rules before creating campaigns.",
    "Use educational content to explain the product and reduce low-intent curiosity traffic.",
    "Compare revenue per active user with acquisition cost, not just advertised commission."
  ]
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    return {};
  }

  const brandSeo = brandReviewSeoContent[program.slug];
  const title = brandSeo?.metaTitle ?? `${program.name} affiliate program review`;
  const description = brandSeo?.metaDescription ?? program.verdict;

  return {
    title,
    description,
    alternates: {
      canonical: `/reviews/${program.slug}`
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/reviews/${program.slug}`
    }
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    notFound();
  }

  const alternatives = [
    ...programs.filter((item) => item.slug !== program.slug && item.category === program.category),
    ...programs.filter((item) => item.slug !== program.slug && item.category !== program.category)
  ].slice(0, 3);
  const relatedRanking = rankings.find(
    (ranking) => ranking.category === program.category || ranking.category === "all"
  );
  const deepDive = programDeepDives[program.slug];
  const seoEnhancement = reviewSeoEnhancements[program.slug];
  const brandSeo = brandReviewSeoContent[program.slug];
  const pageHeadline = brandSeo?.h1 ?? `${program.name} affiliate program review`;
  const pageDescription = brandSeo?.metaDescription ?? program.verdict;
  const pageUrl = `${siteConfig.domain}/reviews/${program.slug}`;
  const localNotes = categoryMarketNotes[program.category] ?? categoryMarketNotes.broker;
  const faqItems = [
    ...(brandSeo?.faq ?? []),
    ...(seoEnhancement?.faq ?? []),
    {
      question: `Is ${program.name} good for affiliates?`,
      answer:
        "It depends on accepted markets, traffic channel and current terms. Use this review as a starting point and confirm rules with the official program."
    },
    {
      question: "Can affiliates promote trading with paid ads?",
      answer:
        "Only if the program and ad-platform policies allow it. Avoid profit promises and aggressive financial claims."
    }
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          headline: pageHeadline,
          description: pageDescription,
          image: `${siteConfig.domain}/illustrations/stock-market-monetization.jpg`,
          inLanguage: "en-US",
          mainEntityOfPage: pageUrl,
          datePublished: program.lastChecked,
          dateModified: program.lastChecked,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${siteConfig.domain}#website`,
            name: siteConfig.name,
            url: siteConfig.domain
          },
          author: {
            "@type": "Organization",
            name: editorialProfile.author,
            url: `${siteConfig.domain}${editorialProfile.policyUrl}`
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain
          },
          about: {
            "@type": "Organization",
            name: program.name,
            url: program.officialUrl
          }
        }}
      />
      {brandSeo ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How ${brandSeo.primaryKeyword} works`,
            description: brandSeo.quickAnswer,
            totalTime: "PT10M",
            step: brandSeo.integrationSteps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.body
            }))
          }}
        />
      ) : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
            { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteConfig.domain}/reviews` },
            {
              "@type": "ListItem",
              position: 3,
              name: `${program.name} affiliates`,
              item: `${siteConfig.domain}/reviews/${program.slug}`
            }
          ]
        }}
      />
      <article className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.4fr]">
          <div>
            <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
              {brandSeo?.primaryKeyword ?? "Affiliate program review"}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black tracking-tight text-ink">
              {pageHeadline}
            </h1>
            <p className="mt-6 text-xl leading-9 text-muted">{program.verdict}</p>
            <p className="mt-5 text-sm font-semibold leading-7 text-muted">
              Reviewed by {editorialProfile.reviewer}. Last editorial check: {program.lastChecked}.
            </p>
            <ExternalLink
              href={program.officialUrl}
              className="mt-7 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink"
            >
              Open {program.officialLabel}
            </ExternalLink>
          </div>
          <BrandReviewVisual
            slug={program.slug}
            name={program.name}
            keyword={brandSeo?.primaryKeyword ?? program.keywords[0]}
          />
        </div>

        <div className="mt-8">
          <BeBrokerCTA compact horizontal />
        </div>

        {brandSeo ? (
          <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-accent">
              Quick answer
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
              {brandSeo.primaryKeyword}: is it worth it?
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">{brandSeo.quickAnswer}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[brandSeo.primaryKeyword, ...brandSeo.secondaryKeywords].map((keyword) => (
                <span key={keyword} className="rounded-full bg-cream px-3 py-1 text-xs font-black text-muted">
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Model", program.payoutModel],
            ["Commission", program.commission],
            ["Frequency", program.payoutFrequency],
            ["Sub-affiliates", program.subAffiliate],
            ["Markets", program.markets],
            ["Payments", program.paymentMethods]
          ].map(([label, value]) => (
            <div key={label} className="surface-card rounded-3xl p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">{label}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{value}</p>
            </div>
          ))}
        </section>

        <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
          <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
            Official data
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
            Official data to validate before promoting
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Program", program.officialLabel],
              ["Category", program.category],
              ["Model", program.payoutModel],
              ["Commission", program.commission],
              ["Payments", program.paymentMethods],
              ["Last check", program.lastChecked]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-cream/80 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">{label}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-ink">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {brandSeo ? (
          <section className="surface-card mt-12 overflow-hidden rounded-[2rem]">
            <div className="border-b border-line bg-white/70 p-7 md:p-10">
              <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
                Commission and rules
              </p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
                Commission, payout and validation points
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Use this table as an editorial summary. Before buying media or publishing assertive CTAs,
                confirm current terms in the official program.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-cream text-ink">
                  <tr>
                    <th className="p-4">Criteria</th>
                    <th className="p-4">Summary</th>
                    <th className="p-4">What to validate</th>
                  </tr>
                </thead>
                <tbody>
                  {brandSeo.commissionRows.map((row) => (
                    <tr key={row.label} className="border-t border-line transition hover:bg-cream/50">
                      <td className="p-4 font-bold text-ink">{row.label}</td>
                      <td className="p-4 text-muted">{row.value}</td>
                      <td className="p-4 text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {brandSeo ? (
          <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
            <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
              How it works for affiliates
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
              From application to payout: steps to validate
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {brandSeo.integrationSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-cream/80 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-brand shadow-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-black tracking-tight text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <CommissionVisual />
          {deepDive ? <TrafficSourcesVisual sources={deepDive.bestTrafficSources} /> : null}
        </section>

        <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
          <h2 className="text-balance text-3xl font-black tracking-tight text-ink">
            Useful data for affiliates
          </h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {program.facts.map((fact) => (
              <div key={fact} className="rounded-2xl bg-cream/80 p-4 text-sm font-bold text-ink">
                {fact}
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
          <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
            Markets and compliance
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
            What to validate before sending traffic
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {localNotes.map((note) => (
              <div key={note} className="rounded-2xl bg-cream/80 p-4 text-sm font-bold leading-7 text-ink">
                {note}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...program.keywords, ...(brandSeo?.secondaryKeywords ?? [])].map((keyword) => (
              <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-black text-muted">
                {keyword}
              </span>
            ))}
          </div>
        </section>

        {deepDive ? (
          <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
            <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
              Editorial analysis
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
              What really matters in this program
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-black tracking-tight text-ink">Overview</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{deepDive.overview}</p>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-ink">
                  How to think about commission
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {deepDive.commissionDeepDive}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {seoEnhancement ? (
          <section className="surface-card mt-12 rounded-[2rem] p-7 md:p-10">
            <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
              How to monetize
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
              How affiliates can monetize {program.name}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">{seoEnhancement.moneySection}</p>
            <h3 className="mt-8 text-2xl font-black tracking-tight text-ink">
              Recommended funnel example
            </h3>
            <ol className="mt-5 grid gap-3 text-sm leading-7 text-muted">
              {seoEnhancement.funnelExample.map((item, index) => (
                <li key={item} className="rounded-2xl bg-cream/80 p-4">
                  <span className="font-black text-brand">{index + 1}. </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="surface-card rounded-[2rem] p-7">
            <h2 className="text-3xl font-black tracking-tight text-ink">Strengths</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted">
              {program.pros.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card rounded-[2rem] p-7">
            <h2 className="text-3xl font-black tracking-tight text-ink">Limitations</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted">
              {program.cons.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {deepDive ? (
          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="surface-card rounded-[2rem] p-7">
              <h2 className="text-2xl font-black tracking-tight text-ink">
                Best traffic sources
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {deepDive.bestTrafficSources.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card rounded-[2rem] p-7">
              <h2 className="text-2xl font-black tracking-tight text-ink">
                How to build the funnel
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {deepDive.funnelAdvice.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card rounded-[2rem] p-7">
              <h2 className="text-2xl font-black tracking-tight text-ink">
                What to negotiate with the manager
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {deepDive.negotiationAngles.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card rounded-[2rem] p-7">
              <h2 className="text-2xl font-black tracking-tight text-ink">
                Red flags before scaling
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {deepDive.redFlags.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {seoEnhancement ? (
          <section className="mt-12 rounded-[2rem] border border-line bg-ink p-7 text-white shadow-soft md:p-10">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Strategic alternative
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight">
              When to consider white label instead of promoting third parties
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-white/75">
              {seoEnhancement.whiteLabelAlternative}
            </p>
            <div className="mt-6">
              <BeBrokerCTA compact horizontal />
            </div>
          </section>
        ) : null}

        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="surface-card rounded-[2rem] p-7">
            <h2 className="text-2xl font-black tracking-tight text-ink">Tools</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
              {program.affiliateTools.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card rounded-[2rem] p-7">
            <h2 className="text-2xl font-black tracking-tight text-ink">Traffic notes</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
              {program.trafficNotes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card rounded-[2rem] p-7">
            <h2 className="text-2xl font-black tracking-tight text-ink">Compliance</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
              {program.complianceNotes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {deepDive ? (
          <section className="mt-12 rounded-[2rem] border border-line bg-ink p-7 text-white shadow-soft md:p-10">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Optimization checklist
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Before increasing budget
            </h2>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {deepDive.optimizationChecklist.map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12 rounded-[2rem] border border-line bg-cream/80 p-7 md:p-10">
          <h2 className="text-3xl font-black tracking-tight text-ink">Who is it for?</h2>
          <p className="mt-5 text-lg leading-8 text-muted">{program.bestFor}</p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Before scaling, validate official terms, accepted countries, permitted promotion methods and
            risk-communication rules.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-tight text-ink">Alternatives</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {alternatives.map((alternative) => (
              <Link
                key={alternative.slug}
                href={`/reviews/${alternative.slug}`}
                className="surface-card rounded-3xl p-5 text-sm font-black text-ink transition hover:-translate-y-0.5 hover:border-brand"
              >
                {alternative.name}
              </Link>
            ))}
          </div>
          {relatedRanking ? (
            <Link
              href={`/programas/${relatedRanking.slug}`}
              className="mt-6 inline-flex text-sm font-black text-brand hover:text-ink"
            >
              View related ranking
            </Link>
          ) : null}
        </section>

        <div className="mt-12">
          <SourceList sources={program.sources} />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Last editorial check: {program.lastChecked}
          </p>
        </div>

        <div className="mt-12">
          <Faq
            items={faqItems}
          />
        </div>
      </article>
    </>
  );
}
