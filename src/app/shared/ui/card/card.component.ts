import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClass">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() variant: 'default' | 'review' | 'stat' = 'default';
  @Input() hoverable = true;

  get cardClass(): string {
    const baseClass = 'bg-white rounded-md p-6 transition-all duration-200';
    
    const variantClasses = {
      default: 'shadow hover:shadow-md',
      review: 'shadow p-6 min-w-[300px] max-w-[350px] hover:shadow-md',
      stat: 'text-center p-6'
    };

    return `${baseClass} ${variantClasses[this.variant]}`;
  }
}
