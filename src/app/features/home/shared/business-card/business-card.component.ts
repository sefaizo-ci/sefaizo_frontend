import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { Business } from '../../models/home-content.model';
import { HomePricePipe } from '../../pipes/home-price.pipe';

@Component({
  selector: 'app-home-business-card',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, HomePricePipe],
  templateUrl: './business-card.component.html',
})
export class HomeBusinessCardComponent {
  @Input({ required: true }) business!: Business;
}
