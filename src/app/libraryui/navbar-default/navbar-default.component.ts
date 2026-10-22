/**
 * Composant LibraryUI : « Navbar Menu », style « Default »
 * Source : https://www.libraryui.com/components/bootstrap/main-menu
 *
 * Adaptations MoovCampus : liens branchés sur le routeur Angular,
 * menu burger pour mobile et tablette, couleurs de la charte.
 */
import { Component, ViewEncapsulation, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavLink { label: string; path: string; icon?: string; exact?: boolean; }

@Component({
  selector: 'ui-navbar-default',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-default.component.html',
  styleUrl: './navbar-default.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarDefaultComponent {
  readonly brandName = input('MoovCampus');
  readonly userInitials = input('LK');
  readonly links = input<NavLink[]>([]);

  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
