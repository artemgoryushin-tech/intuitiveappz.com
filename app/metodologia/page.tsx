import type { Metadata } from "next";
import { MethodologyBlock } from "@/components/MethodologyBlock";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Editorial methodology",
  description:
    "How AffiliatePro Hub evaluates affiliate programs for brokers, forex, trading and fintech.",
  alternates: {
    canonical: "/metodologia"
  },
  openGraph: {
    title: "Editorial methodology",
    description:
      "How AffiliatePro Hub evaluates affiliate programs for brokers, forex, trading and fintech.",
    url: `${siteConfig.domain}/metodologia`
  }
};

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="surface-card-strong mb-8 rounded-[2rem] p-7 md:p-10">
        <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.01em] text-brand">
          Methodology
        </p>
        <h1 className="mt-5 text-balance text-5xl font-black tracking-tight text-ink">
          How we evaluate affiliate programs
        </h1>
      </div>
      <MethodologyBlock />
    </section>
  );
}
