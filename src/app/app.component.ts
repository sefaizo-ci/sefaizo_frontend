import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ToastContainerComponent } from './shared/ui/toast/toast.component';
import { ButtonComponent } from './shared/ui/button/button.component';
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
    ButtonComponent
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
              <img src="/Logoheder.png" alt="SEFAIZO Logo" class="h-10 w-auto">
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
      <footer class="bg-secondary text-white pt-16 pb-8 mt-16">
        <div class="container-custom">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 class="font-semibold mb-4">Entreprise</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a routerLink="/a-propos" class="hover:text-white transition-colors">À propos</a></li>
                <li><a routerLink="/carrieres" class="hover:text-white transition-colors">Carrières</a></li>
                <li><a routerLink="/presse" class="hover:text-white transition-colors">Presse</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Professionnels</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a routerLink="/devenir-partenaire" class="hover:text-white transition-colors">Devenir partenaire</a></li>
                <li><a routerLink="/ressources" class="hover:text-white transition-colors">Ressources</a></li>
                <li><a routerLink="/tarifs" class="hover:text-white transition-colors">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Support</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a routerLink="/centre-aide" class="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a routerLink="/contact" class="hover:text-white transition-colors">Nous contacter</a></li>
                <li><a routerLink="/faq" class="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Légal</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a routerLink="/confidentialite" class="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a routerLink="/conditions" class="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a routerLink="/cookies" class="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 SEFAIZO. Tous droits réservés.
          </div>
        </div>
      </footer>
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
