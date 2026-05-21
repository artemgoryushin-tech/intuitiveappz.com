import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy for AffiliatePro Hub.",
  alternates: {
    canonical: "/privacidade"
  },
  openGraph: {
    title: "Privacy policy",
    description: "Privacy policy for AffiliatePro Hub.",
    url: `${siteConfig.domain}/privacidade`
  }
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
        <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">Privacy</p>
        <h1 className="mt-5 text-balance text-5xl font-black tracking-tight text-ink">Privacy policy</h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          This page summarizes the privacy policy for site visitors. Before production, review cookie,
          analytics, form, data-retention and legal-basis details with counsel for the target markets.
        </p>
      </div>
    </section>
  );
}
