import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface CategoryWithCount {
  name: string;
  count: number;
  icon?: string;
}

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './search-filters.component.html',
})
export class SearchFiltersComponent {
  @Input({ required: true }) categories: CategoryWithCount[] = [];
  @Input({ required: true }) communes: string[] = [];
  @Input({ required: true }) selectedCategories: string[] = [];
  @Input({ required: true }) selectedCommune = '';
  @Input({ required: true }) minRating = 0;
  @Input({ required: true }) maxPrice = 50000;
  @Input({ required: true }) businessType: 'SALON' | 'FREELANCE' | null = null;
  @Input({ required: true }) resultCount = 0;

  @Output() communeChange = new EventEmitter<string>();
  @Output() categoryToggle = new EventEmitter<string>();
  @Output() ratingChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<number>();
  @Output() businessTypeToggle = new EventEmitter<'SALON' | 'FREELANCE'>();
  @Output() reset = new EventEmitter<void>();

  readonly MAX_PRICE = 50000;

  readonly rdvTypes: { id: 'SALON' | 'FREELANCE'; label: string; icon: string }[] = [
    { id: 'SALON', label: 'En salon', icon: 'store' },
    { id: 'FREELANCE', label: 'À domicile', icon: 'home' },
  ];

  // Mapping des icônes de ServiceCategory vers les noms d'icônes Lucide
  readonly categoryIconNames: Record<string, string> = {
    'cut':      'scissors',
    'sparkles': 'sparkles',
    'hand':     'paintbrush',
    'foot':     'footprints',
    'user':     'user-round',
    'brush':    'wand-sparkles',
    'face':     'smile',
    'spa':      'flower',
  };

  getCategoryIcon(icon?: string): string {
    return (icon && this.categoryIconNames[icon]) || 'scissors';
  }

  onRatingClick(star: number): void {
    this.ratingChange.emit(this.minRating === star ? 0 : star);
  }

  getRdvBtnClass(typeId: string): string {
    const base = 'flex h-11 w-full items-center justify-center gap-1.5 rounded-full border text-[13px] font-bold transition-all px-3';
    if (this.businessType === typeId) {
      return `${base} border-[#7c3aed] bg-[#f3f0ff] text-[#7c3aed]`;
    }
    return `${base} border-[#e7e9f4] bg-white text-[#69708a]`;
  }
}
