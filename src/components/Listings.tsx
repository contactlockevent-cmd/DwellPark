const listings = [
  {
    badge: "Nouveau",
    title: "Garage individuel sécurisé",
    location: "Marseille 8e · Prado",
    rating: "4.9",
    features: ["18 m²", "Caméra", "Couvert"],
    price: "120€",
    gradient:
      "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.2) 0%, transparent 50%), linear-gradient(135deg, #0A2540 0%, #14385C 100%)",
  },
  {
    badge: "Camping-car",
    title: "Terrain clôturé 80m²",
    location: "Aubagne · Zone résidentielle",
    rating: "4.8",
    features: ["80 m²", "Clôturé", "24/7"],
    price: "180€",
    gradient:
      "radial-gradient(circle at 70% 70%, rgba(255,107,53,0.35) 0%, transparent 55%), linear-gradient(135deg, #061A2F 0%, #2A5580 100%)",
  },
  {
    badge: "Populaire",
    title: "Box de stockage premium",
    location: "Cassis · Accès direct",
    rating: "5.0",
    features: ["12 m²", "Alarme", "Sec"],
    price: "95€",
    gradient:
      "radial-gradient(circle at 50% 50%, rgba(233,221,205,0.3) 0%, transparent 60%), linear-gradient(135deg, #14385C 0%, #061A2F 100%)",
  },
];

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF6B35">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function Listings() {
  return (
    <section className="py-36 bg-dp-deep">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-24">
          <div
            className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            03 — Espaces disponibles
          </div>
          <h2
            className="font-display font-light tracking-[-0.03em] leading-[0.95] text-dp-cream mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 88px)",
            }}
          >
            Les annonces,<br />
            <em className="text-dp-orange not-italic italic font-normal">éditoriales.</em>
          </h2>
          <p className="text-[19px] text-dp-cream/60 max-w-[560px] leading-relaxed">
            Chaque espace raconte une opportunité. On ne vend pas du parking — on vend du potentiel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {listings.map((l) => (
            <div
              key={l.title}
              className="bg-dp-cream rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(6,26,47,0.35)]"
            >
              {/* Image */}
              <div
                className="aspect-[4/3] relative"
                style={{ background: l.gradient }}
              >
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase bg-dp-cream/95 text-dp-deep backdrop-blur-md"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {l.badge}
                  </span>
                  <button className="w-9 h-9 rounded-full bg-dp-cream/95 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform border-0">
                    <HeartIcon />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex justify-between items-start gap-4 mb-1.5">
                  <h3
                    className="font-display text-[20px] font-medium text-dp-deep leading-snug tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {l.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[14px] font-semibold text-dp-deep whitespace-nowrap">
                    <StarIcon />
                    {l.rating}
                  </div>
                </div>

                <div className="text-[14px] text-dp-deep/55 mb-5">{l.location}</div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {l.features.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.08em] uppercase bg-dp-deep/5 text-dp-deep"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-dp-deep/8">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-display text-[30px] font-normal text-dp-orange tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {l.price}
                    </span>
                    <span className="text-[13px] text-dp-deep/45">/ mois</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-dp-deep text-dp-cream text-[12px] font-medium transition-all duration-200 group-hover:bg-dp-orange group-hover:text-dp-abyss">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button className="px-8 py-4 rounded-full border border-dp-cream/20 text-dp-cream text-[15px] font-medium hover:border-dp-cream/50 transition-all duration-300">
            Voir tous les espaces
          </button>
        </div>
      </div>
    </section>
  );
}
