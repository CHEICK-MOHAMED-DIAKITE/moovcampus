/**
 * Composant LibraryUI : « Navbar Menu », style « Default »
 * Source : https://www.libraryui.com/components/bootstrap/main-menu
 *
 * Adaptations MoovCampus : liens branchés sur le routeur Angular,
 * menu burger pour mobile et tablette, boutons de connexion / inscription
 * ou avatar + déconnexion selon l'état du compte, couleurs de la charte.
 */
import { Component, ViewEncapsulation, input, output, signal } from '@angular/core';
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
  /** Initiales de l'utilisateur connecté, ou null pour un visiteur. */
  readonly userInitials = input<string | null>(null);
  readonly userName = input('');
  readonly links = input<NavLink[]>([]);
  readonly logout = output<void>();

  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onLogout(): void {
    this.closeMenu();
    this.logout.emit();
  }
}
