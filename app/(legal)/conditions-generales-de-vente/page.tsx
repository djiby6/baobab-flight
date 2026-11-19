import type { Metadata } from "next";
import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de Baobab Flight : services, devis, prix, paiement, modification, annulation, assurances et responsabilités.",
  openGraph: {
    title: "Conditions générales de vente | Baobab Flight",
    description:
      "Les règles applicables à la réservation de vos billets d'avion et voyages sur-mesure avec Baobab Flight.",
    type: "website",
    locale: "fr_FR",
    siteName: "Baobab Flight",
  },
};

const sections: LegalSection[] = [
  {
    id: "objet",
    heading: "Objet et champ d'application",
    paragraphs: [
      "Les présentes conditions générales de vente (CGV) régissent les relations entre Baobab Flight et toute personne (ci-après « le Client ») faisant appel à ses services de billetterie aérienne, d'organisation de voyages et d'itinéraires sur-mesure.",
      "Toute demande de devis ou réservation implique l'acceptation sans réserve des présentes CGV, qui prévalent sur tout autre document du Client.",
    ],
  },
  {
    id: "services",
    heading: "Services proposés",
    paragraphs: [
      "Baobab Flight propose notamment :",
    ],
    list: [
      "La recherche et l'émission de billets d'avion au meilleur tarif.",
      "La conception d'itinéraires sur-mesure (vols, hébergements, transferts, activités).",
      "La réservation de prestations complémentaires (assurances, excursions, assistance visa).",
      "Un accompagnement personnalisé et une conciergerie joignable 24/7 sur WhatsApp.",
    ],
  },
  {
    id: "devis",
    heading: "Devis et réservation",
    paragraphs: [
      "Les devis sont établis sur la base des informations fournies par le Client (dates, destinations, nombre de voyageurs, préférences). Ils sont valables pour la durée indiquée et restent soumis à disponibilité des tarifs et des places au moment de la confirmation.",
      "La réservation devient ferme après acceptation écrite du devis par le Client et réception du paiement requis. Les noms et données transmis doivent être exactement conformes aux documents d'identité : toute erreur peut entraîner des frais de modification ou l'impossibilité d'embarquer.",
    ],
  },
  {
    id: "prix-paiement",
    heading: "Prix et modalités de paiement",
    paragraphs: [
      "Les prix sont indiqués en euros ou en dirhams, selon le devis, et peuvent varier jusqu'à l'émission effective des billets. Ils comprennent les prestations expressément mentionnées et excluent, sauf indication contraire, les frais de visa, les assurances facultatives, les dépenses personnelles et les éventuelles taxes locales.",
      "Le paiement peut être effectué par les moyens communiqués lors de la réservation. Selon la prestation, un acompte peut être exigé, le solde devant être réglé avant l'émission ou le départ. Tout retard de paiement peut entraîner l'annulation de la réservation.",
    ],
  },
  {
    id: "modification-annulation",
    heading: "Modification et annulation",
    paragraphs: [
      "Les conditions de modification et d'annulation dépendent des règles des compagnies aériennes et des prestataires concernés. Elles sont rappelées au Client au moment de la réservation.",
    ],
    list: [
      "Billets d'avion : les tarifs promotionnels sont généralement non modifiables et non remboursables ; les autres billets peuvent être modifiables ou remboursables moyennant des frais.",
      "Prestations sur-mesure (hôtels, transferts, activités) : des conditions spécifiques peuvent s'appliquer, incluant des frais d'annulation dégressifs selon le délai avant le départ.",
      "Frais de service : les frais de dossier et de conseil engagés par Baobab Flight restent dus en cas d'annulation.",
    ],
  },
  {
    id: "obligations-client",
    heading: "Obligations du Client",
    paragraphs: [
      "Le Client est responsable de la validité de ses documents de voyage et du respect des formalités. Il doit notamment :",
    ],
    list: [
      "Disposer d'un passeport valide et, le cas échéant, d'un visa ou d'une autorisation d'entrée en cours de validité.",
      "Respecter les exigences sanitaires (vaccins, tests) imposées par les pays de départ, de transit et d'arrivée.",
      "Se présenter à l'embarquement dans les délais recommandés par la compagnie.",
      "Vérifier l'exactitude des informations figurant sur ses billets et documents de voyage.",
    ],
  },
  {
    id: "assurance",
    heading: "Assurance voyage",
    paragraphs: [
      "Sauf mention contraire, l'assurance voyage n'est pas incluse. Nous recommandons vivement de souscrire une assurance couvrant l'annulation, l'assistance, les frais médicaux et le rapatriement. Baobab Flight peut proposer des solutions d'assurance en partenariat avec des assureurs agréés.",
    ],
  },
  {
    id: "responsabilite",
    heading: "Responsabilité",
    paragraphs: [
      "Baobab Flight agit en qualité d'intermédiaire entre le Client et les prestataires (compagnies aériennes, hôtels, réceptifs). Sa responsabilité ne saurait être engagée en cas de défaillance, de retard, de grève, de surbooking, d'événement climatique ou de force majeure imputable à ces prestataires.",
      "Baobab Flight ne peut être tenue responsable des conséquences résultant d'informations erronées fournies par le Client, d'un défaut de documents valides ou du non-respect des consignes de voyage.",
    ],
  },
  {
    id: "reclamations",
    heading: "Réclamations et médiation",
    paragraphs: [
      `Toute réclamation doit être adressée par écrit à ${site.email} dans les meilleurs délais et, au plus tard, dans les 30 jours suivant la fin du voyage, accompagnée des pièces justificatives.`,
      "En cas de désaccord persistant, les parties s'efforceront de trouver une solution amiable avant toute action contentieuse. Le Client peut également recourir, le cas échéant, à un médiateur ou à l'autorité de protection des consommateurs compétente.",
    ],
  },
  {
    id: "droit-applicable",
    heading: "Droit applicable et litiges",
    paragraphs: [
      "Les présentes CGV sont soumises au droit marocain. À défaut de résolution amiable, tout litige sera porté devant les tribunaux compétents du ressort de Casablanca, sans préjudice des règles protectrices dont pourrait bénéficier le Client en sa qualité de consommateur.",
    ],
  },
];

export default function ConditionsGeneralesPage() {
  return (
    <LegalShell
      eyebrow="Cadre contractuel"
      title="Conditions générales de vente"
      intro="Ces conditions encadrent la réservation de vos billets d'avion et de vos voyages sur-mesure. Prenez le temps de les lire avant de confirmer votre projet."
      updatedAt="12 novembre 2026"
      sections={sections}
    />
  );
}
