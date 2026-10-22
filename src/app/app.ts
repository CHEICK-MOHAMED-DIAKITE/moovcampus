import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarDefaultComponent, NavLink } from './libraryui/navbar-default/navbar-default.component';
import { FullFooter, FooterColumn, FooterLink, SocialLink } from './libraryui/full-footer/full-footer.component';

import { REPO_URL } from './data/links';
import { NewsletterService } from './data/newsletter.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarDefaultComponent, FullFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly links: NavLink[] = [
    { label: 'Accueil', path: '/', icon: 'bi-house', exact: true },
    { label: 'Tableau de bord', path: '/tableau-de-bord', icon: 'bi-speedometer2' },
    { label: 'Classement et défis', path: '/communaute', icon: 'bi-trophy' },
    { label: 'Composants', path: '/composants', icon: 'bi-puzzle' }
  ];

  protected readonly footerColumns: FooterColumn[] = [
    {
      title: 'Application',
      links: [
        { label: 'Tableau de bord', route: '/tableau-de-bord' },
        { label: 'Classement', route: '/communaute' },
        { label: 'Défis du mois', route: '/communaute', badge: '4 en cours' }
      ]
    },
    {
      title: 'Aide',
      links: [
        { label: 'Questions fréquentes', route: '/', fragment: 'faq' },
        { label: 'Calcul du CO₂', route: '/', fragment: 'faq' },
        { label: 'Données ADEME', href: 'https://impactco2.fr/outils/transport' }
      ]
    },
    {
      title: 'Projet',
      links: [
        { label: 'Composants LibraryUI', route: '/composants', badge: '11' },
        { label: 'Code source', href: REPO_URL },
        { label: 'LibraryUI', href: 'https://www.libraryui.com/accueil' }
      ]
    }
  ];

  protected readonly socials: SocialLink[] = [
    { icon: 'bi-github', href: REPO_URL, label: 'Code source sur GitHub' },
    { icon: 'bi-linkedin', href: 'https://www.linkedin.com/', label: 'LinkedIn' },
    { icon: 'bi-instagram', href: 'https://www.instagram.com/', label: 'Instagram' },
    { icon: 'bi-tiktok', href: 'https://www.tiktok.com/', label: 'TikTok' }
  ];

  private readonly newsletter = inject(NewsletterService);
  protected readonly newsletterState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  protected readonly newsletterSuccess = this.newsletter.configured
    ? 'C\'est noté ! Ton e-mail de bienvenue est en route.'
    : 'Inscription confirmée. Rendez-vous le 1er du mois !';

  async onSubscribe(email: string): Promise<void> {
    this.newsletterState.set('sending');
    try {
      await this.newsletter.subscribe(email);
      this.newsletterState.set('success');
    } catch (err) {
      console.error('Newsletter :', err);
      this.newsletterState.set('error');
    }
  }

  skipToContent(): void {
    document.getElementById('contenu')?.focus();
  }

  protected readonly bottomLinks: FooterLink[] = [
    { label: 'Composants utilisés', route: '/composants' },
    { label: 'Code source', href: REPO_URL }
  ];
}
