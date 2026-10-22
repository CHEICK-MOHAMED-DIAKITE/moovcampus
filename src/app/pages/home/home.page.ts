import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroV2Component, HeroStat } from '../../libraryui/hero-v2/hero-v2.component';
import { KpiCardsBasicComponent, KPICard } from '../../libraryui/kpi-cards-basic/kpi-cards-basic.component';
import { EventCard } from '../../libraryui/event-card/event-card.component';
import { FaqMinimalComponent } from '../../libraryui/faq-minimal/faq-minimal.component';
import { CallToAction1 } from '../../libraryui/call-to-action-1/call-to-action-1.component';
import { RoutePreviewComponent } from '../../shared/route-preview.component';
import { CHALLENGES, FAQ } from '../../data/community';

@Component({
  selector: 'mc-home-page',
  standalone: true,
  imports: [RouterLink, HeroV2Component, KpiCardsBasicComponent, EventCard, FaqMinimalComponent, CallToAction1, RoutePreviewComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  protected readonly heroStats: HeroStat[] = [
    { value: '12 480', label: 'étudiants inscrits' },
    { value: '186 t', label: 'de CO₂ évitées' },
    { value: '38', label: 'campus en lice' }
  ];

  protected readonly impact: KPICard[] = [
    { id: 'co2', title: 'CO₂ évité en octobre', value: 11710, format: 'co2', icon: 'bi-cloud-check', iconColor: 'primary', change: { value: 14.2, type: 'increase', period: 'vs septembre' } },
    { id: 'km', title: 'Km parcourus autrement', value: 84250, format: 'km', icon: 'bi-signpost-split', iconColor: 'info', change: { value: 9.6, type: 'increase', period: 'vs septembre' } },
    { id: 'velo', title: 'Trajets à vélo', value: 9420, format: 'number', icon: 'bi-bicycle', iconColor: 'success', change: { value: 21.3, type: 'increase', period: 'vs septembre' } },
    { id: 'car', title: 'Trajets solo en voiture', value: 1180, format: 'number', icon: 'bi-car-front', iconColor: 'warning', change: { value: -12.4, type: 'decrease', period: 'vs septembre' } }
  ];

  protected readonly steps = [
    { icon: 'bi-geo-alt', title: 'Déclare ton trajet', text: 'Mode, départ, arrivée, distance. Trois champs, dix secondes.' },
    { icon: 'bi-cloud-check', title: 'Vois ce que tu évites', text: 'Le CO₂ économisé par rapport à la voiture s\'affiche tout de suite.' },
    { icon: 'bi-trophy', title: 'Fais grimper ton campus', text: 'Tes points comptent pour toi et pour le classement de ton campus.' }
  ];

  protected readonly challenges = CHALLENGES.slice(0, 2);
  protected readonly faq = FAQ;
}
