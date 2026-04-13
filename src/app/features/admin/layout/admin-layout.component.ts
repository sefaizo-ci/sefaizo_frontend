import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen flex-shrink-0">
        <!-- Logo -->
        <div class="p-6 border-b">
          <a href="/" class="flex items-center gap-3">
            <img src="/Logoheder.png" alt="SEFAIZO" class="h-10 w-auto">
            <span class="text-lg font-bold text-secondary">Admin</span>
          </a>
        </div>

        <!-- Navigation -->
        <nav class="p-4 space-y-1">
          <a
            routerLink="/admin"
            routerLinkActive="bg-primary/10 text-primary"
            [routerLinkActiveOptions]="{exact: true}"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Tableau de bord
          </a>

          <a
            routerLink="/admin/professionals"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Professionnels
          </a>

          <a
            routerLink="/admin/clients"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            Clients
          </a>

          <a
            routerLink="/admin/bookings"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Réservations
          </a>

          <a
            routerLink="/admin/commissions"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Commissions & Revenus
          </a>

          <a
            routerLink="/admin/kyc"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Vérification KYC
            <span class="ml-auto bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">3</span>
          </a>

          <a
            routerLink="/admin/statistics"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Statistiques
          </a>

          <a
            routerLink="/admin/monetization"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            Monétisation
          </a>

          <a
            routerLink="/admin/cms"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Gestion du contenu
          </a>
        </nav>

        <!-- Back to site -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
          <a href="/" class="flex items-center gap-2 text-sm text-secondary-gray hover:text-secondary transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Retour au site
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent {
}
