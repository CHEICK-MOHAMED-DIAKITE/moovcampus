/**
 * Composant LibraryUI : « Kpi Cards », style « Kpi basic »
 * Source : https://www.libraryui.com/components/bootstrap/kpi-card
 *
 * Adaptations MoovCampus : indicateurs passés en entrée, format « kg CO₂ » et « km »
 * ajoutés, titre et sous-titre optionnels.
 */
import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KPICard {
  id: string;
  title: string;
  value: number | string;
  change?: { value: number; type: 'increase' | 'decrease' | 'neutral'; period: string };
  icon?: string;
  iconColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  format?: 'number' | 'currency' | 'percentage' | 'duration' | 'km' | 'co2' | 'rank';
}

@Component({
  selector: 'ui-kpi-cards-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-cards-basic.component.html',
  styleUrl: './kpi-cards-basic.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class KpiCardsBasicComponent {
  readonly pageTitle = input('');
  readonly pageSubtitle = input('');
  readonly basicKPIs = input<KPICard[]>([]);

  formatValue(kpi: KPICard): string {
    if (typeof kpi.value === 'string') return kpi.value;
    const nf = (max = 0) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: max });
    switch (kpi.format) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(kpi.value);
      case 'percentage':
        return `${kpi.value}%`;
      case 'km':
        return `${nf(kpi.value < 100 ? 1 : 0).format(kpi.value)} km`;
      case 'co2':
        return kpi.value >= 1000
          ? `${nf(1).format(kpi.value / 1000)} t`
          : `${nf(1).format(kpi.value)} kg`;
      case 'rank':
        return `${kpi.value}ᵉ`;
      default:
        return nf().format(kpi.value);
    }
  }

  getChangeClass(type: string): string {
    return `change--${type}`;
  }

  getChangeIcon(type: string): string {
    if (type === 'increase') return 'bi-arrow-up-short';
    if (type === 'decrease') return 'bi-arrow-down-short';
    return 'bi-dash';
  }
}
