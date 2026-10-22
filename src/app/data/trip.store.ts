import { Injectable, computed, signal } from '@angular/core';
import { MODES, Mode, Trip, co2Saved, pointsFor } from './mobility';

const HOUR = 3_600_000;

/** Trajets de démonstration, datés par rapport à maintenant pour que l'historique reste vivant. */
function seedTrips(): Trip[] {
  const now = Date.now();
  const at = (hoursAgo: number) => new Date(now - hoursAgo * HOUR).toISOString();
  return [
    { id: 't1', mode: 'velo', from: 'Ivry-sur-Seine', to: 'Campus Villejuif', km: 5.9, date: at(3) },
    { id: 't2', mode: 'transports', from: 'Campus Villejuif', to: 'Ivry-sur-Seine', km: 6.8, date: at(26) },
    { id: 't3', mode: 'transports', from: 'Ivry-sur-Seine', to: 'Campus Villejuif', km: 6.8, date: at(34) },
    { id: 't4', mode: 'marche', from: 'Gare RER', to: 'Campus Villejuif', km: 1.6, date: at(50) },
    { id: 't5', mode: 'covoiturage', from: 'Vitry-sur-Seine', to: 'Campus Villejuif', km: 9.5, date: at(74) },
    { id: 't6', mode: 'trottinette', from: 'Campus Villejuif', to: 'Bibliothèque François-Mitterrand', km: 5.2, date: at(98) },
    { id: 't7', mode: 'velo', from: 'Ivry-sur-Seine', to: 'Campus Villejuif', km: 5.9, date: at(122) },
    { id: 't8', mode: 'transports', from: 'Campus Villejuif', to: 'Ivry-sur-Seine', km: 6.8, date: at(146) }
  ];
}

@Injectable({ providedIn: 'root' })
export class TripStore {
  private readonly _trips = signal<Trip[]>(seedTrips());

  /** Trajets du plus récent au plus ancien. */
  readonly trips = computed(() =>
    [...this._trips()].sort((a, b) => b.date.localeCompare(a.date))
  );

  /** Kilomètres faits avant la période affichée (pour des totaux crédibles). */
  private readonly baseline = { km: 312, co2: 48.6, points: 3460 };

  readonly totalKm = computed(() =>
    this.baseline.km + this._trips().reduce((s, t) => s + t.km, 0)
  );
  readonly totalCo2 = computed(() =>
    this.baseline.co2 + this._trips().reduce((s, t) => s + co2Saved(t), 0)
  );
  readonly totalPoints = computed(() =>
    this.baseline.points + this._trips().reduce((s, t) => s + pointsFor(t), 0)
  );
  readonly tripCount = computed(() => 41 + this._trips().length);

  /** Km par mode sur la période (données du graphique de répartition). */
  readonly kmByMode = computed(() => {
    const base: Record<Mode, number> = { velo: 64, marche: 18, transports: 196, covoiturage: 22, trottinette: 12 };
    for (const t of this._trips()) base[t.mode] += t.km;
    return MODES
      .map(m => ({ commune: m.label, count: Math.round(base[m.id]) }))
      .sort((a, b) => b.count - a.count);
  });

  /** Objectif mensuel de CO₂ évité, en kg. */
  readonly monthlyGoal = 80;

  addTrip(trip: Omit<Trip, 'id' | 'date'>): Trip {
    const created: Trip = { ...trip, id: crypto.randomUUID(), date: new Date().toISOString() };
    this._trips.update(list => [created, ...list]);
    return created;
  }
}
