import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SEARCH_CONTENT } from '../data/search.mock';
import { SearchContent } from '../models/search-content.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  getSearchContent(): Observable<SearchContent> {
    // Replace this with an HttpClient call when the backend exposes the search endpoint.
    return of(SEARCH_CONTENT);
  }
}
