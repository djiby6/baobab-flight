import type { Metadata } from "next";
import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Baobab Flight : éditeur, responsable de la publication, hébergement, propriété intellectuelle et droit applicable.",
  openGraph: {
    title: "Mentions légales | Baobab Flight",
    description:
      "Informations légales relatives à l'édition et à l'hébergement du site Baobab Flight.",
    type: "website",
    locale: "fr_FR",
    siteName: "Baobab Flight",
  },
};

const sections: LegalSection[] = [
  {
    id: "editeur",
    heading: "Éditeur du site",
    paragraphs: [
      "Le présent site est édité par Baobab Flight, agence de voyage internationale spécialisée dans les billets d'avion et les itinéraires sur-mesure.",
    ],
    list: [
      `Dénomination : ${site.name}`,
      `Fondateur : ${site.founder.name} — ${site.founder.role}`,
      `Adresse : ${site.address}`,
      `Téléphone : ${site.phone}`,
      `E-mail : ${site.email}`,
      "Numéro d'immatriculation au registre du commerce : [à compléter]",
      "Identifiant commun de l'entreprise (ICE) : [à compléter]",
      "Numéro de licence d'agence de voyage : [à compléter]",
    ],
  },
  {
    id: "publication",
    heading: "Responsable de la publication",
    paragraphs: [
      `Le responsable de la publication est ${site.founder.name}, en qualité de ${site.founder.role}. Pour toute question relative au contenu du site, vous pouvez le contacter à l'adresse ${site.email}.`,
    ],
  },
  {
    id: "hebergement",
    heading: "Hébergement",
    paragraphs: [
      "Le site est hébergé par un prestataire tiers. Les coordonnées complètes de l'hébergeur sont les suivantes :",
    ],
    list: [
      "Raison sociale : [à compléter]",
      "Adresse : [à compléter]",
      "Téléphone : [à compléter]",
      "Site web : [à compléter]",
    ],
  },
  {
    id: "propriete-intellectuelle",
    heading: "Propriété intellectuelle",
    paragraphs: [
      "L'ensemble des éléments composant le site (structure, textes, logos, visuels, illustrations, vidéos et bases de données) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de Baobab Flight ou de ses partenaires.",
      "Toute reproduction, représentation, modification, adaptation ou exploitation, totale ou partielle, par quelque procédé que ce soit, sans autorisation écrite préalable, est interdite et constitue une contrefaçon.",
    ],
  },
  {
    id: "liens",
    heading: "Liens hypertextes",
    paragraphs: [
      "Le site peut contenir des liens vers des sites tiers, notamment vers nos partenaires, compagnies aériennes ou plateformes de réservation. Baobab Flight n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs politiques ou leurs pratiques.",
    ],
  },
  {
    id: "donnees",
    heading: "Données personnelles",
    paragraphs: [
      "Le traitement des données personnelles collectées via le site est décrit en détail dans notre Politique de confidentialité. Vous y trouverez les finalités, les durées de conservation et vos droits.",
    ],
  },
  {
    id: "droit-applicable",
    heading: "Droit applicable",
    paragraphs: [
      "Les présentes mentions légales sont soumises au droit marocain. En cas de litige, et à défaut de résolution amiable, compétence est attribuée aux tribunaux compétents du ressort de Casablanca, sous réserve des règles protectrices applicables aux consommateurs.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalShell
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Retrouvez l'ensemble des informations relatives à l'éditeur du site, à son hébergement et aux règles encadrant son utilisation."
      updatedAt="12 novembre 2026"
      sections={sections}
    />
  );
}
