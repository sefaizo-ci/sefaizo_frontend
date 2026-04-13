import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SearchInputComponent } from '../../shared/ui/search-input/search-input.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SearchInputComponent],
  template: `
    <section class="relative bg-gradient-to-br from-primary/5 via-white to-primary/10 py-20 md:py-32 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Headline -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
            Votre bien-être,<br />
            <span class="text-gradient">notre priorité</span>
          </h1>

          <!-- Subheadline -->
          <p class="text-lg md:text-xl text-secondary-gray mb-10 max-w-2xl mx-auto">
            Réservez vos rendez-vous beauté et bien-être en quelques clics. 
            Découvrez les meilleurs professionnels près de chez vous.
          </p>

          <!-- Search Bar -->
          <div class="mb-12">
            <app-search-input
              placeholder="Rechercher un service, un professionnel..."
              (search)="onSearch($event)">
            </app-search-input>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-primary">5M+</div>
              <div class="text-sm text-secondary-gray mt-1">Rendez-vous/mois</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-primary">100K+</div>
              <div class="text-sm text-secondary-gray mt-1">Professionnels</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div class="text-sm text-secondary-gray mt-1">Pays</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-primary">4.9★</div>
              <div class="text-sm text-secondary-gray mt-1">Note moyenne</div>
            </div>
          </div>

          <!-- App Download CTA -->
          <div class="flex flex-wrap justify-center gap-4">
            <p class="w-full text-secondary-gray mb-2">Téléchargez l'application</p>
            <app-button variant="app-store">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-.8 1.94-.8.16 1.48-.73 2.96-1.87 3.8-.69.51-1.82.93-1.93.93-.12 0-1.19-.65-1.19-1.97 0-1.6 1.04-2.37 2.05-2.96z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs">Download on the</div>
                <div class="text-sm font-semibold">App Store</div>
              </div>
            </app-button>
            <app-button variant="app-store">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.2,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L3.84,2.15C3.84,2.15 6.05,2.66 6.05,2.66Z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs">GET IT ON</div>
                <div class="text-sm font-semibold">Google Play</div>
              </div>
            </app-button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(query: string) {
    this.searchEvent.emit(query);
  }
}
