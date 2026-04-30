import { Component, Input } from '@angular/core';
import { Calendar, LucideAngularModule, Star, Store, Users } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular';

import { StatItem } from '../../../../core/models/home-content.model';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './stats-section.component.html',
})
export class StatsSectionComponent {
  @Input({ required: true }) stats: StatItem[] = [];

  protected readonly icons: Record<StatItem['icon'], LucideIconData> = {
    calendar: Calendar,
    star: Star,
    store: Store,
    users: Users,
  };
}
