import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, Review } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { LucideAngularModule } from 'lucide-angular';

type TabName = 'Infos' | 'Services' | 'Avis' | 'Photos';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [RouterLink, FcfaPipe, DateFormatPipe, LucideAngularModule],
  template: `
    @if (loading()) {
      <div class="flex min-h-screen items-center justify-center bg-white">
        <span class="text-sm font-bold text-[#66708d]">Chargement…</span>
      </div>
    } @else {
      @if (business(); as b) {
        <div class="min-h-screen bg-white text-[#11152f]">
          <main class="container-custom py-7 max-[760px]:py-5">
            <div class="grid min-w-0 grid-cols-[minmax(0,1fr)_408px] gap-x-8 gap-y-8 max-[1120px]:grid-cols-1">

              <!-- Galerie photos -->
              <section
                class="grid h-[288px] min-w-0 grid-cols-[minmax(0,1fr)_344px] gap-2 overflow-hidden rounded-lg max-[760px]:h-auto max-[760px]:grid-cols-1"
                aria-label="Photos du salon"
              >
                <div class="min-h-0 bg-[#f0edf8] max-[760px]:aspect-[16/10]">
                  <img
                    class="h-full w-full object-cover"
                    [src]="b.coverImage || b.avatar"
                    [alt]="b.name"
                  />
                </div>

                <div class="grid min-h-0 grid-cols-2 gap-2 max-[760px]:grid-cols-4 max-[620px]:grid-cols-2">
                  @for (img of getGalleryImages(b); track $index; let last = $last) {
                    <div class="relative min-h-0 bg-[#f0edf8] max-[760px]:aspect-[4/3]">
                      <img
                        class="h-full w-full object-cover"
                        [src]="img"
                        [alt]="b.name"
                        loading="lazy"
                      />
                      @if (last) {
                        <button
                          class="absolute right-2 bottom-3 left-2 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-3 text-center text-[13px] leading-tight font-extrabold text-[#11152f] shadow-[0_12px_26px_rgba(17,21,47,0.2)] max-[520px]:bottom-2 max-[520px]:gap-1 max-[520px]:px-2 max-[520px]:text-[12px]"
                          type="button"
                          (click)="activeTab.set('Photos')"
                        >
                          <lucide-icon name="camera" [size]="16" [strokeWidth]="2.3" aria-hidden="true"></lucide-icon>
                          <span class="max-[520px]:hidden">Voir toutes les photos ({{ b.reviewCount }})</span>
                          <span class="hidden max-[520px]:inline">{{ b.reviewCount }} photos</span>
                        </button>
                      }
                    </div>
                  }
                </div>
              </section>

              <!-- Colonne latérale sticky (overview + réservation) -->
              <aside class="row-span-2 min-w-0 max-[1120px]:row-span-1">
                <div class="sticky top-[96px] space-y-5 max-[1120px]:static">

                  <!-- Carte aperçu salon -->
                  <article class="rounded-lg border border-[#e7e9f4] bg-white p-6 shadow-[0_4px_18px_rgba(44,39,117,0.07)] max-[520px]:p-5">
                    <span class="inline-flex rounded-md bg-[#ede9fe] px-3 py-1.5 text-xs font-extrabold text-[#7c3aed]">
                      {{ b.categories[0] }}
                    </span>

                    <div class="mt-4 flex items-start justify-between gap-4">
                      <div class="min-w-0">
                        <h1 class="m-0 text-[32px] leading-tight font-black text-[#11152f] max-[520px]:text-[28px]">{{ b.name }}</h1>
                        <p class="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#66708d]">
                          <lucide-icon name="map-pin" [size]="16" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                          {{ b.address || b.city }}
                        </p>
                      </div>
                      <div class="inline-flex shrink-0 items-center gap-1 text-sm font-extrabold text-[#4b536e]">
                        <lucide-icon class="fill-[#ffb224] text-[#ffb224]" name="star" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                        {{ b.rating.toFixed(1) }}
                      </div>
                    </div>

                    <p class="mt-3 text-sm font-bold text-[#66708d]">{{ b.reviewCount }} avis clients vérifiés</p>

                    <div class="mt-5 grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">
                      <button
                        class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7e9f4] bg-white px-4 text-sm font-extrabold text-[#4b536e] transition-colors hover:bg-[#f7f5ff]"
                        type="button"
                      >
                        <lucide-icon name="heart" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                        Favoris
                      </button>
                      <button
                        class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7e9f4] bg-white px-4 text-sm font-extrabold text-[#4b536e] transition-colors hover:bg-[#f7f5ff]"
                        type="button"
                      >
                        <lucide-icon name="share-2" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                        Partager
                      </button>
                    </div>

                    <button
                      (click)="startBooking()"
                      class="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#7c3aed] px-6 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(124,58,237,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#6d28d9]"
                      type="button"
                    >Réserver</button>
                  </article>

                  <!-- Carte réservation -->
                  <article class="rounded-lg border border-[#e7e9f4] bg-white p-6 shadow-[0_4px_18px_rgba(44,39,117,0.07)] max-[520px]:p-5">
                    <div class="flex items-center justify-between gap-4">
                      <h2 class="m-0 text-xl font-black text-[#11152f]">Choisir une date</h2>
                      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]">
                        <lucide-icon name="calendar-days" [size]="19" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                      </span>
                    </div>

                    <!-- Calendrier -->
                    <div class="mt-5 rounded-lg border border-[#e7e9f4] bg-[#fbfbff] p-4">
                      <div class="mb-4 flex items-center justify-between">
                        <button
                          class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7e9f4] bg-white text-[#4b536e]"
                          type="button"
                          aria-label="Mois précédent"
                        >
                          <lucide-icon name="chevron-left" [size]="18" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                        </button>
                        <strong class="text-sm font-black text-[#11152f]">{{ monthLabel }}</strong>
                        <button
                          class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7e9f4] bg-white text-[#4b536e]"
                          type="button"
                          aria-label="Mois suivant"
                        >
                          <lucide-icon name="chevron-right" [size]="18" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                        </button>
                      </div>

                      <div class="grid grid-cols-7 gap-1 text-center">
                        @for (day of weekDays; track day) {
                          <span class="py-1 text-[11px] font-extrabold uppercase text-[#66708d]">{{ day }}</span>
                        }
                        @for (day of calendarDays(); track $index) {
                          <button
                            class="flex aspect-square items-center justify-center rounded-full text-sm font-extrabold transition-colors"
                            [class]="getDayClass(day)"
                            (click)="day.label ? selectDay(+day.label) : null"
                            type="button"
                          >{{ day.label }}</button>
                        }
                      </div>
                    </div>

                    <!-- Créneaux horaires -->
                    <div class="mt-5">
                      <h3 class="m-0 text-sm font-black text-[#11152f]">Créneaux disponibles</h3>
                      <div class="mt-3 grid grid-cols-3 gap-2 max-[380px]:grid-cols-2">
                        @for (slot of timeSlots; track slot) {
                          <button
                            class="inline-flex min-h-10 items-center justify-center rounded-full border px-3 text-sm font-extrabold transition-colors"
                            [class]="selectedTimeSlot() === slot
                              ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                              : 'border-[#e7e9f4] bg-white text-[#4b536e] hover:border-[#7c3aed]/40'"
                            (click)="selectedTimeSlot.set(slot)"
                            type="button"
                          >{{ slot }}</button>
                        }
                      </div>
                    </div>

                    <!-- Service sélectionné -->
                    @if (selectedService(); as svc) {
                      <div class="mt-5 rounded-lg bg-[#f7f8fc] p-4">
                        <p class="m-0 text-xs font-extrabold uppercase tracking-[0.08em] text-[#66708d]">Service sélectionné</p>
                        <div class="mt-2 flex items-start justify-between gap-4">
                          <div class="min-w-0">
                            <strong class="block text-sm font-black text-[#11152f]">{{ svc.name }}</strong>
                            <span class="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#66708d]">
                              <lucide-icon name="clock" [size]="15" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                              {{ formatDuration(svc.duration) }}
                            </span>
                          </div>
                          <strong class="shrink-0 text-sm font-black text-[#7c3aed]">{{ svc.price | fcfa }}</strong>
                        </div>
                      </div>
                    }

                    <button
                      (click)="startBooking()"
                      class="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#7c3aed] px-6 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(124,58,237,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#6d28d9]"
                      type="button"
                    >Confirmer la réservation</button>
                  </article>

                </div>
              </aside>

              <!-- Carte principale : onglets + contenu -->
              <section class="min-w-0 rounded-lg border border-[#e7e9f4] bg-white px-6 pt-2 pb-6 shadow-[0_4px_18px_rgba(44,39,117,0.07)] max-[520px]:px-4">

                <!-- Onglets de navigation -->
                <nav
                  class="-mx-6 flex min-w-0 gap-8 overflow-x-auto border-b border-[#e7e9f4] px-6 max-[520px]:-mx-4 max-[520px]:px-4"
                  aria-label="Navigation fiche salon"
                >
                  @for (tab of tabs; track tab.id) {
                    <button
                      [class]="getTabNavClass(tab.id)"
                      type="button"
                      (click)="activeTab.set(tab.id)"
                    >{{ tab.id === 'Avis' ? 'Avis (' + b.reviewCount + ')' : tab.id }}</button>
                  }
                </nav>

                <!-- =================== INFOS =================== -->
                @if (activeTab() === 'Infos') {
                  <div class="pt-6">

                    <!-- À propos -->
                    <h2 class="m-0 text-2xl font-black text-[#11152f] max-[520px]:text-[22px]">À propos</h2>
                    <p class="mt-3 max-w-[760px] text-[15px] leading-7 font-medium text-[#596078]">
                      {{ b.description || 'Salon professionnel spécialisé dans les services de beauté et bien-être à Abidjan.' }}
                    </p>

                    <div class="mt-5 grid grid-cols-2 gap-3 max-[620px]:grid-cols-1">
                      @for (feature of salonFeatures; track feature.id) {
                        <div class="flex min-h-12 items-center gap-3 rounded-lg bg-[#f7f8fc] px-4 text-sm font-extrabold text-[#4b536e]">
                          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#7c3aed]">
                            <lucide-icon [name]="feature.icon" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                          </span>
                          {{ feature.label }}
                        </div>
                      }
                    </div>

                    <!-- Horaires -->
                    <div class="mt-8 border-t border-[#e7e9f4] pt-6">
                      <h2 class="m-0 text-2xl font-black text-[#11152f] max-[520px]:text-[22px]">Horaires d'ouverture</h2>
                      <div class="mt-4 divide-y divide-[#e7e9f4]">
                        @for (hour of sortedWorkingHours(b); track hour.dayOfWeek) {
                          <div class="flex items-center justify-between gap-4 py-3">
                            <span class="text-sm font-extrabold text-[#11152f]">{{ getDayName(hour.dayOfWeek) }}</span>
                            @if (hour.isOpen && hour.slots && hour.slots.length > 0) {
                              <span class="text-sm font-bold text-[#596078]">
                                {{ hour.slots[0].startTime }} – {{ hour.slots[hour.slots.length - 1].endTime }}
                              </span>
                            } @else {
                              <span class="inline-flex items-center gap-1.5 text-sm font-bold text-[#c5c7d9]">
                                <lucide-icon name="x-circle" [size]="14" [strokeWidth]="2" aria-hidden="true"></lucide-icon>
                                Fermé
                              </span>
                            }
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Contact -->
                    <div class="mt-8 border-t border-[#e7e9f4] pt-6">
                      <h2 class="m-0 text-2xl font-black text-[#11152f] max-[520px]:text-[22px]">Contact & localisation</h2>
                      <ul class="mt-4 space-y-3">
                        @if (b.address || b.city) {
                          <li class="flex items-start gap-3">
                            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]">
                              <lucide-icon name="map-pin" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                            </span>
                            <div class="min-w-0 pt-1">
                              <span class="block text-[13px] font-extrabold uppercase tracking-[0.06em] text-[#66708d]">Adresse</span>
                              <span class="mt-0.5 block text-sm font-bold text-[#11152f]">{{ b.address || b.city }}</span>
                            </div>
                          </li>
                        }
                        @if (b.phone) {
                          <li class="flex items-start gap-3">
                            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]">
                              <lucide-icon name="phone" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                            </span>
                            <div class="min-w-0 pt-1">
                              <span class="block text-[13px] font-extrabold uppercase tracking-[0.06em] text-[#66708d]">Téléphone</span>
                              <a
                                [href]="'tel:' + b.phone"
                                class="mt-0.5 block text-sm font-bold text-[#7c3aed] hover:underline"
                              >{{ b.phone }}</a>
                            </div>
                          </li>
                        }
                        @if (b.email) {
                          <li class="flex items-start gap-3">
                            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]">
                              <lucide-icon name="mail" [size]="17" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                            </span>
                            <div class="min-w-0 pt-1">
                              <span class="block text-[13px] font-extrabold uppercase tracking-[0.06em] text-[#66708d]">Email</span>
                              <a
                                [href]="'mailto:' + b.email"
                                class="mt-0.5 block text-sm font-bold text-[#7c3aed] hover:underline"
                              >{{ b.email }}</a>
                            </div>
                          </li>
                        }
                      </ul>
                    </div>

                  </div>
                }

                <!-- =================== SERVICES =================== -->
                @if (activeTab() === 'Services') {
                  <div class="pt-6">
                    <h2 class="m-0 text-2xl font-black text-[#11152f] max-[520px]:text-[22px]">Services populaires</h2>

                    <div class="mt-5 divide-y divide-[#e7e9f4]">
                      @for (svc of b.services; track svc.id) {
                        <article class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 max-[620px]:grid-cols-[auto_minmax(0,1fr)]">
                          <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]">
                            <lucide-icon name="scissors" [size]="20" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                          </div>

                          <div class="min-w-0">
                            <h3 class="m-0 text-base font-black text-[#11152f]">{{ svc.name }}</h3>
                            <p class="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#66708d]">
                              <lucide-icon name="clock" [size]="15" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                              {{ formatDuration(svc.duration) }}
                            </p>
                          </div>

                          <div class="flex items-center gap-4 max-[620px]:col-span-2 max-[620px]:pl-[60px]">
                            <strong class="min-w-[96px] text-right text-base font-black text-[#11152f] max-[620px]:min-w-0 max-[620px]:text-left">
                              {{ svc.price | fcfa }}
                            </strong>
                            <button
                              class="inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm font-extrabold transition-colors"
                              [class]="selectedServiceId() === svc.id
                                ? 'bg-[#7c3aed] text-white'
                                : 'bg-[#ede9fe] text-[#7c3aed] hover:bg-[#ddd6fe]'"
                              (click)="selectedServiceId.set(svc.id)"
                              type="button"
                            >Choisir</button>
                          </div>
                        </article>
                      }
                    </div>
                  </div>
                }

                <!-- =================== AVIS =================== -->
                @if (activeTab() === 'Avis') {
                  <div class="pt-6">
                    <h2 class="m-0 text-2xl font-black text-[#11152f] max-[520px]:text-[22px]">Avis clients</h2>

                    <!-- Résumé de la note -->
                    <div class="mt-5 flex items-start gap-8 rounded-lg bg-[#f7f8fc] p-5 max-[520px]:flex-col max-[520px]:gap-4">
                      <div class="text-center">
                        <div class="text-[64px] font-black leading-none text-[#11152f]">{{ b.rating.toFixed(1) }}</div>
                        <div class="mt-2 flex items-center justify-center gap-0.5">
                          @for (star of [1,2,3,4,5]; track star) {
                            <lucide-icon
                              name="star"
                              [size]="18"
                              [strokeWidth]="2"
                              [class]="star <= b.rating ? 'fill-[#ffb224] text-[#ffb224]' : 'text-[#e7e9f4] fill-[#e7e9f4]'"
                              aria-hidden="true"
                            ></lucide-icon>
                          }
                        </div>
                        <p class="mt-2 text-xs font-bold text-[#66708d]">{{ b.reviewCount }} avis</p>
                      </div>

                      <div class="flex-1 min-w-0 space-y-2">
                        @for (bar of ratingBars; track bar.stars) {
                          <div class="flex items-center gap-3">
                            <span class="w-6 shrink-0 text-right text-xs font-extrabold text-[#66708d]">{{ bar.stars }}</span>
                            <lucide-icon name="star" [size]="13" [strokeWidth]="2" class="fill-[#ffb224] text-[#ffb224] shrink-0" aria-hidden="true"></lucide-icon>
                            <div class="h-2 flex-1 overflow-hidden rounded-full bg-[#e7e9f4]">
                              <div
                                class="h-full rounded-full bg-[#ffb224] transition-all"
                                [style.width.%]="bar.pct"
                              ></div>
                            </div>
                            <span class="w-8 shrink-0 text-xs font-bold text-[#66708d]">{{ bar.count }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Liste des avis -->
                    @if (reviews.length === 0) {
                      <div class="mt-8 flex flex-col items-center py-10 text-center">
                        <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f5ff]">
                          <lucide-icon name="message-circle" [size]="28" [strokeWidth]="1.5" class="text-[#c5c7d9]" aria-hidden="true"></lucide-icon>
                        </div>
                        <p class="text-sm font-bold text-[#66708d]">Aucun avis pour le moment.</p>
                      </div>
                    } @else {
                      <div class="mt-6 divide-y divide-[#e7e9f4]">
                        @for (review of reviews; track review.id) {
                          <article class="py-5">
                            <div class="flex items-start gap-3">
                              @if (review.clientAvatar) {
                                <img
                                  class="h-10 w-10 shrink-0 rounded-full object-cover"
                                  [src]="review.clientAvatar"
                                  [alt]="review.clientName"
                                />
                              } @else {
                                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-sm font-black text-[#7c3aed]">
                                  {{ review.clientName.charAt(0).toUpperCase() }}
                                </span>
                              }
                              <div class="min-w-0 flex-1">
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                  <strong class="text-sm font-black text-[#11152f]">{{ review.clientName }}</strong>
                                  <span class="text-xs font-bold text-[#9ca3bb]">{{ review.createdAt | dateFormat:'short' }}</span>
                                </div>
                                <div class="mt-1 flex items-center gap-0.5">
                                  @for (star of [1,2,3,4,5]; track star) {
                                    <lucide-icon
                                      name="star"
                                      [size]="13"
                                      [strokeWidth]="2"
                                      [class]="star <= review.rating ? 'fill-[#ffb224] text-[#ffb224]' : 'text-[#e7e9f4] fill-[#e7e9f4]'"
                                      aria-hidden="true"
                                    ></lucide-icon>
                                  }
                                </div>
                                @if (review.comment) {
                                  <p class="mt-2 text-[14px] leading-6 font-medium text-[#596078]">{{ review.comment }}</p>
                                }
                              </div>
                            </div>
                          </article>
                        }
                      </div>
                    }

                  </div>
                }

                <!-- =================== PHOTOS =================== -->
                @if (activeTab() === 'Photos') {
                  <div class="pt-6">
                    <h2 class="m-0 text-2xl font-black text-[#11152f] max-[520px]:text-[22px]">Photos</h2>

                    <!-- Photo principale -->
                    <div class="mt-5 overflow-hidden rounded-lg">
                      <img
                        class="h-52 w-full object-cover"
                        [src]="b.coverImage || b.avatar"
                        [alt]="b.name"
                      />
                    </div>

                    <!-- Grille secondaire -->
                    <div class="mt-3 grid grid-cols-3 gap-3 max-[520px]:grid-cols-2">
                      @for (img of getGalleryImages(b); track $index) {
                        <div class="overflow-hidden rounded-lg">
                          <img
                            class="aspect-square w-full object-cover"
                            [src]="img"
                            [alt]="b.name"
                            loading="lazy"
                          />
                        </div>
                      }
                      <!-- Placeholder -->
                      <div class="flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-[#e7e9f4] bg-[#f7f8fc]">
                        <lucide-icon name="camera" [size]="28" [strokeWidth]="1.5" class="text-[#c5c7d9]" aria-hidden="true"></lucide-icon>
                        <p class="px-3 text-center text-xs font-bold text-[#9ca3bb]">Plus de photos bientôt</p>
                      </div>
                    </div>
                  </div>
                }

              </section>

            </div>
          </main>
        </div>

      } @else {
        <div class="min-h-screen bg-white text-[#11152f]">
          <main class="container-custom flex min-h-[60vh] items-center justify-center py-12">
            <section class="max-w-[520px] rounded-lg border border-[#e7e9f4] bg-white p-8 text-center shadow-[0_4px_18px_rgba(44,39,117,0.07)]">
              <h1 class="m-0 text-2xl font-black text-[#11152f]">Salon introuvable</h1>
              <p class="mt-3 text-sm font-bold text-[#66708d]">Ce salon n'est pas disponible dans les données actuelles.</p>
              <a
                class="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#7c3aed] px-6 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(124,58,237,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#6d28d9]"
                routerLink="/recherche"
              >Retour à la recherche</a>
            </section>
          </main>
        </div>
      }
    }
  `,
  styles: [],
})
export class BusinessDetailComponent implements OnInit {
  loading = signal(false);
  business = signal<Business | null>(null);
  reviews: Review[] = [];

  activeTab = signal<TabName>('Services');

  selectedServiceId = signal<string | null>(null);
  selectedTimeSlot = signal<string>('10:00');
  selectedDay = signal<number>((() => {
    const d = new Date();
    const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    return Math.min(d.getDate() + 2, daysInMonth);
  })());

  readonly tabs: { id: TabName }[] = [
    { id: 'Infos' },
    { id: 'Services' },
    { id: 'Avis' },
    { id: 'Photos' },
  ];

  readonly weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  readonly timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  readonly salonFeatures = [
    { id: '1', label: 'Experts certifiés', icon: 'users' },
    { id: '2', label: 'Produits de qualité', icon: 'shopping-bag' },
    { id: '3', label: 'Ambiance accueillante', icon: 'smile' },
    { id: '4', label: 'Hygiène irréprochable', icon: 'shield-check' },
  ];

  selectedService = computed(() =>
    this.business()?.services.find(s => s.id === this.selectedServiceId())
  );

  calendarDays = computed(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: { label: string; muted: boolean; selected: boolean }[] = [];
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < offset; i++) {
      days.push({ label: '', muted: true, selected: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        label: String(d),
        muted: d < today.getDate(),
        selected: d === this.selectedDay(),
      });
    }
    return days;
  });

  get monthLabel(): string {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    const d = new Date();
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  get ratingBars(): { stars: number; count: number; pct: number }[] {
    return [5, 4, 3, 2, 1].map(stars => {
      const count = this.reviews.filter(r => Math.round(r.rating) === stars).length;
      const pct = this.reviews.length > 0 ? Math.round((count / this.reviews.length) * 100) : 0;
      return { stars, count, pct };
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mockData: MockDataService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const business = this.mockData.getBusinessBySlug(slug);
      if (business) {
        this.business.set(business);
        this.reviews = this.mockData.getReviewsByBusiness(business.id);
        if (business.services?.length > 0) {
          this.selectedServiceId.set(business.services[0].id);
        }
      }
    }
  }

  getTabNavClass(tab: string): string {
    const base = 'relative min-h-14 shrink-0 text-sm font-extrabold';
    if (this.activeTab() === tab) {
      return `${base} text-[#7c3aed] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:bg-[#7c3aed] after:content-['']`;
    }
    return `${base} text-[#66708d]`;
  }

  getDayName(dayOfWeek: number): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[dayOfWeek] ?? '';
  }

  sortedWorkingHours(b: Business) {
    const order = [1, 2, 3, 4, 5, 6, 0];
    return [...b.workingHours].sort((a, z) => order.indexOf(a.dayOfWeek) - order.indexOf(z.dayOfWeek));
  }

  getDayClass(day: { label: string; muted: boolean; selected: boolean }): string {
    if (!day.label) return 'pointer-events-none opacity-0';
    if (day.selected) return 'bg-[#7c3aed] text-white';
    if (day.muted) return 'cursor-not-allowed text-[#c5c7d9]';
    return 'text-[#11152f] hover:bg-[#ede9fe]';
  }

  selectDay(d: number): void {
    if (d >= new Date().getDate()) {
      this.selectedDay.set(d);
    }
  }

  getGalleryImages(b: Business): string[] {
    const a = b.coverImage || b.avatar || '';
    const c = b.avatar || b.coverImage || '';
    return [a, c, a, c];
  }

  formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, '0')}`;
  }

  startBooking(): void {
    const businessId = this.business()?.id;
    const serviceId = this.selectedServiceId() || this.business()?.services[0]?.id;
    if (businessId && serviceId) {
      this.router.navigate(['/booking'], {
        queryParams: { business: businessId, service: serviceId },
      });
    }
  }
}
