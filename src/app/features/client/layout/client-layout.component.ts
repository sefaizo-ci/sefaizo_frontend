import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <div class="min-h-screen flex" style="background:#f8f7fc">

      <!-- ══ SIDEBAR ══ -->
      <aside class="w-60 flex-shrink-0 flex-col bg-white border-r hidden md:flex"
             style="border-color:#f0edf8;min-height:100vh;position:sticky;top:0;height:100vh">

        <!-- Logo -->
        <div class="px-5 py-4" style="border-bottom:1px solid #f0edf8">
          <a href="/" class="flex items-center gap-2.5">
            <img src="/Splash.png" alt="SEFAIZO" class="h-8 w-auto">
            <div>
              <div class="text-sm font-black leading-tight" style="color:#111827">SEFAIZO</div>
              <div class="text-xs font-medium" style="color:#a855f7">Espace Client</div>
            </div>
          </a>
        </div>

        <!-- User info -->
        <div class="px-4 py-3" style="border-bottom:1px solid #f0edf8">
          <div class="flex items-center gap-2.5 px-3 py-2 rounded-xl" style="background:#faf5ff">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
              {{ (getUser()?.firstName?.charAt(0) ?? '') + (getUser()?.lastName?.charAt(0) ?? '') }}
            </div>
            <div class="min-w-0">
              <div class="text-xs font-bold truncate" style="color:#111827">
                {{ getUser()?.firstName }} {{ getUser()?.lastName }}
              </div>
              <div class="text-xs truncate" style="color:#9ca3af">{{ getUser()?.email }}</div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 py-3 px-3 space-y-0.5">
          <a routerLink="/espace-client" [routerLinkActiveOptions]="{exact:true}"
             routerLinkActive="client-nav-active" class="client-nav-link">
            <lucide-icon name="layout-dashboard" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Tableau de bord
          </a>
          <a routerLink="/espace-client/reservations" routerLinkActive="client-nav-active" class="client-nav-link">
            <lucide-icon name="calendar-days" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mes Réservations
          </a>
          <a routerLink="/espace-client/profil" routerLinkActive="client-nav-active" class="client-nav-link">
            <lucide-icon name="user-round" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mon Profil
          </a>
          <a routerLink="/espace-client/favorites" routerLinkActive="client-nav-active" class="client-nav-link">
            <lucide-icon name="heart" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Mes Favoris
          </a>
          <a routerLink="/espace-client/notifications" routerLinkActive="client-nav-active" class="client-nav-link">
            <lucide-icon name="bell" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Notifications
            <span class="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style="background:#fee2e2;color:#dc2626">3</span>
          </a>

          <div class="pt-2 mt-2" style="border-top:1px solid #f0edf8">
            <a routerLink="/recherche" class="client-nav-link font-semibold" style="color:#a855f7">
              <lucide-icon name="search" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
              Réserver un service
            </a>
          </div>
        </nav>

        <!-- Footer -->
        <div class="px-3 py-3 space-y-0.5" style="border-top:1px solid #f0edf8">
          <a href="/" class="client-nav-link">
            <lucide-icon name="arrow-left" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Retour au site
          </a>
          <button (click)="logout()" class="client-nav-link w-full text-left" style="color:#dc2626">
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
          <button class="md:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  style="color:#6b7280" (click)="mobileOpen.set(!mobileOpen())">
            <lucide-icon name="menu" [size]="18" [strokeWidth]="2"></lucide-icon>
          </button>
          <div class="hidden md:flex items-center gap-1.5 text-sm">
            <span style="color:#9ca3af">espace-client</span>
            <lucide-icon name="chevron-right" [size]="13" [strokeWidth]="2" style="color:#d1d5db"></lucide-icon>
            <span class="font-semibold" style="color:#111827">{{ getUser()?.firstName }}</span>
          </div>
          <div class="flex items-center gap-3">
            <button class="relative w-9 h-9 flex items-center justify-center rounded-xl"
                    style="color:#6b7280;border:1px solid #e5e7eb">
              <lucide-icon name="bell" [size]="16" [strokeWidth]="1.75"></lucide-icon>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style="background:#dc2626"></span>
            </button>
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
              {{ (getUser()?.firstName?.charAt(0) ?? '') + (getUser()?.lastName?.charAt(0) ?? '') }}
            </div>
          </div>
        </div>

        <!-- Mobile nav overlay -->
        @if (mobileOpen()) {
          <div class="fixed inset-0 z-40 md:hidden" style="background:rgba(17,24,39,0.5)"
               (click)="mobileOpen.set(false)">
            <aside class="w-64 h-full bg-white flex flex-col" (click)="$event.stopPropagation()">
              <div class="px-5 py-4" style="border-bottom:1px solid #f0edf8">
                <img src="/Splash.png" alt="SEFAIZO" class="h-8 w-auto">
              </div>
              <nav class="flex-1 py-3 px-3 space-y-0.5">
                @for (link of mobileLinks; track link.path) {
                  <a [routerLink]="link.path" routerLinkActive="client-nav-active"
                     class="client-nav-link" (click)="mobileOpen.set(false)">
                    <lucide-icon [name]="link.icon" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
                    {{ link.label }}
                  </a>
                }
              </nav>
              <div class="px-3 py-3" style="border-top:1px solid #f0edf8">
                <button (click)="logout()" class="client-nav-link w-full text-left" style="color:#dc2626">
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
    .client-nav-link {
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
    .client-nav-link:hover { background:#faf5ff; color:#7c3aed; }
    .client-nav-active { background:#f3e8ff !important; color:#7c3aed !important; font-weight:700; }
  `]
})
export class ClientLayoutComponent {
  mobileOpen = signal(false);

  readonly mobileLinks = [
    { path: '/espace-client',               icon: 'layout-dashboard', label: 'Tableau de bord' },
    { path: '/espace-client/reservations',  icon: 'calendar-days',    label: 'Mes Réservations' },
    { path: '/espace-client/profil',        icon: 'user-round',       label: 'Mon Profil' },
    { path: '/espace-client/favorites',     icon: 'heart',            label: 'Mes Favoris' },
    { path: '/espace-client/notifications', icon: 'bell',             label: 'Notifications' },
  ];

  constructor(private authService: AuthService) {}

  getUser() { return this.authService.user(); }
  logout()  { this.authService.logout(); }
}
