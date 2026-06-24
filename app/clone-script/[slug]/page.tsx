import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhiteLabelFlowVisual } from "@/components/Visuals";
import { cloneScriptPages, editorialProfile, siteConfig } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cloneScriptPages.map((page) => ({ slug: page.slug }));
}

const platformModules = [
  "Trading room",
  "User cabinet",
  "Admin CRM",
  "Payments",
  "KYC/AML",
  "Risk controls",
  "Affiliate tracking",
  "Reporting"
];

const launchRoadmap = [
  {
    step: "01",
    title: "Map the reference",
    body: "Turn the brand search into a requirements brief: user journey, trading flow, cabinet, payments, CRM and partner acquisition."
  },
  {
    step: "02",
    title: "Define the MVP",
    body: "Separate must-have launch modules from future enhancements so the first version is operational, original and reviewable."
  },
  {
    step: "03",
    title: "Connect operations",
    body: "Plan KYC, payment status, support, risk controls, affiliate tracking, reporting and audit logs before buying traffic."
  },
  {
    step: "04",
    title: "QA and go-live",
    body: "Validate onboarding, deposits, withdrawals, risk warnings, mobile views, CRM events and compliance copy before launch."
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = cloneScriptPages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/clone-script/${page.slug}`
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.domain}/clone-script/${page.slug}`
    }
  };
}

export default async function CloneScriptPage({ params }: PageProps) {
  const { slug } = await params;
  const page = cloneScriptPages.find((item) => item.slug === slug);

  if (!page) {
    return notFound();
  }

  const pageUrl = `${siteConfig.domain}/clone-script/${page.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          headline: page.title,
          description: page.description,
          url: pageUrl,
          mainEntityOfPage: pageUrl,
          datePublished: editorialProfile.lastUpdated,
          dateModified: editorialProfile.lastUpdated,
          inLanguage: "en-US",
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
          about: [
            page.keyword,
            "white label brokerage",
            "trading platform development",
            "affiliate tracking"
          ]
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${pageUrl}#software`,
          name: page.title,
          url: pageUrl,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, iOS, Android, PWA",
          description: page.description,
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain
          },
          featureList: [...platformModules, ...page.mustHaveFeatures]
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer }
          }))
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
            { "@type": "ListItem", position: 2, name: "Clone Scripts", item: `${siteConfig.domain}/clone-script` },
            { "@type": "ListItem", position: 3, name: page.title, item: pageUrl }
          ]
        }}
      />
      <article className="mx-auto max-w-7xl px-5 py-16">
        <header className="surface-card-strong grid gap-8 rounded-[1.5rem] p-7 md:p-10 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div>
            <p className="inline-flex rounded-xl border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.01em] text-brand">
              {page.keyword}
            </p>
            <h1 className="mt-5 max-w-5xl text-balance text-5xl font-black tracking-tight text-ink">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-muted">{page.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {platformModules.map((module) => (
                <span
                  key={module}
                  className="rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.02em] text-brand"
                >
                  {module}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-muted">
              By {editorialProfile.author}. Updated on {editorialProfile.lastUpdated}.
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-ink p-6 text-white shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.02em] text-accent">
              Build brief
            </p>
            <dl className="mt-5 grid gap-4 text-sm">
              {[
                ["Reference", page.brandReference],
                ["Route", "White label or custom build"],
                ["Priority", "Original branding and compliance"]
              ].map(([term, value]) => (
                <div key={term} className="rounded-xl border border-white/10 bg-white/10 p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.02em] text-white/50">{term}</dt>
                  <dd className="mt-1 font-black text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section className="mt-8 rounded-[1.5rem] border border-accent/20 bg-accent/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.02em] text-accent">
            Brand-safe note
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            {page.complianceNotes[0]}
          </p>
        </section>

        <section className="mt-8">
          <BeBrokerCTA
            horizontal
            formId="lead-form"
            contextName={`${page.brandReference} platform scope`}
            contextSlug={`${page.slug}-platform-scope`}
            requestType={`${page.keyword} white label scope`}
            title={`Request ${page.brandReference} platform scope`}
            description={`Share target markets, product scope, payment methods, KYC needs, affiliate model and launch timeline. This is a project brief for an original white label or custom platform, not legal, investment or licensing advice.`}
          />
        </section>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-10">
            <section className="surface-card rounded-[1.5rem] p-7">
              <p className="text-xs font-black uppercase tracking-[0.02em] text-brand">
                Product position
              </p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-ink">
                What the {page.brandReference} reference should mean
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">{page.positioning}</p>
            </section>

            <section className="surface-card rounded-[1.5rem] p-7">
              <h2 className="text-balance text-3xl font-black tracking-tight text-ink">
                Must-have features
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {page.mustHaveFeatures.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-cream/80 p-4 text-sm font-semibold leading-7 text-muted">
                    <span className="mr-2 font-black text-brand">/</span>
                    {feature}
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card rounded-[1.5rem] p-7">
              <p className="text-xs font-black uppercase tracking-[0.02em] text-brand">
                Included modules
              </p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-ink">
                The operating stack behind a {page.brandReference}-style request
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {platformModules.map((module) => (
                  <div key={module} className="rounded-2xl bg-cream/80 p-4 text-sm font-black text-ink">
                    {module}
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              {page.buildModules.map((module) => (
                <div key={module.title} className="visual-card rounded-[1.25rem] p-6">
                  <h2 className="text-2xl font-black tracking-tight text-ink">{module.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{module.body}</p>
                </div>
              ))}
            </section>

            <section className="surface-card rounded-[1.5rem] p-7">
              <h2 className="text-balance text-3xl font-black tracking-tight text-ink">
                Compliance and risk checks
              </h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted">
                {page.complianceNotes.slice(1).map((note) => (
                  <li key={note} className="rounded-xl bg-white/75 p-4 shadow-sm">
                    {note}
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-card rounded-[1.5rem] p-7">
              <p className="text-xs font-black uppercase tracking-[0.02em] text-brand">
                Launch roadmap
              </p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-ink">
                How to turn the search reference into your own platform
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {launchRoadmap.map((item) => (
                  <article key={item.step} className="rounded-2xl bg-white p-5 shadow-sm">
                    <span className="text-sm font-black text-accent">{item.step}</span>
                    <h3 className="mt-3 text-xl font-black tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] bg-ink p-7 text-white shadow-soft">
              <h2 className="text-balance text-3xl font-black tracking-tight">
                Monetization angles
              </h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-white/75">
                {page.monetizationAngles.map((angle) => (
                  <li key={angle} className="rounded-xl bg-white/10 p-4">
                    {angle}
                  </li>
                ))}
              </ul>
            </section>

            <WhiteLabelFlowVisual />

            <section className="surface-card rounded-[1.5rem] p-7">
              <h2 className="text-balance text-3xl font-black tracking-tight text-ink">
                Recommended next reads
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {page.relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl bg-cream/80 p-4 text-sm font-black text-ink transition hover:bg-brand hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>

            <Faq items={page.faq} />
          </div>
          <aside className="lg:sticky lg:top-24">
            <div className="surface-card rounded-[1.5rem] p-6">
              <p className="text-xs font-black uppercase tracking-[0.02em] text-brand">
                Launch checklist
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {[
                  "Original brand and domain",
                  "Legal and product-scope review",
                  "CRM and payment operations",
                  "Affiliate tracking and traffic rules",
                  "Risk warnings and complaint handling"
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
