/**
 * Composant LibraryUI : « User List », style « list »
 * Source : https://www.libraryui.com/components/bootstrap/user-list
 *
 * Adaptations MoovCampus : la liste d'utilisateurs devient le classement des étudiants
 * (rang, mode favori, campus, points, CO₂ évité), filtres par campus et par mode,
 * pagination fonctionnelle, bouton « Encourager », colonnes masquées sur petit écran.
 * Encapsulation par défaut (au lieu de None) pour cohabiter avec Bootstrap.
 */
import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MODES, Mode, modeInfo } from '../../data/mobility';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  program: string;
  avatar: string;
  mode: Mode;
  campus: string;
  status: 'active' | 'inactive' | 'pending';
  points: number;
  co2: number;
  isMe?: boolean;
  cheered?: boolean;
}

@Component({
  selector: 'ui-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  readonly heading = input('Classement des étudiants');
  readonly subheading = input('');
  readonly campuses = input<string[]>([]);
  readonly users = input<User[]>([]);
  readonly pageSize = 8;

  searchQuery = signal('');
  selectedCampus = signal('');
  selectedMode = signal('');
  page = signal(1);
  private readonly cheered = signal<Set<string>>(new Set());

  modes = [
    { value: '', label: 'Tous les modes' },
    ...MODES.map(m => ({ value: m.id, label: m.label }))
  ];

  /** Classement global (rang calculé sur les points, avant filtres). */
  private readonly ranked = computed(() =>
    [...this.users()]
      .sort((a, b) => b.points - a.points)
      .map((u, i) => ({ ...u, rank: i + 1 }))
  );

  readonly filteredUsers = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    return this.ranked().filter(user => {
      const matchesSearch = !q ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(q) ||
        user.program.toLowerCase().includes(q);
      const matchesCampus = !this.selectedCampus() || user.campus === this.selectedCampus();
      const matchesMode = !this.selectedMode() || user.mode === this.selectedMode();
      return matchesSearch && matchesCampus && matchesMode;
    });
  });

  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize)));

  readonly pagedUsers = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredUsers().slice(start, start + this.pageSize);
  });

  readonly pages = computed(() => Array.from({ length: this.pageCount() }, (_, i) => i + 1));

  onFilterChange(): void {
    this.page.set(1);
  }

  goTo(p: number): void {
    this.page.set(Math.min(Math.max(1, p), this.pageCount()));
  }

  getModeLabel(mode: Mode): string {
    return modeInfo(mode).label;
  }

  getModeIcon(mode: Mode): string {
    return modeInfo(mode).icon;
  }

  getRoleClass(mode: Mode): string {
    return `role--${mode}`;
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      active: 'status--active',
      inactive: 'status--inactive',
      pending: 'status--pending'
    };
    return classes[status] || '';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      active: 'Actif cette semaine',
      inactive: 'En pause',
      pending: 'Nouveau'
    };
    return labels[status] || status;
  }

  isCheered(user: User): boolean {
    return this.cheered().has(user.id);
  }

  onCheer(user: User): void {
    this.cheered.update(set => {
      const next = new Set(set);
      next.has(user.id) ? next.delete(user.id) : next.add(user.id);
      return next;
    });
  }

  medal(rank: number): string | null {
    return rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : null;
  }
}
