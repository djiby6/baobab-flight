export const site = {
  name: "Baobab Flight",
  tagline: "Local Service, International Fun!",
  subSlogan: "Voyages sur-mesure & Billets d'avion",
  description:
    "Agence de voyage internationale basée au Maroc et au Sénégal : billets d'avion aux meilleurs tarifs, itinéraires sur-mesure et accompagnement VIP 24/7 sur WhatsApp.",
  founder: {
    name: "Djibril NDIAYE",
    role: "Fondateur & Expert Voyage",
  },
  locations: "Maroc & Sénégal",
  whatsappNumber: "212773591012",
  phone: "+212 773 591 012",
  phoneHref: "tel:+212773591012",
  email: "marketingdj12@gmail.com",
  address: "Casablanca, Maroc · Dakar, Sénégal",
  hours: "Lun — Dim · 24h/24",
  offices: [
    {
      country: "Maroc",
      city: "Casablanca",
      label: "Siège & opérations",
      phone: "+212 773 591 012",
      email: "marketingdj12@gmail.com",
    },
    {
      country: "Sénégal",
      city: "Dakar",
      label: "Bureau & accompagnement",
      phone: "+212 773 591 012",
      email: "marketingdj12@gmail.com",
    },
  ],
} as const;

export function whatsappLink(message?: string) {
  const text =
    message ??
    "Bonjour Baobab Flight, je souhaite recevoir un devis pour mon prochain voyage.";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const navigation = [
  { label: "Destinations", href: "/destinations" },
  { label: "Vols", href: "/vols" },
  { label: "Inspirations", href: "/#inspirations" },
  { label: "Sur-mesure", href: "/#sur-mesure" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
] as const;

export const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Conditions générales de vente", href: "/conditions-generales-de-vente" },
] as const;

const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const heroImages = {
  main: unsplash("photo-1514282401047-d79a71a590e8", 1000),
  secondary: unsplash("photo-1518684079-3c830dcef090", 700),
};
