"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { listings, SPACE_TYPES, CITIES, type SpaceType } from "@/lib/data";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export default function EspacesPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");
  const [selectedTypes, setSelectedTypes] = useState<SpaceType[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "surface">("rating");

  const toggleType = (type: SpaceType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filtered = useMemo(() => {
    return listings
      .filter((l) => {
        const matchSearch =
          !search ||
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.location.toLowerCase().includes(search.toLowerCase()) ||
          l.city.toLowerCase().includes(search.toLowerCase());
        const matchCity = selectedCity === "Toutes les villes" || l.city === selectedCity;
        const matchType = selectedTypes.length === 0 || selectedTypes.includes(l.type);
        const matchPrice = l.price <= maxPrice;
        return matchSearch && matchCity && matchType && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.surface - a.surface;
      });
  }, [search, selectedCity, selectedTypes, maxPrice, sortBy]);

  return (
    <>
      <div className="grain" />
      <Navbar />

      {/* Search hero */}
      <div
        className="pt-32 pb-16 relative"
        style={{
          background: "radial-gradient(ellipse at top, rgba(42,85,128,0.2) 0%, transparent 65%), linear-gradient(180deg, #061A2F 0%, #0A2540 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div
            className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Marseille · PACA · Méditerranée
          </div>
          <h1
            className="font-display font-light tracking-[-0.04em] leading-[0.92] text-dp-cream mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            Trouver un espace<br />
            <em className="text-dp-orange not-italic italic font-normal">près de chez vous.</em>
          </h1>

          {/* Search bar */}
          <div className="flex gap-3 max-w-[820px]">
            <div className="relative flex-1">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dp-cream/40">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Ville, quartier, type d'espace..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-13 pr-6 py-4 rounded-2xl bg-dp-ocean/40 border border-dp-cream/10 text-dp-cream placeholder:text-dp-cream/35 text-[15px] outline-none focus:border-dp-orange/50 transition-colors backdrop-blur-xl"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-5 py-4 rounded-2xl bg-dp-ocean/40 border border-dp-cream/10 text-dp-cream text-[14px] outline-none focus:border-dp-orange/50 transition-colors backdrop-blur-xl cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-dp-deep">{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-dp-deep py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex gap-8">

            {/* Sidebar filters */}
            <aside className="hidden lg:block w-[260px] flex-shrink-0">
              <div className="sticky top-28 space-y-8">

                {/* Types */}
                <div>
                  <div
                    className="text-[10px] text-dp-cream/40 tracking-[0.2em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Type d'espace
                  </div>
                  <div className="space-y-2">
                    {SPACE_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 border ${
                          selectedTypes.includes(type)
                            ? "bg-dp-orange/10 border-dp-orange/40 text-dp-orange"
                            : "bg-dp-ocean/20 border-dp-cream/15 text-dp-cream/70 hover:border-dp-cream/30"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div
                    className="text-[10px] text-dp-cream/40 tracking-[0.2em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Budget max / mois
                  </div>
                  <div className="mb-3">
                    <span
                      className="font-display text-[28px] text-dp-orange tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {maxPrice}€
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={300}
                    step={10}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-dp-orange"
                  />
                  <div className="flex justify-between text-[11px] text-dp-cream/30 mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                    <span>50€</span><span>300€</span>
                  </div>
                </div>

                {/* Reset */}
                {(selectedTypes.length > 0 || selectedCity !== "Toutes les villes" || search) && (
                  <button
                    onClick={() => { setSelectedTypes([]); setSelectedCity("Toutes les villes"); setSearch(""); setMaxPrice(300); }}
                    className="text-[12px] text-dp-orange/70 hover:text-dp-orange transition-colors underline underline-offset-4"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-dp-orange" />
                  <span className="text-[14px] text-dp-cream/60">
                    <span className="text-dp-cream font-semibold">{filtered.length}</span> espace{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-dp-cream/60">
                  <SlidersIcon />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-transparent text-dp-cream/60 text-[13px] outline-none cursor-pointer"
                  >
                    <option value="rating" className="bg-dp-deep">Mieux notés</option>
                    <option value="price" className="bg-dp-deep">Prix croissant</option>
                    <option value="surface" className="bg-dp-deep">Plus grand</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((listing) => (
                    <ListingCard key={listing.slug} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div
                    className="font-display text-[64px] font-light text-dp-cream/10 mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    0
                  </div>
                  <div className="text-[18px] text-dp-cream/40 mb-2">Aucun espace trouvé</div>
                  <div className="text-[14px] text-dp-cream/25">Modifiez vos critères de recherche</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
