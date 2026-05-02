import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { StatItem } from '../../models/home-content.model';

@Component({
  selector: 'app-home-stats',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './stats-section.component.html',
})
export class HomeStatsSectionComponent {
  @Input({ required: true }) stats: StatItem[] = [];

  protected readonly iconNames: Record<StatItem['icon'], string> = {
    calendar: 'calendar',
    star: 'star',
    store: 'store',
    users: 'users',
  };
}
