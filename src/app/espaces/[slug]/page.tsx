import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { listings } from "@/lib/data";
import ListingCard from "@/components/ListingCard";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#FF6B35" : "none"} stroke="#FF6B35" strokeWidth="1.5">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) notFound();

  const related = listings.filter((l) => l.slug !== listing.slug && (l.city === listing.city || l.type === listing.type)).slice(0, 3);

  return (
    <>
      <div className="grain" />
      <Navbar />

      <div className="bg-dp-deep min-h-screen pt-24">
        <div className="max-w-[1400px] mx-auto px-8 py-12">

          {/* Breadcrumb */}
          <Link
            href="/espaces"
            className="inline-flex items-center gap-2 text-[13px] text-dp-cream/40 hover:text-dp-cream transition-colors mb-10"
          >
            <ArrowLeftIcon />
            Retour aux espaces
          </Link>

          <div className="flex gap-12 flex-col xl:flex-row">

            {/* Left — main content */}
            <div className="flex-1 min-w-0">

              {/* Gallery */}
              <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[440px] rounded-3xl overflow-hidden mb-10">
                <div
                  className="col-span-2 row-span-2 relative"
                  style={{ background: listing.gradient }}
                >
                  {listing.badge && (
                    <div className="absolute top-5 left-5">
                      <span
                        className="px-3 py-1.5 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase bg-dp-cream/95 text-dp-deep backdrop-blur-md"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {listing.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="rounded-none"
                  style={{
                    background: listing.gradient.replace("135deg", "315deg"),
                    opacity: 0.8,
                  }}
                />
                <div
                  className="rounded-none"
                  style={{
                    background: listing.gradient.replace("circle at", "circle at 80% 20%,").split(",").reverse().join(","),
                    opacity: 0.65,
                  }}
                />
              </div>

              {/* Header */}
              <div className="flex justify-between items-start gap-6 mb-2">
                <h1
                  className="font-display text-[clamp(28px,4vw,44px)] font-light text-dp-cream tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {listing.title}
                </h1>
                <button className="w-11 h-11 rounded-full border border-dp-cream/15 flex items-center justify-center hover:border-dp-orange/40 hover:bg-dp-orange/5 transition-all flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-[14px] text-dp-cream/55">
                <span>{listing.address}</span>
                <span className="w-1 h-1 rounded-full bg-dp-cream/20" />
                <div className="flex items-center gap-1.5">
                  <StarIcon />
                  <span className="text-dp-cream font-semibold">{listing.rating}</span>
                  <span>({listing.reviews} avis)</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-dp-cream/20" />
                <span
                  className="px-3 py-1 rounded-full bg-dp-ocean/50 border border-dp-cream/10 text-[11px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {listing.type}
                </span>
              </div>

              {/* Quick features */}
              <div className="flex flex-wrap gap-2 mb-10">
                {listing.features.map((f) => (
                  <span
                    key={f}
                    className="px-4 py-2 rounded-xl bg-dp-ocean/30 border border-dp-cream/8 text-dp-cream/80 text-[13px]"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Description */}
              <div className="mb-10">
                <h2
                  className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  À propos de cet espace
                </h2>
                <p className="text-[16px] text-dp-cream/65 leading-relaxed">{listing.description}</p>
              </div>

              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Amenities */}
              <div className="mb-10">
                <h2
                  className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Équipements
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {listing.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 text-[15px] text-dp-cream/75">
                      <CheckIcon />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Host */}
              <div>
                <h2
                  className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Votre propriétaire
                </h2>
                <div className="flex items-center gap-5 p-6 rounded-2xl bg-dp-ocean/20 border border-dp-cream/8">
                  <div className="w-14 h-14 rounded-full bg-dp-orange/20 border border-dp-orange/30 flex items-center justify-center flex-shrink-0">
                    <span
                      className="text-[14px] font-semibold text-dp-orange"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {listing.host.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[17px] font-semibold text-dp-cream mb-1">{listing.host.name}</div>
                    <div className="text-[13px] text-dp-cream/45">
                      Membre depuis {listing.host.since} · Répond en {listing.host.responseTime}
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-full border border-dp-cream/15 text-dp-cream text-[13px] font-medium hover:border-dp-cream/40 transition-colors">
                    Contacter
                  </button>
                </div>
              </div>
            </div>

            {/* Right — booking widget (sticky) */}
            <div className="xl:w-[380px] flex-shrink-0">
              <div className="sticky top-28">
                <div className="rounded-3xl border border-dp-cream/10 bg-dp-ocean/20 backdrop-blur-xl p-8">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className="font-display text-[48px] font-light text-dp-orange tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {listing.price}€
                    </span>
                    <span className="text-[15px] text-dp-cream/45">/ mois</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-8 text-[13px] text-dp-cream/45">
                    <StarIcon />
                    <span className="font-semibold text-dp-cream">{listing.rating}</span>
                    <span>· {listing.reviews} avis</span>
                  </div>

                  {/* Date inputs */}
                  <div className="space-y-3 mb-6">
                    <div className="rounded-xl bg-dp-deep/60 border border-dp-cream/10 p-4">
                      <div
                        className="text-[9px] text-dp-cream/35 uppercase tracking-[0.2em] mb-1"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Disponibilité dès
                      </div>
                      <div className="text-[15px] text-dp-cream">Immédiatement</div>
                    </div>
                    <div className="rounded-xl bg-dp-deep/60 border border-dp-cream/10 p-4">
                      <div
                        className="text-[9px] text-dp-cream/35 uppercase tracking-[0.2em] mb-1"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Durée minimale
                      </div>
                      <div className="text-[15px] text-dp-cream">1 mois</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className="w-full py-4 rounded-2xl bg-dp-orange text-dp-abyss font-semibold text-[16px] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 mb-4"
                    style={{ boxShadow: "0 8px 32px rgba(255,107,53,0.3)" }}
                  >
                    Réserver cet espace
                  </button>
                  <button className="w-full py-4 rounded-2xl bg-transparent border border-dp-cream/15 text-dp-cream font-medium text-[15px] hover:border-dp-cream/35 transition-colors">
                    Contacter le propriétaire
                  </button>

                  <p
                    className="text-center text-[11px] text-dp-cream/25 mt-5 tracking-[0.1em] uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Aucun frais avant confirmation
                  </p>

                  {/* Commission info */}
                  <div className="mt-6 pt-6 border-t border-dp-cream/8 space-y-2">
                    {[
                      { label: `${listing.price}€ × 1 mois`, value: `${listing.price}€` },
                      { label: "Commission DwellPark (15%)", value: `-${Math.round(listing.price * 0.15)}€` },
                      { label: "Total propriétaire", value: `${listing.price - Math.round(listing.price * 0.15)}€`, bold: true },
                    ].map(({ label, value, bold }) => (
                      <div key={label} className={`flex justify-between text-[13px] ${bold ? "text-dp-cream font-semibold pt-2 border-t border-dp-cream/8" : "text-dp-cream/50"}`}>
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related listings */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="h-px bg-dp-cream/8 mb-16" />
              <h2
                className="font-display text-[clamp(28px,4vw,42px)] font-light text-dp-cream tracking-tight mb-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Espaces <em className="text-dp-orange not-italic italic font-normal">similaires.</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((l) => (
                  <ListingCard key={l.slug} listing={l} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
