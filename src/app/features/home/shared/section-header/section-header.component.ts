import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home-section-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './section-header.component.html',
})
export class HomeSectionHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() linkLabel = 'Voir tout';
  @Input() showLink = true;
}
