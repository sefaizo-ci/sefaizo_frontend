import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-100 min-h-screen flex-shrink-0 flex flex-col">
        <!-- Logo -->
        <div class="px-5 py-5 border-b border-gray-100">
          <a href="/" class="flex items-center gap-3">
            <img src="/Splash.png" alt="SEFAIZO" class="h-9 w-auto">
            <div>
              <span class="text-sm font-bold text-secondary block leading-tight">SEFAIZO</span>
              <span class="text-xs text-secondary-gray">Administration</span>
            </div>
          </a>
        </div>

        <!-- Navigation -->
        <nav class="p-3 space-y-0.5 flex-1">
          <a
            routerLink="/admin"
            routerLinkActive="bg-primary/10 text-primary"
            [routerLinkActiveOptions]="{exact: true}"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="layout-dashboard" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Tableau de bord
          </a>

          <a
            routerLink="/admin/professionals"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="briefcase" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Professionnels
          </a>

          <a
            routerLink="/admin/clients"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="users" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Clients
          </a>

          <a
            routerLink="/admin/bookings"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="calendar-days" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Réservations
          </a>

          <a
            routerLink="/admin/commissions"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="circle-dollar-sign" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Commissions & Revenus
          </a>

          <a
            routerLink="/admin/kyc"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="shield-check" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Vérification KYC
            <span class="ml-auto bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">3</span>
          </a>

          <a
            routerLink="/admin/statistics"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="bar-chart-2" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Statistiques
          </a>

          <a
            routerLink="/admin/monetization"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="trending-up" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Monétisation
          </a>

          <a
            routerLink="/admin/cms"
            routerLinkActive="bg-primary/10 text-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-gray-50 text-secondary group"
          >
            <lucide-icon name="file-pen-line" [size]="17" [strokeWidth]="1.75" class="text-secondary-gray group-[.bg-primary\/10]:text-primary flex-shrink-0"></lucide-icon>
            Gestion du contenu
          </a>
        </nav>

        <!-- Back to site -->
        <div class="p-3 border-t border-gray-100">
          <a href="/" class="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm text-secondary-gray hover:text-secondary hover:bg-gray-50 transition-all duration-150">
            <lucide-icon name="arrow-left" [size]="15" [strokeWidth]="2"></lucide-icon>
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

