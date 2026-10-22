import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPO_URL } from '../../data/links';

interface UsedComponent {
  name: string;
  style: string;
  slug: string;
  folder: string;
  selector: string;
  icon: string;
  usedIn: { label: string; path: string }[];
  role: string;
}

const LIB = 'https://www.libraryui.com/components/bootstrap/';

@Component({
  selector: 'mc-components-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './components.page.html',
  styleUrl: './components.page.scss'
})
export class ComponentsPage {
  protected readonly lib = LIB;
  protected readonly repo = `${REPO_URL}/tree/main/src/app/libraryui/`;

  protected readonly items: UsedComponent[] = [
    { name: 'Navbar Menu', style: 'Default', slug: 'main-menu', folder: 'navbar-default', selector: 'ui-navbar-default', icon: 'bi-menu-button-wide', usedIn: [{ label: 'Toutes les pages', path: '/' }], role: 'Navigation principale, avec un menu burger ajouté pour le mobile.' },
    { name: 'Hero', style: 'Hero v-2', slug: 'hero', folder: 'hero-v2', selector: 'ui-hero-v2', icon: 'bi-window-desktop', usedIn: [{ label: 'Accueil', path: '/' }], role: 'Ouverture de la page d\'accueil ; l\'écran du navigateur montre un trajet animé.' },
    { name: 'Kpi Cards', style: 'Kpi basic', slug: 'kpi-card', folder: 'kpi-cards-basic', selector: 'ui-kpi-cards-basic', icon: 'bi-speedometer2', usedIn: [{ label: 'Accueil', path: '/' }, { label: 'Tableau de bord', path: '/tableau-de-bord' }], role: 'Indicateurs de CO₂, de kilomètres et de points, recalculés à chaque trajet.' },
    { name: 'Graphe repartition', style: 'Bar chart', slug: 'graphe-repartition', folder: 'graphe-repartition', selector: 'ui-bar-chart-repartition', icon: 'bi-bar-chart-line', usedIn: [{ label: 'Tableau de bord', path: '/tableau-de-bord' }, { label: 'Classement', path: '/communaute' }], role: 'Kilomètres par mode de transport et CO₂ évité par campus.' },
    { name: 'Historique des activités', style: 'Historique', slug: 'activity-history', folder: 'activity-history', selector: 'ui-activity-history', icon: 'bi-clock-history', usedIn: [{ label: 'Tableau de bord', path: '/tableau-de-bord' }], role: 'Journal des trajets, avec recherche, filtres par mode et chargement progressif.' },
    { name: 'Modal', style: 'V1', slug: 'modal', folder: 'modal-1', selector: 'app-modal-1', icon: 'bi-window-stack', usedIn: [{ label: 'Tableau de bord', path: '/tableau-de-bord' }], role: 'Formulaire de déclaration de trajet, puis message de confirmation.' },
    { name: 'User List', style: 'list', slug: 'user-list', folder: 'user-list', selector: 'ui-user-list', icon: 'bi-people', usedIn: [{ label: 'Classement', path: '/communaute' }], role: 'Classement des étudiants avec filtres par campus et par mode, et pagination.' },
    { name: 'Cards', style: 'Event card', slug: 'cards', folder: 'event-card', selector: 'app-event-card', icon: 'bi-calendar-event', usedIn: [{ label: 'Accueil', path: '/' }, { label: 'Défis', path: '/communaute' }], role: 'Cartes de défis : période, participants, points à gagner, inscription.' },
    { name: 'Faq', style: 'Frequently Asked Questions', slug: 'faq', folder: 'faq-minimal', selector: 'app-faq-minimal', icon: 'bi-question-circle', usedIn: [{ label: 'Accueil', path: '/' }], role: 'Accordéon accessible sur le calcul du CO₂, les points et les données.' },
    { name: 'Call to action', style: 'V1', slug: 'call-to-action', folder: 'call-to-action-1', selector: 'app-call-to-action-1', icon: 'bi-megaphone', usedIn: [{ label: 'Accueil', path: '/' }], role: 'Bandeau final qui renvoie vers le tableau de bord.' },
    { name: 'Footer', style: 'Full footer', slug: 'footer', folder: 'full-footer', selector: 'app-full-footer', icon: 'bi-layout-text-window-reverse', usedIn: [{ label: 'Toutes les pages', path: '/' }], role: 'Pied de page avec liens, réseaux et inscription à la newsletter.' }
  ];
}
