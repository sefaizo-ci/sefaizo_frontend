import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FcfaPipe,
    DateFormatPipe,
    BadgeComponent
  ],
  template: `
    <div>
      <!-- Welcome Header -->
      <div class="text-white rounded-md shadow-lg p-6 mb-8" style="background: linear-gradient(135deg, #2d2d319c 0%, #1a1a1e9c 100%);">
        <h1 class="text-2xl font-bold mb-2">Bonjour, {{ getUser()?.firstName }} 👋</h1>
        <p class="text-white/80">Retrouvez vos réservations et gérez votre profil</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-md shadow p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-secondary">{{ stats.aVenir }}</div>
              <div class="text-sm text-secondary-gray">À venir</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-md shadow p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-secondary">{{ stats.terminees }}</div>
              <div class="text-sm text-secondary-gray">Terminées</div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-secondary">{{ stats.favoris }}</div>
              <div class="text-sm text-secondary-gray">Favoris</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <a routerLink="/recherche" class="bg-white rounded-md shadow p-6 hover:shadow-md transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-secondary">Nouvelle réservation</h3>
              <p class="text-sm text-secondary-gray">Réserver un service</p>
            </div>
          </div>
        </a>

        <a routerLink="/espace-client/reservations" class="bg-white rounded-md shadow p-6 hover:shadow-md transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-secondary">Voir réservations</h3>
              <p class="text-sm text-secondary-gray">Gérer mes RDV</p>
            </div>
          </div>
        </a>

        <a routerLink="/espace-client/favorites" class="bg-white rounded-md shadow p-6 hover:shadow-md transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-secondary">Mes favoris</h3>
              <p class="text-sm text-secondary-gray">Salons préférés</p>
            </div>
          </div>
        </a>
      </div>

      <!-- Upcoming Bookings -->
      <div class="bg-white rounded-md shadow">
        <div class="p-6 border-b">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-secondary">Prochains rendez-vous</h2>
            <a routerLink="/espace-client/reservations" class="text-primary font-medium hover:text-primary-dark text-sm">
              Voir tout
            </a>
          </div>
        </div>

        @if (upcomingBookings.length === 0) {
          <div class="p-12 text-center">
            <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary mb-2">Aucun rendez-vous à venir</h3>
            <p class="text-secondary-gray mb-6">Réservez votre premier service dès maintenant</p>
            <a routerLink="/recherche" class="btn-primary inline-block">
              Réserver un service
            </a>
          </div>
        } @else {
          <div class="divide-y">
            @for (booking of upcomingBookings; track booking.id) {
              <div class="p-6">
                <div class="flex flex-col md:flex-row justify-between gap-4">
                  <div class="flex items-start gap-4">
                    <div class="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <h3 class="font-semibold text-secondary text-lg">{{ booking.businessName }}</h3>
                        <app-badge [variant]="getStatusBadgeVariant(booking.status)">
                          {{ getStatusLabel(booking.status) }}
                        </app-badge>
                      </div>
                      <p class="text-secondary-gray mb-3">{{ booking.service.name }}</p>
                      <div class="flex flex-wrap gap-4 text-sm text-secondary-gray">
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
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          </svg>
                          {{ booking.type === 'SALON' ? 'Au salon' : 'À domicile' }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end gap-2">
                    <div class="text-xl font-bold text-primary">{{ booking.total | fcfa }}</div>
                    <a
                      routerLink="/espace-client/reservations"
                      class="text-primary font-medium hover:text-primary-dark text-sm">
                      Voir détails
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ClientDashboardComponent implements OnInit {
  stats = {
    aVenir: 0,
    terminees: 0,
    enAttente: 0,
    favoris: 0
  };

  upcomingBookings: Booking[] = [];

  constructor(
    private mockData: MockDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user();
    if (user) {
      const allBookings = this.mockData.getBookingsByClient(user.id);
      
      this.stats.aVenir = allBookings.filter(b => b.status === 'CONFIRMED').length;
      this.stats.terminees = allBookings.filter(b => b.status === 'COMPLETED').length;
      this.stats.enAttente = allBookings.filter(b => b.status === 'PENDING').length;
      this.stats.favoris = 5; // Mock value
      
      this.upcomingBookings = allBookings
        .filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING')
        .slice(0, 3);
    }
  }

  getUser() {
    return this.authService.user();
  }

  getStatusBadgeVariant(status: Booking['status']): 'success' | 'warning' | 'error' | 'info' | 'neutral' {
    switch (status) {
      case 'CONFIRMED':
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
