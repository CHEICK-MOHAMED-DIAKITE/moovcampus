/**
 * Composant LibraryUI : « Footer », style « Full footer »
 * Source : https://www.libraryui.com/components/bootstrap/footer
 *
 * Adaptations MoovCampus : liens internes routés, message de confirmation
 * d'inscription à la newsletter (au lieu d'une alerte), logo et couleurs de la charte.
 */
import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
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

  newsletterEmail = '';
  protected readonly subscribed = signal(false);

  onSubscribe(): void {
    if (this.newsletterEmail && /.+@.+\..+/.test(this.newsletterEmail)) {
      this.subscribed.set(true);
      this.newsletterEmail = '';
    }
  }
}
