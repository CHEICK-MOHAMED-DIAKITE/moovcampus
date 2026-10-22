/**
 * Composant LibraryUI : « Hero », style « Hero v-2 »
 * Source : https://www.libraryui.com/components/bootstrap/hero
 *
 * Adaptations MoovCampus : textes et statistiques en entrées, boutons routés,
 * écran du navigateur alimenté par projection de contenu (<ng-content>).
 */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface HeroStat { value: string; label: string; }
export interface HeroAction { label: string; icon: string; path: string; query?: Record<string, string>; }

@Component({
  selector: 'ui-hero-v2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-v2.component.html',
  styleUrl: './hero-v2.component.scss'
})
export class HeroV2Component {
  readonly badge = input('');
  readonly titleLine = input('');
  readonly titleAccent = input('');
  readonly text = input('');
  readonly primary = input<HeroAction | null>(null);
  readonly secondary = input<HeroAction | null>(null);
  readonly stats = input<HeroStat[]>([]);
  readonly screenLabel = input('Aperçu de l\'application');
}
