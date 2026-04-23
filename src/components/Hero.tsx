export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top right, rgba(255,107,53,0.12) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(42,85,128,0.25) 0%, transparent 60%), linear-gradient(180deg, #061A2F 0%, #0A2540 100%)",
      }}
    >
      {/* Vertical accent line */}
      <div
        className="absolute top-[15%] -left-[5%] w-px h-[70%] opacity-40"
        style={{
          background: "linear-gradient(180deg, transparent, #FF6B35, transparent)",
          transform: "rotate(-15deg)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
        <div className="max-w-[900px]">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-3 px-4 py-2 rounded-full border border-dp-orange/30 bg-dp-orange/8 mb-14">
            <span className="w-1.5 h-1.5 rounded-full bg-dp-orange animate-pulse-dot" />
            <span
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-dp-orange"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Marketplace · Marseille · PACA
            </span>
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up animate-delay-100 font-display font-light tracking-[-0.04em] leading-[0.88] mb-14"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 11vw, 160px)",
            }}
          >
            <span className="text-dp-cream block">Vos espaces</span>
            <span className="text-dp-cream block">inutilisés,</span>
            <em className="text-dp-orange not-italic italic font-normal block">votre revenu.</em>
          </h1>

          {/* Baseline */}
          <div className="animate-fade-up animate-delay-200 mb-16 max-w-[600px]">
            <p
              className="text-[19px] text-dp-cream/65 leading-relaxed"
            >
              Garage, box, parking, terrain — transformez ce qui dort chez vous en source
              de revenus récurrents. Mise en relation, paiement sécurisé, gestion automatisée.
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up animate-delay-200 flex flex-wrap gap-4 mb-20">
            <button
              className="px-8 py-4 bg-dp-orange text-dp-abyss font-semibold text-[15px] rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,107,53,0.45)]"
              style={{ boxShadow: "0 8px 32px rgba(255,107,53,0.35)" }}
            >
              Proposer mon espace →
            </button>
            <button className="px-8 py-4 bg-transparent text-dp-cream font-semibold text-[15px] rounded-full border border-dp-cream/25 hover:border-dp-cream/60 transition-all duration-300">
              Chercher un espace
            </button>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up animate-delay-300 flex flex-wrap gap-16 pt-10 border-t border-dp-cream/10"
          >
            {[
              { value: "+350€", label: "Revenu moyen / mois" },
              { value: "15%", label: "Commission seulement" },
              { value: "48h", label: "Première réservation" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="font-display text-[42px] font-light text-dp-orange tracking-tight leading-none mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value}
                </div>
                <div
                  className="text-[10px] text-dp-cream/45 uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating card */}
      <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col gap-4 w-[300px]">
        <div
          className="rounded-2xl overflow-hidden border border-white/10"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,107,53,0.35) 0%, transparent 50%), linear-gradient(135deg, #0A2540 0%, #061A2F 100%)",
          }}
        >
          <div className="aspect-[4/3] relative p-5 flex flex-col justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-dp-orange animate-pulse-dot" />
              <span className="text-[10px] text-dp-cream tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Disponible
              </span>
            </div>
            <div>
              <div className="font-display text-[22px] font-normal text-dp-cream tracking-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Garage sécurisé
              </div>
              <div className="text-[13px] text-dp-cream/60 mb-3">13008 Marseille · 18m² · Caméra 24/7</div>
              <div className="font-display text-[26px] text-dp-orange tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                120€ <span className="text-[14px] text-dp-cream/50 font-sans">/ mois</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-white/10 bg-dp-ocean/30 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-dp-orange/20 border border-dp-orange/30 flex items-center justify-center">
              <svg width="14" height="14" fill="none" stroke="#FF6B35" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-dp-cream">Paiement reçu</div>
              <div className="text-[11px] text-dp-cream/50">Il y a 2 minutes</div>
            </div>
          </div>
          <div className="font-display text-[28px] text-dp-cream tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            +120<em className="text-dp-orange">€</em>
          </div>
          <div className="text-[11px] text-dp-cream/40 mt-1" style={{ fontFamily: "var(--font-mono)" }}>STRIPE · SÉCURISÉ · RÉCURRENT</div>
        </div>
      </div>
    </section>
  );
}
