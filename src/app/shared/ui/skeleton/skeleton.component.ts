import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (variant === 'text') {
      <div class="animate-pulse bg-gray-200 rounded" [style.height]="height" [style.width]="width"></div>
    } @else if (variant === 'card') {
      <div class="animate-pulse bg-white rounded-md p-4 shadow">
        <div class="h-40 bg-gray-200 rounded-md mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    } @else if (variant === 'avatar') {
      <div class="animate-pulse bg-gray-200 rounded-full" [style.height]="height || '40px'" [style.width]="width || '40px'"></div>
    } @else if (variant === 'table') {
      <div class="animate-pulse space-y-3">
        @for (row of [1,2,3,4,5]; track row) {
          <div class="flex gap-4">
            <div class="h-10 bg-gray-200 rounded flex-1"></div>
            <div class="h-10 bg-gray-200 rounded flex-1"></div>
            <div class="h-10 bg-gray-200 rounded flex-1"></div>
          </div>
        }
      </div>
    } @else if (variant === 'stat') {
      <div class="animate-pulse text-center">
        <div class="h-12 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SkeletonComponent {
  @Input() variant: 'text' | 'card' | 'avatar' | 'table' | 'stat' = 'text';
  @Input() height?: string;
  @Input() width?: string;
}
