"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CITIES, SPACE_TYPES, type SpaceType } from "@/lib/data";

interface SearchBarProps {
  compact?: boolean;
  className?: string;
  defaultLocation?: string;
  defaultType?: SpaceType | "";
  defaultBudget?: number;
  onSearch?: (params: { location: string; type: SpaceType | ""; budget: number }) => void;
}

type ActiveField = "location" | "type" | "budget" | null;

export default function SearchBar({
  compact = false,
  className = "",
  defaultLocation = "",
  defaultType = "",
  defaultBudget = 300,
  onSearch,
}: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultLocation);
  const [type, setType] = useState<SpaceType | "">(defaultType);
  const [budget, setBudget] = useState(defaultBudget);
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveField(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggle(field: ActiveField) {
    setActiveField((prev) => (prev === field ? null : field));
  }

  function handleSearch() {
    if (onSearch) {
      onSearch({ location, type, budget });
      setActiveField(null);
      return;
    }
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (type) params.set("type", type);
    if (budget < 300) params.set("budget", String(budget));
    router.push(`/espaces${params.toString() ? `?${params}` : ""}`);
    setActiveField(null);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Pill */}
      <div
        className={[
          "flex items-center w-full rounded-full",
          "bg-dp-abyss/85 backdrop-blur-xl",
          "border transition-all duration-200",
          activeField
            ? "border-dp-cream/25 shadow-[0_8px_48px_rgba(6,26,47,0.65)]"
            : "border-dp-cream/12 shadow-[0_4px_28px_rgba(6,26,47,0.4)] hover:border-dp-cream/20",
          compact ? "h-12" : "h-[68px]",
        ].join(" ")}
      >
        {/* Lieu */}
        <button
          onClick={() => toggle("location")}
          className={[
            "flex-1 flex flex-col justify-center text-left rounded-full",
            "transition-colors duration-150",
            compact ? "px-5 py-2" : "px-7 py-3",
            activeField === "location" ? "bg-dp-cream/8" : "hover:bg-dp-cream/5",
          ].join(" ")}
        >
          {!compact && (
            <span
              className="text-[10px] font-semibold text-dp-cream/40 uppercase tracking-[0.2em] mb-[3px] leading-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Où ?
            </span>
          )}
          <span
            className={[
              "font-medium leading-none truncate",
              compact ? "text-[13px]" : "text-[15px]",
              location ? "text-dp-cream" : "text-dp-cream/40",
            ].join(" ")}
          >
            {location || (compact ? "Lieu" : "Ville, quartier...")}
          </span>
        </button>

        <Separator />

        {/* Type */}
        <button
          onClick={() => toggle("type")}
          className={[
            "flex flex-col justify-center text-left transition-colors duration-150 flex-shrink-0",
            compact ? "px-5 py-2 w-[130px]" : "px-7 py-3 w-[168px]",
            activeField === "type" ? "bg-dp-cream/8" : "hover:bg-dp-cream/5",
          ].join(" ")}
        >
          {!compact && (
            <span
              className="text-[10px] font-semibold text-dp-cream/40 uppercase tracking-[0.2em] mb-[3px] leading-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Type
            </span>
          )}
          <span
            className={[
              "font-medium leading-none truncate",
              compact ? "text-[13px]" : "text-[15px]",
              type ? "text-dp-cream" : "text-dp-cream/40",
            ].join(" ")}
          >
            {type || (compact ? "Type" : "Type d'espace")}
          </span>
        </button>

        <Separator />

        {/* Budget */}
        <button
          onClick={() => toggle("budget")}
          className={[
            "flex flex-col justify-center text-left transition-colors duration-150 flex-shrink-0",
            compact ? "px-5 py-2 w-[110px]" : "px-7 py-3 w-[140px]",
            activeField === "budget" ? "bg-dp-cream/8" : "hover:bg-dp-cream/5",
          ].join(" ")}
        >
          {!compact && (
            <span
              className="text-[10px] font-semibold text-dp-cream/40 uppercase tracking-[0.2em] mb-[3px] leading-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Budget
            </span>
          )}
          <span
            className={[
              "font-medium leading-none",
              compact ? "text-[13px]" : "text-[15px]",
              budget < 300 ? "text-dp-cream" : "text-dp-cream/40",
            ].join(" ")}
          >
            {budget < 300 ? `≤ ${budget}€` : compact ? "Budget" : "Prix max"}
          </span>
        </button>

        {/* CTA */}
        <div className={compact ? "pr-1.5" : "pr-2.5"}>
          <button
            onClick={handleSearch}
            aria-label="Rechercher"
            className={[
              "rounded-full bg-dp-orange text-dp-abyss",
              "flex items-center justify-center",
              "transition-all duration-200 hover:opacity-90 active:scale-95",
              compact ? "w-9 h-9" : "w-[52px] h-[52px]",
            ].join(" ")}
            style={{ boxShadow: "0 4px 20px rgba(255,107,53,0.5)" }}
          >
            <SearchIcon size={compact ? 14 : 18} />
          </button>
        </div>
      </div>

      {/* Dropdowns */}
      {activeField && (
        <div className="absolute top-[calc(100%+10px)] left-0 z-[60]">
          <div className="bg-dp-abyss border border-dp-cream/12 rounded-2xl shadow-[0_20px_60px_rgba(6,26,47,0.75)] overflow-hidden">

            {activeField === "location" && (
              <div className="p-4 w-[280px]">
                <div className="relative mb-2">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dp-cream/30 pointer-events-none">
                    <SearchIcon size={13} />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Chercher une ville..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full pl-10 pr-4 py-3 bg-dp-ocean/30 border border-dp-cream/10 rounded-xl text-dp-cream placeholder:text-dp-cream/30 text-[14px] outline-none focus:border-dp-orange/40 transition-colors"
                  />
                </div>
                <div>
                  {CITIES
                    .filter((c) => c !== "Toutes les villes")
                    .filter((c) => !location || c.toLowerCase().includes(location.toLowerCase()))
                    .map((city) => (
                      <button
                        key={city}
                        onClick={() => { setLocation(city); setActiveField(null); }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] text-dp-cream/60 hover:bg-dp-cream/8 hover:text-dp-cream transition-colors text-left"
                      >
                        <PinIcon />
                        {city}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {activeField === "type" && (
              <div className="p-4 w-[260px]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setType(""); setActiveField(null); }}
                    className={typeOptionClass(type === "")}
                  >
                    Tous
                  </button>
                  {SPACE_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setType(t); setActiveField(null); }}
                      className={typeOptionClass(type === t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeField === "budget" && (
              <div className="p-6 w-[300px]">
                <div className="mb-5">
                  <span
                    className="font-display text-[40px] font-light text-dp-orange tracking-tight leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {budget === 300 ? "300+" : budget}
                  </span>
                  <span className="text-dp-cream/40 text-[14px] ml-2">€ / mois max</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={300}
                  step={10}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-dp-orange mb-2"
                />
                <div
                  className="flex justify-between text-[11px] text-dp-cream/30 mt-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span>50€</span>
                  <span>Sans limite</span>
                </div>
                <button
                  onClick={() => setActiveField(null)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-dp-orange/10 border border-dp-orange/25 text-dp-orange text-[13px] font-medium hover:bg-dp-orange/20 transition-colors"
                >
                  Appliquer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function typeOptionClass(active: boolean) {
  return [
    "px-4 py-3.5 rounded-xl text-[14px] font-medium transition-all border text-center",
    active
      ? "bg-dp-orange/15 border-dp-orange/40 text-dp-orange"
      : "bg-dp-ocean/20 border-dp-cream/10 text-dp-cream/65 hover:border-dp-cream/25 hover:text-dp-cream",
  ].join(" ");
}

function Separator() {
  return <div className="w-px h-7 bg-dp-cream/10 flex-shrink-0" />;
}

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dp-cream/35 flex-shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
