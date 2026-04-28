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
      <header class="sticky top-0 z-50 border-b"
              style="background:rgba(255,255,255,0.97);backdrop-filter:blur(16px);border-color:#f3f4f6;
                     box-shadow:0 2px 12px rgba(0,0,0,0.06)">
        <nav class="container-custom py-3.5">
          <div class="flex items-center justify-between">

            <!-- Logo -->
            <a routerLink="/" class="flex items-center gap-2 shrink-0">
              <img src="/Splash.png" alt="SEFAIZO Logo" class="h-9 w-auto">
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-8">
              <a routerLink="/" routerLinkActive="active-nav" [routerLinkActiveOptions]="{exact:true}"
                 class="app-nav-link">Accueil</a>
              <a routerLink="/recherche" routerLinkActive="active-nav"
                 class="app-nav-link">Explorer</a>
              <a routerLink="/comment-ca-marche" routerLinkActive="active-nav"
                 class="app-nav-link">Comment ça marche</a>

              @if (authService.isAuthenticated()) {
                @if (authService.isClient()) {
                  <a routerLink="/espace-client" routerLinkActive="active-nav"
                     class="app-nav-link">Espace Client</a>
                }
                @if (authService.isPro()) {
                  <a routerLink="/espace-pro" routerLinkActive="active-nav"
                     class="app-nav-link">Espace Pro</a>
                }
                @if (authService.isAdmin()) {
                  <a routerLink="/admin" routerLinkActive="active-nav"
                     class="app-nav-link">Admin</a>
                }
              }
            </div>

            <!-- Auth Buttons + Hamburger -->
            <div class="flex items-center gap-3">
              @if (authService.isAuthenticated()) {
                <a [routerLink]="authService.isClient() ? '/espace-client' : authService.isPro() ? '/espace-pro' : '/admin'"
                   class="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                   style="color:#374151">
                  <img [src]="authService.user()?.avatar || 'https://via.placeholder.com/32'"
                       [alt]="authService.user()?.firstName"
                       class="w-8 h-8 rounded-full object-cover border-2"
                       style="border-color:#e9d5ff">
                  <span>{{ authService.user()?.firstName }}</span>
                </a>
                <button (click)="logout()"
                        class="hidden sm:flex text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-red-50"
                        style="color:#dc2626">
                  Déconnexion
                </button>
              } @else {
                <!-- Connexion — bordure noire -->
                <a routerLink="/auth/login"
                   class="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-all hover:bg-gray-50"
                   style="border-color:#111827;color:#111827">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Connexion
                </a>
                <!-- Réserver -->
                <a routerLink="/recherche"
                   class="hidden sm:flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
                   style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 4px 14px rgba(124,58,237,0.35)">
                  Réserver maintenant
                </a>
              }

              <!-- Hamburger mobile -->
              <button (click)="toggleMobileMenu()"
                      class="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
                      style="color:#374151">
                @if (mobileMenuOpen) {
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                } @else {
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                }
              </button>
            </div>
          </div>

          <!-- Mobile menu -->
          @if (mobileMenuOpen) {
            <div class="md:hidden py-4 border-t mt-3" style="border-color:#f3f4f6">
              <div class="flex flex-col gap-1">
                <a routerLink="/" (click)="mobileMenuOpen=false"
                   class="px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-purple-50"
                   style="color:#374151">Accueil</a>
                <a routerLink="/recherche" (click)="mobileMenuOpen=false"
                   class="px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-purple-50"
                   style="color:#374151">Explorer</a>
                <a routerLink="/comment-ca-marche" (click)="mobileMenuOpen=false"
                   class="px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-purple-50"
                   style="color:#374151">Comment ça marche</a>

                @if (authService.isAuthenticated()) {
                  @if (authService.isClient()) {
                    <a routerLink="/espace-client" (click)="mobileMenuOpen=false"
                       class="px-3 py-2.5 rounded-xl text-sm font-medium" style="color:#7c3aed">Espace Client</a>
                  }
                  @if (authService.isPro()) {
                    <a routerLink="/espace-pro" (click)="mobileMenuOpen=false"
                       class="px-3 py-2.5 rounded-xl text-sm font-medium" style="color:#7c3aed">Espace Pro</a>
                  }
                  <button (click)="logout(); mobileMenuOpen=false"
                          class="text-left px-3 py-2.5 rounded-xl text-sm font-medium" style="color:#dc2626">
                    Déconnexion
                  </button>
                } @else {
                  <div class="flex flex-col gap-2 pt-3 border-t mt-2" style="border-color:#f3f4f6">
                    <a routerLink="/auth/login" (click)="mobileMenuOpen=false"
                       class="px-4 py-2.5 rounded-xl text-sm font-semibold border-2 text-center"
                       style="border-color:#111827;color:#111827">Connexion</a>
                    <a routerLink="/recherche" (click)="mobileMenuOpen=false"
                       class="px-4 py-2.5 rounded-xl text-sm font-bold text-white text-center"
                       style="background:linear-gradient(135deg,#7c3aed,#a855f7)">Réserver maintenant</a>
                  </div>
                }
              </div>
            </div>
          }
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
  mobileMenuOpen = false;

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

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}

