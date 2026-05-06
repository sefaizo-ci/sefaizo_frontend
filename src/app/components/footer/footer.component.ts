import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <footer class="bg-white pt-16 pb-8 border-t border-[#e7e9f4]">
      <div class="container-custom">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <!-- Brand Column -->
          <div class="col-span-2 lg:col-span-1">
            <a href="/" class="text-2xl font-bold text-[#7c3aed] mb-4 block">SEFAIZO</a>
            <p class="text-[#66708d] text-sm mb-5">
              La plateforme N°1 de réservation de services beauté à Abidjan.
            </p>
            <!-- Social icons -->
            <div class="flex items-center gap-3">
              <a href="#" aria-label="Instagram" class="text-[#66708d] hover:text-[#7c3aed] transition-colors">
                <lucide-icon name="instagram" [size]="18" [strokeWidth]="1.75"></lucide-icon>
              </a>
              <a href="#" aria-label="Facebook" class="text-[#66708d] hover:text-[#7c3aed] transition-colors">
                <lucide-icon name="facebook" [size]="18" [strokeWidth]="1.75"></lucide-icon>
              </a>
              <a href="#" aria-label="TikTok" class="text-[#66708d] hover:text-[#7c3aed] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.83 1.53V6.78a4.85 4.85 0 0 1-1.06-.09z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" class="text-[#66708d] hover:text-[#7c3aed] transition-colors">
                <lucide-icon name="youtube" [size]="18" [strokeWidth]="1.75"></lucide-icon>
              </a>
            </div>
          </div>

          <!-- Links Columns -->
          <div>
            <h4 class="text-[#11152f] font-bold mb-4">Entreprise</h4>
            <ul class="space-y-2">
              <li><a routerLink="/a-propos" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">À propos</a></li>
              <li><a routerLink="/carrieres" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Carrières</a></li>
              <li><a routerLink="/presse" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Presse</a></li>
              <li><a routerLink="/blog" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[#11152f] font-bold mb-4">Professionnels</h4>
            <ul class="space-y-2">
              <li><a routerLink="/devenir-partenaire" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Devenir partenaire</a></li>
              <li><a routerLink="/ressources" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Ressources</a></li>
              <li><a routerLink="/tarifs" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Tarifs</a></li>
              <li><a routerLink="/success-stories" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Succès stories</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[#11152f] font-bold mb-4">Support</h4>
            <ul class="space-y-2">
              <li><a routerLink="/centre-aide" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Centre d'aide</a></li>
              <li><a routerLink="/contact" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Nous contacter</a></li>
              <li><a routerLink="/faq" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">FAQ</a></li>
              <li><a routerLink="/accessibilite" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Accessibilité</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[#11152f] font-bold mb-4">Légal</h4>
            <ul class="space-y-2">
              <li><a routerLink="/confidentialite" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Confidentialité</a></li>
              <li><a routerLink="/conditions" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Conditions d'utilisation</a></li>
              <li><a routerLink="/cookies" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Politique de cookies</a></li>
              <li><a routerLink="/mentions-legales" class="text-[#66708d] hover:text-[#7c3aed] transition-colors text-sm">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-[#e7e9f4] pt-8">
          <div class="flex items-center justify-between gap-4">
            <!-- Left : copyright -->
            <p class="text-[#66708d] text-sm">© 2026 SEFAIZO. Tous droits réservés.</p>
            <!-- Right : country -->
            <div class="flex items-center gap-2">
              <svg width="22" height="15" viewBox="0 0 22 15" aria-label="Drapeau Côte d'Ivoire" role="img">
                  <rect width="7.33" height="15" x="0"    fill="#F77F00"/>
                  <rect width="7.34" height="15" x="7.33" fill="#FFFFFF"/>
                  <rect width="7.33" height="15" x="14.67" fill="#009A44"/>
                </svg>
              <span class="text-[#66708d] text-sm">Côte d'Ivoire</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
}
