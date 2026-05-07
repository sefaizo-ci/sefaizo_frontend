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
      <aside class="flex-shrink-0 flex-col bg-white border-r border-[#e7e9f4] hidden md:flex"
             style="width:268px;min-height:100vh;position:sticky;top:0;height:100vh">

        <!-- Logo -->
        <div class="px-6 flex items-center border-b border-[#e7e9f4]" style="height:88px">
          <a href="/" class="flex items-center gap-3 no-underline">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">S</div>
            <div>
              <div class="text-[15px] font-black leading-tight" style="color:#11152f">SEFAIZO</div>
              <div class="text-xs font-bold" style="color:#7c3aed">Espace Pro</div>
            </div>
          </a>
        </div>

        <!-- Business info card -->
        @if (business()) {
          <div class="px-4 py-4 border-b border-[#e7e9f4]">
            <div class="flex items-center gap-3 p-3 rounded-2xl" style="background:#f7f5ff">
              <div class="w-[52px] h-[52px] rounded-xl overflow-hidden flex-shrink-0 bg-[#e7e9f4]">
                @if (business()!.coverImage) {
                  <img [src]="business()!.coverImage" [alt]="business()!.name"
                       class="w-full h-full object-cover">
                } @else {
                  <div class="w-full h-full flex items-center justify-center text-white font-black text-lg"
                       style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
                    {{ business()!.name.charAt(0) }}
                  </div>
                }
              </div>
              <div class="min-w-0">
                <div class="text-sm font-black truncate" style="color:#11152f">{{ business()!.name }}</div>
                <div class="flex items-center gap-1.5 mt-1">
                  <span class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        [style.background]="business()!.status === 'ACTIVE' ? '#10b45e' : '#d97706'"></span>
                  <span class="text-xs font-bold" style="color:#69708a">
                    {{ business()!.status === 'ACTIVE' ? 'Active' : 'En attente' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">

          <a routerLink="/espace-pro" [routerLinkActiveOptions]="{exact:true}"
             routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="layout-dashboard" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Tableau de bord
          </a>

          <a routerLink="/espace-pro/boutique" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="store" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Ma Boutique
          </a>

          <a routerLink="/espace-pro/services" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="scissors" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mes Services
          </a>

          <a routerLink="/espace-pro/agenda" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="calendar-days" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Agenda
            @if (pendingCount() > 0) {
              <span class="ml-auto text-xs font-black px-2 py-0.5 rounded-full"
                    style="background:#fef3c7;color:#d97706">{{ pendingCount() }}</span>
            }
          </a>

          <a routerLink="/espace-pro/clients" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="users" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mes Clients
          </a>

          <a routerLink="/espace-pro/statistiques" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="bar-chart-2" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Statistiques
          </a>

          <a routerLink="/espace-pro/wallet" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="wallet" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Wallet
          </a>

          <a routerLink="/espace-pro/parametres" routerLinkActive="pro-nav-active" class="pro-nav-link">
            <lucide-icon name="settings" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Paramètres
          </a>
        </nav>

        <!-- Footer sidebar -->
        <div class="px-3 py-4 space-y-0.5 border-t border-[#e7e9f4]">
          @if (business()) {
            <a [routerLink]="['/pro', business()!.slug]" target="_blank" class="pro-nav-link">
              <lucide-icon name="external-link" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
              Voir ma boutique
            </a>
          }
          <a href="/" class="pro-nav-link">
            <lucide-icon name="arrow-left" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Retour au site
          </a>
          <button (click)="logout()" class="pro-nav-link w-full text-left" style="color:#dc2626">
            <lucide-icon name="log-out" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Déconnexion
          </button>
        </div>
      </aside>

      <!-- ══ CONTENU ══ -->
      <div class="flex-1 flex flex-col min-w-0">

        <!-- Top bar -->
        <div class="bg-white border-b border-[#e7e9f4] flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-30"
             style="min-height:88px">

          <!-- Mobile menu button -->
          <button class="md:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  style="color:#69708a" (click)="mobileNavOpen.set(!mobileNavOpen())">
            <lucide-icon name="menu" [size]="20" [strokeWidth]="2"></lucide-icon>
          </button>

          <!-- Date / greeting desktop -->
          <div class="hidden md:flex flex-col">
            <span class="text-[13px] font-bold" style="color:#69708a">{{ todayLabel }}</span>
            <span class="text-[22px] font-black leading-tight" style="color:#11152f">
              Bonjour, {{ user()?.firstName }} 👋
            </span>
          </div>

          <!-- Right actions -->
          <div class="flex items-center gap-3">
            <button class="relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors border border-[#e7e9f4] hover:border-[#7c3aed]"
                    style="color:#69708a">
              <lucide-icon name="bell" [size]="18" [strokeWidth]="1.75"></lucide-icon>
              @if (pendingCount() > 0) {
                <span class="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-white" style="background:#7c3aed"></span>
              }
            </button>
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
              {{ initials() }}
            </div>
          </div>
        </div>

        <!-- Mobile nav overlay -->
        @if (mobileNavOpen()) {
          <div class="fixed inset-0 z-40 md:hidden" style="background:rgba(17,24,39,0.5)"
               (click)="mobileNavOpen.set(false)">
            <aside class="w-[268px] h-full bg-white flex flex-col" (click)="$event.stopPropagation()">
              <div class="px-6 py-5 border-b border-[#e7e9f4]">
                <div class="text-[15px] font-black" style="color:#11152f">SEFAIZO <span style="color:#7c3aed">Pro</span></div>
              </div>
              <nav class="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                @for (link of mobileLinks; track link.path) {
                  <a [routerLink]="link.path" routerLinkActive="pro-nav-active"
                     class="pro-nav-link" (click)="mobileNavOpen.set(false)">
                    <lucide-icon [name]="link.icon" [size]="18" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
                    {{ link.label }}
                  </a>
                }
              </nav>
              <div class="px-3 py-4 border-t border-[#e7e9f4]">
                <button (click)="logout()" class="pro-nav-link w-full text-left" style="color:#dc2626">
                  <lucide-icon name="log-out" [size]="18" [strokeWidth]="1.75"></lucide-icon>
                  Déconnexion
                </button>
              </div>
            </aside>
          </div>
        }

        <main class="flex-1 p-8 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .pro-nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
      min-height: 46px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 700;
      color: #69708a;
      transition: all 0.15s ease;
      cursor: pointer;
      text-decoration: none;
    }
    .pro-nav-link:hover { background:#f7f5ff; color:#7c3aed; }
    .pro-nav-active { background:#f3e8ff !important; color:#7c3aed !important; font-weight:900; }
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

  readonly todayLabel = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

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
