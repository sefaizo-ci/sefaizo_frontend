import { Component, signal, computed, Signal } from '@angular/core';
import { User } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-pro-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <div class="min-h-screen flex" style="background:#f8f7fc">

      <!-- ══ SIDEBAR ══ -->
      <aside class="w-60 flex-shrink-0 flex flex-col bg-white border-r hidden md:flex"
             style="border-color:#f0edf8;min-height:100vh;position:sticky;top:0;height:100vh">

        <!-- Logo -->
        <div class="px-5 py-4" style="border-bottom:1px solid #f0edf8">
          <a href="/" class="flex items-center gap-2.5">
            <img src="/Splash.png" alt="SEFAIZO" class="h-8 w-auto">
            <div>
              <div class="text-sm font-black leading-tight" style="color:#111827">SEFAIZO</div>
              <div class="text-xs font-medium" style="color:#a855f7">Espace Pro</div>
            </div>
          </a>
        </div>

        <!-- Business info -->
        @if (business()) {
          <div class="px-4 py-3" style="border-bottom:1px solid #f0edf8">
            <div class="flex items-center gap-2.5 px-3 py-2 rounded-xl" style="background:#faf5ff">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-black"
                   style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
                {{ business()!.name.charAt(0) }}
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold truncate" style="color:#111827">{{ business()!.name }}</div>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        [style.background]="business()!.status === 'ACTIVE' ? '#16a34a' : '#d97706'"></span>
                  <span class="text-xs" style="color:#9ca3af">
                    {{ business()!.status === 'ACTIVE' ? 'Active' : 'En attente' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">

          <a routerLink="/espace-pro" [routerLinkActiveOptions]="{exact:true}"
             routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="layout-dashboard" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Tableau de bord
          </a>

          <a routerLink="/espace-pro/boutique" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="store" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Ma Boutique
          </a>

          <a routerLink="/espace-pro/services" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="scissors" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mes Services
          </a>

          <a routerLink="/espace-pro/agenda" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="calendar-days" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Agenda
            @if (pendingCount() > 0) {
              <span class="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style="background:#fef3c7;color:#d97706">{{ pendingCount() }}</span>
            }
          </a>

          <a routerLink="/espace-pro/clients" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="users" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mes Clients
          </a>

          <a routerLink="/espace-pro/statistiques" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="bar-chart-2" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Statistiques
          </a>

          <a routerLink="/espace-pro/wallet" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="wallet" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Wallet
          </a>

          <a routerLink="/espace-pro/parametres" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="settings" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Paramètres
          </a>
        </nav>

        <!-- Footer sidebar -->
        <div class="px-3 py-3 space-y-0.5" style="border-top:1px solid #f0edf8">
          @if (business()) {
            <a [routerLink]="['/pro', business()!.slug]" target="_blank" class="pro-nav-link">
              <lucide-icon name="external-link" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
              Voir ma boutique
            </a>
          }
          <a href="/" class="pro-nav-link">
            <lucide-icon name="arrow-left" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Retour au site
          </a>
          <button (click)="logout()" class="pro-nav-link w-full text-left" style="color:#dc2626">
            <lucide-icon name="log-out" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Déconnexion
          </button>
        </div>
      </aside>

      <!-- ══ CONTENU ══ -->
      <div class="flex-1 flex flex-col min-w-0">

        <!-- Top bar -->
        <div class="bg-white border-b flex items-center justify-between px-6 py-3 flex-shrink-0 sticky top-0 z-30"
             style="border-color:#f0edf8">

          <!-- Mobile menu button -->
          <button class="md:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  style="color:#6b7280" (click)="mobileNavOpen.set(!mobileNavOpen())">
            <lucide-icon name="menu" [size]="18" [strokeWidth]="2"></lucide-icon>
          </button>

          <!-- Breadcrumb desktop -->
          <div class="hidden md:flex items-center gap-1.5 text-sm">
            <span style="color:#9ca3af">espace-pro</span>
            <lucide-icon name="chevron-right" [size]="13" [strokeWidth]="2" style="color:#d1d5db"></lucide-icon>
            <span class="font-semibold" style="color:#111827">{{ user()?.firstName }} {{ user()?.lastName }}</span>
          </div>

          <!-- Right actions -->
          <div class="flex items-center gap-3">
            <button class="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                    style="color:#6b7280;border:1px solid #e5e7eb">
              <lucide-icon name="bell" [size]="16" [strokeWidth]="1.75"></lucide-icon>
              @if (pendingCount() > 0) {
                <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style="background:#a855f7"></span>
              }
            </button>
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
              {{ initials() }}
            </div>
          </div>
        </div>

        <!-- Mobile nav overlay -->
        @if (mobileNavOpen()) {
          <div class="fixed inset-0 z-40 md:hidden" style="background:rgba(17,24,39,0.5)"
               (click)="mobileNavOpen.set(false)">
            <aside class="w-64 h-full bg-white flex flex-col" (click)="$event.stopPropagation()">
              <div class="px-5 py-4" style="border-bottom:1px solid #f0edf8">
                <img src="/Splash.png" alt="SEFAIZO" class="h-8 w-auto">
              </div>
              <nav class="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
                @for (link of mobileLinks; track link.path) {
                  <a [routerLink]="link.path" routerLinkActive="pro-nav-active"
                     class="pro-nav-link" (click)="mobileNavOpen.set(false)">
                    <lucide-icon [name]="link.icon" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
                    {{ link.label }}
                  </a>
                }
              </nav>
              <div class="px-3 py-3" style="border-top:1px solid #f0edf8">
                <button (click)="logout()" class="pro-nav-link w-full text-left" style="color:#dc2626">
                  <lucide-icon name="log-out" [size]="16" [strokeWidth]="1.75"></lucide-icon>
                  Déconnexion
                </button>
              </div>
            </aside>
          </div>
        }

        <main class="flex-1 p-6 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .pro-nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 10px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #6b7280;
      transition: all 0.15s ease;
      cursor: pointer;
      text-decoration: none;
    }
    .pro-nav-link:hover { background:#faf5ff; color:#7c3aed; }
    .pro-nav-active { background:#f3e8ff !important; color:#7c3aed !important; font-weight:700; }
  `]
})
export class ProLayoutComponent {
  mobileNavOpen = signal(false);
  user!: Signal<User | null>;

  readonly mobileLinks = [
    { path: '/espace-pro',             icon: 'layout-dashboard', label: 'Tableau de bord' },
    { path: '/espace-pro/boutique',    icon: 'store',            label: 'Ma Boutique' },
    { path: '/espace-pro/services',    icon: 'scissors',         label: 'Mes Services' },
    { path: '/espace-pro/agenda',      icon: 'calendar-days',    label: 'Agenda' },
    { path: '/espace-pro/clients',     icon: 'users',            label: 'Mes Clients' },
    { path: '/espace-pro/statistiques',icon: 'bar-chart-2',      label: 'Statistiques' },
    { path: '/espace-pro/wallet',      icon: 'wallet',           label: 'Wallet' },
    { path: '/espace-pro/parametres',  icon: 'settings',         label: 'Paramètres' },
  ];

  constructor(private authService: AuthService, private mockData: MockDataService) {
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

  logout(): void { this.authService.logout(); }
}
