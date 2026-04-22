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
import { LucideAngularModule } from 'lucide-angular';

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
    ButtonComponent,
    LucideAngularModule
  ],
  template: `
    @if (loading()) {
      <div class="min-h-screen bg-gray-50">
        <app-skeleton variant="card" />
      </div>
    } @else if (business()) {
      <div class="min-h-screen bg-gray-50">
        <!-- Cover Image -->
        <div class="relative h-48 md:h-64 lg:h-80">
          <img
            [src]="business()!.coverImage || 'https://via.placeholder.com/1200x400?text=Salon'"
            [alt]="business()!.name"
            class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <button
            (click)="back()"
            class="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm pl-2 pr-3 py-1.5 rounded-full text-sm font-medium text-secondary hover:bg-white transition-all shadow-sm">
            <lucide-icon name="chevron-left" [size]="16" [strokeWidth]="2.5"></lucide-icon>
            Retour
          </button>
        </div>

        <div class="container-custom -mt-20 relative z-10 pb-16">
          <div class="grid lg:grid-cols-3 gap-8">

            <!-- Main Content -->
            <div class="lg:col-span-2">

              <!-- Business Info Card -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-5">
                  <img
                    [src]="business()!.avatar || business()!.coverImage || 'https://via.placeholder.com/150?text=Salon'"
                    [alt]="business()!.name"
                    class="w-24 h-24 rounded-xl object-cover flex-shrink-0 border border-gray-100">
                  <div class="flex-1">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <h1 class="text-2xl font-bold text-secondary">{{ business()!.name }}</h1>
                          @if (business()!.isVerified) {
                            <lucide-icon name="badge-check" [size]="20" class="text-primary" [strokeWidth]="2"></lucide-icon>
                          }
                        </div>
                        @if (business()!.isVerified) {
                          <span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <lucide-icon name="shield-check" [size]="11" [strokeWidth]="2"></lucide-icon>
                            Établissement vérifié
                          </span>
                        }
                      </div>
                      <app-button variant="primary" (click)="startBooking()">Réserver</app-button>
                    </div>

                    <div class="flex items-center gap-3 my-3">
                      <app-star-rating [rating]="business()!.rating" size="1rem" [showValue]="true" />
                      <span class="text-sm text-secondary-gray">({{ business()!.reviewCount }} avis)</span>
                    </div>

                    <div class="flex flex-wrap gap-1.5 mb-3">
                      @for (cat of business()!.categories; track cat) {
                        <span class="text-xs font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-full">{{ cat }}</span>
                      }
                    </div>

                    <div class="space-y-1.5 text-sm text-secondary-gray">
                      <div class="flex items-center gap-2">
                        <lucide-icon name="map-pin" [size]="14" [strokeWidth]="2" class="text-primary/70 flex-shrink-0"></lucide-icon>
                        <span>{{ business()!.address || business()!.city }}</span>
                      </div>
                      @if (business()!.phone) {
                        <div class="flex items-center gap-2">
                          <lucide-icon name="phone" [size]="14" [strokeWidth]="2" class="text-primary/70 flex-shrink-0"></lucide-icon>
                          <span>{{ business()!.phone }}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                @if (business()!.description) {
                  <div class="mt-5 pt-5 border-t border-gray-100">
                    <p class="text-sm text-secondary-gray leading-relaxed">{{ business()!.description }}</p>
                  </div>
                }
              </div>

              <!-- Tabs Card -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div class="border-b border-gray-100">
                  <nav class="flex px-2">
                    @for (tab of tabs; track tab) {
                      <button
                        (click)="activeTab = tab"
                        [class]="getTabClass(tab)"
                        class="px-5 py-4 text-sm font-medium border-b-2 transition-colors">
                        {{ tab }}
                      </button>
                    }
                  </nav>
                </div>

                <div class="p-6">
                  @if (activeTab === 'Services') {
                    <div class="space-y-2">
                      @for (service of business()!.services; track service.id) {
                        <div class="flex justify-between items-start py-4 border-b border-gray-100 last:border-0">
                          <div class="flex-1 pr-4">
                            <h4 class="font-semibold text-secondary">{{ service.name }}</h4>
                            @if (service.description) {
                              <p class="text-sm text-secondary-gray mt-1">{{ service.description }}</p>
                            }
                            <div class="flex items-center gap-4 mt-2 text-xs text-secondary-gray">
                              <span class="flex items-center gap-1.5">
                                <lucide-icon name="clock" [size]="13" [strokeWidth]="2"></lucide-icon>
                                {{ service.duration }} min
                              </span>
                              <span class="flex items-center gap-1.5">
                                <lucide-icon name="tag" [size]="13" [strokeWidth]="2"></lucide-icon>
                                {{ service.categoryName }}
                              </span>
                            </div>
                          </div>
                          <div class="text-right flex-shrink-0">
                            <span class="text-lg font-bold text-primary">{{ service.price | fcfa }}</span>
                            <button
                              (click)="bookService(service)"
                              class="block w-full mt-2 btn-primary text-sm py-1.5 px-4">
                              Réserver
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                  }

                  @if (activeTab === 'Horaires') {
                    <div class="space-y-1">
                      @for (day of business()!.workingHours; track day.dayOfWeek) {
                        <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                          <div class="flex items-center gap-2">
                            <lucide-icon name="clock" [size]="14" [strokeWidth]="2"
                              [class]="day.isOpen ? 'text-primary' : 'text-gray-300'"></lucide-icon>
                            <span class="text-sm font-medium" [class]="day.isOpen ? 'text-secondary' : 'text-secondary-gray'">
                              {{ getDayName(day.dayOfWeek) }}
                            </span>
                          </div>
                          @if (day.isOpen && day.slots) {
                            <span class="text-sm text-secondary-gray">
                              @for (slot of day.slots; track slot.startTime; let last = $last) {
                                {{ slot.startTime }} – {{ slot.endTime }}
                                @if (!last) { <span class="mx-1 text-gray-300">|</span> }
                              }
                            </span>
                          } @else {
                            <span class="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Fermé</span>
                          }
                        </div>
                      }
                    </div>
                  }

                  @if (activeTab === 'Avis') {
                    <div class="space-y-5">
                      <div class="flex items-center gap-6 pb-6 border-b border-gray-100">
                        <div class="text-center">
                          <div class="text-4xl font-bold text-primary">{{ business()!.rating.toFixed(1) }}</div>
                          <app-star-rating [rating]="business()!.rating" size="1.25rem" />
                          <div class="text-sm text-secondary-gray mt-1">{{ business()!.reviewCount }} avis</div>
                        </div>
                      </div>

                      @for (review of reviews; track review.id) {
                        <div class="py-4 border-b border-gray-100 last:border-0">
                          <div class="flex items-start gap-4">
                            <img
                              [src]="review.clientAvatar || 'https://via.placeholder.com/40?img=1'"
                              [alt]="review.clientName"
                              class="w-10 h-10 rounded-full object-cover flex-shrink-0">
                            <div class="flex-1">
                              <div class="flex justify-between items-start mb-1">
                                <div>
                                  <h4 class="font-semibold text-secondary text-sm">{{ review.clientName }}</h4>
                                  <app-star-rating [rating]="review.rating" size="0.75rem" />
                                </div>
                                <span class="text-xs text-secondary-gray">{{ review.createdAt | dateFormat: 'long' }}</span>
                              </div>
                              @if (review.comment) {
                                <p class="text-sm text-secondary-gray mt-2 leading-relaxed">{{ review.comment }}</p>
                              }
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  }

                  @if (activeTab === 'Photos') {
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <img [src]="business()!.coverImage" class="rounded-xl aspect-square object-cover">
                      <img [src]="business()!.avatar" class="rounded-xl aspect-square object-cover">
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Sticky Booking Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <div class="flex items-center gap-2 mb-5">
                  <lucide-icon name="calendar-days" [size]="18" [strokeWidth]="2" class="text-primary"></lucide-icon>
                  <h3 class="font-semibold text-secondary">Réserver maintenant</h3>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-semibold text-secondary-gray uppercase tracking-wide mb-2">Service</label>
                    <select
                      [value]="selectedServiceId()"
                      (change)="onServiceSelect($event)"
                      class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                      <option value="">Choisir un service…</option>
                      @for (service of business()!.services; track service.id) {
                        <option [value]="service.id">{{ service.name }} – {{ service.price | fcfa }}</option>
                      }
                    </select>
                  </div>

                  @if (selectedService()) {
                    <div class="bg-primary/5 rounded-xl p-4 border border-primary/10">
                      <p class="font-medium text-secondary text-sm mb-3">{{ selectedService()!.name }}</p>
                      <div class="space-y-2 text-sm text-secondary-gray">
                        <div class="flex justify-between items-center">
                          <span class="flex items-center gap-1.5">
                            <lucide-icon name="clock" [size]="13" [strokeWidth]="2"></lucide-icon>
                            Durée
                          </span>
                          <span class="font-medium text-secondary">{{ selectedService()!.duration }} min</span>
                        </div>
                        <div class="flex justify-between items-center pt-2 border-t border-primary/10">
                          <span class="font-semibold text-secondary">Total</span>
                          <span class="font-bold text-primary text-base">{{ selectedService()!.price | fcfa }}</span>
                        </div>
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

                  <p class="text-xs text-center text-secondary-gray">
                    Annulation gratuite jusqu'à 24h avant
                  </p>
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
  loading = signal(false);
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
