import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Service, Business, HomeServiceCommune } from '../../../core/models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    FcfaPipe,
    ModalComponent
  ],
  template: `
    <div>
      <!-- En-tête -->
      <div class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-[28px] font-black text-[#11152f] m-0">Mes Services</h1>
          <p class="mt-1 text-base text-[#69708a]">Gérez vos prestations et vos tarifs</p>
        </div>
        <button (click)="openAddModal()"
          class="flex items-center gap-2 h-10 px-5 rounded-full bg-[#7c3aed] text-white text-sm font-black hover:bg-[#6d28d9] transition-colors flex-shrink-0">
          <lucide-icon name="plus" [size]="16" [strokeWidth]="2.5"></lucide-icon>
          Ajouter un service
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5">
          <div class="text-[28px] font-black text-[#11152f]">{{ services().length }}</div>
          <div class="text-sm font-bold text-[#69708a] mt-0.5">Total services</div>
        </div>
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5">
          <div class="text-[28px] font-black text-[#10b45e]">{{ publishedCount() }}</div>
          <div class="text-sm font-bold text-[#69708a] mt-0.5">Publiés</div>
        </div>
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5">
          <div class="text-[28px] font-black text-[#d97706]">{{ draftCount() }}</div>
          <div class="text-sm font-bold text-[#69708a] mt-0.5">Brouillons</div>
        </div>
        <div class="bg-white rounded-2xl border border-[#e7e9f4] p-5">
          <div class="text-[28px] font-black text-[#7c3aed]">{{ referrableCount() }}</div>
          <div class="text-sm font-bold text-[#69708a] mt-0.5">Référençables</div>
        </div>
      </div>

      <!-- Info Box -->
      <div class="flex items-start gap-3 bg-[#f0f7ff] border border-blue-200 rounded-2xl p-4 mb-6">
        <lucide-icon name="info" [size]="18" [strokeWidth]="2" class="text-blue-500 flex-shrink-0 mt-0.5"></lucide-icon>
        <p class="text-sm font-bold text-blue-800 m-0">
          Publiez vos services pour qu'ils soient visibles sur la marketplace.
          Activez "Référençable" pour gagner des points de parrainage.
        </p>
      </div>

      <!-- Table services -->
      <div class="bg-white rounded-2xl border border-[#e7e9f4] overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#e7e9f4]">
              <th class="px-6 py-4 text-left text-[13px] font-black text-[#69708a] uppercase tracking-wide">Service</th>
              <th class="px-4 py-4 text-left text-[13px] font-black text-[#69708a] uppercase tracking-wide hidden md:table-cell">Catégorie</th>
              <th class="px-4 py-4 text-left text-[13px] font-black text-[#69708a] uppercase tracking-wide hidden md:table-cell">Durée</th>
              <th class="px-4 py-4 text-right text-[13px] font-black text-[#69708a] uppercase tracking-wide">Prix</th>
              <th class="px-4 py-4 text-center text-[13px] font-black text-[#69708a] uppercase tracking-wide">Publié</th>
              <th class="px-6 py-4 text-right text-[13px] font-black text-[#69708a] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e7e9f4]">
            @for (service of services(); track service.id) {
              <tr class="hover:bg-[#faf9ff] transition-colors">
                <!-- Nom + description -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-[#f3e8ff] flex items-center justify-center flex-shrink-0">
                      <lucide-icon name="scissors" [size]="16" [strokeWidth]="2" class="text-[#7c3aed]"></lucide-icon>
                    </div>
                    <div>
                      <div class="text-sm font-black text-[#11152f]">{{ service.name }}</div>
                      @if (service.description) {
                        <div class="text-xs font-bold text-[#69708a] mt-0.5 max-w-[240px] truncate">{{ service.description }}</div>
                      }
                      @if (service.isHomeService) {
                        <div class="flex items-center gap-1 mt-1">
                          <lucide-icon name="home" [size]="11" [strokeWidth]="2" class="text-[#7c3aed]"></lucide-icon>
                          <span class="text-[11px] font-black text-[#7c3aed]">À domicile</span>
                        </div>
                      }
                    </div>
                  </div>
                </td>
                <!-- Catégorie -->
                <td class="px-4 py-4 hidden md:table-cell">
                  <span class="inline-flex items-center rounded-full bg-[#f0f1f6] px-3 py-1 text-xs font-black text-[#69708a]">
                    {{ service.categoryName }}
                  </span>
                </td>
                <!-- Durée -->
                <td class="px-4 py-4 hidden md:table-cell">
                  <div class="flex items-center gap-1.5 text-sm font-bold text-[#69708a]">
                    <lucide-icon name="clock" [size]="14" [strokeWidth]="2"></lucide-icon>
                    {{ service.duration }} min
                  </div>
                </td>
                <!-- Prix -->
                <td class="px-4 py-4 text-right">
                  <div class="text-base font-black text-[#7c3aed]">{{ service.price | fcfa }}</div>
                  @if (service.isHomeService && service.homeServiceMarkup) {
                    <div class="text-[11px] font-bold text-[#69708a]">+{{ service.homeServiceMarkup | fcfa:false }} dom.</div>
                  }
                </td>
                <!-- Toggle publié -->
                <td class="px-4 py-4 text-center">
                  <button (click)="togglePublish(service)" type="button"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                    [style.background]="service.isPublished ? '#7c3aed' : '#d9dbe9'"
                    [attr.aria-label]="service.isPublished ? 'Dépublier' : 'Publier'">
                    <span class="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform"
                      [style.transform]="service.isPublished ? 'translateX(22px)' : 'translateX(4px)'">
                    </span>
                  </button>
                </td>
                <!-- Actions -->
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button (click)="editService(service)"
                      class="w-8 h-8 rounded-full border border-[#e7e9f4] flex items-center justify-center text-[#69708a] hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors">
                      <lucide-icon name="pencil" [size]="14" [strokeWidth]="2"></lucide-icon>
                    </button>
                    <button (click)="deleteService(service)"
                      class="w-8 h-8 rounded-full border border-[#e7e9f4] flex items-center justify-center text-[#69708a] hover:border-red-300 hover:text-red-500 transition-colors">
                      <lucide-icon name="trash-2" [size]="14" [strokeWidth]="2"></lucide-icon>
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>

        @if (services().length === 0) {
          <div class="py-16 text-center">
            <lucide-icon name="scissors" [size]="40" [strokeWidth]="1.5" class="text-[#d9dbe9] mx-auto mb-3"></lucide-icon>
            <p class="text-base font-bold text-[#69708a]">Aucun service configuré</p>
            <p class="text-sm font-bold text-[#69708a] mt-1">Cliquez sur "Ajouter un service" pour commencer</p>
          </div>
        }
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <app-modal
      [isOpen]="serviceModalOpen()"
      [title]="editingService() ? 'Modifier le service' : 'Ajouter un service'"
      [showFooter]="false"
      size="lg"
      (closed)="closeServiceModal()">
      <form (ngSubmit)="saveService()" class="space-y-5">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Nom du service *</label>
            <input type="text" [(ngModel)]="formData.name" name="name" required
              class="w-full h-10 rounded-xl border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
          </div>
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Catégorie *</label>
            <select [(ngModel)]="formData.categoryName" name="categoryName" required
              class="w-full h-10 rounded-xl border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 cursor-pointer">
              <option value="">Sélectionner</option>
              @for (cat of categories; track cat) { <option [value]="cat">{{ cat }}</option> }
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-black text-[#11152f] mb-2">Description</label>
          <textarea [(ngModel)]="formData.description" name="description" rows="2"
            placeholder="Décrivez votre service..."
            class="w-full rounded-xl border border-[#e7e9f4] px-4 py-2.5 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 resize-none"></textarea>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Prix de base (FCFA) *</label>
            <input type="number" [(ngModel)]="formData.price" name="price" required min="0"
              class="w-full h-10 rounded-xl border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
          </div>
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Durée (min) *</label>
            <input type="number" [(ngModel)]="formData.duration" name="duration" required min="15" step="15"
              class="w-full h-10 rounded-xl border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
          </div>
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Points parrainage</label>
            <input type="number" [(ngModel)]="formData.referralPoints" name="referralPoints" min="0"
              class="w-full h-10 rounded-xl border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
          </div>
        </div>

        <!-- Lieu de prestation -->
        <div class="bg-[#f7f5ff] rounded-2xl p-4">
          <h3 class="text-sm font-black text-[#11152f] mb-3">Lieu de prestation</h3>
          <div class="grid grid-cols-3 gap-2">
            @for (loc of locationOptions; track loc.value) {
              <label class="flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all text-center"
                     [class.border-[#7c3aed]]="formData.locationType === loc.value"
                     [class.bg-white]="formData.locationType === loc.value"
                     [class.border-[#e7e9f4]]="formData.locationType !== loc.value">
                <input type="radio" name="locationType" [value]="loc.value"
                  [(ngModel)]="formData.locationType" class="sr-only">
                <lucide-icon [name]="loc.icon" [size]="20" [strokeWidth]="1.75"
                  [class.text-[#7c3aed]]="formData.locationType === loc.value"
                  [class.text-[#69708a]]="formData.locationType !== loc.value"></lucide-icon>
                <span class="text-xs font-black"
                  [class.text-[#7c3aed]]="formData.locationType === loc.value"
                  [class.text-[#69708a]]="formData.locationType !== loc.value">{{ loc.label }}</span>
              </label>
            }
          </div>
        </div>

        <!-- Majoration domicile -->
        @if (formData.locationType === 'HOME' || formData.locationType === 'BOTH') {
          <div class="bg-[#f3e8ff] border border-[#ddd6fe] rounded-2xl p-4">
            <h3 class="text-sm font-black text-[#11152f] mb-3">Majoration à domicile</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-black text-[#69708a] mb-1.5">Montant fixe (FCFA)</label>
                <input type="number" [(ngModel)]="formData.homeServiceMarkup" name="homeServiceMarkup" min="0" placeholder="Ex: 3000"
                  class="w-full h-10 rounded-xl border border-[#ddd6fe] px-4 text-sm font-bold text-[#303653] bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
              </div>
              <div>
                <label class="block text-xs font-black text-[#69708a] mb-1.5">Ou en % du prix</label>
                <input type="number" [(ngModel)]="formData.homeServiceMarkupPercent" name="homeServiceMarkupPercent" min="0" max="100" placeholder="Ex: 20"
                  class="w-full h-10 rounded-xl border border-[#ddd6fe] px-4 text-sm font-bold text-[#303653] bg-white outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
              </div>
            </div>
            @if (formData.homeServiceMarkup || formData.homeServiceMarkupPercent) {
              <div class="mt-3 bg-white rounded-xl p-3 flex items-center justify-between">
                <span class="text-sm font-bold text-[#69708a]">Prix total à domicile</span>
                <span class="text-base font-black text-[#7c3aed]">{{ calculateHomeServicePrice() | fcfa }}</span>
              </div>
            }
          </div>
        }

        <!-- Zones de desserte -->
        @if (formData.locationType === 'HOME' || formData.locationType === 'BOTH') {
          <div>
            <label class="block text-sm font-black text-[#11152f] mb-2">Zones de desserte</label>
            <div class="border border-[#e7e9f4] rounded-2xl p-4">
              <div class="flex flex-wrap gap-2 mb-3">
                @for (area of formData.serviceAreas; track area; let i = $index) {
                  <span class="inline-flex items-center gap-1.5 bg-[#f3e8ff] text-[#7c3aed] px-3 py-1 rounded-full text-xs font-black">
                    {{ area }}
                    <button type="button" (click)="removeServiceArea(i)"
                      class="w-3.5 h-3.5 rounded-full hover:bg-[#7c3aed] hover:text-white flex items-center justify-center transition-colors">
                      <lucide-icon name="x" [size]="9" [strokeWidth]="3"></lucide-icon>
                    </button>
                  </span>
                }
              </div>
              <div class="flex gap-2 mb-3">
                <input type="text" [(ngModel)]="newAreaInput" (keydown.enter)="addServiceAreaFromInput()"
                  placeholder="Ajouter une commune ou quartier..."
                  class="flex-1 h-9 rounded-full border border-[#e7e9f4] px-4 text-sm font-bold text-[#303653] outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20">
                <button type="button" (click)="addServiceAreaFromInput()"
                  class="h-9 px-4 rounded-full bg-[#7c3aed] text-white text-xs font-black hover:bg-[#6d28d9] transition-colors">
                  Ajouter
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5">
                @for (commune of communes; track commune) {
                  <button type="button" (click)="addServiceAreaByName(commune)"
                    class="px-3 py-1 rounded-full text-xs font-bold transition-colors"
                    [class.bg-[#7c3aed]]="formData.serviceAreas.includes(commune)"
                    [class.text-white]="formData.serviceAreas.includes(commune)"
                    [class.bg-[#f0f1f6]]="!formData.serviceAreas.includes(commune)"
                    [class.text-[#69708a]]="!formData.serviceAreas.includes(commune)">
                    {{ commune }}
                  </button>
                }
              </div>
            </div>
          </div>
        }

        <!-- Options -->
        <div class="flex flex-wrap items-center gap-6 p-4 bg-[#f7f5ff] rounded-2xl">
          <label class="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" [(ngModel)]="formData.isPublished" name="isPublished"
              class="w-4 h-4 accent-[#7c3aed]">
            <span class="text-sm font-black text-[#11152f]">Publier immédiatement</span>
          </label>
          <label class="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" [(ngModel)]="formData.isReferrable" name="isReferrable"
              class="w-4 h-4 accent-[#7c3aed]">
            <span class="text-sm font-black text-[#11152f]">Service référençable</span>
          </label>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-[#e7e9f4]">
          <button type="button" (click)="closeServiceModal()"
            class="h-10 px-5 rounded-full border border-[#e7e9f4] text-sm font-bold text-[#69708a] hover:bg-[#f0f1f6] transition-colors">
            Annuler
          </button>
          <button type="submit"
            class="h-10 px-5 rounded-full bg-[#7c3aed] text-white text-sm font-black hover:bg-[#6d28d9] transition-colors">
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

  readonly locationOptions: { value: 'SALON' | 'HOME' | 'BOTH'; label: string; icon: string }[] = [
    { value: 'SALON', label: 'Au salon', icon: 'store' },
    { value: 'HOME',  label: 'À domicile', icon: 'home' },
    { value: 'BOTH',  label: 'Les deux', icon: 'map-pin' },
  ];
  
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
