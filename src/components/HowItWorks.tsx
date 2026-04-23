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
    <section className="py-24 bg-dp-abyss relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-dp-orange/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-12">
          <div
            className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            02 — Comment ça marche
          </div>
          <h2
            className="font-display font-light tracking-[-0.03em] leading-[0.95] text-dp-cream mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3vw, 44px)",
            }}
          >
            Trois étapes.<br />
            <em className="text-dp-orange not-italic italic font-normal">C'est tout.</em>
          </h2>
          <p className="text-[14px] text-dp-cream/55 max-w-[480px] leading-[1.7]">
            Pas de paperasse, pas de démarches complexes. DwellPark s'occupe de tout —
            vous gardez le contrôle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map(({ n, title, desc }) => (
            <div
              key={n}
              className="relative p-8 rounded-2xl border border-dp-cream/8 group hover:border-dp-orange/25 transition-all duration-500"
              style={{ background: "rgba(20,56,92,0.20)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dp-orange/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div
                className="font-display text-[48px] font-light leading-none text-dp-orange/18 mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {n}
              </div>
              <h3
                className="font-display text-[18px] font-normal text-dp-cream tracking-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h3>
              <p className="text-[13px] text-dp-cream/55 leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
