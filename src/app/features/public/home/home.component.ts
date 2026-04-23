import { Component, OnInit, signal, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, ServiceCategory, Review } from '../../../core/models';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { StarRatingComponent } from '../../../shared/ui/star-rating/star-rating.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton/skeleton.component';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SearchInputComponent,
    StarRatingComponent,
    SkeletonComponent,
    FcfaPipe,
    LucideAngularModule
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative py-20 md:py-28 overflow-hidden hero-section">

      <!-- Dégradé de base -->
      <div class="absolute inset-0 hero-gradient"></div>

      <!-- Blob accent coral — haut gauche -->
      <div class="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none animate-float"
           style="background: radial-gradient(circle at 40% 40%, rgba(255,107,107,0.22) 0%, transparent 70%); filter: blur(48px);"></div>

      <!-- Blob bleu clair — centre bas -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full pointer-events-none"
           style="background: radial-gradient(ellipse, rgba(2,62,133,0.45) 0%, transparent 70%); filter: blur(60px);"></div>

      <!-- Blob accent coral — bas droite -->
      <div class="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none animate-float-delayed"
           style="background: radial-gradient(circle, rgba(255,107,107,0.14) 0%, transparent 65%); filter: blur(56px);"></div>

      <!-- Grille de points -->
      <div class="absolute inset-0 pointer-events-none"
           style="background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 28px 28px;"></div>

      <!-- Ligne lumineuse horizontale — effet halo -->
      <div class="absolute top-1/2 left-0 right-0 h-px pointer-events-none"
           style="background: linear-gradient(90deg, transparent 0%, rgba(255,107,107,0.3) 30%, rgba(255,255,255,0.15) 50%, rgba(255,107,107,0.3) 70%, transparent 100%);"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">

          <!-- Badge catchy -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            La beauté à portée de main à Abidjan
          </div>

          <!-- Titre -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            Réservez vos soins beauté
            <span class="hero-accent-text"> à Abidjan</span>
          </h1>
          <p class="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Trouvez et réservez les meilleurs professionnels près de chez vous, en quelques secondes.
          </p>

          <!-- Hero Search Bar -->
          <div class="hero-search-bar bg-white rounded-2xl shadow-2xl border border-white/20 p-2 mb-5 max-w-3xl mx-auto">
            <div class="flex flex-col md:flex-row items-stretch">

              <!-- Champ Service -->
              <div class="flex items-center gap-3 flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                <lucide-icon name="scissors" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray flex-shrink-0"></lucide-icon>
                <div class="flex-1 min-w-0 text-left">
                  <div class="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-0.5">Service</div>
                  <input
                    type="text"
                    placeholder="Coiffure, massage, manucure..."
                    [(ngModel)]="heroService"
                    (keyup.enter)="onHeroSearch()"
                    class="w-full text-sm text-secondary placeholder-gray-400 bg-transparent border-none outline-none font-medium"
                  />
                </div>
              </div>

              <!-- Champ Commune -->
              <div class="flex items-center gap-3 flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                <lucide-icon name="map-pin" [size]="18" [strokeWidth]="1.75" class="text-secondary-gray flex-shrink-0"></lucide-icon>
                <div class="flex-1 min-w-0 text-left">
                  <div class="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-0.5">Commune</div>
                  <select
                    [(ngModel)]="heroCommune"
                    class="w-full text-sm text-secondary bg-transparent border-none outline-none font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Toutes les communes</option>
                    @for (commune of communes; track commune) {
                      <option [value]="commune">{{ commune }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Bouton Rechercher -->
              <div class="px-2 py-2 flex items-center">
                <button
                  (click)="onHeroSearch()"
                  class="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
                  <lucide-icon name="search" [size]="16" [strokeWidth]="2.5"></lucide-icon>
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          <!-- Tags populaires -->
          <div class="flex flex-wrap justify-center items-center gap-2 mb-10">
            <span class="text-sm text-white/60 font-light">Tendances :</span>
            @for (tag of popularTags; track tag) {
              <button
                (click)="onTagSearch(tag)"
                class="text-sm px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-150 font-light">
                {{ tag }}
              </button>
            }
          </div>

          <!-- Social proof + stats -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">

            <!-- Avatars + compteur RDV -->
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2.5">
                @for (letter of ['K','A','M','S']; track letter) {
                  <div class="w-9 h-9 rounded-full bg-gradient-to-br from-accent/80 to-accent border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {{ letter }}
                  </div>
                }
              </div>
              <div class="text-left">
                <div class="flex items-center gap-1.5">
                  <div class="animate-pulse text-accent">
                    <lucide-icon name="clock" [size]="13" [strokeWidth]="2"></lucide-icon>
                  </div>
                  <span class="text-xl font-bold text-white">{{ animatedCounter() }}</span>
                </div>
                <div class="text-xs text-white/60 font-light">rendez-vous pris aujourd'hui</div>
              </div>
            </div>

            <div class="hidden sm:block w-px h-10 bg-white/20"></div>

            <!-- Chiffres clés -->
            <div class="flex items-center gap-6">
              <div class="text-center">
                <div class="text-xl font-bold text-white">500+</div>
                <div class="text-xs text-white/60 mt-0.5 font-light">Professionnels</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center gap-0.5">
                  <span class="text-xl font-bold text-white">4.8</span>
                  <lucide-icon name="star" [size]="14" [strokeWidth]="0" class="text-yellow-400 fill-yellow-400"></lucide-icon>
                </div>
                <div class="text-xs text-white/60 mt-0.5 font-light">Note moyenne</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-white">10+</div>
                <div class="text-xs text-white/60 mt-0.5 font-light">Communes</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section">
      <div class="container-custom">
        <h2 class="section-title text-center mb-4">Nos Catégories</h2>
        <p class="section-subtitle text-center mx-auto mb-12">
          Trouvez le service dont vous avez besoin
        </p>

        @if (loading()) {
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            @for (cat of [1,2,3,4,5,6,7,8]; track cat) {
              <app-skeleton variant="card" />
            }
          </div>
        } @else {
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            @for (category of categories; track category.id) {
              <button
                (click)="filterByCategory(category.name)"
                class="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 text-center hover:-translate-y-1 active:scale-95">
                <div class="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-200 group-hover:text-white"
                     [style.background]="getCategoryColor().bg"
                     [style.color]="getCategoryColor().text">
                  <lucide-icon [name]="getCategoryIcon(category.icon)" [size]="22" [strokeWidth]="1.75"></lucide-icon>
                </div>
                <span class="text-xs font-semibold text-secondary group-hover:text-primary transition-colors leading-tight block">{{ category.name }}</span>
              </button>
            }
          </div>
        }
      </div>
    </section>

    <!-- Mobile App Download Section -->
    <section class="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      <!-- Background decorations -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-20 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div>
            <div class="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <lucide-icon name="smartphone" [size]="15" [strokeWidth]="2" class="text-white"></lucide-icon>
              Application Mobile
            </div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              Réservez partout,<br />tout le temps
            </h2>
            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
              Téléchargez l'application SEFAIZO et accédez à vos services beauté préférés directement depuis votre smartphone.
              Réservations, rappels, historique et bien plus encore.
            </p>

            <!-- Features -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <lucide-icon name="zap" [size]="17" [strokeWidth]="2" class="text-white"></lucide-icon>
                </div>
                <span class="text-gray-200">Réservation en un clic</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <lucide-icon name="bell-ring" [size]="17" [strokeWidth]="2" class="text-white"></lucide-icon>
                </div>
                <span class="text-gray-200">Notifications et rappels automatiques</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <lucide-icon name="calendar-check" [size]="17" [strokeWidth]="2" class="text-white"></lucide-icon>
                </div>
                <span class="text-gray-200">Gestion de vos rendez-vous simplifiée</span>
              </div>
            </div>

            <!-- Download Buttons -->
            <div class="flex flex-wrap gap-4">
              <!-- App Store Button -->
              <a href="#" class="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div class="text-left">
                  <div class="text-xs text-gray-500">Télécharger sur</div>
                  <div class="text-lg font-semibold -mt-1">App Store</div>
                </div>
              </a>

              <!-- Google Play Button -->
              <a href="#" class="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div class="text-left">
                  <div class="text-xs text-gray-500">Disponible sur</div>
                  <div class="text-lg font-semibold -mt-1">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <!-- Phone Mockup -->
          <div class="flex justify-center">
            <div class="relative">
              <!-- Phone frame -->
              <div class="w-72 bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700">
                <div class="w-full bg-gradient-to-br from-primary to-primary-dark rounded-[2.2rem] overflow-hidden aspect-[9/19] relative">
                  <!-- Screen content -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <img src="/Splash.png" alt="SEFAIZO" class="h-12 w-auto mb-6 brightness-0 invert">
                    <div class="text-2xl font-bold mb-2">SEFAIZO</div>
                    <div class="text-sm text-white/80 text-center mb-6">Votre beauté, notre priorité</div>
                    <!-- Mock UI elements -->
                    <div class="w-full space-y-3">
                      <div class="bg-white/20 rounded-lg p-3">
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div class="flex-1">
                            <div class="h-2 bg-white/30 rounded w-3/4 mb-1"></div>
                            <div class="h-2 bg-white/20 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white/20 rounded-lg p-3">
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div class="flex-1">
                            <div class="h-2 bg-white/30 rounded w-2/3 mb-1"></div>
                            <div class="h-2 bg-white/20 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white/20 rounded-lg p-3">
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div class="flex-1">
                            <div class="h-2 bg-white/30 rounded w-3/4 mb-1"></div>
                            <div class="h-2 bg-white/20 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Decorative elements -->
              <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
              <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommandés Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="section-title mb-2">Recommandés</h2>
            <p class="text-secondary-gray">Les préférés de nos clients</p>
          </div>
          <a href="/recherche" class="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1">
            Voir tout
            <lucide-icon name="chevron-right" [size]="16" [strokeWidth]="2.5"></lucide-icon>
          </a>
        </div>

        @if (loading()) {
          <div class="flex gap-6 overflow-hidden">
            @for (item of [1,2,3,4,5]; track item) {
              <div class="min-w-[280px] max-w-[280px]">
                <app-skeleton variant="card" />
              </div>
            }
          </div>
        } @else {
          <div class="carousel-container relative -mx-4 px-4">
            <div #recommendedCarousel class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" (scroll)="onCarouselScroll($event, 'recommended')">
              @for (business of recommendedBusinesses; track business.id) {
                <div
                  (click)="viewBusiness(business.slug)"
                  class="business-card min-w-[280px] max-w-[280px] bg-white rounded-md shadow overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group flex-shrink-0">
                  <!-- Cover Image -->
                  <div class="relative h-40 overflow-hidden">
                    <img
                      [src]="business.coverImage || 'https://via.placeholder.com/400x200?text=Salon'"
                      [alt]="business.name"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy">
                    @if (business.isVerified) {
                      <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <lucide-icon name="badge-check" [size]="14" [strokeWidth]="2" class="text-primary"></lucide-icon>
                        <span class="text-xs font-medium text-secondary">Vérifié</span>
                      </div>
                    }
                  </div>

                  <!-- Content -->
                  <div class="p-4">
                    <h3 class="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors truncate">
                      {{ business.name }}
                    </h3>

                    <div class="flex items-center gap-2 mb-2">
                      <app-star-rating [rating]="business.rating" size="0.875rem" />
                      <span class="text-sm text-secondary-gray">({{ business.reviewCount }})</span>
                    </div>

                    <div class="flex items-center gap-1 text-sm text-secondary-gray mb-3">
                      <lucide-icon name="map-pin" [size]="13" [strokeWidth]="2" class="text-secondary-gray flex-shrink-0"></lucide-icon>
                      {{ business.city }}
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-xs text-secondary-gray">À partir de</span>
                      <span class="text-primary font-bold">{{ getMinPrice(business) | fcfa }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
            <!-- Carousel Controls -->
            <button (click)="scrollCarousel('recommended', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-left" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
            <button (click)="scrollCarousel('recommended', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-right" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
          </div>
        }
      </div>
    </section>

    <!-- Nouveaux sur SEFAIZO Section -->
    <section class="section">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="section-title mb-2">Nouveaux sur SEFAIZO</h2>
            <p class="text-secondary-gray">Découvrez nos derniers partenaires</p>
          </div>
          <a href="/recherche" class="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1">
            Voir tout
            <lucide-icon name="chevron-right" [size]="16" [strokeWidth]="2.5"></lucide-icon>
          </a>
        </div>

        @if (loading()) {
          <div class="flex gap-6 overflow-hidden">
            @for (item of [1,2,3,4,5]; track item) {
              <div class="min-w-[280px] max-w-[280px]">
                <app-skeleton variant="card" />
              </div>
            }
          </div>
        } @else {
          <div class="carousel-container relative -mx-4 px-4">
            <div #newCarousel class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" (scroll)="onCarouselScroll($event, 'new')">
              @for (business of newBusinesses; track business.id) {
                <div
                  (click)="viewBusiness(business.slug)"
                  class="business-card min-w-[280px] max-w-[280px] bg-white rounded-md shadow overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group flex-shrink-0">
                  <!-- Cover Image -->
                  <div class="relative h-40 overflow-hidden">
                    <img
                      [src]="business.coverImage || 'https://via.placeholder.com/400x200?text=Salon'"
                      [alt]="business.name"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy">
                    <div class="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Nouveau
                    </div>
                    @if (business.isVerified) {
                      <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <lucide-icon name="badge-check" [size]="14" [strokeWidth]="2" class="text-primary"></lucide-icon>
                        <span class="text-xs font-medium text-secondary">Vérifié</span>
                      </div>
                    }
                  </div>

                  <!-- Content -->
                  <div class="p-4">
                    <h3 class="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors truncate">
                      {{ business.name }}
                    </h3>

                    <div class="flex items-center gap-2 mb-2">
                      <app-star-rating [rating]="business.rating" size="0.875rem" />
                      <span class="text-sm text-secondary-gray">({{ business.reviewCount }})</span>
                    </div>

                    <div class="flex items-center gap-1 text-sm text-secondary-gray mb-3">
                      <lucide-icon name="map-pin" [size]="13" [strokeWidth]="2" class="text-secondary-gray flex-shrink-0"></lucide-icon>
                      {{ business.city }}
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-xs text-secondary-gray">À partir de</span>
                      <span class="text-primary font-bold">{{ getMinPrice(business) | fcfa }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
            <!-- Carousel Controls -->
            <button (click)="scrollCarousel('new', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-left" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
            <button (click)="scrollCarousel('new', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-right" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
          </div>
        }
      </div>
    </section>

    <!-- Tendances Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="section-title mb-2">Tendances</h2>
            <p class="text-secondary-gray">Les plus réservés du moment</p>
          </div>
          <a href="/recherche" class="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1">
            Voir tout
            <lucide-icon name="chevron-right" [size]="16" [strokeWidth]="2.5"></lucide-icon>
          </a>
        </div>

        @if (loading()) {
          <div class="flex gap-6 overflow-hidden">
            @for (item of [1,2,3,4,5]; track item) {
              <div class="min-w-[280px] max-w-[280px]">
                <app-skeleton variant="card" />
              </div>
            }
          </div>
        } @else {
          <div class="carousel-container relative -mx-4 px-4">
            <div #trendingCarousel class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" (scroll)="onCarouselScroll($event, 'trending')">
              @for (business of trendingBusinesses; track business.id) {
                <div
                  (click)="viewBusiness(business.slug)"
                  class="business-card min-w-[280px] max-w-[280px] bg-white rounded-md shadow overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group flex-shrink-0">
                  <!-- Cover Image -->
                  <div class="relative h-40 overflow-hidden">
                    <img
                      [src]="business.coverImage || 'https://via.placeholder.com/400x200?text=Salon'"
                      [alt]="business.name"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy">
                    <div class="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <lucide-icon name="flame" [size]="12" [strokeWidth]="2"></lucide-icon>
                      Tendance
                    </div>
                    @if (business.isVerified) {
                      <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <lucide-icon name="badge-check" [size]="14" [strokeWidth]="2" class="text-primary"></lucide-icon>
                        <span class="text-xs font-medium text-secondary">Vérifié</span>
                      </div>
                    }
                  </div>

                  <!-- Content -->
                  <div class="p-4">
                    <h3 class="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors truncate">
                      {{ business.name }}
                    </h3>

                    <div class="flex items-center gap-2 mb-2">
                      <app-star-rating [rating]="business.rating" size="0.875rem" />
                      <span class="text-sm text-secondary-gray">({{ business.reviewCount }})</span>
                    </div>

                    <div class="flex items-center gap-1 text-sm text-secondary-gray mb-3">
                      <lucide-icon name="map-pin" [size]="13" [strokeWidth]="2" class="text-secondary-gray flex-shrink-0"></lucide-icon>
                      {{ business.city }}
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-xs text-secondary-gray">À partir de</span>
                      <span class="text-primary font-bold">{{ getMinPrice(business) | fcfa }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
            <!-- Carousel Controls -->
            <button (click)="scrollCarousel('trending', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-left" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
            <button (click)="scrollCarousel('trending', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-right" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
          </div>
        }
      </div>
    </section>

    <!-- Avis Section -->
    <section class="section">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="section-title mb-2">Avis de nos clients</h2>
            <p class="text-secondary-gray">Ce qu'ils pensent de nos professionnels</p>
          </div>
        </div>

        @if (loading()) {
          <div class="flex gap-6 overflow-hidden">
            @for (item of [1,2,3,4,5]; track item) {
              <div class="min-w-[300px] max-w-[300px]">
                <app-skeleton variant="card" />
              </div>
            }
          </div>
        } @else {
          <div class="carousel-container relative -mx-4 px-4">
            <div #reviewsCarousel class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" (scroll)="onCarouselScroll($event, 'reviews')">
              @for (review of featuredReviews; track review.id) {
                <div class="review-card min-w-[300px] max-w-[300px] bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex-shrink-0 flex flex-col gap-4">

                  <!-- Guillemets décoratifs -->
                  <div class="text-4xl text-primary/15 font-serif leading-none -mb-2">"</div>

                  <!-- Commentaire en premier pour impact visuel -->
                  <p class="text-secondary text-sm leading-relaxed line-clamp-4 flex-1">
                    {{ review.comment }}
                  </p>

                  <!-- Rating -->
                  <app-star-rating [rating]="review.rating" size="0.9rem" />

                  <!-- Séparateur -->
                  <div class="border-t border-gray-100 pt-4 flex items-center gap-3">
                    <div class="relative flex-shrink-0">
                      <img
                        [src]="review.clientAvatar || 'https://ui-avatars.com/api/?name=' + review.clientName + '&background=012e65&color=fff&rounded=true'"
                        [alt]="review.clientName"
                        class="w-11 h-11 rounded-full object-cover ring-2 ring-primary/10"
                        loading="lazy">
                      <!-- Drapeau CI -->
                      <span class="absolute -bottom-0.5 -right-0.5 text-xs">🇨🇮</span>
                    </div>
                    <div class="min-w-0">
                      <div class="font-semibold text-secondary text-sm truncate">{{ review.clientName }}</div>
                      <div class="flex items-center gap-1 text-xs text-secondary-gray">
                        <lucide-icon name="badge-check" [size]="11" [strokeWidth]="2" class="text-primary flex-shrink-0"></lucide-icon>
                        Client vérifié · Abidjan
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <!-- Carousel Controls -->
            <button (click)="scrollCarousel('reviews', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-left" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
            <button (click)="scrollCarousel('reviews', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2.5 hover:bg-gray-50 hover:shadow-lg transition-all z-10">
              <lucide-icon name="chevron-right" [size]="20" [strokeWidth]="2" class="text-secondary"></lucide-icon>
            </button>
          </div>
        }
      </div>
    </section>

    <!-- Popular Communes -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <h2 class="section-title text-center mb-4">Communes Populaires</h2>
        <p class="section-subtitle text-center mx-auto mb-12">
          Trouvez des professionnels près de chez vous
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          @for (commune of communes; track commune) {
            <button
              (click)="filterByCommune(commune)"
              class="bg-white p-4 rounded-md shadow hover:shadow-md transition-all duration-200 text-center hover:-translate-y-1 group">
              <div class="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-200 text-primary group-hover:text-white">
                <lucide-icon name="map-pin" [size]="18" [strokeWidth]="1.75"></lucide-icon>
              </div>
              <span class="text-sm font-medium text-secondary group-hover:text-primary">{{ commune }}</span>
            </button>
          }
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section text-white" style="background-color: #2d2d319c;">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Vous êtes professionnel de la beauté ?
          </h2>
          <p class="text-white/80 text-lg mb-8">
            Rejoignez SEFAIZO et développez votre activité avec des centaines de nouveaux clients.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a routerLink="/auth/register/pro" class="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block">
              Devenir Partenaire
            </a>
            <a routerLink="/a-propos" class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors inline-block">
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      @apply py-16 md:py-24;
    }

    .section-title {
      @apply text-3xl md:text-4xl font-bold text-secondary mb-4;
    }

    .section-subtitle {
      @apply text-lg text-secondary-gray max-w-2xl;
    }

    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }

    .carousel-btn {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .carousel-container:hover .carousel-btn {
      opacity: 1;
    }

    .line-clamp-4 {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── Hero gradient ── */
    .hero-section {
      isolation: isolate;
    }

    .hero-gradient {
      background:
        linear-gradient(135deg,
          #010f22 0%,
          #012e65 40%,
          #013a7a 65%,
          #023e85 85%,
          #01265a 100%
        );
    }

    /* Texte dégradé "à Abidjan" */
    .hero-accent-text {
      background: linear-gradient(90deg, #FF6B6B 0%, #ff9a8b 50%, #ffb347 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Animations flottantes */
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-22px) scale(1.03); }
    }
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-16px) scale(1.02); }
    }
    .animate-float         { animation: float 7s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 9s ease-in-out 2s infinite; }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = signal(false);
  categories: ServiceCategory[] = [];
  communes: string[] = [];

  // Hero search
  heroService = '';
  heroCommune = '';
  readonly popularTags = ['Coiffure', 'Massage', 'Manucure', 'Barbier', 'Spa', 'Maquillage'];
  recommendedBusinesses: Business[] = [];
  newBusinesses: Business[] = [];
  trendingBusinesses: Business[] = [];
  featuredReviews: Review[] = [];
  
  // Animated counter
  animatedCounter = signal(847);
  private counterInterval: any;

  // Carousel references
  @ViewChild('recommendedCarousel') recommendedCarouselRef!: ElementRef;
  @ViewChild('newCarousel') newCarouselRef!: ElementRef;
  @ViewChild('trendingCarousel') trendingCarouselRef!: ElementRef;
  @ViewChild('reviewsCarousel') reviewsCarouselRef!: ElementRef;

  private autoScrollIntervals: Record<string, any> = {};

  constructor(
    private router: Router,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    this.categories = this.mockData.getCategories();
    this.communes = this.mockData.getCommunes().slice(0, 10);
    this.recommendedBusinesses = this.mockData.getRecommendedBusinesses(8);
    this.newBusinesses = this.mockData.getNewBusinesses(8);
    this.trendingBusinesses = this.mockData.getTrendingBusinesses(8);
    this.featuredReviews = this.mockData.getFeaturedReviews(10);

    // Start animated counter
    this.startAnimatedCounter();
  }

  ngAfterViewInit(): void {
    // Start auto-scrolling carousels after view init
    setTimeout(() => {
      this.startAutoScroll('recommended', this.recommendedCarouselRef?.nativeElement);
      this.startAutoScroll('new', this.newCarouselRef?.nativeElement);
      this.startAutoScroll('trending', this.trendingCarouselRef?.nativeElement);
      this.startAutoScroll('reviews', this.reviewsCarouselRef?.nativeElement);
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clean up intervals
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
    Object.values(this.autoScrollIntervals).forEach(interval => {
      if (interval) clearInterval(interval);
    });
  }

  private startAnimatedCounter(): void {
    // Increment counter by 1 every 5 seconds
    this.counterInterval = setInterval(() => {
      this.animatedCounter.update(current => current + 1);
    }, 5000);
  }

  private startAutoScroll(name: string, element: HTMLElement): void {
    if (!element) return;

    this.autoScrollIntervals[name] = setInterval(() => {
      const maxScroll = element.scrollWidth - element.clientWidth;
      if (element.scrollLeft >= maxScroll - 10) {
        element.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        element.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 4000);
  }

  scrollCarousel(name: string, direction: number): void {
    let element: HTMLElement | null = null;
    
    switch (name) {
      case 'recommended':
        element = this.recommendedCarouselRef?.nativeElement;
        break;
      case 'new':
        element = this.newCarouselRef?.nativeElement;
        break;
      case 'trending':
        element = this.trendingCarouselRef?.nativeElement;
        break;
      case 'reviews':
        element = this.reviewsCarouselRef?.nativeElement;
        break;
    }

    if (element) {
      element.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  }

  onCarouselScroll(event: Event, name: string): void {
    // Reset auto-scroll on manual interaction
    if (this.autoScrollIntervals[name]) {
      clearInterval(this.autoScrollIntervals[name]);
      const element = this.getCarouselElement(name);
      if (element) {
        this.startAutoScroll(name, element);
      }
    }
  }

  private getCarouselElement(name: string): HTMLElement | null {
    switch (name) {
      case 'recommended':
        return this.recommendedCarouselRef?.nativeElement;
      case 'new':
        return this.newCarouselRef?.nativeElement;
      case 'trending':
        return this.trendingCarouselRef?.nativeElement;
      case 'reviews':
        return this.reviewsCarouselRef?.nativeElement;
      default:
        return null;
    }
  }

  onSearch(query: string): void {
    this.router.navigate(['/recherche'], {
      queryParams: { q: query }
    });
  }

  onHeroSearch(): void {
    const params: Record<string, string> = {};
    if (this.heroService.trim()) params['q'] = this.heroService.trim();
    if (this.heroCommune) params['commune'] = this.heroCommune;
    this.router.navigate(['/recherche'], { queryParams: params });
  }

  onTagSearch(tag: string): void {
    this.router.navigate(['/recherche'], { queryParams: { q: tag } });
  }

  filterByCategory(category: string): void {
    this.router.navigate(['/recherche'], {
      queryParams: { category }
    });
  }

  filterByCommune(commune: string): void {
    this.router.navigate(['/recherche'], {
      queryParams: { commune }
    });
  }

  viewBusiness(slug: string): void {
    this.router.navigate(['/pro', slug]);
  }

  getMinPrice(business: Business): number {
    if (!business.services || business.services.length === 0) return 0;
    return Math.min(...business.services.map(s => s.price));
  }

  getCategoryIcon(icon: string): string {
    const iconMap: Record<string, string> = {
      // Catégories principales du projet
      cut:      'scissors',          // Coiffure — ciseaux
      sparkles: 'sparkles',          // Esthétique — éclat beauté
      hand:     'paintbrush',        // Manucure — pinceau vernis
      foot:     'footprints',        // Pédicure — empreintes
      user:     'wand',              // Barbier — outil de précision
      brush:    'palette',           // Maquillage — palette couleurs
      face:     'droplets',          // Soins du visage — hydratation
      spa:      'hand',              // Massage — mains soignantes
      // Mappings complémentaires
      scissors: 'scissors',
      beauty:   'sparkles',
      nail:     'paintbrush',
      massage:  'hand',
      makeup:   'palette',
      barber:   'wand',
      hair:     'scissors',
      skin:     'droplets',
      eyebrow:  'eye',
      lash:     'eye',
      wellness: 'heart-pulse',
      wax:      'sparkles',
      piercing: 'circle-dot',
      tattoo:   'pen-tool',
      fitness:  'dumbbell',
      medical:  'stethoscope',
    };
    const key = (icon || '').toLowerCase();
    return iconMap[key] ?? 'sparkles';
  }

  getCategoryColor(): { bg: string; text: string } {
    return { bg: 'rgba(0,0,0,0.06)', text: '#1A1A1A' };
  }
}

