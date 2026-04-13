import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 transition-opacity"
          (click)="onBackdropClick()">
        </div>

        <!-- Modal Center -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative bg-white rounded-lg shadow-xl max-w-md w-full"
            [class.max-w-lg]="size === 'lg'"
            [class.max-w-sm]="size === 'sm'"
            @modalAnimation>
            
            <!-- Header -->
            @if (title || showCloseButton) {
              <div class="flex items-center justify-between p-4 border-b">
                @if (title) {
                  <h3 class="text-lg font-semibold text-secondary">{{ title }}</h3>
                }
                @if (showCloseButton) {
                  <button
                    (click)="close()"
                    class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                }
              </div>
            }

            <!-- Body -->
            <div class="p-4">
              <ng-content></ng-content>
            </div>

            <!-- Footer -->
            @if (showFooter) {
              <div class="flex justify-end gap-3 p-4 border-t">
                @if (showCancel) {
                  <button
                    (click)="close()"
                    class="px-4 py-2 text-secondary font-medium hover:bg-gray-100 rounded-md transition-colors">
                    {{ cancelText }}
                  </button>
                }
                <button
                  (click)="confirm()"
                  [disabled]="loading"
                  class="btn-primary inline-flex items-center gap-2">
                  @if (loading) {
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                  {{ confirmText }}
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  animations: []
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showCloseButton = true;
  @Input() showFooter = false;
  @Input() showCancel = true;
  @Input() confirmText = 'Confirmer';
  @Input() cancelText = 'Annuler';
  @Input() loading = false;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  onBackdropClick(): void {
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }
}
