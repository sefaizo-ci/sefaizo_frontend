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
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    StarRatingComponent,
    BadgeComponent,
    SkeletonComponent,
    FcfaPipe,
    LucideAngularModule
  ],
  template: `
    <!-- Header with Search -->
    <div class="bg-gradient-primary py-10">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight">Recherche</h1>
          <app-search-input
            [value]="searchQuery()"
            placeholder="Rechercher un salon, un service..."
            (search)="onSearch($event)">
          </app-search-input>
        </div>
      </div>
    </div>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-7">

        <!-- Filters Sidebar -->
        <aside class="lg:w-60 flex-shrink-0">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <div class="flex justify-between items-center mb-5">
              <div class="flex items-center gap-2">
                <lucide-icon name="sliders-horizontal" [size]="16" [strokeWidth]="2" class="text-secondary"></lucide-icon>
                <h2 class="font-semibold text-secondary text-sm">Filtres</h2>
                @if (hasActiveFilters()) {
                  <span class="bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{{ getActiveFiltersCount() }}</span>
                }
              </div>
              @if (hasActiveFilters()) {
                <button (click)="resetFilters()" class="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1">
                  <lucide-icon name="x" [size]="12" [strokeWidth]="2.5"></lucide-icon>
                  Effacer
                </button>
              }
            </div>

            <!-- Category Filter -->
            <div class="mb-5 pb-5 border-b border-gray-100">
              <h3 class="text-xs font-bold text-secondary-gray uppercase tracking-wider mb-3">Catégories</h3>
              <div class="space-y-2">
                @for (category of categories; track category.id) {
                  <label class="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox"
                      [checked]="filters().categories?.includes(category.name)"
                      (change)="toggleCategory(category.name)"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary">
                    <span class="text-sm text-secondary group-hover:text-primary transition-colors">{{ category.name }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Commune Filter -->
            <div class="mb-5 pb-5 border-b border-gray-100">
              <h3 class="text-xs font-bold text-secondary-gray uppercase tracking-wider mb-3">Communes</h3>
              <div class="space-y-2">
                @for (commune of communes; track commune) {
                  <label class="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox"
                      [checked]="filters().communes?.includes(commune)"
                      (change)="toggleCommune(commune)"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary">
                    <span class="text-sm text-secondary group-hover:text-primary transition-colors">{{ commune }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-5 pb-5 border-b border-gray-100">
              <h3 class="text-xs font-bold text-secondary-gray uppercase tracking-wider mb-3">Prix maximum</h3>
              <input type="range" [min]="0" [max]="50000" [step]="1000"
                [value]="filters().maxPrice || 50000"
                (input)="onPriceChange($event)"
                class="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary">
              <div class="flex justify-between text-xs text-secondary-gray mt-2">
                <span>0 FCFA</span>
                <span class="font-semibold text-primary">{{ (filters().maxPrice || 50000).toLocaleString() }} FCFA</span>
              </div>
            </div>

            <!-- Minimum Rating -->
            <div class="mb-5 pb-5 border-b border-gray-100">
              <h3 class="text-xs font-bold text-secondary-gray uppercase tracking-wider mb-3">Note minimum</h3>
              <div class="space-y-2">
                @for (rating of [4, 3, 2, 1]; track rating) {
                  <label class="flex items-center gap-2.5 cursor-pointer group">
                    <input type="radio" name="minRating"
                      [checked]="filters().minRating === rating"
                      (change)="setMinRating(rating)"
                      class="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary">
                    <app-star-rating [rating]="rating" size="0.8rem" />
                    <span class="text-xs text-secondary-gray">& plus</span>
                  </label>
                }
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="minRating"
                    [checked]="!filters().minRating"
                    (change)="setMinRating(undefined)"
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary">
                  <span class="text-sm text-secondary">Toutes les notes</span>
                </label>
              </div>
            </div>

            <!-- Business Type -->
            <div>
              <h3 class="text-xs font-bold text-secondary-gray uppercase tracking-wider mb-3">Type</h3>
              <div class="space-y-2">
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox"
                    [checked]="filters().businessType === 'SALON'"
                    (change)="toggleBusinessType('SALON')"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary">
                  <div class="flex items-center gap-1.5">
                    <lucide-icon name="store" [size]="13" [strokeWidth]="2" class="text-secondary-gray"></lucide-icon>
                    <span class="text-sm text-secondary">Salon</span>
                  </div>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox"
                    [checked]="filters().businessType === 'FREELANCE'"
                    (change)="toggleBusinessType('FREELANCE')"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary">
                  <div class="flex items-center gap-1.5">
                    <lucide-icon name="user-round" [size]="13" [strokeWidth]="2" class="text-secondary-gray"></lucide-icon>
                    <span class="text-sm text-secondary">Freelance</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Results -->
        <main class="flex-1">
          <!-- Results Header -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
            <div>
              <h2 class="text-base font-semibold text-secondary">
                @if (loading()) {
                  <span class="flex items-center gap-2">
                    <lucide-icon name="loader" [size]="16" [strokeWidth]="2" class="animate-spin text-primary"></lucide-icon>
                    Recherche en cours...
                  </span>
                } @else {
                  <span class="text-primary font-bold">{{ resultsCount() }}</span>
                  résultat{{ resultsCount() > 1 ? 's' : '' }} trouvé{{ resultsCount() > 1 ? 's' : '' }}
                }
              </h2>
              @if (searchQuery()) {
                <p class="text-sm text-secondary-gray">pour "<strong>{{ searchQuery() }}</strong>"</p>
              }
            </div>

            <!-- Sort -->
            <div class="flex items-center gap-2">
              <lucide-icon name="arrow-up-down" [size]="14" [strokeWidth]="2" class="text-secondary-gray"></lucide-icon>
              <select [value]="filters().sortBy" (change)="onSortChange($event)"
                class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                <option value="RELEVANCE">Pertinence</option>
                <option value="RATING">Meilleures notes</option>
                <option value="PRICE_ASC">Prix croissant</option>
                <option value="PRICE_DESC">Prix décroissant</option>
              </select>
            </div>
          </div>

          <!-- Results Grid -->
          @if (loading()) {
            <div class="grid md:grid-cols-2 gap-5">
              @for (item of [1,2,3,4,5,6]; track item) {
                <app-skeleton variant="card" />
              }
            </div>
          } @else if (filteredResults().length === 0) {
            <!-- Empty State -->
            <div class="text-center py-20">
              <div class="w-20 h-20 mx-auto mb-5 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                <lucide-icon name="search-x" [size]="36" [strokeWidth]="1.5" class="text-gray-300"></lucide-icon>
              </div>
              <h3 class="text-lg font-semibold text-secondary mb-2">Aucun résultat trouvé</h3>
              <p class="text-secondary-gray text-sm mb-6 max-w-xs mx-auto">Essayez d'élargir vos critères ou de modifier les filtres.</p>
              <button (click)="resetFilters()"
                class="inline-flex items-center gap-2 btn-primary text-sm">
                <lucide-icon name="refresh-cw" [size]="14" [strokeWidth]="2.5"></lucide-icon>
                Réinitialiser les filtres
              </button>
            </div>
          } @else {
            <div class="grid md:grid-cols-2 gap-5">
              @for (business of filteredResults(); track business.id) {
                <div (click)="viewBusiness(business.slug)"
                     class="business-card bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer group">
                  <div class="flex">
                    <!-- Image -->
                    <div class="w-36 h-36 flex-shrink-0 relative overflow-hidden">
                      <img
                        [src]="business.coverImage || business.avatar || 'https://via.placeholder.com/200x200?text=Salon'"
                        [alt]="business.name"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy">
                      @if (business.isVerified) {
                        <div class="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                          <lucide-icon name="badge-check" [size]="14" [strokeWidth]="2" class="text-primary"></lucide-icon>
                        </div>
                      }
                    </div>

                    <!-- Content -->
                    <div class="flex-1 p-4 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 class="font-semibold text-secondary mb-1.5 group-hover:text-primary transition-colors truncate text-sm">
                          {{ business.name }}
                        </h3>
                        <div class="flex items-center gap-1.5 mb-2">
                          <app-star-rating [rating]="business.rating" size="0.8rem" />
                          <span class="text-xs text-secondary-gray">({{ business.reviewCount }})</span>
                        </div>
                        <div class="flex items-center gap-1 text-xs text-secondary-gray mb-2.5">
                          <lucide-icon name="map-pin" [size]="11" [strokeWidth]="2" class="flex-shrink-0"></lucide-icon>
                          {{ business.city }}
                        </div>
                        <div class="flex flex-wrap gap-1">
                          @for (cat of business.categories.slice(0, 2); track cat) {
                            <span class="text-xs px-2 py-0.5 bg-primary/8 text-primary rounded-full font-medium">{{ cat }}</span>
                          }
                        </div>
                      </div>
                      <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                        <span class="text-xs text-secondary-gray">À partir de</span>
                        <span class="text-primary font-bold text-sm">{{ getMinPrice(business) | fcfa }}</span>
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
  loading = signal(false);
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

    // Communes (case-insensitive, partial match pour gérer la saisie libre du hero)
    if (f.communes && f.communes.length > 0) {
      results = results.filter(b =>
        f.communes!.some(c => b.city.toLowerCase().includes(c.toLowerCase()))
      );
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
