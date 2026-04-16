import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 flex items-center justify-center py-12 px-4">
      <div class="max-w-4xl w-full">
        <!-- Logo -->
        <div class="text-center mb-12">
          <a href="/" class="inline-block">
            <img src="/Splash.png" alt="SEFAIZO Logo" class="h-16 w-auto mx-auto mb-6">
          </a>
          <h1 class="text-4xl font-bold text-secondary mb-3">Bienvenue sur SEFAIZO</h1>
          <p class="text-lg text-secondary-gray max-w-2xl mx-auto">
            Comment souhaitez-vous utiliser SEFAIZO ?
          </p>
        </div>

        <!-- Role Selection Cards -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- Client Card -->
          <button
            (click)="selectRole('CLIENT')"
            class="group bg-white rounded-xl shadow-lg p-8 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary">
            <!-- Icon -->
            <div class="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>

            <!-- Content -->
            <h2 class="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
              Client
            </h2>
            <p class="text-secondary-gray mb-6 leading-relaxed">
              Réservez vos soins beauté en quelques clics. Découvrez les meilleurs professionnels près de chez vous.
            </p>

            <!-- Features -->
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Réservation rapide et simple</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Gestion de vos rendez-vous</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Avis et recommandations</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Programme de fidélité</span>
              </li>
            </ul>

            <!-- CTA -->
            <div class="mt-8">
              <span class="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Créer mon compte client
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
            </div>
          </button>

          <!-- Professional Card -->
          <button
            (click)="selectRole('PRO')"
            class="group bg-white rounded-xl shadow-lg p-8 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary">
            <!-- Icon -->
            <div class="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>

            <!-- Content -->
            <h2 class="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
              Professionnel
            </h2>
            <p class="text-secondary-gray mb-6 leading-relaxed">
              Développez votre activité et atteignez de nouveaux clients avec notre plateforme.
            </p>

            <!-- Features -->
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Gestion d'agenda intelligente</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Visibilité accrue en ligne</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Paiements sécurisés</span>
              </li>
              <li class="flex items-start gap-3 text-sm text-secondary-gray">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Statistiques et analyses</span>
              </li>
            </ul>

            <!-- CTA -->
            <div class="mt-8">
              <span class="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Créer mon compte pro
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
            </div>
          </button>
        </div>

        <!-- Already have an account -->
        <p class="text-center text-secondary-gray">
          Vous avez déjà un compte ?
          <a routerLink="/auth/login" class="text-primary font-medium hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class RoleSelectionComponent {
  constructor(private router: Router) {}

  selectRole(role: 'CLIENT' | 'PRO'): void {
    if (role === 'CLIENT') {
      this.router.navigate(['/auth/register/client']);
    } else {
      this.router.navigate(['/auth/register/pro']);
    }
  }
}

