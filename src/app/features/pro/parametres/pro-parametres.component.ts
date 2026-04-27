import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-secondary">Paramètres</h1>
        <p class="text-secondary-gray mt-1">Gérez votre compte et vos préférences</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        @for (tab of tabs; track tab.id) {
          <button
            (click)="activeTab.set(tab.id)"
            [class]="activeTab() === tab.id ? 'bg-white text-secondary font-semibold shadow-sm' : 'text-secondary-gray hover:text-secondary'"
            class="flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all">
            {{ tab.label }}
          </button>
        }
      </div>

      <!-- Profile Tab -->
      @if (activeTab() === 'profil') {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
          <h2 class="font-semibold text-secondary text-lg border-b pb-4">Informations personnelles</h2>

          <!-- Avatar -->
          <div class="flex items-center gap-5">
            <div class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              @if (profile.avatar) {
                <img [src]="profile.avatar" alt="Avatar" class="w-full h-full object-cover">
              } @else {
                <span class="text-3xl font-bold text-primary">{{ initials() }}</span>
              }
            </div>
            <div>
              <div class="font-semibold text-secondary">{{ profile.firstName }} {{ profile.lastName }}</div>
              <div class="text-sm text-secondary-gray mb-2">{{ profile.email }}</div>
              <button class="text-sm text-primary font-medium hover:text-primary-dark">
                Changer la photo
              </button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Prénom *</label>
              <input type="text" [(ngModel)]="profile.firstName"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Nom *</label>
              <input type="text" [(ngModel)]="profile.lastName"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Email</label>
              <input type="email" [(ngModel)]="profile.email"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Téléphone *</label>
              <input type="tel" [(ngModel)]="profile.phone"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
          </div>

          <div class="flex justify-end">
            <button (click)="saveProfile()" class="btn-primary px-6 py-2.5 text-sm">
              Sauvegarder le profil
            </button>
          </div>
        </div>
      }

      <!-- Security Tab -->
      @if (activeTab() === 'securite') {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
          <h2 class="font-semibold text-secondary text-lg border-b pb-4">Sécurité du compte</h2>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Mot de passe actuel</label>
              <input type="password" [(ngModel)]="security.currentPassword" placeholder="••••••••"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Nouveau mot de passe</label>
              <input type="password" [(ngModel)]="security.newPassword" placeholder="Minimum 8 caractères"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Confirmer le nouveau mot de passe</label>
              <input type="password" [(ngModel)]="security.confirmPassword" placeholder="Retaper le nouveau mot de passe"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              @if (security.newPassword && security.confirmPassword && security.newPassword !== security.confirmPassword) {
                <p class="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
              }
            </div>
          </div>

          <div class="flex justify-end">
            <button (click)="changePassword()"
              [disabled]="!security.currentPassword || !security.newPassword || security.newPassword !== security.confirmPassword"
              class="btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              Changer le mot de passe
            </button>
          </div>

          <!-- 2FA Info -->
          <div class="mt-6 pt-6 border-t">
            <h3 class="font-medium text-secondary mb-3">Double authentification</h3>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div class="text-sm font-medium text-secondary">SMS (recommandé)</div>
                <div class="text-xs text-secondary-gray">Recevoir un code par SMS lors de la connexion</div>
              </div>
              <div class="relative">
                <input type="checkbox" [(ngModel)]="security.twoFaEnabled" class="sr-only" id="twofa">
                <label for="twofa" class="flex items-center cursor-pointer">
                  <div [class]="security.twoFaEnabled ? 'bg-primary' : 'bg-gray-300'" class="w-12 h-6 rounded-full transition-colors relative">
                    <div [class]="security.twoFaEnabled ? 'translate-x-6' : 'translate-x-0'" class="absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform border border-gray-200"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Payment Tab -->
      @if (activeTab() === 'paiement') {
        <div class="space-y-5">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 class="font-semibold text-secondary text-lg border-b pb-4">Informations de paiement</h2>
            <p class="text-sm text-secondary-gray">Ces informations sont utilisées pour les reversements de vos gains.</p>

            <!-- Mobile Money -->
            <div>
              <h3 class="font-medium text-secondary mb-3">Mobile Money</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Opérateur</label>
                  <select [(ngModel)]="payment.mobileMoneyOperator"
                    class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Sélectionner</option>
                    <option value="ORANGE">Orange Money</option>
                    <option value="MTN">MTN MoMo</option>
                    <option value="WAVE">Wave</option>
                    <option value="MOOV">Moov Money</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">Numéro de compte</label>
                  <input type="tel" [(ngModel)]="payment.mobileMoneyNumber" placeholder="+225 07 00 00 00 00"
                    class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
              </div>
              <div class="mt-3">
                <label class="block text-sm font-medium text-secondary mb-2">Nom du titulaire du compte</label>
                <input type="text" [(ngModel)]="payment.accountHolder" placeholder="Nom complet tel qu'enregistré"
                  class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <!-- Info Box -->
            <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm text-blue-700">
                  Les reversements sont effectués sous 48h ouvrés après validation de votre demande. Un minimum de 5 000 FCFA est requis pour initier un reversement.
                </p>
              </div>
            </div>

            <div class="flex justify-end">
              <button (click)="savePayment()" class="btn-primary px-6 py-2.5 text-sm">
                Sauvegarder les informations
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Notifications Tab -->
      @if (activeTab() === 'notifications') {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-secondary text-lg border-b pb-4">Préférences de notifications</h2>
          <div class="space-y-4 mt-4">
            @for (notif of notificationPrefs; track notif.key) {
              <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div>
                  <div class="text-sm font-medium text-secondary">{{ notif.label }}</div>
                  <div class="text-xs text-secondary-gray mt-0.5">{{ notif.description }}</div>
                </div>
                <div class="flex items-center gap-3">
                  <label class="flex items-center gap-1 cursor-pointer" [title]="'SMS'">
                    <input type="checkbox" [(ngModel)]="notif.sms" class="w-3.5 h-3.5 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-xs text-secondary-gray">SMS</span>
                  </label>
                  <label class="flex items-center gap-1 cursor-pointer" [title]="'Email'">
                    <input type="checkbox" [(ngModel)]="notif.email" class="w-3.5 h-3.5 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-xs text-secondary-gray">Email</span>
                  </label>
                  <div class="relative">
                    <input type="checkbox" [(ngModel)]="notif.push" [id]="'notif-' + notif.key" class="sr-only">
                    <label [for]="'notif-' + notif.key" class="flex items-center cursor-pointer">
                      <div [class]="notif.push ? 'bg-primary' : 'bg-gray-200'" class="w-10 h-5 rounded-full transition-colors relative">
                        <div [class]="notif.push ? 'translate-x-5' : 'translate-x-0'" class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform border border-gray-200"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="flex justify-end mt-6">
            <button (click)="saveNotifications()" class="btn-primary px-6 py-2.5 text-sm">
              Sauvegarder les préférences
            </button>
          </div>
        </div>
      }

      <!-- Danger Zone -->
      @if (activeTab() === 'profil') {
        <div class="bg-white rounded-xl border border-red-200 p-6">
          <h2 class="font-semibold text-red-600 mb-3">Zone de danger</h2>
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-xl">
            <div>
              <div class="text-sm font-medium text-red-700">Désactiver temporairement ma boutique</div>
              <div class="text-xs text-red-600 mt-0.5">Votre boutique ne sera plus visible par les clients</div>
            </div>
            <button class="px-4 py-2 border border-red-300 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
              Désactiver
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ProParametresComponent implements OnInit {
  activeTab = signal('profil');

  tabs = [
    { id: 'profil', label: 'Profil' },
    { id: 'securite', label: 'Sécurité' },
    { id: 'paiement', label: 'Paiement' },
    { id: 'notifications', label: 'Notifications' },
  ];

  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '',
  };

  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFaEnabled: false,
  };

  payment = {
    mobileMoneyOperator: '',
    mobileMoneyNumber: '',
    accountHolder: '',
  };

  notificationPrefs = [
    { key: 'new_booking', label: 'Nouvelle réservation', description: 'Quand un client fait une réservation', sms: true, email: true, push: true },
    { key: 'booking_cancelled', label: 'Annulation de RDV', description: 'Quand un client annule', sms: true, email: false, push: true },
    { key: 'payment_received', label: 'Paiement reçu', description: 'Quand un paiement est crédité', sms: true, email: true, push: true },
    { key: 'review_received', label: 'Nouvel avis', description: 'Quand un client laisse un commentaire', sms: false, email: true, push: true },
    { key: 'payout_processed', label: 'Reversement traité', description: 'Statut de vos demandes de reversement', sms: true, email: true, push: false },
    { key: 'reminder_24h', label: 'Rappel 24h avant', description: 'Rappel des RDV du lendemain', sms: false, email: true, push: false },
  ];

  constructor(
    private authService: AuthService,
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  initials = computed(() => {
    return `${this.profile.firstName.charAt(0)}${this.profile.lastName.charAt(0)}`.toUpperCase() || 'P';
  });

  ngOnInit(): void {
    const user = this.authService.user();
    if (user) {
      this.profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar || '',
      };
    }

    const business = this.mockData.getBusinesses().find(
      b => b.professionalId === user?.id
    );
    if (business) {
      this.payment.accountHolder = `${user?.firstName} ${user?.lastName}`;
    }
  }

  saveProfile(): void {
    this.toast.success('Profil mis à jour avec succès');
  }

  changePassword(): void {
    if (this.security.newPassword !== this.security.confirmPassword) {
      this.toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    this.toast.success('Mot de passe modifié avec succès');
    this.security = { currentPassword: '', newPassword: '', confirmPassword: '', twoFaEnabled: this.security.twoFaEnabled };
  }

  savePayment(): void {
    if (!this.payment.mobileMoneyOperator || !this.payment.mobileMoneyNumber) {
      this.toast.error('Veuillez renseigner votre opérateur et votre numéro');
      return;
    }
    this.toast.success('Informations de paiement sauvegardées');
  }

  saveNotifications(): void {
    this.toast.success('Préférences de notifications sauvegardées');
  }
}
