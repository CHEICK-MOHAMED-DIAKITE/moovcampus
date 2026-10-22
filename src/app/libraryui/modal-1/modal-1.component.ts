/**
 * Composant LibraryUI : « Modal », style « V1 »
 * Source : https://www.libraryui.com/components/bootstrap/modal
 *
 * Adaptations MoovCampus : ouverture pilotée par le parent, contenu projeté
 * (formulaire de déclaration de trajet), fermeture avec Échap, rôle « dialog ».
 */
import { Component, HostListener, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

let nextId = 0;

@Component({
  selector: 'app-modal-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-1.component.html',
  styleUrls: ['./modal-1.component.scss']
})
export class Modal1Component {
  readonly open = input(false);
  readonly icon = input('bi-check-circle-fill');
  readonly tone = input<'success' | 'brand'>('success');
  readonly title = input('');
  readonly text = input('');
  readonly cancelLabel = input('Fermer');
  readonly confirmLabel = input('Continuer');
  readonly showButtons = input(true);
  readonly wide = input(false);

  readonly closed = output<void>();
  readonly confirmed = output<void>();

  protected readonly titleId = `modal1-title-${nextId++}`;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
