import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DwellPark — La marketplace des espaces qui dorment",
  description:
    "Garage, box, parking, terrain — transformez vos espaces inutilisés en source de revenus récurrents. Mise en relation, paiement sécurisé, gestion automatisée.",
  keywords: ["parking", "garage", "location", "espace", "Marseille", "PACA", "marketplace"],
  openGraph: {
    title: "DwellPark",
    description: "Vos espaces inutilisés, votre revenu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dp-deep text-dp-cream">{children}</body>
    </html>
  );
}
