import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MethodologyBlock } from "@/components/MethodologyBlock";
import { ProgramCard } from "@/components/ProgramCard";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { CategoryVisual, FunnelVisual, HeroVisual, WhiteLabelFlowVisual } from "@/components/Visuals";
import {
  cloneScriptPages,
  guides,
  positioning,
  programs,
  rankings,
  siteConfig
} from "@/data/site";

const featuredPrograms = programs.slice(0, 6);

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.domain
  }
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteConfig.domain}#website`,
          name: siteConfig.name,
          url: siteConfig.domain,
          description: siteConfig.description,
          inLanguage: "en-US",
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain
          }
        }}
      />
      <section className="home-hero relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div>
            <p className="inline-flex rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-accent shadow-sm">
              {positioning.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black tracking-tight text-white md:text-7xl">
              {positioning.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/70">
              {positioning.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/programas/best-broker-affiliate-programs"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
              >
                Compare programs
              </Link>
              <Link
                href="/clone-script"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
              >
                Explore platform briefs
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 text-sm font-bold text-white/70 sm:grid-cols-3">
              {[
                ["Programs", "broker, forex and trading offers"],
                ["Reviews", "brand checks and payout notes"],
                ["Guides", "CPA, traffic and compliance"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="section-band">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[1.5rem] bg-ink p-7 text-white shadow-soft md:p-10">
            <p className="inline-flex rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-accent">
              New SEO cluster
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-white">
              Platform-build research lives one step deeper
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              The homepage stays focused on affiliate program discovery. Clone-script and white
              label pages sit in a separate research path for teams comparing platform UX, CRM,
              payments, risk controls and partner tracking without copying protected brands.
            </p>
            <Link
              href="/clone-script"
              className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-accent hover:text-white"
            >
              Open platform research
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {cloneScriptPages.slice(0, 4).map((page) => (
              <Link
                key={page.slug}
                href={`/clone-script/${page.slug}`}
                className="visual-card group rounded-[1.25rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
                  {page.keyword}
                </p>
                <h3 className="mt-3 text-balance text-xl font-black tracking-tight text-ink group-hover:text-brand">
                  {page.brandReference} build brief
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{page.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
            eyebrow="Comparisons"
            title="Choose the program type before sending traffic"
            description="Compare categories by commission, qualification rules, payouts and fit for your audience."
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rankings.map((ranking, index) => (
            <Link
              key={ranking.slug}
              href={`/programas/${ranking.slug}`}
              className="visual-card group rounded-[1.25rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <CategoryVisual
                label={ranking.category === "all" ? "Broker" : ranking.category}
                tone={index % 3 === 0 ? "brand" : index % 3 === 1 ? "accent" : "ink"}
              />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-brand">
                {ranking.keyword}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-ink group-hover:text-brand">{ranking.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{ranking.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 py-10 lg:grid-cols-[1fr_0.8fr]">
        <FunnelVisual />
        <BeBrokerCTA compact />
      </section>

      <section className="section-band">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeader
            eyebrow="Editorial picks"
            title="Featured affiliate programs"
            description="A broader starting set of broker, forex, trading and fintech programs with public partner information to verify before scaling traffic."
          />
          <div className="mt-9 grid gap-6 lg:grid-cols-3">
            {featuredPrograms.map((program, index) => (
              <ProgramCard key={program.slug} program={program} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <MethodologyBlock />
        <div className="surface-card rounded-[1.5rem] p-7 md:p-10">
          <p className="inline-flex rounded-xl border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
            Selection criteria
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink">
            What to check before sending traffic to an offer
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Good programs are not defined only by advertised commission. Before scaling a campaign,
            compare funnel quality, qualification rules, reputation, payouts and media restrictions.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              ["Commission model", "CPA, RevShare or hybrid should match the buying cycle of your traffic."],
              ["Qualification rules", "FTD, minimum volume, accepted countries and blocked sources change the real result."],
              ["Payouts and support", "Frequency, withdrawal methods and manager support matter when campaigns scale."],
              ["Risk and compliance", "Trading, forex and CFDs need conservative messaging and clear risk notices."]
            ].map(([title, copy]) => (
              <div key={title} className="rounded-xl bg-cream/80 p-5">
                <p className="font-black text-ink">{title}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <WhiteLabelFlowVisual />
      </section>

      <section className="section-band">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeader
            eyebrow="Guides"
            title="Education for financial affiliates"
            description="Evergreen content for trust, internal links and topical depth."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
                <Link key={guide.slug} href={`/guias/${guide.slug}`} className="surface-card group rounded-[1.25rem] p-6 transition hover:-translate-y-1 hover:shadow-soft">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                  {guide.keyword}
                </p>
                <h2 className="mt-3 text-xl font-black tracking-tight text-ink group-hover:text-brand">{guide.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
