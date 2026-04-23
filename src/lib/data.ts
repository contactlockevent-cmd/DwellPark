export type SpaceType = "Garage" | "Parking" | "Box" | "Terrain";

export interface Listing {
  slug: string;
  title: string;
  type: SpaceType;
  location: string;
  city: string;
  address: string;
  rating: number;
  reviews: number;
  price: number;
  surface: number;
  badge?: string;
  features: string[];
  amenities: string[];
  description: string;
  gradient: string;
  host: {
    name: string;
    since: string;
    responseTime: string;
    avatar: string;
  };
}

export const listings: Listing[] = [
  {
    slug: "garage-individuel-prado-marseille-8",
    title: "Garage individuel sécurisé",
    type: "Garage",
    location: "Marseille 8e · Prado",
    city: "Marseille",
    address: "Avenue du Prado, 13008 Marseille",
    rating: 4.9,
    reviews: 34,
    price: 120,
    surface: 18,
    badge: "Nouveau",
    features: ["18 m²", "Caméra 24/7", "Couvert", "Électricité"],
    amenities: ["Caméra de surveillance", "Éclairage", "Porte motorisée", "Accès badge"],
    description:
      "Garage fermé et sécurisé situé en plein cœur du quartier Prado. Idéal pour voiture citadine ou stockage. Caméra de surveillance active 24h/24, éclairage automatique, porte motorisée avec badge d'accès. Accès facile depuis l'avenue du Prado, à 200m du métro Rond-Point du Prado.",
    gradient: "radial-gradient(circle at 25% 25%, rgba(255,107,53,0.25) 0%, transparent 50%), linear-gradient(135deg, #0A2540 0%, #14385C 100%)",
    host: { name: "Karim B.", since: "2023", responseTime: "< 1h", avatar: "KB" },
  },
  {
    slug: "terrain-clôturé-camping-car-aubagne",
    title: "Terrain clôturé pour camping-car",
    type: "Terrain",
    location: "Aubagne · Zone résidentielle",
    city: "Aubagne",
    address: "Chemin des Oliviers, 13400 Aubagne",
    rating: 4.8,
    reviews: 21,
    price: 180,
    surface: 80,
    badge: "Camping-car",
    features: ["80 m²", "Clôturé", "Accès 24/7", "Électricité"],
    amenities: ["Portail électrique", "Branchement électrique", "Éclairage", "Vidéosurveillance"],
    description:
      "Grand terrain clôturé de 80m² idéal pour camping-car, caravane ou véhicule utilitaire. Portail électrique télécommandé, branchement 220V disponible, éclairage nocturne. Environnement calme et résidentiel à Aubagne. Parfait pour un stationnement longue durée en toute sécurité.",
    gradient: "radial-gradient(circle at 70% 70%, rgba(255,107,53,0.35) 0%, transparent 55%), linear-gradient(135deg, #061A2F 0%, #2A5580 100%)",
    host: { name: "Sophie M.", since: "2022", responseTime: "< 2h", avatar: "SM" },
  },
  {
    slug: "box-stockage-premium-cassis",
    title: "Box de stockage premium",
    type: "Box",
    location: "Cassis · Accès direct",
    city: "Cassis",
    address: "Route de la Gineste, 13260 Cassis",
    rating: 5.0,
    reviews: 18,
    price: 95,
    surface: 12,
    badge: "Populaire",
    features: ["12 m²", "Alarme", "Sec", "Accès direct"],
    amenities: ["Système d'alarme", "Espace sec et ventilé", "Accès de plain-pied", "Cadenas fourni"],
    description:
      "Box de stockage premium avec accès de plain-pied, idéal pour mobilier, archives ou équipement sportif. Espace parfaitement sec et ventilé, protégé par un système d'alarme. Situé à Cassis avec accès direct depuis la route, pas d'escalier ni d'ascenseur à gérer.",
    gradient: "radial-gradient(circle at 50% 30%, rgba(233,221,205,0.3) 0%, transparent 60%), linear-gradient(135deg, #14385C 0%, #061A2F 100%)",
    host: { name: "Marc D.", since: "2021", responseTime: "< 30min", avatar: "MD" },
  },
  {
    slug: "parking-couvert-vieux-port-marseille-1",
    title: "Place de parking couverte",
    type: "Parking",
    location: "Marseille 1er · Vieux-Port",
    city: "Marseille",
    address: "Quai du Port, 13001 Marseille",
    rating: 4.7,
    reviews: 56,
    price: 85,
    surface: 14,
    badge: undefined,
    features: ["14 m²", "Couvert", "Sécurisé", "Centre-ville"],
    amenities: ["Barrière d'accès", "Couverture totale", "Éclairage LED", "Vidéosurveillance"],
    description:
      "Place de parking couverte au cœur du Vieux-Port. Accès par badge sécurisé, barrière automatique, éclairage LED permanent. Idéal pour éviter le stationnement payant en hypercentre. À 3 minutes à pied du Vieux-Port et du marché aux poissons.",
    gradient: "radial-gradient(circle at 60% 40%, rgba(42,85,128,0.5) 0%, transparent 55%), linear-gradient(135deg, #061A2F 0%, #0A2540 100%)",
    host: { name: "Nadia T.", since: "2020", responseTime: "< 1h", avatar: "NT" },
  },
  {
    slug: "double-garage-aix-en-provence",
    title: "Double garage fermé",
    type: "Garage",
    location: "Aix-en-Provence · Mazarin",
    city: "Aix-en-Provence",
    address: "Rue Cardinale, 13100 Aix-en-Provence",
    rating: 4.9,
    reviews: 12,
    price: 220,
    surface: 36,
    badge: "Premium",
    features: ["36 m²", "Double", "Caméra", "Atelier possible"],
    amenities: ["Double porte motorisée", "Caméra HD", "Prise 220V + 380V", "Lavabo", "Étagères incluses"],
    description:
      "Rare double garage fermé de 36m² dans le quartier Mazarin, secteur le plus prisé d'Aix-en-Provence. Porte motorisée double, alimentation 220V et 380V, lavabo intégré. Peut servir de garage mais aussi d'atelier ou de stockage professionnel. Plafond 2m80.",
    gradient: "radial-gradient(circle at 30% 60%, rgba(255,107,53,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(42,85,128,0.4) 0%, transparent 50%), linear-gradient(135deg, #0A2540 0%, #061A2F 100%)",
    host: { name: "Pierre L.", since: "2022", responseTime: "< 3h", avatar: "PL" },
  },
  {
    slug: "box-moto-toulon-centre",
    title: "Box sécurisé pour moto",
    type: "Box",
    location: "Toulon · Centre",
    city: "Toulon",
    address: "Rue Anatole France, 83000 Toulon",
    rating: 4.6,
    reviews: 29,
    price: 65,
    surface: 6,
    badge: "Moto",
    features: ["6 m²", "Moto", "Alarme", "Couvert"],
    amenities: ["Alarme individuelle", "Prise de charge batterie", "Anneau d'attache", "Couverture complète"],
    description:
      "Box sécurisé spécialement aménagé pour moto ou scooter. Alarme individuelle, prise pour chargeur de batterie, anneau d'attache sol. Idéal pour hiverner sa moto ou la protéger au quotidien. Accès facile au centre de Toulon, pas de manutention.",
    gradient: "radial-gradient(circle at 50% 50%, rgba(255,107,53,0.15) 0%, transparent 55%), linear-gradient(135deg, #14385C 0%, #0A2540 100%)",
    host: { name: "Alexis R.", since: "2023", responseTime: "< 1h", avatar: "AR" },
  },
];

export const SPACE_TYPES: SpaceType[] = ["Garage", "Parking", "Box", "Terrain"];
export const CITIES = ["Toutes les villes", "Marseille", "Aix-en-Provence", "Toulon", "Aubagne", "Cassis"];
