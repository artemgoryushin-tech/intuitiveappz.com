import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About AffiliatePro Hub, an editorial hub for broker, trading and fintech affiliate marketing.",
  alternates: {
    canonical: "/sobre"
  },
  openGraph: {
    title: "About",
    description:
      "About AffiliatePro Hub, an editorial hub for broker, trading and fintech affiliate marketing.",
    url: `${siteConfig.domain}/sobre`
  }
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
        <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">About</p>
        <h1 className="mt-5 text-balance text-5xl font-black tracking-tight text-ink">A hub for financial affiliates</h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          AffiliatePro Hub publishes rankings, reviews and guides for teams working with finance traffic,
          brokers, forex, trading and fintech. The goal is to help readers compare programs with more
          context and fewer exaggerated claims.
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">
          The site also covers white label solutions because experienced affiliates may evolve from
          promoting third-party offers to building a proprietary brand.
        </p>
      </div>
    </section>
  );
}
