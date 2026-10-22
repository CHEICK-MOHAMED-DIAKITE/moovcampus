import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Arrival {
  id: number;
  initials: string;
  color: string;
  name: string;
  campus: string;
  detail: string;
}

const ARRIVALS: Omit<Arrival, 'id'>[] = [
  { initials: 'AT', color: '#3fd394', name: 'Aminata', campus: 'Campus Paris-Saclay', detail: '6,4 km à vélo, +84 pts' },
  { initials: 'HL', color: '#6b9bff', name: 'Hugo', campus: 'Campus Nanterre', detail: '18 km en RER, +180 pts' },
  { initials: 'MS', color: '#b39bff', name: 'Mamadou', campus: 'Campus Créteil', detail: '12 km en covoiturage, +120 pts' },
  { initials: 'CN', color: '#ffad5c', name: 'Chloé', campus: 'Campus Villejuif', detail: '1,8 km à pied, +38 pts' },
  { initials: 'LM', color: '#3fd0c9', name: 'Lucas', campus: 'Campus Saint-Denis', detail: '4,1 km en trottinette, +41 pts' },
  { initials: 'YB', color: '#3fd394', name: 'Yanis', campus: 'Campus Villejuif', detail: '7,2 km à vélo, +92 pts' }
];

/**
 * Plan de réseau animé du hero (composant maison projeté dans le Hero v-2 LibraryUI) :
 * les campus d'Île-de-France reliés par des lignes vélo, transports, covoiturage,
 * trottinette et marche, avec un compteur de CO₂ en direct et les arrivées qui défilent.
 */
@Component({
  selector: 'mc-network-map',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './network-map.component.html',
  styleUrl: './network-map.component.scss'
})
export class NetworkMapComponent {
  protected readonly co2Today = signal(1284.6);
  protected readonly arrival = signal<Arrival>({ id: 0, ...ARRIVALS[0] });

  constructor() {
    let i = 0;
    const counter = setInterval(() => this.co2Today.update(v => v + 0.3 + Math.random() * 1.4), 1400);
    const feed = setInterval(() => {
      i = (i + 1) % ARRIVALS.length;
      this.arrival.set({ id: Date.now(), ...ARRIVALS[i] });
    }, 3600);
    inject(DestroyRef).onDestroy(() => { clearInterval(counter); clearInterval(feed); });
  }
}
