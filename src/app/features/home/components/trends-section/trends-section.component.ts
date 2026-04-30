import { Component, Input } from '@angular/core';

import { Trend } from '../../../../core/models/home-content.model';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-trends-section',
  standalone: true,
  imports: [PricePipe, SectionHeaderComponent],
  templateUrl: './trends-section.component.html',
})
export class TrendsSectionComponent {
  @Input({ required: true }) trends: Trend[] = [];
}
