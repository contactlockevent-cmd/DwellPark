export default function CTA() {
  return (
    <section className="py-24 bg-dp-abyss relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,107,53,0.06) 0%, transparent 65%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-14 bg-gradient-to-b from-dp-orange/40 to-transparent" />

      <div className="max-w-[820px] mx-auto px-8 text-center relative z-10">
        <div
          className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-7"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          04 — Rejoindre DwellPark
        </div>
        <h2
          className="font-display font-light tracking-[-0.04em] leading-[0.93] text-dp-cream mb-7"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 50px)",
          }}
        >
          Votre espace dort.<br />
          <em className="text-dp-orange not-italic italic font-normal">Réveillons-le.</em>
        </h2>
        <p className="text-[14px] text-dp-cream/55 max-w-[440px] mx-auto leading-[1.7] mb-10">
          Rejoignez les premiers propriétaires à Marseille et PACA à monétiser leurs espaces
          inutilisés. Inscription gratuite, sans engagement.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            className="px-8 py-4 bg-dp-orange text-dp-abyss font-semibold text-[14px] rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(255,107,53,0.40)]"
            style={{ boxShadow: "0 6px 24px rgba(255,107,53,0.28)" }}
          >
            Publier mon espace gratuitement →
          </button>
          <button className="px-8 py-4 bg-transparent text-dp-cream font-medium text-[14px] rounded-full border border-dp-cream/20 hover:border-dp-cream/45 transition-all duration-300">
            Chercher un espace
          </button>
        </div>
        <p
          className="mt-7 text-[10px] text-dp-cream/25 tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Commission 15% · Paiement Stripe · Zéro abonnement
        </p>
      </div>
    </section>
  );
}
