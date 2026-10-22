import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KpiCardsBasicComponent, KPICard } from '../../libraryui/kpi-cards-basic/kpi-cards-basic.component';
import { BarChartRepartitionComponent } from '../../libraryui/graphe-repartition/bar-chart-repartition.component';
import { ActivityHistoryComponent } from '../../libraryui/activity-history/activity-history.component';
import { Modal1Component } from '../../libraryui/modal-1/modal-1.component';
import { TripStore } from '../../data/trip.store';
import { MODES, Mode, co2Saved, formatCo2, modeInfo, pointsFor } from '../../data/mobility';
import { STUDENTS } from '../../data/community';

@Component({
  selector: 'mc-dashboard-page',
  standalone: true,
  imports: [DecimalPipe, FormsModule, KpiCardsBasicComponent, BarChartRepartitionComponent, ActivityHistoryComponent, Modal1Component],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage {
  private readonly store = inject(TripStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly modes = MODES;
  protected readonly trips = this.store.trips;

  /* ---------- Indicateurs ---------- */
  protected readonly rank = computed(() => {
    const me = this.store.totalPoints();
    return STUDENTS.filter(s => s.points > me).length + 1;
  });

  protected readonly kpis = computed<KPICard[]>(() => [
    { id: 'co2', title: 'CO₂ évité', value: this.store.totalCo2(), format: 'co2', icon: 'bi-cloud-check', iconColor: 'primary', change: { value: 12.5, type: 'increase', period: 'vs septembre' } },
    { id: 'km', title: 'Km parcourus autrement', value: this.store.totalKm(), format: 'km', icon: 'bi-signpost-split', iconColor: 'info', change: { value: 8.2, type: 'increase', period: 'vs septembre' } },
    { id: 'pts', title: 'Points', value: this.store.totalPoints(), format: 'number', icon: 'bi-trophy', iconColor: 'warning', change: { value: 15.4, type: 'increase', period: 'vs septembre' } },
    { id: 'rank', title: 'Rang au classement', value: this.rank(), format: 'rank', icon: 'bi-bar-chart-line', iconColor: 'success', change: { value: 0, type: 'neutral', period: `sur ${STUDENTS.length + 1} étudiants` } }
  ]);

  protected readonly chartData = computed(() =>
    this.store.kmByMode().map(row => ({
      ...row,
      color: MODES.find(m => m.label === row.commune)?.color
    }))
  );

  protected readonly goal = this.store.monthlyGoal;
  protected readonly goalPct = computed(() => Math.min(100, Math.round((this.store.totalCo2() / this.goal) * 100)));
  protected readonly goalLeft = computed(() => Math.max(0, this.goal - this.store.totalCo2()));
  protected readonly ringOffset = computed(() => 302 * (1 - this.goalPct() / 100));
  /** Équivalence parlante : ~25 kg de CO₂ absorbés par un arbre en un an. */
  protected readonly trees = computed(() => this.store.totalCo2() / 25);

  /* ---------- Déclaration d'un trajet ---------- */
  protected readonly formOpen = signal(false);
  protected readonly successOpen = signal(false);
  protected readonly lastTripId = signal<string | null>(null);
  protected readonly lastGain = signal({ co2: 0, points: 0, label: '' });

  protected form = { mode: 'velo' as Mode, from: '', to: 'Campus Villejuif', km: 5 };
  protected submitted = false;

  protected previewCo2(): number { return co2Saved({ mode: this.form.mode, km: Number(this.form.km) || 0 }); }
  protected previewCo2Label(): string { return formatCo2(this.previewCo2()); }
  protected previewPoints(): number { return pointsFor({ mode: this.form.mode, km: Number(this.form.km) || 0 }); }

  constructor() {
    if (this.route.snapshot.queryParamMap.get('declarer')) {
      this.openForm();
      this.router.navigate([], { queryParams: {}, replaceUrl: true });
    }
  }

  openForm(): void {
    this.submitted = false;
    this.form = { mode: 'velo', from: '', to: 'Campus Villejuif', km: 5 };
    this.formOpen.set(true);
  }

  protected isValid(): boolean {
    const km = Number(this.form.km);
    return this.form.from.trim().length > 1 && this.form.to.trim().length > 1 && km > 0 && km <= 200;
  }

  saveTrip(): void {
    this.submitted = true;
    if (!this.isValid()) return;
    const trip = this.store.addTrip({
      mode: this.form.mode,
      from: this.form.from.trim(),
      to: this.form.to.trim(),
      km: Math.round(Number(this.form.km) * 10) / 10
    });
    this.lastTripId.set(trip.id);
    this.lastGain.set({ co2: co2Saved(trip), points: pointsFor(trip), label: modeInfo(trip.mode).label.toLowerCase() });
    this.formOpen.set(false);
    this.successOpen.set(true);
  }

  successText(): string {
    const g = this.lastGain();
    return `Tu as évité ${formatCo2(g.co2)} de CO₂ et gagné ${g.points} points. Ton tableau de bord est à jour.`;
  }
}
