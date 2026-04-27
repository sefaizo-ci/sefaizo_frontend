import { Component, OnInit, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, Wallet, Business, ProStats, User } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-pro-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe, DateFormatPipe, BadgeComponent],
  template: `
    <div class="space-y-6">
      <!-- Welcome Banner -->
      <div class="relative overflow-hidden rounded-2xl text-white p-6 md:p-8"
        style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d50 60%, #3d1a3d 100%)">
        <div class="relative z-10">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p class="text-white/60 text-sm mb-1">Bonjour,</p>
              <h1 class="text-2xl md:text-3xl font-bold">{{ user()?.firstName }} {{ user()?.lastName }}</h1>
              @if (business()) {
                <p class="text-white/70 mt-1 text-sm">{{ business()!.name }}</p>
              }
            </div>
            <div class="flex items-center gap-2">
              @if (business()?.kycStatus === 'APPROVED') {
                <div class="flex items-center gap-2 bg-green-500/20 border border-green-400/30 px-3 py-1.5 rounded-lg">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-sm text-green-300 font-medium">Boutique vérifiée</span>
                </div>
              } @else if (business()?.kycStatus === 'PENDING') {
                <div class="flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 px-3 py-1.5 rounded-lg">
                  <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span class="text-sm text-yellow-300 font-medium">Vérification en cours</span>
                </div>
              }
            </div>
          </div>

          <!-- Quick Stats Row -->
          <div class="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            <div class="bg-white/10 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold">{{ proStats().completedBookings }}</div>
              <div class="text-xs text-white/60 mt-0.5">Terminés</div>
            </div>
            <div class="bg-white/10 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold">{{ proStats().pendingBookings }}</div>
              <div class="text-xs text-white/60 mt-0.5">En attente</div>
            </div>
            <div class="bg-white/10 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold">{{ proStats().averageRating | number: '1.1-1' }}</div>
              <div class="text-xs text-white/60 mt-0.5">Note /5</div>
            </div>
            <div class="hidden md:block bg-white/10 rounded-xl p-3 text-center">
              <div class="text-2xl font-bold">{{ proStats().totalReviews }}</div>
              <div class="text-xs text-white/60 mt-0.5">Avis</div>
            </div>
          </div>
        </div>

        <!-- Decorative circles -->
        <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5"></div>
        <div class="absolute -right-5 bottom-0 w-24 h-24 rounded-full bg-primary/20"></div>
      </div>

      <!-- Revenue & Wallet -->
      <div class="grid md:grid-cols-3 gap-4">
        <div class="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-secondary">Revenus</h2>
            <a routerLink="/espace-pro/statistiques" class="text-sm text-primary hover:underline">Voir les stats</a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-50 rounded-xl p-4">
              <div class="text-xs text-secondary-gray mb-1">Ce mois</div>
              <div class="text-xl font-bold text-green-700">{{ proStats().monthlyRevenue | fcfa }}</div>
            </div>
            <div class="bg-blue-50 rounded-xl p-4">
              <div class="text-xs text-secondary-gray mb-1">Cette semaine</div>
              <div class="text-xl font-bold text-blue-700">{{ proStats().weeklyRevenue | fcfa }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-secondary">Wallet</h2>
            <a routerLink="/espace-pro/wallet" class="text-sm text-primary hover:underline">Gérer</a>
          </div>
          @if (wallet()) {
            <div class="text-center">
              <div class="text-3xl font-bold text-secondary">{{ wallet()!.balance | fcfa:false }}</div>
              <div class="text-xs text-secondary-gray mt-1">FCFA disponible</div>
              @if (wallet()!.pendingBalance > 0) {
                <div class="mt-2 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                  + {{ wallet()!.pendingBalance | fcfa:false }} FCFA en attente
                </div>
              }
              <a routerLink="/espace-pro/wallet" class="mt-3 block btn-primary text-center text-sm py-2">
                Demander un reversement
              </a>
            </div>
          }
        </div>
      </div>

      <!-- Quick Actions -->
      <div>
        <h2 class="font-semibold text-secondary mb-3">Actions rapides</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          @for (action of quickActions; track action.route) {
            <a [routerLink]="action.route"
              class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-primary/30 hover:shadow-md transition-all group text-center">
              <div class="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center transition-colors"
                [style.background]="action.bgColor">
                <svg class="w-5 h-5" [style.color]="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" [attr.d]="action.icon"/>
                </svg>
              </div>
              <div class="text-sm font-medium text-secondary group-hover:text-primary transition-colors">{{ action.label }}</div>
            </a>
          }
        </div>
      </div>

      <!-- Pending Bookings Alert -->
      @if (pendingBookings().length > 0) {
        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-4">
          <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex-1">
            <div class="font-medium text-yellow-800">{{ pendingBookings().length }} réservation(s) en attente de confirmation</div>
            <div class="text-sm text-yellow-700 mt-0.5">Confirmez ou refusez rapidement pour éviter les annulations automatiques</div>
          </div>
          <a routerLink="/espace-pro/agenda" class="flex-shrink-0 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
            Voir l'agenda
          </a>
        </div>
      }

      <!-- Recent Bookings -->
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div class="p-5 border-b flex items-center justify-between">
          <h2 class="font-semibold text-secondary">Réservations récentes</h2>
          <a routerLink="/espace-pro/agenda" class="text-sm text-primary hover:underline">Voir tout</a>
        </div>

        @if (recentBookings().length === 0) {
          <div class="p-12 text-center">
            <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p class="text-secondary-gray">Aucune réservation pour le moment</p>
          </div>
        } @else {
          <div class="divide-y divide-gray-50">
            @for (booking of recentBookings(); track booking.id) {
              <div class="p-5">
                <div class="flex justify-between items-center gap-4">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                      <img [src]="booking.clientAvatar || 'https://i.pravatar.cc/40'" [alt]="booking.clientName" class="w-full h-full object-cover">
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-medium text-secondary text-sm">{{ booking.clientName }}</span>
                        <app-badge [variant]="getStatusVariant(booking.status)" class="text-xs">
                          {{ getStatusLabel(booking.status) }}
                        </app-badge>
                      </div>
                      <div class="text-xs text-secondary-gray mt-0.5">
                        {{ booking.service.name }} · {{ booking.date | dateFormat: 'short' }} {{ booking.time }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-sm font-bold text-primary">{{ booking.total | fcfa }}</div>
                    <div class="text-xs text-secondary-gray">{{ booking.type === 'SALON' ? 'Au salon' : 'À domicile' }}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- Boutique Completion Card -->
      @if (boutiqueCompletion() < 100) {
        <div class="bg-gradient-to-br from-primary/5 to-purple-50 border border-primary/20 rounded-xl p-6">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-secondary">Complétez votre boutique</h3>
              <p class="text-sm text-secondary-gray mt-1">Une boutique complète attire 3x plus de clients</p>
              <div class="mt-3">
                <div class="flex items-center justify-between text-xs text-secondary-gray mb-1">
                  <span>Progression</span>
                  <span class="font-medium">{{ boutiqueCompletion() }}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full transition-all" [style.width.%]="boutiqueCompletion()"></div>
                </div>
              </div>
              <a routerLink="/espace-pro/boutique" class="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                Personnaliser ma boutique →
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ProDashboardComponent implements OnInit {
  private _bookings = signal<Booking[]>([]);
  private _wallet = signal<Wallet | null>(null);

  quickActions = [
    {
      label: 'Ma Boutique',
      route: '/espace-pro/boutique',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      bgColor: '#fce7f3',
      iconColor: '#e91e63'
    },
    {
      label: 'Ajouter service',
      route: '/espace-pro/services',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      bgColor: '#dbeafe',
      iconColor: '#2563eb'
    },
    {
      label: 'Mes Clients',
      route: '/espace-pro/clients',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      bgColor: '#dcfce7',
      iconColor: '#16a34a'
    },
    {
      label: 'Statistiques',
      route: '/espace-pro/statistiques',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      bgColor: '#fef3c7',
      iconColor: '#d97706'
    },
  ];

  user!: Signal<User | null>;

  constructor(
    private mockData: MockDataService,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

  business = computed<Business | null>(() => {
    const u = this.user();
    if (!u) return null;
    return this.mockData.getBusinesses().find(b => b.professionalId === u.id) ?? null;
  });

  proStats = computed<ProStats>(() => {
    const u = this.user();
    if (!u) return {
      totalBookings: 0, pendingBookings: 0, confirmedBookings: 0,
      cancelledBookings: 0, completedBookings: 0, monthlyRevenue: 0,
      weeklyRevenue: 0, averageRating: 0, totalReviews: 0,
      referralPoints: 0, bookingsByDay: [], servicesByCategory: [], cancellationsByReason: []
    };
    return this.mockData.getProStats(u.id);
  });

  wallet = this._wallet.asReadonly();

  recentBookings = computed(() => this._bookings().slice(0, 6));
  pendingBookings = computed(() => this._bookings().filter(b => b.status === 'PENDING'));

  boutiqueCompletion = computed(() => {
    const b = this.business();
    if (!b) return 20;
    let score = 0;
    if (b.name) score += 20;
    if (b.description) score += 20;
    if (b.coverImage) score += 20;
    if (b.services.length > 0) score += 20;
    if (b.workingHours.some(w => w.isOpen)) score += 20;
    return score;
  });

  ngOnInit(): void {
    const user = this.user();
    if (user) {
      const bookings = this.mockData.getBookingsByProfessional(user.id);
      this._bookings.set(bookings);
      this._wallet.set(this.mockData.wallet());
    }
  }

  getStatusVariant(status: Booking['status']): 'success' | 'warning' | 'error' | 'info' | 'neutral' {
    switch (status) {
      case 'CONFIRMED':
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'CANCELLED': return 'error';
      default: return 'info';
    }
  }

  getStatusLabel(status: Booking['status']): string {
    const labels: Record<string, string> = {
      PENDING: 'En attente', CONFIRMED: 'Confirmé',
      COMPLETED: 'Terminé', CANCELLED: 'Annulé', NO_SHOW: 'Absent'
    };
    return labels[status] ?? status;
  }
}
