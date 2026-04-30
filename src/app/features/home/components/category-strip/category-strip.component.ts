import { Component, Input } from '@angular/core';
import {
  Brush,
  Flower,
  LucideAngularModule,
  Paintbrush,
  Scissors,
  Sparkles,
  UserRound,
  WandSparkles,
} from 'lucide-angular';
import { LucideIconData } from 'lucide-angular';

import { Category } from '../../../../core/models/home-content.model';

@Component({
  selector: 'app-category-strip',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './category-strip.component.html',
})
export class CategoryStripComponent {
  @Input({ required: true }) categories: Category[] = [];

  protected readonly icons: Record<Category['icon'], LucideIconData> = {
    barber: UserRound,
    institute: Sparkles,
    makeup: WandSparkles,
    nails: Paintbrush,
    scissors: Scissors,
    spa: Flower,
  };

  protected readonly fallbackIcon = Brush;
}
