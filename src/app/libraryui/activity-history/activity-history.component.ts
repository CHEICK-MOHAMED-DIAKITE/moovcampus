/**
 * Composant LibraryUI : « Historique des activités », style « Historique »
 * Source : https://www.libraryui.com/components/bootstrap/activity-history
 *
 * Adaptations MoovCampus : les activités sont les trajets de l'étudiant
 * (types = modes de transport), métadonnées km / CO₂ évité / points,
 * bouton d'en-tête relié à la déclaration d'un trajet, « Charger plus » fonctionnel.
 * Encapsulation par défaut (au lieu de None) pour cohabiter avec Bootstrap.
 */
import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MODES, Mode, Trip, co2Saved, modeInfo, pointsFor } from '../../data/mobility';

export interface ActivityItem {
  id: string;
  type: Mode;
  title: string;
  description: string;
  timestamp: string;
  isNew?: boolean;
  metadata?: {
    location?: string;
    distance?: number;
    co2?: number;
    points?: number;
  };
}

@Component({
  selector: 'ui-activity-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-history.component.html',
  styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent {
  readonly heading = input('Historique d\'activité');
  readonly subheading = input('Consultez toutes vos actions et événements récents');
  readonly actionLabel = input('Déclarer un trajet');
  readonly trips = input<Trip[]>([]);
  readonly highlightId = input<string | null>(null);
  readonly action = output<void>();

  selectedFilter: string = 'all';
  searchQuery: string = '';
  protected readonly limit = signal(5);

  filters = [
    { value: 'all', label: 'Tous les trajets' },
    ...MODES.map(m => ({ value: m.id, label: m.label }))
  ];

  readonly activities = computed<ActivityItem[]>(() =>
    this.trips().map(t => ({
      id: t.id,
      type: t.mode,
      title: `${modeInfo(t.mode).label} : ${t.from} → ${t.to}`,
      description: this.describe(t),
      timestamp: t.date,
      isNew: t.id === this.highlightId(),
      metadata: {
        distance: t.km,
        co2: co2Saved(t),
        points: pointsFor(t)
      }
    }))
  );

  private describe(t: Trip): string {
    const saved = co2Saved(t);
    if (saved === 0) return 'Trajet enregistré.';
    const grams = Math.round(saved * 1000);
    return `${grams.toLocaleString('fr-FR')} g de CO₂ évités par rapport au même trajet en voiture.`;
  }

  getFilteredActivities(): ActivityItem[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.activities().filter(activity => {
      const matchesFilter = this.selectedFilter === 'all' || activity.type === this.selectedFilter;
      const matchesSearch = !q ||
        activity.title.toLowerCase().includes(q) ||
        activity.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }

  getVisibleActivities(): ActivityItem[] {
    return this.getFilteredActivities().slice(0, this.limit());
  }

  loadMore(): void {
    this.limit.update(n => n + 5);
  }

  getActivityIcon(type: string): string {
    return modeInfo(type as Mode).icon || 'bi-activity';
  }

  getActivityClass(type: string): string {
    const classes: { [key: string]: string } = {
      velo: 'activity--success',
      marche: 'activity--warning',
      transports: 'activity--info',
      covoiturage: 'activity--primary',
      trottinette: 'activity--neutral'
    };
    return classes[type] || '';
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours} h`;
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    return this.formatTimestamp(timestamp);
  }

  groupByDate(activities: ActivityItem[]): { date: string; items: ActivityItem[] }[] {
    const groups: { [key: string]: ActivityItem[] } = {};

    activities.forEach(activity => {
      const date = new Date(activity.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date: this.formatGroupDate(date),
      items
    }));
  }

  formatGroupDate(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Aujourd\'hui';
    if (date.toDateString() === yesterday.toDateString()) return 'Hier';
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  clearFilters(): void {
    this.selectedFilter = 'all';
    this.searchQuery = '';
  }

  trackById(_: number, item: ActivityItem): string {
    return item.id;
  }
}
