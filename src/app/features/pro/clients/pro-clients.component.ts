import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';

interface ClientSummary {
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAvatar?: string;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  lastBooking: Date;
  lastService: string;
}

@Component({
  selector: 'app-pro-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, FcfaPipe, DateFormatPipe, ModalComponent],
  template: `
    <div>

      <!-- ── En-tête ── -->
      <div class="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-[28px] font-black text-[#11152f] m-0">Mes Clients</h1>
          <p class="mt-1 text-base text-[#69708a]">
            {{ clients().length }} client{{ clients().length > 1 ? 's' : '' }} enregistré{{ clients().length > 1 ? 's' : '' }}
          </p>
        </div>
        <div class="flex items-center gap-1.5 h-9 px-4 rounded-full border"
             style="background:#f0fdf4;border-color:#bbf7d0">
          <div class="w-2 h-2 rounded-full" style="background:#10b45e"></div>
          <span class="text-sm font-black" style="color:#10b45e">{{ loyalClients() }} fidèles</span>
        </div>
      </div>

      <!-- ── Stats ── -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
               style="background:#f3e8ff">
            <lucide-icon name="users" [size]="18" [strokeWidth]="2" class="text-[#7c3aed]"></lucide-icon>
          </div>
          <div>
            <div class="text-[26px] font-black text-[#11152f] leading-none">{{ clients().length }}</div>
            <div class="text-xs font-bold text-[#69708a] mt-0.5">Clients uniques</div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
               style="background:#fef9c3">
            <lucide-icon name="star" [size]="18" [strokeWidth]="2" class="text-[#d97706]"></lucide-icon>
          </div>
          <div>
            <div class="text-[26px] font-black text-[#d97706] leading-none">{{ loyalClients() }}</div>
            <div class="text-xs font-bold text-[#69708a] mt-0.5">Fidèles (3+ RDV)</div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
               style="background:#dcfce7">
            <lucide-icon name="circle-dollar-sign" [size]="18" [strokeWidth]="2" class="text-[#10b45e]"></lucide-icon>
          </div>
          <div>
            <div class="text-[22px] font-black text-[#10b45e] leading-none">{{ totalRevenue() | fcfa:false }}</div>
            <div class="text-xs font-bold text-[#69708a] mt-0.5">Revenus générés</div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
               style="background:#ede9ff">
            <lucide-icon name="trending-up" [size]="18" [strokeWidth]="2" class="text-[#7c3aed]"></lucide-icon>
          </div>
          <div>
            <div class="text-[22px] font-black text-[#7c3aed] leading-none">{{ avgRevenuePerClient() | fcfa:false }}</div>
            <div class="text-xs font-bold text-[#69708a] mt-0.5">Panier moyen</div>
          </div>
        </div>
      </div>

      <!-- ── Recherche & tri ── -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] p-4 mb-5 flex flex-col sm:flex-row gap-3">
        <div class="flex-1 relative">
          <lucide-icon name="search" [size]="15" [strokeWidth]="2"
            class="absolute top-1/2 -translate-y-1/2 text-[#a0a8c3] pointer-events-none"
            style="left:14px"></lucide-icon>
          <input type="text"
            [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)"
            placeholder="Rechercher par nom ou téléphone..."
            class="w-full h-10 rounded-xl border border-[#e7e9f4] text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all"
            style="padding-left:38px;padding-right:16px">
        </div>
        <select
          [ngModel]="sortBy()" (ngModelChange)="sortBy.set($event)"
          class="h-10 rounded-xl border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 cursor-pointer transition-all">
          <option value="lastBooking">Dernier RDV</option>
          <option value="totalSpent">Plus dépensé</option>
          <option value="totalBookings">Plus de RDV</option>
          <option value="name">Alphabétique</option>
        </select>
      </div>

      <!-- ── Liste des clients ── -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] overflow-hidden">

        <!-- En-tête tableau -->
        <div class="px-6 py-3 border-b border-[#e7e9f4] flex items-center justify-between">
          <h2 class="text-sm font-black text-[#11152f]">
            Liste des clients
            <span class="ml-2 text-xs font-bold text-[#69708a]">({{ filteredClients().length }})</span>
          </h2>
        </div>

        @if (filteredClients().length === 0) {
          <div class="py-16 text-center">
            <div class="w-14 h-14 rounded-2xl bg-[#f0f1f6] flex items-center justify-center mx-auto mb-3">
              <lucide-icon name="users" [size]="24" [strokeWidth]="1.5" class="text-[#a0a8c3]"></lucide-icon>
            </div>
            <p class="text-base font-bold text-[#69708a]">Aucun client trouvé</p>
          </div>
        }

        <div class="divide-y divide-[#f0f1f6]">
          @for (client of filteredClients(); track client.clientId; let i = $index) {
            <div (click)="openDetail(client)"
              class="px-6 py-4 hover:bg-[#faf9ff] cursor-pointer transition-colors flex items-center gap-4">

              <!-- Rang + Avatar -->
              <div class="hidden sm:flex items-center gap-3 flex-shrink-0">
                <span class="text-xs font-black text-[#a0a8c3] w-4 text-right">{{ i + 1 }}</span>
                <div class="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-black text-lg"
                     [style.background]="client.clientAvatar ? 'transparent' : 'linear-gradient(135deg,#7c3aed,#a855f7)'">
                  @if (client.clientAvatar) {
                    <img [src]="bigAvatar(client.clientAvatar, 48)" [alt]="client.clientName"
                         class="w-full h-full object-cover">
                  } @else {
                    {{ client.clientName.charAt(0) }}
                  }
                </div>
              </div>

              <!-- Mobile avatar only -->
              <div class="sm:hidden w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-black"
                   [style.background]="client.clientAvatar ? 'transparent' : 'linear-gradient(135deg,#7c3aed,#a855f7)'">
                @if (client.clientAvatar) {
                  <img [src]="bigAvatar(client.clientAvatar, 40)" [alt]="client.clientName"
                       class="w-full h-full object-cover">
                } @else {
                  {{ client.clientName.charAt(0) }}
                }
              </div>

              <!-- Infos client -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-black text-[#11152f]">{{ client.clientName }}</span>
                  @if (client.totalBookings >= 5) {
                    <span class="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style="background:#fef3c7;color:#d97706">VIP</span>
                  } @else if (client.totalBookings >= 3) {
                    <span class="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style="background:#dcfce7;color:#10b45e">Fidèle</span>
                  }
                </div>
                <div class="text-xs font-bold text-[#69708a] mt-0.5">{{ client.clientPhone }}</div>
                <div class="text-xs text-[#a0a8c3] mt-0.5 truncate">
                  Dernier : {{ client.lastService }}
                </div>
              </div>

              <!-- Stats -->
              <div class="hidden md:flex items-center gap-5 flex-shrink-0">
                <div class="text-center">
                  <div class="text-base font-black text-[#11152f]">{{ client.totalBookings }}</div>
                  <div class="text-[10px] font-bold text-[#a0a8c3] uppercase tracking-wide">RDV</div>
                </div>
                <div class="text-center">
                  <div class="text-base font-black text-[#10b45e]">{{ client.completedBookings }}</div>
                  <div class="text-[10px] font-bold text-[#a0a8c3] uppercase tracking-wide">Terminés</div>
                </div>
                <div class="text-center min-w-[80px]">
                  <div class="text-base font-black text-[#7c3aed]">{{ client.totalSpent | fcfa:false }}</div>
                  <div class="text-[10px] font-bold text-[#a0a8c3] uppercase tracking-wide">Dépensé</div>
                </div>
              </div>

              <!-- Date + flèche -->
              <div class="hidden lg:flex flex-col items-end gap-0.5 flex-shrink-0">
                <span class="text-xs font-bold text-[#69708a]">{{ client.lastBooking | dateFormat:'short' }}</span>
                <span class="text-[11px] text-[#a0a8c3]">dernier RDV</span>
              </div>
              <lucide-icon name="chevron-right" [size]="16" [strokeWidth]="2"
                class="text-[#d1d5db] flex-shrink-0 ml-1"></lucide-icon>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- ── Modal détail client ── -->
    <app-modal
      [isOpen]="detailOpen()"
      [title]="selectedClient()?.clientName || ''"
      [showFooter]="false"
      size="lg"
      (closed)="detailOpen.set(false)">
      @if (selectedClient()) {
        <div class="space-y-5">

          <!-- Profil -->
          <div class="flex items-center gap-4 p-4 rounded-2xl" style="background:#f7f5ff">
            <div class="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-black text-2xl"
                 [style.background]="selectedClient()!.clientAvatar ? 'transparent' : 'linear-gradient(135deg,#7c3aed,#a855f7)'">
              @if (selectedClient()!.clientAvatar) {
                <img [src]="bigAvatar(selectedClient()!.clientAvatar, 64)" [alt]="selectedClient()!.clientName"
                     class="w-full h-full object-cover">
              } @else {
                {{ selectedClient()!.clientName.charAt(0) }}
              }
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <span class="text-lg font-black text-[#11152f]">{{ selectedClient()!.clientName }}</span>
                @if (selectedClient()!.totalBookings >= 5) {
                  <span class="text-xs font-black px-2 py-0.5 rounded-full"
                        style="background:#fef3c7;color:#d97706">⭐ VIP</span>
                } @else if (selectedClient()!.totalBookings >= 3) {
                  <span class="text-xs font-black px-2 py-0.5 rounded-full"
                        style="background:#dcfce7;color:#10b45e">Fidèle</span>
                }
              </div>
              <div class="text-sm font-bold text-[#69708a]">{{ selectedClient()!.clientPhone }}</div>
            </div>
          </div>

          <!-- Stats client -->
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-white border border-[#e7e9f4] rounded-2xl p-4 text-center">
              <div class="text-2xl font-black text-[#11152f]">{{ selectedClient()!.totalBookings }}</div>
              <div class="text-xs font-bold text-[#69708a] mt-0.5">Réservations</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#dcfce7">
              <div class="text-2xl font-black text-[#10b45e]">{{ selectedClient()!.completedBookings }}</div>
              <div class="text-xs font-bold text-[#69708a] mt-0.5">Terminées</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#f3e8ff">
              <div class="text-xl font-black text-[#7c3aed]">{{ selectedClient()!.totalSpent | fcfa:false }}</div>
              <div class="text-xs font-bold text-[#69708a] mt-0.5">Total dépensé</div>
            </div>
          </div>

          <!-- Historique réservations -->
          <div>
            <h4 class="text-sm font-black text-[#11152f] mb-3">Historique des réservations</h4>
            <div class="space-y-2">
              @for (booking of clientBookings(); track booking.id) {
                <div class="flex items-center justify-between p-3.5 rounded-xl border border-[#e7e9f4] hover:bg-[#faf9ff] transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                         [ngClass]="booking.status === 'COMPLETED' ? 'bg-[#dcfce7]' :
                                    booking.status === 'CANCELLED' ? 'bg-[#fee2e2]' :
                                    booking.status === 'CONFIRMED' ? 'bg-[#e0f2fe]' : 'bg-[#fef3c7]'">
                      <lucide-icon
                        [name]="booking.status === 'COMPLETED' ? 'circle-check' :
                                booking.status === 'CANCELLED' ? 'circle-x' :
                                booking.status === 'CONFIRMED' ? 'clock' : 'clock'"
                        [size]="13" [strokeWidth]="2"
                        [ngClass]="booking.status === 'COMPLETED' ? 'text-[#10b45e]' :
                                   booking.status === 'CANCELLED' ? 'text-red-500' :
                                   booking.status === 'CONFIRMED' ? 'text-[#0284c7]' : 'text-[#d97706]'">
                      </lucide-icon>
                    </div>
                    <div>
                      <div class="text-sm font-black text-[#11152f]">{{ booking.service.name }}</div>
                      <div class="text-xs font-bold text-[#69708a]">
                        {{ booking.date | dateFormat:'long' }} · {{ booking.time }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-sm font-black text-[#7c3aed]">{{ booking.total | fcfa }}</div>
                    <span class="text-[11px] font-black px-2 py-0.5 rounded-full"
                          [ngClass]="booking.status === 'COMPLETED' ? 'bg-[#dcfce7] text-[#10b45e]' :
                                     booking.status === 'CANCELLED' ? 'bg-[#fee2e2] text-red-600' :
                                     booking.status === 'CONFIRMED' ? 'bg-[#e0f2fe] text-[#0284c7]' :
                                     'bg-[#fef3c7] text-[#d97706]'">
                      {{ getStatusLabel(booking.status) }}
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2 border-t border-[#e7e9f4]">
            <a [href]="'tel:' + selectedClient()!.clientPhone"
              class="flex-1 flex items-center justify-center gap-2 h-11 rounded-full font-black text-sm text-white transition-colors"
              style="background:#10b45e">
              <lucide-icon name="phone" [size]="15" [strokeWidth]="2.5"></lucide-icon>
              Appeler
            </a>
            <a [href]="'https://wa.me/' + whatsappNumber(selectedClient()!.clientPhone)" target="_blank"
              class="flex-1 flex items-center justify-center gap-2 h-11 rounded-full font-black text-sm text-white transition-opacity hover:opacity-90"
              style="background:#25D366">
              <lucide-icon name="message-circle" [size]="15" [strokeWidth]="2.5"></lucide-icon>
              WhatsApp
            </a>
          </div>

        </div>
      }
    </app-modal>
  `,
  styles: []
})
export class ProClientsComponent {
  searchQuery = signal('');
  sortBy = signal('lastBooking');
  detailOpen = signal(false);
  selectedClient = signal<ClientSummary | null>(null);

  constructor(
    private authService: AuthService,
    private mockData: MockDataService
  ) {}

  clients = computed(() => {
    const proId = this.authService.user()?.id ?? 'pro-1';
    const map = new Map<string, ClientSummary>();
    for (const b of this.mockData.bookings().filter(bk => bk.professionalId === proId)) {
      if (!map.has(b.clientId)) {
        map.set(b.clientId, {
          clientId: b.clientId,
          clientName: b.clientName,
          clientPhone: b.clientPhone,
          clientAvatar: b.clientAvatar,
          totalBookings: 1,
          completedBookings: b.status === 'COMPLETED' ? 1 : 0,
          cancelledBookings: b.status === 'CANCELLED' ? 1 : 0,
          totalSpent: b.status === 'COMPLETED' ? b.total : 0,
          lastBooking: new Date(b.date),
          lastService: b.service.name,
        });
      } else {
        const e = map.get(b.clientId)!;
        e.totalBookings++;
        if (b.status === 'COMPLETED') { e.completedBookings++; e.totalSpent += b.total; }
        if (b.status === 'CANCELLED') e.cancelledBookings++;
        const bd = new Date(b.date);
        if (bd > e.lastBooking) { e.lastBooking = bd; e.lastService = b.service.name; }
      }
    }
    return Array.from(map.values());
  });

  filteredClients = computed(() => {
    let list = this.clients();
    const q = this.searchQuery().trim().toLowerCase();
    if (q) list = list.filter(c =>
      c.clientName.toLowerCase().includes(q) || c.clientPhone.includes(q)
    );
    return [...list].sort((a, b) => {
      switch (this.sortBy()) {
        case 'totalSpent':    return b.totalSpent - a.totalSpent;
        case 'totalBookings': return b.totalBookings - a.totalBookings;
        case 'name':          return a.clientName.localeCompare(b.clientName, 'fr');
        default:              return new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime();
      }
    });
  });

  loyalClients     = computed(() => this.clients().filter(c => c.totalBookings >= 3).length);
  totalRevenue     = computed(() => this.clients().reduce((s, c) => s + c.totalSpent, 0));
  avgRevenuePerClient = computed(() => {
    const n = this.clients().length;
    return n > 0 ? Math.round(this.totalRevenue() / n) : 0;
  });

  clientBookings = computed(() => {
    const sc = this.selectedClient();
    if (!sc) return [];
    const proId = this.authService.user()?.id ?? 'pro-1';
    return this.mockData.bookings()
      .filter(b => b.professionalId === proId && b.clientId === sc.clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  openDetail(client: ClientSummary): void {
    this.selectedClient.set(client);
    this.detailOpen.set(true);
  }

  bigAvatar(url?: string, size = 48): string {
    return url ? url.replace('/40?', `/${size}?`) : '';
  }

  getStatusLabel(status: Booking['status']): string {
    const map: Record<string, string> = {
      PENDING: 'En attente', CONFIRMED: 'Confirmé',
      COMPLETED: 'Terminé', CANCELLED: 'Annulé', NO_SHOW: 'Absent'
    };
    return map[status] ?? status;
  }

  whatsappNumber(phone: string): string {
    return phone.replace(/[\s+]/g, '');
  }
}
