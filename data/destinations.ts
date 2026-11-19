import { extraCountries } from "./countries-extra";
import {
  FALLBACK_COUNTRY_IMAGE,
  getCountryImage,
  getCountryImageAlt,
  getExperienceVisual,
} from "./country-images";

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export type BestPeriodTone = "ideal" | "shoulder" | "avoid";

export type BestPeriod = {
  label: string;
  months: string;
  note: string;
  tone: BestPeriodTone;
};

export type Highlight = {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  poster?: string;
};

export type Experience = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  videoUrl?: string;
  poster?: string;
};

export type ExperienceSeed = {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  poster?: string;
};

export type CountrySeed = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  immersive?: string;
  whyGo?: string;
  videoUrl?: string;
  experiences?: ExperienceSeed[];
  preposition?: string;
  image: string;
  imageAlt: string;
  fromPrice: string;
  flightTime: string;
  capital: string;
  language: string;
  currency: string;
  visa: string;
  bestPeriods: BestPeriod[];
  highlights: Highlight[];
  tips: string[];
  featured?: boolean;
};

export type Country = Omit<
  CountrySeed,
  "immersive" | "whyGo" | "experiences" | "videoUrl"
> & {
  immersive: string;
  whyGo: string;
  fallbackImage?: string;
  experiences: Experience[];
};

export type Continent = {
  slug: string;
  name: string;
  index: string;
  title: string;
  description: string;
  destinations: string;
  image: string;
  imageAlt: string;
  fromPrice: string;
  featured?: boolean;
  countries: Country[];
};

export type ContinentSeed = Omit<Continent, "countries"> & {
  countries: CountrySeed[];
};

export type DestinationNavItem = {
  slug: string;
  name: string;
  index: string;
  countries: { slug: string; name: string }[];
};

type CuratedContent = {
  immersive: string;
  whyGo: string;
};

const curatedContent: Record<string, CuratedContent> = {
  maroc: {
    immersive:
      "Des ruelles bleues de Chefchaouen aux dunes rosées de Merzouga, le Maroc est un kaléidoscope de couleurs et de senteurs. Entre riads ombragés, souks bruissants et tables généreuses, chaque étape invite à ralentir et à s'émerveiller.",
    whyGo:
      "Baobab Flight connaît le Maroc comme sa poche : vols au meilleur tarif, riads choisis avec soin et chauffeurs privés pour relier villes impériales et désert. Un conseiller dédié veille sur votre itinéraire, 24/7 sur WhatsApp.",
  },
  senegal: {
    immersive:
      "Du tumulte joyeux de Dakar aux eaux turquoise du Siné-Saloum, le Sénégal respire la teranga, cette hospitalité qui accueille comme un membre de la famille. Lacs salés, savanes et musiques mbalax composent un voyage chaleureux et authentique.",
    whyGo:
      "Avec Baobab Flight, le Sénégal se découvre sans faux pas : vols optimisés, lodges de charme et guides francophones passionnés. Notre conciergerie WhatsApp reste à vos côtés du premier message au dernier transfert.",
  },
  egypte: {
    immersive:
      "L'Égypte est un musée à ciel ouvert où trois mille ans d'histoire regardent la mer. Des pyramides de Gizeh aux temples de Louxor, le Nil tisse un fil d'or entre légendes pharaoniques et villages d'aujourd'hui.",
    whyGo:
      "Baobab Flight compose votre Égypte sur-mesure : vols et croisières sur le Nil, guides égyptologues francophones et transferts privés. Une conciergerie WhatsApp réactive pour voyager l'esprit léger.",
  },
  kenya: {
    immersive:
      "Le Kenya est une symphonie de savanes dorées, de troupeaux en mouvement et de ciels immenses. Du Masai Mara aux plages de l'océan Indien, le pays cultive l'art du safari et la chaleur de ses peuples.",
    whyGo:
      "Avec Baobab Flight, le safari kenyan se prépare dans les détails : vols, camps de luxe et guides naturalistes. Notre équipe WhatsApp coordonne chaque étape pour que vous ne pensiez qu'à contempler.",
  },
  "afrique-du-sud": {
    immersive:
      "L'Afrique du Sud rassemble les contraires en un seul pays : Le Cap entre montagnes et océan, les vignobles du Cap-Occidental et les réserves du Kruger. Une nation arc-en-ciel où l'aventure côtoie la douceur de vivre.",
    whyGo:
      "Baobab Flight dessine votre road trip sud-africain : vols, lodges et safaris privés, sans oublier la route des vins. Un conseiller WhatsApp vous accompagne à chaque kilomètre.",
  },
  france: {
    immersive:
      "La France se raconte en clair-obscur : l'élégance de Paris, les lavandes de Provence, les calanques de Marseille et les villages perchés d'Alsace. Un art de vivre qui se savoure à chaque table et chaque détour.",
    whyGo:
      "Baobab Flight orchestre vos escapades françaises : vols, trains, hôtels de caractère et expériences confidentielles. Notre conciergerie WhatsApp vous répond en quelques minutes, où que vous soyez.",
  },
  espagne: {
    immersive:
      "De l'Andalousie mauresque aux criques de la Costa Brava, l'Espagne vibre au rythme des guitares et des tapas. Soleil, architecture audacieuse et ferveur populaire font de chaque région une fête à part.",
    whyGo:
      "Avec Baobab Flight, l'Espagne se vit sans compromis : vols optimisés, paradores et tables locales sélectionnées. Notre équipe WhatsApp ajuste votre itinéraire en temps réel.",
  },
  italie: {
    immersive:
      "L'Italie est un opéra permanent : les canaux de Venise, les collines toscanes, la lave de l'Etna et la dolce vita romaine. Chaque place, chaque assiette raconte une Renaissance qui n'a jamais cessé.",
    whyGo:
      "Baobab Flight compose votre Italie comme un itinéraire sur-mesure : vols, agritourismos et guides passionnés. Une conciergerie WhatsApp veille sur vous, du Colisée aux chemins de randonnée.",
  },
  grece: {
    immersive:
      "La Grèce est une lumière : celle des Cyclades, des ruines d'Athènes et des tavernes face à la mer Égée. Îles blanches, eaux profondes et mythologie vivante invitent à un voyage hors du temps.",
    whyGo:
      "Baobab Flight connaît les bons ferries et les meilleures adresses des îles : vols, transferts et hôtels avec vue. Notre conciergerie WhatsApp vous guide entre deux baignades.",
  },
  portugal: {
    immersive:
      "Le Portugal déroule ses azulejos et ses falaises atlantiques, de Lisbonne à l'Algarve. Entre fado mélancolique, pastéis encore tièdes et villages de pierre, le pays cultive une douceur qui ralentit le temps.",
    whyGo:
      "Avec Baobab Flight, le Portugal se découvre en toute sérénité : vols, quintas et itinéraires côtiers. Notre conciergerie WhatsApp reste joignable pour chaque envie, à chaque étape.",
  },
  turquie: {
    immersive:
      "La Turquie est un pont entre deux mondes : les dômes d'Istanbul, les cheminées de fée de Cappadoce et les eaux turquoise de la côte lycienne. Un pays de marchés, de thé et d'hospitalité généreuse.",
    whyGo:
      "Baobab Flight prépare votre Turquie dans les moindres détails : vols, hammams et vols en montgolfière au lever du soleil. Une conciergerie WhatsApp vous accompagne avant et pendant le séjour.",
  },
  "etats-unis": {
    immersive:
      "Les États-Unis sont une démesure : les canyons de l'Ouest, les avenues de New York, les bayous de Louisiane et les plages de Californie. Un territoire de road trips où chaque État change de décor et d'accent.",
    whyGo:
      "Baobab Flight conçoit votre road trip américain : vols, voitures, parcs nationaux et adresses locales vérifiées. Notre équipe WhatsApp ajuste le programme selon la météo et vos envies.",
  },
  canada: {
    immersive:
      "Le Canada est une respiration : lacs émeraude des Rocheuses, forêts infinies du Québec et villes vivantes au bord du Pacifique. Entre nature sauvage et douceur urbaine, l'espace devient un luxe.",
    whyGo:
      "Avec Baobab Flight, le Canada se parcourt sans stress : vols, locations de voiture et lodges en pleine nature. Une conciergerie WhatsApp vous aide à choisir les plus beaux détours.",
  },
  mexique: {
    immersive:
      "Le Mexique est un carnaval de couleurs et de saveurs : ruines mayas au Yucatán, cénotes turquoise, marchés d'Oaxaca et plages de la Riviera. Une culture millénaire qui danse au présent.",
    whyGo:
      "Baobab Flight connaît les chemins du Mexique : vols, haciendas et guides francophones pour explorer Mayas et Pacifique. Notre conciergerie WhatsApp assure un suivi 24/7.",
  },
  bresil: {
    immersive:
      "Le Brésil déborde de vie : l'énergie de Rio, l'immensité de l'Amazonie, les dunes de Jericoacoara et le rythme de la samba. Une mosaïque de peuples et de paysages qui célèbre la joie.",
    whyGo:
      "Avec Baobab Flight, le Brésil se savoure sans faux pas : vols, pousadas de charme et guides locaux. Notre conciergerie WhatsApp vous accompagne entre plages, forêt et ville.",
  },
  perou: {
    immersive:
      "Le Pérou est un vertige d'altitude et d'histoire : le Machu Picchu suspendu, les terrasses de la Vallée Sacrée et les eaux du lac Titicaca. Entre Andes et Amazonie, chaque sentier mène à une légende.",
    whyGo:
      "Baobab Flight organise votre Pérou avec soin : vols, trains vers le Machu Picchu et guides andins francophones. Une conciergerie WhatsApp gère l'altitude et les imprévus, 24/7.",
  },
  "emirats-arabes-unis": {
    immersive:
      "Les Émirats arabes unis sont une vision du futur posée sur le désert : les gratte-ciel de Dubaï, les dunes d'Abou Dabi et les eaux du Golfe. Luxe, tradition bédouine et démesure dialoguent sans cesse.",
    whyGo:
      "Baobab Flight compose votre séjour émirati : vols, hôtels d'exception et expériences dans le désert. Notre conciergerie WhatsApp répond en quelques minutes, jour et nuit.",
  },
  thailande: {
    immersive:
      "La Thaïlande est un sourire : temples dorés de Bangkok, îles du Sud, rizières du Nord et marchés flottants. Entre mer d'émeraude et spiritualité, le pays cultive un art du bien-être.",
    whyGo:
      "Avec Baobab Flight, la Thaïlande se vit en toute liberté : vols, transferts inter-îles et hôtels pieds dans l'eau. Une conciergerie WhatsApp vous guide, du bain de Bangkok au farniente.",
  },
  japon: {
    immersive:
      "Le Japon est une précision poétique : les cerisiers de Kyoto, le néon de Tokyo, les sources chaudes d'Hakone et les temples de Nara. Un équilibre rare entre tradition millénaire et modernité fulgurante.",
    whyGo:
      "Baobab Flight prépare votre Japon au détail près : vols, JR Pass, ryokans et réservations de restaurants. Notre conciergerie WhatsApp vous accompagne, surtout lors des saisons de sakura.",
  },
  indonesie: {
    immersive:
      "L'Indonésie est un archipel de rêves : rizières de Bali, volcans de Java, dragons de Komodo et fonds marins des Raja Ampat. Mille îles, mille cultures et une nature qui déborde de vie.",
    whyGo:
      "Avec Baobab Flight, l'Indonésie se parcourt sans logistique : vols intérieurs, villas et plongées encadrées. Une conciergerie WhatsApp suit votre itinéraire d'île en île.",
  },
  vietnam: {
    immersive:
      "Le Vietnam est un ruban de contrastes : la baie d'Ha Long, les lanternes de Hoi An, les rizières de Sapa et le delta du Mékong. Une cuisine fine et une énergie douce qui séduisent au premier regard.",
    whyGo:
      "Baobab Flight connaît le Vietnam du nord au sud : vols, trains de nuit et hôtels de charme. Notre conciergerie WhatsApp vous aide à goûter chaque région, sans stress.",
  },
  maldives: {
    immersive:
      "Les Maldives sont une parenthèse hors du monde : atolls circulaires, eaux cristallines et villas sur pilotis. Ici, le temps se mesure en marées et en couchers de soleil sur l'océan Indien.",
    whyGo:
      "Baobab Flight sélectionne votre atoll et votre resort selon vos envies : vols, transferts en hydravion et pension choisie. Une conciergerie WhatsApp veille sur votre lune de miel ou votre pause.",
  },
  australie: {
    immersive:
      "L'Australie est un continent à elle seule : opéra de Sydney, Grande Barrière de corail, Outback rouge et forêts de Tasmanie. Une nature grandiose et une culture décontractée au bout du monde.",
    whyGo:
      "Avec Baobab Flight, l'Australie se planifie sans distance : vols, locations de van et plongées sur la Grande Barrière. Notre conciergerie WhatsApp gère les fuseaux horaires pour vous.",
  },
  "nouvelle-zelande": {
    immersive:
      "La Nouvelle-Zélande est un décor de cinéma grandeur nature : fjords de Milford Sound, volcans de l'île du Nord et lacs turquoise du Sud. Une terre maorie où l'aventure est un art de vivre.",
    whyGo:
      "Baobab Flight organise votre road trip néo-zélandais : vols, campers et randonnées incontournables. Une conciergerie WhatsApp vous accompagne entre deux paysages de légende.",
  },
  "polynesie-francaise": {
    immersive:
      "La Polynésie française est un rêve d'îles : lagon de Bora Bora, vallées de Moorea et atolls des Tuamotu. Eaux turquoise, parfum de tiaré et douceur de vivre polynésienne.",
    whyGo:
      "Avec Baobab Flight, la Polynésie se rejoint sans détour : vols, pensions de famille et excursions lagon. Notre conciergerie WhatsApp veille sur chaque transfert inter-îles.",
  },
  fidji: {
    immersive:
      "Les Fidji sont un archipel souriant : lagons turquoise, récifs coralliens et villages où le « bula » accueille chaque visiteur. Un bout de Pacifique où le temps s'étire entre deux plongeons.",
    whyGo:
      "Baobab Flight compose votre séjour fidjien : vols, resorts et excursions vers les îles Yasawa. Une conciergerie WhatsApp reste disponible pour chaque envie, même au bout du monde.",
  },
};

const buildImmersive = (country: CountrySeed) =>
  `${country.name} est une invitation au voyage à part entière. Depuis ${country.capital}, le pays dévoile des paysages contrastés et une culture généreuse : entre patrimoine vivant, gastronomie et rencontres, chaque journée se transforme en souvenir durable.`;

const buildWhyGo = (country: CountrySeed) =>
  `Avec Baobab Flight, votre voyage vers ${country.name} est orchestré de bout en bout : vols optimisés au meilleur tarif, itinéraire sur-mesure et conciergerie WhatsApp 24/7. Notre expertise locale et notre réseau sur place vous ouvrent les bonnes portes, du premier message jusqu'au retour.`;

const EXPERIENCE_COUNT = 3;

const normalizeStepTitle = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const isDirectStepVideo = (url: string) =>
  /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(url.trim());

function buildCountryStepSeeds(country: CountrySeed): ExperienceSeed[] {
  const candidates: ExperienceSeed[] = [
    ...(country.highlights ?? []),
    ...(country.experiences ?? []),
  ];
  const seenTitles = new Set<string>();
  const steps: ExperienceSeed[] = [];

  for (const candidate of candidates) {
    const key = normalizeStepTitle(candidate.title);
    if (!key || seenTitles.has(key)) continue;
    seenTitles.add(key);
    steps.push(candidate);
    if (steps.length === EXPERIENCE_COUNT) break;
  }

  if (steps.length >= EXPERIENCE_COUNT) return steps;

  const taglinePlaces = country.tagline
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  const descriptionParts = country.description
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const localCandidates: ExperienceSeed[] = [
    {
      title: country.capital,
      description: `${country.capital} donne le tempo de votre découverte de ${country.name}.`,
    },
    ...taglinePlaces.map((place) => ({
      title: place,
      description: `${place} figure parmi les visages les plus marquants de ${country.name}.`,
    })),
    ...descriptionParts.map((part) => ({
      title: part.split(",")[0].slice(0, 60),
      description: part,
    })),
  ];

  for (const candidate of localCandidates) {
    const key = normalizeStepTitle(candidate.title);
    if (!key || seenTitles.has(key)) continue;
    seenTitles.add(key);
    steps.push(candidate);
    if (steps.length === EXPERIENCE_COUNT) break;
  }

  return steps;
}

function buildStepDescription(country: CountrySeed, step: ExperienceSeed) {
  const description = step.description?.trim();
  return description || `${step.title} se découvre au cœur de ${country.name}.`;
}

function enrichCountry(country: CountrySeed): Country {
  const curated = curatedContent[country.slug];
  const image = getCountryImage(country.slug);
  const imageAlt = image
    ? getCountryImageAlt(country.slug, country.name)
    : country.imageAlt;
  const usedImages = new Set<string>();
  const usedVideos = new Set<string>();
  const stepContext = `${country.tagline} ${country.description}`;

  const experiences: Experience[] = buildCountryStepSeeds(country).map(
    (step, index) => {
      const visual = getExperienceVisual({
        slug: country.slug,
        title: step.title,
        index,
        countryName: country.name,
        capital: country.capital,
        context: stepContext,
        fallbackImage: image ?? country.image,
        usedImages,
        preferFallback: index === 0,
        explicitImage: step.imageUrl,
      });

      const explicitVideo = step.videoUrl?.trim();
      const videoUrl =
        explicitVideo &&
        isDirectStepVideo(explicitVideo) &&
        !usedVideos.has(explicitVideo)
          ? explicitVideo
          : undefined;
      if (videoUrl) usedVideos.add(videoUrl);

      return {
        title: step.title,
        description: buildStepDescription(country, step),
        image: visual.image,
        imageAlt: visual.imageAlt,
        videoUrl,
        poster: step.poster ?? visual.image,
      };
    },
  );

  return {
    ...country,
    image: image ?? country.image,
    imageAlt,
    fallbackImage: image ? country.image : FALLBACK_COUNTRY_IMAGE,
    immersive:
      curated?.immersive ?? country.immersive ?? buildImmersive(country),
    whyGo: curated?.whyGo ?? country.whyGo ?? buildWhyGo(country),
    experiences,
  };
}

const continentSeeds: ContinentSeed[] = [
  {
    slug: "afrique",
    name: "Afrique",
    index: "01",
    title: "Safaris, déserts & océans",
    description:
      "Des médinas du Maroc aux savanes du Kenya, des dunes du Sahara aux plages de Zanzibar : l'Afrique se découvre au rythme de ses contrastes.",
    destinations: "Maroc · Sénégal · Égypte · Kenya · Afrique du Sud",
    image: unsplash("photo-1516426122078-c23e76319801"),
    imageAlt: "Éléphants dans la savane africaine au coucher du soleil",
    fromPrice: "240 €",
    featured: true,
    countries: [
      {
        slug: "maroc",
        name: "Maroc",
        tagline: "Médinas, désert & océan Atlantique",
        description:
          "Un pays de contrastes où les ruelles bleues de Chefchaouen côtoient les dunes dorées de Merzouga et les vagues de l'Atlantique. Le Maroc se savoure lentement, entre riads, souks et tables généreuses.",
        image: unsplash("photo-1489749798305-4fea3ae63d43"),
        imageAlt: "Patio traditionnel et architecture d'un riad marocain",
        fromPrice: "290 €",
        flightTime: "1h depuis Casablanca",
        capital: "Rabat",
        language: "Arabe & berbère",
        currency: "Dirham (MAD)",
        visa: "Sans visa pour les ressortissants français, belges, suisses et canadiens (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mars — Mai",
            note: "Températures douces, jardins en fleurs et lumière sublime sur les médinas.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Novembre",
            note: "Moins de foule, mer encore chaude et tarifs plus doux sur la côte.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte chaleur dans le sud et affluence importante sur les sites.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Marrakech & Jemaa el-Fna",
            videoUrl: "/videos/maroc/01-marrakech-jemaa-el-fna.mp4",
            description:
              "La place mythique, les souks parfumés et les jardins Majorelle : l'énergie brute du Maroc.",
          },
          {
            title: "Le désert de Merzouga",
            videoUrl: "/videos/maroc/02-le-desert-de-merzouga.mp4",
            description:
              "Une nuit sous les étoiles dans un camp de toile, entre dunes et lever de soleil.",
          },
          {
            title: "Essaouira & la côte atlantique",
            videoUrl: "/videos/maroc/03-essaouira-la-cote-atlantique.mp4",
            description:
              "Les remparts, les mouettes et les terrasses de poisson face à l'océan.",
          },
        ],
        tips: [
          "Négociez avec le sourire dans les souks : le prix de départ est souvent négociable.",
          "Prévoyez du cash pour les petits commerces et les guides locaux.",
          "Un foulard et des vêtements couvrants sont appréciés dans les lieux de culte.",
        ],
        featured: true,
      },
      {
        slug: "senegal",
        name: "Sénégal",
        tagline: "Teranga, baobabs & Sine-Saloum",
        description:
          "La teranga sénégalaise se vit autant qu'elle se raconte : marchés colorés, baobabs centenaires, lagunes du Sine-Saloum et plages de la Petite Côte. Un voyage chaleureux, rythmé par le mbalax et les couleurs de l'Atlantique.",
        image: unsplash("photo-1516026672322-bc52d61a55d5"),
        imageAlt: "Baobabs et paysage de savane au Sénégal",
        fromPrice: "240 €",
        flightTime: "3h depuis Casablanca",
        capital: "Dakar",
        language: "Français & wolof",
        currency: "Franc CFA (XOF)",
        visa: "Sans visa pour les ressortissants français, belges, suisses et canadiens.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Novembre — Mai",
            note: "Saison sèche, ciel bleu et températures agréables sur la Petite Côte.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Octobre & Juin",
            note: "Une transition douce, avec moins de monde et de belles lumières.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Septembre",
            note: "Saison des pluies : chaleur humide et pistes parfois difficiles.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Dakar & l'île de Gorée",
            videoUrl: "/videos/senegal/01-dakar-l-ile-de-goree.mp4",
            description:
              "Le marché Kermel, la Corniche et l'histoire poignante de la Maison des Esclaves.",
          },
          {
            title: "Le Sine-Saloum",
            videoUrl: "/videos/senegal/02-le-sine-saloum.mp4",
            description:
              "Un delta de mangroves et de bolongs à explorer en pirogue, au calme.",
          },
          {
            title: "La Petite Côte",
            videoUrl: "/videos/senegal/03-la-petite-cote.mp4",
            description:
              "Saly, Somone et les plages de sable fin pour ralentir face à l'océan.",
          },
        ],
        tips: [
          "Vérifiez les formalités sanitaires : le vaccin contre la fièvre jaune est souvent recommandé.",
          "Prévoyez du cash pour les marchés et les excursions en pirogue.",
          "Demandez toujours l'accord avant de photographier les habitants.",
        ],
        featured: true,
      },
      {
        slug: "egypte",
        name: "Égypte",
        tagline: "Pyramides, Nil & mer Rouge",
        description:
          "Entre les pyramides de Gizeh, les temples de Louxor et les fonds coralliens de la mer Rouge, l'Égypte concentre des millénaires d'histoire dans un seul voyage. Une croisière sur le Nil reste l'une des plus belles façons de la découvrir.",
        image: unsplash("photo-1503177119275-0aa32b3a9368"),
        imageAlt: "Pyramides de Gizeh sous le soleil",
        fromPrice: "390 €",
        flightTime: "4h30 depuis Casablanca",
        capital: "Le Caire",
        language: "Arabe",
        currency: "Livre égyptienne (EGP)",
        visa: "Visa requis : e-visa ou visa à l'arrivée selon votre nationalité.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Octobre — Avril",
            note: "Températures douces, idéales pour les temples et la croisière sur le Nil.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mai & Septembre",
            note: "Chaleur présente mais sites moins fréquentés et tarifs attractifs.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Août",
            note: "Très fortes chaleurs, surtout dans le sud et à Louxor.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Les pyramides de Gizeh",
            videoUrl: "/videos/egypte/01-les-pyramides-de-gizeh.mp4",
            description:
              "Le Sphinx et les trois pyramides, à voir tôt le matin pour éviter la foule.",
          },
          {
            title: "Croisière sur le Nil",
            videoUrl: "/videos/egypte/02-croisiere-sur-le-nil.mp4",
            description:
              "De Louxor à Assouan, les temples de Karnak, la Vallée des Rois et les rives du fleuve.",
          },
          {
            title: "La mer Rouge",
            videoUrl: "/videos/egypte/03-la-mer-rouge.mp4",
            description:
              "Plongée et snorkeling à Hurghada ou Marsa Alam, entre coraux et poissons tropicaux.",
          },
        ],
        tips: [
          "Prévoyez des vêtements légers et couvrants, ainsi qu'un chapeau et de l'eau.",
          "Gardez de petites coupures pour les pourboires, très courants en Égypte.",
          "Évitez l'eau du robinet et privilégiez l'eau en bouteille scellée.",
        ],
      },
      {
        slug: "kenya",
        name: "Kenya",
        tagline: "Safaris, savane & côte indienne",
        description:
          "Le Kenya est la promesse d'un safari grandeur nature : troupeaux dans le Masai Mara, éléphants au pied du Kilimandjaro et plages de l'océan Indien. Un voyage qui mêle émotion animalière et douceur balnéaire.",
        image: unsplash("photo-1516426122078-c23e76319801"),
        imageAlt: "Éléphants dans la savane africaine au coucher du soleil",
        fromPrice: "690 €",
        flightTime: "7h depuis Casablanca",
        capital: "Nairobi",
        language: "Swahili & anglais",
        currency: "Shilling kényan (KES)",
        visa: "eTA (autorisation de voyage électronique) obligatoire avant le départ.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Juillet — Octobre",
            note: "Saison sèche et grande migration dans le Masai Mara : le safari mythique.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Janvier — Mars",
            note: "Saison sèche courte, moins de monde et de belles observations.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Avril — Mai",
            note: "Longues pluies : pistes boueuses et visibilité réduite en safari.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Le Masai Mara",
            videoUrl: "/videos/kenya/01-le-masai-mara.mp4",
            description:
              "La réserve emblématique pour observer lions, guépards et la grande migration.",
          },
          {
            title: "Amboseli",
            videoUrl: "/videos/kenya/02-amboseli.mp4",
            description:
              "Des éléphants qui défilent sur fond de Kilimandjaro, un spectacle inoubliable.",
          },
          {
            title: "Diani Beach",
            videoUrl: "/videos/kenya/03-diani-beach.mp4",
            description:
              "Sable blanc, cocotiers et eau turquoise pour prolonger le safari sur la côte.",
          },
        ],
        tips: [
          "Prévoyez un certificat de fièvre jaune et un traitement antipaludique selon votre séjour.",
          "Réservez votre safari à l'avance, surtout pendant la grande migration.",
          "Respectez les distances avec la faune et suivez les consignes des rangers.",
        ],
      },
      {
        slug: "afrique-du-sud",
        name: "Afrique du Sud",
        tagline: "Le Cap, vignobles & safari",
        description:
          "De la montagne de la Table aux vignobles de Stellenbosch, du Kruger à la Garden Route, l'Afrique du Sud offre une diversité rare. Un pays à parcourir en voiture, entre villes créatives, nature spectaculaire et safaris.",
        image: unsplash("photo-1580060839134-75a5edca2e99"),
        imageAlt: "Vue de la ville du Cap et de la montagne de la Table",
        fromPrice: "790 €",
        flightTime: "9h depuis Casablanca",
        capital: "Pretoria, Le Cap & Bloemfontein",
        language: "Anglais & afrikaans (11 langues officielles)",
        currency: "Rand (ZAR)",
        visa: "Sans visa pour les ressortissants français, belges, suisses et canadiens (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Novembre — Mars",
            note: "Été austral : idéal pour Le Cap, la Garden Route et les plages.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mai — Septembre",
            note: "Saison sèche pour le safari dans le Kruger, avec des nuits fraîches.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Janvier",
            note: "Haute saison : prix élevés et sites très fréquentés.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Le Cap & la montagne de la Table",
            "videoUrl": "/videos/afrique-du-sud/01-le-cap-la-montagne-de-la-table.mp4",
            description:
              "Le téléphérique, Bo-Kaap et les routes côtières de la péninsule du Cap.",
          },
          {
            title: "Les vignobles du Cap",
            "videoUrl": "/videos/afrique-du-sud/02-les-vignobles-du-cap.mp4",
            description:
              "Stellenbosch, Franschhoek et leurs domaines viticoles au pied des montagnes.",
          },
          {
            title: "Le parc Kruger",
            "videoUrl": "/videos/afrique-du-sud/03-le-parc-kruger.mp4",
            description:
              "Un safari autonome ou guidé à la rencontre des Big Five.",
          },
        ],
        tips: [
          "Conduisez à gauche et privilégiez un véhicule adapté aux longues distances.",
          "Restez vigilant dans les grandes villes, surtout le soir.",
          "Réservez les safaris et les hébergements du Kruger plusieurs mois à l'avance.",
        ],
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    index: "02",
    title: "Capitales & riviera",
    description:
      "L'élégance des grandes capitales, la douceur des côtes méditerranéennes et les escapades qui se savourent : l'Europe se visite au rythme des saisons.",
    destinations: "France · Espagne · Italie · Grèce · Portugal · Turquie",
    image: unsplash("photo-1502602898657-3e91760cbb34"),
    imageAlt: "La tour Eiffel à Paris au coucher du soleil",
    fromPrice: "129 €",
    countries: [
      {
        slug: "france",
        name: "France",
        tagline: "Paris, Provence & Côte d'Azur",
        description:
          "De l'effervescence parisienne aux champs de lavande de Provence, en passant par les calanques et la Riviera, la France cultive l'art de vivre. Un pays à explorer en train, entre gastronomie, musées et paysages variés.",
        image: unsplash("photo-1502602898657-3e91760cbb34"),
        imageAlt: "La tour Eiffel à Paris au coucher du soleil",
        fromPrice: "129 €",
        flightTime: "2h30 depuis Casablanca",
        capital: "Paris",
        language: "Français",
        currency: "Euro (EUR)",
        visa: "Sans visa pour les ressortissants de l'UE, suisses et canadiens (selon passeport).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Avril — Juin",
            note: "Journées douces, terrasses animées et jardins en fleurs.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Lumière dorée, moins de foule et vendanges en Provence.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte affluence sur la côte et chaleur en ville.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Paris",
            "videoUrl": "/videos/france/01-paris.mp4",
            description:
              "La tour Eiffel, le Louvre, Montmartre et les quais de Seine au fil des quartiers.",
          },
          {
            title: "La Provence",
            "videoUrl": "/videos/france/02-la-provence.mp4",
            description:
              "Les villages du Luberon, les marchés et les champs de lavande en été.",
          },
          {
            title: "La Côte d'Azur",
            "videoUrl": "/videos/france/03-la-cote-d-azur.mp4",
            description:
              "Nice, Antibes et les calanques entre mer turquoise et routes panoramiques.",
          },
        ],
        tips: [
          "Réservez les musées et la tour Eiffel en ligne pour éviter les files.",
          "Le train est souvent la meilleure option entre les grandes villes.",
          "Certains commerces ferment en août : vérifiez les horaires.",
        ],
        featured: true,
      },
      {
        slug: "espagne",
        name: "Espagne",
        tagline: "Barcelone, Andalousie & Baléares",
        description:
          "L'Espagne se vit dans les ruelles de Barcelone, les patios de Séville et les criques des Baléares. Entre tapas, architecture et fêtes locales, c'est une destination solaire qui se partage volontiers.",
        image: unsplash("photo-1583422409516-2895a77efded"),
        imageAlt: "Architecture de Barcelone et rue animée",
        fromPrice: "149 €",
        flightTime: "1h30 depuis Casablanca",
        capital: "Madrid",
        language: "Espagnol",
        currency: "Euro (EUR)",
        visa: "Règles Schengen : vérifiez les formalités selon votre nationalité.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mars — Mai",
            note: "Climat doux, villes vivantes et moins de foule sur la côte.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Mer encore chaude, lumière superbe et tarifs plus doux.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte chaleur et affluence sur les plages et les sites touristiques.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Barcelone",
            "videoUrl": "/videos/espagne/01-barcelone.mp4",
            description:
              "La Sagrada Família, le Park Güell et les ruelles du Gothic Quarter.",
          },
          {
            title: "L'Andalousie",
            "videoUrl": "/videos/espagne/02-l-andalousie.mp4",
            description:
              "Séville, Grenade et l'Alhambra, entre patios, flamenco et architecture mauresque.",
          },
          {
            title: "Les Baléares",
            "videoUrl": "/videos/espagne/03-les-baleares.mp4",
            description:
              "Majorque, Ibiza et Minorque pour des criques turquoise et des villages blancs.",
          },
        ],
        tips: [
          "Réservez l'Alhambra et la Sagrada Família plusieurs semaines à l'avance.",
          "Le dîner se prend tard : ne vous étonnez pas de trouver les restaurants vides à 19h.",
          "Restez attentif aux pickpockets dans les zones touristiques.",
        ],
        featured: true,
      },
      {
        slug: "italie",
        name: "Italie",
        tagline: "Rome, Florence & Amalfi",
        description:
          "L'Italie est un musée à ciel ouvert, des vestiges romains aux collines toscanes et aux villages suspendus de la côte amalfitaine. La dolce vita se déguste autour d'une table, un verre de vin à la main.",
        image: unsplash("photo-1552832230-c0197dd311b5"),
        imageAlt: "Le Colisée à Rome",
        fromPrice: "189 €",
        flightTime: "2h45 depuis Casablanca",
        capital: "Rome",
        language: "Italien",
        currency: "Euro (EUR)",
        visa: "Règles Schengen : vérifiez les formalités selon votre nationalité.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Avril — Juin",
            note: "Températures agréables et villes encore respirables.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Vendanges, lumière chaude et moins de touristes.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Chaleur intense et affluence record dans les grandes villes.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Rome",
            "videoUrl": "/videos/italie/01-rome.mp4",
            description:
              "Le Colisée, le Vatican, la fontaine de Trevi et les trattorie du Trastevere.",
          },
          {
            title: "Florence & la Toscane",
            "videoUrl": "/videos/italie/02-florence-la-toscane.mp4",
            description:
              "Les Offices, le Ponte Vecchio et les collines du Chianti.",
          },
          {
            title: "La côte amalfitaine",
            "videoUrl": "/videos/italie/03-la-cote-amalfitaine.mp4",
            description:
              "Positano, Amalfi et Ravello, accrochés entre mer et montagne.",
          },
        ],
        tips: [
          "Réservez le Colisée et les musées du Vatican en ligne.",
          "Validez votre billet de train avant de monter.",
          "Éloignez-vous des restaurants à cartes illustrées proches des monuments.",
        ],
      },
      {
        slug: "grece",
        name: "Grèce",
        tagline: "Athènes, Cyclades & Santorin",
        description:
          "La Grèce marie les vestiges d'Athènes aux villages blancs des Cyclades et aux eaux égéennes. Entre mythologie, plages et tavernes les pieds dans l'eau, c'est une invitation au farniente cultivé.",
        image: unsplash("photo-1570077188670-e3a8d69ac5ff"),
        imageAlt: "Maisons blanches et dômes bleus de Santorin, Grèce",
        fromPrice: "249 €",
        flightTime: "3h30 depuis Casablanca",
        capital: "Athènes",
        language: "Grec",
        currency: "Euro (EUR)",
        visa: "Règles Schengen : vérifiez les formalités selon votre nationalité.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mai — Juin",
            note: "Mer chaude, jours longs et sites encore accessibles.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Lumière magnifique, eau tiède et moins de monde.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte chaleur, meltemi et affluence sur les îles.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Athènes",
            "videoUrl": "/videos/grece/01-athenes.mp4",
            description:
              "L'Acropole, le quartier de Plaka et les tavernes du centre historique.",
          },
          {
            title: "Santorin",
            "videoUrl": "/videos/grece/02-santorin.mp4",
            description:
              "Oia et Fira, leurs maisons blanches et les couchers de soleil sur la caldeira.",
          },
          {
            title: "La Crète",
            "videoUrl": "/videos/grece/03-la-crete.mp4",
            description:
              "Les gorges de Samaria, les plages de Balos et la cuisine crétoise.",
          },
        ],
        tips: [
          "Réservez les ferries entre îles dès que vos dates sont fixées.",
          "Prévoyez du cash pour les petites tavernes et les bus locaux.",
          "Une tenue couvrante est demandée dans les monastères et églises.",
        ],
        featured: true,
      },
      {
        slug: "portugal",
        name: "Portugal",
        tagline: "Lisbonne, Porto & Algarve",
        description:
          "Le Portugal séduit par ses azulejos, ses tramways jaunes et ses falaises de l'Algarve. Entre fado, pastéis de nata et routes viticoles du Douro, c'est une destination douce et lumineuse.",
        image: unsplash("photo-1555881400-74d7acaacd8b"),
        imageAlt: "Tramway jaune dans les rues de Lisbonne",
        fromPrice: "159 €",
        flightTime: "1h30 depuis Casablanca",
        capital: "Lisbonne",
        language: "Portugais",
        currency: "Euro (EUR)",
        visa: "Règles Schengen : vérifiez les formalités selon votre nationalité.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mars — Mai",
            note: "Climat doux, villes fleuries et côte encore calme.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Mer chaude, vendanges dans le Douro et lumière dorée.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte affluence à Lisbonne et sur les plages de l'Algarve.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Lisbonne & Sintra",
            "videoUrl": "/videos/portugal/01-lisbonne-sintra.mp4",
            description:
              "Les tramways, l'Alfama, le palais de Pena et les quintas de Sintra.",
          },
          {
            title: "Porto & le Douro",
            "videoUrl": "/videos/portugal/02-porto-le-douro.mp4",
            description:
              "Les caves de vin, le pont Dom-Luís et une croisière sur le fleuve.",
          },
          {
            title: "L'Algarve",
            "videoUrl": "/videos/portugal/03-l-algarve.mp4",
            description:
              "Les falaises de Ponta da Piedade, les grottes et les plages dorées.",
          },
        ],
        tips: [
          "Réservez le palais de Pena et les caves de Porto à l'avance.",
          "Les collines de Lisbonne se découvrent à pied et en tramway.",
          "Goûtez les pastéis de nata tièdes, avec une pincée de cannelle.",
        ],
      },
      {
        slug: "turquie",
        name: "Turquie",
        tagline: "Istanbul, Cappadoce & côte égéenne",
        description:
          "La Turquie est un pont entre deux continents : les mosquées d'Istanbul, les cheminées de fée de Cappadoce et les criques de la côte égéenne composent un voyage riche en sensations. Un pays de marchés, de saveurs et de paysages uniques.",
        image: unsplash("photo-1570939274717-7eda259b50ed"),
        imageAlt: "Montgolfières au-dessus de la Cappadoce",
        fromPrice: "299 €",
        flightTime: "4h depuis Casablanca",
        capital: "Ankara",
        language: "Turc",
        currency: "Livre turque (TRY)",
        visa: "Visa ou e-visa selon votre nationalité : vérifiez les formalités avant le départ.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Avril — Mai",
            note: "Climat doux, jardins en fleurs et vols en montgolfière fréquents.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Chaleur douce, mer encore agréable et lumière superbe.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte chaleur et affluence sur la côte et à Istanbul.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Istanbul",
            "videoUrl": "/videos/turquie/01-istanbul.mp4",
            description:
              "Sainte-Sophie, la Mosquée bleue, le Grand Bazar et les croisières sur le Bosphore.",
          },
          {
            title: "La Cappadoce",
            "videoUrl": "/videos/turquie/02-la-cappadoce.mp4",
            description:
              "Les cheminées de fée, les villages troglodytes et les vols en montgolfière au lever du soleil.",
          },
          {
            title: "Éphèse & la côte égéenne",
            "videoUrl": "/videos/turquie/03-ephese-la-cote-egeenne.mp4",
            description:
              "Les ruines antiques, les plages de Bodrum et les villages de pierre.",
          },
        ],
        tips: [
          "Réservez le vol en montgolfière dès votre arrivée en Cappadoce.",
          "Négociez dans les bazars et goûtez aux spécialités locales.",
          "Prévoyez une tenue couvrante pour les mosquées et les sites religieux.",
        ],
      },
    ],
  },
  {
    slug: "ameriques",
    name: "Amériques",
    index: "03",
    title: "Grands espaces & rythmes",
    description:
      "De New York à Rio, des Andes aux Caraïbes, les Amériques promettent des itinéraires à la mesure de vos envies de grand large.",
    destinations: "États-Unis · Canada · Mexique · Brésil · Pérou",
    image: unsplash("photo-1483729558449-99ef09a8c325"),
    imageAlt: "Vue aérienne de Rio de Janeiro et du Pain de Sucre",
    fromPrice: "540 €",
    countries: [
      {
        slug: "etats-unis",
        name: "États-Unis",
        tagline: "New York, Californie & Floride",
        description:
          "Les États-Unis sont un concentré de décors : les gratte-ciel de New York, les routes de Californie, les parcs nationaux et les plages de Floride. Un pays à composer comme un road trip, au rythme de vos envies.",
        image: unsplash("photo-1496442226666-8d4d0e62e6e9"),
        imageAlt: "Skyline de New York",
        fromPrice: "590 €",
        flightTime: "8h depuis Casablanca",
        capital: "Washington D.C.",
        language: "Anglais",
        currency: "Dollar américain (USD)",
        visa: "ESTA obligatoire pour les ressortissants français (séjour < 90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Avril — Juin",
            note: "Climat doux, parcs en fleurs et villes agréables à parcourir.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Lumière d'automne, moins de foule et tarifs plus doux.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Forte chaleur et affluence dans les villes et les parcs.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "New York",
            "videoUrl": "/videos/etats-unis/01-new-york.mp4",
            description:
              "Manhattan, Brooklyn, Central Park et les rooftops au coucher du soleil.",
          },
          {
            title: "La Californie",
            "videoUrl": "/videos/etats-unis/02-la-californie.mp4",
            description:
              "Los Angeles, San Francisco et la Pacific Coast Highway.",
          },
          {
            title: "Les parcs nationaux",
            "videoUrl": "/videos/etats-unis/03-les-parcs-nationaux.mp4",
            description:
              "Grand Canyon, Yosemite ou Zion pour des paysages à couper le souffle.",
          },
        ],
        tips: [
          "Faites votre demande d'ESTA plusieurs semaines avant le départ.",
          "Prévoyez un pourboire de 15 à 20 % dans les restaurants.",
          "Louez une voiture pour les parcs, mais évitez-la dans les grandes villes.",
        ],
        featured: true,
      },
      {
        slug: "canada",
        name: "Canada",
        tagline: "Montréal, Québec & Rocheuses",
        description:
          "Le Canada offre des lacs turquoise, des forêts infinies et des villes francophones pleines de charme. De Montréal aux Rocheuses, c'est une destination idéale pour les amoureux de nature et de grands espaces.",
        image: unsplash("photo-1503614472-8c93d56e92ce"),
        imageAlt: "Lac turquoise et montagnes Rocheuses au Canada",
        fromPrice: "620 €",
        flightTime: "7h30 depuis Casablanca",
        capital: "Ottawa",
        language: "Anglais & français",
        currency: "Dollar canadien (CAD)",
        visa: "AVE (autorisation de voyage électronique) obligatoire pour les ressortissants français.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Juin — Septembre",
            note: "Été doux, lacs accessibles et longues journées.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Octobre",
            note: "Les couleurs d'automne illuminent les forêts.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Février",
            note: "Froid intense : à réserver aux amateurs de ski et de neige.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Montréal & Québec",
            "videoUrl": "/videos/canada/01-montreal-quebec.mp4",
            description:
              "Le Vieux-Montréal, le Plateau et le charme européen du Vieux-Québec.",
          },
          {
            title: "Banff & Lake Louise",
            "videoUrl": "/videos/canada/02-banff-lake-louise.mp4",
            description:
              "Les lacs émeraude, les glaciers et les routes panoramiques des Rocheuses.",
          },
          {
            title: "Vancouver & l'île de Vancouver",
            "videoUrl": "/videos/canada/03-vancouver-l-ile-de-vancouver.mp4",
            description:
              "La côte pacifique, les forêts tempérées et les paysages sauvages.",
          },
        ],
        tips: [
          "Demandez votre AVE en ligne avant de réserver vos billets.",
          "Réservez les parcs nationaux et les hébergements en été.",
          "Prévoyez des vêtements chauds même en été dans les Rocheuses.",
        ],
      },
      {
        slug: "mexique",
        name: "Mexique",
        tagline: "Cancún, Yucatán & Mexico",
        description:
          "Le Mexique mêle plages des Caraïbes, cités mayas et gastronomie vibrante. Entre cenotes, tacos et haciendas, c'est une destination généreuse qui se découvre avec curiosité.",
        image: unsplash("photo-1518638150340-f706e86654de"),
        imageAlt: "Pyramide maya de Chichén Itzá",
        fromPrice: "540 €",
        flightTime: "10h depuis Casablanca",
        capital: "Mexico",
        language: "Espagnol",
        currency: "Peso mexicain (MXN)",
        visa: "Sans visa pour les ressortissants français (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Novembre — Avril",
            note: "Saison sèche, ciel bleu et mer des Caraïbes au meilleur.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mai & Octobre",
            note: "Chaleur présente mais moins de monde sur la côte.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Octobre",
            note: "Saison des ouragans et forte humidité sur la Riviera Maya.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "La Riviera Maya",
            "videoUrl": "/videos/mexique/01-la-riviera-maya.mp4",
            description:
              "Cancún, Playa del Carmen et les cenotes entre jungle et mer turquoise.",
          },
          {
            title: "Chichén Itzá",
            "videoUrl": "/videos/mexique/02-chichen-itza.mp4",
            description:
              "La cité maya emblématique, à visiter tôt le matin.",
          },
          {
            title: "Mexico & Oaxaca",
            "videoUrl": "/videos/mexique/03-mexico-oaxaca.mp4",
            description:
              "Les marchés, l'architecture coloniale et la scène gastronomique.",
          },
        ],
        tips: [
          "Utilisez les taxis officiels ou les applications de VTC.",
          "Buvez de l'eau en bouteille et méfiez-vous des glaçons dans la rue.",
          "Prévoyez du cash pour les marchés et les petits restaurants.",
        ],
      },
      {
        slug: "bresil",
        name: "Brésil",
        tagline: "Rio, Amazonie & Salvador",
        description:
          "Le Brésil est une invitation au mouvement : les plages de Rio, la forêt amazonienne, les rythmes de Salvador et les chutes d'Iguaçu. Un pays immense, solaire et profondément vivant.",
        image: unsplash("photo-1483729558449-99ef09a8c325"),
        imageAlt: "Vue aérienne de Rio de Janeiro et du Pain de Sucre",
        fromPrice: "690 €",
        flightTime: "9h depuis Casablanca",
        capital: "Brasília",
        language: "Portugais",
        currency: "Réal (BRL)",
        visa: "Sans visa pour les ressortissants français (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mai — Septembre",
            note: "Saison sèche à Rio, températures douces et ciel dégagé.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Avril & Octobre",
            note: "Moins de foule, mer agréable et tarifs plus doux.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Mars",
            note: "Chaleur, pluies et affluence maximale pendant le carnaval.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Rio de Janeiro",
            "videoUrl": "/videos/bresil/01-rio-de-janeiro.mp4",
            description:
              "Le Pain de Sucre, le Christ Rédempteur et les plages de Copacabana et Ipanema.",
          },
          {
            title: "L'Amazonie",
            "videoUrl": "/videos/bresil/02-l-amazonie.mp4",
            description:
              "Une immersion en lodge au cœur de la forêt, entre fleuves et biodiversité.",
          },
          {
            title: "Les chutes d'Iguaçu",
            "videoUrl": "/videos/bresil/03-les-chutes-d-iguacu.mp4",
            description:
              "Un spectacle naturel grandiose, côté brésilien et argentin.",
          },
        ],
        tips: [
          "Restez vigilant dans les grandes villes et évitez les zones isolées la nuit.",
          "Prévoyez le vaccin contre la fièvre jaune pour l'Amazonie.",
          "Apprenez quelques mots de portugais : l'accueil n'en sera que plus chaleureux.",
        ],
        featured: true,
      },
      {
        slug: "perou",
        name: "Pérou",
        tagline: "Lima, Cusco & Machu Picchu",
        description:
          "Le Pérou est une terre d'altitude et de mystère : les ruelles de Cusco, la vallée sacrée, le Machu Picchu et la gastronomie de Lima. Un voyage entre patrimoine inca et paysages andins.",
        image: unsplash("photo-1526392060635-9d6019884377"),
        imageAlt: "Machu Picchu dans les Andes",
        fromPrice: "780 €",
        flightTime: "12h depuis Casablanca",
        capital: "Lima",
        language: "Espagnol & quechua",
        currency: "Sol (PEN)",
        visa: "Sans visa pour les ressortissants français (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mai — Septembre",
            note: "Saison sèche dans les Andes : idéal pour le Machu Picchu.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Avril & Octobre",
            note: "Moins de pluie, paysages verdoyants et fréquentation modérée.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Mars",
            note: "Saison des pluies : sentiers boueux et visibilité réduite.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Le Machu Picchu",
            "videoUrl": "/videos/perou/01-le-machu-picchu.mp4",
            description:
              "La citadelle inca au lever du soleil, accessible en train ou par le trek.",
          },
          {
            title: "Cusco & la Vallée sacrée",
            "videoUrl": "/videos/perou/02-cusco-la-vallee-sacree.mp4",
            description:
              "Les marchés andins, les ruines et les villages de tisserands.",
          },
          {
            title: "Lima",
            "videoUrl": "/videos/perou/03-lima.mp4",
            description:
              "La capitale gastronomique, entre ceviche, marchés et bord de mer.",
          },
        ],
        tips: [
          "Prenez le temps de vous acclimater à l'altitude à Cusco.",
          "Réservez le Machu Picchu et les trains plusieurs semaines à l'avance.",
          "Prévoyez du cash et un vaccin contre la fièvre jaune pour l'Amazonie.",
        ],
      },
    ],
  },
  {
    slug: "asie",
    name: "Asie",
    index: "04",
    title: "Temples & horizons",
    description:
      "Temples millénaires, rizières infinies et lagons turquoise : l'Asie déploie une diversité d'expériences et de saveurs qui invite au voyage intérieur.",
    destinations: "Émirats · Thaïlande · Japon · Indonésie · Vietnam · Maldives",
    image: unsplash("photo-1528181304800-259b08848526"),
    imageAlt: "Temple bouddhiste thaïlandais",
    fromPrice: "349 €",
    countries: [
      {
        slug: "emirats-arabes-unis",
        name: "Émirats arabes unis",
        tagline: "Dubaï, Abu Dhabi & désert",
        description:
          "Les Émirats surprennent par leur audace : les gratte-ciel de Dubaï, les musées d'Abu Dhabi et les dunes du désert. Une destination facile d'accès, idéale pour une escapade entre modernité et traditions.",
        image: unsplash("photo-1512453979798-5ea266f8880c"),
        imageAlt: "Skyline de Dubaï au crépuscule",
        fromPrice: "349 €",
        flightTime: "7h depuis Casablanca",
        capital: "Abu Dhabi",
        language: "Arabe",
        currency: "Dirham (AED)",
        visa: "Sans visa pour les ressortissants français (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Novembre — Mars",
            note: "Températures douces, idéales pour le désert et les visites.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Avril & Octobre",
            note: "Chaleur modérée, moins de monde et tarifs intéressants.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Septembre",
            note: "Chaleur extrême : les activités en extérieur sont limitées.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Dubaï",
            "videoUrl": "/videos/emirats-arabes-unis/01-dubai.mp4",
            description:
              "Burj Khalifa, Dubai Marina, les souks et une soirée dans le désert.",
          },
          {
            title: "Abu Dhabi",
            "videoUrl": "/videos/emirats-arabes-unis/02-abu-dhabi.mp4",
            description:
              "Le Louvre Abu Dhabi, la Grande Mosquée Sheikh Zayed et la Corniche.",
          },
          {
            title: "Le désert",
            "videoUrl": "/videos/emirats-arabes-unis/03-le-desert.mp4",
            description:
              "Dunes, dromadaires et dîner sous les étoiles dans un camp de luxe.",
          },
        ],
        tips: [
          "Prévoyez une tenue couvrante pour les mosquées et les lieux publics.",
          "Évitez les démonstrations d'affection en public.",
          "Réservez le safari dans le désert et les attractions en ligne.",
        ],
        featured: true,
      },
      {
        slug: "thailande",
        name: "Thaïlande",
        tagline: "Bangkok, Chiang Mai & îles",
        description:
          "La Thaïlande combine temples dorés, street food et îles paradisiaques. De Bangkok à Chiang Mai en passant par Krabi, c'est une destination accessible qui sait passer du tumulte à la sérénité.",
        image: unsplash("photo-1528181304800-259b08848526"),
        imageAlt: "Temple bouddhiste thaïlandais",
        fromPrice: "590 €",
        flightTime: "11h depuis Casablanca",
        capital: "Bangkok",
        language: "Thaï",
        currency: "Baht (THB)",
        visa: "Sans visa pour les ressortissants français (60 jours, vérifiez les règles).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Novembre — Février",
            note: "Saison sèche et températures agréables sur tout le pays.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mars — Mai & Septembre — Octobre",
            note: "Chaleur ou pluies modérées, avec moins de foule.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Août",
            note: "Mousson : averses fréquentes, surtout sur la côte ouest.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Bangkok",
            "videoUrl": "/videos/thailande/01-bangkok.mp4",
            description:
              "Le Grand Palais, Wat Arun, les marchés de nuit et la street food.",
          },
          {
            title: "Chiang Mai",
            "videoUrl": "/videos/thailande/02-chiang-mai.mp4",
            description:
              "Les temples, les cafés et les montagnes du nord, au rythme des lanternes.",
          },
          {
            title: "Krabi & les îles",
            "videoUrl": "/videos/thailande/03-krabi-les-iles.mp4",
            description:
              "Railay, Phi Phi et les îles Similan pour le snorkeling et les plages.",
          },
        ],
        tips: [
          "Une tenue couvrante est demandée dans les temples.",
          "Méfiez-vous des tuk-tuks qui proposent des visites « gratuites ».",
          "Prévoyez du cash pour les marchés et les petites échoppes.",
        ],
        featured: true,
      },
      {
        slug: "japon",
        name: "Japon",
        tagline: "Tokyo, Kyoto & mont Fuji",
        description:
          "Le Japon est un équilibre subtil entre traditions et modernité : les néons de Tokyo, les temples de Kyoto et la sérénité du mont Fuji. Un voyage précis, esthétique et profondément dépaysant.",
        image: unsplash("photo-1493976040374-85c8e12f0c0e"),
        imageAlt: "Rue traditionnelle de Kyoto avec pagode",
        fromPrice: "890 €",
        flightTime: "13h depuis Casablanca",
        capital: "Tokyo",
        language: "Japonais",
        currency: "Yen (JPY)",
        visa: "Sans visa pour les ressortissants français (90 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mars — Avril",
            note: "Cerisiers en fleurs : la période la plus emblématique, à réserver tôt.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Octobre — Novembre",
            note: "Érables rouges, températures douces et lumière magnifique.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juillet — Août",
            note: "Chaleur humide, typhons possibles et affluence estivale.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Tokyo",
            "videoUrl": "/videos/japon/01-tokyo.mp4",
            description:
              "Shibuya, Shinjuku, les quartiers de Yanaka et la scène gastronomique.",
          },
          {
            title: "Kyoto",
            "videoUrl": "/videos/japon/02-kyoto.mp4",
            description:
              "Fushimi Inari, les temples de Higashiyama et les ruelles de Gion.",
          },
          {
            title: "Le mont Fuji",
            "videoUrl": "/videos/japon/03-le-mont-fuji.mp4",
            description:
              "Hakone, Kawaguchiko et les plus beaux points de vue sur le volcan.",
          },
        ],
        tips: [
          "Achetez un JR Pass si vous prévoyez plusieurs trajets en shinkansen.",
          "Le Japon reste très cash : prévoyez des yens et une carte IC.",
          "Respectez les règles locales : pas de pourboire, files ordonnées, silence dans les transports.",
        ],
        featured: true,
      },
      {
        slug: "indonesie",
        name: "Indonésie",
        tagline: "Bali, Java & Lombok",
        description:
          "L'Indonésie est un archipel d'une richesse infinie : rizières de Bali, temples de Java, plages de Lombok et volcans actifs. Un voyage où la nature et la spiritualité se rencontrent.",
        image: unsplash("photo-1537996194471-e657df975ab4"),
        imageAlt: "Temple balinais au bord de l'eau à Bali, Indonésie",
        fromPrice: "690 €",
        flightTime: "14h depuis Casablanca",
        capital: "Jakarta",
        language: "Indonésien",
        currency: "Roupie indonésienne (IDR)",
        visa: "Visa à l'arrivée ou e-visa pour les ressortissants français.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Avril — Octobre",
            note: "Saison sèche : idéal pour Bali, Java et les randonnées.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mars & Novembre",
            note: "Transition douce, moins de monde et tarifs attractifs.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Février",
            note: "Saison des pluies : humidité et averses fréquentes.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Bali",
            "videoUrl": "/videos/indonesie/01-bali.mp4",
            description:
              "Ubud, les rizières de Tegallalang, les temples et les plages du sud.",
          },
          {
            title: "Java",
            "videoUrl": "/videos/indonesie/02-java.mp4",
            description:
              "Borobudur, Prambanan et le lever de soleil sur le mont Bromo.",
          },
          {
            title: "Lombok & les Gili",
            "videoUrl": "/videos/indonesie/03-lombok-les-gili.mp4",
            description:
              "Des plages plus calmes, du snorkeling et une atmosphère paisible.",
          },
        ],
        tips: [
          "Portez un sarong dans les temples et respectez les règles locales.",
          "Buvez de l'eau en bouteille et évitez les glaçons dans la rue.",
          "Réservez les bateaux et les excursions avec des opérateurs reconnus.",
        ],
      },
      {
        slug: "vietnam",
        name: "Vietnam",
        tagline: "Hanoï, Hạ Long & Hội An",
        description:
          "Le Vietnam déroule un ruban de paysages : les pitons de la baie d'Hạ Long, les lanternes de Hội An et l'énergie de Hanoï. Un pays de saveurs, d'histoire et de rencontres.",
        image: unsplash("photo-1528127269322-539801943592"),
        imageAlt: "Baie d'Hạ Long et ses pitons karstiques",
        fromPrice: "640 €",
        flightTime: "12h depuis Casablanca",
        capital: "Hanoï",
        language: "Vietnamien",
        currency: "Dong (VND)",
        visa: "Visa ou e-visa obligatoire pour les ressortissants français.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mars — Avril",
            note: "Climat doux au nord et au centre, idéal pour les visites.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Novembre",
            note: "Rizières dorées, températures agréables et moins de pluie.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Août",
            note: "Chaleur, humidité et risque de typhons sur la côte.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Hanoï",
            "videoUrl": "/videos/vietnam/01-hanoi.mp4",
            description:
              "Le Vieux Quartier, le lac Hoan Kiem et la street food au coin des rues.",
          },
          {
            title: "La baie d'Hạ Long",
            "videoUrl": "/videos/vietnam/02-la-baie-d-ha-long.mp4",
            description:
              "Une croisière entre pitons karstiques, grottes et couchers de soleil.",
          },
          {
            title: "Hội An",
            "videoUrl": "/videos/vietnam/03-hoi-an.mp4",
            description:
              "Les lanternes, les maisons anciennes et les plages de la côte centrale.",
          },
        ],
        tips: [
          "Traversez les rues d'un pas régulier : les motos vous contournent.",
          "Prévoyez du cash pour les marchés et les petits commerces.",
          "Réservez les croisières dans la baie d'Hạ Long à l'avance.",
        ],
      },
      {
        slug: "maldives",
        name: "Maldives",
        tagline: "Atolls, lagons & villas sur l'eau",
        description:
          "Les Maldives sont l'archétype du paradis : eaux turquoise, récifs coralliens et villas sur pilotis. Un séjour placé sous le signe du farniente, du snorkeling et des couchers de soleil.",
        image: unsplash("photo-1514282401047-d79a71a590e8"),
        imageAlt: "Bungalows sur pilotis aux Maldives",
        fromPrice: "990 €",
        flightTime: "10h depuis Casablanca",
        capital: "Malé",
        language: "Dhivehi",
        currency: "Rufiyaa (MVR) & dollar américain",
        visa: "Visa gratuit à l'arrivée (30 jours).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Novembre — Avril",
            note: "Saison sèche, ciel bleu et visibilité exceptionnelle sous l'eau.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mai & Octobre",
            note: "Transition douce, tarifs plus doux et moins de monde.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Septembre",
            note: "Saison des pluies : averses fréquentes et mer parfois agitée.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Les villas sur pilotis",
            "videoUrl": "/videos/maldives/01-les-villas-sur-pilotis.mp4",
            description:
              "Un lagon privé, un ponton en bois et le bruit des vagues pour seul réveil.",
          },
          {
            title: "Snorkeling & plongée",
            "videoUrl": "/videos/maldives/02-snorkeling-plongee.mp4",
            description:
              "Tortues, raies manta et poissons tropicaux dans des eaux cristallines.",
          },
          {
            title: "Malé & les atolls",
            "videoUrl": "/videos/maldives/03-male-les-atolls.mp4",
            description:
              "Le marché aux poissons, les îles locales et les couchers de soleil.",
          },
        ],
        tips: [
          "Vérifiez les horaires de seaplane et les transferts avant de réserver.",
          "Prévoyez une crème solaire respectueuse des récifs.",
          "Respectez les règles locales sur les îles habitées.",
        ],
        featured: true,
      },
    ],
  },
  {
    slug: "oceanie",
    name: "Océanie",
    index: "05",
    title: "Lagons & grands espaces",
    description:
      "Des baies de Sydney aux lagons de Polynésie, l'Océanie est une invitation au grand large, à la nature sauvage et aux voyages qui prennent le temps.",
    destinations: "Australie · Nouvelle-Zélande · Polynésie · Fidji",
    image: unsplash("photo-1506973035872-a4ec16b8e8d9"),
    imageAlt: "Opéra de Sydney et port",
    fromPrice: "1 190 €",
    countries: [
      {
        slug: "australie",
        name: "Australie",
        tagline: "Sydney, Grande Barrière & Outback",
        description:
          "L'Australie est un continent à part entière : les baies de Sydney, la Grande Barrière de corail, les roches rouges de l'Outback et les routes côtières. Un voyage pour les amoureux de nature et d'espaces infinis.",
        image: unsplash("photo-1506973035872-a4ec16b8e8d9"),
        imageAlt: "Opéra de Sydney et port",
        fromPrice: "1 190 €",
        flightTime: "20h depuis Casablanca",
        capital: "Canberra",
        language: "Anglais",
        currency: "Dollar australien (AUD)",
        visa: "eVisitor (ETA) obligatoire pour les ressortissants français.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Septembre — Novembre",
            note: "Printemps austral : températures douces et nature en fleurs.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Mars — Mai",
            note: "Automne doux, moins de foule et mer encore agréable.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Février",
            note: "Haute saison estivale : chaleur, prix élevés et sites bondés.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Sydney",
            "videoUrl": "/videos/australie/01-sydney.mp4",
            description:
              "L'Opéra, le Harbour Bridge, Bondi et les ferries de la baie.",
          },
          {
            title: "La Grande Barrière de corail",
            "videoUrl": "/videos/australie/02-la-grande-barriere-de-corail.mp4",
            description:
              "Plongée et snorkeling à Cairns ou aux Whitsundays.",
          },
          {
            title: "Uluru & l'Outback",
            "videoUrl": "/videos/australie/03-uluru-l-outback.mp4",
            description:
              "Le rocher sacré au lever du soleil et les paysages rouges du centre.",
          },
        ],
        tips: [
          "Faites votre demande d'eVisitor avant de réserver vos vols.",
          "Les distances sont immenses : prévoyez des vols intérieurs.",
          "Protégez-vous du soleil et respectez les consignes de baignade.",
        ],
        featured: true,
      },
      {
        slug: "nouvelle-zelande",
        name: "Nouvelle-Zélande",
        tagline: "Auckland, Queenstown & fjords",
        description:
          "La Nouvelle-Zélande est un terrain de jeu à ciel ouvert : fjords, volcans, lacs et routes panoramiques. Un pays idéal pour les road trips, la randonnée et les amoureux de nature préservée.",
        image: unsplash("photo-1469521669194-babb45599def"),
        imageAlt: "Paysage montagneux et fjord en Nouvelle-Zélande",
        fromPrice: "1 290 €",
        flightTime: "22h depuis Casablanca",
        capital: "Wellington",
        language: "Anglais & māori",
        currency: "Dollar néo-zélandais (NZD)",
        visa: "NZeTA obligatoire pour les ressortissants français.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Décembre — Mars",
            note: "Été austral : jours longs, randonnées et plages.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Septembre — Novembre",
            note: "Printemps : nature verdoyante et fréquentation modérée.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Juin — Août",
            note: "Hiver froid et pluvieux, sauf pour les sports de neige.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Queenstown & Milford Sound",
            "videoUrl": "/videos/nouvelle-zelande/01-queenstown-milford-sound.mp4",
            description:
              "Les paysages de fjord, les randonnées et les activités outdoor.",
          },
          {
            title: "Rotorua",
            "videoUrl": "/videos/nouvelle-zelande/02-rotorua.mp4",
            description:
              "Les sources thermales, les geysers et la culture māorie.",
          },
          {
            title: "Auckland & la Bay of Islands",
            "videoUrl": "/videos/nouvelle-zelande/03-auckland-la-bay-of-islands.mp4",
            description:
              "La ville entre deux ports et les baies du nord pour la voile.",
          },
        ],
        tips: [
          "Réservez les campings et les campervans plusieurs mois à l'avance.",
          "Conduisez à gauche et adaptez vos temps de trajet au relief.",
          "Respectez les sites māoris et les consignes de randonnée.",
        ],
      },
      {
        slug: "polynesie-francaise",
        name: "Polynésie française",
        tagline: "Tahiti, Moorea & Bora Bora",
        description:
          "La Polynésie française est une constellation d'îles aux lagons irréels. Entre Tahiti, Moorea et Bora Bora, les journées s'étirent au rythme des pirogues, des récifs et des couchers de soleil.",
        image: unsplash("photo-1738762932370-468a90e0ff68"),
        imageAlt: "Bungalows sur pilotis et lagon turquoise de Bora Bora",
        fromPrice: "1 490 €",
        flightTime: "22h depuis Casablanca",
        capital: "Papeete",
        language: "Français & tahitien",
        currency: "Franc Pacifique (XPF)",
        visa: "Sans visa pour les ressortissants français.",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mai — Octobre",
            note: "Saison sèche, alizés et lagons au meilleur de leur clarté.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Avril & Novembre",
            note: "Transition douce, moins de monde et tarifs plus doux.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Mars",
            note: "Saison des pluies et risque de cyclones.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Bora Bora",
            "videoUrl": "/videos/polynesie-francaise/01-bora-bora.mp4",
            description:
              "Le lagon, les bungalows sur pilotis et la silhouette du mont Otemanu.",
          },
          {
            title: "Moorea",
            "videoUrl": "/videos/polynesie-francaise/02-moorea.mp4",
            description:
              "Les baies de Cook et d'Opunohu, les randonnées et les motus.",
          },
          {
            title: "Tahiti & Rangiroa",
            "videoUrl": "/videos/polynesie-francaise/03-tahiti-rangiroa.mp4",
            description:
              "La côte sauvage de Tahiti et les atolls de Rangiroa pour la plongée.",
          },
        ],
        tips: [
          "Réservez les bungalows sur pilotis très tôt, surtout en haute saison.",
          "Prévoyez une crème solaire respectueuse des lagons.",
          "Les liaisons inter-îles se réservent à l'avance.",
        ],
        featured: true,
      },
      {
        slug: "fidji",
        name: "Fidji",
        tagline: "Nadi, Mamanuca & Yasawa",
        description:
          "Les Fidji sont une invitation à la douceur de vivre : eaux turquoise, récifs coralliens et villages accueillants. Un archipel idéal pour se ressourcer, plonger et découvrir la culture fidjienne.",
        image: unsplash("photo-1505881502353-a1986add3762"),
        imageAlt: "Plage de sable blanc et palmiers aux Fidji",
        fromPrice: "1 390 €",
        flightTime: "24h depuis Casablanca",
        capital: "Suva",
        language: "Anglais, fidjien & hindi",
        currency: "Dollar fidjien (FJD)",
        visa: "Sans visa pour les ressortissants français (4 mois).",
        bestPeriods: [
          {
            label: "Période idéale",
            months: "Mai — Octobre",
            note: "Saison sèche, températures douces et mer calme.",
            tone: "ideal",
          },
          {
            label: "Belle alternative",
            months: "Avril & Novembre",
            note: "Moins de monde, tarifs plus doux et lagons encore superbes.",
            tone: "shoulder",
          },
          {
            label: "À éviter",
            months: "Décembre — Mars",
            note: "Saison des cyclones : pluies et humidité importantes.",
            tone: "avoid",
          },
        ],
        highlights: [
          {
            title: "Les Mamanuca",
            "videoUrl": "/videos/fidji/01-les-mamanuca.mp4",
            description:
              "Des îles proches de Nadi, parfaites pour le snorkeling et les day trips.",
          },
          {
            title: "Les Yasawa",
            "videoUrl": "/videos/fidji/02-les-yasawa.mp4",
            description:
              "Une chaîne d'îles plus sauvages, accessible en ferry ou en hydravion.",
          },
          {
            title: "La Coral Coast",
            "videoUrl": "/videos/fidji/03-la-coral-coast.mp4",
            description:
              "Les villages, les récifs et les paysages de la côte sud de Viti Levu.",
          },
        ],
        tips: [
          "Prévoyez du cash pour les villages et les excursions locales.",
          "Respectez les coutumes : demandez avant d'entrer dans un village.",
          "Utilisez une crème solaire respectueuse des coraux.",
        ],
      },
    ],
  },
];

export const continents: Continent[] = continentSeeds.map((continent) => {
  const existing = new Set(continent.countries.map((country) => country.slug));
  const extra = (extraCountries[continent.slug] ?? []).filter(
    (country) => !existing.has(country.slug),
  );

  return {
    ...continent,
    countries: [...continent.countries, ...extra].map((country) =>
      enrichCountry(country),
    ),
  };
});

export function getContinent(slug: string) {
  return continents.find((continent) => continent.slug === slug);
}

export function getCountry(continentSlug: string, countrySlug: string) {
  const continent = getContinent(continentSlug);
  const country = continent?.countries.find((item) => item.slug === countrySlug);
  return continent && country ? { continent, country } : undefined;
}

export function getRelatedCountries(
  continentSlug: string,
  countrySlug: string,
  limit = 3,
) {
  const continent = getContinent(continentSlug);
  if (!continent) return [];
  return continent.countries
    .filter((country) => country.slug !== countrySlug)
    .slice(0, limit);
}

export function getFeaturedCountries(limit = 10) {
  return continents
    .flatMap((continent) =>
      continent.countries
        .filter((country) => country.featured)
        .map((country) => ({ continent, country })),
    )
    .slice(0, limit);
}

export function getDestinationNav(): DestinationNavItem[] {
  return continents.map((continent) => ({
    slug: continent.slug,
    name: continent.name,
    index: continent.index,
    countries: continent.countries.map((country) => ({
      slug: country.slug,
      name: country.name,
    })),
  }));
}

const countryPrepositions: Record<string, string> = {
  Maroc: "au",
  Sénégal: "au",
  Égypte: "en",
  Kenya: "au",
  "Afrique du Sud": "en",
  France: "en",
  Espagne: "en",
  Italie: "en",
  Portugal: "au",
  Grèce: "en",
  Turquie: "en",
  "États-Unis": "aux",
  Canada: "au",
  Mexique: "au",
  Brésil: "au",
  Pérou: "au",
  "Émirats arabes unis": "aux",
  Thaïlande: "en",
  Japon: "au",
  Indonésie: "en",
  Vietnam: "au",
  Maldives: "aux",
  Australie: "en",
  "Nouvelle-Zélande": "en",
  "Polynésie française": "en",
  Fidji: "aux",
};

const dataPrepositions: Record<string, string> = {};
for (const continent of continents) {
  for (const country of continent.countries) {
    if (country.preposition) {
      dataPrepositions[country.name] = country.preposition;
    }
  }
}

export function countryWithPreposition(name: string) {
  return `${dataPrepositions[name] ?? countryPrepositions[name] ?? "au"} ${name}`;
}

export function continentWithPreposition(name: string) {
  return `${name === "Amériques" ? "aux" : "en"} ${name}`;
}
