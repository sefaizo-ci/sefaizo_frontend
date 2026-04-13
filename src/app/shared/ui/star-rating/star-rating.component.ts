import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-0.5">
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <svg
          [class]="getStarClass(star)"
          fill="currentColor"
          viewBox="0 0 20 20"
          [style.width]="size"
          [style.height]="size">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      }
      @if (showValue) {
        <span class="ml-2 text-sm font-medium" [class]="valueClass">{{ rating.toFixed(1) }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() size = '1rem';
  @Input() showValue = false;
  @Input() valueClass = 'text-secondary';

  getStarClass(star: number): string {
    const baseClass = 'transition-colors';
    if (star <= Math.floor(this.rating)) {
      return `${baseClass} text-accent-star`;
    } else if (star - 0.5 <= this.rating) {
      return `${baseClass} text-accent-star opacity-50`;
    } else {
      return `${baseClass} text-gray-300`;
    }
  }
}
