"use client";

import { useRef, useState, useEffect } from "react";
import type { SpaceType } from "@/lib/data";

const CATEGORIES: { id: SpaceType | ""; label: string; icon: React.ReactNode }[] = [
  { id: "", label: "Tous", icon: <AllIcon /> },
  { id: "Garage", label: "Garages", icon: <GarageIcon /> },
  { id: "Parking", label: "Parkings", icon: <ParkingIcon /> },
  { id: "Box", label: "Box & Stockage", icon: <BoxIcon /> },
  { id: "Terrain", label: "Terrains", icon: <TerrainIcon /> },
];

interface CategoryNavProps {
  active: SpaceType | "";
  onChange: (type: SpaceType | "") => void;
}

export default function CategoryNav({ active, onChange }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 240 : -240, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dp-deep to-transparent z-10 pointer-events-none" />
          <button
            onClick={() => scroll("left")}
            aria-label="Défiler à gauche"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-dp-deep border border-dp-cream/15 flex items-center justify-center text-dp-cream/60 hover:text-dp-cream hover:border-dp-cream/30 transition-all"
          >
            <ChevronIcon dir="left" />
          </button>
        </>
      )}

      {/* Right fade + arrow */}
      {canScrollRight && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dp-deep to-transparent z-10 pointer-events-none" />
          <button
            onClick={() => scroll("right")}
            aria-label="Défiler à droite"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-dp-deep border border-dp-cream/15 flex items-center justify-center text-dp-cream/60 hover:text-dp-cream hover:border-dp-cream/30 transition-all"
          >
            <ChevronIcon dir="right" />
          </button>
        </>
      )}

      {/* Scrollable rail */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scrollbar-hide pb-px"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id || "all"}
              onClick={() => onChange(cat.id)}
              className={[
                "flex flex-col items-center gap-2 px-5 py-3 flex-shrink-0",
                "transition-all duration-200 group relative",
                isActive ? "text-dp-cream" : "text-dp-cream/45 hover:text-dp-cream/75",
              ].join(" ")}
            >
              {/* Icon */}
              <div
                className={[
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                  isActive
                    ? "bg-dp-ocean/60 border border-dp-cream/15"
                    : "bg-transparent group-hover:bg-dp-cream/5",
                ].join(" ")}
              >
                {cat.icon}
              </div>

              {/* Label */}
              <span
                className="text-[12px] font-medium whitespace-nowrap leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {cat.label}
              </span>

              {/* Active underline */}
              <div
                className={[
                  "absolute bottom-0 left-5 right-5 h-[2px] rounded-full transition-all duration-200",
                  isActive ? "bg-dp-cream" : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left"
        ? <path d="M15 18l-6-6 6-6" />
        : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

function AllIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function GarageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 4l9 5.5V20H3V9.5z" />
      <rect x="8" y="14" width="8" height="6" rx="1" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function TerrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M3 14l4-8 4 5 3-3 4 6" />
    </svg>
  );
}
