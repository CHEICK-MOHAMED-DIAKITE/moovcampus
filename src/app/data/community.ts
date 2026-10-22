import { User } from '../libraryui/user-list/user-list.component';
import { EventItem } from '../libraryui/event-card/event-card.component';
import { FaqItem } from '../libraryui/faq-minimal/faq-minimal.component';
import { CAMPUSES } from './mobility';

/** Étudiants fictifs du classement (l'utilisateur courant est ajouté par la page). */
export const STUDENTS: User[] = [
  { id: 's1', firstName: 'Yanis', lastName: 'Belkacem', program: 'Master Data Engineering', avatar: 'YB', mode: 'velo', campus: CAMPUSES[0], status: 'active', points: 6120, co2: 92.4 },
  { id: 's2', firstName: 'Aminata', lastName: 'Traoré', program: 'Licence Informatique', avatar: 'AT', mode: 'velo', campus: CAMPUSES[1], status: 'active', points: 5840, co2: 88.1 },
  { id: 's3', firstName: 'Hugo', lastName: 'Lefèvre', program: 'Bachelor Cybersécurité', avatar: 'HL', mode: 'transports', campus: CAMPUSES[2], status: 'active', points: 5310, co2: 74.9 },
  { id: 's4', firstName: 'Chloé', lastName: 'Nguyen', program: 'Master Business Intelligence', avatar: 'CN', mode: 'marche', campus: CAMPUSES[0], status: 'active', points: 4980, co2: 61.3 },
  { id: 's5', firstName: 'Mamadou', lastName: 'Sow', program: 'Cycle ingénieur ING2', avatar: 'MS', mode: 'covoiturage', campus: CAMPUSES[3], status: 'active', points: 4420, co2: 58.7 },
  { id: 's6', firstName: 'Inès', lastName: 'Haddad', program: 'Licence Économie', avatar: 'IH', mode: 'transports', campus: CAMPUSES[4], status: 'inactive', points: 3720, co2: 49.2 },
  { id: 's7', firstName: 'Lucas', lastName: 'Moreau', program: 'BTS SIO', avatar: 'LM', mode: 'trottinette', campus: CAMPUSES[5], status: 'active', points: 3390, co2: 43.8 },
  { id: 's8', firstName: 'Sarah', lastName: 'Benali', program: 'Master Data Science', avatar: 'SB', mode: 'velo', campus: CAMPUSES[1], status: 'pending', points: 3110, co2: 40.5 },
  { id: 's9', firstName: 'Théo', lastName: 'Garnier', program: 'Cycle ingénieur ING1', avatar: 'TG', mode: 'transports', campus: CAMPUSES[0], status: 'active', points: 2870, co2: 36.1 },
  { id: 's10', firstName: 'Fatou', lastName: 'Diallo', program: 'Licence Biologie', avatar: 'FD', mode: 'marche', campus: CAMPUSES[3], status: 'active', points: 2540, co2: 29.7 },
  { id: 's11', firstName: 'Nathan', lastName: 'Roux', program: 'DUT GEII', avatar: 'NR', mode: 'covoiturage', campus: CAMPUSES[2], status: 'inactive', points: 2210, co2: 27.4 },
  { id: 's12', firstName: 'Emma', lastName: 'Petit', program: 'Master Marketing', avatar: 'EP', mode: 'transports', campus: CAMPUSES[4], status: 'active', points: 1980, co2: 22.6 },
  { id: 's13', firstName: 'Karim', lastName: 'Ouali', program: 'Cycle ingénieur ING3', avatar: 'KO', mode: 'trottinette', campus: CAMPUSES[5], status: 'pending', points: 1460, co2: 17.9 },
  { id: 's14', firstName: 'Jade', lastName: 'Fontaine', program: 'Licence Droit', avatar: 'JF', mode: 'marche', campus: CAMPUSES[1], status: 'active', points: 1120, co2: 12.3 },
  { id: 's15', firstName: 'Ousmane', lastName: 'Keita', program: 'Bachelor Design', avatar: 'OK', mode: 'velo', campus: CAMPUSES[3], status: 'pending', points: 640, co2: 8.1 }
];

/** CO₂ évité par campus ce mois-ci, en kg. */
export const CAMPUS_CO2 = [
  { commune: CAMPUSES[0], count: 2840 },
  { commune: CAMPUSES[1], count: 2615 },
  { commune: CAMPUSES[3], count: 1980 },
  { commune: CAMPUSES[2], count: 1720 },
  { commune: CAMPUSES[5], count: 1365 },
  { commune: CAMPUSES[4], count: 1190 }
];

const av = (a: string, b: string) => `linear-gradient(135deg, ${a}, ${b})`;

export const CHALLENGES: EventItem[] = [
  {
    id: 'velotaf',
    date: '1 → 31 octobre',
    time: 'En cours, J-9',
    title: 'Défi vélotaf d\'octobre',
    location: 'Tous les campus',
    amount: '+500 pts',
    amountPositive: true,
    trendLabel: 'Participation',
    trendValue: '+18 %',
    trendDirection: 'up',
    attendees: [
      { initials: 'YB', background: av('#1f8a5b', '#0f9c94') },
      { initials: 'AT', background: av('#f2c230', '#e07b28') },
      { initials: 'CN', background: av('#7b5bd6', '#2b59c3') }
    ],
    attendeesCountLabel: '+312 étudiants',
    attendeesSuffix: 'pédalent déjà'
  },
  {
    id: 'sans-voiture',
    date: '17 → 21 novembre',
    time: 'Dans 4 semaines',
    title: 'Semaine sans voiture',
    location: 'Campus Villejuif et Campus Créteil',
    amount: '+800 pts',
    amountPositive: true,
    trendLabel: 'Objectif',
    trendValue: '5 t CO₂',
    trendDirection: 'flat',
    status: 'Inscriptions ouvertes',
    showPublish: true
  },
  {
    id: 'marche',
    date: '1 → 30 novembre',
    time: 'À partir du 1er',
    title: 'Le dernier kilomètre à pied',
    location: 'Gares et stations proches des campus',
    amount: '+300 pts',
    amountPositive: true,
    trendLabel: 'Édition 2025',
    trendValue: '1 940 km',
    trendDirection: 'up',
    attendees: [
      { initials: 'FD', background: av('#e07b28', '#d64545') },
      { initials: 'JF', background: av('#0f9c94', '#1f8a5b') }
    ],
    attendeesCountLabel: '+86 étudiants',
    attendeesSuffix: 'déjà inscrits'
  },
  {
    id: 'covoit',
    date: 'Tous les jeudis',
    time: 'Matin et soir',
    title: 'Jeudi covoit\'',
    location: 'Campus Paris-Saclay',
    amount: '+120 pts',
    amountPositive: true,
    trendLabel: 'Ce mois-ci',
    trendValue: '−6 %',
    trendDirection: 'down',
    status: 'Places disponibles'
  }
];

export const FAQ: FaqItem[] = [
  {
    question: 'Comment le CO₂ évité est-il calculé ?',
    answer: 'On compare ton trajet au même trajet fait seul en voiture thermique (environ 200 g de CO₂ par km, ordre de grandeur ADEME). La différence avec les émissions de ton mode de transport, c\'est le CO₂ que tu as évité.',
    open: true
  },
  {
    question: 'Est-ce que je dois déclarer mes trajets à la main ?',
    answer: 'Dans cette démo, oui : le bouton « Déclarer un trajet » ouvre un formulaire de trois champs. Tes indicateurs, ton graphique et ton historique se mettent à jour immédiatement.',
    open: false
  },
  {
    question: 'À quoi servent les points ?',
    answer: 'Chaque kilomètre rapporte 10 points, avec 20 points de bonus pour un trajet 100 % à vélo ou à pied. Les points comptent pour le classement des étudiants et pour celui de ton campus.',
    open: false
  },
  {
    question: 'Le covoiturage compte-t-il vraiment ?',
    answer: 'Oui. Un trajet partagé divise les émissions de la voiture par le nombre de passagers. Il rapporte donc moins que le vélo, mais bien plus que la voiture seule.',
    open: false
  },
  {
    question: 'Mes données sont-elles visibles par tout le monde ?',
    answer: 'Seuls ton prénom, l\'initiale de ton nom, ton campus et tes points apparaissent dans le classement. Le détail de tes trajets reste dans ton tableau de bord.',
    open: false
  }
];
