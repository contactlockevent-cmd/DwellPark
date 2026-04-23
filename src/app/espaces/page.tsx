"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import CategoryNav from "@/components/CategoryNav";
import ListingCard from "@/components/ListingCard";
import SkeletonCard from "@/components/SkeletonCard";
import { listings, type SpaceType } from "@/lib/data";

function EspacesContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [selectedType, setSelectedType] = useState<SpaceType | "">(
    (searchParams.get("type") as SpaceType) ?? ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("budget") ? Number(searchParams.get("budget")) : 300
  );
  const [sortBy, setSortBy] = useState<"price" | "rating" | "surface">("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const activeFilterCount =
    (selectedType ? 1 : 0) +
    (maxPrice < 300 ? 1 : 0) +
    (search ? 1 : 0);

  const filtered = useMemo(() => {
    return listings
      .filter((l) => {
        const matchSearch =
          !search ||
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.location.toLowerCase().includes(search.toLowerCase()) ||
          l.city.toLowerCase().includes(search.toLowerCase());
        const matchType = !selectedType || l.type === selectedType;
        const matchPrice = l.price <= maxPrice;
        return matchSearch && matchType && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.surface - a.surface;
      });
  }, [search, selectedType, maxPrice, sortBy]);

  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showFilters]);

  function resetFilters() {
    setSearch("");
    setSelectedType("");
    setMaxPrice(300);
  }

  const hasActiveFilters = activeFilterCount > 0;

  const FilterContent = (
    <div className="space-y-8">
      {/* Budget */}
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
            {maxPrice === 300 ? "300€+" : `${maxPrice}€`}
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
          <span>50€</span><span>Sans limite</span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <div
          className="text-[10px] text-dp-cream/40 tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Trier par
        </div>
        <div className="space-y-2">
          {(["rating", "price", "surface"] as const).map((opt) => {
            const labels = { rating: "Mieux notés", price: "Prix croissant", surface: "Plus grand" };
            return (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={[
                  "w-full text-left px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-150 border",
                  sortBy === opt
                    ? "bg-dp-orange/10 border-dp-orange/35 text-dp-orange"
                    : "bg-dp-ocean/20 border-dp-cream/12 text-dp-cream/65 hover:border-dp-cream/25 hover:text-dp-cream",
                ].join(" ")}
              >
                {labels[opt]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="text-[12px] text-dp-orange/65 hover:text-dp-orange transition-colors underline underline-offset-4"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="grain" />
      <Navbar />

      {/* Search hero */}
      <div
        className="pt-28 pb-8"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(42,85,128,0.18) 0%, transparent 65%), linear-gradient(180deg, #061A2F 0%, #0A2540 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div
            className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Marseille · PACA · Méditerranée
          </div>
          <h1
            className="font-display font-light tracking-[-0.04em] leading-[0.93] text-dp-cream mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            Trouver un espace<br />
            <em className="text-dp-orange not-italic italic font-normal">près de chez vous.</em>
          </h1>

          {/* Search bar */}
          <SearchBar
            className="max-w-[860px]"
            defaultLocation={search}
            defaultType={selectedType}
            defaultBudget={maxPrice}
            onSearch={({ location, type, budget }) => {
              setSearch(location);
              setSelectedType(type);
              setMaxPrice(budget);
            }}
          />
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-dp-deep border-b border-dp-cream/6 sticky top-20 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <CategoryNav
            active={selectedType}
            onChange={(type) => setSelectedType(type)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="bg-dp-deep py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="flex gap-8">

            {/* Sidebar — desktop */}
            <aside className="hidden lg:block w-[240px] flex-shrink-0">
              <div className="sticky top-36">
                {FilterContent}
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-8 gap-3">
                <p className="text-[14px] text-dp-cream/55">
                  {loading ? (
                    <span className="inline-block w-32 h-4 bg-dp-ocean/30 rounded-full animate-pulse" />
                  ) : (
                    <>
                      <span className="text-dp-cream font-semibold">{filtered.length}</span>
                      {" "}espace{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
                    </>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  {/* Mobile filter */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dp-cream/15 text-dp-cream/65 text-[13px] font-medium hover:border-dp-cream/30 transition-colors"
                  >
                    <FiltersIcon />
                    Filtres
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-dp-orange text-dp-abyss text-[9px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Sort desktop */}
                  <div className="hidden lg:flex items-center gap-2 text-dp-cream/50 text-[13px]">
                    <FiltersIcon />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="bg-transparent text-dp-cream/55 text-[13px] outline-none cursor-pointer hover:text-dp-cream transition-colors"
                    >
                      <option value="rating" className="bg-dp-deep">Mieux notés</option>
                      <option value="price" className="bg-dp-deep">Prix croissant</option>
                      <option value="surface" className="bg-dp-deep">Plus grand</option>
                    </select>
                  </div>

                  {/* Sort mobile */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="lg:hidden bg-transparent text-dp-cream/55 text-[13px] outline-none cursor-pointer"
                  >
                    <option value="rating" className="bg-dp-deep">Mieux notés</option>
                    <option value="price" className="bg-dp-deep">Prix croissant</option>
                    <option value="surface" className="bg-dp-deep">Plus grand</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((listing) => (
                    <ListingCard key={listing.slug} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div
                    className="font-display text-[64px] font-light text-dp-cream/8 mb-4 leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    0
                  </div>
                  <p className="text-[18px] text-dp-cream/40 mb-2">Aucun espace trouvé</p>
                  <p className="text-[14px] text-dp-cream/25 mb-6">Modifiez vos critères de recherche</p>
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-full border border-dp-cream/20 text-dp-cream/60 text-[13px] hover:border-dp-cream/40 hover:text-dp-cream transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-dp-abyss/75 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-dp-deep rounded-t-3xl border-t border-dp-cream/10 max-h-[88vh] overflow-y-auto">
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-1 rounded-full bg-dp-cream/20" />
            </div>
            <div className="px-6 pb-8">
              <div className="flex justify-between items-center mb-7">
                <span
                  className="text-[17px] font-semibold text-dp-cream tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Filtres
                </span>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-9 h-9 rounded-full bg-dp-ocean/30 border border-dp-cream/10 flex items-center justify-center text-dp-cream/50 hover:text-dp-cream transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
              {FilterContent}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-8 py-4 bg-dp-orange text-dp-abyss font-semibold text-[14px] rounded-2xl transition-all hover:opacity-90"
                style={{ boxShadow: "0 6px 24px rgba(255,107,53,0.35)" }}
              >
                Afficher {filtered.length} espace{filtered.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default function EspacesPage() {
  return (
    <Suspense>
      <EspacesContent />
    </Suspense>
  );
}

function FiltersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
