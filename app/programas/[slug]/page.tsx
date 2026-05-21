import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ExternalLink";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { MethodologyBlock } from "@/components/MethodologyBlock";
import { ProgramCard } from "@/components/ProgramCard";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { CommissionVisual, FunnelVisual } from "@/components/Visuals";
import { editorialProfile, programs, rankingSeoContent, rankings, siteConfig } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return rankings.map((ranking) => ({ slug: ranking.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ranking = rankings.find((item) => item.slug === slug);

  if (!ranking) {
    return {};
  }

  return {
    title: ranking.title,
    description: ranking.description,
    alternates: {
      canonical: `/programas/${ranking.slug}`
    },
    openGraph: {
      title: ranking.title,
      description: ranking.description,
      url: `${siteConfig.domain}/programas/${ranking.slug}`
    }
  };
}

export default async function RankingPage({ params }: PageProps) {
  const { slug } = await params;
  const ranking = rankings.find((item) => item.slug === slug);

  if (!ranking) {
    notFound();
  }

  const filteredPrograms =
    ranking.category === "all"
      ? programs
      : programs.filter((program) => program.category === ranking.category);
  const rankedPrograms = filteredPrograms.length > 0 ? filteredPrograms : programs;
  const seoContent = rankingSeoContent[ranking.slug] ?? rankingSeoContent["best-broker-affiliate-programs"];

  const faqItems = [
    ...seoContent.faqs,
    {
      question: `How should affiliates choose among ${ranking.keyword}?`,
      answer:
        "Compare real commission, payout model, reputation, tracking, accepted markets, payment methods and traffic restrictions before scaling campaigns."
    },
    {
      question: "Is CPA better than RevShare?",
      answer:
        "CPA improves cash-flow predictability. RevShare can create more long-term value if the broker retains users and tracking is reliable."
    },
    {
      question: "When should affiliates consider a white label solution?",
      answer:
        "When acquisition is predictable, the trading funnel is understood and the affiliate wants to capture more value than third-party commission alone."
    }
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: ranking.title,
          description: ranking.description,
          url: `${siteConfig.domain}/programas/${ranking.slug}`,
          numberOfItems: rankedPrograms.length,
          itemListElement: rankedPrograms.map((program, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: program.name,
            url: `${siteConfig.domain}/reviews/${program.slug}`
          }))
        }}
      />
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
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteConfig.domain
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Programs",
              item: `${siteConfig.domain}/programas`
            },
            {
              "@type": "ListItem",
              position: 3,
              name: ranking.title,
              item: `${siteConfig.domain}/programas/${ranking.slug}`
            }
          ]
        }}
      />
      <article className="mx-auto max-w-7xl px-5 py-16">
        <div>
          <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
            {ranking.keyword}
          </p>
          <h1 className="mt-5 max-w-5xl text-balance text-5xl font-black tracking-tight text-ink">
            {ranking.title}
          </h1>
          <p className="mt-6 max-w-5xl text-xl leading-9 text-muted">{ranking.intro}</p>
          <p className="mt-4 max-w-5xl text-base leading-8 text-muted">
            Ideal audience: {ranking.audience}
          </p>
          <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand">
              Quick answer
            </p>
            <p className="mt-3 text-base leading-8 text-muted">{seoContent.directAnswer}</p>
          </div>
          {ranking.secondaryKeywords ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {ranking.secondaryKeywords.map((keyword) => (
                <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-black text-muted">
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8">
          <BeBrokerCTA compact horizontal />
        </div>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {seoContent.bestForBadges.map((badge) => (
            <div key={badge.label} className="surface-card rounded-3xl p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">{badge.label}</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-ink">{badge.program}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{badge.reason}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {rankedPrograms.map((program, index) => (
            <ProgramCard key={program.slug} program={program} rank={index + 1} />
          ))}
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <FunnelVisual />
          <CommissionVisual />
        </section>

        <section className="surface-card mt-14 overflow-hidden rounded-[2rem]">
          <div className="border-b border-line bg-white/70 p-7">
            <h2 className="text-3xl font-black tracking-tight text-ink">Quick comparison</h2>
            <p className="mt-3 text-sm font-semibold text-muted">
              On smaller screens, scroll the table horizontally to view all columns.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-cream text-ink">
                <tr>
                  <th className="p-4">Program</th>
                  <th className="p-4">Model</th>
                  <th className="p-4">Commission</th>
                  <th className="p-4">Payout</th>
                  <th className="p-4">Sub-affiliates</th>
                  <th className="p-4">Markets</th>
                  <th className="p-4">Best for</th>
                  <th className="p-4">Official</th>
                </tr>
              </thead>
              <tbody>
                {rankedPrograms.map((program) => (
                  <tr key={program.slug} className="border-t border-line transition hover:bg-cream/50">
                    <td className="p-4 font-bold text-ink">
                      <Link href={`/reviews/${program.slug}`} className="hover:text-brand">
                        {program.name}
                      </Link>
                    </td>
                    <td className="p-4 text-muted">{program.payoutModel}</td>
                    <td className="p-4 text-muted">{program.commission}</td>
                    <td className="p-4 text-muted">{program.payoutFrequency}</td>
                    <td className="p-4 text-muted">{program.subAffiliate}</td>
                    <td className="p-4 text-muted">{program.markets}</td>
                    <td className="p-4 text-muted">{program.bestFor}</td>
                    <td className="p-4">
                      <ExternalLink
                        href={program.officialUrl}
                        className="font-bold text-brand hover:text-ink"
                      >
                        Open
                      </ExternalLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-3">
          {seoContent.commissionModels.map((item) => (
            <div key={item.model} className="surface-card rounded-[2rem] p-7">
              <h2 className="text-3xl font-black tracking-tight text-ink">{item.model}</h2>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-brand">
                Best when
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{item.bestWhen}</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-brand">
                Risk
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{item.risk}</p>
            </div>
          ))}
        </section>

        <section className="surface-card mt-14 rounded-[2rem] p-7 md:p-10">
          <h2 className="text-balance text-3xl font-black tracking-tight text-ink">
            What affiliates should validate before promoting
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {seoContent.brazilValidation.map((item) => (
              <div key={item} className="rounded-2xl bg-cream/80 p-4 text-sm font-bold text-ink">
                {item}
              </div>
            ))}
          </div>
        </section>

        {seoContent.relatedLinks ? (
          <section className="surface-card mt-14 rounded-[2rem] p-7">
            <h2 className="text-balance text-3xl font-black tracking-tight text-ink">
              Further reading for the decision
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {seoContent.relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-cream/80 p-4 text-sm font-black text-ink transition hover:bg-brand hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="surface-card mt-14 rounded-[2rem] p-7 md:p-10">
          <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
            How we choose
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
            Editorial methodology for comparing programs
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {seoContent.methodology.map((item) => (
              <div key={item} className="rounded-2xl bg-cream/80 p-4 text-sm font-bold leading-7 text-ink">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-muted">
            Author: {editorialProfile.author}. Review: {editorialProfile.reviewer}. Last updated:
            {" "}
            {editorialProfile.lastUpdated}.
          </p>
        </section>

        <section className="mt-14 rounded-[2rem] border border-line bg-ink p-7 text-white shadow-soft md:p-10">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/70">
            B2B next step
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight">
            When it can make sense to move from affiliate to broker owner
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-white/75">{seoContent.bebrokerBridge}</p>
          <div className="mt-6">
            <BeBrokerCTA compact horizontal />
          </div>
        </section>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <MethodologyBlock />
          <Faq items={faqItems} />
        </div>
      </article>
    </>
  );
}
