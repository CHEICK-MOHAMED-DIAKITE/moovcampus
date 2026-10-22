/**
 * Composant LibraryUI : « Formulaire d'inscription », style « Inscription »
 * Source : https://www.libraryui.com/components/bootstrap/formulaire-d-inscription
 *
 * Adaptations MoovCampus : création réelle d'un compte de démonstration (AuthService,
 * enregistré dans le navigateur), champ campus ajouté, validation de l'e-mail,
 * boutons Google/GitHub remplacés par « Explorer la démo sans compte »,
 * redirection vers le tableau de bord, charte MoovCampus.
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data/auth.service';
import { CAMPUSES } from '../../data/mobility';

@Component({
  selector: 'ui-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly campuses = CAMPUSES;

  firstName = '';
  lastName = '';
  email = '';
  campus = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  error = '';
  success = '';

  /** Force du mot de passe */
  get passwordStrength(): { level: number; text: string; color: string } {
    const password = this.password;
    if (!password) return { level: 0, text: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { level: 1, text: 'Faible', color: '#ef4444' },
      { level: 2, text: 'Moyen', color: '#e0a100' },
      { level: 3, text: 'Bon', color: '#1f8a5b' },
      { level: 4, text: 'Excellent', color: '#156b45' }
    ];

    return levels[strength - 1] || { level: 0, text: '', color: '' };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async register(): Promise<void> {
    this.error = '';
    this.success = '';

    if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.campus || !this.password) {
      this.error = 'Remplis tous les champs pour créer ton compte.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
      this.error = 'Cette adresse e-mail n\'est pas valide.';
      return;
    }

    if (this.password.length < 8) {
      this.error = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les deux mots de passe ne correspondent pas.';
      return;
    }

    if (!this.acceptTerms) {
      this.error = 'Coche la case pour apparaître dans le classement.';
      return;
    }

    this.isLoading = true;
    try {
      await this.auth.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        campus: this.campus,
        password: this.password
      });
      this.success = 'Compte créé ! Redirection vers ton tableau de bord…';
      await this.router.navigate(['/tableau-de-bord'], { queryParams: { bienvenue: '1' } });
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'La création du compte a échoué. Réessaie.';
    } finally {
      this.isLoading = false;
    }
  }
}
