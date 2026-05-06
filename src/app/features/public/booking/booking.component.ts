import { Component, OnInit, signal, computed } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, Service, Booking, HomeServiceCommune } from '../../../core/models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-booking',
  standalone: true,
  animations: [
    trigger('stepSlide', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(32px)' }),
        animate('240ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-32px)' }),
        animate('240ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    FcfaPipe,
    DateFormatPipe,
    BadgeComponent,
    LucideAngularModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container-custom" [class.max-w-4xl]="currentStep() === 6" [class.max-w-6xl]="currentStep() < 6">

        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-between max-w-2xl mx-auto">
            @for (step of steps; track step.id; let i = $index) {
              <div class="flex items-center">
                <div class="flex flex-col items-center gap-1.5">
                  <div [class]="getStepClass(step.id)"
                       class="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300">
                    @if (step.id < currentStep()) {
                      <lucide-icon name="check" [size]="16" [strokeWidth]="2.5"></lucide-icon>
                    } @else {
                      {{ step.id }}
                    }
                  </div>
                  <span class="text-xs font-medium hidden md:block transition-colors duration-300"
                        [class.text-primary]="step.id === currentStep()"
                        [class.text-green-600]="step.id < currentStep()"
                        [class.text-secondary-gray]="step.id > currentStep()">
                    {{ step.label }}
                  </span>
                </div>
                @if (i < steps.length - 1) {
                  <div [class]="getProgressLineClass(i)"
                       class="w-10 md:w-16 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500"></div>
                }
              </div>
            }
          </div>
        </div>

        <!-- ─── Étape 6 : Confirmation ─── -->
        @if (currentStep() === 6) {
          <div class="mx-auto w-full max-w-[590px] overflow-hidden px-4 pt-8 pb-12 text-center max-[520px]:px-0">

            <!-- Cercle vert avec checkmark + éléments décoratifs -->
            <div class="relative mx-auto flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[#10b45e] text-white shadow-[0_18px_38px_rgba(16,180,94,0.22)] max-[520px]:h-24 max-[520px]:w-24">
              <lucide-icon name="check" [size]="58" [strokeWidth]="4" aria-hidden="true"></lucide-icon>
              <span class="absolute -top-1 -left-16 h-2 w-2 rotate-45 rounded-[2px] border border-[#9ee3bf]" aria-hidden="true"></span>
              <span class="absolute top-6 -right-20 h-2 w-2 rounded-full bg-[#bcebd0]" aria-hidden="true"></span>
              <span class="absolute -right-12 bottom-1 h-2 w-2 rotate-45 rounded-[2px] border border-[#9ee3bf]" aria-hidden="true"></span>
              <span class="absolute bottom-7 -left-24 h-2 w-2 rotate-45 rounded-[2px] border border-[#9ee3bf]" aria-hidden="true"></span>
            </div>

            <!-- Titre et sous-titre -->
            <h1 class="mx-auto mt-7 mb-0 text-[32px] leading-tight font-black text-[#12a85a] max-[520px]:text-[24px]">Réservation confirmée !</h1>
            <p class="mx-auto mt-3 max-w-[480px] text-base font-bold text-[#626985] max-[520px]:text-sm">
              Votre rendez-vous a bien été enregistré. Un récapitulatif vous sera envoyé par SMS.
            </p>

            <!-- Numéro de réservation cliquable pour copier -->
            <button
              class="mx-auto mt-6 inline-flex min-h-14 items-center justify-center gap-5 rounded-lg border border-[#bfe9d2] bg-[#f3fff8] px-10 text-xl font-black text-[#12a85a] transition-opacity hover:opacity-80 max-[520px]:w-full max-[520px]:max-w-[330px] max-[520px]:text-lg"
              type="button"
              (click)="copyReference()"
            >
              {{ bookingNumber() }}
              <lucide-icon name="copy" [size]="22" [strokeWidth]="2.4" aria-hidden="true"></lucide-icon>
            </button>

            <!-- Carte récapitulatif -->
            <article class="mt-5 rounded-lg border border-gray-100 bg-white px-6 py-1 text-left shadow-sm max-[520px]:mx-auto max-[520px]:w-full max-[520px]:max-w-[340px] max-[520px]:px-4">

              <!-- Salon -->
              <div class="grid min-h-[58px] grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-gray-100 py-2 max-[520px]:grid-cols-[32px_1fr]">
                <span class="flex h-9 w-9 items-center justify-center text-primary flex-shrink-0">
                  <lucide-icon name="store" [size]="22" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                </span>
                <span class="text-sm font-bold text-[#626985]">Salon</span>
                <div class="min-w-0 text-right max-[520px]:col-span-2 max-[520px]:pl-11 max-[520px]:text-left">
                  <strong class="block text-base font-extrabold text-[#11152f]">{{ business()?.name }}</strong>
                  <span class="mt-0.5 block text-sm font-bold text-secondary-gray">{{ business()?.city }}</span>
                </div>
              </div>

              <!-- Service(s) -->
              <div class="border-b border-gray-100 py-2">
                <div class="grid min-h-[42px] grid-cols-[36px_1fr_auto] items-start gap-3 max-[520px]:grid-cols-[32px_1fr]">
                  <span class="flex h-9 w-9 items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <lucide-icon name="scissors" [size]="22" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                  </span>
                  <span class="text-sm font-bold text-[#626985] pt-1.5">Service{{ selectedServices().length > 1 ? 's' : '' }}</span>
                  <div class="min-w-0 text-right max-[520px]:col-span-2 max-[520px]:pl-11 max-[520px]:text-left">
                    @for (s of selectedServices(); track s.id) {
                      <strong class="block text-base font-extrabold text-[#11152f]">{{ s.name }}</strong>
                      <span class="block text-xs font-bold text-secondary-gray mb-1">{{ s.duration }} min · {{ s.price | fcfa }}</span>
                    }
                    @if (selectedServices().length > 1) {
                      <span class="mt-1 block text-sm font-bold text-[#626985]">Durée totale : {{ totalDuration() }} min</span>
                    }
                  </div>
                </div>
              </div>

              <!-- Date & heure -->
              <div class="grid min-h-[58px] grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-gray-100 py-2 max-[520px]:grid-cols-[32px_1fr]">
                <span class="flex h-9 w-9 items-center justify-center text-primary flex-shrink-0">
                  <lucide-icon name="calendar-days" [size]="22" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                </span>
                <span class="text-sm font-bold text-[#626985]">Date & heure</span>
                <div class="min-w-0 text-right max-[520px]:col-span-2 max-[520px]:pl-11 max-[520px]:text-left">
                  <strong class="block text-base font-extrabold text-[#11152f]">{{ selectedDate() | dateFormat: 'long' }}</strong>
                  <span class="mt-0.5 block text-sm font-bold text-secondary-gray">{{ selectedTime() }}</span>
                </div>
              </div>

              <!-- Lieu -->
              <div class="grid min-h-[58px] grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-gray-100 py-2 max-[520px]:grid-cols-[32px_1fr]">
                <span class="flex h-9 w-9 items-center justify-center text-primary flex-shrink-0">
                  <lucide-icon [name]="bookingType() === 'SALON' ? 'store' : 'home'" [size]="22" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                </span>
                <span class="text-sm font-bold text-[#626985]">Lieu</span>
                <div class="min-w-0 text-right max-[520px]:col-span-2 max-[520px]:pl-11 max-[520px]:text-left">
                  <strong class="block text-base font-extrabold text-[#11152f]">{{ bookingType() === 'SALON' ? 'Au salon' : 'À domicile' }}</strong>
                  @if (bookingType() === 'HOME' && selectedCommune()) {
                    <span class="mt-0.5 block text-sm font-bold text-secondary-gray">{{ selectedCommune() }}</span>
                  }
                </div>
              </div>

              <!-- Total payé -->
              <div class="grid min-h-[58px] grid-cols-[36px_1fr_auto] items-center gap-3 py-2 max-[520px]:grid-cols-[32px_1fr]">
                <span class="flex h-9 w-9 items-center justify-center text-primary flex-shrink-0">
                  <lucide-icon name="banknote" [size]="22" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
                </span>
                <span class="text-sm font-bold text-[#626985]">Total payé</span>
                <div class="min-w-0 text-right max-[520px]:col-span-2 max-[520px]:pl-11 max-[520px]:text-left">
                  <strong class="block text-2xl font-black text-[#7c3aed]">{{ totalPrice() | fcfa }}</strong>
                </div>
              </div>

            </article>

            <!-- Boutons d'action -->
            <div class="mt-7 grid grid-cols-2 gap-5 max-[640px]:grid-cols-1 max-[520px]:mx-auto max-[520px]:w-full max-[520px]:max-w-[340px]">
              <button
                (click)="goToBookings()"
                class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#7c3aed] px-6 text-base font-extrabold text-white shadow-[0_14px_30px_rgba(124,58,237,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#6d28d9]"
              >
                Mes réservations
                <lucide-icon name="arrow-right" [size]="20" [strokeWidth]="2.4" aria-hidden="true"></lucide-icon>
              </button>
              <button
                (click)="goHome()"
                class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#7c3aed] bg-white px-6 text-base font-extrabold text-[#7c3aed] transition-transform hover:-translate-y-0.5"
              >
                Retour à l'accueil
                <lucide-icon name="home" [size]="19" [strokeWidth]="2.3" aria-hidden="true"></lucide-icon>
              </button>
            </div>

            <!-- Label sécurité -->
            <p class="mt-8 inline-flex items-center justify-center gap-2.5 text-sm font-bold text-[#626985]">
              <lucide-icon class="text-[#69718b]" name="shield-check" [size]="20" [strokeWidth]="2.2" aria-hidden="true"></lucide-icon>
              Réservation sécurisée et confirmée
            </p>

          </div>
        }

        <!-- ─── Étapes 1–5 : layout deux colonnes ─── -->
        @if (currentStep() < 6) {
          <div class="flex flex-col lg:flex-row gap-6 items-start">

            <!-- Colonne principale -->
            <div class="flex-1 min-w-0">
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                <div [@stepSlide]="currentStep()">

                <!-- Étape 1 : Service -->
                @if (currentStep() === 1) {
                  <h2 class="text-xl font-bold text-secondary mb-1">Sélectionnez vos services</h2>
                  <p class="text-sm text-secondary-gray mb-5">Vous pouvez sélectionner plusieurs services</p>
                  <div class="space-y-3">
                    @for (service of business()?.services; track service.id) {
                      <div (click)="toggleService(service)"
                           [class]="getServiceClass(service.id)"
                           class="flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 hover:shadow-sm active:scale-[0.99]">
                        <div class="flex items-start gap-3 flex-1 min-w-0">
                          <div class="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <lucide-icon name="scissors" [size]="16" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                          </div>
                          <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-secondary">{{ service.name }}</h3>
                            <p class="text-sm text-secondary-gray mt-0.5 line-clamp-1">{{ service.description }}</p>
                            <div class="flex items-center gap-3 mt-1.5 text-xs text-secondary-gray">
                              <span class="flex items-center gap-1">
                                <lucide-icon name="clock" [size]="11" [strokeWidth]="2"></lucide-icon>
                                {{ service.duration }} min
                              </span>
                              <span>·</span>
                              <span>{{ service.categoryName }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                          <div [class]="isServiceSelected(service.id)
                            ? 'w-6 h-6 rounded-full bg-primary flex items-center justify-center'
                            : 'w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center'">
                            @if (isServiceSelected(service.id)) {
                              <lucide-icon name="check" [size]="12" [strokeWidth]="3" class="text-white"></lucide-icon>
                            } @else {
                              <lucide-icon name="plus" [size]="12" [strokeWidth]="2.5" class="text-gray-400"></lucide-icon>
                            }
                          </div>
                          <span class="text-base font-bold text-primary">{{ service.price | fcfa }}</span>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Barre de total en cours -->
                  @if (selectedServiceIds().length > 0) {
                    <div class="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/15 flex items-center justify-between">
                      <div class="text-sm text-secondary-gray">
                        <span class="font-bold text-secondary">{{ selectedServiceIds().length }}</span>
                        service{{ selectedServiceIds().length > 1 ? 's' : '' }} sélectionné{{ selectedServiceIds().length > 1 ? 's' : '' }}
                        <span class="mx-1">·</span>
                        <span>{{ totalDuration() }} min</span>
                      </div>
                      <div class="text-base font-bold text-primary">{{ servicesSubtotal() | fcfa }}</div>
                    </div>
                  }
                }

                <!-- Étape 2 : Date & heure -->
                @if (currentStep() === 2) {
                  <h2 class="text-xl font-bold text-secondary mb-5">Choisissez la date et l'heure</h2>
                  <div class="mb-6">
                    <label class="block text-xs font-semibold text-secondary-gray uppercase tracking-wide mb-3">Date</label>
                    <div class="grid grid-cols-4 md:grid-cols-7 gap-2">
                      @for (day of next7Days; track day.date) {
                        <button (click)="selectDate(day.date)"
                                [class]="getDateClass(day.date)"
                                class="p-3 rounded-xl border-2 text-center transition-all duration-150 hover:shadow-sm active:scale-95">
                          <div class="text-xs text-secondary-gray uppercase font-medium">{{ day.dayName }}</div>
                          <div class="text-lg font-bold mt-0.5">{{ day.dayNumber }}</div>
                        </button>
                      }
                    </div>
                  </div>
                  @if (selectedDate()) {
                    <div>
                      <label class="block text-xs font-semibold text-secondary-gray uppercase tracking-wide mb-3">Créneaux disponibles</label>
                      <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
                        @for (slot of availableSlots; track slot.startTime) {
                          <button (click)="selectTime(slot.startTime)"
                                  [class]="getTimeClass(slot.startTime)"
                                  [disabled]="!slot.isAvailable"
                                  class="py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95">
                            {{ slot.startTime }}
                          </button>
                        }
                      </div>
                    </div>
                  }
                }

                <!-- Étape 3 : Lieu -->
                @if (currentStep() === 3) {
                  <div class="flex items-center gap-2 mb-5">
                    <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <lucide-icon name="map-pin" [size]="18" [strokeWidth]="1.75"></lucide-icon>
                    </span>
                    <h2 class="text-xl font-bold text-secondary m-0">Type de prestation</h2>
                  </div>
                  <div class="grid md:grid-cols-2 gap-4 mb-6">
                    <button (click)="selectBookingType('SALON')"
                            [class]="getTypeClass('SALON')"
                            class="p-5 rounded-xl border-2 text-left transition-all duration-150 hover:shadow-sm active:scale-[0.99]">
                      <div class="flex items-center gap-3 mb-2">
                        <div class="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
                          <lucide-icon name="store" [size]="22" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                        </div>
                        <span class="text-base font-semibold">Au salon</span>
                      </div>
                      <p class="text-secondary-gray text-sm">Rendez-vous directement dans l'établissement</p>
                    </button>
                    <button (click)="selectBookingType('HOME')"
                            [class]="getTypeClass('HOME')"
                            class="p-5 rounded-xl border-2 text-left transition-all duration-150 hover:shadow-sm active:scale-[0.99]">
                      <div class="flex items-center gap-3 mb-2">
                        <div class="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
                          <lucide-icon name="home" [size]="22" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                        </div>
                        <span class="text-base font-semibold">À domicile</span>
                      </div>
                      <p class="text-secondary-gray text-sm">Le professionnel se déplace chez vous</p>
                    </button>
                  </div>
                  @if (bookingType() === 'HOME') {
                    <div class="bg-primary/5 rounded-xl p-5 border border-primary/10">
                      <h3 class="font-semibold text-secondary mb-4 text-sm">Frais de déplacement par commune</h3>
                      <div class="space-y-1 mb-4">
                        @for (commune of homeServiceCommunes; track commune.commune) {
                          <div class="flex justify-between items-center py-2 border-b border-primary/10 last:border-0 text-sm">
                            <span class="text-secondary">{{ commune.commune }}</span>
                            <span class="font-semibold text-primary">{{ commune.fee | fcfa }}</span>
                          </div>
                        }
                      </div>
                      <label class="block text-xs font-semibold text-secondary-gray uppercase tracking-wide mb-2">Votre commune</label>
                      <select (change)="onCommuneChange($event)"
                              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                        <option value="">Sélectionner une commune</option>
                        @for (commune of homeServiceCommunes; track commune.commune) {
                          <option [value]="commune.commune">{{ commune.commune }} — {{ commune.fee | fcfa }}</option>
                        }
                      </select>
                    </div>
                  }
                }

                <!-- Étape 4 : Récapitulatif détaillé -->
                @if (currentStep() === 4) {
                  <h2 class="text-xl font-bold text-secondary mb-5">Récapitulatif</h2>
                  <div class="space-y-3">
                    <!-- Services sélectionnés -->
                    <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <lucide-icon name="scissors" [size]="18" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                        </div>
                        <div>
                          <div class="text-xs text-secondary-gray uppercase tracking-wide font-semibold">
                            {{ selectedServices().length }} service{{ selectedServices().length > 1 ? 's' : '' }}
                          </div>
                          <div class="text-xs text-secondary-gray">{{ totalDuration() }} min total</div>
                        </div>
                      </div>
                      <div class="space-y-2">
                        @for (s of selectedServices(); track s.id) {
                          <div class="flex justify-between items-center text-sm">
                            <span class="text-secondary">{{ s.name }}</span>
                            <span class="font-semibold text-primary">{{ s.price | fcfa }}</span>
                          </div>
                        }
                        @if (selectedServices().length > 1) {
                          <div class="border-t border-gray-200 pt-2 flex justify-between items-center text-sm">
                            <span class="text-secondary-gray font-medium">Sous-total services</span>
                            <span class="font-bold text-secondary">{{ servicesSubtotal() | fcfa }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="calendar-days" [size]="18" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                      </div>
                      <div class="flex-1">
                        <div class="text-xs text-secondary-gray uppercase tracking-wide font-semibold mb-0.5">Date & heure</div>
                        <div class="font-semibold text-secondary">{{ selectedDate() | dateFormat: 'long' }}</div>
                        <div class="text-sm text-secondary-gray">{{ selectedTime() }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <lucide-icon [name]="bookingType() === 'SALON' ? 'store' : 'home'" [size]="18" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                      </div>
                      <div class="flex-1">
                        <div class="text-xs text-secondary-gray uppercase tracking-wide font-semibold mb-0.5">Lieu</div>
                        <div class="font-semibold text-secondary">{{ bookingType() === 'SALON' ? 'Au salon' : 'À domicile' }}</div>
                        @if (bookingType() === 'HOME' && selectedCommune()) {
                          <div class="text-sm text-secondary-gray">{{ selectedCommune() }}</div>
                        }
                      </div>
                      @if (homeServiceFee() > 0) {
                        <div class="font-medium text-secondary-gray">+{{ homeServiceFee() | fcfa }}</div>
                      }
                    </div>
                    <div class="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <span class="font-semibold text-secondary">Total à payer</span>
                      <span class="text-2xl font-bold text-primary">{{ totalPrice() | fcfa }}</span>
                    </div>
                  </div>
                }

                <!-- Étape 5 : Paiement -->
                @if (currentStep() === 5) {
                  <h2 class="text-xl font-bold text-secondary mb-5">Mode de paiement</h2>
                  <div class="space-y-3 mb-5">
                    <button (click)="selectPaymentMethod('MOBILE_MONEY')"
                            [class]="getPaymentClass('MOBILE_MONEY')"
                            class="w-full p-4 rounded-xl border-2 text-left transition-all duration-150 hover:shadow-sm active:scale-[0.99]">
                      <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                          <lucide-icon name="smartphone" [size]="22" [strokeWidth]="1.75" class="text-orange-500"></lucide-icon>
                        </div>
                        <div>
                          <div class="font-semibold text-secondary">Mobile Money</div>
                          <div class="text-sm text-secondary-gray">Orange Money · MTN Money · Wave</div>
                        </div>
                      </div>
                    </button>
                    <button (click)="selectPaymentMethod('CASH')"
                            [class]="getPaymentClass('CASH')"
                            class="w-full p-4 rounded-xl border-2 text-left transition-all duration-150 hover:shadow-sm active:scale-[0.99]">
                      <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <lucide-icon name="banknote" [size]="22" [strokeWidth]="1.75" class="text-emerald-600"></lucide-icon>
                        </div>
                        <div>
                          <div class="font-semibold text-secondary">Espèces</div>
                          <div class="text-sm text-secondary-gray">Paiement en espèces sur place</div>
                        </div>
                      </div>
                    </button>
                  </div>
                }

                </div><!-- /@stepSlide -->
              </div><!-- /bg-white -->

              <!-- Boutons navigation -->
              <div class="flex justify-between mt-4">
                <button (click)="previousStep()"
                        [disabled]="currentStep() === 1"
                        class="flex items-center gap-2 px-5 py-3 text-secondary font-medium hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
                  <lucide-icon name="arrow-left" [size]="16" [strokeWidth]="2"></lucide-icon>
                  Retour
                </button>
                <button (click)="nextStep()"
                        [disabled]="!canProceed()"
                        class="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ currentStep() === 5 ? 'Confirmer et payer' : 'Continuer' }}
                  <lucide-icon [name]="currentStep() === 5 ? 'check' : 'arrow-right'" [size]="16" [strokeWidth]="2.5"></lucide-icon>
                </button>
              </div>
            </div><!-- /col principale -->

            <!-- ─── Récapitulatif sticky ─── -->
            <div class="lg:w-72 flex-shrink-0">
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
                <h3 class="text-xs font-bold text-secondary-gray uppercase tracking-widest mb-4">Récapitulatif</h3>

                <!-- Business -->
                @if (business()) {
                  <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <lucide-icon name="store" [size]="18" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                    </div>
                    <div class="min-w-0">
                      <div class="font-semibold text-secondary text-sm truncate">{{ business()?.name }}</div>
                      <div class="text-xs text-secondary-gray">{{ business()?.city }}</div>
                    </div>
                  </div>
                }

                <!-- Lignes de détail -->
                <div class="space-y-3 mb-4">
                  <!-- Services -->
                  <div class="flex items-start gap-3">
                    <lucide-icon name="scissors" [size]="14" [strokeWidth]="2" class="text-secondary-gray mt-0.5 flex-shrink-0"></lucide-icon>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs text-secondary-gray mb-1">Service{{ selectedServices().length > 1 ? 's' : '' }}</div>
                      @if (selectedServices().length === 0) {
                        <div class="text-xs text-gray-300 italic">Non sélectionné</div>
                      }
                      @for (s of selectedServices(); track s.id) {
                        <div class="flex justify-between items-baseline gap-1">
                          <span class="text-sm font-medium text-secondary truncate">{{ s.name }}</span>
                          <span class="text-xs font-bold text-primary flex-shrink-0">{{ s.price | fcfa }}</span>
                        </div>
                      }
                      @if (selectedServices().length > 0) {
                        <div class="text-xs text-secondary-gray mt-0.5">{{ totalDuration() }} min total</div>
                      }
                    </div>
                  </div>

                  <!-- Date -->
                  <div class="flex items-start gap-3">
                    <lucide-icon name="calendar-days" [size]="14" [strokeWidth]="2" class="text-secondary-gray mt-0.5 flex-shrink-0"></lucide-icon>
                    <div class="flex-1">
                      <div class="text-xs text-secondary-gray">Date & heure</div>
                      @if (selectedDate() && selectedTime()) {
                        <div class="text-sm font-semibold text-secondary">{{ selectedDate() | dateFormat: 'short' }}</div>
                        <div class="text-xs text-secondary-gray">{{ selectedTime() }}</div>
                      } @else {
                        <div class="text-xs text-gray-300 italic">Non sélectionné</div>
                      }
                    </div>
                  </div>

                  <!-- Lieu -->
                  <div class="flex items-start gap-3">
                    <lucide-icon name="map-pin" [size]="14" [strokeWidth]="2" class="text-secondary-gray mt-0.5 flex-shrink-0"></lucide-icon>
                    <div class="flex-1">
                      <div class="text-xs text-secondary-gray">Lieu</div>
                      <div class="text-sm font-semibold text-secondary">
                        {{ bookingType() === 'SALON' ? 'Au salon' : 'À domicile' }}
                      </div>
                      @if (bookingType() === 'HOME' && selectedCommune()) {
                        <div class="text-xs text-secondary-gray">{{ selectedCommune() }}</div>
                      }
                    </div>
                    @if (homeServiceFee() > 0) {
                      <div class="text-xs font-medium text-secondary-gray flex-shrink-0">+{{ homeServiceFee() | fcfa }}</div>
                    }
                  </div>
                </div>

                <!-- Total -->
                <div class="border-t border-gray-100 pt-4 mb-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-secondary-gray">Total</span>
                    <span class="text-xl font-bold text-primary">{{ totalPrice() | fcfa }}</span>
                  </div>
                  @if (homeServiceFee() > 0) {
                    <div class="flex justify-between items-center mt-1">
                      <span class="text-xs text-secondary-gray">dont déplacement</span>
                      <span class="text-xs text-secondary-gray">{{ homeServiceFee() | fcfa }}</span>
                    </div>
                  }
                </div>

                <!-- Barre de progression -->
                <div class="border-t border-gray-100 pt-4">
                  <div class="flex justify-between text-xs text-secondary-gray mb-1.5">
                    <span>Étape {{ currentStep() }} sur 5</span>
                    <span>{{ progressPct() }}%</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full transition-all duration-500"
                         [style.width]="progressPct() + '%'"></div>
                  </div>
                </div>
              </div>
            </div><!-- /sticky recap -->

          </div><!-- /deux colonnes -->
        }

      </div>
    </div>
  `,
  styles: []
})
export class BookingComponent implements OnInit {
  currentStep = signal(1);
  steps = [
    { id: 1, label: 'Service' },
    { id: 2, label: 'Date & Heure' },
    { id: 3, label: 'Lieu' },
    { id: 4, label: 'Récapitulatif' },
    { id: 5, label: 'Paiement' },
    { id: 6, label: 'Confirmation' }
  ];

  businessId = signal<string | null>(null);
  selectedServiceIds = signal<string[]>([]);
  selectedDate = signal<string | null>(null);
  selectedTime = signal<string | null>(null);
  bookingType = signal<'SALON' | 'HOME'>('SALON');
  selectedCommune = signal('');
  paymentMethod = signal<'MOBILE_MONEY' | 'CASH'>('CASH');
  bookingNumber = signal('');

  business = signal<Business | null>(null);
  availableSlots: any[] = [];
  homeServiceCommunes: HomeServiceCommune[] = [];

  next7Days: any[] = [];

  selectedServices = computed(() => {
    const ids = this.selectedServiceIds();
    const services = this.business()?.services || [];
    return services.filter(s => ids.includes(s.id));
  });

  servicesSubtotal = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.price, 0)
  );

  totalDuration = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.duration, 0)
  );

  homeServiceFee = computed(() => {
    if (this.bookingType() !== 'HOME' || !this.selectedCommune()) return 0;
    const commune = this.homeServiceCommunes.find(c => c.commune === this.selectedCommune());
    return commune?.fee || 0;
  });

  totalPrice = computed(() => this.servicesSubtotal() + this.homeServiceFee());

  progressPct = computed(() => Math.round((Math.min(this.currentStep(), 5) / 5) * 100));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['business']) {
        this.businessId.set(params['business']);
        const business = this.mockData.getBusinesses().find(b => b.id === params['business']);
        this.business.set(business || null);
        this.homeServiceCommunes = business?.homeServiceCommunes || [];
      }
      if (params['service']) {
        this.selectedServiceIds.set([params['service']]);
      }
    });

    const today = new Date();
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      this.next7Days.push({
        date: date.toISOString().split('T')[0],
        dayName: dayNames[date.getDay()],
        dayNumber: date.getDate()
      });
    }
  }

  isServiceSelected(id: string): boolean {
    return this.selectedServiceIds().includes(id);
  }

  toggleService(service: Service): void {
    const ids = this.selectedServiceIds();
    if (ids.includes(service.id)) {
      this.selectedServiceIds.set(ids.filter(id => id !== service.id));
    } else {
      this.selectedServiceIds.set([...ids, service.id]);
    }
  }

  canHomeService() {
    const type = this.business()?.businessType;
    return type === 'FREELANCE' || type === 'HYBRID';
  }

  getStepClass(stepId: number): string {
    if (stepId < this.currentStep()) return 'bg-green-500 text-white';
    if (stepId === this.currentStep()) return 'bg-primary text-white';
    return 'bg-gray-200 text-gray-500';
  }

  getProgressLineClass(index: number): string {
    return index < this.currentStep() - 1 ? 'bg-green-500' : 'bg-gray-200';
  }

  getServiceClass(serviceId: string): string {
    return this.isServiceSelected(serviceId)
      ? 'border-primary bg-primary/5'
      : 'border-gray-200 hover:border-primary/50';
  }

  getDateClass(date: string): string {
    return this.selectedDate() === date
      ? 'border-primary bg-primary/5 text-primary'
      : 'border-gray-200 hover:border-primary/50';
  }

  getTimeClass(time: string): string {
    return this.selectedTime() === time
      ? 'border-primary bg-primary text-white'
      : 'border-gray-200 hover:border-primary/50';
  }

  getTypeClass(type: 'SALON' | 'HOME'): string {
    return this.bookingType() === type
      ? 'border-primary bg-primary/5'
      : 'border-gray-200 hover:border-primary/50';
  }

  getPaymentClass(method: 'MOBILE_MONEY' | 'CASH'): string {
    return this.paymentMethod() === method
      ? 'border-primary bg-primary/5'
      : 'border-gray-200 hover:border-primary/50';
  }

  selectDate(date: string): void {
    this.selectedDate.set(date);
    this.selectedTime.set(null);
    this.availableSlots = this.mockData.getAvailableSlots(new Date(date), this.businessId()!);
  }

  selectTime(time: string): void {
    this.selectedTime.set(time);
  }

  selectBookingType(type: 'SALON' | 'HOME'): void {
    this.bookingType.set(type);
  }

  onCommuneChange(event: Event): void {
    this.selectedCommune.set((event.target as HTMLSelectElement).value);
  }

  selectPaymentMethod(method: 'MOBILE_MONEY' | 'CASH'): void {
    this.paymentMethod.set(method);
  }

  canProceed(): boolean {
    switch (this.currentStep()) {
      case 1:
        return this.selectedServiceIds().length > 0;
      case 2:
        return !!this.selectedDate() && !!this.selectedTime();
      case 3:
        return this.bookingType() === 'SALON' || !!this.selectedCommune();
      case 4:
        return true;
      case 5:
        return !!this.paymentMethod();
      default:
        return false;
    }
  }

  nextStep(): void {
    if (this.currentStep() === 5) {
      this.confirmBooking();
    } else {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  confirmBooking(): void {
    const services = this.selectedServices();
    const firstService = services[0];
    if (!firstService || !this.selectedDate() || !this.selectedTime()) return;

    const booking = this.mockData.createBooking({
      businessId: this.businessId()!,
      professionalId: this.business()?.professionalId,
      serviceId: firstService.id,
      service: firstService,
      businessName: this.business()?.name,
      professionalName: this.business()?.name,
      date: new Date(this.selectedDate()!),
      time: this.selectedTime()!,
      duration: this.totalDuration(),
      type: this.bookingType(),
      clientAddress: undefined,
      clientPhone: '+225 07 07 07 07 07',
      clientName: 'Aminata Kouassi',
      subtotal: this.servicesSubtotal(),
      homeServiceFee: this.homeServiceFee(),
      total: this.totalPrice(),
      paymentMethod: this.paymentMethod()
    });

    this.bookingNumber.set(booking.bookingNumber);
    this.toast.success('Réservation confirmée avec succès !');
    this.currentStep.set(6);
  }

  copyReference(): void {
    navigator.clipboard.writeText(this.bookingNumber()).then(() => {
      this.toast.success('Numéro copié !');
    }).catch(() => {});
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToBookings(): void {
    this.router.navigate(['/espace-client/reservations']);
  }
}
