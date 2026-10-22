/**
 * Composant LibraryUI : « Formulaire de connexion », style « Connexion »
 * Source : https://www.libraryui.com/components/bootstrap/formulaire-de-connexion
 *
 * Adaptations MoovCampus : connexion réelle aux comptes de démonstration (AuthService),
 * « Se souvenir de moi » fonctionnel (session persistante ou non), message d'aide
 * pour le mot de passe oublié, boutons Google/GitHub remplacés par l'accès à la démo,
 * charte MoovCampus.
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data/auth.service';

@Component({
  selector: 'ui-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;
  isLoading = false;
  error = '';
  info = '';

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(): void {
    this.error = '';
    this.info = 'Dans cette démo, les comptes restent dans ton navigateur : le mot de passe ne peut pas être réinitialisé. Crée un nouveau compte si besoin.';
  }

  async login(): Promise<void> {
    this.info = '';
    if (!this.email || !this.password) {
      this.error = 'Remplis ton adresse e-mail et ton mot de passe.';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      const user = await this.auth.login(this.email, this.password, this.rememberMe);
      await this.router.navigate(['/tableau-de-bord'], { queryParams: { retour: user.firstName } });
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'La connexion a échoué. Réessaie.';
    } finally {
      this.isLoading = false;
    }
  }
}
