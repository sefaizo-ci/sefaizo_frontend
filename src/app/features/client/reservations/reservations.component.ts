import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, CANCELLATION_REASONS, CancellationReason } from '../../../core/models';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

type TabType = 'À venir' | 'Passées' | 'Annulées';

@Component({
  selector: 'app-client-reservations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BadgeComponent,
    ButtonComponent,
    FcfaPipe,
    DateFormatPipe,
    ModalComponent
  ],
  template: `
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-secondary mb-2">Mes Réservations</h1>
        <p class="text-secondary-gray">Retrouvez toutes vos réservations et gérez-les</p>
      </div>

      <div class="bg-white rounded-md shadow mb-6">
        <div class="border-b">
          <nav class="flex">
            @for (tab of tabs; track tab) {
              <button
                (click)="setTab(tab)"
                [class]="getTabClass(tab)"
                class="px-6 py-4 text-sm font-medium border-b-2 transition-colors">
                {{ tab }}
                @if (tab === 'À venir' && upcomingCount() > 0) {
                  <span class="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    {{ upcomingCount() }}
                  </span>
                }
              </button>
            }
          </nav>
        </div>
      </div>

      @if (filteredBookings().length === 0) {
        <div class="bg-white rounded-md shadow p-12 text-center">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-secondary mb-2">Aucune réservation</h3>
          <p class="text-secondary-gray mb-6">
            {{ activeTab() === 'À venir' ? 'Vous n\'avez pas de réservations à venir.' : 'Aucune réservation dans cette catégorie.' }}
          </p>
          @if (activeTab() === 'À venir') {
            <a routerLink="/recherche" class="btn-primary inline-block">
              Réserver un service
            </a>
          }
        </div>
      } @else {
        <div class="space-y-4">
          @for (booking of filteredBookings(); track booking.id) {
            <div class="bg-white rounded-md shadow p-6">
              <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h3 class="font-semibold text-secondary text-lg">{{ booking.businessName }}</h3>
                      <p class="text-secondary-gray">{{ booking.service.name }}</p>
                    </div>
                    <app-badge [variant]="getStatusBadgeVariant(booking.status)">
                      {{ getStatusLabel(booking.status) }}
                    </app-badge>
                  </div>

                  <div class="grid sm:grid-cols-3 gap-4 mb-4">
                    <div class="flex items-center gap-2 text-sm text-secondary-gray">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <div class="text-xs">Date</div>
                        <div class="font-medium text-secondary">{{ booking.date | dateFormat: 'long' }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-secondary-gray">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <div>
                        <div class="text-xs">Heure</div>
                        <div class="font-medium text-secondary">{{ booking.time }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-secondary-gray">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      </svg>
                      <div>
                        <div class="text-xs">Lieu</div>
                        <div class="font-medium text-secondary">{{ booking.type === 'SALON' ? 'Au salon' : 'À domicile' }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Cancellation Info -->
                  @if (booking.cancellation) {
                    <div class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                      <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="flex-1">
                          <div class="font-medium text-red-800 mb-1">
                            Annulé par {{ booking.cancellation.cancelledBy === 'CLIENT' ? 'vos soins' : 'le professionnel' }}
                          </div>
                          <div class="text-sm text-red-700">
                            <strong>Motif:</strong> {{ getCancellationReasonLabel(booking.cancellation.reason) }}
                            @if (booking.cancellation.otherReason) {
                              <span> - {{ booking.cancellation.otherReason }}</span>
                            }
                          </div>
                          <div class="text-sm text-red-600 mt-1">
                            {{ booking.cancellation.cancelledAt | dateFormat: 'datetime' }}
                            @if (booking.cancellation.refundAmount) {
                              <span class="ml-2">• Remboursement: {{ booking.cancellation.refundAmount | fcfa }}</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  <div class="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span class="text-sm text-secondary-gray">N° de réservation:</span>
                      <span class="font-medium text-secondary ml-2">{{ booking.bookingNumber }}</span>
                    </div>
                    <div class="text-xl font-bold text-primary">{{ booking.total | fcfa }}</div>
                  </div>
                </div>

                <div class="flex flex-col gap-2 md:border-l md:pl-4">
                  @if (booking.status === 'CONFIRMED' || booking.status === 'PENDING') {
                    <button
                      (click)="openCancelModal(booking)"
                      class="text-red-600 hover:text-red-700 text-sm font-medium text-left">
                      Annuler la réservation
                    </button>
                    @if (isCancellationDeadlineClose(booking)) {
                      <p class="text-xs text-orange-600">
                        ⚠️ Annulation gratuite jusqu'à 24h avant
                      </p>
                    }
                  }
                  @if (booking.status === 'COMPLETED') {
                    <button
                      (click)="leaveReview(booking)"
                      class="text-primary hover:text-primary-dark text-sm font-medium text-left">
                      Laisser un avis
                    </button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Cancel Modal -->
    <app-modal
      [isOpen]="cancelModalOpen()"
      title="Annuler la réservation"
      [showFooter]="false"
      size="lg"
      (closed)="closeCancelModal()">
      <div class="space-y-4">
        <p class="text-secondary-gray">
          Veuillez sélectionner le motif de votre annulation :
        </p>

        <div class="space-y-2">
          @for (reason of cancellationReasons; track reason.value) {
            <label class="flex items-start gap-3 p-3 rounded-md border-2 cursor-pointer transition-all hover:border-primary">
              <input
                type="radio"
                name="cancellationReason"
                [value]="reason.value"
                [(ngModel)]="selectedCancellationReason"
                class="w-4 h-4 text-primary border-gray-300 focus:ring-primary mt-0.5">
              <span class="text-secondary text-sm">{{ reason.label }}</span>
            </label>
          }
        </div>

        @if (selectedCancellationReason === 'OTHER') {
          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Précisez le motif :
            </label>
            <textarea
              [(ngModel)]="otherCancellationReason"
              rows="3"
              placeholder="Décrivez la raison de votre annulation..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
        }

        @if (isCancellationDeadlineClose(selectedBooking())) {
          <div class="bg-orange-50 border border-orange-200 rounded-md p-4">
            <p class="text-sm text-orange-800">
              ⚠️ Attention: L'annulation a lieu moins de 24h avant le rendez-vous. 
              Des frais d'annulation peuvent s'appliquer.
            </p>
          </div>
        }

        <div class="flex justify-end gap-3 pt-4 border-t">
          <button
            (click)="closeCancelModal()"
            class="px-6 py-2 text-secondary font-medium hover:bg-gray-100 rounded-md transition-colors">
            Retour
          </button>
          <button
            (click)="confirmCancel()"
            [disabled]="!selectedCancellationReason || (selectedCancellationReason === 'OTHER' && !otherCancellationReason.trim())"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            Confirmer l'annulation
          </button>
        </div>
      </div>
    </app-modal>
  `,
  styles: []
})
export class ClientReservationsComponent implements OnInit {
  activeTab = signal<TabType>('À venir');
  tabs: TabType[] = ['À venir', 'Passées', 'Annulées'];
  
  allBookings = signal<Booking[]>([]);
  cancelModalOpen = signal(false);
  selectedBooking = signal<Booking | null>(null);
  
  // Cancellation
  selectedCancellationReason: CancellationReason | null = null;
  otherCancellationReason = '';
  cancellationReasons = CANCELLATION_REASONS;

  upcomingCount = computed(() => 
    this.allBookings().filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING').length
  );

  filteredBookings = computed(() => {
    const bookings = this.allBookings();
    const tab = this.activeTab();
    
    return bookings.filter(booking => {
      if (tab === 'À venir') {
        return booking.status === 'CONFIRMED' || booking.status === 'PENDING';
      } else if (tab === 'Passées') {
        return booking.status === 'COMPLETED';
      } else {
        return booking.status === 'CANCELLED';
      }
    });
  });

  constructor(
    private mockData: MockDataService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user();
    if (user) {
      const bookings = this.mockData.getBookingsByClient(user.id);
      this.allBookings.set(bookings);
    }
  }

  setTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  getTabClass(tab: string): string {
    return this.activeTab() === tab
      ? 'border-primary text-primary'
      : 'border-transparent text-secondary-gray hover:text-secondary hover:border-gray-300';
  }

  getStatusBadgeVariant(status: Booking['status']): 'success' | 'warning' | 'error' | 'info' | 'neutral' {
    switch (status) {
      case 'CONFIRMED':
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      case 'NO_SHOW':
        return 'neutral';
      default:
        return 'info';
    }
  }

  getStatusLabel(status: Booking['status']): string {
    const labels = {
      'PENDING': 'En attente',
      'CONFIRMED': 'Confirmé',
      'COMPLETED': 'Terminé',
      'CANCELLED': 'Annulé',
      'NO_SHOW': 'Non présenté'
    };
    return labels[status];
  }

  getCancellationReasonLabel(reason: CancellationReason): string {
    const found = CANCELLATION_REASONS.find(r => r.value === reason);
    return found?.label || reason;
  }

  isCancellationDeadlineClose(booking: Booking | null): boolean {
    if (!booking) return false;
    const now = new Date();
    const bookingDate = new Date(booking.date);
    const hoursDiff = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24;
  }

  openCancelModal(booking: Booking): void {
    this.selectedBooking.set(booking);
    this.selectedCancellationReason = null;
    this.otherCancellationReason = '';
    this.cancelModalOpen.set(true);
  }

  closeCancelModal(): void {
    this.cancelModalOpen.set(false);
    this.selectedBooking.set(null);
  }

  confirmCancel(): void {
    const booking = this.selectedBooking();
    if (!booking || !this.selectedCancellationReason) return;

    const success = this.mockData.cancelBooking(
      booking.id,
      'CLIENT',
      this.selectedCancellationReason,
      this.selectedCancellationReason === 'OTHER' ? this.otherCancellationReason : undefined
    );

    if (success) {
      this.toast.success('Réservation annulée avec succès');
      // Refresh bookings
      const user = this.authService.user();
      if (user) {
        const bookings = this.mockData.getBookingsByClient(user.id);
        this.allBookings.set(bookings);
      }
    } else {
      this.toast.error('Erreur lors de l\'annulation');
    }

    this.closeCancelModal();
  }

  leaveReview(booking: Booking): void {
    this.toast.info('Fonctionnalité d\'avis à venir');
  }
}
