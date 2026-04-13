import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, CANCELLATION_REASONS, CancellationReason } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-agenda',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FcfaPipe,
    DateFormatPipe,
    BadgeComponent,
    ButtonComponent,
    ModalComponent
  ],
  template: `
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-secondary mb-2">Mon Agenda</h1>
        <p class="text-secondary-gray">Gérez vos rendez-vous et vos disponibilités</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-secondary">{{ stats.total }}</div>
          <div class="text-sm text-secondary-gray">Total</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div>
          <div class="text-sm text-secondary-gray">En attente</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-green-600">{{ stats.confirmed }}</div>
          <div class="text-sm text-secondary-gray">Confirmés</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-blue-600">{{ stats.completed }}</div>
          <div class="text-sm text-secondary-gray">Terminés</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-red-600">{{ stats.cancelled }}</div>
          <div class="text-sm text-secondary-gray">Annulés</div>
        </div>
      </div>

      <!-- Filter -->
      <div class="bg-white rounded-md shadow p-4 mb-6">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-secondary-gray mb-2">Filtrer par statut</label>
            <select
              [(ngModel)]="statusFilter"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="CONFIRMED">Confirmé</option>
              <option value="COMPLETED">Terminé</option>
              <option value="CANCELLED">Annulé</option>
            </select>
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-secondary-gray mb-2">Rechercher</label>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Nom du client..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          </div>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="bg-white rounded-md shadow">
        <div class="p-6 border-b">
          <h2 class="text-lg font-bold text-secondary">Rendez-vous</h2>
        </div>

        @if (filteredBookings().length === 0) {
          <div class="p-12 text-center">
            <p class="text-secondary-gray">Aucun rendez-vous trouvé</p>
          </div>
        } @else {
          <div class="divide-y">
            @for (booking of filteredBookings(); track booking.id) {
              <div class="p-6">
                <div class="flex justify-between items-start">
                  <div class="flex items-start gap-4">
                    <img
                      [src]="booking.clientAvatar || 'https://via.placeholder.com/50?img=1'"
                      [alt]="booking.clientName"
                      class="w-12 h-12 rounded-full object-cover">
                    <div>
                      <div class="flex items-center gap-3 mb-1">
                        <h3 class="font-semibold text-secondary">{{ booking.clientName }}</h3>
                        <app-badge [variant]="getStatusBadgeVariant(booking.status)">
                          {{ getStatusLabel(booking.status) }}
                        </app-badge>
                      </div>
                      <p class="text-secondary-gray">{{ booking.service.name }}</p>
                      <div class="flex flex-wrap gap-4 mt-2 text-sm text-secondary-gray">
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          {{ booking.date | dateFormat: 'long' }}
                        </span>
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {{ booking.time }} ({{ booking.duration }} min)
                        </span>
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          </svg>
                          {{ booking.type === 'SALON' ? 'Au salon' : 'À domicile' }}
                        </span>
                      </div>

                      <!-- Cancellation Info -->
                      @if (booking.cancellation) {
                        <div class="mt-3 bg-red-50 border border-red-200 rounded-md p-3">
                          <div class="text-sm text-red-800">
                            <strong>Annulé par {{ booking.cancellation.cancelledBy === 'CLIENT' ? 'le client' : 'vous' }}</strong>
                            <br>
                            Motif: {{ getCancellationReasonLabel(booking.cancellation.reason) }}
                            @if (booking.cancellation.otherReason) {
                              <span> - {{ booking.cancellation.otherReason }}</span>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="text-xl font-bold text-primary mb-3">{{ booking.total | fcfa }}</div>
                    <div class="flex flex-col gap-2">
                      @if (booking.status === 'PENDING') {
                        <button (click)="confirmBooking(booking)" class="btn-primary text-sm py-2">
                          Confirmer
                        </button>
                        <button (click)="openCancelModal(booking)" class="text-red-600 hover:text-red-700 text-sm">
                          Refuser
                        </button>
                      }
                      @if (booking.status === 'CONFIRMED') {
                        <button (click)="completeBooking(booking)" class="btn-primary text-sm py-2">
                          Marquer comme fait
                        </button>
                        <button (click)="openCancelModal(booking)" class="text-red-600 hover:text-red-700 text-sm">
                          Annuler
                        </button>
                      }
                      @if (booking.status === 'COMPLETED') {
                        <span class="text-sm text-secondary-gray">Terminé</span>
                      }
                      @if (booking.status === 'CANCELLED') {
                        <span class="text-sm text-red-600">Annulé</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>

    <!-- Cancel Modal -->
    <app-modal
      [isOpen]="cancelModalOpen()"
      title="Annuler le rendez-vous"
      [showFooter]="false"
      size="lg"
      (closed)="closeCancelModal()">
      <div class="space-y-4">
        <p class="text-secondary-gray">
          Veuillez sélectionner le motif de l'annulation :
        </p>

        <div class="space-y-2">
          @for (reason of proCancellationReasons; track reason.value) {
            <label class="flex items-start gap-3 p-3 rounded-md border-2 cursor-pointer transition-all hover:border-primary">
              <input
                type="radio"
                name="proCancellationReason"
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
              placeholder="Décrivez la raison de l'annulation..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
        }

        <!-- Refer other businesses -->
        <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
          <label class="flex items-start gap-3">
            <input
              type="checkbox"
              [(ngModel)]="suggestAlternatives"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-0.5">
            <div>
              <div class="font-medium text-blue-900 text-sm">Suggérer d'autres professionnels</div>
              <div class="text-sm text-blue-700">
                Recommander d'autres salons à ce client en cas d'annulation
              </div>
            </div>
          </label>
        </div>

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
export class ProAgendaComponent implements OnInit {
  allBookings = signal<Booking[]>([]);
  statusFilter = '';
  searchQuery = '';
  
  cancelModalOpen = signal(false);
  selectedBooking = signal<Booking | null>(null);
  selectedCancellationReason: CancellationReason | null = null;
  otherCancellationReason = '';
  suggestAlternatives = false;

  stats = {
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  };

  proCancellationReasons = [
    { value: 'PRO_UNAVAILABLE', label: 'Professionnel indisponible' },
    { value: 'OVERBOOKED', label: 'Surbooké / Trop de réservations' },
    { value: 'PERSONAL_EMERGENCY', label: 'Urgence personnelle' },
    { value: 'SCHEDULE_CONFLICT', label: 'Conflit d\'horaire' },
    { value: 'OTHER', label: 'Autre' }
  ];

  filteredBookings = computed(() => {
    let bookings = this.allBookings();
    
    if (this.statusFilter) {
      bookings = bookings.filter(b => b.status === this.statusFilter);
    }
    
    if (this.searchQuery) {
      bookings = bookings.filter(b => 
        b.clientName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    return bookings.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  });

  constructor(
    private mockData: MockDataService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const user = this.authService.user();
    if (user) {
      const bookings = this.mockData.getBookingsByProfessional(user.id);
      this.allBookings.set(bookings);
      this.updateStats();
    }
  }

  updateStats(): void {
    const bookings = this.allBookings();
    this.stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'PENDING').length,
      confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
      completed: bookings.filter(b => b.status === 'COMPLETED').length,
      cancelled: bookings.filter(b => b.status === 'CANCELLED').length
    };
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
    const found = [...this.proCancellationReasons, ...CANCELLATION_REASONS].find(r => r.value === reason);
    return found?.label || reason;
  }

  confirmBooking(booking: Booking): void {
    // In real app, call API
    this.toast.success('Rendez-vous confirmé');
    this.loadBookings();
  }

  completeBooking(booking: Booking): void {
    const success = this.mockData.completeBooking(booking.id);
    if (success) {
      this.toast.success('Rendez-vous marqué comme terminé');
      this.loadBookings();
    }
  }

  openCancelModal(booking: Booking): void {
    this.selectedBooking.set(booking);
    this.selectedCancellationReason = null;
    this.otherCancellationReason = '';
    this.suggestAlternatives = false;
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
      'PRO',
      this.selectedCancellationReason,
      this.selectedCancellationReason === 'OTHER' ? this.otherCancellationReason : undefined
    );

    if (success) {
      this.toast.success('Rendez-vous annulé');
      
      // If suggestAlternatives is checked, create referrals
      if (this.suggestAlternatives) {
        // In real app, this would notify other businesses
        this.toast.info('Autres professionnels suggérés au client');
      }
      
      this.loadBookings();
    } else {
      this.toast.error('Erreur lors de l\'annulation');
    }

    this.closeCancelModal();
  }
}
