import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClass">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() size: 'sm' | 'md' = 'sm';

  get badgeClass(): string {
    const baseClass = 'inline-flex items-center font-medium rounded-full';
    
    const variantClasses = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      neutral: 'bg-gray-100 text-gray-800'
    };

    const sizeClasses = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm'
    };

    return `${baseClass} ${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }
}
