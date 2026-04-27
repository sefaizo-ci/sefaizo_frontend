import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Business, WorkingHour, HomeServiceCommune } from '../../../core/models';
import { ToastService } from '../../../shared/ui/toast/toast.component';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

const DAY_LABELS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const THEME_COLORS = [
  { label: 'Rose (défaut)', value: '#e91e63' },
  { label: 'Violet', value: '#7c3aed' },
  { label: 'Bleu', value: '#2563eb' },
  { label: 'Vert', value: '#16a34a' },
  { label: 'Orange', value: '#ea580c' },
  { label: 'Dorée', value: '#d97706' },
];

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf96ef9c4?w=1200&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80',
];

@Component({
  selector: 'app-pro-boutique',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FcfaPipe],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-secondary">Ma Boutique</h1>
          <p class="text-secondary-gray mt-1">Personnalisez l'apparence et les informations de votre salon</p>
        </div>
        @if (business()) {
          <a [routerLink]="['/pro', business()!.slug]" target="_blank"
            class="flex items-center gap-2 text-sm text-primary font-medium border border-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Voir ma boutique publique
          </a>
        }
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        @for (tab of tabs; track tab.id) {
          <button
            (click)="activeTab.set(tab.id)"
            [class]="activeTab() === tab.id ? 'bg-white text-secondary font-semibold shadow-sm' : 'text-secondary-gray hover:text-secondary'"
            class="flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all">
            {{ tab.label }}
          </button>
        }
      </div>

      <!-- Tab: Apparence -->
      @if (activeTab() === 'apparence') {
        <div class="space-y-6">
          <!-- Cover Image -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b">
              <h2 class="font-semibold text-secondary">Image de couverture</h2>
              <p class="text-sm text-secondary-gray mt-1">L'image principale qui apparaît en haut de votre boutique</p>
            </div>

            <!-- Preview -->
            <div class="relative h-48 bg-gray-200 overflow-hidden">
              @if (form.coverImage) {
                <img [src]="form.coverImage" alt="Couverture" class="w-full h-full object-cover">
              } @else {
                <div class="w-full h-full flex items-center justify-center text-secondary-gray">
                  <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              }
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div class="p-6">
              <p class="text-sm font-medium text-secondary mb-3">Choisir une image :</p>
              <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
                @for (img of coverImages; track img) {
                  <button
                    (click)="form.coverImage = img"
                    [class]="form.coverImage === img ? 'ring-2 ring-primary ring-offset-2' : ''"
                    class="relative h-20 rounded-lg overflow-hidden group">
                    <img [src]="img" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                  </button>
                }
                <button
                  (click)="form.coverImage = ''"
                  [class]="!form.coverImage ? 'ring-2 ring-gray-400 ring-offset-2' : ''"
                  class="h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-secondary-gray hover:border-gray-400 transition-colors">
                  <div class="text-center">
                    <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span class="text-xs">Aucune</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Logo / Avatar -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="font-semibold text-secondary mb-1">Logo / Photo de profil</h2>
            <p class="text-sm text-secondary-gray mb-4">Apparaît sur votre carte et en haut de votre boutique</p>

            <div class="flex items-center gap-6">
              <div class="w-24 h-24 rounded-2xl overflow-hidden bg-primary/10 flex-shrink-0 flex items-center justify-center border-4 border-white shadow-md">
                @if (form.avatar) {
                  <img [src]="form.avatar" alt="Logo" class="w-full h-full object-cover">
                } @else {
                  <span class="text-3xl font-bold text-primary">{{ business()?.name?.charAt(0) || 'S' }}</span>
                }
              </div>
              <div class="flex-1">
                <div class="grid grid-cols-4 gap-2">
                  @for (avatar of avatarOptions; track avatar) {
                    <button
                      (click)="form.avatar = avatar"
                      [class]="form.avatar === avatar ? 'ring-2 ring-primary ring-offset-1' : ''"
                      class="w-14 h-14 rounded-xl overflow-hidden">
                      <img [src]="avatar" alt="" class="w-full h-full object-cover">
                    </button>
                  }
                  <button
                    (click)="form.avatar = ''"
                    class="w-14 h-14 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-secondary-gray hover:border-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Theme Color -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="font-semibold text-secondary mb-1">Couleur de la boutique</h2>
            <p class="text-sm text-secondary-gray mb-4">Couleur principale utilisée dans votre page boutique</p>

            <div class="flex flex-wrap gap-3">
              @for (color of themeColors; track color.value) {
                <button
                  (click)="form.themeColor = color.value"
                  [style.background]="color.value"
                  [class]="form.themeColor === color.value ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' : 'hover:scale-105'"
                  class="w-10 h-10 rounded-full transition-all"
                  [title]="color.label">
                </button>
              }
            </div>
            @if (form.themeColor) {
              <div class="mt-3 flex items-center gap-2">
                <div class="w-4 h-4 rounded-full" [style.background]="form.themeColor"></div>
                <span class="text-sm text-secondary-gray">{{ getColorLabel(form.themeColor) }}</span>
              </div>
            }
          </div>

          <!-- Gallery -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="font-semibold text-secondary mb-1">Galerie photos</h2>
            <p class="text-sm text-secondary-gray mb-4">Montrez votre salon et vos réalisations (max 8 photos)</p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              @for (photo of form.gallery; track photo; let i = $index) {
                <div class="relative group aspect-square rounded-xl overflow-hidden">
                  <img [src]="photo" alt="" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button (click)="removeGalleryPhoto(i)" class="bg-white text-red-500 rounded-full p-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              }

              @if (form.gallery.length < 8) {
                <button
                  (click)="addGalleryPhoto()"
                  class="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-secondary-gray hover:border-primary hover:text-primary transition-colors">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span class="text-xs">Ajouter</span>
                </button>
              }
            </div>
          </div>
        </div>
      }

      <!-- Tab: Informations -->
      @if (activeTab() === 'informations') {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
          <h2 class="font-semibold text-secondary text-lg border-b pb-4">Informations de la boutique</h2>

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Nom de la boutique *</label>
              <input type="text" [(ngModel)]="form.name" placeholder="Ex: Salon Beauty Queens"
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Type d'établissement</label>
              <select [(ngModel)]="form.businessType"
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                <option value="SALON">Salon fixe</option>
                <option value="FREELANCE">Freelance / À domicile</option>
                <option value="HYBRID">Hybride (salon + domicile)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-secondary mb-2">Description de la boutique *</label>
            <textarea [(ngModel)]="form.description" rows="4"
              placeholder="Présentez votre salon, vos spécialités, votre ambiance..."
              class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none">
            </textarea>
            <div class="text-xs text-secondary-gray mt-1">{{ form.description.length }} / 500 caractères</div>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Téléphone *</label>
              <input type="tel" [(ngModel)]="form.phone" placeholder="+225 07 00 00 00 00"
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Email professionnel</label>
              <input type="email" [(ngModel)]="form.email" placeholder="contact@monsalon.ci"
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Adresse</label>
              <input type="text" [(ngModel)]="form.address" placeholder="Rue, quartier, numéro..."
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">Commune</label>
              <select [(ngModel)]="form.city"
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                <option value="">Sélectionner une commune</option>
                @for (commune of communes; track commune) {
                  <option [value]="commune">{{ commune }}</option>
                }
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-secondary mb-2">Spécialités / Catégories</label>
            <div class="flex flex-wrap gap-2">
              @for (cat of allCategories; track cat) {
                <button
                  type="button"
                  (click)="toggleCategory(cat)"
                  [class]="form.categories.includes(cat) ? 'bg-primary text-white border-primary' : 'bg-white text-secondary-gray border-gray-200 hover:border-primary hover:text-primary'"
                  class="px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors">
                  {{ cat }}
                </button>
              }
            </div>
          </div>
        </div>
      }

      <!-- Tab: Horaires -->
      @if (activeTab() === 'horaires') {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-semibold text-secondary text-lg mb-1">Horaires d'ouverture</h2>
          <p class="text-sm text-secondary-gray mb-6">Définissez vos jours et heures d'activité</p>

          <div class="space-y-3">
            @for (day of form.workingHours; track day.dayOfWeek) {
              <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div class="w-24 flex-shrink-0">
                  <span class="text-sm font-medium text-secondary">{{ getDayLabel(day.dayOfWeek) }}</span>
                </div>

                <label class="flex items-center gap-2 cursor-pointer">
                  <div class="relative">
                    <input type="checkbox" [(ngModel)]="day.isOpen" class="sr-only">
                    <div [class]="day.isOpen ? 'bg-primary' : 'bg-gray-200'" class="w-10 h-5 rounded-full transition-colors">
                      <div [class]="day.isOpen ? 'translate-x-5' : 'translate-x-0'" class="w-5 h-5 bg-white rounded-full shadow transform transition-transform border border-gray-200"></div>
                    </div>
                  </div>
                  <span class="text-sm" [class]="day.isOpen ? 'text-primary font-medium' : 'text-secondary-gray'">
                    {{ day.isOpen ? 'Ouvert' : 'Fermé' }}
                  </span>
                </label>

                @if (day.isOpen && day.slots && day.slots.length > 0) {
                  <div class="flex items-center gap-2 flex-1 flex-wrap">
                    @for (slot of day.slots; track slot.startTime) {
                      <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border">
                        <input type="time" [(ngModel)]="slot.startTime"
                          class="text-sm border-none bg-transparent focus:outline-none w-20">
                        <span class="text-secondary-gray text-xs">→</span>
                        <input type="time" [(ngModel)]="slot.endTime"
                          class="text-sm border-none bg-transparent focus:outline-none w-20">
                      </div>
                    }
                  </div>
                }

                @if (!day.isOpen) {
                  <span class="text-sm text-secondary-gray flex-1">Pas de service ce jour</span>
                }
              </div>
            }
          </div>

          <div class="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-sm text-blue-700">
                Les créneaux définis ici déterminent les disponibilités visibles par vos clients lors de la réservation.
              </p>
            </div>
          </div>
        </div>
      }

      <!-- Tab: Zones -->
      @if (activeTab() === 'zones') {
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div>
            <h2 class="font-semibold text-secondary text-lg mb-1">Zones de déplacement</h2>
            <p class="text-sm text-secondary-gray">Définissez les communes où vous proposez des services à domicile et les frais associés</p>
          </div>

          @if (form.businessType === 'SALON') {
            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p class="text-sm text-yellow-800">
                Votre boutique est configurée en mode "Salon fixe". Changez le type vers "Hybride" ou "Freelance" pour activer les services à domicile.
              </p>
            </div>
          } @else {
            <div class="space-y-3">
              @for (zone of form.homeServiceCommunes; track zone.commune; let i = $index) {
                <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
                  <select [(ngModel)]="zone.commune"
                    class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    @for (commune of communes; track commune) {
                      <option [value]="commune">{{ commune }}</option>
                    }
                  </select>
                  <div class="flex items-center gap-2">
                    <input type="number" [(ngModel)]="zone.fee" min="0" step="500" placeholder="Frais (FCFA)"
                      class="w-36 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    <span class="text-xs text-secondary-gray whitespace-nowrap">FCFA</span>
                  </div>
                  <button (click)="removeZone(i)" class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              }

              <button (click)="addZone()"
                class="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-secondary-gray hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Ajouter une commune
              </button>
            </div>

            @if (form.homeServiceCommunes.length > 0) {
              <div class="p-4 bg-gray-50 rounded-xl">
                <p class="text-sm font-medium text-secondary mb-2">Récapitulatif :</p>
                <div class="flex flex-wrap gap-2">
                  @for (zone of form.homeServiceCommunes; track zone.commune) {
                    <span class="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {{ zone.commune }} — {{ zone.fee | fcfa:false }} FCFA
                    </span>
                  }
                </div>
              </div>
            }
          }
        </div>
      }

      <!-- Save Button -->
      <div class="flex justify-end gap-3 pt-2">
        <button (click)="resetForm()" class="px-5 py-2.5 text-secondary-gray font-medium hover:bg-gray-100 rounded-xl transition-colors text-sm">
          Annuler les modifications
        </button>
        <button (click)="saveChanges()" [disabled]="saving()"
          class="btn-primary px-6 py-2.5 flex items-center gap-2 disabled:opacity-60">
          @if (saving()) {
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          }
          {{ saving() ? 'Sauvegarde...' : 'Sauvegarder les modifications' }}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ProBoutiqueComponent implements OnInit {
  activeTab = signal<string>('apparence');
  saving = signal(false);

  tabs = [
    { id: 'apparence', label: 'Apparence' },
    { id: 'informations', label: 'Informations' },
    { id: 'horaires', label: 'Horaires' },
    { id: 'zones', label: 'Zones' },
  ];

  themeColors = THEME_COLORS;
  coverImages = COVER_IMAGES;
  avatarOptions = [
    'https://i.pravatar.cc/150?img=10',
    'https://i.pravatar.cc/150?img=20',
    'https://i.pravatar.cc/150?img=30',
    'https://i.pravatar.cc/150?img=40',
    'https://i.pravatar.cc/150?img=50',
    'https://i.pravatar.cc/150?img=60',
    'https://i.pravatar.cc/150?img=70',
    'https://i.pravatar.cc/150?img=80',
  ];

  communes = [
    'Cocody', 'Plateau', 'Yopougon', 'Marcory', 'Treichville',
    'Adjamé', 'Abobo', 'Port-Bouët', 'Attécoubé', 'Koumassi'
  ];

  allCategories = ['Coiffure', 'Esthétique', 'Manucure', 'Pédicure', 'Barbier', 'Maquillage', 'Soins du visage', 'Massage'];

  form = {
    name: '',
    description: '',
    businessType: 'SALON' as 'SALON' | 'FREELANCE' | 'HYBRID',
    phone: '',
    email: '',
    address: '',
    city: '',
    categories: [] as string[],
    coverImage: '',
    avatar: '',
    themeColor: '#e91e63',
    gallery: [] as string[],
    workingHours: [] as WorkingHour[],
    homeServiceCommunes: [] as HomeServiceCommune[],
  };

  private _business: Business | null = null;

  constructor(
    private authService: AuthService,
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  business = computed(() => {
    const u = this.authService.user();
    if (!u) return null;
    return this.mockData.getBusinesses().find(b => b.professionalId === u.id) ?? null;
  });

  ngOnInit(): void {
    const b = this.business();
    if (b) {
      this._business = b;
      this.form = {
        name: b.name,
        description: b.description || '',
        businessType: b.businessType,
        phone: b.phone,
        email: b.email,
        address: b.address || '',
        city: b.city,
        categories: [...b.categories],
        coverImage: b.coverImage || '',
        avatar: b.avatar || '',
        themeColor: '#e91e63',
        gallery: [
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
          'https://images.unsplash.com/photo-1487412947147-5cebf96ef9c4?w=400&q=80',
        ],
        workingHours: b.workingHours.length > 0 ? b.workingHours.map(wh => ({
          ...wh,
          slots: wh.slots ? [...wh.slots] : [{ startTime: '09:00', endTime: '18:00' }]
        })) : this.defaultWorkingHours(),
        homeServiceCommunes: [...(b.homeServiceCommunes || [])],
      };
    } else {
      this.form.workingHours = this.defaultWorkingHours();
    }
  }

  private defaultWorkingHours(): WorkingHour[] {
    return [0, 1, 2, 3, 4, 5, 6].map(day => ({
      dayOfWeek: day,
      isOpen: day !== 0,
      slots: [{ startTime: '09:00', endTime: '18:00' }]
    }));
  }

  getDayLabel(dayOfWeek: number): string {
    return DAY_LABELS[dayOfWeek];
  }

  getColorLabel(value: string): string {
    return THEME_COLORS.find(c => c.value === value)?.label ?? value;
  }

  toggleCategory(cat: string): void {
    const idx = this.form.categories.indexOf(cat);
    if (idx >= 0) {
      this.form.categories.splice(idx, 1);
    } else {
      this.form.categories.push(cat);
    }
  }

  addGalleryPhoto(): void {
    const samples = [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80',
    ];
    const next = samples.find(s => !this.form.gallery.includes(s)) || samples[0];
    this.form.gallery.push(next);
  }

  removeGalleryPhoto(index: number): void {
    this.form.gallery.splice(index, 1);
  }

  addZone(): void {
    const usedCommunes = this.form.homeServiceCommunes.map(z => z.commune);
    const available = this.communes.find(c => !usedCommunes.includes(c)) ?? this.communes[0];
    this.form.homeServiceCommunes.push({ commune: available, fee: 2000 });
  }

  removeZone(index: number): void {
    this.form.homeServiceCommunes.splice(index, 1);
  }

  resetForm(): void {
    this.ngOnInit();
    this.toast.info('Modifications annulées');
  }

  saveChanges(): void {
    if (!this.form.name.trim()) {
      this.toast.error('Le nom de la boutique est requis');
      return;
    }

    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      this.toast.success('Boutique mise à jour avec succès !');
    }, 900);
  }
}
