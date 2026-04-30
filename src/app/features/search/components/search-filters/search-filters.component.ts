import { Component, Input } from '@angular/core';
import {
  Check,
  ChevronDown,
  Flower,
  Home,
  LucideAngularModule,
  MapPin,
  Paintbrush,
  Scissors,
  Sparkles,
  Store,
  UserRound,
  WandSparkles,
} from 'lucide-angular';
import { LucideIconData } from 'lucide-angular';

import { SearchCategoryFilter, SearchFilters } from '../../../../core/models/search-content.model';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [LucideAngularModule, PricePipe],
  templateUrl: './search-filters.component.html',
})
export class SearchFiltersComponent {
  @Input({ required: true }) filters!: SearchFilters;
  @Input({ required: true }) resultCount = 0;

  protected readonly icons = {
    check: Check,
    chevronDown: ChevronDown,
    home: Home,
    mapPin: MapPin,
    star: Sparkles,
    store: Store,
  };

  protected readonly categoryIcons: Record<SearchCategoryFilter['icon'], LucideIconData> = {
    barber: UserRound,
    institute: Sparkles,
    makeup: WandSparkles,
    nails: Paintbrush,
    scissors: Scissors,
    spa: Flower,
    tresses: Scissors,
  };
}
