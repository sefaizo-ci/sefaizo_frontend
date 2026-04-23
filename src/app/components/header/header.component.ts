import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
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
            <img src="/Splash.png" alt="SEFAIZO Logo"
                 class="w-auto transition-all duration-300"
                 [class.h-9]="!isScrolled()"
                 [class.h-8]="isScrolled()">
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-7">
            <a href="#services"  class="nav-link">Services</a>
            <a href="#about"     class="nav-link">À propos</a>
            <a href="#locations" class="nav-link">Lieux</a>
            <a href="#contact"   class="nav-link">Contact</a>
          </div>

          <!-- Right zone -->
          <div class="flex items-center gap-2">
            <!-- Connexion — desktop only -->
            <a href="#login" class="hidden sm:flex items-center gap-1.5 text-secondary text-sm font-medium hover:text-primary transition-colors">
              <lucide-icon name="user-round" [size]="15" [strokeWidth]="2"></lucide-icon>
              Connexion
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
          <a href="#services"  class="mobile-nav-link" (click)="closeMenu()">Services</a>
          <a href="#about"     class="mobile-nav-link" (click)="closeMenu()">À propos</a>
          <a href="#locations" class="mobile-nav-link" (click)="closeMenu()">Lieux</a>
          <a href="#contact"   class="mobile-nav-link" (click)="closeMenu()">Contact</a>

          <div class="mt-3 pt-3 flex flex-col gap-2" style="border-top: 1px solid #f3f4f6;">
            <a href="#login" class="flex items-center gap-2 text-secondary text-sm font-medium hover:text-primary transition-colors px-3 py-2">
              <lucide-icon name="user-round" [size]="16" [strokeWidth]="2"></lucide-icon>
              Connexion
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
      @apply text-secondary text-sm font-medium hover:text-primary transition-colors relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: #012e65;
      border-radius: 1px;
      transition: width 0.2s ease;
    }
    .nav-link:hover::after {
      width: 100%;
    }
    .mobile-nav-link {
      @apply text-secondary text-base font-medium hover:text-primary transition-colors px-3 py-2.5 rounded-md hover:bg-gray-50 block;
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

