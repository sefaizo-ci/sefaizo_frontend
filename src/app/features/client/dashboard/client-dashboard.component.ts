import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, FcfaPipe, DateFormatPipe, BadgeComponent],
  template: `
    <div class="space-y-5">

      <!-- Bannière de bienvenue -->
      <div class="rounded-2xl p-5 text-white relative overflow-hidden"
           style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
        <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full" style="background:rgba(255,255,255,0.08)"></div>
        <div class="absolute right-10 bottom-0 w-20 h-20 rounded-full" style="background:rgba(255,255,255,0.06)"></div>
        <div class="relative z-10">
          <h1 class="text-xl font-black mb-1">Bonjour, {{ getUser()?.firstName }} 👋</h1>
          <p class="text-white/75 text-sm">Retrouvez vos réservations et gérez votre compte.</p>
          <a routerLink="/recherche"
             class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
             style="background:white;color:#7c3aed">
            <lucide-icon name="search" [size]="14" [strokeWidth]="2"></lucide-icon>
            Réserver un service
          </a>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <lucide-icon name="calendar-days" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
          </div>
          <div class="text-2xl font-black" style="color:#111827">{{ stats.aVenir }}</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">À venir</div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <lucide-icon name="check-circle" [size]="16" [strokeWidth]="1.75" style="color:#16a34a"></lucide-icon>
            </div>
          </div>
          <div class="text-2xl font-black" style="color:#111827">{{ stats.terminees }}</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Terminées</div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <lucide-icon name="clock" [size]="16" [strokeWidth]="1.75" style="color:#d97706"></lucide-icon>
            </div>
          </div>
          <div class="text-2xl font-black" style="color:#111827">{{ stats.enAttente }}</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">En attente</div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <lucide-icon name="heart" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
          </div>
          <div class="text-2xl font-black" style="color:#111827">{{ stats.favoris }}</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Favoris</div>
        </div>
      </div>

      <!-- Raccourcis -->
      <div class="grid md:grid-cols-3 gap-3">
        <a routerLink="/recherche"
           class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
            <lucide-icon name="search" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
          </div>
          <div>
            <div class="font-bold text-sm" style="color:#111827">Nouvelle réservation</div>
            <div class="text-xs" style="color:#9ca3af">Trouver un salon</div>
          </div>
        </a>
        <a routerLink="/espace-client/reservations"
           class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
            <lucide-icon name="calendar-check" [size]="16" [strokeWidth]="1.75" style="color:#111827"></lucide-icon>
          </div>
          <div>
            <div class="font-bold text-sm" style="color:#111827">Mes réservations</div>
            <div class="text-xs" style="color:#9ca3af">Gérer mes RDV</div>
          </div>
        </a>
        <a routerLink="/espace-client/favorites"
           class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
            <lucide-icon name="heart" [size]="16" [strokeWidth]="1.75" style="color:#111827"></lucide-icon>
          </div>
          <div>
            <div class="font-bold text-sm" style="color:#111827">Mes favoris</div>
            <div class="text-xs" style="color:#9ca3af">Salons préférés</div>
          </div>
        </a>
      </div>

      <!-- Prochains RDV -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #f3f4f6">
          <div>
            <h2 class="font-bold text-sm" style="color:#111827">Prochains rendez-vous</h2>
            <p class="text-xs" style="color:#9ca3af">Vos réservations confirmées</p>
          </div>
          <a routerLink="/espace-client/reservations"
             class="text-xs font-semibold px-3 py-1.5 rounded-lg"
             style="background:#f3e8ff;color:#7c3aed">Voir tout</a>
        </div>

        @if (upcomingBookings.length === 0) {
          <div class="py-12 text-center">
            <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <lucide-icon name="calendar-days" [size]="22" [strokeWidth]="1.5" style="color:#a855f7"></lucide-icon>
            </div>
            <p class="font-semibold text-sm mb-1" style="color:#374151">Aucun rendez-vous à venir</p>
            <p class="text-xs mb-4" style="color:#9ca3af">Réservez votre premier service</p>
            <a routerLink="/recherche"
               class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
               style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
              Réserver maintenant
            </a>
          </div>
        } @else {
          <div class="divide-y divide-gray-50">
            @for (booking of upcomingBookings; track booking.id) {
              <div class="flex items-center gap-4 px-5 py-4">
                <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  <lucide-icon name="scissors" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="font-bold text-sm truncate" style="color:#111827">{{ booking.businessName }}</span>
                    <app-badge [variant]="getStatusBadgeVariant(booking.status)" class="flex-shrink-0">
                      {{ getStatusLabel(booking.status) }}
                    </app-badge>
                  </div>
                  <div class="text-xs" style="color:#6b7280">{{ booking.service.name }}</div>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="flex items-center gap-1 text-xs" style="color:#9ca3af">
                      <lucide-icon name="calendar" [size]="11" [strokeWidth]="2"></lucide-icon>
                      {{ booking.date | dateFormat: 'short' }}
                    </span>
                    <span class="flex items-center gap-1 text-xs" style="color:#9ca3af">
                      <lucide-icon name="clock" [size]="11" [strokeWidth]="2"></lucide-icon>
                      {{ booking.time }}
                    </span>
                  </div>
                </div>
                <div class="text-sm font-black flex-shrink-0" style="color:#a855f7">
                  {{ booking.total | fcfa }}
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
