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
          <a href="/" class="flex items-center gap-2">
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

          <!-- CTA Buttons -->
          <div class="flex items-center gap-3">
            <a href="#login" class="hidden sm:flex items-center gap-1.5 text-secondary text-sm font-medium hover:text-primary transition-colors">
              <lucide-icon name="user-round" [size]="15" [strokeWidth]="2"></lucide-icon>
              Connexion
            </a>
            <app-button variant="primary">
              Réserver
            </app-button>
          </div>
        </div>
      </nav>
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
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }
}

