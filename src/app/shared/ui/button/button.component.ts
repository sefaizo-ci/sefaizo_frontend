import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'app-store';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClass"
      [type]="type"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;

  @Output() onClick = new EventEmitter<Event>();

  get buttonClass(): string {
    const baseClass = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark hover:shadow-md hover:-translate-y-0.5 focus:ring-primary',
      secondary: 'bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white focus:ring-primary',
      'app-store': 'bg-secondary text-white px-5 py-2.5 rounded-md items-center gap-2 hover:bg-black hover:shadow-md focus:ring-secondary'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';
    
    return `${baseClass} ${variantClasses[this.variant]} ${widthClass}`;
  }
}
