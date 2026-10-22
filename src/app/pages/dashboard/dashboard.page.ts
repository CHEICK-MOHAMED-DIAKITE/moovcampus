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
import { AuthService } from '../../data/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-dashboard-page',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink, KpiCardsBasicComponent, BarChartRepartitionComponent, ActivityHistoryComponent, Modal1Component],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage {
  private readonly store = inject(TripStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  protected readonly isDemo = this.store.isDemo;
  protected readonly firstName = computed(() => this.auth.user()?.firstName ?? 'Léa');
  protected readonly welcome = signal(false);
  protected readonly campus = computed(() => this.auth.user()?.campus ?? 'Campus Villejuif');
  protected readonly tripCount = this.store.tripCount;
  protected readonly co2Label = computed(() => formatCo2(this.store.totalCo2()));
  protected readonly memberSince = computed(() => {
    const d = this.auth.user()?.createdAt;
    return d ? new Date(d).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '';
  });

  /** Nombre de jours consécutifs (jusqu'à aujourd'hui ou hier) avec au moins un trajet. */
  protected readonly streak = computed(() => {
    const days = new Set(this.store.trips().map(t => new Date(t.date).toDateString()));
    const cursor = new Date();
    if (!days.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
    let n = 0;
    while (days.has(cursor.toDateString())) { n++; cursor.setDate(cursor.getDate() - 1); }
    return n;
  });

  protected readonly modes = MODES;
  protected readonly trips = this.store.trips;

  /* ---------- Indicateurs ---------- */
  protected readonly rank = computed(() => {
    const me = this.store.totalPoints();
    return STUDENTS.filter(s => s.points > me).length + 1;
  });

  protected readonly kpis = computed<KPICard[]>(() => {
    const demo = this.isDemo();
    const change = (v: number, label: string) => demo
      ? { value: v, type: 'increase' as const, period: 'vs septembre' }
      : { value: 0, type: 'neutral' as const, period: label };
    const n = this.store.tripCount();
    return [
    { id: 'co2', title: 'CO₂ évité', value: this.store.totalCo2(), format: 'co2', icon: 'bi-cloud-check', iconColor: 'primary', change: change(12.5, `objectif : ${this.goal} kg`) },
    { id: 'km', title: 'Km parcourus autrement', value: this.store.totalKm(), format: 'km', icon: 'bi-signpost-split', iconColor: 'info', change: change(8.2, 'depuis ton inscription') },
    { id: 'pts', title: 'Points', value: this.store.totalPoints(), format: 'number', icon: 'bi-trophy', iconColor: 'warning', change: change(15.4, `${n} trajet${n > 1 ? 's' : ''} déclaré${n > 1 ? 's' : ''}`) },
    { id: 'rank', title: 'Rang au classement', value: this.rank(), format: 'rank', icon: 'bi-bar-chart-line', iconColor: 'success', change: { value: 0, type: 'neutral', period: `sur ${STUDENTS.length + 1} étudiants` } }
    ];
  });

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
    const params = this.route.snapshot.queryParamMap;
    if (params.get('bienvenue')) this.welcome.set(true);
    if (params.get('declarer')) this.openForm();
    if (params.keys.length) this.router.navigate([], { queryParams: {}, replaceUrl: true });
  }

  openForm(): void {
    this.submitted = false;
    this.form = { mode: 'velo', from: '', to: this.auth.user()?.campus ?? 'Campus Villejuif', km: 5 };
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
