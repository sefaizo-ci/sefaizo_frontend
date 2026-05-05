import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { Business } from '../../../../../core/models';
import { FcfaPipe } from '../../../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-search-salon-card',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, FcfaPipe],
  templateUrl: './search-salon-card.component.html',
})
export class SearchSalonCardComponent {
  @Input({ required: true }) business!: Business;

  get minPrice(): number {
    if (!this.business.services?.length) return 0;
    return Math.min(...this.business.services.map(s => s.price));
  }
}
