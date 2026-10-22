/**
 * Composant LibraryUI : « Graphe repartition », style « Bar chart »
 * Source : https://www.libraryui.com/components/bootstrap/graphe-repartition
 * (classe d'origine : CommuneFailureChart, sélecteur app-commune-failure-chart)
 *
 * Adaptations MoovCampus : unité affichée, couleur par barre, échelle calculée
 * automatiquement si elle n'est pas fournie. Les classes CSS d'origine sont conservées.
 */
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface CommuneFailure {
  readonly commune: string;
  readonly count: number;
  readonly color?: string;
}

const DEFAULT_DATA: readonly CommuneFailure[] = [];

@Component({
  selector: 'ui-bar-chart-repartition',
  templateUrl: './bar-chart-repartition.component.html',
  styleUrl: './bar-chart-repartition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartRepartitionComponent {
  readonly title = input('Répartition');
  readonly subtitle = input('');
  readonly unit = input('');
  readonly data = input<readonly CommuneFailure[]>(DEFAULT_DATA);
  readonly maxScale = input<number | null>(null);

  protected readonly scale = computed(() => {
    const explicit = this.maxScale();
    if (explicit) return explicit;
    const max = Math.max(1, ...this.data().map(d => d.count));
    return max * 1.1;
  });

  protected readonly rows = computed(() =>
    this.data().map((item) => ({
      ...item,
      percentage: Math.min(100, Math.round((item.count / this.scale()) * 1000) / 10)
    }))
  );

  protected format(n: number): string {
    return new Intl.NumberFormat('fr-FR').format(n);
  }
}
