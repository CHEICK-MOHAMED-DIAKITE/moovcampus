/**
 * Composant LibraryUI : « Call to action », style « V1 »
 * Source : https://www.libraryui.com/components/bootstrap/call-to-action
 *
 * Adaptations MoovCampus : textes et boutons en entrée, liens routés, motif « ligne de trajet ».
 */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CtaAction { label: string; path: string; query?: Record<string, string>; }

@Component({
  selector: 'app-call-to-action-1',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './call-to-action-1.component.html',
  styleUrl: './call-to-action-1.component.scss'
})
export class CallToAction1 {
  readonly title = input('');
  readonly text = input('');
  readonly primary = input<CtaAction | null>(null);
  readonly secondary = input<CtaAction | null>(null);
}
