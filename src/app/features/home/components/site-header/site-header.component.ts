import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  @Input() activeItem: 'Accueil' | 'Explorer' | 'Comment ça marche' = 'Accueil';
  @Input() layout: 'default' | 'wide' = 'default';

  protected readonly navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Explorer', path: '/recherche' },
    { label: 'Comment ça marche', path: '/' },
  ] as const;
}
