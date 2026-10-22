/**
 * Composant LibraryUI : « Footer », style « Full footer »
 * Source : https://www.libraryui.com/components/bootstrap/footer
 *
 * Adaptations MoovCampus : liens internes routés, inscription à la newsletter reliée
 * à l'envoi d'un e-mail de bienvenue (états envoi / succès / erreur au lieu d'une alerte),
 * logo et couleurs de la charte.
 */
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface FooterLink {
  label: string;
  href?: string;
  route?: string;
  fragment?: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

@Component({
  selector: 'app-full-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './full-footer.component.html',
  styleUrl: './full-footer.component.scss',
})
export class FullFooter {
  readonly brandName = input('MoovCampus');
  readonly description = input('');
  readonly socialLinks = input<SocialLink[]>([]);
  readonly columns = input<FooterColumn[]>([]);
  readonly bottomLinks = input<FooterLink[]>([]);
  readonly credit = input('');
  /** État géré par le parent : 'idle' | 'sending' | 'success' | 'error'. */
  readonly newsletterState = input<'idle' | 'sending' | 'success' | 'error'>('idle');
  readonly successMessage = input('Inscription confirmée. Rendez-vous le 1er du mois !');
  readonly subscribe = output<string>();

  newsletterEmail = '';
  protected invalid = false;

  onSubscribe(): void {
    const email = this.newsletterEmail.trim();
    this.invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (this.invalid || this.newsletterState() === 'sending') return;
    this.subscribe.emit(email);
  }
}
