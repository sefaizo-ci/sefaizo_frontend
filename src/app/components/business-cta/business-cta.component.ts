import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-business-cta',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  template: `
    <section class="section">
      <div class="container-custom">
        <div class="bg-secondary-light rounded-2xl p-8 md:p-12 lg:p-16">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Content -->
            <div>
              <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                4.9/5 étoiles
              </div>

              <h2 class="text-3xl md:text-4xl font-bold text-secondary mb-4">
                SEFAIZO pour les Professionnels
              </h2>

              <p class="text-secondary-gray text-lg mb-8">
                Rejoignez des milliers de professionnels qui développent leur activité
                avec SEFAIZO. Gérez vos rendez-vous, fidélisez vos clients et augmentez
                votre visibilité.
              </p>

              <ul class="space-y-3 mb-8">
                <li class="flex items-center gap-3 text-secondary">
                  <svg class="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Gestion de planning intuitive
                </li>
                <li class="flex items-center gap-3 text-secondary">
                  <svg class="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Visibilité accrue
                </li>
                <li class="flex items-center gap-3 text-secondary">
                  <svg class="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Paiements sécurisés
                </li>
                <li class="flex items-center gap-3 text-secondary">
                  <svg class="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Support client 24/7
                </li>
              </ul>

              <a routerLink="/auth/register/pro" class="btn-primary inline-flex items-center gap-2">
                Devenir partenaire
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <!-- Image/Illustration -->
            <div class="relative">
              <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold text-secondary">Votre Entreprise</div>
                        <div class="text-sm text-secondary-gray">128 rendez-vous ce mois</div>
                      </div>
                    </div>
                    <div class="text-primary font-bold">+24%</div>
                  </div>

                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-primary w-3/4 rounded-full"></div>
                  </div>

                  <div class="grid grid-cols-3 gap-4 pt-4">
                    <div class="text-center p-3 bg-primary/5 rounded-lg">
                      <div class="text-2xl font-bold text-primary">4.9</div>
                      <div class="text-xs text-secondary-gray">Rating</div>
                    </div>
                    <div class="text-center p-3 bg-primary/5 rounded-lg">
                      <div class="text-2xl font-bold text-primary">350</div>
                      <div class="text-xs text-secondary-gray">Avis</div>
                    </div>
                    <div class="text-center p-3 bg-primary/5 rounded-lg">
                      <div class="text-2xl font-bold text-primary">98%</div>
                      <div class="text-xs text-secondary-gray">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Decorative elements -->
              <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
              <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class BusinessCtaComponent {
}
