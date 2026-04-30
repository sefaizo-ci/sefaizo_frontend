import { Component, Input } from '@angular/core';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './section-header.component.html',
})
export class SectionHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() linkLabel = 'Voir tout';
  @Input() showLink = true;

  protected readonly icons = {
    chevronRight: ChevronRight,
  };
}
