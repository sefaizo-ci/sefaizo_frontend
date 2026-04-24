import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container relative max-w-2xl mx-auto">
      <input
        type="text"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        (keyup.enter)="onSearch()"
        class="search-input"
        [disabled]="disabled"
      />
      <button
        type="button"
        (click)="onSearch()"
        [disabled]="disabled || !value.trim()"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .search-input {
      @apply w-full px-5 py-4 pr-16 border-2 border-primary rounded-full text-base
             outline-none ring-4 ring-primary/20
             transition-all duration-200 disabled:bg-gray-100 disabled:border-gray-200 disabled:ring-0;
    }
  `]
})
export class SearchInputComponent {
  @Input() placeholder = 'Search...';
  @Input() disabled = false;
  @Input() value = '';
  
  @Output() search = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }

  onSearch() {
    if (this.value.trim()) {
      this.search.emit(this.value.trim());
    }
  }
}
