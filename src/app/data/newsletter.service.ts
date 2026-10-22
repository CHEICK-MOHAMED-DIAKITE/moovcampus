import { Injectable } from '@angular/core';

/**
 * Configuration EmailJS (https://www.emailjs.com).
 * Ces valeurs sont publiques par conception : la clé publique est limitée
 * au domaine du site dans les réglages de sécurité EmailJS.
 */
export const NEWSLETTER_CONFIG = {
  serviceId: 'service_6l14xfw',
  templateId: 'template_i5ekfrg',
  /** Modèle des messages envoyés depuis le formulaire de contact. */
  contactTemplateId: 'template_m2w3h62',
  publicKey: '5dlB476HRKu4raHwa'
};

export interface ContactMessage {
  fromName: string;
  replyTo: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  get configured(): boolean {
    const c = NEWSLETTER_CONFIG;
    return !!(c.serviceId && c.templateId && c.publicKey);
  }

  get contactConfigured(): boolean {
    const c = NEWSLETTER_CONFIG;
    return !!(c.serviceId && c.contactTemplateId && c.publicKey);
  }

  /** Transmet un message du formulaire de contact à l'équipe. */
  async sendContact(msg: ContactMessage): Promise<void> {
    if (!this.contactConfigured) throw new Error('Formulaire de contact non configuré');
    const emailjs = (await import('@emailjs/browser')).default;
    await emailjs.send(
      NEWSLETTER_CONFIG.serviceId,
      NEWSLETTER_CONFIG.contactTemplateId,
      { from_name: msg.fromName, reply_to: msg.replyTo, subject: msg.subject, message: msg.message },
      { publicKey: NEWSLETTER_CONFIG.publicKey }
    );
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
