import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AffiliatePro Hub.",
  alternates: {
    canonical: "/contato"
  },
  openGraph: {
    title: "Contact",
    description: "Contact AffiliatePro Hub.",
    url: `${siteConfig.domain}/contato`
  }
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
        <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.01em] text-brand">Contact</p>
        <h1 className="mt-5 text-balance text-5xl font-black tracking-tight text-ink">Talk to the team</h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          For partnerships, editorial corrections or commercial opportunities, send a message with context
          about the program, page or proposal.
        </p>
        <a
          href="mailto:contact@affiliateprohub.com"
          className="mt-7 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        >
          contact@affiliateprohub.com
        </a>
      </div>
    </section>
  );
}
