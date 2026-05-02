import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Trend } from '../../models/home-content.model';
import { HomeSectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { HomePricePipe } from '../../pipes/home-price.pipe';

@Component({
  selector: 'app-home-trends',
  standalone: true,
  imports: [RouterLink, HomePricePipe, HomeSectionHeaderComponent],
  templateUrl: './trends-section.component.html',
})
export class HomeTrendsSectionComponent {
  @Input({ required: true }) trends: Trend[] = [];

  /** Extrait le mot-clé de recherche à partir du titre d'une tendance */
  searchKey(trend: Trend): string {
    return trend.title.toLowerCase().split(' ')[0];
  }
}
