import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ToastContainerComponent } from './shared/ui/toast/toast.component';
import { ButtonComponent } from './shared/ui/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router, Event } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToastContainerComponent,
    ButtonComponent,
    FooterComponent
  ],
  template: `
    <!-- Toast Container -->
    <app-toast-container #toastContainer></app-toast-container>

    @if (showHeaderAndFooter()) {
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-white shadow-sm">
        <nav class="container-custom py-4">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <a routerLink="/" class="flex items-center gap-2">
              <img src="/Splash.png" alt="SEFAIZO Logo" class="h-10 w-auto">
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-8">
              <a routerLink="/" routerLinkActive="text-primary" class="text-secondary font-medium hover:text-primary transition-colors">
                Accueil
              </a>
              <a routerLink="/recherche" routerLinkActive="text-primary" class="text-secondary font-medium hover:text-primary transition-colors">
                Recherche
              </a>

              @if (authService.isAuthenticated()) {
                @if (authService.isClient()) {
                  <a routerLink="/espace-client" routerLinkActive="text-primary" class="text-secondary font-medium hover:text-primary transition-colors">
                    Espace Client
                  </a>
                }
                @if (authService.isPro()) {
                  <a routerLink="/espace-pro" routerLinkActive="text-primary" class="text-secondary font-medium hover:text-primary transition-colors">
                    Espace Pro
                  </a>
                }
                @if (authService.isAdmin()) {
                  <a routerLink="/admin" routerLinkActive="text-primary" class="text-secondary font-medium hover:text-primary transition-colors">
                    Admin
                  </a>
                }
              }
            </div>

            <!-- Auth Buttons -->
            <div class="flex items-center gap-4">
              @if (authService.isAuthenticated()) {
                <a routerLink="/espace-client" routerLinkActive="text-primary" class="hidden sm:flex items-center gap-2 text-secondary font-medium hover:text-primary transition-colors">
                  <img
                    [src]="authService.user()?.avatar || 'https://via.placeholder.com/32'"
                    [alt]="authService.user()?.firstName"
                    class="w-8 h-8 rounded-full">
                  <span>{{ authService.user()?.firstName }}</span>
                </a>
                <button (click)="logout()" class="text-secondary font-medium hover:text-primary transition-colors">
                  Déconnexion
                </button>
              } @else {
                <a routerLink="/auth/login" class="text-secondary font-medium hover:text-primary transition-colors">
                  Connexion
                </a>
                <a routerLink="/auth/register" class="btn-primary">
                  S'inscrire
                </a>
              }
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content -->
      <main>
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>
    } @else {
      <!-- No header/footer for client/pro/admin spaces -->
      <main>
        <router-outlet></router-outlet>
      </main>
    }
  `,
  styles: []
})
export class AppComponent {
  title = 'SEFAIZO - Marketplace de Beauté à Abidjan';

  showHeaderAndFooter = computed(() => {
    const currentRoute = this.currentRoute();
    // Hide header/footer for client, pro, and admin spaces
    return !(
      currentRoute.startsWith('/espace-client') ||
      currentRoute.startsWith('/espace-pro') ||
      currentRoute.startsWith('/admin')
    );
  });

  currentRoute = computed(() => this.router.url);

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
  }
}

