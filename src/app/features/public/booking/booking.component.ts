import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, Service, Booking, HomeServiceCommune } from '../../../core/models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    FcfaPipe,
    DateFormatPipe,
    BadgeComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container-custom max-w-4xl">
        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            @for (step of steps; track step.id; let i = $index) {
              <div class="flex items-center">
                <div
                  [class]="getStepClass(step.id)"
                  class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors">
                  @if (step.id < currentStep()) {
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  } @else {
                    {{ step.id }}
                  }
                </div>
                @if (i < steps.length - 1) {
                  <div [class]="getProgressLineClass(i)" class="w-12 md:w-24 h-1 mx-2"></div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Step Content -->
        <div class="bg-white rounded-md shadow-lg p-6">
          @if (currentStep() === 1) {
            <div>
              <h2 class="text-2xl font-bold text-secondary mb-6">Sélectionnez un service</h2>
              <div class="space-y-4">
                @for (service of business()?.services; track service.id) {
                  <div
                    (click)="selectService(service)"
                    [class]="getServiceClass(service.id)"
                    class="flex justify-between items-center p-4 rounded-md border-2 cursor-pointer transition-all hover:shadow-md">
                    <div class="flex-1">
                      <h3 class="font-semibold text-secondary">{{ service.name }}</h3>
                      <p class="text-sm text-secondary-gray mt-1">{{ service.description }}</p>
                      <div class="flex items-center gap-4 mt-2 text-sm text-secondary-gray">
                        <span>{{ service.duration }} min</span>
                        <span>•</span>
                        <span>{{ service.categoryName }}</span>
                      </div>
                    </div>
                    <div class="text-right ml-4">
                      <span class="text-lg font-bold text-primary">{{ service.price | fcfa }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          } @else if (currentStep() === 2) {
            <div>
              <h2 class="text-2xl font-bold text-secondary mb-6">Choisissez la date et l'heure</h2>
              <div class="mb-6">
                <label class="block text-sm font-medium text-secondary-gray mb-3">Date</label>
                <div class="grid grid-cols-4 md:grid-cols-7 gap-2">
                  @for (day of next7Days; track day.date) {
                    <button
                      (click)="selectDate(day.date)"
                      [class]="getDateClass(day.date)"
                      class="p-3 rounded-md border-2 text-center transition-all hover:shadow-md">
                      <div class="text-xs text-secondary-gray uppercase">{{ day.dayName }}</div>
                      <div class="text-lg font-bold">{{ day.dayNumber }}</div>
                    </button>
                  }
                </div>
              </div>
              @if (selectedDate()) {
                <div>
                  <label class="block text-sm font-medium text-secondary-gray mb-3">Créneaux disponibles</label>
                  <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
                    @for (slot of availableSlots; track slot.startTime) {
                      <button
                        (click)="selectTime(slot.startTime)"
                        [class]="getTimeClass(slot.startTime)"
                        [disabled]="!slot.isAvailable"
                        class="py-2 px-3 rounded-md border-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md">
                        {{ slot.startTime }}
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          } @else if (currentStep() === 3) {
            <div>
              <h2 class="text-2xl font-bold text-secondary mb-6">Type de prestation</h2>
              <div class="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  (click)="selectBookingType('SALON')"
                  [class]="getTypeClass('SALON')"
                  class="p-6 rounded-md border-2 text-left transition-all hover:shadow-md">
                  <div class="flex items-center gap-3 mb-3">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <span class="text-lg font-semibold">Au salon</span>
                  </div>
                  <p class="text-secondary-gray text-sm">Rendez-vous directement dans l'établissement</p>
                </button>
                <button
                  (click)="selectBookingType('HOME')"
                  [class]="getTypeClass('HOME')"
                  class="p-6 rounded-md border-2 text-left transition-all hover:shadow-md">
                  <div class="flex items-center gap-3 mb-3">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <span class="text-lg font-semibold">À domicile</span>
                  </div>
                  <p class="text-secondary-gray text-sm">Le professionnel se déplace chez vous</p>
                </button>
              </div>
              @if (bookingType() === 'HOME') {
                <div class="bg-primary/5 rounded-md p-4 mb-4">
                  <h3 class="font-semibold text-secondary mb-4">Frais de déplacement par commune</h3>
                  <div class="space-y-2">
                    @for (commune of homeServiceCommunes; track commune.commune) {
                      <div class="flex justify-between items-center py-2 border-b last:border-0">
                        <span class="text-secondary">{{ commune.commune }}</span>
                        <span class="font-bold text-primary">{{ commune.fee | fcfa }}</span>
                      </div>
                    }
                  </div>
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-secondary-gray mb-2">Votre commune</label>
                    <select
                      (change)="onCommuneChange($event)"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Sélectionner une commune</option>
                      @for (commune of homeServiceCommunes; track commune.commune) {
                        <option [value]="commune.commune">{{ commune.commune }} - {{ commune.fee | fcfa }}</option>
                      }
                    </select>
                  </div>
                </div>
              }
            </div>
          } @else if (currentStep() === 4) {
            <div>
              <h2 class="text-2xl font-bold text-secondary mb-6">Récapitulatif</h2>
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-md p-4">
                  <h3 class="font-semibold text-secondary mb-3">Service</h3>
                  <div class="flex justify-between">
                    <div>
                      <div class="font-medium">{{ selectedService()?.name }}</div>
                      <div class="text-sm text-secondary-gray">{{ selectedService()?.duration }} min</div>
                    </div>
                    <div class="font-bold text-primary">{{ selectedService()?.price | fcfa }}</div>
                  </div>
                </div>
                <div class="bg-gray-50 rounded-md p-4">
                  <h3 class="font-semibold text-secondary mb-3">Date et heure</h3>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ selectedDate() | dateFormat: 'long' }} à {{ selectedTime() }}</span>
                  </div>
                </div>
                <div class="bg-gray-50 rounded-md p-4">
                  <h3 class="font-semibold text-secondary mb-3">Type de prestation</h3>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    <span>{{ bookingType() === 'SALON' ? 'Au salon' : 'À domicile - ' + selectedCommune() }}</span>
                  </div>
                  @if (homeServiceFee() > 0) {
                    <div class="flex justify-between mt-2 text-sm">
                      <span class="text-secondary-gray">Frais de déplacement</span>
                      <span class="font-medium">{{ homeServiceFee() | fcfa }}</span>
                    </div>
                  }
                </div>
                <div class="bg-primary/5 rounded-md p-4">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-secondary">Total à payer</span>
                    <span class="text-2xl font-bold text-primary">{{ totalPrice() | fcfa }}</span>
                  </div>
                </div>
              </div>
            </div>
          } @else if (currentStep() === 5) {
            <div>
              <h2 class="text-2xl font-bold text-secondary mb-6">Mode de paiement</h2>
              <div class="space-y-4 mb-6">
                <button
                  (click)="selectPaymentMethod('MOBILE_MONEY')"
                  [class]="getPaymentClass('MOBILE_MONEY')"
                  class="w-full p-4 rounded-md border-2 text-left transition-all hover:shadow-md">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    <div>
                      <div class="font-semibold text-secondary">Mobile Money</div>
                      <div class="text-sm text-secondary-gray">Orange Money, MTN Mobile Money, Wave</div>
                    </div>
                  </div>
                </button>
                <button
                  (click)="selectPaymentMethod('CASH')"
                  [class]="getPaymentClass('CASH')"
                  class="w-full p-4 rounded-md border-2 text-left transition-all hover:shadow-md">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <div>
                      <div class="font-semibold text-secondary">Espèces</div>
                      <div class="text-sm text-secondary-gray">Paiement en espèces sur place</div>
                    </div>
                  </div>
                </button>
              </div>
              <div class="bg-primary/5 rounded-md p-4 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-secondary-gray">Total à payer</span>
                  <span class="text-xl font-bold text-primary">{{ totalPrice() | fcfa }}</span>
                </div>
              </div>
            </div>
          } @else if (currentStep() === 6) {
            <div class="text-center py-8">
              <div class="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-secondary mb-2">Réservation confirmée !</h2>
              <p class="text-secondary-gray mb-6">Votre rendez-vous a été réservé avec succès</p>
              <div class="bg-gray-50 rounded-md p-6 max-w-md mx-auto mb-6 text-left">
                <div class="text-center mb-4">
                  <div class="text-sm text-secondary-gray">Numéro de réservation</div>
                  <div class="text-2xl font-bold text-primary">{{ bookingNumber() }}</div>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-secondary-gray">Service</span>
                    <span class="font-medium">{{ selectedService()?.name }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-secondary-gray">Date</span>
                    <span class="font-medium">{{ selectedDate() | dateFormat: 'long' }} à {{ selectedTime() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-secondary-gray">Total payé</span>
                    <span class="font-bold text-primary">{{ totalPrice() | fcfa }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-center gap-4">
                <button (click)="goHome()" class="btn-secondary">Retour à l'accueil</button>
                <button (click)="goToBookings()" class="btn-primary">Mes réservations</button>
              </div>
            </div>
          }
        </div>

        @if (currentStep() < 6) {
          <div class="flex justify-between mt-6">
            <button
              (click)="previousStep()"
              [disabled]="currentStep() === 1"
              class="px-6 py-3 text-secondary font-medium hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Retour
            </button>
            <button
              (click)="nextStep()"
              [disabled]="!canProceed()"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {{ currentStep() === 5 ? 'Confirmer et payer' : 'Continuer' }}
            </button>
          </div>
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
