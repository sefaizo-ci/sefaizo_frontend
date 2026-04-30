import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Business } from '../../../../core/models/home-content.model';
import { BusinessCardComponent } from '../../../../shared/components/business-card/business-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-business-section',
  standalone: true,
  imports: [BusinessCardComponent, NgClass, SectionHeaderComponent],
  templateUrl: './business-section.component.html',
})
export class BusinessSectionComponent {
  @Input({ required: true }) title = '';
  @Input() linkLabel = 'Voir tout';
  @Input({ required: true }) businesses: Business[] = [];
}
