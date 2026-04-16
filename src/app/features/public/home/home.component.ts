import { Component, OnInit, signal, computed, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, ServiceCategory, Review } from '../../../core/models';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { StarRatingComponent } from '../../../shared/ui/star-rating/star-rating.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton/skeleton.component';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SearchInputComponent,
    StarRatingComponent,
    SkeletonComponent,
    FcfaPipe
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary/5 via-white to-primary/10 py-16 md:py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
            Réservez vos soins beauté
          </h1>

          <p class="text-lg md:text-xl text-secondary-gray mb-10 max-w-2xl mx-auto">
            Découvrez les meilleurs professionnels de la beauté et réservez en quelques clics.
            Coiffure, esthétique, manucure et plus encore.
          </p>

          <div class="mb-6">
            <app-search-input
              placeholder="Rechercher un salon, un service, une commune..."
              (search)="onSearch($event)">
            </app-search-input>
          </div>

          <!-- Animated Booking Counter -->
          <div class="mb-12 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg inline-block">
            <div class="flex items-center gap-3 justify-center">
              <div class="animate-pulse">
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-3xl md:text-4xl font-bold text-primary">
                  {{ animatedCounter() }}
                </div>
                <div class="text-sm text-secondary-gray">rendez-vous pris aujourd'hui</div>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">500+</div>
              <div class="text-sm text-secondary-gray mt-1">Professionnels</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">10+</div>
              <div class="text-sm text-secondary-gray mt-1">Communes</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">4.8★</div>
              <div class="text-sm text-secondary-gray mt-1">Note moyenne</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">5000+</div>
              <div class="text-sm text-secondary-gray mt-1">RDV / mois</div>
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
                class="group bg-white p-6 rounded-md shadow hover:shadow-md transition-all duration-200 text-center hover:-translate-y-1">
                <div class="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    @if (category.icon === 'cut') {
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h7a1 1 0 100-2H7z" clip-rule="evenodd"/>
                    } @else {
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    }
                  </svg>
                </div>
                <span class="text-sm font-medium text-secondary group-hover:text-primary">{{ category.name }}</span>
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
            <div class="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
              </svg>
              Application Mobile
            </div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Réservez partout,<br />tout le temps
            </h2>
            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
              Téléchargez l'application SEFAIZO et accédez à vos services beauté préférés directement depuis votre smartphone.
              Réservations, rappels, historique et bien plus encore.
            </p>

            <!-- Features -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-200">Réservation en un clic</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-200">Notifications et rappels automatiques</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
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
              @for (business of recommendedBusinesses(); track business.id) {
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
                        <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
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
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
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
            <button (click)="scrollCarousel('recommended', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button (click)="scrollCarousel('recommended', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
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
              @for (business of newBusinesses(); track business.id) {
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
                        <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
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
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
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
            <button (click)="scrollCarousel('new', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button (click)="scrollCarousel('new', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
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
              @for (business of trendingBusinesses(); track business.id) {
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
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                      </svg>
                      Tendance
                    </div>
                    @if (business.isVerified) {
                      <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
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
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
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
            <button (click)="scrollCarousel('trending', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button (click)="scrollCarousel('trending', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
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
              @for (review of featuredReviews(); track review.id) {
                <div class="review-card min-w-[300px] max-w-[300px] bg-white rounded-md shadow p-6 flex-shrink-0">
                  <!-- Header -->
                  <div class="flex items-center gap-3 mb-4">
                    <img
                      [src]="review.clientAvatar || 'https://via.placeholder.com/50'"
                      [alt]="review.clientName"
                      class="w-12 h-12 rounded-full object-cover"
                      loading="lazy">
                    <div>
                      <div class="font-semibold text-secondary">{{ review.clientName }}</div>
                      <div class="text-sm text-secondary-gray">{{ review.createdAt | date:'d MMM yyyy' }}</div>
                    </div>
                  </div>

                  <!-- Rating -->
                  <div class="mb-3">
                    <app-star-rating [rating]="review.rating" size="1rem" />
                  </div>

                  <!-- Comment -->
                  <p class="text-secondary-gray text-sm leading-relaxed line-clamp-4">
                    {{ review.comment }}
                  </p>
                </div>
              }
            </div>
            <!-- Carousel Controls -->
            <button (click)="scrollCarousel('reviews', -1)" class="carousel-btn carousel-btn-left absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button (click)="scrollCarousel('reviews', 1)" class="carousel-btn carousel-btn-right absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
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
              <div class="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
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
            <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
              En savoir plus
            </button>
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
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = signal(true);
  categories: ServiceCategory[] = [];
  communes: string[] = [];
  topBusinesses = computed(() => this.mockData.getTopRatedBusinesses(4));
  recommendedBusinesses = computed(() => this.mockData.getRecommendedBusinesses(8));
  newBusinesses = computed(() => this.mockData.getNewBusinesses(8));
  trendingBusinesses = computed(() => this.mockData.getTrendingBusinesses(8));
  featuredReviews = computed(() => this.mockData.getFeaturedReviews(10));
  
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
    // Simulate loading
    setTimeout(() => {
      this.categories = this.mockData.getCategories();
      this.communes = this.mockData.getCommunes().slice(0, 10);
      this.loading.set(false);
    }, 500);

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
}

