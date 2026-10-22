import { Component, computed, inject } from '@angular/core';
import { UserListComponent, User } from '../../libraryui/user-list/user-list.component';
import { BarChartRepartitionComponent } from '../../libraryui/graphe-repartition/bar-chart-repartition.component';
import { EventCard } from '../../libraryui/event-card/event-card.component';
import { CAMPUS_CO2, CHALLENGES, STUDENTS } from '../../data/community';
import { CAMPUSES } from '../../data/mobility';
import { TripStore } from '../../data/trip.store';

@Component({
  selector: 'mc-community-page',
  standalone: true,
  imports: [UserListComponent, BarChartRepartitionComponent, EventCard],
  templateUrl: './community.page.html',
  styleUrl: './community.page.scss'
})
export class CommunityPage {
  private readonly store = inject(TripStore);

  protected readonly campuses = CAMPUSES;
  protected readonly challenges = CHALLENGES;

  /** Les points de « Léa » viennent de son tableau de bord : déclarer un trajet fait bouger le classement. */
  protected readonly users = computed<User[]>(() => [
    ...STUDENTS,
    {
      id: 'me',
      firstName: 'Léa',
      lastName: 'Kouassi',
      program: 'Cycle ingénieur ING2',
      avatar: 'LK',
      mode: 'velo',
      campus: CAMPUSES[0],
      status: 'active',
      points: this.store.totalPoints(),
      co2: Math.round(this.store.totalCo2() * 10) / 10,
      isMe: true
    }
  ]);

  protected readonly campusData = CAMPUS_CO2.map((c, i) => ({
    ...c,
    color: i === 0 ? '#1f8a5b' : i < 3 ? '#4aa77c' : '#8cc7a9'
  }));
}
