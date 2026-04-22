import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule, LayoutDashboard, CalendarDays, UserRound, Heart, Bell, Search, ArrowLeft, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Client Space Top Bar -->
      <div class="bg-white border-b border-gray-100 mb-6">
        <div class="container-custom py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <a routerLink="/" class="flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors">
                <lucide-icon name="arrow-left" [size]="16" [strokeWidth]="2"></lucide-icon>
                Retour à l'accueil
              </a>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-secondary-gray text-sm hidden sm:inline">
                Connecté(e) en tant que <strong class="text-secondary">{{ getUser()?.firstName }} {{ getUser()?.lastName }}</strong>
              </span>
              <button (click)="logout()" class="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
                <lucide-icon name="log-out" [size]="15" [strokeWidth]="2"></lucide-icon>
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
            <nav class="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sticky top-24">
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

              <ul class="space-y-0.5">
                <li>
                  <a
                    routerLink="/espace-client"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    [routerLinkActiveOptions]="{exact: true}"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-medium hover:bg-gray-50 transition-all duration-150 group">
                    <lucide-icon name="layout-dashboard" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary"></lucide-icon>
                    Tableau de bord
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/reservations"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-medium hover:bg-gray-50 transition-all duration-150 group">
                    <lucide-icon name="calendar-days" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary"></lucide-icon>
                    Mes Réservations
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/profil"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-medium hover:bg-gray-50 transition-all duration-150 group">
                    <lucide-icon name="user-round" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary"></lucide-icon>
                    Mon Profil
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/favorites"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-medium hover:bg-gray-50 transition-all duration-150 group">
                    <lucide-icon name="heart" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary"></lucide-icon>
                    Mes Favoris
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/espace-client/notifications"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-medium hover:bg-gray-50 transition-all duration-150 group">
                    <lucide-icon name="bell" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary"></lucide-icon>
                    Notifications
                    <span class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                  </a>
                </li>
              </ul>

              <div class="mt-3 pt-3 border-t border-gray-100">
                <a
                  routerLink="/recherche"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-semibold bg-primary/5 hover:bg-primary/10 transition-all duration-150">
                  <lucide-icon name="search" [size]="18" [strokeWidth]="1.75"></lucide-icon>
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
