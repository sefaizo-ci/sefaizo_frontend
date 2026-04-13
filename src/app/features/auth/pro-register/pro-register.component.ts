import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      <!-- Left Side - Hero -->
      <div class="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div class="relative z-10 flex flex-col justify-center px-12 text-white">
          <a href="/" class="inline-block mb-12">
            <img src="/Logoheder.png" alt="SEFAIZO Logo" class="h-16 w-auto brightness-0 invert">
          </a>
          
          <h1 class="text-4xl font-bold mb-6 leading-tight">
            Développez votre activité beauté
          </h1>
          <p class="text-lg text-white/90 mb-10 leading-relaxed">
            Rejoignez SEFAIZO et accédez à des milliers de clients potentiels prêts à réserver vos services.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-6 mb-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="text-3xl font-bold mb-1">500+</div>
              <div class="text-sm text-white/80">Professionnels actifs</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="text-3xl font-bold mb-1">5000+</div>
              <div class="text-sm text-white/80">RDV par mois</div>
            </div>
          </div>

          <!-- Benefits -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">Gestion d'agenda simplifiée</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">Paiements sécurisés et rapides</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">Visibilité maximale en ligne</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">Statistiques détaillées</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Form -->
      <div class="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div class="max-w-lg w-full">
          <!-- Mobile Logo -->
          <div class="lg:hidden mb-8 text-center">
            <a href="/" class="inline-block">
              <img src="/Logoheder.png" alt="SEFAIZO Logo" class="h-14 w-auto mx-auto">
            </a>
          </div>

          <!-- Header -->
          <div class="mb-8">
            <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Espace Professionnel
            </div>
            <h2 class="text-3xl font-bold text-secondary mb-2">Inscrivez votre entreprise</h2>
            <p class="text-secondary-gray">
              Commencez à accepter des réservations dès aujourd'hui
            </p>
          </div>

          <!-- Progress Steps -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-4">
              @for (step of steps; track step.number) {
                <div class="flex items-center">
                  <div class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300"
                    [class]="currentStep >= step.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
                    @if (currentStep > step.number) {
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    } @else {
                      {{ step.number }}
                    }
                  </div>
                  @if (step.number < steps.length) {
                    <div class="w-12 sm:w-20 h-1 mx-2 rounded transition-all duration-300"
                      [class]="currentStep > step.number ? 'bg-primary' : 'bg-gray-200'"></div>
                  }
                </div>
              }
            </div>
            <div class="flex justify-between text-xs text-secondary-gray">
              <span [class.text-primary]="currentStep === 1" [class.font-semibold]="currentStep === 1">Compte</span>
              <span [class.text-primary]="currentStep === 2" [class.font-semibold]="currentStep === 2">Infos</span>
              <span [class.text-primary]="currentStep === 3" [class.font-semibold]="currentStep === 3">Coord.</span>
              <span [class.text-primary]="currentStep === 4" [class.font-semibold]="currentStep === 4">Local.</span>
              <span [class.text-primary]="currentStep === 5" [class.font-semibold]="currentStep === 5">Services</span>
              <span [class.text-primary]="currentStep === 6" [class.font-semibold]="currentStep === 6">Sécurité</span>
            </div>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="space-y-5">
            <!-- Step 1: Account Type -->
            @if (currentStep === 1) {
            <!-- Business Type Selection -->
            <div class="bg-gray-50 rounded-lg p-5">
              <h3 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Type de compte professionnel *
              </h3>
              
              <div class="grid grid-cols-2 gap-3">
                <!-- Particulier/Freelance -->
                <button
                  type="button"
                  (click)="formData.businessType = 'FREELANCE'"
                  [class]="formData.businessType === 'FREELANCE' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-300 hover:border-primary/50'"
                  class="flex flex-col items-center gap-3 p-5 border rounded-xl transition-all duration-200">
                  <div class="w-14 h-14 rounded-full flex items-center justify-center" [class]="formData.businessType === 'FREELANCE' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div class="text-center">
                    <div class="font-semibold text-secondary" [class.text-primary]="formData.businessType === 'FREELANCE'">Particulier</div>
                    <div class="text-xs text-secondary-gray">Freelance / Indépendant</div>
                  </div>
                  @if (formData.businessType === 'FREELANCE') {
                    <div class="absolute top-2 right-2">
                      <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  }
                </button>

                <!-- Entreprise/Salon -->
                <button
                  type="button"
                  (click)="formData.businessType = 'SALON'"
                  [class]="formData.businessType === 'SALON' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-300 hover:border-primary/50'"
                  class="flex flex-col items-center gap-3 p-5 border rounded-xl transition-all duration-200 relative">
                  <div class="w-14 h-14 rounded-full flex items-center justify-center" [class]="formData.businessType === 'SALON' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div class="text-center">
                    <div class="font-semibold text-secondary" [class.text-primary]="formData.businessType === 'SALON'">Entreprise</div>
                    <div class="text-xs text-secondary-gray">Salon / Société</div>
                  </div>
                  @if (formData.businessType === 'SALON') {
                    <div class="absolute top-2 right-2">
                      <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  }
                </button>
              </div>
            </div>

            <!-- Step Navigation for Step 1 -->
            <div class="flex justify-end pt-4">
              <button type="button" (click)="nextStep()" class="btn-primary inline-flex items-center gap-2">
                Étape suivante
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            }

            <!-- Step 2: Business Info -->
            @if (currentStep === 2) {
            <!-- Business Info Section -->
            <div class="bg-gray-50 rounded-lg p-5">
              <h3 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                @if (formData.businessType === 'FREELANCE') {
                  Informations personnelles
                } @else {
                  Informations de l'entreprise
                }
              </h3>

              <div class="space-y-4">
                <!-- Business Name (conditional label) -->
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    @if (formData.businessType === 'FREELANCE') {
                      Votre nom professionnel / Marque *
                    } @else {
                      Nom de l'entreprise / Salon *
                    }
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formData.businessName"
                    name="businessName"
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    [placeholder]="formData.businessType === 'FREELANCE' ? 'Ex: Marie Coiffure' : 'Ex: Beauty Salon Cocody'">
                </div>

                <!-- IFREELANCE: Just display name simplified -->
                @if (formData.businessType === 'FREELANCE') {
                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                      Description de votre activité
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="formData.businessDescription"
                      name="businessDescription"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Coiffeuse à domicile depuis 5 ans">
                  </div>
                }

                <!-- IF SALON: Add additional fields -->
                @if (formData.businessType === 'SALON') {
                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                      Numéro RCCM / Registre de commerce
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="formData.rccmNumber"
                      name="rccmNumber"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Facultatif - Sera demandé pour la vérification">
                  </div>
                }

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                      Votre prénom *
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="formData.firstName"
                      name="firstName"
                      required
                      class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Prénom">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                      Votre nom *
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="formData.lastName"
                      name="lastName"
                      required
                      class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Nom">
                  </div>
                </div>
              </div>
            </div>

            <!-- Step Navigation for Step 2 -->
            <div class="flex justify-between pt-4">
              <button type="button" (click)="prevStep()" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Précédent
              </button>
              <button type="button" (click)="nextStep()" class="btn-primary inline-flex items-center gap-2">
                Étape suivante
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            }

            <!-- Step 3: Coordonnées -->
            @if (currentStep === 3) {
            <!-- Contact Info Section -->
            <div class="bg-gray-50 rounded-lg p-5">
              <h3 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Coordonnées
              </h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    Adresse e-mail professionnelle
                  </label>
                  <input
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="contact@votre-salon.com (facultatif)">
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    Numéro de téléphone *
                  </label>
                  <input
                    type="tel"
                    [(ngModel)]="formData.phone"
                    name="phone"
                    placeholder="+225 XX XX XX XX XX"
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    Commune / Zone d'activité *
                  </label>
                  <select
                    [(ngModel)]="formData.city"
                    name="city"
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white">
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
              </div>
            </div>

            <!-- Step Navigation for Step 3 -->
            <div class="flex justify-between pt-4">
              <button type="button" (click)="prevStep()" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Précédent
              </button>
              <button type="button" (click)="nextStep()" class="btn-primary inline-flex items-center gap-2">
                Étape suivante
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            }

            <!-- Step 4: Localisation -->
            @if (currentStep === 4) {
            <!-- Geolocation Section -->
            <div class="bg-gray-50 rounded-lg p-5">
              <h3 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Géolocalisation
              </h3>

              <div class="space-y-4">
                <p class="text-sm text-secondary-gray">
                  Partagez votre position pour que les clients puissent vous trouver facilement sur la carte.
                </p>

                <!-- Address Input -->
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    Adresse précise
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formData.address"
                    name="address"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Ex: Riviera 2, rue des jardins, Cocody">
                </div>

                <!-- Geolocation Button -->
                <button
                  type="button"
                  (click)="getLocation()"
                  [disabled]="gettingLocation"
                  class="w-full flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (gettingLocation) {
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Récupération en cours...</span>
                  } @else if (locationAcquired) {
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-green-600">Position enregistrée !</span>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>Utiliser ma position actuelle</span>
                  }
                </button>

                <!-- Location Coordinates (shown if location acquired) -->
                @if (locationAcquired && formData.latitude && formData.longitude) {
                  <div class="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-green-800">
                      Position : {{ formData.latitude | number:'1.4-4' }}, {{ formData.longitude | number:'1.4-4' }}
                    </span>
                  </div>
                }
              </div>
            </div>

            <!-- Step Navigation for Step 3 -->
            <div class="flex justify-between pt-4">
              <button type="button" (click)="prevStep()" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Précédent
              </button>
              <button type="button" (click)="nextStep()" class="btn-primary inline-flex items-center gap-2">
                Étape suivante
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            }

            <!-- Step 5: Services -->
            @if (currentStep === 5) {
            <!-- Services Section -->
            <div class="bg-gray-50 rounded-lg p-5">
              <h3 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                Type de services
              </h3>
              
              <div class="relative">
                <!-- Dropdown Toggle Button -->
                <button
                  type="button"
                  (click)="showServicesDropdown = !showServicesDropdown"
                  class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                  <span class="text-sm" [class.text-secondary-gray]="selectedServices.length === 0" [class.text-secondary]="selectedServices.length > 0">
                    @if (selectedServices.length === 0) {
                      Sélectionnez vos services...
                    } @else {
                      {{ selectedServices.length }} service(s) sélectionné(s)
                    }
                  </span>
                  <svg class="w-5 h-5 text-secondary-gray transition-transform" [class.rotate-180]="showServicesDropdown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <!-- Selected Services Tags -->
                @if (selectedServices.length > 0) {
                  <div class="flex flex-wrap gap-2 mt-3">
                    @for (service of selectedServices; track service) {
                      <span class="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                        {{ service }}
                        <button
                          type="button"
                          (click)="toggleService(service)"
                          class="hover:text-primary-dark transition-colors">
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </span>
                    }
                  </div>
                }

                <!-- Dropdown Menu -->
                @if (showServicesDropdown) {
                  <div class="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    @for (option of serviceOptions; track option) {
                      <div (click)="toggleService(option)" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors" [ngClass]="{'bg-primary/5': isServiceSelected(option)}">
                        <input type="checkbox" [checked]="isServiceSelected(option)" class="w-5 h-5 text-primary rounded focus:ring-primary pointer-events-none">
                        <span class="text-sm font-medium text-secondary">{{ option }}</span>
                      </div>
                    }
                  </div>
                }
              </div>

              @if (selectedServices.length === 0 && !showServicesDropdown) {
                <p class="text-xs text-red-500 mt-2">Veuillez sélectionner au moins un service</p>
              }
            </div>

            <!-- Step Navigation for Step 4 -->
            <div class="flex justify-between pt-4">
              <button type="button" (click)="prevStep()" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Précédent
              </button>
              <button type="button" (click)="nextStep()" class="btn-primary inline-flex items-center gap-2">
                Étape suivante
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            }

            <!-- Step 6: Security + Submit -->
            @if (currentStep === 6) {
            <!-- Password Section -->
            <div class="bg-gray-50 rounded-lg p-5">
              <h3 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Sécurité
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    Mot de passe *
                  </label>
                  <div class="relative">
                    <input
                      [type]="showPassword ? 'text' : 'password'"
                      [(ngModel)]="formData.password"
                      name="password"
                      required
                      minlength="6"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Minimum 6 caractères">
                    <button
                      type="button"
                      (click)="showPassword = !showPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-gray hover:text-secondary transition-colors">
                      @if (showPassword) {
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                        </svg>
                      } @else {
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      }
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-secondary mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    [(ngModel)]="formData.confirmPassword"
                    name="confirmPassword"
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Retapez votre mot de passe">
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                [(ngModel)]="formData.acceptTerms"
                name="acceptTerms"
                required
                class="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer">
              <label for="terms" class="text-sm text-secondary-gray cursor-pointer">
                En créant un compte professionnel, vous acceptez nos
                <a href="#" class="text-primary hover:underline">conditions d'utilisation</a>,
                notre <a href="#" class="text-primary hover:underline">politique de confidentialité</a>
                et nos <a href="#" class="text-primary hover:underline">conditions tarifaires</a>
              </label>
            </div>

            <!-- Step Navigation for Step 5 (Final) -->
            <div class="flex justify-between pt-4">
              <button type="button" (click)="prevStep()" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Précédent
              </button>
            </div>

            <button
              type="submit"
              [disabled]="loading"
              class="w-full bg-black text-white py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg">
              @if (loading) {
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Création en cours...</span>
                </div>
              } @else {
                Créer mon compte professionnel
              }
            </button>
            }
          </form>

          <!-- Login Link -->
          <p class="text-center mt-8 text-secondary-gray">
            Vous avez déjà un compte professionnel ?
            <a routerLink="/auth/login" class="text-primary font-semibold hover:underline">
              Se connecter
            </a>
          </p>

          <!-- Back to role selection -->
          <p class="text-center mt-4">
            <a routerLink="/auth/register" class="text-sm text-secondary-gray hover:text-secondary inline-flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Choisir un autre type de compte
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProRegisterComponent {
  currentStep = 1;
  steps = [
    { number: 1, label: 'Compte' },
    { number: 2, label: 'Infos' },
    { number: 3, label: 'Coordonnées' },
    { number: 4, label: 'Localisation' },
    { number: 5, label: 'Services' },
    { number: 6, label: 'Sécurité' }
  ];

  formData = {
    businessType: 'FREELANCE' as 'FREELANCE' | 'SALON',
    businessName: '',
    businessDescription: '',
    rccmNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    latitude: null as number | null,
    longitude: null as number | null,
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };
  loading = false;
  showPassword = false;
  gettingLocation = false;
  locationAcquired = false;

  // Services combobox
  showServicesDropdown = false;
  selectedServices: string[] = [];
  serviceOptions = [
    'Coiffure',
    'Esthétique',
    'Manucure / Pédicure',
    'Barbier',
    'Maquillage',
    'Massage / Bien-être'
  ];

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  getLocation(): void {
    if (!navigator.geolocation) {
      this.toast.error('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    this.gettingLocation = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.formData.latitude = position.coords.latitude;
        this.formData.longitude = position.coords.longitude;
        this.gettingLocation = false;
        this.locationAcquired = true;
        this.toast.success('Position récupérée avec succès !');
      },
      (error) => {
        this.gettingLocation = false;
        let message = 'Impossible de récupérer votre position';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Veuillez autoriser l\'accès à votre position dans les paramètres de votre navigateur';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Information de position non disponible';
            break;
          case error.TIMEOUT:
            message = 'Délai d\'attente de la position dépassé';
            break;
        }
        this.toast.error(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleService(service: string): void {
    const index = this.selectedServices.indexOf(service);
    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
  }

  isServiceSelected(service: string): boolean {
    return this.selectedServices.includes(service);
  }

  onSubmit(): void {
    // Validate at least one service is selected
    if (this.selectedServices.length === 0) {
      this.toast.error('Veuillez sélectionner au moins un type de service');
      return;
    }

    if (!this.formData.businessName || !this.formData.firstName || !this.formData.lastName ||
        !this.formData.phone || !this.formData.city || !this.formData.password) {
      this.toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (this.formData.password.length < 6) {
      this.toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!this.formData.acceptTerms) {
      this.toast.error('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    this.loading = true;

    this.authService.register({
      email: this.formData.email,
      password: this.formData.password,
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      phone: this.formData.phone,
      role: 'PRO'
    })
    .then(() => {
      this.toast.success('Compte professionnel créé avec succès !');
      // Store business info in localStorage for later setup
      localStorage.setItem('pro_business_type', this.formData.businessType);
      localStorage.setItem('pro_business_name', this.formData.businessName);
      localStorage.setItem('pro_city', this.formData.city);
      localStorage.setItem('pro_services', JSON.stringify(this.selectedServices));
      
      // Store geolocation if available
      if (this.formData.latitude && this.formData.longitude) {
        localStorage.setItem('pro_latitude', String(this.formData.latitude));
        localStorage.setItem('pro_longitude', String(this.formData.longitude));
      }
      if (this.formData.address) {
        localStorage.setItem('pro_address', this.formData.address);
      }
      if (this.formData.businessDescription) {
        localStorage.setItem('pro_description', this.formData.businessDescription);
      }
      if (this.formData.rccmNumber) {
        localStorage.setItem('pro_rccm', this.formData.rccmNumber);
      }
      
      this.router.navigate(['/espace-pro']);
    })
    .catch((error) => {
      this.toast.error(error.message);
      this.loading = false;
    });
  }
}
