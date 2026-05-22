import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";

const legalLinks = [
  { label: "Methodology", href: "/metodologia" },
  { label: "Disclosure", href: "/divulgacao" },
  { label: "Privacy", href: "/privacidade" },
  { label: "Contact", href: "/contato" }
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand-mark.svg"
              alt=""
              width={40}
              height={40}
              aria-hidden="true"
              className="h-10 w-10 rounded-2xl shadow-sm"
            />
            <p className="text-xl font-black">{siteConfig.name}</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            Editorial content for affiliates comparing broker, forex, trading and fintech
            programs. We do not provide financial advice.
          </p>
        </div>
        <div>
          <p className="font-bold">Navigation</p>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-white/70">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:translate-x-1 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Trust</p>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-white/70">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:translate-x-1 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
