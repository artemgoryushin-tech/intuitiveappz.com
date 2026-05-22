import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeBrokerCTA } from "@/components/BeBrokerCTA";
import { Faq } from "@/components/Faq";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { JsonLd } from "@/components/JsonLd";
import { calculators, editorialProfile, siteConfig } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = calculators.find((item) => item.slug === slug);

  if (!calculator) {
    return {};
  }

  return {
    title: calculator.title,
    description: calculator.description,
    alternates: {
      canonical: `/calculators/${calculator.slug}`
    },
    openGraph: {
      title: calculator.title,
      description: calculator.description,
      url: `${siteConfig.domain}/calculators/${calculator.slug}`
    }
  };
}

export default async function CalculatorPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = (await searchParams) ?? {};
  const calculator = calculators.find((item) => item.slug === slug);

  if (!calculator) {
    notFound();
  }

  const pageUrl = `${siteConfig.domain}/calculators/${calculator.slug}`;
  const related = calculators.filter((item) => item.slug !== calculator.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${pageUrl}#calculator`,
          name: calculator.title,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: pageUrl,
          description: calculator.description,
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${siteConfig.domain}#website`,
            name: siteConfig.name,
            url: siteConfig.domain
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: calculator.faq.map((item) => ({
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
            { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteConfig.domain}/calculators` },
            { "@type": "ListItem", position: 3, name: calculator.title, item: pageUrl }
          ]
        }}
      />
      <article className="mx-auto max-w-7xl px-5 py-16">
        <header className="surface-card-strong rounded-[1.5rem] p-7 md:p-10">
          <p className="inline-flex rounded-xl border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">
            {calculator.eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-balance text-5xl font-black tracking-tight text-ink">
            {calculator.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-muted">{calculator.description}</p>
          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-muted">
            By {editorialProfile.author}. Updated on {editorialProfile.lastUpdated}.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-10">
            <section className="surface-card rounded-[1.5rem] p-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
                How to use it
              </p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-ink">
                Start with conservative assumptions
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">{calculator.intro}</p>
            </section>

            <FinanceCalculator calculator={calculator} searchParams={query} />

            <section className="grid gap-5 md:grid-cols-2">
              <div className="surface-card rounded-[1.5rem] p-7">
                <h2 className="text-2xl font-black tracking-tight text-ink">Best for</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                  {calculator.bestFor.map((item) => (
                    <li key={item} className="rounded-xl bg-cream/80 p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] bg-ink p-7 text-white shadow-soft">
                <h2 className="text-2xl font-black tracking-tight">Inputs to verify</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-white/75">
                  {calculator.metrics.map((item) => (
                    <li key={item} className="rounded-xl bg-white/10 p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <Faq items={calculator.faq} />
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-28">
            <div className="surface-card rounded-[1.5rem] p-6">
              <h2 className="text-2xl font-black tracking-tight text-ink">Related calculators</h2>
              <div className="mt-5 grid gap-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/calculators/${item.slug}`}
                    className="rounded-2xl bg-cream/80 p-4 text-sm font-black leading-6 text-ink transition hover:bg-brand hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <BeBrokerCTA compact />
          </aside>
        </div>
      </article>
    </>
  );
}
