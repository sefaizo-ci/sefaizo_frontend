import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';

interface ClientSummary {
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAvatar?: string;
  totalBookings: number;
  completedBookings: number;
  totalSpent: number;
  lastBooking: Date;
  lastService: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-pro-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe, DateFormatPipe, BadgeComponent, ModalComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-secondary">Mes Clients</h1>
          <p class="text-secondary-gray mt-1">{{ clients().length }} client(s) au total</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-sm text-secondary-gray bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg">
            {{ loyalClients() }} client(s) fidèles
          </div>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1 relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" [(ngModel)]="searchQuery" placeholder="Rechercher un client..."
              class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          </div>
          <select [(ngModel)]="sortBy"
            class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="lastBooking">Dernière réservation</option>
            <option value="totalSpent">Total dépensé</option>
            <option value="totalBookings">Nombre de RDV</option>
            <option value="name">Nom</option>
          </select>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-secondary">{{ clients().length }}</div>
          <div class="text-xs text-secondary-gray mt-1">Clients uniques</div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{{ loyalClients() }}</div>
          <div class="text-xs text-secondary-gray mt-1">Clients fidèles (3+ RDV)</div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-primary">{{ totalRevenue() | fcfa:false }}</div>
          <div class="text-xs text-secondary-gray mt-1">Revenus totaux</div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-secondary">{{ avgRevenuePerClient() | fcfa:false }}</div>
          <div class="text-xs text-secondary-gray mt-1">Revenu moyen / client</div>
        </div>
      </div>

      <!-- Clients Table -->
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-5 border-b">
          <h2 class="font-semibold text-secondary">Liste des clients ({{ filteredClients().length }})</h2>
        </div>

        @if (filteredClients().length === 0) {
          <div class="p-12 text-center">
            <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p class="text-secondary-gray">Aucun client trouvé</p>
          </div>
        } @else {
          <div class="divide-y divide-gray-50">
            @for (client of filteredClients(); track client.clientId) {
              <div
                (click)="openClientDetail(client)"
                class="p-5 hover:bg-gray-50 cursor-pointer transition-colors">
                <div class="flex items-center gap-4">
                  <!-- Avatar -->
                  <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
                    @if (client.clientAvatar) {
                      <img [src]="client.clientAvatar" [alt]="client.clientName" class="w-full h-full object-cover">
                    } @else {
                      <span class="text-primary font-bold">{{ client.clientName.charAt(0) }}</span>
                    }
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="font-semibold text-secondary">{{ client.clientName }}</span>
                      @if (client.totalBookings >= 3) {
                        <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Fidèle</span>
                      }
                    </div>
                    <div class="text-sm text-secondary-gray">{{ client.clientPhone }}</div>
                    <div class="text-xs text-secondary-gray mt-0.5">
                      Dernier service : {{ client.lastService }}
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="hidden sm:flex items-center gap-6 text-sm">
                    <div class="text-center">
                      <div class="font-bold text-secondary">{{ client.totalBookings }}</div>
                      <div class="text-xs text-secondary-gray">RDV</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-green-600">{{ client.completedBookings }}</div>
                      <div class="text-xs text-secondary-gray">Terminés</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-primary">{{ client.totalSpent | fcfa:false }}</div>
                      <div class="text-xs text-secondary-gray">Dépensé</div>
                    </div>
                  </div>

                  <!-- Last Booking -->
                  <div class="hidden lg:block text-right text-sm text-secondary-gray">
                    {{ client.lastBooking | dateFormat: 'short' }}
                  </div>

                  <svg class="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>

    <!-- Client Detail Modal -->
    <app-modal
      [isOpen]="detailOpen()"
      [title]="selectedClient()?.clientName || ''"
      [showFooter]="false"
      size="lg"
      (closed)="detailOpen.set(false)">
      @if (selectedClient()) {
        <div class="space-y-6">
          <!-- Client Profile -->
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
              @if (selectedClient()!.clientAvatar) {
                <img [src]="selectedClient()!.clientAvatar" [alt]="selectedClient()!.clientName" class="w-full h-full object-cover">
              } @else {
                <span class="text-primary font-bold text-xl">{{ selectedClient()!.clientName.charAt(0) }}</span>
              }
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-xl font-bold text-secondary">{{ selectedClient()!.clientName }}</h3>
                @if (selectedClient()!.totalBookings >= 3) {
                  <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Client fidèle</span>
                }
              </div>
              <div class="text-secondary-gray">{{ selectedClient()!.clientPhone }}</div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-secondary">{{ selectedClient()!.totalBookings }}</div>
              <div class="text-xs text-secondary-gray mt-1">Réservations</div>
            </div>
            <div class="bg-green-50 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-green-600">{{ selectedClient()!.completedBookings }}</div>
              <div class="text-xs text-secondary-gray mt-1">Terminées</div>
            </div>
            <div class="bg-primary/5 rounded-xl p-4 text-center">
              <div class="text-xl font-bold text-primary">{{ selectedClient()!.totalSpent | fcfa:false }}</div>
              <div class="text-xs text-secondary-gray mt-1">Total dépensé</div>
            </div>
          </div>

          <!-- Booking History -->
          <div>
            <h4 class="font-semibold text-secondary mb-3">Historique des réservations</h4>
            <div class="space-y-2">
              @for (booking of clientBookings(); track booking.id) {
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div class="text-sm font-medium text-secondary">{{ booking.service.name }}</div>
                    <div class="text-xs text-secondary-gray">{{ booking.date | dateFormat: 'long' }} à {{ booking.time }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-primary">{{ booking.total | fcfa }}</div>
                    <app-badge [variant]="getStatusVariant(booking.status)" class="mt-1">
                      {{ getStatusLabel(booking.status) }}
                    </app-badge>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2 border-t">
            <a [href]="'tel:' + selectedClient()!.clientPhone"
              class="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Appeler
            </a>
            <a [href]="'https://wa.me/' + whatsappNumber(selectedClient()!.clientPhone)" target="_blank"
              class="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm">
              WhatsApp
            </a>
          </div>
        </div>
      }
    </app-modal>
  `,
  styles: []
})
export class ProClientsComponent implements OnInit {
  searchQuery = '';
  sortBy = 'lastBooking';

  detailOpen = signal(false);
  selectedClient = signal<ClientSummary | null>(null);

  private allBookings = signal<Booking[]>([]);
  clients = signal<ClientSummary[]>([]);

  constructor(
    private authService: AuthService,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user();
    if (!user) return;

    const bookings = this.mockData.getBookingsByProfessional(user.id);
    this.allBookings.set(bookings);
    this.buildClientList(bookings);
  }

  private buildClientList(bookings: Booking[]): void {
    const map = new Map<string, ClientSummary>();

    for (const b of bookings) {
      const existing = map.get(b.clientId);
      if (!existing) {
        map.set(b.clientId, {
          clientId: b.clientId,
          clientName: b.clientName,
          clientPhone: b.clientPhone,
          clientAvatar: b.clientAvatar,
          totalBookings: 1,
          completedBookings: b.status === 'COMPLETED' ? 1 : 0,
          totalSpent: b.status === 'COMPLETED' ? b.total : 0,
          lastBooking: new Date(b.date),
          lastService: b.service.name,
          isFavorite: false,
        });
      } else {
        existing.totalBookings++;
        if (b.status === 'COMPLETED') {
          existing.completedBookings++;
          existing.totalSpent += b.total;
        }
        const bd = new Date(b.date);
        if (bd > existing.lastBooking) {
          existing.lastBooking = bd;
          existing.lastService = b.service.name;
        }
      }
    }

    this.clients.set(Array.from(map.values()));
  }

  filteredClients = computed(() => {
    let list = this.clients();

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(c =>
        c.clientName.toLowerCase().includes(q) ||
        c.clientPhone.includes(q)
      );
    }

    return [...list].sort((a, b) => {
      switch (this.sortBy) {
        case 'totalSpent': return b.totalSpent - a.totalSpent;
        case 'totalBookings': return b.totalBookings - a.totalBookings;
        case 'name': return a.clientName.localeCompare(b.clientName);
        default: return new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime();
      }
    });
  });

  loyalClients = computed(() => this.clients().filter(c => c.totalBookings >= 3).length);
  totalRevenue = computed(() => this.clients().reduce((sum, c) => sum + c.totalSpent, 0));
  avgRevenuePerClient = computed(() => {
    const c = this.clients().length;
    return c > 0 ? Math.round(this.totalRevenue() / c) : 0;
  });

  clientBookings = computed(() => {
    const sc = this.selectedClient();
    if (!sc) return [];
    return this.allBookings()
      .filter(b => b.clientId === sc.clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  openClientDetail(client: ClientSummary): void {
    this.selectedClient.set(client);
    this.detailOpen.set(true);
  }

  getStatusVariant(status: Booking['status']): 'success' | 'warning' | 'error' | 'info' | 'neutral' {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'CONFIRMED': return 'info';
      case 'PENDING': return 'warning';
      case 'CANCELLED': return 'error';
      default: return 'neutral';
    }
  }

  getStatusLabel(status: Booking['status']): string {
    const labels: Record<string, string> = {
      PENDING: 'En attente', CONFIRMED: 'Confirmé',
      COMPLETED: 'Terminé', CANCELLED: 'Annulé', NO_SHOW: 'Absent'
    };
    return labels[status] ?? status;
  }

  whatsappNumber(phone: string): string {
    return phone.replace(/[\s+]/g, '');
  }
}
