import { Component, Input } from '@angular/core';
import { Calendar, ChevronDown, LucideAngularModule, MapPin, Search, Star, Users } from 'lucide-angular';

import { HeroContent } from '../../../../core/models/home-content.model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  @Input({ required: true }) hero!: HeroContent;

  protected readonly icons = {
    calendar: Calendar,
    chevronDown: ChevronDown,
    mapPin: MapPin,
    search: Search,
    star: Star,
    users: Users,
  };
}
