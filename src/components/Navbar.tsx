"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dp-abyss/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
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
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Louer un espace", href: "/espaces" },
            { label: "Mettre en location", href: "/publier" },
            { label: "Comment ça marche", href: "/#how-it-works" },
            { label: "Tarifs", href: "/#tarifs" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-dp-cream/60 hover:text-dp-cream transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm font-medium text-dp-cream/60 hover:text-dp-cream transition-colors">
            Se connecter
          </a>
          <a
            href="#"
            className="px-5 py-2.5 bg-dp-orange text-dp-abyss text-sm font-semibold rounded-full hover:opacity-90 transition-all duration-200 hover:-translate-y-px"
          >
            Proposer mon espace
          </a>
        </div>
      </div>
    </nav>
  );
}
