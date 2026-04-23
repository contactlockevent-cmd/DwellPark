import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { listings } from "@/lib/data";
import ListingCard from "@/components/ListingCard";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) notFound();

  const related = listings
    .filter((l) => l.slug !== listing.slug && (l.city === listing.city || l.type === listing.type))
    .slice(0, 3);

  const reviews = generateReviews(listing.rating, listing.reviews);

  return (
    <>
      <div className="grain" />
      <Navbar />

      <div className="bg-dp-deep min-h-screen pt-24">
        <div className="max-w-[1400px] mx-auto px-8 py-12">

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
                <div className="col-span-2 row-span-2 relative" style={{ background: listing.gradient }}>
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <SpaceIllustration type={listing.type} />
                  </div>
                </div>
                <div
                  className="rounded-none flex items-center justify-center overflow-hidden"
                  style={{ background: listing.gradient.replace("135deg", "315deg"), opacity: 0.8 }}
                >
                  <div className="text-dp-cream/20 text-[11px] font-mono tracking-widest rotate-90 uppercase">Photo</div>
                </div>
                <div
                  className="rounded-none flex items-center justify-center overflow-hidden"
                  style={{
                    background: listing.gradient.replace("circle at", "circle at 80% 20%,").split(",").reverse().join(","),
                    opacity: 0.65,
                  }}
                >
                  <div className="text-dp-cream/20 text-[11px] font-mono tracking-widest rotate-90 uppercase">Photo</div>
                </div>
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
                  <HeartIcon />
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

              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  À propos de cet espace
                </h2>
                <p className="text-[16px] text-dp-cream/65 leading-relaxed">{listing.description}</p>
              </div>

              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Amenities */}
              <div className="mb-10">
                <h2 className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
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

              {/* Localisation */}
              <div className="mb-10">
                <h2 className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Localisation
                </h2>
                <div className="relative rounded-2xl overflow-hidden h-[240px] bg-dp-ocean/20 border border-dp-cream/8 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(244,241,236,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(244,241,236,0.06) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-dp-orange/20 border border-dp-orange/40 flex items-center justify-center">
                      <PinIcon />
                    </div>
                    <div className="text-center">
                      <p className="text-dp-cream text-[15px] font-medium">{listing.city}</p>
                      <p className="text-dp-cream/40 text-[13px] mt-0.5">{listing.address}</p>
                    </div>
                    <p
                      className="text-[10px] text-dp-cream/25 tracking-[0.2em] uppercase mt-1"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Adresse exacte après réservation
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Reviews */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-[22px] font-normal text-dp-cream tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    Avis locataires
                  </h2>
                  <div className="flex items-center gap-2">
                    <StarIcon />
                    <span className="text-dp-cream font-semibold text-[16px]">{listing.rating}</span>
                    <span className="text-dp-cream/40 text-[13px]">· {listing.reviews} avis</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-dp-ocean/20 border border-dp-cream/8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-dp-ocean/60 border border-dp-cream/10 flex items-center justify-center">
                          <span className="text-[11px] font-semibold text-dp-cream/60" style={{ fontFamily: "var(--font-mono)" }}>
                            {r.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-dp-cream">{r.name}</p>
                          <p className="text-[11px] text-dp-cream/35">{r.date}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <StarIcon key={s} filled={s <= r.rating} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[14px] text-dp-cream/65 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-dp-cream/8 mb-10" />

              {/* Host */}
              <div>
                <h2 className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Votre propriétaire
                </h2>
                <div className="flex items-center gap-5 p-6 rounded-2xl bg-dp-ocean/20 border border-dp-cream/8">
                  <div className="w-14 h-14 rounded-full bg-dp-orange/20 border border-dp-orange/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[14px] font-semibold text-dp-orange" style={{ fontFamily: "var(--font-mono)" }}>
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
                  <div className="flex items-baseline gap-2 mb-1">
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

                  <div className="space-y-3 mb-6">
                    <div className="rounded-xl bg-dp-deep/60 border border-dp-cream/10 p-4">
                      <div className="text-[9px] text-dp-cream/35 uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Disponibilité dès
                      </div>
                      <div className="text-[15px] text-dp-cream">Immédiatement</div>
                    </div>
                    <div className="rounded-xl bg-dp-deep/60 border border-dp-cream/10 p-4">
                      <div className="text-[9px] text-dp-cream/35 uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Durée minimale
                      </div>
                      <div className="text-[15px] text-dp-cream">1 mois</div>
                    </div>
                  </div>

                  <button
                    className="w-full py-4 rounded-2xl bg-dp-orange text-dp-abyss font-semibold text-[16px] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 mb-4"
                    style={{ boxShadow: "0 8px 32px rgba(255,107,53,0.3)" }}
                  >
                    Réserver cet espace
                  </button>
                  <button className="w-full py-4 rounded-2xl bg-transparent border border-dp-cream/15 text-dp-cream font-medium text-[15px] hover:border-dp-cream/35 transition-colors">
                    Contacter le propriétaire
                  </button>

                  <p className="text-center text-[11px] text-dp-cream/25 mt-5 tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                    Aucun frais avant confirmation
                  </p>

                  <div className="mt-6 pt-6 border-t border-dp-cream/8 space-y-2">
                    {[
                      { label: `Loyer mensuel`, value: `${listing.price}€` },
                      { label: `Surface : ${listing.surface} m²`, value: `~${Math.round(listing.price / listing.surface)}€/m²` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-[13px] text-dp-cream/50">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[13px] text-dp-cream font-semibold pt-2 border-t border-dp-cream/8">
                      <span>Total mensuel</span>
                      <span>{listing.price}€</span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: "🔒", label: "Paiement sécurisé" },
                    { icon: "✓", label: "Propriétaires vérifiés" },
                    { icon: "↩", label: "Annulation flexible" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-dp-ocean/10 border border-dp-cream/6 text-center">
                      <span className="text-[16px]">{icon}</span>
                      <span className="text-[10px] text-dp-cream/40 leading-tight" style={{ fontFamily: "var(--font-mono)" }}>{label}</span>
                    </div>
                  ))}
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

      {/* Mobile sticky booking footer */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-dp-abyss/95 backdrop-blur-xl border-t border-dp-cream/10 px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <span className="font-display text-[26px] font-light text-dp-orange" style={{ fontFamily: "var(--font-display)" }}>
            {listing.price}€
          </span>
          <span className="text-[13px] text-dp-cream/40 ml-1">/ mois</span>
        </div>
        <button
          className="flex-1 max-w-[220px] py-3.5 rounded-2xl bg-dp-orange text-dp-abyss font-semibold text-[15px] transition-all hover:opacity-90"
          style={{ boxShadow: "0 4px 20px rgba(255,107,53,0.35)" }}
        >
          Réserver
        </button>
      </div>
      <div className="xl:hidden h-24" />

      <Footer />
    </>
  );
}

function generateReviews(avgRating: number, count: number) {
  const pool = [
    { name: "Thomas R.", avatar: "TR", comment: "Espace exactement comme décrit, accès facile et propriétaire très réactif. Je recommande sans hésiter pour un stationnement longue durée.", rating: 5 },
    { name: "Isabelle V.", avatar: "IV", comment: "Très bon rapport qualité/prix. Sécurité au rendez-vous, je dors sur mes deux oreilles. Renouvellement déjà prévu.", rating: 5 },
    { name: "Romain C.", avatar: "RC", comment: "Pratique et bien situé. Quelques petits points à améliorer sur l'éclairage mais dans l'ensemble très satisfait.", rating: 4 },
    { name: "Amira B.", avatar: "AB", comment: "Propriétaire sympa et disponible. L'espace est propre et bien sécurisé. Parfait pour mes besoins.", rating: 5 },
    { name: "Julien M.", avatar: "JM", comment: "Bonne expérience globale. L'accès par badge fonctionne parfaitement. Je le loue depuis 3 mois sans problème.", rating: 4 },
    { name: "Chloé D.", avatar: "CD", comment: "Espace vraiment premium comme annoncé. La plateforme DwellPark facilite beaucoup les échanges.", rating: 5 },
  ];

  const displayed = Math.min(count, 4, pool.length);
  const reviews = pool.slice(0, displayed).map((r, i) => ({
    ...r,
    rating: i === 0 ? 5 : i === 2 ? Math.max(4, Math.floor(avgRating)) : 5,
    date: `${["Janvier", "Février", "Mars", "Novembre", "Décembre", "Octobre"][i % 6]} 2025`,
  }));
  return reviews;
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#FF6B35" : "none"} stroke="#FF6B35" strokeWidth="1.5">
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

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SpaceIllustration({ type }: { type: string }) {
  if (type === "Garage" || type === "Box") {
    return (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none" opacity="0.15">
        <rect x="10" y="30" width="100" height="45" rx="3" stroke="#F4F1EC" strokeWidth="2" />
        <path d="M10 30 L60 5 L110 30" stroke="#F4F1EC" strokeWidth="2" />
        <rect x="35" y="50" width="50" height="25" rx="2" stroke="#F4F1EC" strokeWidth="1.5" />
        <line x1="60" y1="50" x2="60" y2="75" stroke="#F4F1EC" strokeWidth="1" />
        <line x1="35" y1="62" x2="85" y2="62" stroke="#F4F1EC" strokeWidth="1" />
      </svg>
    );
  }
  if (type === "Parking") {
    return (
      <svg width="100" height="70" viewBox="0 0 100 70" fill="none" opacity="0.15">
        <rect x="5" y="5" width="90" height="60" rx="4" stroke="#F4F1EC" strokeWidth="2" />
        <text x="50" y="42" textAnchor="middle" fill="#F4F1EC" fontSize="32" fontWeight="bold" fontFamily="sans-serif">P</text>
      </svg>
    );
  }
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" opacity="0.15">
      <rect x="5" y="5" width="110" height="70" rx="3" stroke="#F4F1EC" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="5" y1="25" x2="115" y2="25" stroke="#F4F1EC" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="5" y1="55" x2="115" y2="55" stroke="#F4F1EC" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="40" y1="5" x2="40" y2="75" stroke="#F4F1EC" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="80" y1="5" x2="80" y2="75" stroke="#F4F1EC" strokeWidth="1" strokeDasharray="6 4" />
    </svg>
  );
}
