const links = {
  Plateforme: ["Louer un espace", "Mettre en location", "Comment ça marche", "Tarifs"],
  Entreprise: ["À propos", "Blog", "Presse", "Recrutement"],
  Légal: ["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales"],
};

export default function Footer() {
  return (
    <footer className="bg-dp-abyss border-t border-dp-cream/5">
      <div className="max-w-[1400px] mx-auto px-8 pt-24 pb-12">
        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          {/* Brand */}
          <div className="max-w-[300px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="10" fill="#0A2540" />
                  <path
                    d="M13 16 L20 11 L27 16 L27 30 L13 30 Z"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="23" r="2.5" fill="#FF6B35" />
                </svg>
              </div>
              <span
                className="font-display text-[22px] font-medium tracking-tight text-dp-cream"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DwellPark
              </span>
            </div>
            <p className="text-[14px] text-dp-cream/45 leading-relaxed mb-6">
              La marketplace des espaces qui dorment. Marseille · PACA · Europe.
            </p>
            <div
              className="text-[10px] text-dp-orange tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Mediterranean Futurism
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <div
                  className="text-[10px] text-dp-cream/35 tracking-[0.2em] uppercase mb-5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {category}
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[14px] text-dp-cream/55 hover:text-dp-cream transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-dp-cream/8">
          <div
            className="text-[11px] text-dp-cream/30 tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © 2025 DwellPark · v1.0
          </div>
          <div
            className="text-[11px] text-dp-cream/30 tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Marseille · France
          </div>
        </div>
      </div>
    </footer>
  );
}
