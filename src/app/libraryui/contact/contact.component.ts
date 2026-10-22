/**
 * Composant LibraryUI : « Contactez-nous », style « Contact us »
 * Source : https://www.libraryui.com/components/bootstrap/contactez-nous
 * (classe d'origine : ContactMavix, sélecteur app-contact-mavix)
 *
 * Adaptations MoovCampus : envoi réel du message par e-mail (EmailJS), champ téléphone
 * remplacé par un sujet, validation de l'e-mail, états envoi / succès / erreur,
 * champ piège anti-spam, textes en français et couleurs de la charte.
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../data/newsletter.service';
import { AuthService } from '../../data/auth.service';

@Component({
  selector: 'app-contact-mavix',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactMavix {
  private readonly mail = inject(NewsletterService);
  private readonly auth = inject(AuthService);

  readonly active = this.mail.contactConfigured;

  readonly subjects = ['Une question sur l\'application', 'Une idée de défi', 'Inscrire mon école ou mon campus', 'Signaler un problème', 'Autre'];

  firstName = this.auth.user()?.firstName ?? '';
  lastName = this.auth.user()?.lastName ?? '';
  email = this.auth.user()?.email ?? '';
  subject = this.subjects[0];
  message = '';
  website = ''; // champ piège : invisible pour les humains
  sent = false;
  sending = false;
  error = '';
  touched = false;

  get emailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }

  get canSend(): boolean {
    return this.active && !!this.firstName.trim() && this.emailValid && this.message.trim().length >= 10 && !this.sending;
  }

  async send() {
    this.touched = true;
    this.error = '';
    if (!this.canSend) return;
    if (this.website) { this.sent = true; return; } // robot : on fait comme si
    this.sending = true;
    try {
      await this.mail.sendContact({
        fromName: `${this.firstName.trim()} ${this.lastName.trim()}`.trim(),
        replyTo: this.email.trim(),
        subject: this.subject,
        message: this.message.trim()
      });
      this.sent = true;
    } catch {
      this.error = 'Le message n\'est pas parti. Vérifie ta connexion et réessaie dans un instant.';
    } finally {
      this.sending = false;
    }
  }

  reset() {
    this.message = '';
    this.subject = this.subjects[0];
    this.sent = false;
    this.touched = false;
    this.error = '';
  }
}
