/**
 * Composant LibraryUI : « Faq », style « Frequently Asked Questions »
 * Source : https://www.libraryui.com/components/bootstrap/faq
 *
 * Adaptations MoovCampus : questions passées en entrée, accordéon accessible
 * (bouton + aria-expanded), carte contact paramétrable, couleurs de la charte.
 */
import { Component, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-faq-minimal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-minimal.component.html',
  styleUrls: ['./faq-minimal.component.scss']
})
export class FaqMinimalComponent {
  readonly heading = input('Questions fréquentes');
  readonly questions = input<FaqItem[]>([]);
  readonly contactTitle = input('Une autre question ?');
  readonly contactText = input('');
  readonly contactLabel = input('Nous écrire');
  readonly contactHref = input('#');

  items = signal<FaqItem[]>([]);

  constructor() {
    effect(() => this.items.set(this.questions().map(q => ({ ...q }))));
  }

  toggle(index: number) {
    this.items.update(list =>
      list.map((item, i) => ({ ...item, open: i === index ? !item.open : false }))
    );
  }
}
