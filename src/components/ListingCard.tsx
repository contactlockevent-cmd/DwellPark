"use client";

import Link from "next/link";
import { useState } from "react";
import type { Listing } from "@/lib/data";

export default function ListingCard({ listing }: { listing: Listing }) {
  const [liked, setLiked] = useState(false);
  const DOTS = 3;

  return (
    <Link href={`/espaces/${listing.slug}`} className="block group outline-none focus-visible:ring-2 focus-visible:ring-dp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dp-deep rounded-3xl">
      <article className="bg-dp-cream rounded-3xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_64px_rgba(6,26,47,0.28)]">

        {/* Image */}
        <div
          className="aspect-[4/3] relative overflow-hidden"
          style={{ background: listing.gradient }}
        >
          {/* Badges row */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            {listing.badge ? (
              <span
                className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase bg-dp-cream/95 text-dp-deep backdrop-blur-md"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {listing.badge}
              </span>
            ) : (
              <span />
            )}

            {/* Wishlist */}
            <button
              onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
              aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95 border-0"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={liked ? "#FF6B35" : "none"}
                stroke={liked ? "#FF6B35" : "#0A2540"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Type badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <span
              className="px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase bg-dp-deep/75 text-dp-cream backdrop-blur-md"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {listing.type}
            </span>
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {Array.from({ length: DOTS }).map((_, i) => (
              <div
                key={i}
                className={[
                  "rounded-full transition-all duration-200",
                  i === 0
                    ? "w-4 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start gap-3 mb-1.5">
            <h3
              className="font-display text-[18px] font-semibold text-dp-deep leading-snug tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {listing.title}
            </h3>
            <div className="flex items-center gap-1 text-[13px] font-semibold text-dp-deep whitespace-nowrap flex-shrink-0">
              <StarIcon />
              {listing.rating}
            </div>
          </div>

          <div className="text-[13px] text-dp-deep/45 mb-4">{listing.location}</div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {listing.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-[0.08em] uppercase bg-dp-deep/8 text-dp-deep/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {f}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-dp-deep/10">
            <div>
              <span
                className="font-display text-[26px] font-normal text-dp-orange tracking-tight leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {listing.price}€
              </span>
              <span className="text-[12px] text-dp-deep/40 ml-1">/ mois</span>
            </div>
            <span className="px-4 py-2 rounded-full bg-dp-deep text-dp-cream text-[12px] font-medium transition-all duration-200 group-hover:bg-dp-orange group-hover:text-dp-abyss">
              Voir l&apos;espace
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B35">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
  );
}
