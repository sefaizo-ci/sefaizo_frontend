import { Component, Input } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';

import { Testimonial } from '../../../../core/models/home-content.model';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [LucideAngularModule, SectionHeaderComponent],
  templateUrl: './testimonials-section.component.html',
})
export class TestimonialsSectionComponent {
  @Input({ required: true }) testimonials: Testimonial[] = [];

  protected readonly stars = [1, 2, 3, 4, 5];
  protected readonly icons = {
    star: Star,
  };
}
