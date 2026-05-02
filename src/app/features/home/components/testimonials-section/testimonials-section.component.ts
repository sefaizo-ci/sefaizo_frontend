import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { Testimonial } from '../../models/home-content.model';
import { HomeSectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [LucideAngularModule, HomeSectionHeaderComponent],
  templateUrl: './testimonials-section.component.html',
})
export class HomeTestimonialsSectionComponent {
  @Input({ required: true }) testimonials: Testimonial[] = [];

  protected readonly stars = [1, 2, 3, 4, 5];
}
