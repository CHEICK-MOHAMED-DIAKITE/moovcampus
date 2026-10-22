import { Component, computed, inject } from '@angular/core';
import { UserListComponent, User } from '../../libraryui/user-list/user-list.component';
import { BarChartRepartitionComponent } from '../../libraryui/graphe-repartition/bar-chart-repartition.component';
import { EventCard } from '../../libraryui/event-card/event-card.component';
import { CAMPUS_CO2, CHALLENGES, STUDENTS } from '../../data/community';
import { CAMPUSES, MODES } from '../../data/mobility';
import { TripStore } from '../../data/trip.store';
import { AuthService } from '../../data/auth.service';

@Component({
  selector: 'mc-community-page',
  standalone: true,
  imports: [UserListComponent, BarChartRepartitionComponent, EventCard],
  templateUrl: './community.page.html',
  styleUrl: './community.page.scss'
})
export class CommunityPage {
  private readonly store = inject(TripStore);
  private readonly auth = inject(AuthService);

  protected readonly campuses = CAMPUSES;
  protected readonly challenges = CHALLENGES;

  /** Les points de « Léa » viennent de son tableau de bord : déclarer un trajet fait bouger le classement. */
  protected readonly users = computed<User[]>(() => {
    const account = this.auth.user();
    const me: User = account
      ? {
          id: 'me',
          firstName: account.firstName,
          lastName: account.lastName.charAt(0).toUpperCase() + '.',
          program: 'Nouveau sur MoovCampus',
          avatar: (account.firstName.charAt(0) + account.lastName.charAt(0)).toUpperCase(),
          mode: this.favoriteMode(),
          campus: account.campus,
          status: this.store.tripCount() > 0 ? 'active' : 'pending',
          points: this.store.totalPoints(),
          co2: Math.round(this.store.totalCo2() * 10) / 10,
          isMe: true
        }
      : {
          id: 'me',
          firstName: 'Léa',
          lastName: 'Kouassi',
          program: 'Compte de démonstration',
          avatar: 'LK',
          mode: 'velo',
          campus: CAMPUSES[0],
          status: 'active',
          points: this.store.totalPoints(),
          co2: Math.round(this.store.totalCo2() * 10) / 10,
          isMe: true
        };
    return [...STUDENTS, me];
  });

  /** Mode le plus utilisé (en km) par l'utilisateur, vélo par défaut. */
  private favoriteMode() {
    const top = this.store.kmByMode()[0];
    const found = top && top.count > 0 ? MODES.find(m => m.label === top.commune) : undefined;
    return found?.id ?? 'velo';
  }

  protected readonly campusData = CAMPUS_CO2.map((c, i) => ({
    ...c,
    color: i === 0 ? '#1f8a5b' : i < 3 ? '#4aa77c' : '#8cc7a9'
  }));
}
