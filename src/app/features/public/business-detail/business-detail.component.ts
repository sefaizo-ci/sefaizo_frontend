import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business, Review, Service } from '../../../core/models';
import { StarRatingComponent } from '../../../shared/ui/star-rating/star-rating.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton/skeleton.component';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent,
    BadgeComponent,
    SkeletonComponent,
    FcfaPipe,
    DateFormatPipe,
    ButtonComponent
  ],
  template: `
    @if (loading()) {
      <div class="min-h-screen bg-gray-50">
        <app-skeleton variant="card" />
      </div>
    } @else if (business()) {
      <div class="min-h-screen bg-gray-50">
        <!-- Header with Cover Image -->
        <div class="relative h-48 md:h-64 lg:h-80">
          <img
            [src]="business()!.coverImage || 'https://via.placeholder.com/1200x400?text=Salon'"
            [alt]="business()!.name"
            class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <button
            (click)="back()"
            class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        <div class="container-custom -mt-20 relative z-10 pb-16">
          <div class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="bg-white rounded-md shadow-lg p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                  <img
                    [src]="business()!.avatar || business()!.coverImage || 'https://via.placeholder.com/150?text=Salon'"
                    [alt]="business()!.name"
                    class="w-24 h-24 rounded-md object-cover flex-shrink-0">
                  <div class="flex-1">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <h1 class="text-2xl font-bold text-secondary mb-1">{{ business()!.name }}</h1>
                        @if (business()!.isVerified) {
                          <app-badge variant="success">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            Vérifié
                          </app-badge>
                        }
                      </div>
                      <app-button variant="primary" (click)="startBooking()">Réserver</app-button>
                    </div>

                    <div class="flex items-center gap-4 mb-3">
                      <app-star-rating [rating]="business()!.rating" size="1rem" [showValue]="true" />
                      <span class="text-secondary-gray">({{ business()!.reviewCount }} avis)</span>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-3">
                      @for (cat of business()!.categories; track cat) {
                        <app-badge variant="info">{{ cat }}</app-badge>
                      }
                    </div>

                    <div class="space-y-2 text-sm text-secondary-gray">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {{ business()!.address || business()!.city }}
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        {{ business()!.phone }}
                      </div>
                    </div>
                  </div>
                </div>

                @if (business()!.description) {
                  <div class="mt-4 pt-4 border-t">
                    <p class="text-secondary-gray">{{ business()!.description }}</p>
                  </div>
                }
              </div>

              <div class="bg-white rounded-md shadow-lg mb-6">
                <div class="border-b">
                  <nav class="flex">
                    @for (tab of tabs; track tab) {
                      <button
                        (click)="activeTab = tab"
                        [class]="getTabClass(tab)"
                        class="px-6 py-4 text-sm font-medium border-b-2 transition-colors">
                        {{ tab }}
                      </button>
                    }
                  </nav>
                </div>

                <div class="p-6">
                  @if (activeTab === 'Services') {
                    <div class="space-y-4">
                      @for (service of business()!.services; track service.id) {
                        <div class="flex justify-between items-start py-4 border-b last:border-0">
                          <div class="flex-1">
                            <h4 class="font-semibold text-secondary">{{ service.name }}</h4>
                            @if (service.description) {
                              <p class="text-sm text-secondary-gray mt-1">{{ service.description }}</p>
                            }
                            <div class="flex items-center gap-4 mt-2 text-sm text-secondary-gray">
                              <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {{ service.duration }} min
                              </span>
                              <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                                {{ service.categoryName }}
                              </span>
                            </div>
                          </div>
                          <div class="text-right">
                            <span class="text-lg font-bold text-primary">{{ service.price | fcfa }}</span>
                            <button
                              (click)="bookService(service)"
                              class="block w-full mt-2 btn-primary text-sm py-2">
                              Réserver
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                  }

                  @if (activeTab === 'Horaires') {
                    <div class="space-y-3">
                      @for (day of business()!.workingHours; track day.dayOfWeek) {
                        <div class="flex justify-between py-3 border-b last:border-0">
                          <span [class]="day.isOpen ? 'text-secondary' : 'text-secondary-gray'">
                            {{ getDayName(day.dayOfWeek) }}
                          </span>
                          @if (day.isOpen && day.slots) {
                            <span class="text-secondary-gray">
                              @for (slot of day.slots; track slot.startTime; let last = $last) {
                                {{ slot.startTime }} - {{ slot.endTime }}
                                @if (!last) {
                                  <span class="mx-2">|</span>
                                }
                              }
                            </span>
                          } @else {
                            <span class="text-secondary-gray">Fermé</span>
                          }
                        </div>
                      }
                    </div>
                  }

                  @if (activeTab === 'Avis') {
                    <div class="space-y-6">
                      <div class="flex items-center gap-6 pb-6 border-b">
                        <div class="text-center">
                          <div class="text-4xl font-bold text-primary">{{ business()!.rating.toFixed(1) }}</div>
                          <app-star-rating [rating]="business()!.rating" size="1.25rem" />
                          <div class="text-sm text-secondary-gray mt-1">{{ business()!.reviewCount }} avis</div>
                        </div>
                      </div>

                      @for (review of reviews; track review.id) {
                        <div class="py-4 border-b last:border-0">
                          <div class="flex items-start gap-4">
                            <img
                              [src]="review.clientAvatar || 'https://via.placeholder.com/40?img=1'"
                              [alt]="review.clientName"
                              class="w-10 h-10 rounded-full object-cover">
                            <div class="flex-1">
                              <div class="flex justify-between items-start">
                                <div>
                                  <h4 class="font-semibold text-secondary">{{ review.clientName }}</h4>
                                  <app-star-rating [rating]="review.rating" size="0.75rem" />
                                </div>
                                <span class="text-sm text-secondary-gray">{{ review.createdAt | dateFormat: 'long' }}</span>
                              </div>
                              @if (review.comment) {
                                <p class="text-secondary-gray mt-2">{{ review.comment }}</p>
                              }
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  }

                  @if (activeTab === 'Photos') {
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <img [src]="business()!.coverImage" class="rounded-md aspect-square object-cover">
                      <img [src]="business()!.avatar" class="rounded-md aspect-square object-cover">
                    </div>
                  }
                </div>
              </div>
            </div>

            <div class="lg:col-span-1">
              <div class="bg-white rounded-md shadow-lg p-6 sticky top-24">
                <h3 class="font-semibold text-secondary mb-4">Réserver maintenant</h3>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-secondary-gray mb-2">Service</label>
                    <select
                      [value]="selectedServiceId()"
                      (change)="onServiceSelect($event)"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Sélectionner un service</option>
                      @for (service of business()!.services; track service.id) {
                        <option [value]="service.id">{{ service.name }} - {{ service.price | fcfa }}</option>
                      }
                    </select>
                  </div>

                  @if (selectedService()) {
                    <div class="bg-primary/5 rounded-md p-4">
                      <div class="flex justify-between mb-2">
                        <span class="text-secondary-gray">{{ selectedService()!.name }}</span>
                        <span class="font-medium">{{ selectedService()!.price | fcfa }}</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-secondary-gray">Durée</span>
                        <span class="text-secondary-gray">{{ selectedService()!.duration }} min</span>
                      </div>
                    </div>
                  }

                  <app-button
                    variant="primary"
                    [fullWidth]="true"
                    [disabled]="!selectedService()"
                    (click)="startBooking()">
                    Continuer la réservation
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: []
})
export class BusinessDetailComponent implements OnInit {
  loading = signal(true);
  business = signal<Business | null>(null);
  reviews: Review[] = [];
  activeTab = 'Services';
  tabs = ['Services', 'Horaires', 'Avis', 'Photos'];
  selectedServiceId = signal<string | null>(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const business = this.mockData.getBusinessBySlug(slug);
      if (business) {
        this.business.set(business);
        this.reviews = this.mockData.getReviewsByBusiness(business.id);
      }
    }
    
    setTimeout(() => {
      this.loading.set(false);
    }, 500);
  }

  getDayName(dayIndex: number): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[dayIndex];
  }

  getTabClass(tab: string): string {
    const baseClass = 'transition-colors';
    return this.activeTab === tab
      ? `${baseClass} border-primary text-primary`
      : `${baseClass} border-transparent text-secondary-gray hover:text-secondary hover:border-gray-300`;
  }

  onServiceSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedServiceId.set(value || null);
  }

  bookService(service: Service): void {
    this.selectedServiceId.set(service.id);
    this.startBooking();
  }

  startBooking(): void {
    const businessId = this.business()?.id;
    const serviceId = this.selectedServiceId() || this.business()?.services[0]?.id;
    
    if (businessId && serviceId) {
      this.router.navigate(['/booking'], {
        queryParams: {
          business: businessId,
          service: serviceId
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/']);
  }

  selectedService() {
    return this.business()?.services.find(s => s.id === this.selectedServiceId());
  }
}
