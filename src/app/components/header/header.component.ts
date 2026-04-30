import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, LucideAngularModule],
  template: `
    <header
      class="sticky top-0 z-50 border-b transition-all duration-300"
      [class.header-top]="!isScrolled()"
      [class.header-scrolled]="isScrolled()">

      <nav class="container-custom transition-all duration-300"
           [class.py-4]="!isScrolled()"
           [class.py-3]="isScrolled()">
        <div class="flex items-center justify-between">

          <!-- Logo -->
          <a href="/" class="flex items-center gap-2 shrink-0">
            <img src="/Logoheder.png" alt="SEFAIZO Logo"
                 class="w-auto transition-all duration-300"
                 [class.h-9]="!isScrolled()"
                 [class.h-8]="isScrolled()">
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-7">
            <a routerLink="/"                    routerLinkActive="nav-link-active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">Accueil</a>
            <a routerLink="/recherche"            routerLinkActive="nav-link-active" class="nav-link">Explorer</a>
            <a routerLink="/comment-ca-marche"    routerLinkActive="nav-link-active" class="nav-link">Comment ça marche</a>
          </div>

          <!-- Right zone -->
          <div class="flex items-center gap-2">
            <!-- Connexion — desktop only -->
            <a routerLink="/auth/login"
               class="hidden sm:flex items-center gap-1.5 text-sm font-bold transition-colors px-4 py-2 rounded-lg border hover:bg-purple-50"
               style="color:#5f30d4;border-color:#5721de">
              <lucide-icon name="user-round" [size]="15" [strokeWidth]="2"></lucide-icon>
              Se connecter
            </a>

            <!-- Réserver — desktop only -->
            <div class="hidden sm:block">
              <app-button variant="primary">Réserver</app-button>
            </div>

            <!-- Hamburger — mobile only -->
            <button
              class="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-secondary hover:text-primary hover:bg-gray-100 transition-colors"
              (click)="toggleMenu()"
              aria-label="Menu">
              <lucide-icon [name]="menuOpen() ? 'x' : 'menu'" [size]="22" [strokeWidth]="2"></lucide-icon>
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div
        class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        [class.max-h-0]="!menuOpen()"
        [class.max-h-screen]="menuOpen()"
        [class.border-t]="menuOpen()"
        style="border-color: #f3f4f6;">
        <div class="container-custom py-4 flex flex-col gap-1">
          <a routerLink="/"                 class="mobile-nav-link" (click)="closeMenu()">Accueil</a>
          <a routerLink="/recherche"        class="mobile-nav-link" (click)="closeMenu()">Explorer</a>
          <a routerLink="/comment-ca-marche" class="mobile-nav-link" (click)="closeMenu()">Comment ça marche</a>

          <div class="mt-3 pt-3 flex flex-col gap-2" style="border-top: 1px solid #f3f4f6;">
            <a routerLink="/auth/login" (click)="closeMenu()"
               class="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity px-3 py-2"
               style="color:#5f30d4">
              <lucide-icon name="user-round" [size]="16" [strokeWidth]="2"></lucide-icon>
              Se connecter
            </a>
            <app-button variant="primary" [fullWidth]="true">Réserver</app-button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header-top {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(12px);
      border-color: #f3f4f6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .header-scrolled {
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-color: rgba(1,46,101,0.08);
      box-shadow: 0 4px 24px rgba(1,46,101,0.08);
    }
    .nav-link {
      @apply text-secondary text-sm font-bold hover:text-primary transition-colors relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(to right, #4c0eb7, #7c3aed);
      border-radius: 1px;
      transition: width 0.2s ease;
    }
    .nav-link:hover::after,
    .nav-link-active::after {
      width: 100%;
    }
    .nav-link-active {
      color: #4c0eb7 !important;
      font-weight: 700;
    }
    .mobile-nav-link {
      @apply text-secondary text-base font-bold hover:text-primary transition-colors px-3 py-2.5 rounded-md hover:bg-gray-50 block;
    }
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);
  menuOpen  = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

