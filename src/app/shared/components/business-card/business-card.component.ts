import { Component, Input } from '@angular/core';
import { Heart, LucideAngularModule, MapPin, Star } from 'lucide-angular';

import { Business } from '../../../core/models/home-content.model';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [LucideAngularModule, PricePipe],
  templateUrl: './business-card.component.html',
})
export class BusinessCardComponent {
  @Input({ required: true }) business!: Business;

  protected readonly icons = {
    heart: Heart,
    mapPin: MapPin,
    star: Star,
  };
}
