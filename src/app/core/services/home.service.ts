import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HOME_CONTENT } from '../data/home.mock';
import { HomeContent } from '../models/home-content.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getHomeContent(): Observable<HomeContent> {
    // Replace this with an HttpClient call when the backend exposes the home endpoint.
    return of(HOME_CONTENT);
  }
}
