import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, Review, ProStats } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-pro-statistiques',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe, DateFormatPipe],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-secondary">Statistiques</h1>
          <p class="text-secondary-gray mt-1">Suivez la performance de votre activité</p>
        </div>
        <select [(ngModel)]="period" (ngModelChange)="onPeriodChange()"
          class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-sm text-secondary-gray">Revenus</span>
          </div>
          <div class="text-2xl font-bold text-secondary">{{ stats().monthlyRevenue | fcfa:false }}</div>
          <div class="text-xs text-secondary-gray mt-1">FCFA ce mois</div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="text-sm text-secondary-gray">Réservations</span>
          </div>
          <div class="text-2xl font-bold text-secondary">{{ stats().totalBookings }}</div>
          <div class="text-xs text-secondary-gray mt-1">Total toutes périodes</div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </div>
            <span class="text-sm text-secondary-gray">Note moyenne</span>
          </div>
          <div class="text-2xl font-bold text-secondary">{{ stats().averageRating | number: '1.1-1' }}</div>
          <div class="text-xs text-secondary-gray mt-1">{{ stats().totalReviews }} avis clients</div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-sm text-secondary-gray">Terminés</span>
          </div>
          <div class="text-2xl font-bold text-secondary">{{ stats().completedBookings }}</div>
          <div class="text-xs text-secondary-gray mt-1">
            Taux: {{ completionRate() }}%
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Revenue by Week -->
        <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-secondary mb-4">Revenus des 7 derniers jours</h2>
          <div class="flex items-end gap-2 h-40">
            @for (day of revenueChart(); track day.date) {
              <div class="flex-1 flex flex-col items-center gap-1">
                <div class="text-xs text-secondary-gray font-medium">{{ day.revenue > 0 ? (day.revenue / 1000 | number: '1.0-0') + 'k' : '' }}</div>
                <div class="w-full rounded-t-md transition-all"
                  [style.height.%]="day.heightPercent"
                  [class]="day.heightPercent > 0 ? 'bg-primary' : 'bg-gray-100'"
                  style="min-height: 4px">
                </div>
                <div class="text-xs text-secondary-gray">{{ day.label }}</div>
              </div>
            }
          </div>
          <div class="mt-4 pt-4 border-t flex items-center justify-between text-sm">
            <span class="text-secondary-gray">Total semaine</span>
            <span class="font-bold text-secondary">{{ weeklyTotal() | fcfa }}</span>
          </div>
        </div>

        <!-- Booking Status Breakdown -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-secondary mb-4">Statut des réservations</h2>
          <div class="space-y-3">
            @for (item of statusBreakdown(); track item.label) {
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-secondary-gray">{{ item.label }}</span>
                  <span class="font-medium text-secondary">{{ item.count }}</span>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all"
                    [style.width.%]="item.percent"
                    [style.background]="item.color">
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="mt-6 pt-4 border-t">
            <div class="text-sm text-secondary-gray mb-3">Taux d'annulation</div>
            <div class="text-3xl font-bold" [class]="cancellationRate() > 20 ? 'text-red-500' : 'text-green-600'">
              {{ cancellationRate() }}%
            </div>
            <div class="text-xs text-secondary-gray mt-1">
              @if (cancellationRate() <= 10) { Excellent }
              @else if (cancellationRate() <= 20) { Acceptable }
              @else { À améliorer }
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Top Services -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-secondary mb-4">Top services</h2>
          @if (topServices().length === 0) {
            <p class="text-secondary-gray text-sm">Aucune donnée disponible</p>
          } @else {
            <div class="space-y-3">
              @for (svc of topServices(); track svc.name; let i = $index) {
                <div class="flex items-center gap-4">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    [class]="i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-50 text-orange-600'">
                    {{ i + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-secondary truncate">{{ svc.name }}</div>
                    <div class="text-xs text-secondary-gray">{{ svc.count }} réservations</div>
                  </div>
                  <div class="text-sm font-bold text-primary">{{ svc.revenue | fcfa }}</div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Recent Reviews -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-secondary">Avis récents</h2>
            <div class="flex items-center gap-1">
              @for (star of [1,2,3,4,5]; track star) {
                <svg class="w-4 h-4" [class]="star <= stats().averageRating ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              }
              <span class="ml-1 text-sm font-bold text-secondary">{{ stats().averageRating | number: '1.1-1' }}</span>
            </div>
          </div>

          @if (recentReviews().length === 0) {
            <div class="text-center py-8">
              <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <p class="text-sm text-secondary-gray">Aucun avis pour le moment</p>
            </div>
          } @else {
            <div class="space-y-4">
              @for (review of recentReviews(); track review.id) {
                <div class="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div class="flex items-center gap-3 mb-2">
                    <img [src]="review.clientAvatar || 'https://i.pravatar.cc/40'" [alt]="review.clientName"
                      class="w-8 h-8 rounded-full object-cover">
                    <div class="flex-1">
                      <div class="text-sm font-medium text-secondary">{{ review.clientName }}</div>
                      <div class="flex items-center gap-1">
                        @for (star of [1,2,3,4,5]; track star) {
                          <svg class="w-3 h-3" [class]="star <= review.rating ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        }
                      </div>
                    </div>
                    <span class="text-xs text-secondary-gray">{{ review.createdAt | dateFormat: 'short' }}</span>
                  </div>
                  @if (review.comment) {
                    <p class="text-sm text-secondary-gray leading-relaxed">{{ review.comment }}</p>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Service Category Distribution -->
      @if (stats().servicesByCategory.length > 0) {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-secondary mb-4">Réservations par catégorie</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (cat of stats().servicesByCategory; track cat.category) {
              <div class="p-4 bg-gray-50 rounded-xl">
                <div class="text-sm font-medium text-secondary mb-1">{{ cat.category }}</div>
                <div class="text-2xl font-bold text-primary">{{ cat.bookings }}</div>
                <div class="text-xs text-secondary-gray">{{ cat.revenue | fcfa }}</div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ProStatistiquesComponent implements OnInit {
  period = 'month';

  private bookings = signal<Booking[]>([]);
  private reviews = signal<Review[]>([]);
  private _stats = signal<ProStats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    completedBookings: 0,
    monthlyRevenue: 0,
    weeklyRevenue: 0,
    averageRating: 0,
    totalReviews: 0,
    referralPoints: 0,
    bookingsByDay: [],
    servicesByCategory: [],
    cancellationsByReason: []
  });

  stats = this._stats.asReadonly();

  constructor(
    private authService: AuthService,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const user = this.authService.user();
    if (!user) return;

    const bk = this.mockData.getBookingsByProfessional(user.id);
    this.bookings.set(bk);

    const business = this.mockData.getBusinesses().find(b => b.professionalId === user.id);
    if (business) {
      const rv = this.mockData.getReviewsByBusiness(business.id);
      this.reviews.set(rv);
    }

    const s = this.mockData.getProStats(user.id);
    this._stats.set(s);
  }

  onPeriodChange(): void {
    this.loadData();
  }

  completionRate = computed(() => {
    const s = this.stats();
    if (s.totalBookings === 0) return 0;
    return Math.round((s.completedBookings / s.totalBookings) * 100);
  });

  cancellationRate = computed(() => {
    const s = this.stats();
    if (s.totalBookings === 0) return 0;
    return Math.round((s.cancelledBookings / s.totalBookings) * 100);
  });

  weeklyTotal = computed(() => this.stats().weeklyRevenue);

  recentReviews = computed(() => this.reviews().slice(0, 3));

  topServices = computed(() => {
    const bk = this.bookings();
    const map = new Map<string, { name: string; count: number; revenue: number }>();
    for (const b of bk) {
      const key = b.service.name;
      const existing = map.get(key) || { name: key, count: 0, revenue: 0 };
      existing.count++;
      existing.revenue += b.total;
      map.set(key, existing);
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 5);
  });

  statusBreakdown = computed(() => {
    const s = this.stats();
    const total = s.totalBookings || 1;
    return [
      { label: 'Terminés', count: s.completedBookings, color: '#16a34a', percent: (s.completedBookings / total) * 100 },
      { label: 'Confirmés', count: s.confirmedBookings, color: '#2563eb', percent: (s.confirmedBookings / total) * 100 },
      { label: 'En attente', count: s.pendingBookings, color: '#f59e0b', percent: (s.pendingBookings / total) * 100 },
      { label: 'Annulés', count: s.cancelledBookings, color: '#ef4444', percent: (s.cancelledBookings / total) * 100 },
    ];
  });

  revenueChart = computed(() => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const today = new Date();
    const data = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const bk = this.bookings().filter(b => {
        const bd = new Date(b.date);
        return bd.toDateString() === d.toDateString() && b.status === 'COMPLETED';
      });
      const revenue = bk.reduce((sum, b) => sum + b.total, 0);
      return { date: d.toDateString(), label: days[d.getDay()], revenue };
    });

    const max = Math.max(...data.map(d => d.revenue), 1);
    return data.map(d => ({ ...d, heightPercent: (d.revenue / max) * 100 }));
  });
}
