/** Modèle de données MoovCampus (données fictives de démonstration). */

export type Mode = 'velo' | 'marche' | 'transports' | 'covoiturage' | 'trottinette';

export interface ModeInfo {
  id: Mode;
  label: string;
  icon: string;          // classe Bootstrap Icons
  color: string;         // couleur de la charte
  /** Émissions en kg CO₂e par km (ordre de grandeur ADEME). */
  factor: number;
}

/** Référence : voiture individuelle thermique, ~0,2 kg CO₂e/km. */
export const CAR_FACTOR = 0.2;

export const MODES: ModeInfo[] = [
  { id: 'velo', label: 'Vélo', icon: 'bi-bicycle', color: '#1f8a5b', factor: 0 },
  { id: 'marche', label: 'Marche', icon: 'bi-person-walking', color: '#e07b28', factor: 0 },
  { id: 'transports', label: 'Transports en commun', icon: 'bi-train-front', color: '#2b59c3', factor: 0.025 },
  { id: 'covoiturage', label: 'Covoiturage', icon: 'bi-car-front', color: '#7b5bd6', factor: 0.1 },
  { id: 'trottinette', label: 'Trottinette', icon: 'bi-scooter', color: '#0f9c94', factor: 0.02 }
];

export function modeInfo(id: Mode): ModeInfo {
  return MODES.find(m => m.id === id) ?? MODES[0];
}

export interface Trip {
  id: string;
  mode: Mode;
  from: string;
  to: string;
  km: number;
  date: string;          // ISO
}

export function co2Saved(trip: Pick<Trip, 'mode' | 'km'>): number {
  return Math.max(0, trip.km * (CAR_FACTOR - modeInfo(trip.mode).factor));
}

/** 10 points par km, bonus de 20 points pour les modes 100 % actifs. */
export function pointsFor(trip: Pick<Trip, 'mode' | 'km'>): number {
  const bonus = trip.mode === 'velo' || trip.mode === 'marche' ? 20 : 0;
  return Math.round(trip.km * 10) + bonus;
}

export const CAMPUSES = [
  'Campus Villejuif',
  'Campus Paris-Saclay',
  'Campus Nanterre',
  'Campus Créteil',
  'Campus Cergy',
  'Campus Saint-Denis'
];

/** « 640 g » sous le kilo, « 1,18 kg » au-delà. */
export function formatCo2(kg: number): string {
  if (kg < 1) return `${Math.round(kg * 1000)} g`;
  return `${kg.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kg`;
}
