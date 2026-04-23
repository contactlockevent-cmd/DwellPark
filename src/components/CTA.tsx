export default function CTA() {
  return (
    <section className="py-36 bg-dp-abyss relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,107,53,0.08) 0%, transparent 65%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-dp-orange/50 to-transparent" />

      <div className="max-w-[900px] mx-auto px-8 text-center relative z-10">
        <div
          className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          04 — Rejoindre DwellPark
        </div>
        <h2
          className="font-display font-light tracking-[-0.04em] leading-[0.92] text-dp-cream mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 8vw, 100px)",
          }}
        >
          Votre espace dort.<br />
          <em className="text-dp-orange not-italic italic font-normal">Réveillons-le.</em>
        </h2>
        <p className="text-[19px] text-dp-cream/60 max-w-[560px] mx-auto leading-relaxed mb-14">
          Rejoignez les premiers propriétaires à Marseille et PACA à monétiser leurs espaces
          inutilisés. Inscription gratuite, sans engagement.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="px-10 py-5 bg-dp-orange text-dp-abyss font-semibold text-[16px] rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(255,107,53,0.45)]"
            style={{ boxShadow: "0 8px 32px rgba(255,107,53,0.35)" }}
          >
            Publier mon espace gratuitement →
          </button>
          <button className="px-10 py-5 bg-transparent text-dp-cream font-semibold text-[16px] rounded-full border border-dp-cream/20 hover:border-dp-cream/50 transition-all duration-300">
            Chercher un espace
          </button>
        </div>
        <p
          className="mt-8 text-[11px] text-dp-cream/30 tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Commission 15% · Paiement Stripe · Zéro abonnement
        </p>
      </div>
    </section>
  );
}
