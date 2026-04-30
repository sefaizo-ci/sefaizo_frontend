import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SearchService } from '../../../../core/services/search.service';
import { SiteHeaderComponent } from '../../../home/components/site-header/site-header.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { SearchResultsToolbarComponent } from '../../components/search-results-toolbar/search-results-toolbar.component';
import { SearchSalonCardComponent } from '../../components/search-salon-card/search-salon-card.component';

@Component({
  selector: 'app-search-results-page',
  standalone: true,
  imports: [
    AsyncPipe,
    SearchFiltersComponent,
    SearchResultsToolbarComponent,
    SearchSalonCardComponent,
    SiteHeaderComponent,
  ],
  templateUrl: './search-results-page.component.html',
})
export class SearchResultsPageComponent {
  private readonly searchService = inject(SearchService);

  protected readonly content$ = this.searchService.getSearchContent();
}
