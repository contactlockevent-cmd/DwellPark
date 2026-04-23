"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { SpaceType } from "@/lib/data";

const FORM_AMENITIES = [
  "Couvert", "Sécurisé", "Électricité", "Caméra de surveillance",
  "Alarme", "Accès 24/7", "Porte motorisée", "Éclairage", "Portail électrique", "Wifi",
];

const FORM_CITIES = [
  "Marseille", "Aix-en-Provence", "Toulon", "Aubagne", "Cassis", "La Ciotat", "Autre",
];

const SPACE_TYPES_CONFIG: { type: SpaceType; desc: string }[] = [
  { type: "Garage", desc: "Espace fermé, idéal voiture ou stockage lourd" },
  { type: "Parking", desc: "Place en surface ou souterraine" },
  { type: "Box", desc: "Espace de stockage sécurisé" },
  { type: "Terrain", desc: "Parcelle clôturée pour grand véhicule" },
];

const STEPS = ["Type", "Localisation", "Détails", "Publication"];

type FormData = {
  type: SpaceType | null;
  address: string;
  city: string;
  postalCode: string;
  surface: string;
  price: string;
  features: string[];
  description: string;
};

function TypeIcon({ type }: { type: SpaceType }) {
  if (type === "Garage") return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="13" width="24" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 13L16 4L28 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="11" y="21" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="21" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  if (type === "Parking") return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 24V8H18.5C21.5376 8 24 10.4624 24 13.5C24 16.5376 21.5376 19 18.5 19H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (type === "Box") return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M4 10L16 4L28 10V22L16 28L4 22V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 10L16 16L28 10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="16" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="8" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="20" x2="29" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="8" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="8" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

export default function PublierPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    type: null,
    address: "",
    city: "",
    postalCode: "",
    surface: "",
    price: "",
    features: [],
    description: "",
  });

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFeature(f: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));
  }

  function canProceed() {
    if (step === 1) return !!form.type;
    if (step === 2) return !!form.address.trim() && !!form.city && !!form.postalCode.trim();
    if (step === 3) return !!form.surface && !!form.price && form.description.trim().length >= 20;
    return true;
  }

  const netPrice = form.price
    ? Number(form.price) - Math.round(Number(form.price) * 0.15)
    : 0;

  if (submitted) {
    return (
      <>
        <div className="grain" />
        <Navbar />
        <div className="bg-dp-deep min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-[480px]">
            <div className="w-20 h-20 rounded-full bg-dp-orange/10 border border-dp-orange/30 flex items-center justify-center mx-auto mb-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h1
              className="font-display text-[clamp(32px,5vw,48px)] font-light text-dp-cream tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Espace <em className="text-dp-orange not-italic italic">soumis.</em>
            </h1>
            <p className="text-[16px] text-dp-cream/50 mb-10 leading-relaxed">
              Votre annonce est en cours de vérification. Vous recevrez une confirmation sous 24h.
            </p>
            <a
              href="/espaces"
              className="inline-block px-8 py-3.5 rounded-full bg-dp-orange text-dp-abyss font-semibold text-[15px] hover:opacity-90 transition-opacity"
            >
              Explorer les espaces
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="grain" />
      <Navbar />

      <div className="bg-dp-deep min-h-screen pt-28 pb-24">
        <div className="max-w-[680px] mx-auto px-6">

          {/* Header */}
          <div className="mb-12">
            <div
              className="text-[11px] text-dp-orange tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Mettre en location
            </div>
            <h1
              className="font-display text-[clamp(32px,5vw,52px)] font-light text-dp-cream tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Publiez votre<br />
              <em className="text-dp-orange not-italic italic font-normal">espace inutilisé.</em>
            </h1>
          </div>

          {/* Progress bar */}
          <div className="flex items-start mb-12">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const isActive = n === step;
              const isDone = n < step;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-300 ${
                        isDone
                          ? "bg-dp-orange text-dp-abyss"
                          : isActive
                          ? "bg-dp-orange/15 border border-dp-orange text-dp-orange"
                          : "bg-dp-ocean/20 border border-dp-cream/10 text-dp-cream/25"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {isDone ? <CheckIcon /> : n}
                    </div>
                    <span
                      className={`text-[10px] tracking-[0.1em] uppercase transition-colors ${
                        isActive || isDone ? "text-dp-cream/50" : "text-dp-cream/18"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-3 mb-6 transition-colors duration-500 ${
                        isDone ? "bg-dp-orange/35" : "bg-dp-cream/8"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form card */}
          <div className="rounded-3xl border border-dp-cream/8 bg-dp-ocean/15 backdrop-blur-xl p-8 md:p-10">

            {/* Step 1 — Type */}
            {step === 1 && (
              <div>
                <h2
                  className="font-display text-[26px] font-normal text-dp-cream tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Quel type d'espace proposez-vous ?
                </h2>
                <p className="text-[14px] text-dp-cream/35 mb-8">
                  Choisissez la catégorie qui correspond le mieux.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {SPACE_TYPES_CONFIG.map(({ type, desc }) => {
                    const active = form.type === type;
                    return (
                      <button
                        key={type}
                        onClick={() => update("type", type)}
                        className={`p-6 rounded-2xl border text-left transition-all duration-200 ${
                          active
                            ? "bg-dp-orange/10 border-dp-orange/50"
                            : "bg-dp-deep/40 border-dp-cream/10 hover:border-dp-cream/25"
                        }`}
                      >
                        <div className={`mb-4 ${active ? "text-dp-orange" : "text-dp-cream/35"}`}>
                          <TypeIcon type={type} />
                        </div>
                        <div className={`font-semibold text-[16px] mb-1 ${active ? "text-dp-orange" : "text-dp-cream/80"}`}>
                          {type}
                        </div>
                        <div className={`text-[13px] leading-snug ${active ? "text-dp-orange/60" : "text-dp-cream/30"}`}>
                          {desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2 — Localisation */}
            {step === 2 && (
              <div>
                <h2
                  className="font-display text-[26px] font-normal text-dp-cream tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Où se trouve votre espace ?
                </h2>
                <p className="text-[14px] text-dp-cream/35 mb-8">
                  L'adresse exacte n'est visible qu'après réservation confirmée.
                </p>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="12 rue des Acrobates"
                      className="w-full px-5 py-3.5 rounded-xl bg-dp-deep/60 border border-dp-cream/10 text-dp-cream placeholder:text-dp-cream/22 text-[15px] outline-none focus:border-dp-orange/50 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Ville
                      </label>
                      <select
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-dp-deep/60 border border-dp-cream/10 text-dp-cream text-[15px] outline-none focus:border-dp-orange/50 transition-colors cursor-pointer"
                      >
                        <option value="" disabled className="bg-dp-deep text-dp-cream/40">
                          Choisir...
                        </option>
                        {FORM_CITIES.map((c) => (
                          <option key={c} value={c} className="bg-dp-deep">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Code postal
                      </label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                        placeholder="13001"
                        maxLength={5}
                        className="w-full px-5 py-3.5 rounded-xl bg-dp-deep/60 border border-dp-cream/10 text-dp-cream placeholder:text-dp-cream/22 text-[15px] outline-none focus:border-dp-orange/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Détails */}
            {step === 3 && (
              <div>
                <h2
                  className="font-display text-[26px] font-normal text-dp-cream tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Décrivez votre espace
                </h2>
                <p className="text-[14px] text-dp-cream/35 mb-8">
                  Plus vous êtes précis, plus vous attirerez les bons locataires.
                </p>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Surface (m²)
                      </label>
                      <input
                        type="number"
                        value={form.surface}
                        onChange={(e) => update("surface", e.target.value)}
                        placeholder="18"
                        min={1}
                        className="w-full px-5 py-3.5 rounded-xl bg-dp-deep/60 border border-dp-cream/10 text-dp-cream placeholder:text-dp-cream/22 text-[15px] outline-none focus:border-dp-orange/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Prix / mois (€)
                      </label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) => update("price", e.target.value)}
                        placeholder="120"
                        min={30}
                        max={1000}
                        className="w-full px-5 py-3.5 rounded-xl bg-dp-deep/60 border border-dp-cream/10 text-dp-cream placeholder:text-dp-cream/22 text-[15px] outline-none focus:border-dp-orange/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Équipements
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {FORM_AMENITIES.map((f) => {
                        const active = form.features.includes(f);
                        return (
                          <button
                            key={f}
                            type="button"
                            onClick={() => toggleFeature(f)}
                            className={`px-4 py-2 rounded-xl text-[13px] border transition-all duration-200 ${
                              active
                                ? "bg-dp-orange/10 border-dp-orange/50 text-dp-orange"
                                : "bg-dp-deep/40 border-dp-cream/10 text-dp-cream/55 hover:border-dp-cream/25"
                            }`}
                          >
                            {f}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[10px] text-dp-cream/35 tracking-[0.18em] uppercase mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Décrivez votre espace : accès, sécurité, particularités, proximité des transports..."
                      rows={4}
                      className="w-full px-5 py-4 rounded-xl bg-dp-deep/60 border border-dp-cream/10 text-dp-cream placeholder:text-dp-cream/22 text-[15px] outline-none focus:border-dp-orange/50 transition-colors resize-none"
                    />
                    <div
                      className={`text-right text-[11px] mt-1.5 transition-colors ${
                        form.description.length >= 20 ? "text-dp-cream/25" : "text-dp-orange/55"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {form.description.length < 20
                        ? `encore ${20 - form.description.length} car.`
                        : `${form.description.length} car.`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Confirmation */}
            {step === 4 && (
              <div>
                <h2
                  className="font-display text-[26px] font-normal text-dp-cream tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Votre annonce en résumé
                </h2>
                <p className="text-[14px] text-dp-cream/35 mb-8">
                  Vérifiez les informations avant de publier.
                </p>

                <div className="space-y-0 mb-8">
                  {[
                    { label: "Type", value: form.type ?? "" },
                    { label: "Adresse", value: `${form.address}, ${form.postalCode} ${form.city}` },
                    { label: "Surface", value: `${form.surface} m²` },
                    { label: "Prix", value: `${form.price}€ / mois` },
                    {
                      label: "Équipements",
                      value: form.features.length ? form.features.join(", ") : "—",
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-5 py-4 border-b border-dp-cream/8">
                      <span
                        className="text-[10px] text-dp-cream/30 tracking-[0.12em] uppercase w-24 flex-shrink-0 pt-1"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {label}
                      </span>
                      <span className="text-[15px] text-dp-cream/75">{value}</span>
                    </div>
                  ))}
                  {form.description && (
                    <div className="flex gap-5 py-4">
                      <span
                        className="text-[10px] text-dp-cream/30 tracking-[0.12em] uppercase w-24 flex-shrink-0 pt-1"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Description
                      </span>
                      <span className="text-[15px] text-dp-cream/75 leading-relaxed">
                        {form.description}
                      </span>
                    </div>
                  )}
                </div>

                {form.price && (
                  <div className="p-5 rounded-2xl bg-dp-orange/5 border border-dp-orange/15">
                    <div
                      className="text-[10px] text-dp-orange/60 tracking-[0.18em] uppercase mb-4"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Vos revenus estimés
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[14px] text-dp-cream/45">
                        <span>Loyer brut / mois</span>
                        <span>{form.price}€</span>
                      </div>
                      <div className="flex justify-between text-[14px] text-dp-cream/45">
                        <span>Commission DwellPark (15%)</span>
                        <span>−{Math.round(Number(form.price) * 0.15)}€</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[16px] font-semibold text-dp-cream mt-4 pt-4 border-t border-dp-orange/15">
                      <span>Vous recevez</span>
                      <span className="text-dp-orange">{netPrice}€</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className={`flex mt-10 ${step > 1 ? "justify-between" : "justify-end"}`}>
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-3 rounded-full border border-dp-cream/12 text-dp-cream/50 text-[14px] font-medium hover:border-dp-cream/28 hover:text-dp-cream/80 transition-all"
                >
                  Retour
                </button>
              )}
              {step < 4 ? (
                <button
                  onClick={() => { if (canProceed()) setStep((s) => s + 1); }}
                  disabled={!canProceed()}
                  className={`px-8 py-3 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                    canProceed()
                      ? "bg-dp-orange text-dp-abyss hover:opacity-90 hover:-translate-y-px"
                      : "bg-dp-cream/8 text-dp-cream/22 cursor-not-allowed"
                  }`}
                >
                  Continuer
                </button>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-8 py-3 rounded-full bg-dp-orange text-dp-abyss font-semibold text-[14px] hover:opacity-90 hover:-translate-y-px transition-all duration-200"
                  style={{ boxShadow: "0 8px 32px rgba(255,107,53,0.28)" }}
                >
                  Publier mon espace
                </button>
              )}
            </div>
          </div>

          {/* Trust line */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-10 text-[11px] text-dp-cream/20"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {[
              "Vérification sous 24h",
              "Publication gratuite",
              "15% au premier loyer seulement",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-dp-orange/35" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
