import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search-results-toolbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './search-results-toolbar.component.html',
})
export class SearchResultsToolbarComponent {
  @Input({ required: true }) resultCount = 0;
  @Input() searchQuery = '';
  @Input() sortBy = 'RELEVANCE';

  @Output() sortChange = new EventEmitter<string>();
}
