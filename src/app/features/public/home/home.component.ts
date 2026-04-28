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
    <!-- Hero Section — Bannière pleine largeur -->
    <section class="relative overflow-hidden hero-section-new">

      <!-- ── Fond bannière : blanc (gauche/haut) → violet #a855f7 (droite/bas) ── -->
      <div class="absolute inset-0 pointer-events-none"
           style="background:linear-gradient(135deg,
             #ffffff 0%,
             #ffffff 38%,
             rgba(168,85,247,0.10) 58%,
             rgba(168,85,247,0.52) 100%)"></div>
      <!-- Blob décoratif violet bas-droite -->
      <div class="absolute pointer-events-none"
           style="right:-60px;bottom:-60px;width:480px;height:480px;
                  background:radial-gradient(circle,rgba(168,85,247,0.28) 0%,transparent 68%);
                  filter:blur(48px)"></div>

      <div class="container-custom relative z-10 py-10 lg:py-0">

        <!-- MOBILE : slideshow en haut, texte en bas  |  DESKTOP : flex row -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:gap-0 gap-7"
             style="min-height:72vh;padding-top:clamp(1.5rem,4vw,4rem);padding-bottom:clamp(1.5rem,4vw,4rem)">

          <!-- ── Texte + Recherche (order-2 mobile → gauche desktop) ── -->
          <div class="w-full lg:flex-1 lg:max-w-[56%] lg:pr-8 order-2 lg:order-1">

            <!-- Titre -->
            <h1 class="font-black leading-tight mb-4 text-center lg:text-left"
                style="font-size:clamp(1.85rem,5vw,3.2rem);color:#111827">
              Réservez votre<br>beauté en
              <span style="color:#7c3aed"> 3 clics</span>
            </h1>

            <p class="text-sm md:text-base mb-5 leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
               style="color:#4b5563;max-width:460px">
              Trouvez les meilleurs salons à Abidjan —
              coiffure, esthétique, bien-être, à domicile ou en salon.
            </p>

            <!-- Barre de recherche -->
            <div class="mb-5">
              <div class="relative">
                <div class="absolute -inset-1.5 rounded-3xl pointer-events-none"
                     style="background:linear-gradient(135deg,#7c3aed,#a855f7);opacity:0.18;filter:blur(8px)"></div>
                <div class="relative bg-white rounded-2xl p-1.5"
                     style="border:2.5px solid #7c3aed;
                            box-shadow:0 0 0 4px rgba(124,58,237,0.10),0 8px 32px rgba(124,58,237,0.18)">
                  <div class="flex flex-col sm:flex-row items-stretch">

                    <!-- Champ Service -->
                    <div class="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl"
                         style="background:linear-gradient(135deg,rgba(124,58,237,0.09) 0%,rgba(168,85,247,0.05) 100%);
                                border:2px solid #7c3aed;
                                box-shadow:0 0 0 3px rgba(124,58,237,0.12),inset 0 1px 3px rgba(124,58,237,0.06);
                                margin:2px;margin-right:0;border-radius:12px">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                           style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
                        <lucide-icon name="scissors" [size]="14" [strokeWidth]="2" class="text-white"></lucide-icon>
                      </div>
                      <div class="flex-1 min-w-0 text-left">
                        <div class="text-xs font-extrabold uppercase tracking-widest mb-0.5" style="color:#7c3aed">Service</div>
                        <input type="text" placeholder="Coiffure, massage, manucure..."
                               [(ngModel)]="heroService" (keyup.enter)="onHeroSearch()"
                               class="service-input w-full text-sm font-semibold bg-transparent placeholder-gray-400"
                               style="color:#111827;border:none;outline:none;box-shadow:none;-webkit-appearance:none;appearance:none"/>
                      </div>
                    </div>

                    <!-- Champ Commune -->
                    <div class="flex items-center gap-2.5 flex-1 px-4 py-3 border-t sm:border-t-0 sm:border-r border-gray-100">
                      <lucide-icon name="map-pin" [size]="16" [strokeWidth]="1.75" class="flex-shrink-0" style="color:#9ca3af"></lucide-icon>
                      <div class="flex-1 min-w-0 text-left">
                        <div class="text-xs font-semibold uppercase tracking-wider mb-0.5" style="color:#9ca3af">Commune</div>
                        <select [(ngModel)]="heroCommune"
                                class="w-full text-sm bg-transparent border-none outline-none font-medium appearance-none cursor-pointer"
                                style="color:#111827">
                          <option value="">Toutes les communes</option>
                          @for (commune of communes; track commune) {
                            <option [value]="commune">{{ commune }}</option>
                          }
                        </select>
                      </div>
                    </div>

                    <!-- Bouton Rechercher -->
                    <div class="px-1.5 py-1.5 flex items-center">
                      <button (click)="onHeroSearch()"
                              class="w-full sm:w-auto text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                              style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%);
                                     box-shadow:0 4px 16px rgba(124,58,237,0.4)">
                        <lucide-icon name="search" [size]="15" [strokeWidth]="2.5"></lucide-icon>
                        Rechercher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags tendances -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5">
              <span class="text-xs font-medium" style="color:#6b7280">Tendances :</span>
              @for (tag of popularTags; track tag) {
                <button (click)="onTagSearch(tag)"
                        class="text-xs px-3 py-1 rounded-full border font-medium transition-all hover:border-purple-400 hover:bg-purple-50"
                        style="border-color:#d4b8ff;color:#7c3aed;background:rgba(245,240,255,0.9)">
                  {{ tag }}
                </button>
              }
            </div>

            <!-- Stats pills -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-sm">
                <lucide-icon name="store" [size]="13" [strokeWidth]="2" style="color:#7c3aed"></lucide-icon>
                <span class="text-sm font-bold" style="color:#111827">500+</span>
                <span class="text-xs" style="color:#6b7280">salons</span>
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-sm">
                <lucide-icon name="calendar-check" [size]="13" [strokeWidth]="2" style="color:#7c3aed"></lucide-icon>
                <span class="text-sm font-bold" style="color:#111827">10 000+</span>
                <span class="text-xs" style="color:#6b7280">réservations</span>
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-sm">
                <lucide-icon name="star" [size]="13" [strokeWidth]="0" class="fill-yellow-400 text-yellow-400"></lucide-icon>
                <span class="text-sm font-bold" style="color:#111827">Note 4.8/5</span>
              </div>
            </div>
          </div>

          <!-- ── Slideshow (order-1 mobile → droite desktop) ── -->
          <div class="w-full lg:flex-1 lg:flex lg:justify-end lg:items-center lg:pr-4 order-1 lg:order-2">
            <div class="relative mx-auto" style="width:100%;max-width:420px">

              <!-- Slideshow boutiques 5s -->
              <div class="relative overflow-hidden rounded-3xl shadow-2xl hero-slideshow">
                @for (img of heroImages; track img; let i = $index) {
                  <img [src]="img"
                       alt="Salon de beauté Abidjan"
                       class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                       [style.opacity]="heroSlideIndex() === i ? '1' : '0'">
                }
                <!-- Fondu gauche (desktop uniquement) -->
                <div class="absolute inset-0 pointer-events-none hidden lg:block"
                     style="background:linear-gradient(to right,rgba(255,255,255,0.4) 0%,transparent 25%)"></div>
                <!-- Overlay bas violet -->
                <div class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                     style="background:linear-gradient(to top,rgba(168,85,247,0.55),transparent)"></div>
                <!-- Indicateurs -->
                <div class="absolute bottom-3 right-4 flex gap-1.5 z-10">
                  @for (img of heroImages; track img; let i = $index) {
                    <button (click)="goToSlide(i)"
                            class="rounded-full transition-all duration-300"
                            [style.width]="heroSlideIndex() === i ? '18px' : '6px'"
                            style="height:6px"
                            [style.background]="heroSlideIndex() === i ? '#a855f7' : 'rgba(255,255,255,0.6)'">
                    </button>
                  }
                </div>
              </div>

              <!-- Badge réservation confirmée -->
              <div class="absolute bottom-4 left-3 bg-white rounded-2xl shadow-xl p-2.5 flex items-center gap-2"
                   style="min-width:168px">
                <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                     style="background:#dcfce7">
                  <svg class="w-3.5 h-3.5" style="color:#16a34a" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs font-bold" style="color:#111827">Réservation confirmée !</div>
                  <div class="text-xs" style="color:#6b7280">Beauty Glam · Cocody</div>
                </div>
              </div>

              <!-- Badge note -->
              <div class="absolute top-3 right-3 bg-white rounded-2xl shadow-xl px-2.5 py-1.5 flex items-center gap-1.5">
                <div class="flex gap-0.5">
                  @for (s of [1,2,3,4,5]; track s) {
                    <svg class="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  }
                </div>
                <div>
                  <div class="text-xs font-bold" style="color:#111827">4.8/5</div>
                  <div class="text-xs" style="color:#6b7280">400+ avis</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Categories Section — Style maquette -->
    <section class="py-10 border-b border-gray-100" style="background:#fafafa">
      <div class="container-custom">
        @if (loading()) {
          <div class="flex gap-4 overflow-hidden justify-center">
            @for (cat of [1,2,3,4,5,6,7,8]; track cat) {
              <div class="w-24 h-24 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0"></div>
            }
          </div>
        } @else {
          <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 justify-start md:justify-center">
            @for (category of categories; track category.id) {
              <button
                (click)="filterByCategory(category.name)"
                class="cat-pill group flex flex-col items-center gap-2.5 px-6 py-4 rounded-2xl border bg-white flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style="min-width:96px;border-color:#f3e8ff">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                     style="background:#f5f0ff;color:#7c3aed">
                  <lucide-icon [name]="getCategoryIcon(category.icon)" [size]="20" [strokeWidth]="1.75"></lucide-icon>
                </div>
                <span class="text-xs font-semibold whitespace-nowrap transition-colors"
                      style="color:#374151">{{ category.name }}</span>
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
                <div class="w-full rounded-[2.2rem] overflow-hidden aspect-[9/19] relative bg-[#011d42]">

                  @switch (phoneScreen()) {

                    <!-- ═══════════════════════════════════
                         ÉCRAN 0 — Accueil / Browse
                    ════════════════════════════════════ -->
                    @case (0) {
                      <div class="phone-screen absolute inset-0 bg-gradient-to-b from-[#011d42] to-[#023e85] flex flex-col text-white overflow-hidden">
                        <!-- Status bar -->
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 shrink-0">
                          <span class="text-[9px] font-bold">14:35</span>
                          <div class="flex items-center gap-1.5">
                            <svg width="11" height="8" fill="currentColor" viewBox="0 0 11 8"><rect x="0" y="5" width="2" height="3" rx="0.5"/><rect x="3" y="3" width="2" height="5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5"/></svg>
                            <svg width="13" height="9" fill="none" viewBox="0 0 13 9"><path d="M6.5 2C4 2 1.8 3.1 0.3 4.8L6.5 9 12.7 4.8C11.2 3.1 9 2 6.5 2z" fill="white"/></svg>
                            <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                          </div>
                        </div>
                        <!-- App header -->
                        <div class="flex justify-between items-center px-4 py-1.5 shrink-0">
                          <img src="/Splash.png" class="h-5 w-auto brightness-0 invert" alt="SEFAIZO">
                          <div class="flex gap-2">
                            <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                              <svg width="11" height="11" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                            </div>
                            <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                              <svg width="11" height="11" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                          </div>
                        </div>
                        <!-- Search bar -->
                        <div class="mx-3 mb-3 bg-white/15 rounded-xl px-3 py-2 flex items-center gap-2 shrink-0">
                          <svg width="11" height="11" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                          <span class="text-[9px] text-white/70">Coiffure, massage, manucure...</span>
                        </div>
                        <!-- Scrollable cards -->
                        <div class="flex-1 overflow-hidden relative">
                          <div class="px-3 space-y-2.5 phone-scroll">
                            <p class="text-[8px] text-white/50 font-bold uppercase tracking-wider mb-1">Recommandés</p>
                            <div class="bg-white/15 rounded-xl overflow-hidden">
                              <div class="h-14 bg-gradient-to-r from-pink-500/60 to-rose-400/60 relative">
                                <span class="absolute bottom-1 right-1.5 bg-black/30 rounded-full px-1.5 py-0.5 text-[7px]">⭐ 4.9</span>
                              </div>
                              <div class="p-2">
                                <p class="text-[9px] font-semibold">Luxury Beauty Treichville</p>
                                <p class="text-[7.5px] text-white/55 mt-0.5">📍 Treichville · 234 avis</p>
                              </div>
                            </div>
                            <div class="bg-white/15 rounded-xl overflow-hidden">
                              <div class="h-14 bg-gradient-to-r from-teal-500/60 to-cyan-400/60 relative">
                                <span class="absolute bottom-1 right-1.5 bg-black/30 rounded-full px-1.5 py-0.5 text-[7px]">⭐ 4.9</span>
                              </div>
                              <div class="p-2">
                                <p class="text-[9px] font-semibold">Barber Shop Plateau</p>
                                <p class="text-[7.5px] text-white/55 mt-0.5">📍 Plateau · 203 avis</p>
                              </div>
                            </div>
                            <div class="bg-white/15 rounded-xl overflow-hidden">
                              <div class="h-14 bg-gradient-to-r from-violet-500/60 to-purple-400/60 relative">
                                <span class="absolute bottom-1 right-1.5 bg-black/30 rounded-full px-1.5 py-0.5 text-[7px]">⭐ 4.8</span>
                              </div>
                              <div class="p-2">
                                <p class="text-[9px] font-semibold">Beauty Salon Cocody</p>
                                <p class="text-[7.5px] text-white/55 mt-0.5">📍 Cocody · 156 avis</p>
                              </div>
                            </div>
                          </div>
                          <div class="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#023e85] to-transparent pointer-events-none"></div>
                        </div>
                        <!-- Bottom nav -->
                        <div class="flex justify-around items-center py-2 bg-white/10 shrink-0">
                          <div class="flex flex-col items-center gap-0.5 text-white">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                            <span class="text-[7px] font-semibold">Accueil</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-white/40">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            <span class="text-[7px]">Recherche</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-white/40">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <span class="text-[7px]">Réservations</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-white/40">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span class="text-[7px]">Profil</span>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 1 — Détail Salon + tap Réserver
                    ════════════════════════════════════ -->
                    @case (1) {
                      <div class="phone-screen absolute inset-0 bg-white flex flex-col overflow-hidden">
                        <!-- Status bar dark -->
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:37</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <!-- Nav header -->
                        <div class="flex items-center gap-3 px-3 py-2 bg-white border-b border-gray-100 shrink-0">
                          <svg width="16" height="16" fill="none" stroke="#012e65" stroke-width="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                          <p class="text-[11px] font-bold text-gray-800">Luxury Beauty Treichville</p>
                        </div>
                        <!-- Cover image -->
                        <div class="h-24 bg-gradient-to-br from-pink-400 to-rose-500 relative shrink-0">
                          <div class="absolute inset-0 flex items-center justify-center opacity-20">
                            <svg width="48" height="48" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                          </div>
                          <div class="absolute bottom-2 right-2 bg-white/90 rounded-full px-2 py-0.5 flex items-center gap-1">
                            <span class="text-yellow-500 text-[8px]">★</span>
                            <span class="text-[8px] font-bold text-gray-800">4.9</span>
                            <span class="text-[7px] text-gray-500">· 234 avis</span>
                          </div>
                        </div>
                        <!-- Info -->
                        <div class="px-3 py-2 border-b border-gray-100 shrink-0">
                          <div class="flex items-center gap-1 text-gray-500">
                            <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span class="text-[8px]">Boulevard de Marseille, Treichville</span>
                          </div>
                          <div class="flex gap-1.5 mt-1.5 flex-wrap">
                            <span class="bg-primary/10 text-primary text-[7px] font-semibold px-1.5 py-0.5 rounded-full">Esthétique</span>
                            <span class="bg-primary/10 text-primary text-[7px] font-semibold px-1.5 py-0.5 rounded-full">Massage</span>
                            <span class="bg-primary/10 text-primary text-[7px] font-semibold px-1.5 py-0.5 rounded-full">Maquillage</span>
                          </div>
                        </div>
                        <!-- Services list -->
                        <div class="flex-1 overflow-hidden px-3 pt-2">
                          <p class="text-[8px] text-gray-400 font-bold uppercase tracking-wider mb-2">Services</p>
                          <div class="space-y-1.5">
                            <div class="flex justify-between items-center py-1.5 border-b border-gray-50">
                              <div>
                                <p class="text-[9px] font-semibold text-gray-800">Coupe &amp; Brushing</p>
                                <p class="text-[7.5px] text-gray-400">30 min</p>
                              </div>
                              <span class="text-[9px] font-bold text-primary">5 000 F</span>
                            </div>
                            <div class="flex justify-between items-center py-1.5 border-b border-gray-50">
                              <div>
                                <p class="text-[9px] font-semibold text-gray-800">Massage relaxant</p>
                                <p class="text-[7.5px] text-gray-400">60 min</p>
                              </div>
                              <span class="text-[9px] font-bold text-primary">15 000 F</span>
                            </div>
                            <div class="flex justify-between items-center py-1.5">
                              <div>
                                <p class="text-[9px] font-semibold text-gray-800">Soin visage</p>
                                <p class="text-[7.5px] text-gray-400">45 min</p>
                              </div>
                              <span class="text-[9px] font-bold text-primary">10 000 F</span>
                            </div>
                          </div>
                        </div>
                        <!-- CTA button with tap -->
                        <div class="px-3 pb-3 pt-2 shrink-0">
                          <div class="relative">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim">
                              Réserver ce salon
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.2s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 2 — Inscription : numéro de téléphone
                    ════════════════════════════════════ -->
                    @case (2) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:39</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-6">
                          <img src="/Splash.png" class="h-9 w-auto mb-3" alt="SEFAIZO">
                          <p class="text-[14px] font-bold text-gray-800 mb-1">Créer un compte</p>
                          <p class="text-[8px] text-gray-400 mb-6 text-center">Entrez votre numéro de téléphone<br>pour commencer</p>
                          <!-- Drapeau CI + champ tel -->
                          <div class="w-full bg-white rounded-2xl border-2 border-primary px-3 py-3 mb-4 field-appear" style="animation-delay:0.3s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-1">Numéro de téléphone</p>
                            <div class="flex items-center gap-2">
                              <span class="text-[11px]">🇨🇮</span>
                              <span class="text-[9px] text-gray-400 font-semibold">+225</span>
                              <div class="flex items-center gap-1 flex-1">
                                <span class="field-type text-[11px] text-gray-800 font-bold tracking-wide" style="--delay:0.5s">07 58 23 14 96</span>
                                <span class="cursor-blink text-primary text-[12px]" style="animation-delay:0.5s">|</span>
                              </div>
                            </div>
                          </div>
                          <p class="text-[7.5px] text-gray-400 mb-5 text-center">Un code OTP vous sera envoyé par SMS</p>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.1s;animation-fill-mode:both">
                              Recevoir le code OTP
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.1s"></div>
                          </div>
                          <p class="text-[7.5px] text-gray-400 mt-3">Déjà inscrit ? <span class="text-primary font-semibold">Connexion</span></p>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 3 — Inscription : saisie OTP
                    ════════════════════════════════════ -->
                    @case (3) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:40</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-6">
                          <!-- Icône SMS -->
                          <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg width="26" height="26" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-1">Code de vérification</p>
                          <p class="text-[8px] text-gray-400 mb-1 text-center">Code envoyé par SMS au</p>
                          <p class="text-[9px] font-bold text-primary mb-6">+225 07 58 23 14 96</p>
                          <!-- Boîtes OTP -->
                          <div class="flex gap-2 mb-6">
                            <div class="otp-box field-appear" style="animation-delay:0.4s">4</div>
                            <div class="otp-box field-appear" style="animation-delay:0.8s">8</div>
                            <div class="otp-box field-appear" style="animation-delay:1.2s">2</div>
                            <div class="otp-box field-appear" style="animation-delay:1.6s">9</div>
                            <div class="otp-box field-appear" style="animation-delay:2.0s">1</div>
                            <div class="otp-box field-appear" style="animation-delay:2.4s">3</div>
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.7s;animation-fill-mode:both">
                              Valider le code
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.7s"></div>
                          </div>
                          <p class="text-[7.5px] text-gray-400 mt-3">Pas reçu ? <span class="text-primary font-semibold">Renvoyer</span></p>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 4 — Inscription : créer PIN 4 chiffres
                    ════════════════════════════════════ -->
                    @case (4) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:41</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-4">
                          <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg width="26" height="26" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-1">Créez votre PIN</p>
                          <p class="text-[8px] text-gray-400 mb-8 text-center">Choisissez un code PIN à 4 chiffres<br>pour sécuriser votre compte</p>
                          <!-- 4 points PIN -->
                          <div class="flex gap-5 mb-10">
                            <div class="pin-dot field-appear" style="animation-delay:0.4s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:0.8s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:1.2s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:1.6s"></div>
                          </div>
                          <!-- Pavé numérique simplifié -->
                          <div class="grid grid-cols-3 gap-3 w-full max-w-[160px] mb-5">
                            @for (n of [1,2,3,4,5,6,7,8,9,'*',0,'#']; track n) {
                              <div class="h-8 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-700">{{ n }}</div>
                            }
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.1s;animation-fill-mode:both">
                              Confirmer le PIN
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.1s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 5 — Connexion : numéro de téléphone
                    ════════════════════════════════════ -->
                    @case (5) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:43</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-6">
                          <img src="/Splash.png" class="h-9 w-auto mb-3" alt="SEFAIZO">
                          <p class="text-[14px] font-bold text-gray-800 mb-1">Connexion</p>
                          <p class="text-[8px] text-gray-400 mb-7 text-center">Bon retour ! Entrez votre numéro<br>de téléphone</p>
                          <div class="w-full bg-white rounded-2xl border-2 border-primary px-3 py-3 mb-5 field-appear" style="animation-delay:0.3s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-1">Numéro de téléphone</p>
                            <div class="flex items-center gap-2">
                              <span class="text-[11px]">🇨🇮</span>
                              <span class="text-[9px] text-gray-400 font-semibold">+225</span>
                              <div class="flex items-center gap-1 flex-1">
                                <span class="field-type text-[11px] text-gray-800 font-bold tracking-wide" style="--delay:0.5s">07 58 23 14 96</span>
                                <span class="cursor-blink text-primary text-[12px]" style="animation-delay:0.5s">|</span>
                              </div>
                            </div>
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:1.6s;animation-fill-mode:both">
                              Continuer
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:1.6s"></div>
                          </div>
                          <p class="text-[7.5px] text-gray-400 mt-3">Pas de compte ? <span class="text-primary font-semibold">S'inscrire</span></p>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 6 — Connexion : saisie PIN
                    ════════════════════════════════════ -->
                    @case (6) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:44</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-4">
                          <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg width="26" height="26" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-1">Entrez votre PIN</p>
                          <p class="text-[8px] text-gray-400 mb-8 text-center">+225 07 58 23 14 96</p>
                          <!-- 4 points PIN -->
                          <div class="flex gap-5 mb-10">
                            <div class="pin-dot field-appear" style="animation-delay:0.3s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:0.7s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:1.1s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:1.5s"></div>
                          </div>
                          <!-- Pavé numérique -->
                          <div class="grid grid-cols-3 gap-3 w-full max-w-[160px] mb-5">
                            @for (n of [1,2,3,4,5,6,7,8,9,'*',0,'#']; track n) {
                              <div class="h-8 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-700">{{ n }}</div>
                            }
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:1.9s;animation-fill-mode:both">
                              Valider le PIN
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:1.9s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 7 — Connexion : OTP de confirmation
                    ════════════════════════════════════ -->
                    @case (7) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:44</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-6">
                          <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg width="26" height="26" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-1">Code de connexion</p>
                          <p class="text-[8px] text-gray-400 mb-1 text-center">Code envoyé par SMS au</p>
                          <p class="text-[9px] font-bold text-primary mb-6">+225 07 58 23 14 96</p>
                          <!-- Boîtes OTP -->
                          <div class="flex gap-2 mb-6">
                            <div class="otp-box field-appear" style="animation-delay:0.5s">7</div>
                            <div class="otp-box field-appear" style="animation-delay:0.9s">3</div>
                            <div class="otp-box field-appear" style="animation-delay:1.3s">1</div>
                            <div class="otp-box field-appear" style="animation-delay:1.7s">5</div>
                            <div class="otp-box field-appear" style="animation-delay:2.1s">8</div>
                            <div class="otp-box field-appear" style="animation-delay:2.5s">2</div>
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.7s;animation-fill-mode:both">
                              Se connecter
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.7s"></div>
                          </div>
                          <p class="text-[7.5px] text-gray-400 mt-3">Pas reçu ? <span class="text-primary font-semibold">Renvoyer</span></p>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 8 — Espace Client / Dashboard
                    ════════════════════════════════════ -->
                    @case (8) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:45</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <!-- Header dashboard -->
                        <div class="bg-gradient-to-r from-[#011d42] to-[#023e85] px-4 py-3 text-white shrink-0">
                          <p class="text-[8px] text-white/60">Espace client</p>
                          <p class="text-[13px] font-bold">Bonjour, Fatou ! 👋</p>
                        </div>
                        <div class="flex-1 overflow-hidden px-3 pt-3 space-y-2.5">
                          <!-- Prochaine RDV card -->
                          <div class="bg-white rounded-xl p-3 border border-primary/30 shadow-sm field-appear" style="animation-delay:0.4s">
                            <div class="flex justify-between items-start mb-2">
                              <p class="text-[8px] text-gray-400 font-semibold uppercase">Prochaine réservation</p>
                              <span class="bg-emerald-100 text-emerald-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Confirmée</span>
                            </div>
                            <p class="text-[10px] font-bold text-gray-800">Luxury Beauty Treichville</p>
                            <p class="text-[8.5px] text-primary font-semibold mt-0.5">Coupe &amp; Brushing</p>
                            <div class="flex items-center gap-3 mt-2 text-gray-500">
                              <div class="flex items-center gap-1">
                                <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                <span class="text-[8px]">Mer. 25 avril 2026</span>
                              </div>
                              <div class="flex items-center gap-1">
                                <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span class="text-[8px]">14h30</span>
                              </div>
                            </div>
                          </div>
                          <!-- Liens rapides -->
                          <div class="grid grid-cols-3 gap-2 field-appear" style="animation-delay:0.9s">
                            <div class="bg-white rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm">
                              <div class="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                                <svg width="13" height="13" fill="none" stroke="#012e65" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                              </div>
                              <span class="text-[7px] text-gray-600 text-center">Mes RDV</span>
                            </div>
                            <div class="bg-white rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm">
                              <div class="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                                <svg width="13" height="13" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                              </div>
                              <span class="text-[7px] text-gray-600 text-center">Favoris</span>
                            </div>
                            <div class="bg-white rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm">
                              <div class="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                                <svg width="13" height="13" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                              </div>
                              <span class="text-[7px] text-gray-600 text-center">Alertes</span>
                            </div>
                          </div>
                        </div>
                        <!-- Bottom nav -->
                        <div class="flex justify-around items-center py-2 bg-white border-t border-gray-100 shrink-0">
                          <div class="flex flex-col items-center gap-0.5 text-primary">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                            <span class="text-[7px] font-semibold">Accueil</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <span class="text-[7px]">Réservations</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            <span class="text-[7px]">Favoris</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span class="text-[7px]">Profil</span>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ═══════════════════════════════════
                         ÉCRAN 9 — Réservation Confirmée ✅
                    ════════════════════════════════════ -->
                    @case (9) {
                      <div class="phone-screen absolute inset-0 bg-white flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:46</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-4 pb-4">
                          <!-- Checkmark animé -->
                          <div class="check-circle-anim w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="check-draw-anim" width="32" height="32" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <p class="text-[15px] font-bold text-gray-800 mb-1">Réservation confirmée !</p>
                          <p class="text-[8.5px] text-gray-400 mb-5 text-center">Votre rendez-vous a été enregistré avec succès.</p>
                          <!-- Recap card -->
                          <div class="w-full bg-gray-50 rounded-2xl p-3.5 border border-gray-100 space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-[8px] text-gray-400 font-semibold">Salon</span>
                              <span class="text-[8.5px] font-bold text-gray-800">Luxury Beauty</span>
                            </div>
                            <div class="flex justify-between items-center">
                              <span class="text-[8px] text-gray-400 font-semibold">Service</span>
                              <span class="text-[8.5px] font-bold text-gray-800">Coupe &amp; Brushing</span>
                            </div>
                            <div class="flex justify-between items-center">
                              <span class="text-[8px] text-gray-400 font-semibold">Date</span>
                              <span class="text-[8.5px] font-bold text-primary">Mer. 25 avril 2026</span>
                            </div>
                            <div class="flex justify-between items-center">
                              <span class="text-[8px] text-gray-400 font-semibold">Heure</span>
                              <span class="text-[8.5px] font-bold text-primary">14h30</span>
                            </div>
                            <div class="flex justify-between items-center border-t border-gray-200 pt-2">
                              <span class="text-[8px] text-gray-400 font-semibold">Total</span>
                              <span class="text-[9px] font-bold text-gray-800">5 000 FCFA</span>
                            </div>
                          </div>
                          <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl">
                            Voir mes réservations
                          </button>
                        </div>
                      </div>
                    }
                    <!-- ══════════════════════════════════════════
                         ÉCRAN 10 — Transition : Espace Professionnel
                    ══════════════════════════════════════════ -->
                    @case (10) {
                      <div class="phone-screen absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
                           style="background:linear-gradient(145deg,#011d42 0%,#012e65 50%,#023e85 100%)">
                        <!-- Cercles décoratifs -->
                        <div class="absolute top-8 right-8 w-28 h-28 rounded-full opacity-10" style="background:white"></div>
                        <div class="absolute bottom-12 left-6 w-20 h-20 rounded-full opacity-10" style="background:white"></div>
                        <div class="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-5" style="background:white;transform:translate(-50%,-50%)"></div>
                        <!-- Icône mallette -->
                        <div class="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-5 check-circle-anim">
                          <svg width="32" height="32" fill="none" stroke="white" stroke-width="1.8" viewBox="0 0 24 24">
                            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/><path d="M12 12h.01"/>
                          </svg>
                        </div>
                        <p class="text-white/60 text-[9px] font-semibold uppercase tracking-[3px] mb-2 field-appear" style="animation-delay:0.3s">Découvrez</p>
                        <p class="text-white text-[18px] font-black text-center leading-tight mb-1 field-appear" style="animation-delay:0.5s">Espace</p>
                        <p class="text-white text-[18px] font-black text-center leading-tight field-appear" style="animation-delay:0.7s">Professionnel</p>
                        <div class="w-10 h-0.5 bg-white/40 rounded my-3 field-appear" style="animation-delay:0.9s"></div>
                        <p class="text-white/70 text-[9px] text-center px-6 field-appear" style="animation-delay:1.1s">Gérez votre activité beauté depuis votre smartphone</p>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 11 — Pro Inscription : numéro de téléphone
                    ══════════════════════════════════════════ -->
                    @case (11) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:05</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-6">
                          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                            <svg width="20" height="20" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-0.5">Compte Professionnel</p>
                          <p class="text-[8px] text-gray-400 mb-6 text-center">Rejoignez + 2 400 pros sur SEFAIZO</p>
                          <div class="w-full bg-white rounded-2xl border-2 border-primary px-3 py-3 mb-4 field-appear" style="animation-delay:0.3s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-1">Numéro de téléphone</p>
                            <div class="flex items-center gap-2">
                              <span class="text-[11px]">🇨🇮</span>
                              <span class="text-[9px] text-gray-400 font-semibold">+225</span>
                              <div class="flex items-center gap-1 flex-1">
                                <span class="field-type text-[11px] text-gray-800 font-bold tracking-wide" style="--delay:0.5s">05 04 12 87 33</span>
                                <span class="cursor-blink text-primary text-[12px]" style="animation-delay:0.5s">|</span>
                              </div>
                            </div>
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.0s;animation-fill-mode:both">Recevoir le code OTP</button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.0s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 12 — Pro Inscription : OTP
                    ══════════════════════════════════════════ -->
                    @case (12) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:06</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-6">
                          <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg width="26" height="26" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-1">Code de vérification</p>
                          <p class="text-[8px] text-gray-400 mb-1 text-center">Code envoyé au</p>
                          <p class="text-[9px] font-bold text-primary mb-6">+225 05 04 12 87 33</p>
                          <div class="flex gap-2 mb-6">
                            <div class="otp-box field-appear" style="animation-delay:0.4s">3</div>
                            <div class="otp-box field-appear" style="animation-delay:0.8s">7</div>
                            <div class="otp-box field-appear" style="animation-delay:1.2s">5</div>
                            <div class="otp-box field-appear" style="animation-delay:1.6s">2</div>
                            <div class="otp-box field-appear" style="animation-delay:2.0s">8</div>
                            <div class="otp-box field-appear" style="animation-delay:2.4s">1</div>
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.6s;animation-fill-mode:both">Valider le code</button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.6s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 13 — Pro Inscription : PIN
                    ══════════════════════════════════════════ -->
                    @case (13) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:07</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-4">
                          <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg width="26" height="26" fill="none" stroke="#012e65" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          <p class="text-[13px] font-bold text-gray-800 mb-1">Créez votre PIN Pro</p>
                          <p class="text-[8px] text-gray-400 mb-8 text-center">Code PIN à 4 chiffres pour sécuriser<br>votre espace professionnel</p>
                          <div class="flex gap-5 mb-10">
                            <div class="pin-dot field-appear" style="animation-delay:0.3s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:0.7s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:1.1s"></div>
                            <div class="pin-dot field-appear" style="animation-delay:1.5s"></div>
                          </div>
                          <div class="grid grid-cols-3 gap-3 w-full max-w-[160px] mb-5">
                            @for (n of [1,2,3,4,5,6,7,8,9,'*',0,'#']; track n) {
                              <div class="h-8 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-700">{{ n }}</div>
                            }
                          </div>
                          <div class="relative w-full">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.0s;animation-fill-mode:both">Confirmer le PIN</button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.0s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 14 — Pro : Configuration profil métier
                    ══════════════════════════════════════════ -->
                    @case (14) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:08</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <!-- Header gradient -->
                        <div class="bg-gradient-to-r from-[#011d42] to-[#023e85] px-4 py-3 text-white shrink-0">
                          <p class="text-[8px] text-white/60">Étape 1 / 2</p>
                          <p class="text-[12px] font-bold">Mon profil métier</p>
                        </div>
                        <div class="flex-1 overflow-y-hidden px-4 pt-3 pb-3 space-y-2.5">
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:0.3s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Nom du salon / établissement</p>
                            <div class="flex items-center gap-1">
                              <span class="field-type text-[10px] text-gray-800 font-semibold" style="--delay:0.4s">Luxury Nails Cocody</span>
                              <span class="cursor-blink text-primary text-[11px]" style="animation-delay:0.4s">|</span>
                            </div>
                          </div>
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:1.2s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Type d'activité</p>
                            <div class="flex items-center justify-between">
                              <span class="text-[10px] text-gray-800">Salon de beauté</span>
                              <svg width="10" height="10" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                            </div>
                          </div>
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:1.9s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Catégories de services</p>
                            <div class="flex gap-1 flex-wrap mt-1">
                              <span class="bg-primary text-white text-[7px] px-1.5 py-0.5 rounded-full">Manucure</span>
                              <span class="bg-primary text-white text-[7px] px-1.5 py-0.5 rounded-full">Esthétique</span>
                              <span class="bg-primary/10 text-primary text-[7px] px-1.5 py-0.5 rounded-full">+ Ajouter</span>
                            </div>
                          </div>
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:2.7s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Adresse</p>
                            <div class="flex items-center gap-1">
                              <span class="field-type text-[10px] text-gray-800" style="--delay:2.8s">Angré, Cocody, Abidjan</span>
                              <span class="cursor-blink text-primary text-[11px]" style="animation-delay:2.8s">|</span>
                            </div>
                          </div>
                          <div class="relative w-full field-appear" style="animation-delay:3.5s">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:3.6s;animation-fill-mode:both">Enregistrer mon profil</button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:3.6s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 15 — Pro : Dashboard
                    ══════════════════════════════════════════ -->
                    @case (15) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:10</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="bg-gradient-to-r from-[#011d42] to-[#023e85] px-4 py-3 text-white shrink-0">
                          <p class="text-[8px] text-white/60">Espace Pro</p>
                          <p class="text-[13px] font-bold">Bonjour, Adjoua ! 💼</p>
                        </div>
                        <div class="flex-1 overflow-hidden px-3 pt-3 space-y-2 pb-2">
                          <!-- Wallet card -->
                          <div class="bg-primary rounded-xl p-3 text-white field-appear" style="animation-delay:0.3s">
                            <p class="text-[7.5px] text-white/70 mb-0.5">Solde disponible</p>
                            <p class="text-[18px] font-black">35 000 FCFA</p>
                            <p class="text-[7px] text-white/60">En attente: 12 500 FCFA</p>
                          </div>
                          <!-- Stats rapides -->
                          <div class="grid grid-cols-3 gap-2 field-appear" style="animation-delay:0.7s">
                            <div class="bg-white rounded-xl p-2 text-center shadow-sm">
                              <p class="text-[12px] font-bold text-green-600">7</p>
                              <p class="text-[7px] text-gray-400">Confirmés</p>
                            </div>
                            <div class="bg-white rounded-xl p-2 text-center shadow-sm">
                              <p class="text-[12px] font-bold text-amber-500">3</p>
                              <p class="text-[7px] text-gray-400">En attente</p>
                            </div>
                            <div class="bg-white rounded-xl p-2 text-center shadow-sm">
                              <p class="text-[12px] font-bold text-primary">5</p>
                              <p class="text-[7px] text-gray-400">Services</p>
                            </div>
                          </div>
                          <!-- Raccourcis -->
                          <div class="grid grid-cols-2 gap-2 field-appear" style="animation-delay:1.1s">
                            <div class="bg-white rounded-xl p-2.5 flex items-center gap-2 shadow-sm">
                              <div class="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                                <svg width="12" height="12" fill="none" stroke="#012e65" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                              </div>
                              <span class="text-[8px] font-semibold text-gray-700">Ajouter service</span>
                            </div>
                            <div class="bg-white rounded-xl p-2.5 flex items-center gap-2 shadow-sm">
                              <div class="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center">
                                <svg width="12" height="12" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                              </div>
                              <span class="text-[8px] font-semibold text-gray-700">Agenda</span>
                            </div>
                          </div>
                        </div>
                        <!-- Bottom nav -->
                        <div class="flex justify-around items-center py-2 bg-white border-t border-gray-100 shrink-0">
                          <div class="flex flex-col items-center gap-0.5 text-primary">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                            <span class="text-[7px] font-semibold">Accueil</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                            <span class="text-[7px]">Services</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <span class="text-[7px]">Agenda</span>
                          </div>
                          <div class="flex flex-col items-center gap-0.5 text-gray-400">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <span class="text-[7px]">Wallet</span>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 16 — Pro : Ajout et publication d'un service
                    ══════════════════════════════════════════ -->
                    @case (16) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:12</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2 bg-white border-b border-gray-100 shrink-0">
                          <svg width="14" height="14" fill="none" stroke="#012e65" stroke-width="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                          <p class="text-[11px] font-bold text-gray-800">Nouveau service</p>
                        </div>
                        <div class="flex-1 overflow-hidden px-4 pt-3 space-y-2.5">
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:0.3s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Nom du service</p>
                            <div class="flex items-center gap-1">
                              <span class="field-type text-[10px] text-gray-800 font-semibold" style="--delay:0.4s">Manucure gel</span>
                              <span class="cursor-blink text-primary text-[11px]" style="animation-delay:0.4s">|</span>
                            </div>
                          </div>
                          <div class="flex gap-2">
                            <div class="flex-1 bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:1.1s">
                              <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Prix</p>
                              <div class="flex items-center gap-1">
                                <span class="field-type text-[10px] text-gray-800 font-bold" style="--delay:1.2s">12 000</span>
                                <span class="cursor-blink text-primary text-[11px]" style="animation-delay:1.2s">|</span>
                              </div>
                              <p class="text-[7px] text-gray-300">FCFA</p>
                            </div>
                            <div class="flex-1 bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:1.1s">
                              <p class="text-[7px] text-gray-400 font-semibold uppercase mb-0.5">Durée</p>
                              <div class="flex items-center gap-1">
                                <span class="field-type text-[10px] text-gray-800 font-bold" style="--delay:1.9s">45</span>
                                <span class="cursor-blink text-primary text-[11px]" style="animation-delay:1.9s">|</span>
                              </div>
                              <p class="text-[7px] text-gray-300">min</p>
                            </div>
                          </div>
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 field-appear" style="animation-delay:2.5s">
                            <p class="text-[7px] text-gray-400 font-semibold uppercase mb-1">Catégorie</p>
                            <div class="flex items-center justify-between">
                              <span class="text-[10px] text-gray-800">Manucure</span>
                              <svg width="10" height="10" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                            </div>
                          </div>
                          <!-- Toggle publication -->
                          <div class="bg-white rounded-xl px-3 py-2.5 border border-gray-200 flex items-center justify-between field-appear" style="animation-delay:3.0s">
                            <div>
                              <p class="text-[9px] font-semibold text-gray-800">Publier le service</p>
                              <p class="text-[7px] text-gray-400">Visible sur la marketplace</p>
                            </div>
                            <div class="w-9 h-5 bg-primary rounded-full flex items-center justify-end px-0.5">
                              <div class="w-4 h-4 bg-white rounded-full shadow"></div>
                            </div>
                          </div>
                          <div class="relative w-full field-appear" style="animation-delay:3.3s">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:3.4s;animation-fill-mode:both">Publier le service</button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:3.4s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 17 — Pro : Service publié + dépublication
                    ══════════════════════════════════════════ -->
                    @case (17) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">09:13</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100 shrink-0">
                          <p class="text-[11px] font-bold text-gray-800">Mes services</p>
                          <span class="bg-emerald-100 text-emerald-700 text-[7px] font-bold px-2 py-0.5 rounded-full">5 publiés</span>
                        </div>
                        <div class="flex-1 overflow-hidden px-3 pt-3 space-y-2">
                          <!-- Service publié -->
                          <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-sm field-appear" style="animation-delay:0.3s">
                            <div class="flex justify-between items-start mb-1.5">
                              <p class="text-[10px] font-bold text-gray-800">Manucure gel</p>
                              <span class="bg-emerald-100 text-emerald-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Publié</span>
                            </div>
                            <p class="text-[9px] font-bold text-primary mb-1.5">12 000 FCFA · 45 min</p>
                            <div class="flex items-center justify-between pt-1.5 border-t border-gray-50">
                              <span class="text-[7.5px] text-gray-400">Visible sur la marketplace</span>
                              <!-- Toggle ON → cliqué pour dépublier -->
                              <div class="relative">
                                <div class="w-9 h-5 bg-primary rounded-full flex items-center justify-end px-0.5 btn-tap-anim" style="animation-delay:1.8s">
                                  <div class="w-4 h-4 bg-white rounded-full shadow"></div>
                                </div>
                                <div class="tap-indicator" style="bottom:50%;right:2px;transform:translate(0,50%);animation-delay:1.8s"></div>
                              </div>
                            </div>
                          </div>
                          <!-- Autre service -->
                          <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-sm field-appear" style="animation-delay:0.6s">
                            <div class="flex justify-between items-start mb-1.5">
                              <p class="text-[10px] font-bold text-gray-800">Soin des mains</p>
                              <span class="bg-emerald-100 text-emerald-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Publié</span>
                            </div>
                            <p class="text-[9px] font-bold text-primary">7 500 FCFA · 30 min</p>
                          </div>
                          <!-- Service brouillon -->
                          <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-sm field-appear" style="animation-delay:0.9s">
                            <div class="flex justify-between items-start mb-1.5">
                              <p class="text-[10px] font-bold text-gray-800">Pose d'ongles</p>
                              <span class="bg-gray-100 text-gray-500 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Brouillon</span>
                            </div>
                            <p class="text-[9px] font-bold text-primary">18 000 FCFA · 90 min</p>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 18 — Pro : Agenda — RDV en attente
                    ══════════════════════════════════════════ -->
                    @case (18) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">10:30</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100 shrink-0">
                          <p class="text-[11px] font-bold text-gray-800">Mon Agenda</p>
                          <span class="bg-amber-100 text-amber-700 text-[7px] font-bold px-2 py-0.5 rounded-full">3 en attente</span>
                        </div>
                        <div class="flex-1 overflow-hidden px-3 pt-3 space-y-2">
                          <!-- RDV en attente -->
                          <div class="bg-white rounded-xl p-3 border border-amber-200 shadow-sm field-appear" style="animation-delay:0.3s">
                            <div class="flex items-center gap-2 mb-2">
                              <div class="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">FD</div>
                              <div class="flex-1">
                                <p class="text-[9px] font-bold text-gray-800">Fatou Diallo</p>
                                <p class="text-[7.5px] text-gray-500">Manucure gel · 45 min</p>
                              </div>
                              <span class="bg-amber-100 text-amber-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">En attente</span>
                            </div>
                            <div class="flex items-center gap-3 mb-2.5 text-gray-500">
                              <div class="flex items-center gap-1">
                                <svg width="8" height="8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                <span class="text-[7.5px]">Mer. 25 avr. 2026</span>
                              </div>
                              <div class="flex items-center gap-1">
                                <svg width="8" height="8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span class="text-[7.5px]">14h30</span>
                              </div>
                            </div>
                            <div class="flex items-center justify-between">
                              <p class="text-[10px] font-bold text-primary">12 000 FCFA</p>
                              <div class="relative">
                                <button class="bg-primary text-white text-[8px] font-bold px-3 py-1.5 rounded-lg btn-tap-anim" style="animation-delay:2.2s;animation-fill-mode:both">Confirmer</button>
                                <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.2s"></div>
                              </div>
                            </div>
                          </div>
                          <!-- 2e RDV -->
                          <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-sm field-appear" style="animation-delay:0.6s">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-700">AK</div>
                              <div class="flex-1">
                                <p class="text-[9px] font-bold text-gray-800">Aminata Kouassi</p>
                                <p class="text-[7.5px] text-gray-500">Soin des mains · 30 min</p>
                              </div>
                              <span class="bg-emerald-100 text-emerald-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Confirmé</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 19 — Pro : RDV confirmé — Encaissement
                    ══════════════════════════════════════════ -->
                    @case (19) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:35</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2 bg-white border-b border-gray-100 shrink-0">
                          <svg width="14" height="14" fill="none" stroke="#012e65" stroke-width="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                          <p class="text-[11px] font-bold text-gray-800">Détail réservation</p>
                        </div>
                        <div class="flex-1 overflow-hidden px-3 pt-3 space-y-2.5">
                          <!-- Client info -->
                          <div class="bg-white rounded-xl p-3 border border-emerald-200 shadow-sm field-appear" style="animation-delay:0.3s">
                            <div class="flex items-center gap-2 mb-2">
                              <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">FD</div>
                              <div>
                                <p class="text-[10px] font-bold text-gray-800">Fatou Diallo</p>
                                <p class="text-[7.5px] text-gray-500">+225 07 58 23 14 96</p>
                              </div>
                              <span class="ml-auto bg-emerald-100 text-emerald-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Confirmé ✓</span>
                            </div>
                            <div class="pt-2 border-t border-gray-50 space-y-1">
                              <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Service</span><span class="text-[7.5px] font-semibold">Manucure gel</span></div>
                              <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Durée</span><span class="text-[7.5px] font-semibold">45 min</span></div>
                              <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Heure</span><span class="text-[7.5px] font-semibold text-primary">14h30</span></div>
                            </div>
                          </div>
                          <!-- Encaissement -->
                          <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-sm field-appear" style="animation-delay:0.7s">
                            <p class="text-[7.5px] text-gray-400 font-semibold uppercase mb-2">Encaissement</p>
                            <div class="flex items-center justify-between mb-2.5">
                              <span class="text-[8px] text-gray-600">Montant total</span>
                              <span class="text-[14px] font-black text-primary">12 000 FCFA</span>
                            </div>
                            <div class="flex gap-2">
                              <div class="flex-1 bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                                <span class="text-[8px] text-gray-600">Espèces</span>
                              </div>
                              <div class="flex-1 bg-primary/10 rounded-lg p-2 text-center border border-primary/30">
                                <span class="text-[8px] text-primary font-semibold">Mobile Money</span>
                              </div>
                            </div>
                          </div>
                          <div class="relative w-full field-appear" style="animation-delay:1.5s">
                            <button class="w-full bg-emerald-600 text-white text-[10px] font-bold py-3 rounded-xl btn-tap-anim" style="animation-delay:2.1s;animation-fill-mode:both">
                              Confirmer l'encaissement
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.1s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 20 — Pro : Encaissement confirmé
                    ══════════════════════════════════════════ -->
                    @case (20) {
                      <div class="phone-screen absolute inset-0 bg-white flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">14:36</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-4">
                          <div class="check-circle-anim w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="check-draw-anim" width="32" height="32" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <p class="text-[15px] font-bold text-gray-800 mb-1">Encaissement réussi !</p>
                          <p class="text-[8.5px] text-gray-400 mb-5 text-center">Le paiement a été enregistré<br>dans votre wallet.</p>
                          <div class="w-full bg-emerald-50 rounded-2xl p-4 border border-emerald-200 mb-4 text-center">
                            <p class="text-[8px] text-emerald-600 font-semibold mb-1">Montant encaissé</p>
                            <p class="text-[24px] font-black text-emerald-700">12 000</p>
                            <p class="text-[9px] text-emerald-600">FCFA</p>
                          </div>
                          <div class="w-full bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5">
                            <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Client</span><span class="text-[7.5px] font-semibold">Fatou Diallo</span></div>
                            <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Service</span><span class="text-[7.5px] font-semibold">Manucure gel</span></div>
                            <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Mode</span><span class="text-[7.5px] font-semibold text-primary">Mobile Money</span></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 21 — Pro : Wallet & Demande de reversement
                    ══════════════════════════════════════════ -->
                    @case (21) {
                      <div class="phone-screen absolute inset-0 bg-gray-50 flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">15:00</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="bg-gradient-to-r from-[#011d42] to-[#023e85] px-4 py-4 text-white shrink-0">
                          <p class="text-[8px] text-white/60 mb-1">Solde disponible</p>
                          <p class="text-[22px] font-black">47 000 FCFA</p>
                          <p class="text-[7.5px] text-white/50 mt-0.5">En attente: 12 500 FCFA</p>
                        </div>
                        <div class="flex-1 overflow-hidden px-3 pt-3 space-y-2.5 pb-3">
                          <!-- Derniers mouvements -->
                          <p class="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Derniers mouvements</p>
                          <div class="bg-white rounded-xl divide-y divide-gray-50 shadow-sm field-appear" style="animation-delay:0.3s">
                            <div class="flex items-center justify-between p-2.5">
                              <div class="flex items-center gap-2">
                                <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <svg width="10" height="10" fill="none" stroke="#059669" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                                </div>
                                <div>
                                  <p class="text-[8px] font-semibold text-gray-800">Manucure gel</p>
                                  <p class="text-[7px] text-gray-400">Fatou Diallo</p>
                                </div>
                              </div>
                              <span class="text-[9px] font-bold text-emerald-600">+12 000</span>
                            </div>
                            <div class="flex items-center justify-between p-2.5">
                              <div class="flex items-center gap-2">
                                <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <svg width="10" height="10" fill="none" stroke="#059669" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                                </div>
                                <div>
                                  <p class="text-[8px] font-semibold text-gray-800">Soin des mains</p>
                                  <p class="text-[7px] text-gray-400">Aminata Kouassi</p>
                                </div>
                              </div>
                              <span class="text-[9px] font-bold text-emerald-600">+7 500</span>
                            </div>
                          </div>
                          <!-- Bouton reversement -->
                          <div class="relative w-full field-appear" style="animation-delay:1.2s">
                            <button class="w-full bg-primary text-white text-[10px] font-bold py-3 rounded-xl flex items-center justify-center gap-2 btn-tap-anim" style="animation-delay:2.2s;animation-fill-mode:both">
                              <svg width="13" height="13" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                              Demander un reversement
                            </button>
                            <div class="tap-indicator" style="bottom:50%;left:50%;transform:translate(-50%,50%);animation-delay:2.2s"></div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- ══════════════════════════════════════════
                         ÉCRAN 22 — Pro : Reversement en cours
                    ══════════════════════════════════════════ -->
                    @case (22) {
                      <div class="phone-screen absolute inset-0 bg-white flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center px-4 pt-2.5 pb-0.5 bg-[#011d42] text-white shrink-0">
                          <span class="text-[9px] font-bold">15:02</span>
                          <svg width="20" height="9" fill="currentColor" viewBox="0 0 20 9"><rect x="0" y="1" width="17" height="7" rx="2" stroke="white" stroke-width="1" fill="none"/><rect x="17.5" y="3" width="1.5" height="3" rx="0.8" fill="white" opacity="0.6"/><rect x="1" y="2" width="13" height="5" rx="1" fill="white"/></svg>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center px-5 pb-4">
                          <!-- Icône envoi animé -->
                          <div class="check-circle-anim w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <svg class="check-draw-anim" width="30" height="30" fill="none" stroke="#012e65" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          </div>
                          <p class="text-[14px] font-bold text-gray-800 mb-1">Demande envoyée !</p>
                          <p class="text-[8px] text-gray-400 mb-5 text-center">Votre reversement est en cours<br>de traitement.</p>
                          <!-- Montant -->
                          <div class="w-full bg-primary/5 rounded-2xl p-4 border border-primary/20 mb-4 text-center">
                            <p class="text-[8px] text-primary font-semibold mb-1">Montant demandé</p>
                            <p class="text-[22px] font-black text-primary">47 000</p>
                            <p class="text-[9px] text-primary/70">FCFA</p>
                          </div>
                          <div class="w-full bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5 mb-4">
                            <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Banque</span><span class="text-[7.5px] font-semibold">Wave CI / MTN Money</span></div>
                            <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Statut</span><span class="text-[7.5px] font-semibold text-amber-600">⏳ En traitement</span></div>
                            <div class="flex justify-between"><span class="text-[7.5px] text-gray-400">Délai estimé</span><span class="text-[7.5px] font-semibold">24 – 48h</span></div>
                          </div>
                          <button class="w-full bg-gray-100 text-gray-700 text-[10px] font-bold py-2.5 rounded-xl">
                            Retour au wallet
                          </button>
                        </div>
                      </div>
                    }

                  }

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

    <!-- Recommandés Section — Style maquette -->
    <section class="section" style="background:#fff">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="section-title mb-1">Salons recommandés pour vous</h2>
            <p class="text-secondary-gray">Les préférés de nos clients à Abidjan</p>
          </div>
          <a href="/recherche" class="font-semibold hover:opacity-80 transition-colors inline-flex items-center gap-1 text-sm"
             style="color:#7c3aed">
            Voir tout les salons
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
              @for (business of recommendedBusinesses; track business.id; let i = $index) {
                <div class="salon-card min-w-[270px] max-w-[270px] bg-white rounded-2xl overflow-hidden flex-shrink-0 flex flex-col"
                     style="box-shadow:0 4px 24px rgba(124,58,237,0.08);border:1px solid #f3e8ff">
                  <!-- Cover Image -->
                  <div class="relative h-44 overflow-hidden flex-shrink-0">
                    <img [src]="business.coverImage || '/Recommandés/Salon-Abiba.jpg'"
                         [alt]="business.name"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                         loading="lazy">
                    <!-- Badge NOUVEAU sur cartes paires -->
                    @if (i % 2 === 0) {
                      <div class="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                           style="background:#dcfce7;color:#16a34a">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        NOUVEAU
                      </div>
                    }
                    <!-- Badge vérifié -->
                    @if (business.isVerified) {
                      <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <lucide-icon name="badge-check" [size]="13" [strokeWidth]="2" style="color:#7c3aed"></lucide-icon>
                        <span class="text-xs font-medium" style="color:#374151">Vérifié</span>
                      </div>
                    }
                  </div>

                  <!-- Content -->
                  <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-bold text-sm mb-2 truncate" style="color:#111827">{{ business.name }}</h3>

                    <div class="flex items-center gap-1.5 mb-1.5">
                      <app-star-rating [rating]="business.rating" size="0.8rem" />
                      <span class="text-xs" style="color:#6b7280">({{ business.reviewCount }})</span>
                    </div>

                    <div class="flex items-center gap-1 text-xs mb-3" style="color:#9ca3af">
                      <lucide-icon name="map-pin" [size]="12" [strokeWidth]="2" class="flex-shrink-0"></lucide-icon>
                      {{ business.city }}
                    </div>

                    <div class="flex items-center justify-between mt-auto">
                      <div>
                        <div class="text-xs" style="color:#9ca3af">À partir de</div>
                        <div class="text-sm font-bold" style="color:#7c3aed">{{ getMinPrice(business) | fcfa }}</div>
                      </div>
                      <button (click)="viewBusiness(business.slug)" (click)="$event.stopPropagation()"
                              class="text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
                              style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                        Réserver
                      </button>
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
                <div class="salon-card min-w-[270px] max-w-[270px] bg-white rounded-2xl overflow-hidden flex-shrink-0 flex flex-col"
                     style="box-shadow:0 4px 24px rgba(124,58,237,0.08);border:1px solid #f3e8ff">
                  <div class="relative h-44 overflow-hidden flex-shrink-0">
                    <img [src]="business.coverImage || '/Nouveaux sur SEFAIZO/Afro-et-nature.jpeg'"
                         [alt]="business.name"
                         class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                         loading="lazy">
                    <div class="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                         style="background:#dcfce7;color:#16a34a">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      NOUVEAU
                    </div>
                    @if (business.isVerified) {
                      <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <lucide-icon name="badge-check" [size]="13" [strokeWidth]="2" style="color:#7c3aed"></lucide-icon>
                        <span class="text-xs font-medium" style="color:#374151">Vérifié</span>
                      </div>
                    }
                  </div>
                  <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-bold text-sm mb-2 truncate" style="color:#111827">{{ business.name }}</h3>
                    <div class="flex items-center gap-1.5 mb-1.5">
                      <app-star-rating [rating]="business.rating" size="0.8rem" />
                      <span class="text-xs" style="color:#6b7280">({{ business.reviewCount }})</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs mb-3" style="color:#9ca3af">
                      <lucide-icon name="map-pin" [size]="12" [strokeWidth]="2" class="flex-shrink-0"></lucide-icon>
                      {{ business.city }}
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                      <div>
                        <div class="text-xs" style="color:#9ca3af">À partir de</div>
                        <div class="text-sm font-bold" style="color:#7c3aed">{{ getMinPrice(business) | fcfa }}</div>
                      </div>
                      <button (click)="viewBusiness(business.slug)"
                              class="text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
                              style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                        Réserver
                      </button>
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
    <section class="section" style="background:#fafafa">
      <div class="container-custom">

        <!-- En-tête + visuel maquette avis -->
        <div class="flex flex-col lg:flex-row items-center gap-12 mb-12">
          <!-- Texte gauche -->
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
                 style="background:#f5f0ff;border-color:#d4b8ff;color:#7c3aed">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Avis vérifiés
            </div>
            <h2 class="section-title mb-3">Avis de nos clients</h2>
            <p class="text-secondary-gray text-lg mb-6">
              Des milliers de clientes satisfaites à Abidjan.<br>
              Laissez votre avis après chaque visite !
            </p>
            <!-- Stats avis -->
            <div class="flex items-center gap-6">
              <div>
                <div class="text-3xl font-black" style="color:#7c3aed">4.8</div>
                <div class="flex gap-0.5 mt-1">
                  @for (s of [1,2,3,4,5]; track s) {
                    <svg class="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  }
                </div>
                <div class="text-xs mt-1" style="color:#9ca3af">Note moyenne</div>
              </div>
              <div class="w-px h-12" style="background:#e5e7eb"></div>
              <div>
                <div class="text-3xl font-black" style="color:#111827">400+</div>
                <div class="text-xs mt-1" style="color:#9ca3af">Avis certifiés</div>
              </div>
              <div class="w-px h-12" style="background:#e5e7eb"></div>
              <div>
                <div class="text-3xl font-black" style="color:#111827">98%</div>
                <div class="text-xs mt-1" style="color:#9ca3af">Clients satisfaits</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Titre carousel -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold" style="color:#111827">Ce qu'ils pensent de nos professionnels</h3>
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
                <div class="review-card min-w-[300px] max-w-[300px] bg-white rounded-2xl flex-shrink-0 flex flex-col p-5"
                     style="border:1px solid #f3e8ff;box-shadow:0 4px 20px rgba(124,58,237,0.07)">

                  <!-- Guillemet + étoiles -->
                  <div class="flex items-start justify-between mb-3">
                    <div class="text-5xl leading-none font-serif opacity-20" style="color:#7c3aed">"</div>
                    <app-star-rating [rating]="review.rating" size="0.85rem" />
                  </div>

                  <!-- Commentaire -->
                  <p class="text-sm leading-relaxed flex-1 mb-4 line-clamp-4" style="color:#374151">
                    {{ review.comment }}
                  </p>

                  <!-- Auteur -->
                  <div class="border-t pt-4 flex items-center gap-3" style="border-color:#f3e8ff">
                    <div class="relative flex-shrink-0">
                      <img [src]="review.clientAvatar || 'https://ui-avatars.com/api/?name=' + review.clientName + '&background=7c3aed&color=fff&rounded=true'"
                           [alt]="review.clientName"
                           class="w-10 h-10 rounded-full object-cover"
                           style="ring:2px;ring-color:rgba(124,58,237,0.15)"
                           loading="lazy">
                      <span class="absolute -bottom-0.5 -right-0.5 text-xs">🇨🇮</span>
                    </div>
                    <div class="min-w-0">
                      <div class="font-bold text-sm truncate" style="color:#111827">{{ review.clientName }}</div>
                      <div class="flex items-center gap-1 text-xs" style="color:#9ca3af">
                        <lucide-icon name="badge-check" [size]="11" [strokeWidth]="2" style="color:#7c3aed" class="flex-shrink-0"></lucide-icon>
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
    <section class="section" style="background:#fff">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="section-title mb-2">Communes Populaires</h2>
          <p class="section-subtitle mx-auto">Trouvez des professionnels près de chez vous à Abidjan</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          @for (commune of communes; track commune) {
            <button (click)="filterByCommune(commune)"
              class="group bg-white p-5 rounded-2xl text-center transition-all duration-200 hover:-translate-y-1 active:scale-95"
              style="border:1px solid #f3e8ff;box-shadow:0 2px 12px rgba(124,58,237,0.06)">
              <div class="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-200"
                   style="background:#f5f0ff;color:#7c3aed">
                <lucide-icon name="map-pin" [size]="20" [strokeWidth]="1.75"></lucide-icon>
              </div>
              <span class="text-sm font-semibold transition-colors" style="color:#374151">{{ commune }}</span>
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

    /* ── Hero nouveau (split layout blanc/violet) ── */
    .hero-section-new {
      isolation: isolate;
      background: #ffffff;
    }

    /* Hauteur du slideshow : responsive */
    .hero-slideshow {
      height: 240px;
    }
    @media (min-width: 480px) {
      .hero-slideshow { height: 290px; }
    }
    @media (min-width: 1024px) {
      .hero-slideshow { height: 460px; }
    }

    /* ── Catégorie pill hover ── */
    .cat-pill:hover {
      border-color: #7c3aed !important;
      box-shadow: 0 4px 16px rgba(124,58,237,0.12);
    }
    .cat-pill:hover div { background: #7c3aed !important; color: white !important; }
    .cat-pill:hover span { color: #7c3aed !important; }

    /* ── Input Service : supprime le focus ring bleu natif ── */
    .service-input:focus,
    .service-input:focus-visible {
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
    }

    /* ── Salon card hover ── */
    .salon-card {
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .salon-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(124,58,237,0.15) !important;
    }

    /* ─── Phone simulator ─────────────────────────────── */

    /* Slide-in de chaque nouvel écran depuis la droite */
    .phone-screen {
      animation: phone-slide-in 0.42s cubic-bezier(0.25,0.46,0.45,0.94) both;
    }
    @keyframes phone-slide-in {
      from { transform: translateX(55px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }

    /* Scroll automatique de la liste salons (écran 0) */
    .phone-scroll {
      animation: phone-scroll 3.5s ease-in-out both;
    }
    @keyframes phone-scroll {
      0%,20%  { transform: translateY(0); }
      55%,85% { transform: translateY(-64px); }
      100%    { transform: translateY(-64px); }
    }

    /* Tap indicator (ripple blanc) */
    .tap-indicator {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255,255,255,0.55);
      pointer-events: none;
      animation: tap-ripple 0.55s ease-out both;
      animation-iteration-count: 2;
    }
    @keyframes tap-ripple {
      0%   { transform: translate(-50%,50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%,50%) scale(2.2); opacity: 0; }
    }

    /* Bouton press au moment du tap */
    .btn-tap-anim {
      animation: btn-press 0.4s ease both;
    }
    @keyframes btn-press {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(0.94); }
    }

    /* Apparition progressive des champs */
    .field-appear {
      opacity: 0;
      animation: field-fade-in 0.35s ease forwards;
    }
    @keyframes field-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Effet typewriter sur le texte des champs */
    .field-type {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      max-width: 0;
      animation: type-expand 0.7s steps(12, end) forwards;
      animation-delay: var(--delay, 0s);
    }
    @keyframes type-expand {
      to { max-width: 130px; }
    }

    /* Curseur clignotant après typing */
    .cursor-blink {
      opacity: 0;
      animation: cursor-appear 0.1s ease forwards, cursor-blink 0.9s ease-in-out 0.7s infinite;
      animation-delay: var(--delay, 0s), var(--delay, 0s);
    }
    @keyframes cursor-appear { to { opacity: 1; } }
    @keyframes cursor-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

    /* Boîtes OTP */
    .otp-box {
      width: 30px;
      height: 36px;
      background: white;
      border: 2px solid #012e65;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #012e65;
    }

    /* Points PIN remplis */
    .pin-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #012e65;
      box-shadow: 0 2px 8px rgba(1,46,101,0.35);
    }

    /* Checkmark pop (écran 9) */
    .check-circle-anim {
      animation: check-circle-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;
    }
    @keyframes check-circle-pop {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    .check-draw-anim {
      stroke-dasharray: 40;
      stroke-dashoffset: 40;
      animation: check-draw 0.5s ease forwards 0.75s;
    }
    @keyframes check-draw {
      to { stroke-dashoffset: 0; }
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

  // Phone animation
  phoneScreen = signal(0);
  private phoneTimer: any;

  // Hero slideshow
  heroSlideIndex = signal(0);
  private heroSlideTimer: any;
  readonly heroImages = [
    '/Nouveaux sur SEFAIZO/Afro-et-nature.jpeg',
    '/Nouveaux sur SEFAIZO/Cocoon-Beauty-concept-Place.jpg',
    '/Nouveaux sur SEFAIZO/Guinot.jpeg',
    '/Nouveaux sur SEFAIZO/Institut-Moreno.jpeg',
    '/Nouveaux sur SEFAIZO/Les-instituts-My-Maz.jpeg',
    '/Nouveaux sur SEFAIZO/So-Spa-Sofitel.jpeg',
    '/Nouveaux sur SEFAIZO/ob_9ab44c_mrs-afro-salon-de-coiffure-nappy-abidj.jpg',
  ];

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
    this.startPhoneAnimation();
    this.startHeroSlideshow();
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
    if (this.phoneTimer) clearTimeout(this.phoneTimer);
    if (this.heroSlideTimer) clearInterval(this.heroSlideTimer);
  }

  private startHeroSlideshow(): void {
    this.heroSlideTimer = setInterval(() => {
      this.heroSlideIndex.update(i => (i + 1) % this.heroImages.length);
    }, 5000);
  }

  goToSlide(index: number): void {
    this.heroSlideIndex.set(index);
    clearInterval(this.heroSlideTimer);
    this.heroSlideTimer = setInterval(() => {
      this.heroSlideIndex.update(i => (i + 1) % this.heroImages.length);
    }, 5000);
  }

  private startPhoneAnimation(): void {
    // 23 screens: 10 client + 13 pro
    const durations = [
      3500, 3200, 2800, 3200, 2800, 2200, 2800, 3000, 3000, 4200, // client (0-9)
      2500, 2800, 3000, 2600, 4000, 3000, 3800, 2800, 3000, 2800, 2800, 3000, 3500 // pro (10-22)
    ];
    const advance = () => {
      this.phoneScreen.update(s => (s + 1) % 23);
      this.phoneTimer = setTimeout(advance, durations[this.phoneScreen()]);
    };
    this.phoneTimer = setTimeout(advance, durations[0]);
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

