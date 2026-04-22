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

        <!-- ─── Étape 6 : Confirmation pleine largeur ─── -->
        @if (currentStep() === 6) {
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div class="text-center py-4">
              <div class="w-20 h-20 mx-auto mb-6 bg-emerald-50 rounded-full flex items-center justify-center">
                <lucide-icon name="circle-check-big" [size]="40" [strokeWidth]="1.5" class="text-emerald-500"></lucide-icon>
              </div>
              <h2 class="text-2xl font-bold text-secondary mb-2">Réservation confirmée !</h2>
              <p class="text-secondary-gray mb-8">Votre rendez-vous a été réservé avec succès</p>
              <div class="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-8 text-left border border-gray-100">
                <div class="text-center mb-5">
                  <div class="text-xs text-secondary-gray uppercase tracking-wide mb-1">Numéro de réservation</div>
                  <div class="text-2xl font-bold text-primary">{{ bookingNumber() }}</div>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between py-2 border-b border-gray-100">
                    <span class="text-secondary-gray">Service</span>
                    <span class="font-medium">{{ selectedService()?.name }}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-100">
                    <span class="text-secondary-gray">Date</span>
                    <span class="font-medium">{{ selectedDate() | dateFormat: 'long' }} à {{ selectedTime() }}</span>
                  </div>
                  <div class="flex justify-between py-2">
                    <span class="text-secondary-gray">Total payé</span>
                    <span class="font-bold text-primary text-base">{{ totalPrice() | fcfa }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-center gap-4">
                <button (click)="goHome()" class="btn-secondary">Retour à l'accueil</button>
                <button (click)="goToBookings()" class="btn-primary">Mes réservations</button>
              </div>
            </div>
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
                  <h2 class="text-xl font-bold text-secondary mb-5">Sélectionnez un service</h2>
                  <div class="space-y-3">
                    @for (service of business()?.services; track service.id) {
                      <div (click)="selectService(service)"
                           [class]="getServiceClass(service.id)"
                           class="flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 hover:shadow-sm active:scale-[0.99]">
                        <div class="flex items-start gap-3 flex-1">
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
                        <div class="text-right ml-4 flex-shrink-0">
                          <span class="text-lg font-bold text-primary">{{ service.price | fcfa }}</span>
                        </div>
                      </div>
                    }
                  </div>
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
                  <h2 class="text-xl font-bold text-secondary mb-5">Type de prestation</h2>
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
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="scissors" [size]="18" [strokeWidth]="1.75" class="text-primary"></lucide-icon>
                      </div>
                      <div class="flex-1">
                        <div class="text-xs text-secondary-gray uppercase tracking-wide font-semibold mb-0.5">Service</div>
                        <div class="font-semibold text-secondary">{{ selectedService()?.name }}</div>
                        <div class="text-sm text-secondary-gray">{{ selectedService()?.duration }} min</div>
                      </div>
                      <div class="font-bold text-primary text-lg">{{ selectedService()?.price | fcfa }}</div>
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
                  <!-- Service -->
                  <div class="flex items-start gap-3">
                    <lucide-icon name="scissors" [size]="14" [strokeWidth]="2" class="text-secondary-gray mt-0.5 flex-shrink-0"></lucide-icon>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs text-secondary-gray">Service</div>
                      @if (selectedService()) {
                        <div class="text-sm font-semibold text-secondary truncate">{{ selectedService()?.name }}</div>
                        <div class="text-xs text-secondary-gray">{{ selectedService()?.duration }} min</div>
                      } @else {
                        <div class="text-xs text-gray-300 italic">Non sélectionné</div>
                      }
                    </div>
                    @if (selectedService()) {
                      <div class="text-sm font-bold text-primary flex-shrink-0">{{ selectedService()?.price | fcfa }}</div>
                    }
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
  selectedServiceId = signal<string | null>(null);
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
        this.selectedServiceId.set(params['service']);
      }
    });

    // Generate next 7 days
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

  businessServices() {
    return this.business()?.services || [];
  }

  selectedService() {
    return this.business()?.services.find(s => s.id === this.selectedServiceId());
  }

  canHomeService() {
    const type = this.business()?.businessType;
    return type === 'FREELANCE' || type === 'HYBRID';
  }

  homeServiceFee = computed(() => {
    if (this.bookingType() !== 'HOME' || !this.selectedCommune()) return 0;
    const commune = this.homeServiceCommunes.find(c => c.commune === this.selectedCommune());
    return commune?.fee || 0;
  });

  totalPrice = computed(() => {
    const servicePrice = this.selectedService()?.price || 0;
    return servicePrice + this.homeServiceFee();
  });

  progressPct = computed(() => Math.round((Math.min(this.currentStep(), 5) / 5) * 100));

  getStepClass(stepId: number): string {
    if (stepId < this.currentStep()) {
      return 'bg-green-500 text-white';
    } else if (stepId === this.currentStep()) {
      return 'bg-primary text-white';
    } else {
      return 'bg-gray-200 text-gray-500';
    }
  }

  getProgressLineClass(index: number): string {
    const completedSteps = this.currentStep() - 1;
    return index < completedSteps ? 'bg-green-500' : 'bg-gray-200';
  }

  getServiceClass(serviceId: string): string {
    return this.selectedServiceId() === serviceId
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

  selectService(service: Service): void {
    this.selectedServiceId.set(service.id);
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
        return !!this.selectedServiceId();
      case 2:
        return !!this.selectedDate() && !!this.selectedTime();
      case 3:
        if (this.bookingType() === 'HOME') {
          return !!this.selectedCommune();
        }
        return true;
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
    const service = this.selectedService();
    if (!service || !this.selectedDate() || !this.selectedTime()) return;

    const booking = this.mockData.createBooking({
      businessId: this.businessId()!,
      professionalId: this.business()?.professionalId,
      serviceId: service.id,
      service,
      businessName: this.business()?.name,
      professionalName: this.business()?.name,
      date: new Date(this.selectedDate()!),
      time: this.selectedTime()!,
      duration: service.duration,
      type: this.bookingType(),
      clientAddress: this.bookingType() === 'HOME' ? undefined : undefined,
      clientPhone: '+225 07 07 07 07 07',
      clientName: 'Aminata Kouassi',
      subtotal: service.price,
      homeServiceFee: this.homeServiceFee(),
      total: this.totalPrice(),
      paymentMethod: this.paymentMethod()
    });

    this.bookingNumber.set(booking.bookingNumber);
    this.toast.success('Réservation confirmée avec succès !');
    this.currentStep.set(6);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToBookings(): void {
    this.router.navigate(['/espace-client/reservations']);
  }
}
