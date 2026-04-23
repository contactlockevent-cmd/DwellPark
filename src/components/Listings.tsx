import Link from "next/link";
import { listings } from "@/lib/data";
import ListingCard from "./ListingCard";

export default function Listings() {
  const featured = listings.slice(0, 3);

  return (
    <section className="py-24 bg-dp-deep">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              03 — Espaces disponibles
            </div>
            <h2
              className="font-display font-light tracking-[-0.03em] leading-[0.95] text-dp-cream"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3vw, 44px)",
              }}
            >
              Les annonces,<br />
              <em className="text-dp-orange not-italic italic font-normal">éditoriales.</em>
            </h2>
          </div>
          <Link
            href="/espaces"
            className="hidden md:flex items-center gap-2 text-[13px] font-medium text-dp-cream/50 hover:text-dp-cream transition-colors flex-shrink-0 group"
          >
            Voir tous les espaces
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/espaces"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-dp-cream/20 text-dp-cream text-[13px] font-medium hover:border-dp-cream/45 transition-all duration-300"
          >
            Voir tous les espaces
          </Link>
        </div>
      </div>
    </section>
  );
}
