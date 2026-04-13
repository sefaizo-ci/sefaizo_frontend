import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Service, Business, HomeServiceCommune } from '../../../core/models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FcfaPipe,
    BadgeComponent,
    ButtonComponent,
    ModalComponent
  ],
  template: `
    <div>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-secondary mb-2">Mes Services</h1>
          <p class="text-secondary-gray">Gérez vos prestations et vos tarifs</p>
        </div>
        <button class="btn-primary" (click)="openAddModal()">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Ajouter un service
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-secondary">{{ services().length }}</div>
          <div class="text-sm text-secondary-gray">Total services</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-green-600">{{ publishedCount() }}</div>
          <div class="text-sm text-secondary-gray">Publiés</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ draftCount() }}</div>
          <div class="text-sm text-secondary-gray">Brouillons</div>
        </div>
        <div class="bg-white rounded-md shadow p-4">
          <div class="text-2xl font-bold text-primary">{{ referrableCount() }}</div>
          <div class="text-sm text-secondary-gray">Référençables</div>
        </div>
      </div>

      <!-- Info Box -->
      <div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div class="text-sm text-blue-800">
            <strong>Conseil:</strong> Publiez vos services pour qu'ils soient visibles sur la marketplace. 
            Activez l'option "Référençable" pour gagner des points de parrainage lorsqu'un client recommande vos services.
          </div>
        </div>
      </div>

      <!-- Services List -->
      <div class="bg-white rounded-md shadow">
        <div class="divide-y">
          @for (service of services(); track service.id) {
            <div class="p-6">
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold text-secondary text-lg">{{ service.name }}</h3>
                    <app-badge [variant]="service.isPublished ? 'success' : 'neutral'">
                      {{ service.isPublished ? 'Publié' : 'Brouillon' }}
                    </app-badge>
                    @if (service.isReferrable) {
                      <app-badge variant="info">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        {{ service.referralPoints }} pts
                      </app-badge>
                    }
                  </div>
                  <p class="text-secondary-gray text-sm mb-2">{{ service.description || 'Aucune description' }}</p>
                  <div class="flex items-center gap-4 text-sm text-secondary-gray">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                      {{ service.categoryName }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {{ service.duration }} min
                    </span>
                    @if (service.isHomeService) {
                      <span class="flex items-center gap-1 text-primary">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        À domicile (+{{ service.homeServiceMarkup | fcfa:false }})
                      </span>
                    }
                  </div>
                  @if (service.serviceAreas && service.serviceAreas.length > 0) {
                    <div class="mt-2 flex flex-wrap gap-1">
                      @for (area of service.serviceAreas.slice(0, 5); track area) {
                        <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {{ area }}
                        </span>
                      }
                      @if (service.serviceAreas.length > 5) {
                        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{{ service.serviceAreas.length - 5 }} zones
                        </span>
                      }
                    </div>
                  }
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <span class="text-2xl font-bold text-primary">{{ service.price | fcfa }}</span>
                    @if (service.isHomeService) {
                      <div class="text-xs text-secondary-gray">
                        +{{ service.homeServiceMarkup | fcfa:false }} FCFA à domicile
                      </div>
                    }
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      (click)="togglePublish(service)"
                      [class]="service.isPublished ? 'btn-secondary' : 'btn-primary'"
                      class="text-sm py-2 px-4">
                      {{ service.isPublished ? 'Dépublier' : 'Publier' }}
                    </button>
                    <button
                      (click)="editService(service)"
                      class="p-2 text-secondary-gray hover:text-primary transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      (click)="deleteService(service)"
                      class="p-2 text-secondary-gray hover:text-red-600 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <app-modal
      [isOpen]="serviceModalOpen()"
      [title]="editingService() ? 'Modifier le service' : 'Ajouter un service'"
      [showFooter]="false"
      size="lg"
      (closed)="closeServiceModal()">
      <form (ngSubmit)="saveService()" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Nom du service *
            </label>
            <input
              type="text"
              [(ngModel)]="formData.name"
              name="name"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Catégorie *
            </label>
            <select
              [(ngModel)]="formData.categoryName"
              name="categoryName"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sélectionner</option>
              @for (cat of categories; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-secondary-gray mb-2">
            Description
          </label>
          <textarea
            [(ngModel)]="formData.description"
            name="description"
            rows="3"
            placeholder="Décrivez votre service..."
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Prix de base (FCFA) *
            </label>
            <input
              type="number"
              [(ngModel)]="formData.price"
              name="price"
              required
              min="0"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Durée (min) *
            </label>
            <input
              type="number"
              [(ngModel)]="formData.duration"
              name="duration"
              required
              min="15"
              step="15"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Points de parrainage
            </label>
            <input
              type="number"
              [(ngModel)]="formData.referralPoints"
              name="referralPoints"
              min="0"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          </div>
        </div>

        <!-- Service Location Options -->
        <div class="bg-gray-50 rounded-md p-4">
          <h3 class="font-semibold text-secondary mb-4">Lieu de prestation</h3>
          
          <div class="space-y-3">
            <label class="flex items-center gap-3 p-3 border-2 rounded-md cursor-pointer transition-all"
                   [class.border-primary]="formData.locationType === 'SALON'"
                   [class.bg-primary]="formData.locationType === 'SALON'">
              <input
                type="radio"
                name="locationType"
                value="SALON"
                [(ngModel)]="formData.locationType"
                class="w-4 h-4 text-primary">
              <div class="flex-1">
                <div class="font-medium" [class.text-white]="formData.locationType === 'SALON'">Au salon uniquement</div>
                <div class="text-xs" [class.text-white]="formData.locationType === 'SALON'">Le client se déplace dans votre établissement</div>
              </div>
              <svg class="w-6 h-6" [class.text-white]="formData.locationType === 'SALON'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </label>

            <label class="flex items-center gap-3 p-3 border-2 rounded-md cursor-pointer transition-all"
                   [class.border-primary]="formData.locationType === 'HOME'"
                   [class.bg-primary]="formData.locationType === 'HOME'">
              <input
                type="radio"
                name="locationType"
                value="HOME"
                [(ngModel)]="formData.locationType"
                class="w-4 h-4 text-primary">
              <div class="flex-1">
                <div class="font-medium" [class.text-white]="formData.locationType === 'HOME'">À domicile uniquement</div>
                <div class="text-xs" [class.text-white]="formData.locationType === 'HOME'">Vous vous déplacez chez le client</div>
              </div>
              <svg class="w-6 h-6" [class.text-white]="formData.locationType === 'HOME'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </label>

            <label class="flex items-center gap-3 p-3 border-2 rounded-md cursor-pointer transition-all"
                   [class.border-primary]="formData.locationType === 'BOTH'"
                   [class.bg-primary]="formData.locationType === 'BOTH'">
              <input
                type="radio"
                name="locationType"
                value="BOTH"
                [(ngModel)]="formData.locationType"
                class="w-4 h-4 text-primary">
              <div class="flex-1">
                <div class="font-medium" [class.text-white]="formData.locationType === 'BOTH'">Les deux options</div>
                <div class="text-xs" [class.text-white]="formData.locationType === 'BOTH'">Au salon ET à domicile</div>
              </div>
              <svg class="w-6 h-6" [class.text-white]="formData.locationType === 'BOTH'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </label>
          </div>
        </div>

        <!-- Home Service Markup -->
        @if (formData.locationType === 'HOME' || formData.locationType === 'BOTH') {
          <div class="bg-primary/5 border border-primary/20 rounded-md p-4">
            <h3 class="font-semibold text-secondary mb-4">Majoration pour service à domicile</h3>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-secondary-gray mb-2">
                  Majoration fixe (FCFA)
                </label>
                <input
                  type="number"
                  [(ngModel)]="formData.homeServiceMarkup"
                  name="homeServiceMarkup"
                  min="0"
                  placeholder="Ex: 3000"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <p class="text-xs text-secondary-gray mt-1">
                  Montant ajouté au prix de base pour les prestations à domicile
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-secondary-gray mb-2">
                  Ou majoration en %
                </label>
                <input
                  type="number"
                  [(ngModel)]="formData.homeServiceMarkupPercent"
                  name="homeServiceMarkupPercent"
                  min="0"
                  max="100"
                  placeholder="Ex: 20"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <p class="text-xs text-secondary-gray mt-1">
                  Pourcentage ajouté au prix de base
                </p>
              </div>
            </div>

            @if (formData.homeServiceMarkup || formData.homeServiceMarkupPercent) {
              <div class="mt-4 p-3 bg-white rounded-md border">
                <div class="text-sm text-secondary-gray">Prix total à domicile :</div>
                <div class="text-xl font-bold text-primary">
                  {{ calculateHomeServicePrice() | fcfa }}
                </div>
              </div>
            }
          </div>
        }

        <!-- Service Areas -->
        @if (formData.locationType === 'HOME' || formData.locationType === 'BOTH') {
          <div>
            <label class="block text-sm font-medium text-secondary-gray mb-2">
              Zones de desserte (Communes & Quartiers)
            </label>
            
            <div class="border border-gray-300 rounded-md p-4">
              <div class="flex flex-wrap gap-2 mb-3">
                @for (area of formData.serviceAreas; track area; let i = $index) {
                  <span class="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {{ area }}
                    <button type="button" (click)="removeServiceArea(i)" class="hover:text-red-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </span>
                }
              </div>

              <div class="flex gap-2">
                <input
                  type="text"
                  [(ngModel)]="newAreaInput"
                  (keydown.enter)="addServiceAreaFromInput()"
                  placeholder="Ajouter une commune ou quartier (ex: Cocody Riviera)"
                  class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <button
                  type="button"
                  (click)="addServiceAreaFromInput()"
                  class="btn-primary px-4">
                  Ajouter
                </button>
              </div>

              <!-- Quick Select Communes -->
              <div class="mt-3">
                <p class="text-xs text-secondary-gray mb-2">Communes populaires à Abidjan :</p>
                <div class="flex flex-wrap gap-2">
                  @for (commune of communes; track commune) {
                    <button
                      type="button"
                      (click)="addServiceAreaByName(commune)"
                      [class]="formData.serviceAreas.includes(commune) ? 'bg-primary text-white' : 'bg-gray-100 text-secondary hover:bg-gray-200'"
                      class="px-3 py-1 rounded-full text-xs transition-colors">
                      {{ commune }}
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        }

        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              [(ngModel)]="formData.isPublished"
              name="isPublished"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
            <span class="text-sm font-medium text-secondary">Publier immédiatement</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              [(ngModel)]="formData.isReferrable"
              name="isReferrable"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
            <span class="text-sm font-medium text-secondary">Service référençable (gagner des points)</span>
          </label>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" (click)="closeServiceModal()" class="px-6 py-2 text-secondary font-medium hover:bg-gray-100 rounded-md transition-colors">
            Annuler
          </button>
          <button type="submit" class="btn-primary">
            {{ editingService() ? 'Mettre à jour' : 'Créer le service' }}
          </button>
        </div>
      </form>
    </app-modal>
  `,
  styles: []
})
export class ProServicesComponent implements OnInit {
  services = signal<Service[]>([]);
  serviceModalOpen = signal(false);
  editingService = signal<Service | null>(null);
  
  categories = ['Coiffure', 'Esthétique', 'Manucure', 'Pédicure', 'Barbier', 'Maquillage', 'Soins du visage', 'Massage'];
  
  communes = [
    'Cocody', 'Plateau', 'Yopougon', 'Marcory', 'Treichville',
    'Adjamé', 'Abobo', 'Port-Bouët', 'Attécoubé', 'Koumassi'
  ];

  newAreaInput = '';

  formData = {
    name: '',
    description: '',
    categoryName: '',
    price: 0,
    duration: 30,
    locationType: 'SALON' as 'SALON' | 'HOME' | 'BOTH',
    homeServiceMarkup: 0,
    homeServiceMarkupPercent: 0,
    serviceAreas: [] as string[],
    isPublished: false,
    isReferrable: false,
    referralPoints: 0
  };

  publishedCount = computed(() => this.services().filter(s => s.isPublished).length);
  draftCount = computed(() => this.services().filter(s => !s.isPublished).length);
  referrableCount = computed(() => this.services().filter(s => s.isReferrable).length);

  constructor(
    private mockData: MockDataService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    const user = this.authService.user();
    if (user) {
      const businesses = this.mockData.getBusinesses();
      const business = businesses.find(b => b.professionalId === user.id);
      if (business) {
        this.services.set(business.services);
      }
    }
  }

  openAddModal(): void {
    this.editingService.set(null);
    this.formData = {
      name: '',
      description: '',
      categoryName: '',
      price: 0,
      duration: 30,
      locationType: 'SALON',
      homeServiceMarkup: 0,
      homeServiceMarkupPercent: 0,
      serviceAreas: [],
      isPublished: false,
      isReferrable: false,
      referralPoints: 0
    };
    this.serviceModalOpen.set(true);
  }

  editService(service: Service): void {
    this.editingService.set(service);
    this.formData = {
      name: service.name,
      description: service.description || '',
      categoryName: service.categoryName,
      price: service.price,
      duration: service.duration,
      locationType: service.isHomeService ? (service.isSalonService ? 'BOTH' : 'HOME') : 'SALON',
      homeServiceMarkup: service.homeServiceMarkup || 0,
      homeServiceMarkupPercent: service.homeServiceMarkupPercent || 0,
      serviceAreas: service.serviceAreas || [],
      isPublished: service.isPublished,
      isReferrable: service.isReferrable,
      referralPoints: service.referralPoints
    };
    this.serviceModalOpen.set(true);
  }

  closeServiceModal(): void {
    this.serviceModalOpen.set(false);
    this.editingService.set(null);
  }

  addServiceAreaByName(area: string): void {
    if (!this.formData.serviceAreas.includes(area)) {
      this.formData.serviceAreas.push(area);
    }
  }

  addServiceArea(event: Event): void {
    event.preventDefault();
    this.addServiceAreaFromInput();
  }

  addServiceAreaFromInput(): void {
    const value = this.newAreaInput.trim();
    if (value && !this.formData.serviceAreas.includes(value)) {
      this.formData.serviceAreas.push(value);
      this.newAreaInput = '';
    }
  }

  removeServiceArea(index: number): void {
    this.formData.serviceAreas.splice(index, 1);
  }

  calculateHomeServicePrice(): number {
    let markup = this.formData.homeServiceMarkup || 0;
    if (this.formData.homeServiceMarkupPercent) {
      markup = Math.max(markup, (this.formData.price * this.formData.homeServiceMarkupPercent) / 100);
    }
    return this.formData.price + markup;
  }

  saveService(): void {
    const user = this.authService.user();
    if (!user) return;

    const businesses = this.mockData.getBusinesses();
    const business = businesses.find(b => b.professionalId === user.id);
    
    if (!business) return;

    const serviceData: Partial<Service> = {
      businessId: business.id,
      name: this.formData.name,
      description: this.formData.description,
      categoryName: this.formData.categoryName,
      categoryId: `cat-${this.categories.indexOf(this.formData.categoryName) + 1}`,
      price: this.formData.price,
      duration: this.formData.duration,
      isPublished: this.formData.isPublished,
      isReferrable: this.formData.isReferrable,
      referralPoints: this.formData.referralPoints,
      isHomeService: this.formData.locationType === 'HOME' || this.formData.locationType === 'BOTH',
      isSalonService: this.formData.locationType === 'SALON' || this.formData.locationType === 'BOTH',
      homeServiceMarkup: this.formData.homeServiceMarkup,
      homeServiceMarkupPercent: this.formData.homeServiceMarkupPercent,
      serviceAreas: this.formData.serviceAreas
    };

    if (this.editingService()) {
      // Update
      this.mockData.updateService(this.editingService()!.id, serviceData);
      this.toast.success('Service mis à jour avec succès');
    } else {
      // Create
      this.mockData.addService(serviceData);
      this.toast.success('Service créé avec succès');
    }

    this.loadServices();
    this.closeServiceModal();
  }

  togglePublish(service: Service): void {
    this.mockData.toggleServicePublish(service.id);
    this.loadServices();
    this.toast.success(service.isPublished ? 'Service dépublié' : 'Service publié');
  }

  deleteService(service: Service): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${service.name}" ?`)) {
      this.mockData.deleteService(service.id);
      this.loadServices();
      this.toast.success('Service supprimé');
    }
  }
}
