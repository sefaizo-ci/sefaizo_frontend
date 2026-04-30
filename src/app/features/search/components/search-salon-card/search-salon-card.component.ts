import { Component, Input } from '@angular/core';
import { LucideAngularModule, MapPin, Star } from 'lucide-angular';

import { SearchSalon } from '../../../../core/models/search-content.model';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-search-salon-card',
  standalone: true,
  imports: [LucideAngularModule, PricePipe],
  templateUrl: './search-salon-card.component.html',
})
export class SearchSalonCardComponent {
  @Input({ required: true }) salon!: SearchSalon;

  protected readonly icons = {
    mapPin: MapPin,
    star: Star,
  };
}
