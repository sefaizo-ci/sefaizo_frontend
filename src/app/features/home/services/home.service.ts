import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HOME_CONTENT } from '../data/home.mock';
import { HomeContent } from '../models/home-content.model';

@Injectable({
  providedIn: 'root',
})
export class HomeContentService {
  getHomeContent(): Observable<HomeContent> {
    return of(HOME_CONTENT);
  }
}
