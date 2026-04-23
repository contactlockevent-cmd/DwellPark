const steps = [
  {
    n: "01",
    title: "Publiez votre espace",
    desc: "Décrivez votre garage, box ou terrain en quelques minutes. Photos, disponibilités, prix — tout se configure depuis votre tableau de bord.",
  },
  {
    n: "02",
    title: "Recevez des demandes",
    desc: "DwellPark met en relation les locataires qualifiés avec votre annonce. Vous acceptez ou refusez en un clic.",
  },
  {
    n: "03",
    title: "Encaissez chaque mois",
    desc: "Le paiement est géré par Stripe. Vous recevez votre virement automatiquement, commission déduite. Zéro effort.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-36 bg-dp-abyss relative overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-dp-orange/0 via-dp-orange/50 to-dp-orange/0" />

      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-16">
          <div
            className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            02 — Comment ça marche
          </div>
          <h2
            className="font-display font-light tracking-[-0.03em] leading-[0.95] text-dp-cream mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
            }}
          >
            Trois étapes.<br />
            <em className="text-dp-orange not-italic italic font-normal">C'est tout.</em>
          </h2>
          <p className="text-[19px] text-dp-cream/60 max-w-[560px] leading-relaxed">
            Pas de paperasse, pas de démarches complexes. DwellPark s'occupe de tout —
            vous gardez le contrôle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ n, title, desc }) => (
            <div
              key={n}
              className="relative p-10 rounded-3xl border border-dp-cream/8 backdrop-blur-xl group hover:border-dp-orange/30 transition-all duration-500"
              style={{ background: "rgba(20,56,92,0.25)" }}
            >
              {/* Top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dp-orange/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />

              <div
                className="font-display text-[72px] font-light leading-none text-dp-orange/20 mb-8 tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {n}
              </div>
              <h3
                className="font-display text-[24px] font-normal text-dp-cream tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h3>
              <p className="text-[15px] text-dp-cream/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
