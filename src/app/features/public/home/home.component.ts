import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HomeContentService } from '../../home/services/home.service';
import { HomeHeroSectionComponent } from '../../home/components/hero-section/hero-section.component';
import { HomeCategoryStripComponent } from '../../home/components/category-strip/category-strip.component';
import { HomeBusinessSectionComponent } from '../../home/components/business-section/business-section.component';
import { HomeTrendsSectionComponent } from '../../home/components/trends-section/trends-section.component';
import { HomeTestimonialsSectionComponent } from '../../home/components/testimonials-section/testimonials-section.component';
import { HomeAppDownloadSectionComponent } from '../../home/components/app-download-section/app-download-section.component';
import { HomeStatsSectionComponent } from '../../home/components/stats-section/stats-section.component';
import { HomeCtaSectionComponent } from '../../home/components/cta-section/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    HomeHeroSectionComponent,
    HomeCategoryStripComponent,
    HomeBusinessSectionComponent,
    HomeTrendsSectionComponent,
    HomeTestimonialsSectionComponent,
    HomeAppDownloadSectionComponent,
    HomeStatsSectionComponent,
    HomeCtaSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly homeService = inject(HomeContentService);

  protected readonly content$ = this.homeService.getHomeContent();
}
