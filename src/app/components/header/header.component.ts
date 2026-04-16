import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <nav class="container-custom py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a href="/" class="flex items-center gap-2">
            <img src="/Splash.png" alt="SEFAIZO Logo" class="h-10 w-auto">
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#services" class="text-secondary font-medium hover:text-primary transition-colors">Services</a>
            <a href="#about" class="text-secondary font-medium hover:text-primary transition-colors">À propos</a>
            <a href="#locations" class="text-secondary font-medium hover:text-primary transition-colors">Lieux</a>
            <a href="#contact" class="text-secondary font-medium hover:text-primary transition-colors">Contact</a>
          </div>

          <!-- CTA Buttons -->
          <div class="flex items-center gap-4">
            <a href="#login" class="hidden sm:block text-secondary font-medium hover:text-primary transition-colors">
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
  styles: []
})
export class HeaderComponent {
}

