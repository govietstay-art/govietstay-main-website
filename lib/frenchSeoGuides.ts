export type FrenchSeoGuide = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  eyebrow: string;
  summary: string;
  quick: string[];
  sections: { title: string; body: string[] }[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  primaryHref: string;
  primaryLabel: string;
  image: string;
  imageAlt: string;
  updated: string;
};

export const frenchSeoGuides: FrenchSeoGuide[] = [
  {
    slug: "voyage-vietnam-sur-mesure",
    title: "Voyage Vietnam sur mesure 2027 | Circuit privé et agence locale | GoVietStay",
    h1: "Voyage au Vietnam sur mesure : construire le bon rythme avant de choisir les prestations",
    description:
      "Guide 2027 pour organiser un voyage au Vietnam sur mesure : itinéraire, rythme, chauffeur privé, guide francophone sur demande, Centre du Vietnam et Phu Quoc.",
    keywords: [
      "voyage vietnam sur mesure",
      "voyage vietnam agence locale",
      "circuit privé vietnam",
      "voyage vietnam guide privé",
      "voyage vietnam 2027",
    ],
    eyebrow: "VOYAGE VIETNAM SUR MESURE · 2027",
    summary:
      "Un bon voyage sur mesure ne commence pas par une liste de prestations. Il commence par votre durée, votre rythme, vos priorités et les régions que vous voulez vraiment vivre. Ensuite seulement viennent la voiture, le guide et les excursions.",
    quick: [
      "Commencer par la durée réelle",
      "Limiter les changements d'hôtel",
      "Réserver le privé là où il apporte un vrai confort",
      "Garder une marge pour la météo",
    ],
    sections: [
      {
        title: "1. Le sur-mesure sert d'abord à protéger votre temps",
        body: [
          "Au Vietnam, les distances peuvent sembler courtes sur une carte mais les transferts, les vols intérieurs et les changements d'hôtel prennent vite une partie importante du séjour. Un itinéraire sur mesure sert d'abord à éviter les allers-retours inutiles.",
          "Pour un premier voyage, mieux vaut choisir quelques régions cohérentes plutôt que de multiplier les étapes. Le Centre du Vietnam fonctionne très bien autour de Da Nang, Hoi An et Hué, tandis que Phu Quoc se prête davantage à un séjour balnéaire complété par quelques journées d'excursion.",
        ],
      },
      {
        title: "2. Chauffeur privé, guide ou excursion : tout n'a pas besoin d'être privatisé",
        body: [
          "Une voiture privée est particulièrement utile pour les familles, les couples qui veulent contrôler leurs horaires ou les journées avec plusieurs arrêts. Un guide ajoute surtout de la valeur sur les sites historiques et culturels, comme Hué ou My Son.",
          "Pour certaines activités simples, une formule partagée peut suffire. Le bon choix consiste à payer le privé lorsque la flexibilité, le confort ou la compréhension du lieu changent réellement l'expérience.",
        ],
      },
      {
        title: "3. Le Centre et Phu Quoc ne se planifient pas de la même façon",
        body: [
          "Da Nang, Hoi An et Hué demandent de réfléchir aux temps de route, aux heures de visite et à la saison des pluies. Phu Quoc demande surtout de tenir compte de la zone de l'hôtel, des distances nord-sud et des conditions de mer pour les sorties en bateau.",
          "C'est pourquoi un même modèle de circuit ne doit pas être appliqué partout. Le rythme doit s'adapter à la destination, pas l'inverse.",
        ],
      },
      {
        title: "4. Une agence locale est utile surtout quand quelque chose change",
        body: [
          "Un changement de météo, un bateau annulé, un vol retardé ou une envie de modifier une journée sont des situations où un contact local devient plus utile qu'un programme rigide réservé des mois à l'avance.",
          "GoVietStay privilégie cette logique : informations et organisation d'abord, puis confirmation des prestations nécessaires selon les dates, le groupe et l'hôtel.",
        ],
      },
    ],
    checklist: [
      "Dates d'arrivée et de départ",
      "Nombre d'adultes et d'enfants",
      "Régions prioritaires",
      "Niveau de confort souhaité",
      "Jours qui doivent rester flexibles",
    ],
    faqs: [
      {
        q: "Combien de jours prévoir pour un premier voyage au Vietnam ?",
        a: "Deux semaines permettent de construire un itinéraire équilibré, mais un séjour plus court peut très bien fonctionner si vous vous concentrez sur une ou deux régions.",
      },
      {
        q: "Un voyage sur mesure est-il forcément plus cher ?",
        a: "Non. Le coût dépend surtout du niveau d'hébergement, du nombre de journées avec chauffeur ou guide et du degré de privatisation choisi.",
      },
      {
        q: "Peut-on réserver seulement quelques journées privées ?",
        a: "Oui. C'est souvent la solution la plus rationnelle : hôtel et vols de votre côté, puis transferts ou excursions privées uniquement quand ils apportent un avantage réel.",
      },
      {
        q: "Un guide francophone est-il disponible partout ?",
        a: "Il doit être demandé et confirmé selon la date et la destination. GoVietStay vérifie la disponibilité avant toute confirmation.",
      },
    ],
    related: ["guide-francophone-vietnam", "centre-vietnam-da-nang-hoi-an-hue", "phu-quoc-excursions-privees"],
    primaryHref: "/fr",
    primaryLabel: "Voir le guide Vietnam en français",
    image: "/hero-hoian-new.png",
    imageAlt: "Voyage sur mesure au Vietnam avec itinéraire privé",
    updated: "2026-09-15",
  },
  {
    slug: "vietnam-en-famille",
    title: "Voyage Vietnam en famille 2027 | Enfants, rythme et itinéraire | GoVietStay",
    h1: "Vietnam en famille : voir moins, voyager mieux et laisser de la place aux enfants",
    description:
      "Préparer un voyage au Vietnam en famille en 2027 : rythme, transports, chaleur, Phu Quoc, Da Nang, Hoi An et journées privées adaptées aux enfants.",
    keywords: [
      "voyage vietnam en famille",
      "voyage vietnam avec enfants",
      "vietnam en famille",
      "phu quoc en famille",
      "da nang avec enfants",
    ],
    eyebrow: "VIETNAM EN FAMILLE · 2027",
    summary:
      "Avec des enfants, la meilleure optimisation n'est pas de faire plus de visites : c'est de réduire les changements d'hôtel, de garder des pauses et de choisir quelques expériences fortes.",
    quick: [
      "Une grande activité par demi-journée",
      "Limiter les longs transferts consécutifs",
      "Prévoir piscine ou plage",
      "Garder un jour flexible",
    ],
    sections: [
      {
        title: "1. L'itinéraire doit suivre l'énergie de la famille",
        body: [
          "Un programme pensé pour des adultes devient vite trop dense avec de jeunes enfants. Au Vietnam, la chaleur et les transferts augmentent la fatigue, surtout lorsque plusieurs journées longues se suivent.",
          "Une bonne base consiste à alterner une journée active avec une journée plus légère, ou à limiter chaque journée à une grande expérience complétée par du temps libre.",
        ],
      },
      {
        title: "2. Da Nang et Hoi An sont pratiques pour une famille qui veut bouger sans refaire les valises",
        body: [
          "Da Nang offre une base simple avec plage, hôtels familiaux et accès routier vers Hoi An, Ba Na Hills ou Hué. Hoi An est plus compacte et agréable pour les soirées, les balades, la cuisine et les activités douces.",
          "Selon l'âge des enfants, il peut être plus confortable de rester plusieurs nuits au même endroit et de rayonner en voiture plutôt que de changer d'hôtel à chaque étape.",
        ],
      },
      {
        title: "3. Phu Quoc fonctionne bien quand le séjour mélange repos et découverte",
        body: [
          "À Phu Quoc, les journées plage et piscine peuvent servir de respiration entre le parc safari, le sud de l'île, le téléphérique ou une sortie en mer. La zone de l'hôtel compte beaucoup car l'île est longue.",
          "Pour les plus jeunes, il faut également regarder la durée du bateau, l'exposition au soleil et la possibilité de modifier une sortie en cas de mer agitée.",
        ],
      },
      {
        title: "4. Le privé est surtout intéressant pour contrôler les horaires",
        body: [
          "Avec une voiture privée, la famille peut partir plus tard, faire une pause, rentrer plus tôt ou supprimer une étape sans attendre un groupe. C'est souvent là que la différence de prix devient réellement utile.",
          "Avant de réserver, communiquez l'âge des enfants, l'hôtel et les priorités du voyage. Cela permet d'éviter un programme trop ambitieux.",
        ],
      },
    ],
    checklist: [
      "Âge des enfants",
      "Nombre de changements d'hôtel",
      "Temps maximal de voiture par jour",
      "Activités avec bateau ou forte chaleur",
      "Journées de repos prévues",
    ],
    faqs: [
      {
        q: "Le Vietnam est-il adapté aux enfants ?",
        a: "Oui, à condition d'adapter le rythme, les transports et les heures de visite à leur âge.",
      },
      {
        q: "Da Nang ou Phu Quoc avec des enfants ?",
        a: "Da Nang convient bien aux familles qui veulent combiner plage et patrimoine. Phu Quoc est plus simple pour un séjour balnéaire avec quelques grandes activités.",
      },
      {
        q: "Faut-il tout réserver avant le départ ?",
        a: "Non. Les activités dépendantes de la météo gagnent à garder une certaine flexibilité, surtout en bord de mer.",
      },
      {
        q: "Peut-on demander un programme privé pour une famille ?",
        a: "Oui. La voiture, les arrêts et la durée peuvent être adaptés selon la prestation confirmée.",
      },
    ],
    related: ["voyage-vietnam-sur-mesure", "phu-quoc-que-faire", "centre-vietnam-da-nang-hoi-an-hue"],
    primaryHref: "/fr",
    primaryLabel: "Retour au guide Vietnam",
    image: "/hero-hoian-new.png",
    imageAlt: "Voyage au Vietnam en famille",
    updated: "2026-09-15",
  },
  {
    slug: "guide-francophone-vietnam",
    title: "Guide francophone Vietnam 2027 | Privé, local et sur demande | GoVietStay",
    h1: "Guide francophone au Vietnam : quand il apporte une vraie valeur et quand il n'est pas indispensable",
    description:
      "Comment choisir un guide francophone au Vietnam : Hué, Hoi An, Da Nang, Phu Quoc, journée privée, disponibilité et points à confirmer avant réservation.",
    keywords: [
      "guide francophone vietnam",
      "voyage vietnam avec guide francophone",
      "guide privé vietnam",
      "guide francophone da nang",
      "guide francophone hoi an",
    ],
    eyebrow: "GUIDE FRANCOPHONE · VIETNAM 2027",
    summary:
      "Un guide francophone est particulièrement utile lorsque l'histoire, la culture ou les échanges locaux font partie de l'expérience. Pour une simple journée plage ou transfert, un chauffeur peut suffire.",
    quick: [
      "Demander la langue avant de payer",
      "Préciser le type de visite",
      "Vérifier la durée et les entrées",
      "Confirmer la disponibilité à la date exacte",
    ],
    sections: [
      {
        title: "1. Hué, My Son et les visites historiques sont les meilleurs usages d'un guide",
        body: [
          "Dans les lieux où l'architecture, la religion et l'histoire expliquent ce que l'on voit, un guide francophone peut transformer une visite en véritable compréhension du site.",
          "Hué est un bon exemple : la Cité impériale, les tombeaux et les pagodes deviennent plus intéressants lorsqu'ils sont replacés dans l'histoire de la dynastie Nguyen.",
        ],
      },
      {
        title: "2. À Hoi An, le guide peut être utile mais une partie du temps libre reste importante",
        body: [
          "La vieille ville se prête à une visite guidée courte pour comprendre son passé de port marchand, puis à une exploration libre en fin d'après-midi et en soirée.",
          "Il n'est pas nécessaire de transformer chaque heure en visite commentée. Le bon équilibre laisse du temps pour les cafés, les marchés, les lanternes et la cuisine.",
        ],
      },
      {
        title: "3. À Phu Quoc, le besoin dépend davantage de l'expérience choisie",
        body: [
          "Pour un transfert ou une journée de plage, un guide francophone n'est généralement pas indispensable. Pour une journée privée mêlant village, ferme, histoire locale et plusieurs arrêts, il peut apporter davantage de contexte.",
          "Les sorties en bateau ont surtout besoin d'une organisation claire, d'un équipage fiable et d'informations précises sur les conditions de mer.",
        ],
      },
      {
        title: "4. La disponibilité d'un guide francophone doit toujours être confirmée",
        body: [
          "La demande en français existe mais l'offre de guides varie selon la ville, la saison et la date. Il vaut mieux communiquer les dates exactes et la destination avant de construire tout le programme autour d'une langue de guide.",
          "GoVietStay vérifie la disponibilité du guide demandé avant confirmation. Si le guide francophone n'est pas disponible, une autre solution peut être proposée sans la présenter comme équivalente.",
        ],
      },
    ],
    checklist: [
      "Date exacte",
      "Ville ou région",
      "Nombre de voyageurs",
      "Durée souhaitée",
      "Sites prioritaires",
    ],
    faqs: [
      {
        q: "Peut-on avoir un guide francophone à Da Nang ou Hoi An ?",
        a: "C'est possible selon la date. La disponibilité doit être vérifiée avant réservation.",
      },
      {
        q: "Un guide est-il nécessaire à Phu Quoc ?",
        a: "Pas pour toutes les activités. Il est surtout utile lorsque vous voulez du contexte culturel, historique ou une journée privée plus approfondie.",
      },
      {
        q: "Le guide et le chauffeur sont-ils la même personne ?",
        a: "Pas nécessairement. Selon le programme, ce sont souvent deux fonctions distinctes.",
      },
      {
        q: "Comment demander un guide francophone ?",
        a: "Envoyez les dates, le nombre de personnes, l'hôtel et les sites souhaités afin de vérifier la disponibilité réelle.",
      },
    ],
    related: ["voyage-vietnam-sur-mesure", "centre-vietnam-da-nang-hoi-an-hue", "da-nang-que-faire"],
    primaryHref: "/fr/voyage-vietnam-sur-mesure",
    primaryLabel: "Préparer un voyage sur mesure",
    image: "/hero-hoian-new.png",
    imageAlt: "Guide francophone au Vietnam pour circuit privé",
    updated: "2026-09-15",
  },
  {
    slug: "phu-quoc-que-faire",
    title: "Phu Quoc que faire en 2027 | Nord, sud, plages et excursions | GoVietStay",
    h1: "Que faire à Phu Quoc : choisir par zone plutôt que courir d'un bout à l'autre de l'île",
    description:
      "Que faire à Phu Quoc en 2027 : plages, nord, sud, Sunset Town, Hon Thom, snorkeling, marché de nuit et idées d'itinéraire selon la zone de votre hôtel.",
    keywords: [
      "phu quoc que faire",
      "que faire à phu quoc",
      "phu quoc activités",
      "phu quoc excursions",
      "phu quoc vietnam",
      "phu quoc plage",
    ],
    eyebrow: "PHU QUOC · QUE FAIRE · 2027",
    summary:
      "Phu Quoc est plus simple à organiser en trois zones : nord pour les grands parcs et certaines plages, centre pour Duong Dong et Long Beach, sud pour An Thoi, Hon Thom et les sorties en mer.",
    quick: [
      "Nord : Safari et Grand World",
      "Centre : Duong Dong et Long Beach",
      "Sud : Hon Thom et îles",
      "Ne pas traverser l'île plusieurs fois le même jour",
    ],
    sections: [
      {
        title: "1. Le nord convient aux journées parc, nature et grands complexes",
        body: [
          "Le nord concentre notamment VinWonders, Safari et Grand World. Pour une famille ou un voyageur qui aime les grands parcs, cette zone peut facilement occuper une journée complète.",
          "Si votre hôtel se trouve au nord, regroupez ces activités ensemble plutôt que de repartir vers le sud le même jour.",
        ],
      },
      {
        title: "2. Le centre est le plus pratique pour découvrir l'île sans spécialiser tout le séjour",
        body: [
          "Duong Dong, le marché de nuit et Long Beach offrent une base centrale pour les voyageurs qui veulent alterner plage, restaurants, petites sorties et excursions plus longues.",
          "C'est souvent un choix simple pour une première visite lorsque vous ne savez pas encore si vous passerez plus de temps au nord ou au sud.",
        ],
      },
      {
        title: "3. Le sud concentre Hon Thom, Sunset Town et de nombreuses sorties en mer",
        body: [
          "An Thoi est le point logique pour plusieurs excursions d'îles. Le téléphérique de Hon Thom et Sunset Town peuvent aussi être combinés avec une journée dans le sud selon les horaires et le produit choisi.",
          "Avant de réserver une excursion, comparez les îles réellement visitées, le temps passé dans l'eau, le type de bateau, le déjeuner, le transfert et l'éventuelle inclusion du téléphérique.",
        ],
      },
      {
        title: "4. La météo doit rester un critère de décision pour les activités en mer",
        body: [
          "Une journée bateau dépend davantage de la mer qu'une visite terrestre. Même pendant une bonne saison, les conditions peuvent changer localement et rapidement.",
          "Il est donc plus prudent de garder une deuxième date possible pour le snorkeling ou l'island hopping lorsque le séjour le permet.",
        ],
      },
    ],
    checklist: [
      "Zone de l'hôtel",
      "Activité prioritaire nord ou sud",
      "Jour possible pour la mer",
      "Temps de transfert accepté",
      "Besoin d'une journée de repos",
    ],
    faqs: [
      {
        q: "Combien de jours faut-il à Phu Quoc ?",
        a: "Trois ou quatre nuits permettent de voir plusieurs zones, mais cinq nuits ou plus rendent le séjour beaucoup plus détendu.",
      },
      {
        q: "Faut-il faire le nord et le sud le même jour ?",
        a: "Ce n'est généralement pas le meilleur usage du temps. Il est plus confortable de les séparer.",
      },
      {
        q: "Le marché de nuit vaut-il le détour ?",
        a: "Il est facile à intégrer à une soirée à Duong Dong, surtout si vous logez dans la zone centrale.",
      },
      {
        q: "Peut-on réserver une excursion privée ?",
        a: "Oui, selon le bateau, l'itinéraire et la disponibilité à la date choisie.",
      },
    ],
    related: ["phu-quoc-quand-partir", "phu-quoc-ou-loger", "phu-quoc-excursions-privees"],
    primaryHref: "/fr",
    primaryLabel: "Voir le guide Vietnam en français",
    image: "/phu-quoc/ru-cluster/hero-islands.png",
    imageAlt: "Que faire à Phu Quoc entre plages et excursions",
    updated: "2026-09-15",
  },
  {
    slug: "phu-quoc-quand-partir",
    title: "Phu Quoc quand partir en 2027 | Météo, mer et saisons | GoVietStay",
    h1: "Quand partir à Phu Quoc : choisir selon la mer, la pluie et le type de séjour",
    description:
      "Quand partir à Phu Quoc en 2027 : saison sèche, saison des pluies, snorkeling, plages, mer et conseils pour garder un itinéraire flexible.",
    keywords: [
      "phu quoc quand partir",
      "phu quoc météo",
      "phu quoc meilleure saison",
      "phu quoc saison",
      "phu quoc climat",
    ],
    eyebrow: "PHU QUOC · METEO & SAISONS · 2027",
    summary:
      "Pour la plage et les sorties en mer, la période la plus recherchée se situe généralement pendant la saison plus sèche, approximativement de novembre à avril. Mais il faut toujours vérifier les conditions réelles à l'approche de la sortie.",
    quick: [
      "Novembre à avril : période généralement plus sèche",
      "Mai à octobre : davantage de pluie et de vent",
      "La mer compte plus qu'une icône météo",
      "Prévoir une date de repli pour le bateau",
    ],
    sections: [
      {
        title: "1. La saison sèche est la plus simple pour un séjour plage",
        body: [
          "Entre novembre et avril environ, Phu Quoc connaît généralement une période plus sèche avec des conditions plus favorables aux activités extérieures et aux sorties en mer. Décembre à février sont souvent recherchés pour un séjour balnéaire.",
          "Cette période correspond aussi à une forte demande. Les meilleurs hôtels et certaines activités peuvent se remplir plus tôt.",
        ],
      },
      {
        title: "2. La saison des pluies ne signifie pas qu'il pleut toute la journée",
        body: [
          "De mai à octobre, les averses deviennent plus fréquentes et le vent peut influencer davantage la mer. Certaines journées restent agréables, mais la planification des excursions maritimes demande plus de souplesse.",
          "Un séjour axé sur le resort, le spa, les restaurants et quelques sorties terrestres reste possible, à condition d'accepter que le programme change.",
        ],
      },
      {
        title: "3. Pour le snorkeling, regardez les conditions de mer au dernier moment",
        body: [
          "Une prévision générale pour toute l'île ne suffit pas toujours à juger une sortie en bateau. La houle, le vent et la zone d'excursion comptent directement pour le confort et la sécurité.",
          "Les opérateurs sérieux confirment ou ajustent les sorties en fonction des conditions locales. Garder une date de repli réduit le risque de perdre l'activité.",
        ],
      },
      {
        title: "4. La meilleure période dépend aussi de votre priorité",
        body: [
          "Un couple venu surtout pour le resort, une famille qui veut les parcs et un voyageur centré sur le snorkeling n'ont pas besoin de la même météo parfaite.",
          "Avant de choisir le mois, définissez l'activité qui doit absolument réussir. C'est elle qui doit guider le calendrier du séjour.",
        ],
      },
    ],
    checklist: [
      "Mois du voyage",
      "Activité qui dépend de la mer",
      "Date de repli",
      "Politique météo du prestataire",
      "Zone de l'hôtel",
    ],
    faqs: [
      {
        q: "Quelle est la meilleure période pour Phu Quoc ?",
        a: "Pour la plage et les sorties en mer, la période de novembre à avril est généralement la plus simple, avec des variations selon les années.",
      },
      {
        q: "Peut-on aller à Phu Quoc en été ?",
        a: "Oui, mais il faut accepter davantage de pluie et une plus grande incertitude pour les sorties en mer.",
      },
      {
        q: "La météo peut-elle annuler une excursion ?",
        a: "Oui. Les conditions maritimes peuvent entraîner un changement, un report ou une annulation selon l'opérateur.",
      },
      {
        q: "Faut-il réserver très tôt en hiver ?",
        a: "Pour les hôtels recherchés et les dates de haute saison, réserver plus tôt peut être utile. Les activités météo-dépendantes peuvent rester plus flexibles.",
      },
    ],
    related: ["phu-quoc-que-faire", "phu-quoc-ou-loger", "phu-quoc-excursions-privees"],
    primaryHref: "/fr/phu-quoc-que-faire",
    primaryLabel: "Découvrir les activités à Phu Quoc",
    image: "/phu-quoc/ru-cluster/hero-islands.png",
    imageAlt: "Météo et meilleure période pour Phu Quoc",
    updated: "2026-09-15",
  },
  {
    slug: "phu-quoc-ou-loger",
    title: "Phu Quoc où loger en 2027 | Nord, Long Beach ou sud | GoVietStay",
    h1: "Où loger à Phu Quoc : la bonne zone dépend de ce que vous voulez faire chaque jour",
    description:
      "Où loger à Phu Quoc en 2027 : nord, Duong Dong, Long Beach ou sud de l'île selon les plages, les excursions, la famille et les temps de trajet.",
    keywords: [
      "phu quoc ou loger",
      "où dormir à phu quoc",
      "phu quoc hôtel",
      "phu quoc long beach",
      "phu quoc nord ou sud",
    ],
    eyebrow: "PHU QUOC · OU LOGER · 2027",
    summary:
      "Il n'existe pas une meilleure zone pour tout le monde. Le nord réduit les trajets vers les grands parcs, la zone centrale est polyvalente, et le sud facilite Hon Thom et plusieurs excursions maritimes.",
    quick: [
      "Nord : parcs et grands resorts",
      "Centre : choix polyvalent",
      "Long Beach : plage + accès pratique",
      "Sud : Hon Thom et An Thoi",
    ],
    sections: [
      {
        title: "1. Le nord est logique si les grands parcs sont une priorité",
        body: [
          "Autour de Ganh Dau et des grands complexes du nord, vous réduisez les trajets vers VinWonders, Safari et Grand World. C'est particulièrement pratique pour une famille qui prévoit plusieurs journées dans cette zone.",
          "En contrepartie, les déplacements vers Duong Dong ou An Thoi peuvent devenir plus longs.",
        ],
      },
      {
        title: "2. Duong Dong et Long Beach sont les options les plus polyvalentes",
        body: [
          "La zone centrale offre un accès plus équilibré au marché de nuit, aux restaurants, à l'aéroport et aux excursions vers le nord ou le sud. Pour un premier séjour sans priorité unique, c'est souvent le choix le plus simple.",
          "Long Beach combine aussi facilement temps de plage et sorties en soirée sans transformer chaque repas en transfert.",
        ],
      },
      {
        title: "3. Le sud convient aux voyageurs centrés sur Hon Thom et les îles",
        body: [
          "Autour d'An Thoi et de Sunset Town, vous êtes plus près du téléphérique et de nombreux départs pour les îles du sud. C'est cohérent pour un séjour qui met l'accent sur la mer.",
          "Si vous voulez aussi Safari ou Grand World, prévoyez une vraie journée de transfert vers le nord plutôt que de multiplier les allers-retours.",
        ],
      },
      {
        title: "4. Choisissez l'hôtel après avoir choisi vos deux activités prioritaires",
        body: [
          "Une erreur fréquente consiste à réserver un resort parce qu'il semble superbe, puis à découvrir que toutes les activités souhaitées se trouvent à l'autre bout de l'île.",
          "Notez vos deux grandes priorités, placez-les sur le nord, le centre ou le sud, puis choisissez votre zone d'hébergement. Cette méthode est plus efficace que de comparer uniquement les étoiles des hôtels.",
        ],
      },
    ],
    checklist: [
      "Deux activités prioritaires",
      "Distance de l'aéroport",
      "Besoin d'animation le soir",
      "Nombre de journées plage",
      "Temps de voiture acceptable",
    ],
    faqs: [
      {
        q: "Quelle zone est la meilleure pour une première fois à Phu Quoc ?",
        a: "La zone centrale et Long Beach sont souvent les plus polyvalentes si vous voulez explorer plusieurs parties de l'île.",
      },
      {
        q: "Où dormir avec des enfants ?",
        a: "Cela dépend des activités. Le nord est pratique pour les grands parcs, tandis que Long Beach convient bien à une famille qui veut équilibrer plage et déplacements.",
      },
      {
        q: "Faut-il changer d'hôtel entre le nord et le sud ?",
        a: "Pas forcément. Pour un séjour court, un seul hôtel bien choisi évite de perdre du temps avec les bagages.",
      },
      {
        q: "Le sud est-il trop loin de l'aéroport ?",
        a: "La durée dépend de la zone exacte. Vérifiez le temps de transfert réel avec votre hôtel avant de décider.",
      },
    ],
    related: ["phu-quoc-que-faire", "phu-quoc-quand-partir", "phu-quoc-excursions-privees"],
    primaryHref: "/fr/phu-quoc-que-faire",
    primaryLabel: "Planifier les activités de Phu Quoc",
    image: "/phu-quoc/ru-cluster/hero-islands.png",
    imageAlt: "Où loger à Phu Quoc selon la zone de l'île",
    updated: "2026-09-15",
  },
  {
    slug: "phu-quoc-excursions-privees",
    title: "Excursions privées Phu Quoc 2027 | Bateau, voiture et îles | GoVietStay",
    h1: "Excursions privées à Phu Quoc : payer pour la liberté, pas simplement pour être seuls",
    description:
      "Excursions privées à Phu Quoc en 2027 : bateau, snorkeling, voiture privée, nord, sud, Hon Thom et critères à vérifier avant de réserver.",
    keywords: [
      "phu quoc excursions",
      "excursion privée phu quoc",
      "phu quoc tour privé",
      "phu quoc snorkeling",
      "phu quoc island tour",
    ],
    eyebrow: "PHU QUOC · EXCURSIONS PRIVEES · 2027",
    summary:
      "Le privé devient intéressant quand il permet de choisir l'heure, les arrêts, le rythme ou la durée. Pour certaines sorties bateau standardisées, il faut vérifier ce qui est réellement personnalisable avant de payer plus.",
    quick: [
      "Vérifier ce qui est vraiment privé",
      "Comparer bateau, repas et transferts",
      "Confirmer la politique météo",
      "Demander les horaires réels",
    ],
    sections: [
      {
        title: "1. Une voiture privée donne surtout du contrôle sur les arrêts",
        body: [
          "Pour une journée terrestre, une voiture privée permet de combiner les lieux qui vous intéressent et de supprimer ceux qui ne correspondent pas à votre rythme. C'est particulièrement utile pour les familles et les petits groupes.",
          "Demandez toujours le nombre d'heures, la zone incluse, les éventuels frais d'attente et ce qui se passe si l'itinéraire dépasse le périmètre prévu.",
        ],
      },
      {
        title: "2. Pour un bateau privé, le mot privé ne suffit pas",
        body: [
          "Il faut vérifier le type de bateau, la capacité, l'équipage, l'itinéraire, les équipements de snorkeling, les boissons, le déjeuner et les transferts. Deux offres privées peuvent être très différentes.",
          "Demandez aussi si les arrêts sont imposés ou ajustables et si le bateau peut modifier la zone en fonction de la mer.",
        ],
      },
      {
        title: "3. Hon Thom et island hopping ne sont pas toujours la même journée idéale",
        body: [
          "Certaines formules combinent plusieurs îles avec le téléphérique de Hon Thom. Cela peut être efficace mais aussi dense. Si vous préférez nager et rester longtemps sur l'eau, séparer les expériences peut être plus agréable.",
          "Le bon choix dépend du nombre de jours disponibles, de l'âge des enfants et de votre priorité entre découverte et détente.",
        ],
      },
      {
        title: "4. La politique météo fait partie du produit",
        body: [
          "Une sortie maritime doit expliquer ce qui se passe si la mer n'est pas adaptée : modification de l'itinéraire, report, changement de zone ou annulation selon les conditions et les règles du prestataire.",
          "Avant de payer, demandez une confirmation écrite des éléments inclus et des conditions météo. Cela évite la plupart des malentendus.",
        ],
      },
    ],
    checklist: [
      "Type de bateau ou véhicule",
      "Nombre d'heures",
      "Transfert hôtel inclus ou non",
      "Repas et billets inclus",
      "Politique météo et annulation",
    ],
    faqs: [
      {
        q: "Une excursion privée vaut-elle le prix à Phu Quoc ?",
        a: "Elle peut valoir le prix si elle vous donne une vraie flexibilité d'horaire, d'itinéraire ou de rythme. Il faut vérifier ce qui est réellement personnalisable.",
      },
      {
        q: "Peut-on privatiser une sortie snorkeling ?",
        a: "Oui selon le bateau et la disponibilité, mais les zones de navigation restent soumises aux conditions de mer et aux règles locales.",
      },
      {
        q: "Le transfert depuis l'hôtel est-il toujours inclus ?",
        a: "Non. Il faut le vérifier car certaines zones peuvent entraîner un supplément.",
      },
      {
        q: "Peut-on demander une excursion en français ?",
        a: "Vous pouvez faire la demande en français. La présence d'un guide francophone doit être confirmée séparément selon la date.",
      },
    ],
    related: ["phu-quoc-que-faire", "phu-quoc-quand-partir", "phu-quoc-ou-loger"],
    primaryHref: "/fr/phu-quoc-que-faire",
    primaryLabel: "Voir le guide complet de Phu Quoc",
    image: "/phu-quoc/ru-cluster/hero-islands.png",
    imageAlt: "Excursion privée et snorkeling à Phu Quoc",
    updated: "2026-09-15",
  },
  {
    slug: "da-nang-que-faire",
    title: "Da Nang que faire en 2027 | Plage, Ba Na Hills et Hoi An | GoVietStay",
    h1: "Que faire à Da Nang : utiliser la ville comme base pour découvrir le Centre du Vietnam",
    description:
      "Que faire à Da Nang en 2027 : My Khe, Son Tra, Marble Mountains, Ba Na Hills, Hoi An, Hué et conseils d'itinéraire pour voyageurs francophones.",
    keywords: [
      "da nang que faire",
      "da nang vietnam que faire",
      "que voir à da nang",
      "da nang vietnam",
      "da nang hoi an",
      "ba na hills da nang",
    ],
    eyebrow: "DA NANG · QUE FAIRE · 2027",
    summary:
      "Da Nang vaut surtout par sa polyvalence : plage et ville sur place, Hoi An au sud, Ba Na Hills à l'ouest et Hué au nord. En choisissant les journées par direction, on évite beaucoup de route inutile.",
    quick: [
      "My Khe et Son Tra pour une journée légère",
      "Hoi An plutôt l'après-midi et le soir",
      "Ba Na Hills en journée dédiée",
      "Hué en excursion complète ou avec nuit sur place",
    ],
    sections: [
      {
        title: "1. Da Nang fonctionne très bien comme base de voyage",
        body: [
          "La ville permet de garder le même hôtel tout en découvrant plusieurs expériences très différentes. My Khe, Son Tra, les marchés et Marble Mountains se combinent facilement avec du temps libre.",
          "Pour un voyageur qui n'aime pas refaire ses valises, Da Nang est une base pratique avant de rayonner vers Hoi An, Ba Na Hills ou Hué.",
        ],
      },
      {
        title: "2. Hoi An donne le meilleur d'elle-même de l'après-midi à la soirée",
        body: [
          "Partir trop tôt peut ajouter de la chaleur sans améliorer l'expérience. Un départ plus tard permet de combiner éventuellement les environs puis d'arriver dans la vieille ville lorsque l'ambiance change avec les lanternes et le dîner.",
          "Une voiture privée facilite le retour à Da Nang sans dépendre d'un horaire de groupe.",
        ],
      },
      {
        title: "3. Ba Na Hills mérite une vraie journée si c'est une priorité",
        body: [
          "Le téléphérique, le Golden Bridge et les différentes zones du complexe prennent du temps. Le placer entre deux autres grandes visites transforme vite la journée en course.",
          "Si le site vous intéresse vraiment, donnez-lui sa propre journée et gardez la soirée plus légère.",
        ],
      },
      {
        title: "4. La saison influence fortement le choix des activités",
        body: [
          "Le Centre du Vietnam connaît une période plus pluvieuse en automne. Les journées de plage, de bateau et certaines routes peuvent alors être moins prévisibles.",
          "Un bon itinéraire garde des activités intérieures ou urbaines disponibles en plan B au lieu de verrouiller chaque journée plusieurs semaines à l'avance.",
        ],
      },
    ],
    checklist: [
      "Nombre de nuits à Da Nang",
      "Priorité plage ou patrimoine",
      "Jour prévu pour Hoi An",
      "Jour prévu pour Ba Na Hills",
      "Option de repli en cas de pluie",
    ],
    faqs: [
      {
        q: "Combien de jours rester à Da Nang ?",
        a: "Quatre ou cinq jours donnent un bon équilibre si vous voulez inclure Hoi An et une ou deux grandes excursions.",
      },
      {
        q: "Da Nang ou Hoi An pour dormir ?",
        a: "Da Nang est plus pratique comme base et pour la plage. Hoi An est plus compacte et atmosphérique le soir. Beaucoup de voyageurs combinent les deux ou choisissent selon leur rythme.",
      },
      {
        q: "Peut-on visiter Hué depuis Da Nang dans la journée ?",
        a: "Oui, mais c'est une longue journée. Une nuit à Hué peut être préférable si vous voulez visiter plus lentement.",
      },
      {
        q: "Faut-il une voiture privée ?",
        a: "Pas pour les petits trajets urbains. Elle devient particulièrement utile pour Hoi An, Hué, les familles ou une journée avec plusieurs arrêts.",
      },
    ],
    related: ["centre-vietnam-da-nang-hoi-an-hue", "guide-francophone-vietnam", "voyage-vietnam-sur-mesure"],
    primaryHref: "/fr/centre-vietnam-da-nang-hoi-an-hue",
    primaryLabel: "Voir le guide du Centre du Vietnam",
    image: "/hero-hoian-new.png",
    imageAlt: "Da Nang et Centre du Vietnam",
    updated: "2026-09-15",
  },
  {
    slug: "centre-vietnam-da-nang-hoi-an-hue",
    title: "Centre Vietnam 2027 | Da Nang, Hoi An et Hué | GoVietStay",
    h1: "Da Nang, Hoi An et Hué : trois villes proches, trois expériences à ne pas traiter comme une seule étape",
    description:
      "Guide 2027 du Centre du Vietnam en français : Da Nang, Hoi An, Hué, My Son, itinéraire, temps de route, météo et circuits privés.",
    keywords: [
      "centre vietnam",
      "da nang hoi an hue",
      "voyage centre vietnam",
      "circuit privé da nang hoi an hue",
      "hoi an que faire",
      "hue vietnam que faire",
    ],
    eyebrow: "CENTRE DU VIETNAM · 2027",
    summary:
      "Da Nang apporte la plage et la logistique, Hoi An l'atmosphère et le patrimoine marchand, Hué l'histoire impériale. Les combiner fonctionne très bien à condition de leur donner des rythmes différents.",
    quick: [
      "Da Nang : base et plage",
      "Hoi An : après-midi et soirée",
      "Hué : histoire et journée complète",
      "My Son : culture et demi-journée dédiée",
    ],
    sections: [
      {
        title: "1. Da Nang est la meilleure base logistique pour beaucoup d'itinéraires",
        body: [
          "L'aéroport, la plage et sa position entre Hoi An et Hué rendent Da Nang pratique. On peut y rester plusieurs nuits sans renoncer aux excursions du Centre.",
          "Cette organisation réduit les changements d'hôtel, mais elle n'interdit pas de passer une nuit à Hoi An ou Hué si vous voulez profiter davantage de l'ambiance du soir ou visiter plus lentement.",
        ],
      },
      {
        title: "2. Hoi An mérite du temps libre, pas seulement une visite guidée",
        body: [
          "La vieille ville est intéressante pour son histoire, mais son charme vient aussi de la marche, des cafés, de la cuisine, des lanternes et des rues en soirée.",
          "Une visite guidée courte suivie de temps libre fonctionne souvent mieux qu'un programme continu où chaque minute est organisée.",
        ],
      },
      {
        title: "3. Hué est la ville où un guide culturel apporte le plus de valeur",
        body: [
          "La Cité impériale, les tombeaux royaux et les pagodes prennent une autre dimension avec le contexte historique. Pour un voyageur francophone intéressé par l'histoire, une journée guidée peut être plus enrichissante qu'une simple succession de photos.",
          "Depuis Da Nang, la route peut être intégrée à une journée complète. Si votre programme comprend plusieurs sites de Hué, dormir sur place évite de compresser la visite.",
        ],
      },
      {
        title: "4. L'automne demande davantage de flexibilité",
        body: [
          "Le Centre du Vietnam peut connaître de fortes pluies et des épisodes météo plus difficiles à l'automne. Hoi An est notamment sensible aux montées d'eau lors de certains épisodes.",
          "Dans cette période, gardez un plan B et évitez de construire un itinéraire qui dépend chaque jour d'une activité extérieure non modifiable.",
        ],
      },
    ],
    checklist: [
      "Nombre de nuits dans le Centre",
      "Intérêt pour l'histoire",
      "Besoin de plage",
      "Tolérance aux longues journées de route",
      "Saison du voyage",
    ],
    faqs: [
      {
        q: "Combien de jours pour Da Nang, Hoi An et Hué ?",
        a: "Cinq à sept jours permettent de voir les trois zones sans courir. Un séjour plus court demande de choisir les priorités.",
      },
      {
        q: "Faut-il dormir à Hoi An ?",
        a: "Ce n'est pas obligatoire, mais une nuit permet de profiter davantage de l'ambiance du soir et du matin sans trajet retour.",
      },
      {
        q: "Hué vaut-elle une journée depuis Da Nang ?",
        a: "Oui, surtout si l'histoire vous intéresse. Pour plusieurs sites, une nuit à Hué améliore le rythme.",
      },
      {
        q: "Peut-on organiser un circuit privé entre les trois villes ?",
        a: "Oui. L'itinéraire, la voiture et le guide demandé peuvent être adaptés selon les dates et la disponibilité.",
      },
    ],
    related: ["da-nang-que-faire", "guide-francophone-vietnam", "voyage-vietnam-sur-mesure"],
    primaryHref: "/fr",
    primaryLabel: "Retour au guide Vietnam en français",
    image: "/hero-hoian-new.png",
    imageAlt: "Da Nang Hoi An Hue dans le Centre du Vietnam",
    updated: "2026-09-15",
  },
];

export function getFrenchSeoGuide(slug: string) {
  return frenchSeoGuides.find((guide) => guide.slug === slug);
}

export function getRelatedFrenchSeoGuides(guide: FrenchSeoGuide) {
  return guide.related
    .map((slug) => frenchSeoGuides.find((item) => item.slug === slug))
    .filter((item): item is FrenchSeoGuide => Boolean(item));
}
