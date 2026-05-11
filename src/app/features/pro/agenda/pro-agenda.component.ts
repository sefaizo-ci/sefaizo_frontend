import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, CANCELLATION_REASONS, CancellationReason } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, FcfaPipe, DateFormatPipe, ModalComponent],
  template: `
    <div>
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-[28px] font-black text-[#11152f] m-0">Mon Agenda</h1>
        <p class="mt-1 text-base text-[#69708a]">Gérez vos rendez-vous et vos disponibilités</p>
      </div>

      <!-- ── Cartes stats (cliquables = filtre) ── -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-7">

        <!-- Total -->
        <div (click)="setFilter('')"
             class="rounded-2xl border p-5 cursor-pointer transition-all select-none"
             [ngClass]="statusFilter() === ''
               ? 'bg-[#f7f5ff] border-[#7c3aed] ring-2 ring-[#7c3aed]/30'
               : 'bg-white border-[#e7e9f4] hover:border-[#c4b5fd]'">
          <div class="text-[28px] font-black text-[#11152f]">{{ stats().total }}</div>
          <div class="text-sm font-bold mt-0.5"
               [ngClass]="statusFilter() === '' ? 'text-[#7c3aed]' : 'text-[#69708a]'">Total</div>
        </div>

        <!-- En attente -->
        <div (click)="setFilter('PENDING')"
             class="rounded-2xl border p-5 cursor-pointer transition-all select-none"
             [ngClass]="statusFilter() === 'PENDING'
               ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300/40'
               : 'bg-white border-[#e7e9f4] hover:border-amber-300'">
          <div class="text-[28px] font-black text-[#d97706]">{{ stats().pending }}</div>
          <div class="text-sm font-bold mt-0.5"
               [ngClass]="statusFilter() === 'PENDING' ? 'text-amber-700' : 'text-[#69708a]'">En attente</div>
        </div>

        <!-- Confirmés -->
        <div (click)="setFilter('CONFIRMED')"
             class="rounded-2xl border p-5 cursor-pointer transition-all select-none"
             [ngClass]="statusFilter() === 'CONFIRMED'
               ? 'bg-[#f3e8ff] border-[#7c3aed] ring-2 ring-[#7c3aed]/30'
               : 'bg-white border-[#e7e9f4] hover:border-[#c4b5fd]'">
          <div class="text-[28px] font-black text-[#7c3aed]">{{ stats().confirmed }}</div>
          <div class="text-sm font-bold mt-0.5"
               [ngClass]="statusFilter() === 'CONFIRMED' ? 'text-[#7c3aed]' : 'text-[#69708a]'">Confirmés</div>
        </div>

        <!-- Terminés -->
        <div (click)="setFilter('COMPLETED')"
             class="rounded-2xl border p-5 cursor-pointer transition-all select-none"
             [ngClass]="statusFilter() === 'COMPLETED'
               ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300/40'
               : 'bg-white border-[#e7e9f4] hover:border-emerald-300'">
          <div class="text-[28px] font-black text-[#10b45e]">{{ stats().completed }}</div>
          <div class="text-sm font-bold mt-0.5"
               [ngClass]="statusFilter() === 'COMPLETED' ? 'text-emerald-700' : 'text-[#69708a]'">Terminés</div>
        </div>

        <!-- Annulés -->
        <div (click)="setFilter('CANCELLED')"
             class="rounded-2xl border p-5 cursor-pointer transition-all select-none"
             [ngClass]="statusFilter() === 'CANCELLED'
               ? 'bg-red-50 border-red-400 ring-2 ring-red-300/40'
               : 'bg-white border-[#e7e9f4] hover:border-red-300'">
          <div class="text-[28px] font-black text-[#dc2626]">{{ stats().cancelled }}</div>
          <div class="text-sm font-bold mt-0.5"
               [ngClass]="statusFilter() === 'CANCELLED' ? 'text-red-700' : 'text-[#69708a]'">Annulés</div>
        </div>

      </div>

      <!-- ── Barre de filtres ── -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5 mb-6">
        <div class="flex flex-wrap gap-4">

          <!-- Filtre statut -->
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-black text-[#11152f] mb-2">Statut</label>
            <select [value]="statusFilter()"
                    (change)="setFilter($any($event.target).value)"
                    class="w-full h-10 rounded-full border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 cursor-pointer">
              <option value="">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="CONFIRMED">Confirmé</option>
              <option value="COMPLETED">Terminé</option>
              <option value="CANCELLED">Annulé</option>
            </select>
          </div>

          <!-- Recherche client -->
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-black text-[#11152f] mb-2">Rechercher</label>
            <div class="relative">
              <lucide-icon name="search" [size]="15" [strokeWidth]="2"
                class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#69708a]">
              </lucide-icon>
              <input type="text"
                     [value]="searchQuery()"
                     (input)="searchQuery.set($any($event.target).value)"
                     placeholder="Nom du client..."
                     class="w-full h-10 rounded-full border border-[#e7e9f4] pl-14 pr-4 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
            </div>
          </div>

          <!-- Bouton reset -->
          @if (statusFilter() || searchQuery()) {
            <div class="flex items-end">
              <button (click)="resetFilters()"
                class="h-10 px-4 rounded-full border border-[#e7e9f4] text-sm font-bold text-[#69708a] hover:bg-[#f0f1f6] transition-colors flex items-center gap-2">
                <lucide-icon name="x" [size]="14" [strokeWidth]="2.5"></lucide-icon>
                Réinitialiser
              </button>
            </div>
          }

        </div>
      </div>

      <!-- ── Liste Rendez-vous ── -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] overflow-hidden">
        <div class="px-6 py-5 border-b border-[#e7e9f4] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h2 class="text-[17px] font-black text-[#11152f] m-0">Rendez-vous</h2>
            @if (statusFilter()) {
              <span class="text-[11px] font-black px-2.5 py-1 rounded-full"
                    [style.background]="filterBadgeBg()"
                    [style.color]="filterBadgeColor()">
                {{ filterLabel() }}
              </span>
            }
          </div>
          <span class="text-sm font-bold text-[#69708a]">
            {{ filteredBookings().length }} résultat{{ filteredBookings().length > 1 ? 's' : '' }}
          </span>
        </div>

        @if (filteredBookings().length === 0) {
          <div class="py-16 text-center">
            <lucide-icon name="calendar-x" [size]="40" [strokeWidth]="1.5" class="text-[#d9dbe9] mx-auto mb-3"></lucide-icon>
            <p class="text-base font-bold text-[#69708a]">Aucun rendez-vous trouvé</p>
            @if (statusFilter() || searchQuery()) {
              <button (click)="resetFilters()"
                class="mt-4 text-sm font-bold text-[#7c3aed] hover:underline">
                Effacer les filtres
              </button>
            }
          </div>
        } @else {
          <div class="divide-y divide-[#e7e9f4]">
            @for (booking of filteredBookings(); track booking.id) {
              <div class="p-6 hover:bg-[#faf9ff] transition-colors">
                <div class="flex justify-between items-start gap-4">

                  <!-- Avatar + infos -->
                  <div class="flex items-start gap-4 min-w-0">
                    <div class="w-12 h-12 rounded-xl overflow-hidden bg-[#f0f1f6] flex-shrink-0">
                      @if (booking.clientAvatar) {
                        <img [src]="booking.clientAvatar" [alt]="booking.clientName"
                             class="w-full h-full object-cover">
                      } @else {
                        <div class="w-full h-full flex items-center justify-center text-white text-sm font-black"
                             style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
                          {{ booking.clientName.charAt(0) }}
                        </div>
                      }
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center flex-wrap gap-2 mb-1">
                        <h3 class="text-base font-black text-[#11152f] m-0">{{ booking.clientName }}</h3>
                        <span [class]="getStatusClass(booking.status)">{{ getStatusLabel(booking.status) }}</span>
                      </div>
                      <p class="text-sm font-bold text-[#7c3aed] mb-2">{{ booking.service.name }}</p>
                      <div class="flex flex-wrap gap-4 text-sm font-bold text-[#69708a]">
                        <span class="flex items-center gap-1.5">
                          <lucide-icon name="calendar-days" [size]="14" [strokeWidth]="2"></lucide-icon>
                          {{ booking.date | dateFormat:'long' }}
                        </span>
                        <span class="flex items-center gap-1.5">
                          <lucide-icon name="clock" [size]="14" [strokeWidth]="2"></lucide-icon>
                          {{ booking.time }} · {{ booking.duration }} min
                        </span>
                        <span class="flex items-center gap-1.5">
                          <lucide-icon [name]="booking.type === 'SALON' ? 'store' : 'house'" [size]="14" [strokeWidth]="2"></lucide-icon>
                          {{ booking.type === 'SALON' ? 'Au salon' : 'À domicile' }}
                        </span>
                      </div>

                      @if (booking.cancellation) {
                        <div class="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <p class="text-sm font-bold text-red-800 m-0">
                            Annulé par {{ booking.cancellation.cancelledBy === 'CLIENT' ? 'le client' : 'vous' }}
                            · {{ getCancellationReasonLabel(booking.cancellation.reason) }}
                            @if (booking.cancellation.otherReason) { — {{ booking.cancellation.otherReason }} }
                          </p>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Prix + actions -->
                  <div class="flex flex-col items-end gap-3 flex-shrink-0">
                    <div class="text-[22px] font-black text-[#7c3aed]">{{ booking.total | fcfa }}</div>
                    <div class="flex flex-col gap-2">
                      @if (booking.status === 'PENDING') {
                        <button (click)="onConfirm(booking)"
                          class="h-9 px-4 rounded-full bg-[#7c3aed] text-white text-sm font-black hover:bg-[#6d28d9] transition-colors">
                          Confirmer
                        </button>
                        <button (click)="openCancelModal(booking)"
                          class="h-9 px-4 rounded-full border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors">
                          Refuser
                        </button>
                      }
                      @if (booking.status === 'CONFIRMED') {
                        <button (click)="onComplete(booking)"
                          class="h-9 px-4 rounded-full bg-[#10b45e] text-white text-sm font-black hover:bg-[#0ea550] transition-colors">
                          Marquer terminé
                        </button>
                        <button (click)="openCancelModal(booking)"
                          class="h-9 px-4 rounded-full border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors">
                          Annuler
                        </button>
                      }
                      @if (booking.status === 'COMPLETED') {
                        <span class="inline-flex items-center gap-1 text-sm font-bold text-[#10b45e]">
                          <lucide-icon name="circle-check" [size]="14" [strokeWidth]="2"></lucide-icon>
                          Terminé
                        </span>
                      }
                      @if (booking.status === 'CANCELLED') {
                        <span class="inline-flex items-center gap-1 text-sm font-bold text-red-500">
                          <lucide-icon name="circle-x" [size]="14" [strokeWidth]="2"></lucide-icon>
                          Annulé
                        </span>
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

    <!-- ── Modal annulation ── -->
    <app-modal
      [isOpen]="cancelModalOpen()"
      title="Annuler le rendez-vous"
      [showFooter]="false"
      size="lg"
      (closed)="closeCancelModal()">
      <div class="space-y-4">
        <p class="text-sm font-bold text-[#69708a]">
          Veuillez sélectionner le motif de l'annulation :
        </p>

        <div class="space-y-2">
          @for (reason of proCancellationReasons; track reason.value) {
            <label class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all hover:border-[#7c3aed]"
                   [class.border-[#7c3aed]]="selectedCancellationReason === reason.value"
                   [class.bg-[#f3e8ff]]="selectedCancellationReason === reason.value"
                   [class.border-[#e7e9f4]]="selectedCancellationReason !== reason.value">
              <input type="radio" name="proCancellationReason"
                [value]="reason.value" [(ngModel)]="selectedCancellationReason"
                class="w-4 h-4 accent-[#7c3aed] mt-0.5 flex-shrink-0">
              <span class="text-sm font-bold text-[#303653]">{{ reason.label }}</span>
            </label>
          }
        </div>

        @if (selectedCancellationReason === 'OTHER') {
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Précisez le motif :</label>
            <textarea [(ngModel)]="otherCancellationReason" rows="3"
              placeholder="Décrivez la raison de l'annulation..."
              class="w-full border border-[#e7e9f4] rounded-xl px-4 py-3 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 resize-none"></textarea>
          </div>
        }

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <label class="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" [(ngModel)]="suggestAlternatives"
              class="w-4 h-4 accent-[#7c3aed] mt-0.5 flex-shrink-0">
            <div>
              <div class="text-sm font-black text-blue-900">Suggérer d'autres professionnels</div>
              <div class="text-sm font-bold text-blue-700 mt-0.5">Recommander d'autres salons à ce client</div>
            </div>
          </label>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-[#e7e9f4]">
          <button (click)="closeCancelModal()"
            class="h-10 px-5 rounded-full border border-[#e7e9f4] text-sm font-bold text-[#69708a] hover:bg-[#f0f1f6] transition-colors">
            Retour
          </button>
          <button (click)="confirmCancel()"
            [disabled]="!selectedCancellationReason || (selectedCancellationReason === 'OTHER' && !otherCancellationReason.trim())"
            class="h-10 px-5 rounded-full bg-red-600 text-white text-sm font-black hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Confirmer l'annulation
          </button>
        </div>
      </div>
    </app-modal>
  `,
  styles: []
})
export class ProAgendaComponent {
  // Lit le signal public mockData.bookings() directement — tracking garanti
  allBookings = computed(() => {
    const proId = this.authService.user()?.id ?? 'pro-1';
    return this.mockData.bookings().filter(b => b.professionalId === proId);
  });

  // Signals — réactivité garantie dans computed()
  statusFilter = signal<string>('');
  searchQuery  = signal<string>('');

  cancelModalOpen = signal(false);
  selectedBooking = signal<Booking | null>(null);
  selectedCancellationReason: CancellationReason | null = null;
  otherCancellationReason = '';
  suggestAlternatives = false;

  readonly proCancellationReasons = [
    { value: 'PRO_UNAVAILABLE',   label: 'Professionnel indisponible' },
    { value: 'OVERBOOKED',        label: 'Surbooké / Trop de réservations' },
    { value: 'PERSONAL_EMERGENCY',label: 'Urgence personnelle' },
    { value: 'SCHEDULE_CONFLICT', label: 'Conflit d\'horaire' },
    { value: 'OTHER',             label: 'Autre' }
  ];

  // Stats toujours calculées sur TOUS les bookings (indépendant du filtre)
  stats = computed(() => {
    const bk = this.allBookings();
    return {
      total:     bk.length,
      pending:   bk.filter(b => b.status === 'PENDING').length,
      confirmed: bk.filter(b => b.status === 'CONFIRMED').length,
      completed: bk.filter(b => b.status === 'COMPLETED').length,
      cancelled: bk.filter(b => b.status === 'CANCELLED').length
    };
  });

  // Liste filtrée — réactive sur les 3 signals
  filteredBookings = computed(() => {
    const filter = this.statusFilter();
    const search = this.searchQuery().toLowerCase().trim();
    let bk = this.allBookings();

    if (filter) {
      bk = bk.filter(b => b.status === filter);
    }
    if (search) {
      bk = bk.filter(b => b.clientName.toLowerCase().includes(search));
    }

    return [...bk].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  // Badge visuel du filtre actif dans le titre de la liste
  filterLabel = computed(() => {
    const map: Record<string, string> = {
      PENDING:   'En attente',
      CONFIRMED: 'Confirmés',
      COMPLETED: 'Terminés',
      CANCELLED: 'Annulés'
    };
    return map[this.statusFilter()] ?? '';
  });

  filterBadgeBg = computed(() => {
    const map: Record<string, string> = {
      PENDING:   '#fef3c7',
      CONFIRMED: '#ede9fe',
      COMPLETED: '#d1fae5',
      CANCELLED: '#fee2e2'
    };
    return map[this.statusFilter()] ?? '#e7e9f4';
  });

  filterBadgeColor = computed(() => {
    const map: Record<string, string> = {
      PENDING:   '#d97706',
      CONFIRMED: '#7c3aed',
      COMPLETED: '#065f46',
      CANCELLED: '#dc2626'
    };
    return map[this.statusFilter()] ?? '#69708a';
  });

  constructor(
    private mockData: MockDataService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  setFilter(value: string): void {
    this.statusFilter.set(value);
  }

  resetFilters(): void {
    this.statusFilter.set('');
    this.searchQuery.set('');
  }

  onConfirm(booking: Booking): void {
    const ok = this.mockData.confirmBooking(booking.id);
    if (ok) { this.toast.success('Rendez-vous confirmé'); }
  }

  onComplete(booking: Booking): void {
    const ok = this.mockData.completeBooking(booking.id);
    if (ok) { this.toast.success('Rendez-vous marqué comme terminé'); }
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

    const ok = this.mockData.cancelBooking(
      booking.id,
      'PRO',
      this.selectedCancellationReason,
      this.selectedCancellationReason === 'OTHER' ? this.otherCancellationReason : undefined
    );

    if (ok) {
      this.toast.success('Rendez-vous annulé');
      if (this.suggestAlternatives) {
        this.toast.info('Autres professionnels suggérés au client');
      }
    } else {
      this.toast.error('Erreur lors de l\'annulation');
    }

    this.closeCancelModal();
  }

  getStatusClass(status: Booking['status']): string {
    const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-black';
    switch (status) {
      case 'PENDING':   return `${base} bg-amber-50 text-amber-700 border border-amber-200`;
      case 'CONFIRMED': return `${base} bg-[#f3e8ff] text-[#7c3aed] border border-[#ddd6fe]`;
      case 'COMPLETED': return `${base} bg-emerald-50 text-emerald-700 border border-emerald-200`;
      case 'CANCELLED': return `${base} bg-red-50 text-red-700 border border-red-200`;
      default:          return `${base} bg-gray-50 text-gray-700 border border-gray-200`;
    }
  }

  getStatusLabel(status: Booking['status']): string {
    const labels: Record<string, string> = {
      PENDING:   'En attente',
      CONFIRMED: 'Confirmé',
      COMPLETED: 'Terminé',
      CANCELLED: 'Annulé',
      NO_SHOW:   'Non présenté'
    };
    return labels[status] ?? status;
  }

  getCancellationReasonLabel(reason: CancellationReason): string {
    const all = [...this.proCancellationReasons, ...CANCELLATION_REASONS];
    return all.find(r => r.value === reason)?.label ?? reason;
  }
}
