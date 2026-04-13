import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, Wallet } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-pro-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FcfaPipe,
    DateFormatPipe,
    BadgeComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="text-white py-8" style="background: linear-gradient(135deg, #2d2d319c 0%, #1a1a1e9c 100%);">
        <div class="container-custom">
          <h1 class="text-3xl font-bold mb-2">Espace Professionnel</h1>
          <p class="text-white/80">Gérez votre activité en toute simplicité</p>
        </div>
      </div>

      <div class="container-custom py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-md shadow p-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-secondary">{{ stats.reservations }}</div>
                <div class="text-sm text-secondary-gray">Réservations ce mois</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-md shadow p-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-secondary">{{ walletBalance }}</div>
                <div class="text-sm text-secondary-gray">Solde disponible</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-md shadow p-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-secondary">{{ stats.enAttente }}</div>
                <div class="text-sm text-secondary-gray">En attente</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-md shadow p-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-secondary">4.8</div>
                <div class="text-sm text-secondary-gray">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <a routerLink="/espace-pro/services" class="bg-white rounded-md shadow p-6 hover:shadow-md transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-secondary">Ajouter un service</h3>
                <p class="text-sm text-secondary-gray">Créez une nouvelle prestation</p>
              </div>
            </div>
          </a>

          <a routerLink="/espace-pro/agenda" class="bg-white rounded-md shadow p-6 hover:shadow-md transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-secondary">Voir l'agenda</h3>
                <p class="text-sm text-secondary-gray">Gérez vos rendez-vous</p>
              </div>
            </div>
          </a>

          <a routerLink="/espace-pro/wallet" class="bg-white rounded-md shadow p-6 hover:shadow-md transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-secondary">Demander un reversement</h3>
                <p class="text-sm text-secondary-gray">Transférez vos gains</p>
              </div>
            </div>
          </a>
        </div>

        <div class="bg-white rounded-md shadow">
          <div class="p-6 border-b">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold text-secondary">Réservations récentes</h2>
              <a routerLink="/espace-pro/agenda" class="text-primary font-medium hover:text-primary-dark text-sm">
                Voir tout
              </a>
            </div>
          </div>

          <div class="divide-y">
            @for (booking of recentBookings; track booking.id) {
              <div class="p-6">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="font-semibold text-secondary">{{ booking.clientName }}</h3>
                      <app-badge [variant]="getStatusBadgeVariant(booking.status)">
                        {{ getStatusLabel(booking.status) }}
                      </app-badge>
                    </div>
                    <p class="text-secondary-gray">{{ booking.service.name }}</p>
                    <div class="flex items-center gap-4 mt-2 text-sm text-secondary-gray">
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
                        {{ booking.time }}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">{{ booking.total | fcfa }}</div>
                    <div class="text-sm text-secondary-gray">{{ booking.type === 'SALON' ? 'Au salon' : 'À domicile' }}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProDashboardComponent implements OnInit {
  stats = {
    reservations: 0,
    enAttente: 0,
    chiffreAffaires: 0
  };

  recentBookings: Booking[] = [];
  walletBalance = '0 FCFA';

  constructor(
    private mockData: MockDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user();
    if (user) {
      const bookings = this.mockData.getBookingsByProfessional(user.id);
      this.recentBookings = bookings.slice(0, 5);
      
      this.stats.reservations = bookings.filter(
        b => b.status === 'CONFIRMED' || b.status === 'COMPLETED'
      ).length;
      
      this.stats.enAttente = bookings.filter(
        b => b.status === 'PENDING'
      ).length;

      const wallet = this.mockData.wallet();
      if (wallet) {
        this.walletBalance = new Intl.NumberFormat('fr-FR').format(wallet.balance) + ' FCFA';
      }
    }
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
}
