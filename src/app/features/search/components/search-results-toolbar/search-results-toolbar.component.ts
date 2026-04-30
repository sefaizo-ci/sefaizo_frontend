import { Component, Input } from '@angular/core';
import { ChevronDown, Grid2X2, List, LucideAngularModule, SlidersHorizontal } from 'lucide-angular';

@Component({
  selector: 'app-search-results-toolbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './search-results-toolbar.component.html',
})
export class SearchResultsToolbarComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';
  @Input({ required: true }) sortLabel = '';

  protected readonly icons = {
    chevronDown: ChevronDown,
    grid: Grid2X2,
    list: List,
    sliders: SlidersHorizontal,
  };
}
