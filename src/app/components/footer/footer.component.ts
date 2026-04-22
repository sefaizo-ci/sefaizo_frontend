import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <footer class="bg-secondary text-white pt-16 pb-8">
      <div class="container-custom">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <!-- Brand Column -->
          <div class="col-span-2 lg:col-span-1">
            <a href="/" class="text-2xl font-bold text-primary mb-4 block">SEFAIZO</a>
            <p class="text-gray-400 text-sm mb-4">
              Votre plateforme de réservation beauté et bien-être.
            </p>
            <!-- Social Links -->
            <div class="flex gap-3">
              <a href="#" class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-200">
                <lucide-icon name="facebook" [size]="17" [strokeWidth]="1.75"></lucide-icon>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-200">
                <lucide-icon name="twitter" [size]="17" [strokeWidth]="1.75"></lucide-icon>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-200">
                <lucide-icon name="instagram" [size]="17" [strokeWidth]="1.75"></lucide-icon>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-200">
                <lucide-icon name="youtube" [size]="17" [strokeWidth]="1.75"></lucide-icon>
              </a>
            </div>
          </div>

          <!-- Links Columns -->
          <div>
            <h4 class="font-semibold mb-4">Entreprise</h4>
            <ul class="space-y-2">
              <li><a routerLink="/a-propos" class="text-gray-400 hover:text-white transition-colors text-sm">À propos</a></li>
              <li><a routerLink="/carrieres" class="text-gray-400 hover:text-white transition-colors text-sm">Carrières</a></li>
              <li><a routerLink="/presse" class="text-gray-400 hover:text-white transition-colors text-sm">Presse</a></li>
              <li><a routerLink="/blog" class="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Professionnels</h4>
            <ul class="space-y-2">
              <li><a routerLink="/devenir-partenaire" class="text-gray-400 hover:text-white transition-colors text-sm">Devenir partenaire</a></li>
              <li><a routerLink="/ressources" class="text-gray-400 hover:text-white transition-colors text-sm">Ressources</a></li>
              <li><a routerLink="/tarifs" class="text-gray-400 hover:text-white transition-colors text-sm">Tarifs</a></li>
              <li><a routerLink="/success-stories" class="text-gray-400 hover:text-white transition-colors text-sm">Succès stories</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Support</h4>
            <ul class="space-y-2">
              <li><a routerLink="/centre-aide" class="text-gray-400 hover:text-white transition-colors text-sm">Centre d'aide</a></li>
              <li><a routerLink="/contact" class="text-gray-400 hover:text-white transition-colors text-sm">Nous contacter</a></li>
              <li><a routerLink="/faq" class="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a routerLink="/accessibilite" class="text-gray-400 hover:text-white transition-colors text-sm">Accessibilité</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Légal</h4>
            <ul class="space-y-2">
              <li><a routerLink="/confidentialite" class="text-gray-400 hover:text-white transition-colors text-sm">Confidentialité</a></li>
              <li><a routerLink="/conditions" class="text-gray-400 hover:text-white transition-colors text-sm">Conditions d'utilisation</a></li>
              <li><a routerLink="/cookies" class="text-gray-400 hover:text-white transition-colors text-sm">Politique de cookies</a></li>
              <li><a routerLink="/mentions-legales" class="text-gray-400 hover:text-white transition-colors text-sm">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-sm text-center md:text-left">
              © 2026 SEFAIZO. Tous droits réservés.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <span class="text-gray-400 text-sm">Français (France)</span>
              <span class="text-gray-400 text-sm">EUR (€)</span>
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
