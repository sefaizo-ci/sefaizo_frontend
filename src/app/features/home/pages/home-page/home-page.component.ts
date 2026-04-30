import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HomeService } from '../../../../core/services/home.service';
import { AppDownloadSectionComponent } from '../../components/app-download-section/app-download-section.component';
import { BusinessSectionComponent } from '../../components/business-section/business-section.component';
import { CategoryStripComponent } from '../../components/category-strip/category-strip.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { StatsSectionComponent } from '../../components/stats-section/stats-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { TrendsSectionComponent } from '../../components/trends-section/trends-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    AppDownloadSectionComponent,
    BusinessSectionComponent,
    CategoryStripComponent,
    CtaSectionComponent,
    HeroSectionComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    StatsSectionComponent,
    TestimonialsSectionComponent,
    TrendsSectionComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private readonly homeService = inject(HomeService);

  protected readonly content$ = this.homeService.getHomeContent();
}
