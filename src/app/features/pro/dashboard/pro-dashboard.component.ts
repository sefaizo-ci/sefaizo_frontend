import { Component, OnInit, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, User } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';

interface RevenuePoint { label: string; value: number; }
interface ChartPoint { x: number; y: number; }

@Component({
  selector: 'app-pro-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, FcfaPipe, DateFormatPipe],
  template: `
<div class="space-y-6">

  <!-- ── GREETING ── -->
  <div>
    <h1 class="m-0 text-[26px] font-bold text-[#11152f] leading-tight">
      Bonjour, {{ user()?.firstName }} 👋
    </h1>
    <p class="mt-1 text-[15px] font-light text-[#66708d]">Voici votre activité</p>
  </div>

  <!-- ── KPI CARDS ── -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">

    <!-- Revenus du mois — carte purple gradient -->
    <div class="col-span-2 lg:col-span-1 rounded-2xl p-5 text-white relative overflow-hidden"
         style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
      <div class="relative z-10">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[13px] font-bold text-white/75">Revenus du mois</span>
          <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <lucide-icon name="chart-bar" [size]="18" [strokeWidth]="2"></lucide-icon>
          </div>
        </div>
        <div class="text-[22px] font-black leading-none">{{ proStats().monthlyRevenue | fcfa }}</div>
        <div class="mt-2 flex items-center gap-1 text-[12px] text-white/75">
          <lucide-icon name="trending-up" [size]="12" [strokeWidth]="2.5"></lucide-icon>
          +6,3% vs la semaine dernière
        </div>
      </div>
      <div class="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 pointer-events-none"></div>
    </div>

    <!-- Réservations -->
    <div class="bg-white rounded-2xl p-5 border border-[#e7e9f4]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[13px] font-bold text-[#66708d]">Réservations</span>
        <div class="w-9 h-9 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#7c3aed]">
          <lucide-icon name="calendar-days" [size]="18" [strokeWidth]="2"></lucide-icon>
        </div>
      </div>
      <div class="text-[32px] font-black text-[#11152f] leading-none">{{ proStats().totalBookings }}</div>
      <div class="mt-1 text-[12px] text-[#66708d]">Ce mois</div>
    </div>

    <!-- Clients -->
    <div class="bg-white rounded-2xl p-5 border border-[#e7e9f4]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[13px] font-bold text-[#66708d]">Clients</span>
        <div class="w-9 h-9 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#7c3aed]">
          <lucide-icon name="users" [size]="18" [strokeWidth]="2"></lucide-icon>
        </div>
      </div>
      <div class="text-[32px] font-black text-[#11152f] leading-none">{{ totalClients() }}</div>
      <div class="mt-1 text-[12px] text-[#66708d]">Total</div>
    </div>

    <!-- Note moyenne -->
    <div class="bg-white rounded-2xl p-5 border border-[#e7e9f4]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[13px] font-bold text-[#66708d]">Note moyenne</span>
        <div class="w-9 h-9 rounded-xl bg-[#fff7ed] flex items-center justify-center text-[#f59e0b]">
          <lucide-icon name="star" [size]="18" [strokeWidth]="2"></lucide-icon>
        </div>
      </div>
      <div class="flex items-end gap-1">
        <div class="text-[32px] font-black text-[#11152f] leading-none">
          {{ proStats().averageRating | number:'1.1-1' }}
        </div>
        <span class="text-[#f59e0b] text-xl mb-0.5">★</span>
      </div>
      <div class="mt-1 text-[12px] text-[#66708d]">{{ proStats().totalReviews }} avis</div>
    </div>

  </div>

  <!-- ── MAIN GRID (chart+pending left | agenda+actions right) ── -->
  <div class="grid lg:grid-cols-[1fr_340px] gap-5">

    <!-- ─ LEFT ─ -->
    <div class="space-y-5 min-w-0">

      <!-- Revenue chart -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5">
        <div class="flex items-center justify-between mb-5">
          <h2 class="m-0 text-[15px] font-bold text-[#11152f]">Revenus 6 derniers mois</h2>
          <span class="text-[11px] font-bold text-[#66708d] bg-[#f7f5ff] px-2 py-1 rounded-lg">FCFA</span>
        </div>

        <div class="flex gap-3">
          <!-- Y-axis labels -->
          <div class="flex flex-col justify-between text-[10px] font-bold text-[#66708d] text-right shrink-0"
               style="height:140px; padding-bottom:18px">
            <span>{{ chartMaxLabel }}</span>
            <span>{{ chartMidLabel }}</span>
            <span>{{ chartMinLabel }}</span>
          </div>

          <!-- SVG area chart -->
          <div class="flex-1 min-w-0">
            <svg viewBox="0 0 560 140" preserveAspectRatio="none" class="w-full" style="height:140px;display:block">
              <defs>
                <linearGradient id="dashAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <!-- Grid lines -->
              <line x1="0" y1="18" x2="560" y2="18" stroke="#e7e9f4" stroke-width="1"/>
              <line x1="0" y1="70" x2="560" y2="70" stroke="#e7e9f4" stroke-width="1"/>
              <line x1="0" y1="122" x2="560" y2="122" stroke="#e7e9f4" stroke-width="1"/>
              <!-- Gradient fill -->
              <path [attr.d]="chartData().area" fill="url(#dashAreaGrad)"/>
              <!-- Line -->
              <path [attr.d]="chartData().line" fill="none" stroke="#7c3aed" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Points -->
              @for (pt of chartData().points; track $index) {
                <circle [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#7c3aed" stroke="white" stroke-width="2"/>
              }
            </svg>
            <!-- X labels -->
            <div class="flex justify-between mt-1">
              @for (m of revenueMonths; track m.label) {
                <span class="text-[10px] font-bold text-[#66708d]">{{ m.label }}</span>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Pending bookings -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4]">
        <div class="flex items-center justify-between px-5 py-4 border-b border-[#e7e9f4]">
          <div class="flex items-center gap-2">
            <h2 class="m-0 text-[15px] font-bold text-[#11152f]">Réservations en attente</h2>
            @if (pendingBookings().length > 0) {
              <span class="text-[11px] font-black px-2 py-0.5 rounded-full"
                    style="background:#fef3c7;color:#d97706">
                {{ pendingBookings().length }}
              </span>
            }
          </div>
          <a routerLink="/espace-pro/agenda"
             class="text-[12px] font-bold text-[#7c3aed] hover:underline">Voir tout</a>
        </div>

        @if (pendingBookings().length === 0) {
          <div class="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <div class="w-12 h-12 rounded-2xl bg-[#f0fdf4] flex items-center justify-center text-[#16a34a]">
              <lucide-icon name="calendar-check" [size]="22" [strokeWidth]="1.75"></lucide-icon>
            </div>
            <p class="text-sm font-bold text-[#66708d]">Aucune réservation en attente</p>
          </div>
        } @else {
          <div class="divide-y divide-[#f5f5f8]">
            @for (bk of pendingBookings().slice(0, 4); track bk.id) {
              <div class="flex items-center gap-3 px-5 py-3.5">
                <img [src]="bk.clientAvatar || 'https://i.pravatar.cc/40?u=' + bk.clientId"
                     [alt]="bk.clientName"
                     class="w-10 h-10 rounded-full object-cover shrink-0 bg-[#e7e9f4]">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-[#11152f] truncate">{{ bk.clientName }}</div>
                  <div class="text-[12px] text-[#66708d] mt-0.5 truncate">
                    {{ bk.service.name }} · {{ bk.date | dateFormat:'short' }} à {{ bk.time }}
                  </div>
                </div>
                <div class="flex gap-2 shrink-0">
                  <button (click)="onConfirm(bk.id)"
                          class="h-8 px-3 rounded-xl text-[12px] font-bold text-white transition-opacity hover:opacity-85 active:scale-95"
                          style="background:#7c3aed">
                    Confirmer
                  </button>
                  <button (click)="onRefuse(bk.id)"
                          class="h-8 px-3 rounded-xl text-[12px] font-bold border border-[#e7e9f4] text-[#66708d] transition-colors hover:border-red-300 hover:text-red-500 active:scale-95">
                    Refuser
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>

    </div>

    <!-- ─ RIGHT ─ -->
    <div class="space-y-5">

      <!-- Agenda du jour -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4]">
        <div class="flex items-center justify-between px-5 py-4 border-b border-[#e7e9f4]">
          <h2 class="m-0 text-[15px] font-bold text-[#11152f]">Agenda du jour</h2>
          <a routerLink="/espace-pro/agenda"
             class="text-[12px] font-bold text-[#7c3aed] hover:underline">Voir tout</a>
        </div>

        @if (agendaBookings().length === 0) {
          <div class="flex flex-col items-center gap-2 py-8 text-center">
            <div class="w-10 h-10 rounded-2xl bg-[#f7f5ff] flex items-center justify-center text-[#7c3aed]">
              <lucide-icon name="calendar" [size]="18" [strokeWidth]="1.75"></lucide-icon>
            </div>
            <p class="text-sm text-[#66708d]">Aucun rendez-vous aujourd'hui</p>
          </div>
        } @else {
          <div class="divide-y divide-[#f5f5f8]">
            @for (bk of agendaBookings(); track bk.id) {
              <div class="flex items-center gap-3 px-4 py-3">
                <!-- Heure -->
                <span class="text-[12px] font-black text-[#7c3aed] w-10 shrink-0 text-center">
                  {{ bk.time }}
                </span>
                <!-- Avatar -->
                <img [src]="bk.clientAvatar || 'https://i.pravatar.cc/32?u=' + bk.clientId"
                     [alt]="bk.clientName"
                     class="w-8 h-8 rounded-full object-cover shrink-0 bg-[#e7e9f4]">
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="text-[12px] font-bold text-[#11152f] truncate">{{ bk.clientName }}</div>
                  <div class="text-[11px] text-[#66708d] truncate">{{ bk.service.name }}</div>
                </div>
                <!-- Badge statut -->
                <span class="shrink-0 text-[10px] font-black px-2 py-1 rounded-lg"
                      [style.background]="getAgendaBadgeBg(bk.status)"
                      [style.color]="getAgendaBadgeColor(bk.status)">
                  {{ getAgendaBadgeLabel(bk.status) }}
                </span>
              </div>
            }
          </div>
          <div class="px-4 py-3 border-t border-[#f5f5f8]">
            <a routerLink="/espace-pro/agenda"
               class="inline-flex items-center gap-1 text-[12px] font-bold text-[#7c3aed] hover:underline">
              Voir l'agenda complet
              <lucide-icon name="arrow-right" [size]="12" [strokeWidth]="2.5"></lucide-icon>
            </a>
          </div>
        }
      </div>

      <!-- Actions rapides -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5">
        <h2 class="m-0 mb-4 text-[15px] font-bold text-[#11152f]">Actions rapides</h2>
        <div class="grid grid-cols-2 gap-3">
          @for (action of quickActions; track action.label) {
            <a [routerLink]="action.route"
               class="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e7e9f4]
                      hover:border-[#7c3aed]/40 hover:bg-[#f7f5ff] transition-all text-center no-underline">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                   [style.background]="action.bg" [style.color]="action.color">
                <lucide-icon [name]="action.icon" [size]="20" [strokeWidth]="2"></lucide-icon>
              </div>
              <span class="text-[11px] font-bold text-[#11152f] leading-tight">{{ action.label }}</span>
            </a>
          }
        </div>
      </div>

    </div>
  </div>

</div>
  `,
  styles: []
})
export class ProDashboardComponent implements OnInit {
  private _bookings = signal<Booking[]>([]);
  user!: Signal<User | null>;

  readonly revenueMonths: RevenuePoint[] = [
    { label: 'Déc', value: 89000 },
    { label: 'Jan', value: 112000 },
    { label: 'Fév', value: 96000 },
    { label: 'Mar', value: 148000 },
    { label: 'Avr', value: 135000 },
    { label: 'Mai', value: 178000 },
  ];

  readonly chartMaxLabel = '178K';
  readonly chartMidLabel = '130K';
  readonly chartMinLabel = '89K';

  readonly quickActions = [
    { label: 'Nouvelle réservation', route: '/espace-pro/agenda',     icon: 'calendar-plus', bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Ajouter service',      route: '/espace-pro/services',   icon: 'scissors',      bg: '#dbeafe', color: '#2563eb' },
    { label: 'Bloquer horaire',      route: '/espace-pro/parametres', icon: 'clock',         bg: '#fef3c7', color: '#d97706' },
    { label: 'Mes photos',           route: '/espace-pro/boutique',   icon: 'camera',        bg: '#dcfce7', color: '#16a34a' },
  ];

  constructor(private mockData: MockDataService, private authService: AuthService) {
    this.user = this.authService.user;
  }

  business = computed(() => {
    const u = this.user();
    if (!u) return null;
    return this.mockData.getBusinesses().find(b => b.professionalId === u.id) ?? null;
  });

  proStats = computed(() => {
    const u = this.user();
    if (!u) return {
      totalBookings: 0, pendingBookings: 0, confirmedBookings: 0,
      cancelledBookings: 0, completedBookings: 0, monthlyRevenue: 0,
      weeklyRevenue: 0, averageRating: 0, totalReviews: 0,
      referralPoints: 0, bookingsByDay: [], servicesByCategory: [], cancellationsByReason: []
    };
    return this.mockData.getProStats(u.id);
  });

  pendingBookings = computed(() => this._bookings().filter(b => b.status === 'PENDING'));

  agendaBookings = computed(() =>
    this._bookings()
      .filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING')
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 4)
  );

  totalClients = computed(() => new Set(this._bookings().map(b => b.clientId)).size);

  chartData = computed((): { line: string; area: string; points: ChartPoint[] } => {
    const data = this.revenueMonths;
    const W = 560, H = 140, PX = 10, PY = 15;
    const vals = data.map(d => d.value);
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    const range = max - min || 1;
    const pts: ChartPoint[] = data.map((d, i) => ({
      x: PX + (i / (data.length - 1)) * (W - 2 * PX),
      y: PY + (1 - (d.value - min) / range) * (H - 2 * PY)
    }));
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${H} L${pts[0].x.toFixed(1)},${H} Z`;
    return { line, area, points: pts };
  });

  ngOnInit(): void {
    const user = this.user();
    if (user) {
      this._bookings.set(this.mockData.getBookingsByProfessional(user.id));
    }
  }

  onConfirm(bookingId: string): void {
    this.mockData.confirmBooking(bookingId);
    this.refreshBookings();
  }

  onRefuse(bookingId: string): void {
    this.mockData.cancelBooking(bookingId, 'PRO', 'OTHER');
    this.refreshBookings();
  }

  getAgendaBadgeBg(status: Booking['status']): string {
    if (status === 'CONFIRMED') return '#dcfce7';
    if (status === 'PENDING')   return '#fef3c7';
    return '#ede9fe';
  }

  getAgendaBadgeColor(status: Booking['status']): string {
    if (status === 'CONFIRMED') return '#16a34a';
    if (status === 'PENDING')   return '#d97706';
    return '#7c3aed';
  }

  getAgendaBadgeLabel(status: Booking['status']): string {
    if (status === 'CONFIRMED') return 'CONFIRMÉ';
    if (status === 'PENDING')   return 'EN ATTENTE';
    return 'À VENIR';
  }

  private refreshBookings(): void {
    const user = this.user();
    if (user) this._bookings.set(this.mockData.getBookingsByProfessional(user.id));
  }
}
