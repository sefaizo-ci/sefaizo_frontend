import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business } from '../../../core/models';
import { StarRatingComponent } from '../../../shared/ui/star-rating/star-rating.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-client-favorites',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StarRatingComponent,
    BadgeComponent,
    FcfaPipe
  ],
  template: `
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-secondary mb-2">Mes Favoris</h1>
        <p class="text-secondary-gray">Retrouvez vos salons et professionnels préférés</p>
      </div>

      @if (favorites().length === 0) {
        <div class="bg-white rounded-md shadow p-12 text-center">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-secondary mb-2">Aucun favori</h3>
          <p class="text-secondary-gray mb-6">Ajoutez des salons à vos favoris pour les retrouver rapidement</p>
          <a routerLink="/recherche" class="btn-primary inline-block">
            Découvrir des salons
          </a>
        </div>
      } @else {
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (business of favorites(); track business.id) {
            <div class="bg-white rounded-md shadow overflow-hidden hover:shadow-lg transition-all group">
              <div class="relative h-40 overflow-hidden">
                <img
                  [src]="business.coverImage || 'https://via.placeholder.com/400x200?text=Salon'"
                  [alt]="business.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                <button
                  (click)="removeFavorite(business.id)"
                  class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 transition-colors">
                  <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                </button>
                @if (business.isVerified) {
                  <div class="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                }
              </div>

              <div class="p-4">
                <h3 class="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors truncate">
                  {{ business.name }}
                </h3>
                
                <div class="flex items-center gap-2 mb-2">
                  <app-star-rating [rating]="business.rating" size="0.875rem" />
                  <span class="text-sm text-secondary-gray">({{ business.reviewCount }})</span>
                </div>

                <div class="flex items-center gap-1 text-sm text-secondary-gray mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ business.city }}
                </div>

                <div class="flex flex-wrap gap-1 mb-3">
                  @for (cat of business.categories.slice(0, 2); track cat) {
                    <app-badge variant="info">{{ cat }}</app-badge>
                  }
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-secondary-gray">À partir de</span>
                  <span class="text-primary font-bold">{{ getMinPrice(business) | fcfa }}</span>
                </div>

                <a
                  [routerLink]="'/pro/' + business.slug"
                  class="mt-4 btn-primary w-full text-center block">
                  Voir le salon
                </a>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class ClientFavoritesComponent implements OnInit {
  favorites = signal<Business[]>([]);

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Mock favorites - in real app, fetch from API
    const allBusinesses = this.mockData.getBusinesses();
    this.favorites.set(allBusinesses.slice(0, 5));
  }

  removeFavorite(businessId: string): void {
    const current = this.favorites();
    this.favorites.set(current.filter(b => b.id !== businessId));
    this.toast.success('Retiré des favoris');
  }

  getMinPrice(business: Business): number {
    if (!business.services || business.services.length === 0) return 0;
    return Math.min(...business.services.map(s => s.price));
  }
}
