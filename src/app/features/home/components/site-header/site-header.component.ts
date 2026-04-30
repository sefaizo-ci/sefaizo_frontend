import { Component } from '@angular/core';

@Component({
  selector: 'app-site-header',
  standalone: true,
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  protected readonly navItems = ['Accueil', 'Explorer', 'Comment ça marche'];
}
