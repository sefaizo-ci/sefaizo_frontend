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
  @Input() viewMode: 'GRID' | 'LIST' = 'GRID';

  @Output() sortChange = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<'GRID' | 'LIST'>();

  getGridBtnClass(): string {
    if (this.viewMode === 'GRID') {
      return 'inline-flex w-9 items-center justify-center transition-colors bg-[#7c3aed] text-white';
    }
    return 'inline-flex w-9 items-center justify-center transition-colors text-[#66708d] hover:text-[#7c3aed]';
  }

  getListBtnClass(): string {
    if (this.viewMode === 'LIST') {
      return 'inline-flex w-9 items-center justify-center border-l border-[#e7e9f4] transition-colors bg-[#7c3aed] text-white';
    }
    return 'inline-flex w-9 items-center justify-center border-l border-[#e7e9f4] transition-colors text-[#66708d] hover:text-[#7c3aed]';
  }
}
