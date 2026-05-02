import { Component, Input } from '@angular/core';

import { Trend } from '../../models/home-content.model';
import { HomeSectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { HomePricePipe } from '../../pipes/home-price.pipe';

@Component({
  selector: 'app-home-trends',
  standalone: true,
  imports: [HomePricePipe, HomeSectionHeaderComponent],
  templateUrl: './trends-section.component.html',
})
export class HomeTrendsSectionComponent {
  @Input({ required: true }) trends: Trend[] = [];
}
