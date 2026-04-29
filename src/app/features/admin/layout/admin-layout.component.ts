import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  template: `
    <div class="min-h-screen flex" style="background:#f8f7fc">

      <!-- ══ SIDEBAR ══ -->
      <aside class="w-60 flex-shrink-0 flex flex-col bg-white border-r"
             style="border-color:#f0edf8;min-height:100vh;position:sticky;top:0;height:100vh">

        <!-- Logo -->
        <div class="px-5 py-5" style="border-bottom:1px solid #f0edf8">
          <a href="/" class="flex items-center gap-2.5">
            <img src="/Splash.png" alt="SEFAIZO" class="h-8 w-auto">
            <div>
              <div class="text-sm font-black leading-tight" style="color:#111827">SEFAIZO</div>
              <div class="text-xs font-medium" style="color:#a855f7">Administration</div>
            </div>
          </a>
        </div>

        <!-- Admin badge -->
        <div class="px-4 py-3" style="border-bottom:1px solid #f0edf8">
          <div class="flex items-center gap-2.5 px-3 py-2 rounded-xl"
               style="background:#faf5ff">
            <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
              <lucide-icon name="shield" [size]="15" [strokeWidth]="2" class="text-white"></lucide-icon>
            </div>
            <div class="min-w-0">
              <div class="text-xs font-bold truncate" style="color:#111827">Super Admin</div>
              <div class="text-xs truncate" style="color:#9ca3af">admin&#64;sefaizo.ci</div>
            </div>
          </div>
        </div>

        <!-- Navigation principale -->
        <nav class="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">

          <!-- Section principale -->
          <div class="px-3 mb-1">
            <span class="text-xs font-bold uppercase tracking-widest" style="color:#c4b5fd">Principal</span>
          </div>

          <a routerLink="/admin" [routerLinkActiveOptions]="{exact:true}"
             class="admin-nav-link group" routerLinkActive="admin-nav-active">
            <lucide-icon name="layout-dashboard" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Tableau de bord
          </a>

          <a routerLink="/admin/salons" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="store" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Salons & Validation
            <span class="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style="background:#fef3c7;color:#d97706">12</span>
          </a>

          <a routerLink="/admin/kyc" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="shield-check" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Documents KYC
            <span class="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style="background:#fee2e2;color:#dc2626">3</span>
          </a>

          <!-- Section Gestion -->
          <div class="px-3 pt-4 mb-1">
            <span class="text-xs font-bold uppercase tracking-widest" style="color:#c4b5fd">Gestion</span>
          </div>

          <a routerLink="/admin/clients" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="users" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Clients
          </a>

          <a routerLink="/admin/professionals" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="briefcase" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Professionnels
          </a>

          <a routerLink="/admin/bookings" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="calendar-days" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Réservations
          </a>

          <!-- Section Finances -->
          <div class="px-3 pt-4 mb-1">
            <span class="text-xs font-bold uppercase tracking-widest" style="color:#c4b5fd">Finances</span>
          </div>

          <a routerLink="/admin/commissions" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="circle-dollar-sign" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Commissions
          </a>

          <a routerLink="/admin/monetization" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="trending-up" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Monétisation
          </a>

          <a routerLink="/admin/statistics" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="bar-chart-2" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Statistiques
          </a>

          <!-- Section Outils -->
          <div class="px-3 pt-4 mb-1">
            <span class="text-xs font-bold uppercase tracking-widest" style="color:#c4b5fd">Outils</span>
          </div>

          <a routerLink="/admin/cms" routerLinkActive="admin-nav-active"
             class="admin-nav-link group">
            <lucide-icon name="file-pen-line" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Contenu CMS
          </a>

        </nav>

        <!-- Footer sidebar -->
        <div class="px-3 py-3" style="border-top:1px solid #f0edf8">
          <a href="/"
             class="admin-nav-link group">
            <lucide-icon name="arrow-left" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Retour au site
          </a>
          <button
             class="admin-nav-link group w-full text-left mt-0.5"
             style="color:#dc2626">
            <lucide-icon name="log-out" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0"></lucide-icon>
            Déconnexion
          </button>
        </div>
      </aside>

      <!-- ══ CONTENU PRINCIPAL ══ -->
      <div class="flex-1 flex flex-col min-w-0">

        <!-- Top bar -->
        <div class="bg-white border-b flex items-center justify-between px-6 py-3 flex-shrink-0"
             style="border-color:#f0edf8">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-1.5 text-sm">
            <span style="color:#9ca3af">admin</span>
            <lucide-icon name="chevron-right" [size]="13" [strokeWidth]="2" style="color:#d1d5db"></lucide-icon>
            <span class="font-semibold" style="color:#111827">Dashboard</span>
          </div>
          <!-- Actions top bar -->
          <div class="flex items-center gap-3">
            <!-- Notifications -->
            <button class="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
                    style="color:#6b7280;border:1px solid #e5e7eb">
              <lucide-icon name="bell" [size]="16" [strokeWidth]="1.75"></lucide-icon>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style="background:#a855f7"></span>
            </button>
            <!-- Avatar -->
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7)">SA</div>
          </div>
        </div>

        <!-- Contenu routé -->
        <main class="flex-1 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>

    </div>
  `,
  styles: [`
    .admin-nav-link {
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
    .admin-nav-link:hover {
      background: #faf5ff;
      color: #7c3aed;
    }
    .admin-nav-active {
      background: #f3e8ff !important;
      color: #7c3aed !important;
      font-weight: 700;
    }
  `]
})
export class AdminLayoutComponent {}

