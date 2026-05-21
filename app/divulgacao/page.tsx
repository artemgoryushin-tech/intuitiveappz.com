import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Commercial disclosure",
  description: "Commercial disclosure and affiliate relationship policy for AffiliatePro Hub.",
  alternates: {
    canonical: "/divulgacao"
  },
  openGraph: {
    title: "Commercial disclosure",
    description: "Commercial disclosure and affiliate relationship policy for AffiliatePro Hub.",
    url: `${siteConfig.domain}/divulgacao`
  }
};

export default function DisclosurePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <div className="surface-card-strong rounded-[2rem] p-7 md:p-10">
        <p className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand">Disclosure</p>
        <h1 className="mt-5 text-balance text-5xl font-black tracking-tight text-ink">Commercial transparency</h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Some pages may contain commercial links, banners or sponsored references. That does not remove
          the need for clear editorial methodology, updated data and commercial disclosure.
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">
          The information is educational. Always confirm terms, commissions, country availability and
          promotion rules directly with each program.
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">
          Links to programs, brokers, exchanges and commercial suppliers are treated as external and marked
          with nofollow/sponsored attributes when they appear on the site.
        </p>
      </div>
    </section>
  );
}
