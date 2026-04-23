"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-dp-abyss/96 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_32px_rgba(6,26,47,0.4)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-9 h-9 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
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
            className={[
              "font-display font-medium tracking-tight text-dp-cream transition-all duration-300",
              scrolled ? "text-[18px]" : "text-[22px]",
            ].join(" ")}
            style={{ fontFamily: "var(--font-display)" }}
          >
            DwellPark
          </span>
        </Link>

        {/* Compact search bar — visible on scroll */}
        <div
          className={[
            "flex-1 max-w-[500px] mx-auto transition-all duration-300",
            scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
        >
          <SearchBar compact />
        </div>

        {/* Nav links — hidden on scroll */}
        <div
          className={[
            "hidden md:flex items-center gap-8 flex-shrink-0 transition-all duration-300",
            scrolled ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100",
          ].join(" ")}
        >
          {[
            { label: "Louer un espace", href: "/espaces" },
            { label: "Mettre en location", href: "/publier" },
            { label: "Comment ça marche", href: "/#how-it-works" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] font-medium text-dp-cream/55 hover:text-dp-cream transition-colors duration-200 whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
          <Link
            href="#"
            className="hidden md:block text-[13px] font-medium text-dp-cream/55 hover:text-dp-cream transition-colors whitespace-nowrap"
          >
            Se connecter
          </Link>
          <Link
            href="/publier"
            className="px-5 py-2.5 bg-dp-orange text-dp-abyss text-[13px] font-semibold rounded-full hover:opacity-90 transition-all duration-200 hover:-translate-y-px whitespace-nowrap"
            style={{ boxShadow: scrolled ? "0 4px 16px rgba(255,107,53,0.35)" : "none" }}
          >
            Proposer mon espace
          </Link>
        </div>
      </div>
    </nav>
  );
}
