import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Business } from '../../models/home-content.model';
import { HomeBusinessCardComponent } from '../../shared/business-card/business-card.component';
import { HomeSectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-home-business-section',
  standalone: true,
  imports: [HomeBusinessCardComponent, NgClass, HomeSectionHeaderComponent],
  templateUrl: './business-section.component.html',
})
export class HomeBusinessSectionComponent {
  @Input({ required: true }) title = '';
  @Input() linkLabel = 'Voir tout';
  @Input({ required: true }) businesses: Business[] = [];
}
