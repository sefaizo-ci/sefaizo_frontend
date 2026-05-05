import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, ServiceCategory } from '../../../core/models';
import { SearchFiltersComponent, CategoryWithCount } from './components/search-filters/search-filters.component';
import { SearchResultsToolbarComponent } from './components/search-results-toolbar/search-results-toolbar.component';
import { SearchSalonCardComponent } from './components/search-salon-card/search-salon-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    LucideAngularModule,
    SearchFiltersComponent,
    SearchResultsToolbarComponent,
    SearchSalonCardComponent,
  ],
  template: `
    <div class="min-h-screen bg-white text-[#11152f]">

      <!-- Barre de recherche compacte -->
      <div class="border-b border-[#e7e9f4] bg-[#f7f5ff] py-5">
        <div class="container-custom">
          <form
            class="flex h-12 max-w-[640px] items-center overflow-hidden rounded-full border border-[#e7e9f4] bg-white shadow-[0_4px_14px_rgba(36,36,80,0.09)]"
            (submit)="$event.preventDefault(); onSearch(searchInput.value)"
          >
            <lucide-icon class="ml-4 shrink-0 text-[#5b35f6]" name="search" [size]="20" [strokeWidth]="2.2" aria-hidden="true" />
            <input
              #searchInput
              class="flex-1 border-0 bg-transparent px-3 text-[13px] font-bold text-[#11152f] outline-none placeholder:text-[#7b829a]"
              type="text"
              [value]="searchQuery()"
              placeholder="Quel service ? (coiffure, tresses...)"
            />
            <button
              class="mr-1.5 inline-flex h-9 min-w-[100px] items-center justify-center rounded-full bg-[#5b35f6] px-5 text-xs font-extrabold text-white transition-all hover:bg-[#4d28dc]"
              type="submit"
            >Rechercher</button>
          </form>
        </div>
      </div>

      <!-- Contenu principal : filtres + résultats -->
      <div class="container-custom grid grid-cols-[306px_minmax(0,1fr)] gap-8 max-[1040px]:grid-cols-1 max-[1040px]:gap-6">

        <app-search-filters
          [categories]="categoriesWithCount()"
          [communes]="communes"
          [selectedCategories]="selectedCategories()"
          [selectedCommune]="selectedCommune()"
          [minRating]="minRating()"
          [maxPrice]="maxPrice()"
          [businessType]="businessType()"
          [resultCount]="filteredResults().length"
          (communeChange)="selectedCommune.set($event)"
          (categoryToggle)="toggleCategory($event)"
          (ratingChange)="minRating.set($event)"
          (priceChange)="maxPrice.set($event)"
          (businessTypeToggle)="toggleBusinessType($event)"
          (reset)="resetFilters()"
        />

        <section class="min-w-0 pt-7 pb-10">
          <app-search-results-toolbar
            [resultCount]="filteredResults().length"
            [searchQuery]="searchQuery()"
            [sortBy]="sortBy()"
            (sortChange)="sortBy.set($any($event))"
          />

          @if (filteredResults().length === 0) {
            <div class="flex flex-col items-center py-20 text-center">
              <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#e7e9f4] bg-[#f7f5ff]">
                <lucide-icon name="search-x" [size]="36" [strokeWidth]="1.5" class="text-[#c5c7d9]" aria-hidden="true" />
              </div>
              <h3 class="mb-2 text-lg font-black text-[#11152f]">Aucun salon trouvé</h3>
              <p class="mb-6 max-w-xs text-sm font-bold text-[#66708d]">
                Essayez d'élargir vos critères ou de modifier les filtres.
              </p>
              <button
                (click)="resetFilters()"
                class="inline-flex items-center gap-2 rounded-full bg-[#5b35f6] px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(91,53,246,0.25)] transition-transform hover:-translate-y-0.5"
              >
                <lucide-icon name="refresh-cw" [size]="14" [strokeWidth]="2.5" aria-hidden="true" />
                Réinitialiser les filtres
              </button>
            </div>
          } @else {
            <div class="grid grid-cols-2 gap-x-5 gap-y-[22px] max-[900px]:grid-cols-1">
              @for (business of filteredResults(); track business.id) {
                <app-search-salon-card [business]="business" />
              }
            </div>
          }
        </section>

      </div>
    </div>
  `,
  styles: [],
})
export class SearchComponent implements OnInit {
  allBusinesses: Business[] = [];
  categories: ServiceCategory[] = [];
  communes: string[] = [];

  searchQuery    = signal('');
  selectedCategories = signal<string[]>([]);
  selectedCommune    = signal('');
  minRating          = signal(0);
  maxPrice           = signal(50000);
  businessType       = signal<'SALON' | 'FREELANCE' | null>(null);
  sortBy             = signal<'RELEVANCE' | 'RATING' | 'PRICE_ASC' | 'PRICE_DESC'>('RELEVANCE');

  categoriesWithCount = computed<CategoryWithCount[]>(() =>
    this.categories.map(cat => ({
      name: cat.name,
      count: this.allBusinesses.filter(b => b.categories.includes(cat.name)).length,
    }))
  );

  filteredResults = computed(() => {
    let results = [...this.allBusinesses];

    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      results = results.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.categories.some(c => c.toLowerCase().includes(q)) ||
        b.city.toLowerCase().includes(q)
      );
    }

    const cats = this.selectedCategories();
    if (cats.length > 0) {
      results = results.filter(b => cats.some(cat => b.categories.includes(cat)));
    }

    const commune = this.selectedCommune().toLowerCase();
    if (commune) {
      results = results.filter(b => b.city.toLowerCase().includes(commune));
    }

    const rating = this.minRating();
    if (rating > 0) {
      results = results.filter(b => b.rating >= rating);
    }

    const price = this.maxPrice();
    if (price < 50000) {
      results = results.filter(b => b.services.some(s => s.price <= price));
    }

    const type = this.businessType();
    if (type === 'SALON') {
      results = results.filter(b => b.businessType === 'SALON');
    } else if (type === 'FREELANCE') {
      results = results.filter(b => b.businessType === 'FREELANCE' || b.businessType === 'HYBRID');
    }

    switch (this.sortBy()) {
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
    private mockData: MockDataService,
  ) {}

  ngOnInit(): void {
    this.categories = this.mockData.getCategories();
    this.communes   = this.mockData.getCommunes();
    this.allBusinesses = this.mockData.getBusinesses();

    this.route.queryParams.subscribe(params => {
      if (params['q'])        this.searchQuery.set(params['q']);
      if (params['category']) this.selectedCategories.set([params['category']]);
      if (params['commune'])  this.selectedCommune.set(params['commune']);
    });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query.trim());
  }

  toggleCategory(category: string): void {
    this.selectedCategories.update(cats =>
      cats.includes(category) ? cats.filter(c => c !== category) : [...cats, category]
    );
  }

  toggleBusinessType(type: 'SALON' | 'FREELANCE'): void {
    this.businessType.update(current => current === type ? null : type);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCategories.set([]);
    this.selectedCommune.set('');
    this.minRating.set(0);
    this.maxPrice.set(50000);
    this.businessType.set(null);
    this.sortBy.set('RELEVANCE');
  }

  private getMinPrice(business: Business): number {
    if (!business.services?.length) return 0;
    return Math.min(...business.services.map(s => s.price));
  }
}
