import { Component, signal, computed, Signal } from '@angular/core';
import { User } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-pro-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Top Bar -->
      <div class="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div class="container-custom py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button
                (click)="mobileNavOpen.set(!mobileNavOpen())"
                class="md:hidden p-2 rounded-md text-secondary-gray hover:bg-gray-100">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <a routerLink="/" class="flex items-center gap-2 text-secondary font-bold text-lg">
                <span class="text-primary">SEFAIZO</span>
                <span class="text-xs text-secondary-gray font-normal hidden sm:inline">/ Espace Pro</span>
              </a>
            </div>

            <div class="flex items-center gap-3">
              <!-- Boutique Status Badge -->
              @if (business()) {
                <div class="hidden sm:flex items-center gap-2 text-sm">
                  <span class="w-2 h-2 rounded-full"
                    [class]="business()!.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-400'">
                  </span>
                  <span class="text-secondary-gray">
                    {{ business()!.status === 'ACTIVE' ? 'Boutique active' : 'En attente' }}
                  </span>
                </div>
              }
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-primary font-bold text-sm">{{ initials() }}</span>
                </div>
                <div class="hidden sm:block text-right">
                  <div class="text-sm font-semibold text-secondary">{{ user()?.firstName }}</div>
                  <div class="text-xs text-secondary-gray">Pro</div>
                </div>
              </div>
              <button (click)="logout()" class="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-custom py-6">
        <div class="flex gap-6">
          <!-- Sidebar -->
          <aside
            class="flex-shrink-0 md:w-60"
            [class]="mobileNavOpen() ? 'block fixed inset-0 z-40 pt-16 bg-white/95 backdrop-blur-sm md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none' : 'hidden md:block'">

            <nav class="bg-white rounded-xl border border-gray-100 shadow-sm p-3 md:sticky md:top-20">
              <!-- Business Info Header -->
              @if (business()) {
                <div class="px-3 py-3 mb-2 border-b border-gray-100">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg overflow-hidden bg-primary/10 flex-shrink-0">
                      @if (business()!.avatar) {
                        <img [src]="business()!.avatar" [alt]="business()!.name" class="w-full h-full object-cover">
                      } @else {
                        <div class="w-full h-full flex items-center justify-center text-primary font-bold">
                          {{ business()!.name.charAt(0) }}
                        </div>
                      }
                    </div>
                    <div class="min-w-0">
                      <div class="text-sm font-semibold text-secondary truncate">{{ business()!.name }}</div>
                      <div class="text-xs text-secondary-gray">{{ business()!.categories[0] }}</div>
                    </div>
                  </div>
                </div>
              }

              <ul class="space-y-0.5">
                <li>
                  <a routerLink="/espace-pro"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    [routerLinkActiveOptions]="{exact: true}"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Tableau de bord
                  </a>
                </li>

                <li>
                  <a routerLink="/espace-pro/boutique"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    Ma Boutique
                  </a>
                </li>

                <li>
                  <a routerLink="/espace-pro/services"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                    </svg>
                    Mes Services
                  </a>
                </li>

                <li>
                  <a routerLink="/espace-pro/agenda"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Agenda
                    @if (pendingCount() > 0) {
                      <span class="ml-auto bg-yellow-400 text-secondary-dark text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {{ pendingCount() }}
                      </span>
                    }
                  </a>
                </li>

                <li>
                  <a routerLink="/espace-pro/clients"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Mes Clients
                  </a>
                </li>

                <li>
                  <a routerLink="/espace-pro/statistiques"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Statistiques
                  </a>
                </li>

                <li>
                  <a routerLink="/espace-pro/wallet"
                    routerLinkActive="bg-primary/10 text-primary font-semibold"
                    (click)="mobileNavOpen.set(false)"
                    class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    Wallet
                  </a>
                </li>
              </ul>

              <div class="mt-3 pt-3 border-t border-gray-100 space-y-0.5">
                <a routerLink="/espace-pro/parametres"
                  routerLinkActive="bg-primary/10 text-primary font-semibold"
                  (click)="mobileNavOpen.set(false)"
                  class="nav-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-secondary-gray hover:bg-gray-50 hover:text-secondary transition-all text-sm">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Paramètres
                </a>

                @if (business()) {
                  <a [routerLink]="['/pro', business()!.slug]"
                    target="_blank"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-primary hover:bg-primary/5 transition-all text-sm font-medium">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Voir ma boutique
                  </a>
                }
              </div>
            </nav>
          </aside>

          <!-- Main Content -->
          <main class="flex-1 min-w-0">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProLayoutComponent {
  mobileNavOpen = signal(false);
  user!: Signal<User | null>;

  constructor(
    private authService: AuthService,
    private mockData: MockDataService
  ) {
    this.user = this.authService.user;
  }

  initials = computed(() => {
    const u = this.user();
    if (!u) return 'P';
    return `${u.firstName.charAt(0)}${u.lastName.charAt(0)}`.toUpperCase();
  });

  business = computed(() => {
    const u = this.user();
    if (!u) return null;
    return this.mockData.getBusinesses().find(b => b.professionalId === u.id) ?? null;
  });

  pendingCount = computed(() => {
    const u = this.user();
    if (!u) return 0;
    return this.mockData.getBookingsByProfessional(u.id).filter(b => b.status === 'PENDING').length;
  });

  logout(): void {
    this.authService.logout();
  }
}
