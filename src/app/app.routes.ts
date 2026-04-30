import { Routes } from '@angular/router';

import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { SearchResultsPageComponent } from './features/search/pages/search-results-page/search-results-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'recherche',
    component: SearchResultsPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
