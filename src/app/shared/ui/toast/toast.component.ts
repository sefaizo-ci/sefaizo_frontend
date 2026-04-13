import { Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (toast of toasts(); track toast.id) {
        <div
          [class]="getToastClass(toast.type)"
          class="flex items-center gap-3 px-4 py-3 rounded-md shadow-lg min-w-[300px] animate-slide-right"
          role="alert">
          <!-- Icon -->
          <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            @if (toast.type === 'success') {
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            } @else if (toast.type === 'error') {
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            } @else if (toast.type === 'warning') {
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            } @else {
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            }
          </svg>
          
          <!-- Message -->
          <span class="flex-1 text-sm font-medium">{{ toast.message }}</span>
          
          <!-- Close button -->
          <button (click)="remove(toast.id)" class="text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slideRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .animate-slide-right {
      animation: slideRight 0.3s ease-out;
    }
  `]
})
export class ToastContainerComponent {
  toasts = signal<Toast[]>([]);

  add(toast: Omit<Toast, 'id'>): string {
    const id = `toast-${Date.now()}`;
    const newToast: Toast = {
      id,
      ...toast,
      duration: toast.duration ?? 5000
    };
    
    this.toasts.set([...this.toasts(), newToast]);
    
    if (newToast.duration !== 0) {
      setTimeout(() => this.remove(id), newToast.duration);
    }
    
    return id;
  }

  remove(id: string): void {
    this.toasts.set(this.toasts().filter(t => t.id !== id));
  }

  success(message: string, duration?: number): string {
    return this.add({ type: 'success', message, duration });
  }

  error(message: string, duration?: number): string {
    return this.add({ type: 'error', message, duration });
  }

  warning(message: string, duration?: number): string {
    return this.add({ type: 'warning', message, duration });
  }

  info(message: string, duration?: number): string {
    return this.add({ type: 'info', message, duration });
  }

  getToastClass(type: ToastType): string {
    const classes = {
      success: 'bg-green-50 text-green-800 border border-green-200',
      error: 'bg-red-50 text-red-800 border border-red-200',
      warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      info: 'bg-blue-50 text-blue-800 border border-blue-200'
    };
    return classes[type];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private container?: ToastContainerComponent;

  setContainer(container: ToastContainerComponent): void {
    this.container = container;
  }

  success(message: string, duration?: number): string {
    return this.container?.success(message, duration) || '';
  }

  error(message: string, duration?: number): string {
    return this.container?.error(message, duration) || '';
  }

  warning(message: string, duration?: number): string {
    return this.container?.warning(message, duration) || '';
  }

  info(message: string, duration?: number): string {
    return this.container?.info(message, duration) || '';
  }
}
