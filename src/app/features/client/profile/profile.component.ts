import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container-custom max-w-3xl">
        <h1 class="text-3xl font-bold text-secondary mb-2">Mon Profil</h1>
        <p class="text-secondary-gray mb-8">Complétez vos informations pour une meilleure expérience</p>

        <!-- Profile Header -->
        <div class="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg p-8 mb-8 text-white">
          <div class="flex items-center gap-6">
            <div class="relative">
              <div class="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                {{ formData.firstName.charAt(0) || '?' }}{{ formData.lastName.charAt(0) || '' }}
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-bold">{{ fullName || 'Client SEFAIZO' }}</h2>
              <p class="text-white/80">{{ formData.phone }}</p>
              @if (profileComplete) {
                <span class="inline-flex items-center gap-1 mt-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Profil complet
                </span>
              } @else {
                <span class="inline-flex items-center gap-1 mt-2 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  Profil incomplet
                </span>
              }
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <form (ngSubmit)="saveProfile()" class="space-y-6">
            <!-- Personal Info -->
            <div>
              <h3 class="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Informations personnelles
              </h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Prénom *</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.firstName"
                    name="firstName"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Votre prénom">
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Nom *</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.lastName"
                    name="lastName"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Votre nom">
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Date de naissance</label>
                  <input
                    type="date"
                    [(ngModel)]="formData.birthDate"
                    name="birthDate"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Genre</label>
                  <select
                    [(ngModel)]="formData.gender"
                    name="gender"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white">
                    <option value="">Sélectionnez</option>
                    <option value="F">Femme</option>
                    <option value="M">Homme</option>
                    <option value="A">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div>
              <h3 class="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Coordonnées
              </h3>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Téléphone</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-gray font-medium">🇨🇮 +225</span>
                    <input
                      type="tel"
                      [(ngModel)]="formData.phone"
                      name="phone"
                      placeholder="XX XX XX XX XX"
                      class="w-full border border-gray-300 rounded-lg pl-24 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Adresse e-mail</label>
                  <input
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    placeholder="votre@email.com"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                </div>
              </div>
            </div>

            <!-- Address -->
            <div>
              <h3 class="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Adresse
              </h3>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Adresse</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.address"
                    name="address"
                    placeholder="Votre adresse complète"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">Commune</label>
                    <select
                      [(ngModel)]="formData.commune"
                      name="commune"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white">
                      <option value="">Sélectionnez une commune</option>
                      <option value="Cocody">Cocody</option>
                      <option value="Plateau">Plateau</option>
                      <option value="Yopougon">Yopougon</option>
                      <option value="Marcory">Marcory</option>
                      <option value="Treichville">Treichville</option>
                      <option value="Adjamé">Adjamé</option>
                      <option value="Abobo">Abobo</option>
                      <option value="Port-Bouët">Port-Bouët</option>
                      <option value="Attécoubé">Attécoubé</option>
                      <option value="Koumassi">Koumassi</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">Ville</label>
                    <input
                      type="text"
                      [(ngModel)]="formData.city"
                      name="city"
                      placeholder="Abidjan"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                  </div>
                </div>
              </div>
            </div>

            <!-- Change PIN -->
            <div>
              <h3 class="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Sécurité
              </h3>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Modifier le code PIN</label>
                  <input
                    type="password"
                    [(ngModel)]="formData.newPin"
                    name="newPin"
                    maxlength="4"
                    inputmode="numeric"
                    placeholder="Nouveau code à 4 chiffres"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center text-lg tracking-widest">
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Confirmer le PIN</label>
                  <input
                    type="password"
                    [(ngModel)]="formData.confirmPin"
                    name="confirmPin"
                    maxlength="4"
                    inputmode="numeric"
                    placeholder="Confirmez le PIN"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center text-lg tracking-widest">
                </div>
              </div>
            </div>

            <!-- Submit -->
            <div class="flex justify-end gap-4 pt-6 border-t">
              <button type="button" (click)="resetForm()" class="px-6 py-3 text-secondary font-medium hover:bg-gray-100 rounded-lg transition-colors">
                Annuler
              </button>
              <button type="submit" class="btn-primary">
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientProfileComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    commune: '',
    city: 'Abidjan',
    newPin: '',
    confirmPin: ''
  };

  profileComplete = false;
  private _user: User | null = null;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.user();
    if (user) {
      this._user = user;
      this.formData.firstName = user.firstName || '';
      this.formData.lastName = user.lastName || '';
      this.formData.email = user.email || '';
      this.formData.phone = user.phone || '';

      // Check if profile is complete
      this.profileComplete = !!(this.formData.firstName && this.formData.lastName && this.formData.email);
    }
  }

  get fullName(): string {
    const user = this.authService.user();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  saveProfile(): void {
    // Validate PIN if changing
    if (this.formData.newPin || this.formData.confirmPin) {
      if (this.formData.newPin !== this.formData.confirmPin) {
        this.toast.error('Les codes PIN ne correspondent pas');
        return;
      }
      if (this.formData.newPin.length !== 4) {
        this.toast.error('Le code PIN doit contenir exactement 4 chiffres');
        return;
      }
      // Store updated PIN
      const cleanPhone = this.formData.phone.replace(/\s/g, '');
      const stored = localStorage.getItem('client_phone_' + cleanPhone);
      if (stored) {
        const data = JSON.parse(stored);
        data.pin = this.formData.newPin;
        localStorage.setItem('client_phone_' + cleanPhone, JSON.stringify(data));
      }
    }

    // Check required fields
    if (!this.formData.firstName || !this.formData.lastName) {
      this.toast.error('Le prénom et le nom sont obligatoires');
      return;
    }

    this.toast.success('Profil mis à jour avec succès !');
    this.profileComplete = true;
    this.formData.newPin = '';
    this.formData.confirmPin = '';
  }

  resetForm(): void {
    const user = this.authService.user();
    if (user) {
      this.formData.firstName = user.firstName || '';
      this.formData.lastName = user.lastName || '';
      this.formData.email = user.email || '';
      this.formData.phone = user.phone || '';
    }
    this.toast.info('Modifications annulées');
  }
}
