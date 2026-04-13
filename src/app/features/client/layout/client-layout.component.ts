import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Client Space Top Bar -->
      <div class="bg-white shadow-sm mb-6">
        <div class="container-custom py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <a routerLink="/" class="text-primary font-bold text-xl hover:text-primary-dark transition-colors">
                ← Retour à l'accueil
              </a>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-secondary-gray text-sm hidden sm:inline">
                Connecté(e) en tant que <strong class="text-secondary">{{ getUser()?.firstName }} {{ getUser()?.lastName }}</strong>
              </span>
              <button (click)="logout()" class="text-red-600 hover:text-red-700 text-sm font-medium">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Sidebar Navigation -->
          <aside class="md:w-64 flex-shrink-0">
            <nav class="bg-white rounded-md shadow p-4 sticky top-24">
              <!-- Mobile User Info -->
              <div class="md:hidden flex items-center gap-2 mb-4 pb-4 border-b">
                <img
                  [src]="getUser()?.avatar || 'https://via.placeholder.com/40'"
                  [alt]="getUser()?.firstName"
                  class="w-10 h-10 rounded-full">
                <div>
                  <div class="font-semibold text-secondary">{{ getUser()?.firstName }} {{ getUser()?.lastName }}</div>
                  <div class="text-xs text-secondary-gray">{{ getUser()?.email }}</div>
                </div>
              </div>

              <ul class="space-y-1">
                <li>
                  <a
                    routerLink="/espace-client"
                    routerLinkActive="bg-primary/10 text-primary"
                    class="flex items-center gap-3 px-4 py-3 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Tableau de bord
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/reservations"
                    routerLinkActive="bg-primary/10 text-primary"
                    class="flex items-center gap-3 px-4 py-3 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Mes Réservations
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/profil"
                    routerLinkActive="bg-primary/10 text-primary"
                    class="flex items-center gap-3 px-4 py-3 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Mon Profil
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/favorites"
                    routerLinkActive="bg-primary/10 text-primary"
                    class="flex items-center gap-3 px-4 py-3 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    Mes Favoris
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/notifications"
                    routerLinkActive="bg-primary/10 text-primary"
                    class="flex items-center gap-3 px-4 py-3 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                    Notifications
                    <span class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                  </a>
                </li>
              </ul>

              <div class="mt-6 pt-6 border-t">
                <a
                  routerLink="/recherche"
                  class="flex items-center gap-3 px-4 py-3 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Réserver un service
                </a>
              </div>
            </nav>
          </aside>

          <!-- Main Content -->
          <main class="flex-1">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientLayoutComponent {
  constructor(private authService: AuthService) {}

  getUser() {
    return this.authService.user();
  }

  logout(): void {
    this.authService.logout();
  }
}
