import type { Metadata } from "next";
import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Baobab Flight : données collectées, finalités, cookies, durées de conservation, partage et exercice de vos droits.",
  openGraph: {
    title: "Politique de confidentialité | Baobab Flight",
    description:
      "Comment Baobab Flight collecte, utilise et protège vos données personnelles.",
    type: "website",
    locale: "fr_FR",
    siteName: "Baobab Flight",
  },
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    paragraphs: [
      `Baobab Flight accorde une grande importance à la protection de votre vie privée. La présente politique décrit la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site ou échangez avec nos conseillers, notamment via WhatsApp, e-mail ou téléphone.`,
    ],
  },
  {
    id: "responsable",
    heading: "Responsable du traitement",
    paragraphs: [
      `Le responsable du traitement des données est ${site.name}, dont les coordonnées figurent dans les Mentions légales. Pour toute demande relative à vos données, écrivez à ${site.email}.`,
    ],
  },
  {
    id: "donnees-collectees",
    heading: "Données collectées",
    paragraphs: [
      "Nous ne collectons que les données strictement nécessaires à la fourniture de nos services. Selon votre usage, il peut s'agir de :",
    ],
    list: [
      "Données d'identité : nom, prénom, civilité.",
      "Coordonnées : adresse e-mail, numéro de téléphone, ville et pays de résidence.",
      "Données de voyage : destination souhaitée, dates, nombre de voyageurs, préférences et budget.",
      "Données de réservation : informations de passeport ou d'identité lorsque la réglementation l'exige, détails des vols et de l'itinéraire.",
      "Données d'échange : contenu des messages échangés sur WhatsApp, par e-mail ou par téléphone.",
      "Données de navigation : adresse IP, type d'appareil, pages consultées et données de mesure d'audience.",
    ],
  },
  {
    id: "finalites",
    heading: "Finalités et bases légales",
    paragraphs: [
      "Vos données sont traitées pour les finalités suivantes, chacune reposant sur une base légale précise :",
    ],
    list: [
      "Répondre à vos demandes de devis et construire votre itinéraire — exécution d'un contrat ou mesures précontractuelles.",
      "Émettre et gérer vos réservations (billets, transferts, hébergements) — exécution du contrat.",
      "Vous informer sur l'avancement de votre dossier et vous assister 24/7 — exécution du contrat et intérêt légitime.",
      "Améliorer notre site et nos services — intérêt légitime.",
      "Vous adresser des offres commerciales — consentement, révocable à tout moment.",
      "Respecter nos obligations légales, comptables et fiscales — obligation légale.",
    ],
  },
  {
    id: "conservation",
    heading: "Durée de conservation",
    paragraphs: [
      "Vos données sont conservées pendant une durée limitée, proportionnée à la finalité poursuivie :",
    ],
    list: [
      "Demandes de devis non converties : 24 mois à compter du dernier contact.",
      "Dossiers de réservation : pendant la durée de la relation contractuelle, puis archivage légal (généralement 10 ans pour les documents comptables).",
      "Données de prospection commerciale : 3 ans à compter du dernier contact, ou jusqu'au retrait de votre consentement.",
      "Données de mesure d'audience : 13 mois maximum.",
    ],
  },
  {
    id: "partage",
    heading: "Partage des données",
    paragraphs: [
      "Vos données peuvent être transmises, dans la limite du nécessaire, à des prestataires intervenant dans l'organisation de votre voyage :",
    ],
    list: [
      "Compagnies aériennes et systèmes de distribution (GDS) pour l'émission des billets.",
      "Hôtels, réceptifs, guides et prestataires de transfert sur votre destination.",
      "Assureurs et partenaires de services (visa, assistance).",
      "Sous-traitants techniques : hébergement, messagerie et outils de communication (dont WhatsApp).",
    ],
  },
  {
    id: "transferts",
    heading: "Transferts hors du pays",
    paragraphs: [
      "Certains de nos prestataires peuvent être situés en dehors du Maroc et du Sénégal. Dans ce cas, nous veillons à ce que des garanties appropriées encadrent le transfert de vos données, conformément à la réglementation applicable.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies et traceurs",
    paragraphs: [
      "Le site peut utiliser des cookies strictement nécessaires à son fonctionnement ainsi que des traceurs de mesure d'audience. Les cookies non essentiels ne sont déposés qu'avec votre consentement.",
      "Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies ou être averti de leur dépôt. Le refus de certains cookies peut affecter votre expérience de navigation.",
    ],
  },
  {
    id: "droits",
    heading: "Vos droits",
    paragraphs: [
      "Conformément à la réglementation applicable, vous disposez de droits sur vos données personnelles. Pour les exercer, contactez-nous à " +
        site.email +
        " en précisant votre demande et en joignant un justificatif d'identité si nécessaire.",
    ],
    list: [
      "Droit d'accès : obtenir une copie des données que nous détenons sur vous.",
      "Droit de rectification : faire corriger des données inexactes ou incomplètes.",
      "Droit à l'effacement : demander la suppression de vos données, sous réserve de nos obligations légales.",
      "Droit à la limitation : demander la suspension temporaire d'un traitement.",
      "Droit d'opposition : vous opposer à un traitement fondé sur notre intérêt légitime.",
      "Droit à la portabilité : recevoir vos données dans un format structuré et lisible.",
      "Droit de retirer votre consentement à tout moment lorsque le traitement repose sur celui-ci.",
    ],
  },
  {
    id: "securite",
    heading: "Sécurité",
    paragraphs: [
      "Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données contre l'accès non autorisé, la perte, l'altération ou la divulgation. Aucune méthode de transmission ou de stockage n'étant infaillible, nous vous invitons à ne jamais nous communiquer d'informations sensibles par des canaux non sécurisés.",
    ],
  },
  {
    id: "modifications",
    heading: "Modifications",
    paragraphs: [
      "Cette politique peut être mise à jour afin de tenir compte de l'évolution de nos services ou de la réglementation. La date de dernière mise à jour figure en tête de page. Nous vous invitons à la consulter régulièrement.",
    ],
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalShell
      eyebrow="Vie privée"
      title="Politique de confidentialité"
      intro="Nous nous engageons à protéger vos données personnelles. Découvrez quelles informations nous collectons, pourquoi et comment vous gardez le contrôle."
      updatedAt="12 novembre 2026"
      sections={sections}
    />
  );
}
