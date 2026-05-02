import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { Category } from '../../models/home-content.model';

@Component({
  selector: 'app-home-category-strip',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './category-strip.component.html',
})
export class HomeCategoryStripComponent {
  @Input({ required: true }) categories: Category[] = [];

  protected readonly iconNames: Record<Category['icon'], string> = {
    barber: 'user-round',
    institute: 'sparkles',
    makeup: 'wand-sparkles',
    nails: 'paintbrush',
    scissors: 'scissors',
    spa: 'flower',
  };

  protected readonly fallbackIconName = 'brush';

  constructor(private router: Router) {}

  navigateToSearch(category: Category): void {
    this.router.navigate(['/recherche'], {
      queryParams: { category: category.searchKey }
    });
  }
}
