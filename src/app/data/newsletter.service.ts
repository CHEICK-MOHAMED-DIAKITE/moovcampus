import { Injectable } from '@angular/core';

/**
 * Configuration EmailJS (https://www.emailjs.com).
 * Ces valeurs sont publiques par conception : la clé publique est limitée
 * au domaine du site dans les réglages de sécurité EmailJS.
 */
export const NEWSLETTER_CONFIG = {
  serviceId: 'service_6l14xfw',
  templateId: '',
  publicKey: '5dlB476HRKu4raHwa'
};

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  get configured(): boolean {
    const c = NEWSLETTER_CONFIG;
    return !!(c.serviceId && c.templateId && c.publicKey);
  }

  /** Envoie l'e-mail de bienvenue. Sans configuration, l'inscription reste une simulation. */
  async subscribe(email: string): Promise<void> {
    if (!this.configured) return;
    const emailjs = (await import('@emailjs/browser')).default;
    await emailjs.send(
      NEWSLETTER_CONFIG.serviceId,
      NEWSLETTER_CONFIG.templateId,
      { to_email: email },
      { publicKey: NEWSLETTER_CONFIG.publicKey }
    );
  }
}
