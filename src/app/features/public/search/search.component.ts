import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, SearchFilters } from '../../../core/models';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { StarRatingComponent } from '../../../shared/ui/star-rating/star-rating.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton/skeleton.component';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    StarRatingComponent,
    BadgeComponent,
    SkeletonComponent,
    FcfaPipe
  ],
  template: `
    <!-- Header with Search -->
    <div class="bg-gradient-primary py-8">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">Recherche</h1>
          <app-search-input
            [value]="searchQuery()"
            placeholder="Rechercher un salon, un service..."
            (search)="onSearch($event)">
          </app-search-input>
        </div>
      </div>
    </div>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-md shadow p-6 sticky top-24">
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-semibold text-secondary">Filtres</h2>
              <button
                (click)="resetFilters()"
                class="text-sm text-primary hover:text-primary-dark">
                Reset
              </button>
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-secondary mb-3">Catégories</h3>
              <div class="space-y-2">
                @for (category of categories; track category.id) {
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      [checked]="filters().categories?.includes(category.name)"
                      (change)="toggleCategory(category.name)"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-sm text-secondary">{{ category.name }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Commune Filter -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-secondary mb-3">Communes</h3>
              <div class="space-y-2">
                @for (commune of communes; track commune) {
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      [checked]="filters().communes?.includes(commune)"
                      (change)="toggleCommune(commune)"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-sm text-secondary">{{ commune }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-secondary mb-3">Prix maximum</h3>
              <input
                type="range"
                [min]="0"
                [max]="50000"
                [step]="1000"
                [value]="filters().maxPrice || 50000"
                (input)="onPriceChange($event)"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="flex justify-between text-xs text-secondary-gray mt-2">
                <span>0 FCFA</span>
                <span>{{ filters().maxPrice || 50000 }} FCFA</span>
              </div>
            </div>

            <!-- Minimum Rating -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-secondary mb-3">Note minimum</h3>
              <div class="space-y-2">
                @for (rating of [4, 3, 2, 1]; track rating) {
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="minRating"
                      [checked]="filters().minRating === rating"
                      (change)="setMinRating(rating)"
                      class="w-4 h-4 text-primary border-gray-300 focus:ring-primary">
                    <app-star-rating [rating]="rating" size="0.875rem" />
                    <span class="text-sm text-secondary">& plus</span>
                  </label>
                }
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="minRating"
                    [checked]="!filters().minRating"
                    (change)="setMinRating(undefined)"
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary">
                  <span class="text-sm text-secondary">Toutes les notes</span>
                </label>
              </div>
            </div>

            <!-- Business Type -->
            <div>
              <h3 class="text-sm font-medium text-secondary mb-3">Type</h3>
              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [checked]="filters().businessType === 'SALON'"
                    (change)="toggleBusinessType('SALON')"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                  <span class="text-sm text-secondary">Salon</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [checked]="filters().businessType === 'FREELANCE'"
                    (change)="toggleBusinessType('FREELANCE')"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                  <span class="text-sm text-secondary">Freelance</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Results -->
        <main class="flex-1">
          <!-- Results Header -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-secondary">
                {{ loading() ? 'Recherche...' : resultsCount() + ' résultat' + (resultsCount() > 1 ? 's' : '') }}
              </h2>
              @if (hasActiveFilters()) {
                <p class="text-sm text-secondary-gray">
                  Filtres actifs: {{ getActiveFiltersCount() }}
                </p>
              }
            </div>

            <!-- Sort Dropdown -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-secondary-gray">Trier par:</label>
              <select
                [value]="filters().sortBy"
                (change)="onSortChange($event)"
                class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="RELEVANCE">Pertinence</option>
                <option value="RATING">Meilleures notes</option>
                <option value="PRICE_ASC">Prix croissant</option>
                <option value="PRICE_DESC">Prix décroissant</option>
              </select>
            </div>
          </div>

          <!-- Results Grid -->
          @if (loading()) {
            <div class="grid md:grid-cols-2 gap-6">
              @for (item of [1,2,3,4,5,6]; track item) {
                <app-skeleton variant="card" />
              }
            </div>
          } @else if (filteredResults().length === 0) {
            <!-- Empty State -->
            <div class="text-center py-16">
              <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-secondary mb-2">Aucun résultat trouvé</h3>
              <p class="text-secondary-gray mb-6">Essayez de modifier vos filtres de recherche</p>
              <button (click)="resetFilters()" class="btn-primary">
                Réinitialiser les filtres
              </button>
            </div>
          } @else {
            <div class="grid md:grid-cols-2 gap-6">
              @for (business of filteredResults(); track business.id) {
                <div
                  (click)="viewBusiness(business.slug)"
                  class="bg-white rounded-md shadow overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <div class="flex">
                    <!-- Image -->
                    <div class="w-40 h-40 flex-shrink-0 relative">
                      <img
                        [src]="business.coverImage || business.avatar || 'https://via.placeholder.com/200x200?text=Salon'"
                        [alt]="business.name"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy">
                      @if (business.isVerified) {
                        <div class="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-1 rounded-full">
                          <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      }
                    </div>

                    <!-- Content -->
                    <div class="flex-1 p-4">
                      <h3 class="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors truncate">
                        {{ business.name }}
                      </h3>

                      <div class="flex items-center gap-2 mb-2">
                        <app-star-rating [rating]="business.rating" size="0.875rem" />
                        <span class="text-sm text-secondary-gray">({{ business.reviewCount }})</span>
                      </div>

                      <div class="flex items-center gap-1 text-sm text-secondary-gray mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {{ business.city }}
                      </div>

                      <div class="flex flex-wrap gap-1 mb-3">
                        @for (cat of business.categories.slice(0, 3); track cat) {
                          <app-badge variant="info">{{ cat }}</app-badge>
                        }
                      </div>

                      <div class="flex items-center justify-between">
                        <span class="text-xs text-secondary-gray">À partir de</span>
                        <span class="text-primary font-bold">{{ getMinPrice(business) | fcfa }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class SearchComponent implements OnInit {
  loading = signal(true);
  searchQuery = signal('');
  filters = signal<SearchFilters>({});
  allBusinesses: Business[] = [];
  categories: any[] = [];
  communes: string[] = [];

  resultsCount = computed(() => this.filteredResults().length);
  
  filteredResults = computed(() => {
    let results = [...this.allBusinesses];
    const f = this.filters();

    // Search query
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      results = results.filter(b =>
        b.name.toLowerCase().includes(query) ||
        b.categories.some(c => c.toLowerCase().includes(query)) ||
        b.city.toLowerCase().includes(query)
      );
    }

    // Categories
    if (f.categories && f.categories.length > 0) {
      results = results.filter(b =>
        f.categories!.some(cat => b.categories.includes(cat))
      );
    }

    // Communes
    if (f.communes && f.communes.length > 0) {
      results = results.filter(b => f.communes!.includes(b.city));
    }

    // Price
    if (f.maxPrice) {
      results = results.filter(b =>
        b.services.some(s => s.price <= (f.maxPrice || Infinity))
      );
    }

    // Rating
    if (f.minRating) {
      results = results.filter(b => b.rating >= (f.minRating || 0));
    }

    // Business Type
    if (f.businessType) {
      results = results.filter(b => b.businessType === f.businessType);
    }

    // Sort
    switch (f.sortBy) {
      case 'RATING':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'PRICE_ASC':
        results.sort((a, b) => this.getMinPrice(a) - this.getMinPrice(b));
        break;
      case 'PRICE_DESC':
        results.sort((a, b) => this.getMinPrice(b) - this.getMinPrice(a));
        break;
    }

    return results;
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    this.categories = this.mockData.getCategories();
    this.communes = this.mockData.getCommunes();
    this.allBusinesses = this.mockData.getBusinesses();

    // Get query params
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery.set(params['q']);
      }
      if (params['category']) {
        this.filters.update(f => ({ ...f, categories: [params['category']] }));
      }
      if (params['commune']) {
        this.filters.update(f => ({ ...f, communes: [params['commune']] }));
      }
    });

    // Simulate loading
    setTimeout(() => {
      this.loading.set(false);
    }, 500);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  toggleCategory(category: string): void {
    this.filters.update(f => {
      const categories = f.categories || [];
      const newCategories = categories.includes(category)
        ? categories.filter(c => c !== category)
        : [...categories, category];
      return { ...f, categories: newCategories };
    });
  }

  toggleCommune(commune: string): void {
    this.filters.update(f => {
      const communes = f.communes || [];
      const newCommunes = communes.includes(commune)
        ? communes.filter(c => c !== commune)
        : [...communes, commune];
      return { ...f, communes: newCommunes };
    });
  }

  onPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filters.update(f => ({ ...f, maxPrice: parseInt(value, 10) }));
  }

  setMinRating(rating: number | undefined): void {
    this.filters.update(f => ({ ...f, minRating: rating }));
  }

  toggleBusinessType(type: 'SALON' | 'FREELANCE'): void {
    this.filters.update(f => ({
      ...f,
      businessType: f.businessType === type ? undefined : type
    }));
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SearchFilters['sortBy'];
    this.filters.update(f => ({ ...f, sortBy: value }));
  }

  resetFilters(): void {
    this.filters.set({});
    this.searchQuery.set('');
  }

  hasActiveFilters(): boolean {
    const f = this.filters();
    return !!(
      f.categories?.length ||
      f.communes?.length ||
      f.maxPrice ||
      f.minRating ||
      f.businessType ||
      f.sortBy
    );
  }

  getActiveFiltersCount(): number {
    const f = this.filters();
    let count = 0;
    if (f.categories?.length) count += f.categories.length;
    if (f.communes?.length) count += f.communes.length;
    if (f.maxPrice) count++;
    if (f.minRating) count++;
    if (f.businessType) count++;
    return count;
  }

  viewBusiness(slug: string): void {
    this.router.navigate(['/pro', slug]);
  }

  getMinPrice(business: Business): number {
    if (!business.services || business.services.length === 0) return 0;
    return Math.min(...business.services.map(s => s.price));
  }
}
