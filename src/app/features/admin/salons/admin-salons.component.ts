import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

type SalonStatus = 'actif' | 'en_attente' | 'suspendu' | 'nouveau';
type KycStatus = 'verifie' | 'en_cours' | 'rejete' | 'non_soumis';
type FilterTab = 'tous' | 'en_attente' | 'actifs' | 'inactifs';

interface SalonSoumission {
  id: string;
  logo: string;
  nom: string;
  sousNom: string;
  proprietaire: string;
  commune: string;
  categorie: string;
  heureId: string;
  kyc: KycStatus;
  statut: SalonStatus;
  phone: string;
  adresse: string;
  email: string;
  photos: string[];
  services: string[];
  createdAt: string;
  docs: { label: string; url: string; ok: boolean }[];
}

@Component({
  selector: 'app-admin-salons',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex h-full min-h-screen bg-[#f8f7fc]">

      <!-- ══ LISTE ══ -->
      <div class="flex-1 flex flex-col min-w-0 p-6">

        <!-- En-tête page -->
        <div class="mb-5">
          <h1 class="text-xl font-black" style="color:#111827">Salons & Établissements</h1>
          <p class="text-sm" style="color:#6b7280">Vérifiez et validez les demandes d'inscription des salons</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mb-5">
          <div class="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm">
              <lucide-icon name="store" [size]="18" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
            <div>
              <div class="text-2xl font-black" style="color:#111827">{{ stats.actifs }}</div>
              <div class="text-xs" style="color:#16a34a">actifs</div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm">
              <lucide-icon name="clock" [size]="18" [strokeWidth]="1.75" style="color:#111827"></lucide-icon>
            </div>
            <div>
              <div class="text-2xl font-black" style="color:#111827">{{ stats.enAttente }}</div>
              <div class="text-xs" style="color:#d97706">en attente</div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm">
              <lucide-icon name="ban" [size]="18" [strokeWidth]="1.75" style="color:#111827"></lucide-icon>
            </div>
            <div>
              <div class="text-2xl font-black" style="color:#111827">{{ stats.suspendus }}</div>
              <div class="text-xs" style="color:#dc2626">suspendus</div>
            </div>
          </div>
        </div>

        <!-- Filtres + Recherche -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4">
          <!-- Tabs -->
          <div class="flex border-b border-gray-100 px-4">
            @for (tab of tabs; track tab.key) {
              <button (click)="activeTab.set(tab.key)"
                      class="px-4 py-3.5 text-sm font-semibold transition-all relative whitespace-nowrap"
                      [style.color]="activeTab() === tab.key ? '#a855f7' : '#6b7280'">
                {{ tab.label }}
                @if (tab.count > 0) {
                  <span class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold"
                        [style.background]="activeTab() === tab.key ? '#f3e8ff' : '#f3f4f6'"
                        [style.color]="activeTab() === tab.key ? '#a855f7' : '#9ca3af'">
                    {{ tab.count }}
                  </span>
                }
                @if (activeTab() === tab.key) {
                  <div class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                       style="background:#a855f7"></div>
                }
              </button>
            }
          </div>
          <!-- Barre de recherche -->
          <div class="flex items-center gap-3 px-4 py-3">
            <div class="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <lucide-icon name="search" [size]="15" [strokeWidth]="2" style="color:#9ca3af"></lucide-icon>
              <input [(ngModel)]="search" type="text" placeholder="Rechercher un salon..."
                     class="flex-1 bg-transparent text-sm outline-none"
                     style="color:#111827">
            </div>
            <button class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all hover:border-purple-300"
                    style="border-color:#e5e7eb;color:#374151">
              <lucide-icon name="sliders-horizontal" [size]="14" [strokeWidth]="2"></lucide-icon>
              Filtres
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr style="border-bottom:1px solid #f3f4f6;background:#fafafa">
                  <th class="px-4 py-3 text-left">
                    <input type="checkbox" class="rounded" style="accent-color:#a855f7">
                  </th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Logo</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Nom salon</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Propriétaire</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Commune</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Catégorie</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">KYC</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Statut</th>
                  <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (salon of filteredSalons(); track salon.id) {
                  <tr (click)="selectSalon(salon)"
                      class="transition-colors cursor-pointer"
                      [style.background]="selectedSalon()?.id === salon.id ? '#faf5ff' : 'white'"
                      style="border-bottom:1px solid #f9fafb">
                    <td class="px-4 py-3">
                      <input type="checkbox" class="rounded" style="accent-color:#a855f7"
                             (click)="$event.stopPropagation()">
                    </td>
                    <td class="px-3 py-3">
                      <div class="w-9 h-9 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="scissors" [size]="16" [strokeWidth]="1.5" style="color:#a855f7"></lucide-icon>
                      </div>
                    </td>
                    <td class="px-3 py-3">
                      <div class="font-semibold text-sm" style="color:#111827">{{ salon.nom }}</div>
                      <div class="text-xs" style="color:#9ca3af">{{ salon.sousNom }}</div>
                    </td>
                    <td class="px-3 py-3 text-sm" style="color:#374151">{{ salon.proprietaire }}</td>
                    <td class="px-3 py-3 text-sm" style="color:#374151">{{ salon.commune }}</td>
                    <td class="px-3 py-3">
                      <span class="text-xs px-2 py-1 rounded-full font-medium"
                            style="background:#f3e8ff;color:#7c3aed">{{ salon.categorie }}</span>
                    </td>
                    <td class="px-3 py-3">
                      <span class="text-xs px-2 py-1 rounded-full font-semibold"
                            [style.background]="kycBg(salon.kyc)"
                            [style.color]="kycColor(salon.kyc)">
                        {{ kycLabel(salon.kyc) }}
                      </span>
                    </td>
                    <td class="px-3 py-3">
                      <span class="text-xs px-2.5 py-1 rounded-full font-semibold"
                            [style.background]="statutBg(salon.statut)"
                            [style.color]="statutColor(salon.statut)">
                        {{ statutLabel(salon.statut) }}
                      </span>
                    </td>
                    <td class="px-3 py-3">
                      <button (click)="openDocModal(salon); $event.stopPropagation()"
                              class="p-1.5 rounded-lg transition-colors hover:bg-purple-50"
                              style="color:#a855f7"
                              title="Voir les documents">
                        <lucide-icon name="eye" [size]="15" [strokeWidth]="2"></lucide-icon>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span class="text-xs" style="color:#9ca3af">
              Affichage de 1 à {{ filteredSalons().length }} salons
            </span>
            <div class="flex items-center gap-1">
              <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs hover:bg-gray-100" style="color:#6b7280">
                <lucide-icon name="chevron-left" [size]="14" [strokeWidth]="2"></lucide-icon>
              </button>
              <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-white"
                      style="background:#a855f7">1</button>
              <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs hover:bg-gray-100" style="color:#6b7280">2</button>
              <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs hover:bg-gray-100" style="color:#6b7280">
                <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- ══ PANEL DÉTAIL ══ -->
      @if (selectedSalon()) {
        <div class="w-[360px] flex-shrink-0 border-l border-gray-100 bg-white flex flex-col overflow-y-auto"
             style="max-height:100vh;position:sticky;top:0">

          <!-- Header panel -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span class="font-bold text-sm" style="color:#111827">Détails du salon</span>
            <button (click)="selectedSalon.set(null)"
                    class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    style="color:#9ca3af">
              <lucide-icon name="x" [size]="15" [strokeWidth]="2"></lucide-icon>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto">
            <!-- Nom + badge statut -->
            <div class="px-5 pt-4 pb-3 border-b border-gray-100">
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="font-black text-base" style="color:#111827">{{ selectedSalon()!.nom }}</div>
                <span class="text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0"
                      [style.background]="statutBg(selectedSalon()!.statut)"
                      [style.color]="statutColor(selectedSalon()!.statut)">
                  {{ statutLabel(selectedSalon()!.statut) }}
                </span>
              </div>
              <div class="space-y-1.5">
                <div class="flex items-center gap-2 text-xs" style="color:#6b7280">
                  <lucide-icon name="phone" [size]="12" [strokeWidth]="2"></lucide-icon>
                  {{ selectedSalon()!.phone }}
                </div>
                <div class="flex items-center gap-2 text-xs" style="color:#6b7280">
                  <lucide-icon name="map-pin" [size]="12" [strokeWidth]="2"></lucide-icon>
                  {{ selectedSalon()!.adresse }}
                </div>
                <div class="flex items-center gap-2 text-xs" style="color:#6b7280">
                  <lucide-icon name="mail" [size]="12" [strokeWidth]="2"></lucide-icon>
                  {{ selectedSalon()!.email }}
                </div>
              </div>
            </div>

            <!-- Photos du salon -->
            <div class="px-5 py-3 border-b border-gray-100">
              <div class="flex items-center justify-between mb-2.5">
                <span class="text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">Photos du salon</span>
                <span class="text-xs" style="color:#a855f7">Voir tout</span>
              </div>
              <div class="grid grid-cols-3 gap-1.5">
                @for (photo of salonPhotos; track photo) {
                  <div class="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img [src]="photo" alt="photo salon"
                         class="w-full h-full object-cover"
                         (error)="onImgError($event)">
                  </div>
                }
              </div>
            </div>

            <!-- Informations -->
            <div class="px-5 py-3 border-b border-gray-100">
              <div class="text-xs font-bold uppercase tracking-wider mb-2.5" style="color:#9ca3af">Informations</div>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <span class="text-xs font-semibold w-20 flex-shrink-0" style="color:#6b7280">Nom</span>
                  <span class="text-xs" style="color:#111827">{{ selectedSalon()!.nom }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-xs font-semibold w-20 flex-shrink-0" style="color:#6b7280">Propriétaire</span>
                  <span class="text-xs" style="color:#111827">{{ selectedSalon()!.proprietaire }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-xs font-semibold w-20 flex-shrink-0" style="color:#6b7280">Adresse</span>
                  <span class="text-xs" style="color:#111827">{{ selectedSalon()!.adresse }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-xs font-semibold w-20 flex-shrink-0" style="color:#6b7280">Téléphone</span>
                  <span class="text-xs" style="color:#111827">{{ selectedSalon()!.phone }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-xs font-semibold w-20 flex-shrink-0" style="color:#6b7280">Services</span>
                  <div class="flex flex-wrap gap-1">
                    @for (s of selectedSalon()!.services; track s) {
                      <span class="text-xs px-2 py-0.5 rounded-full"
                            style="background:#f3e8ff;color:#7c3aed">{{ s }}</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Documents KYC -->
            <div class="px-5 py-3 border-b border-gray-100">
              <div class="text-xs font-bold uppercase tracking-wider mb-2.5" style="color:#9ca3af">Documents KYC</div>
              <div class="space-y-2">
                @for (doc of selectedSalon()!.docs; track doc.label) {
                  <div class="flex items-center justify-between p-2.5 rounded-xl"
                       style="background:#f9fafb;border:1px solid #f3f4f6">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm">
                        <lucide-icon [name]="doc.ok ? 'file-check' : 'file-clock'" [size]="13" [strokeWidth]="1.75"
                                     [style.color]="doc.ok ? '#a855f7' : '#111827'"></lucide-icon>
                      </div>
                      <span class="text-xs font-semibold" style="color:#374151">{{ doc.label }}</span>
                    </div>
                    <span class="text-xs font-semibold"
                          [style.color]="doc.ok ? '#16a34a' : '#d97706'">
                      {{ doc.ok ? 'Vérifié' : 'En attente' }}
                    </span>
                  </div>
                }
              </div>
            </div>

            <!-- Note interne -->
            <div class="px-5 py-3">
              <div class="text-xs font-bold uppercase tracking-wider mb-2" style="color:#9ca3af">Note interne</div>
              <textarea [(ngModel)]="noteInterne" rows="3"
                        placeholder="Ajouter une note de validation..."
                        class="w-full text-xs rounded-xl p-3 resize-none outline-none transition-colors"
                        style="background:#f9fafb;border:1px solid #e5e7eb;color:#374151">
              </textarea>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="px-5 py-4 border-t border-gray-100 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <button (click)="rejeter()"
                      class="py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style="background:#fee2e2;color:#dc2626">
                Rejeter
              </button>
              <button (click)="demanderDocs()"
                      class="py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style="background:#fef3c7;color:#d97706">
                Demander docs
              </button>
            </div>
            <button (click)="valider()"
                    class="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                    style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 4px 14px rgba(124,58,237,0.35)">
              ✓ Valider le salon
            </button>
          </div>

        </div>
      } @else {
        <!-- Placeholder panel vide -->
        <div class="w-[320px] flex-shrink-0 border-l border-gray-100 bg-white flex flex-col items-center justify-center gap-3 p-8">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center bg-white border border-gray-100 shadow-sm">
            <lucide-icon name="store" [size]="24" [strokeWidth]="1.5" style="color:#a855f7"></lucide-icon>
          </div>
          <div class="text-sm font-semibold text-center" style="color:#374151">
            Sélectionnez un salon
          </div>
          <div class="text-xs text-center" style="color:#9ca3af">
            Cliquez sur une ligne pour voir les détails et prendre une décision
          </div>
        </div>
      }

    </div>

    <!-- ══ MODAL VÉRIFICATION DOCUMENT ══ -->
    @if (docModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center"
           style="background:rgba(17,24,39,0.65);backdrop-filter:blur(6px);padding:16px"
           (click)="closeDocModal()">

        <!-- Conteneur principal : flex colonne, hauteur fixe -->
        <div class="bg-white rounded-3xl shadow-2xl flex flex-col"
             style="width:880px;max-width:96vw;height:86vh"
             (click)="$event.stopPropagation()">

          <!-- ── HEADER (fixe) ── -->
          <div class="flex-shrink-0 flex items-center justify-between px-6 py-4"
               style="border-bottom:1px solid #f0edf8">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-sm">
                <lucide-icon name="file-search" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
              </div>
              <div>
                <h3 class="font-black text-sm" style="color:#111827">Vérification du document</h3>
                <p class="text-xs" style="color:#9ca3af">{{ docModal()!.nom }} · {{ docModal()!.proprietaire }}</p>
              </div>
            </div>
            <button (click)="closeDocModal()"
                    class="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
                    style="color:#9ca3af;background:#f9fafb">
              <lucide-icon name="x" [size]="15" [strokeWidth]="2.5"></lucide-icon>
            </button>
          </div>

          <!-- ── CORPS : deux colonnes scrollables ── -->
          <div class="flex flex-1 overflow-hidden">

            <!-- GAUCHE : document + navigation + upload -->
            <div class="flex flex-col overflow-y-auto"
                 style="width:52%;border-right:1px solid #f0edf8;padding:20px;gap:16px">

              <!-- Titre document courant -->
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">
                  {{ docModal()!.docs[docIndex()].label }}
                </span>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                      [style.background]="docModal()!.docs[docIndex()].ok ? '#dcfce7' : '#fef3c7'"
                      [style.color]="docModal()!.docs[docIndex()].ok ? '#16a34a' : '#d97706'">
                  {{ docModal()!.docs[docIndex()].ok ? '✓ Soumis' : '⏳ Manquant' }}
                </span>
              </div>

              <!-- Carte d'identité simulée -->
              <div class="rounded-2xl overflow-hidden shadow-md flex-shrink-0"
                   style="background:linear-gradient(135deg,#1a5276 0%,#2471a3 60%,#2980b9 100%)">
                <!-- Bandeau supérieur -->
                <div class="flex items-center justify-between px-4 py-2"
                     style="background:rgba(0,0,0,0.2)">
                  <span class="text-white text-[10px] font-bold tracking-widest uppercase">
                    🇨🇮 Côte d'Ivoire
                  </span>
                  <span class="text-white text-[10px] opacity-70">Carte Nationale d'Identité</span>
                </div>
                <!-- Corps de la carte -->
                <div class="flex p-4 gap-4">
                  <!-- Photo -->
                  <div class="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                       style="width:90px;height:110px;background:rgba(255,255,255,0.15)">
                    <lucide-icon name="user-round" [size]="44" [strokeWidth]="1"
                                 style="color:rgba(255,255,255,0.5)"></lucide-icon>
                  </div>
                  <!-- Infos textuelles -->
                  <div class="flex-1 text-white flex flex-col justify-between py-1">
                    <div class="space-y-1.5">
                      <div>
                        <div class="text-[9px] uppercase tracking-widest opacity-60">Nom & Prénom</div>
                        <div class="text-sm font-black">{{ docModal()!.proprietaire }}</div>
                      </div>
                      <div>
                        <div class="text-[9px] uppercase tracking-widest opacity-60">Salon</div>
                        <div class="text-xs font-semibold">{{ docModal()!.nom }}</div>
                      </div>
                      <div>
                        <div class="text-[9px] uppercase tracking-widest opacity-60">Commune</div>
                        <div class="text-xs">{{ docModal()!.commune }}, Abidjan</div>
                      </div>
                    </div>
                    <div class="text-[9px] opacity-40 font-mono mt-2">
                      N° CI{{ docModal()!.id }}2024 · Valide jusqu'au 01/2030
                    </div>
                  </div>
                </div>
                <!-- Bande MRZ -->
                <div class="px-4 py-1.5" style="background:rgba(0,0,0,0.15)">
                  <div class="text-[8px] font-mono opacity-40 text-white tracking-widest">
                    IDCIV{{ docModal()!.proprietaire.toUpperCase().replace(' ','&lt;&lt;') }}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                  </div>
                </div>
              </div>

              <!-- Navigation entre documents -->
              <div class="flex items-center justify-between flex-shrink-0">
                <button (click)="prevDoc()" [disabled]="docIndex() === 0"
                        class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-30"
                        style="border:1.5px solid #e5e7eb;color:#374151;background:white">
                  <lucide-icon name="chevron-left" [size]="13" [strokeWidth]="2.5"></lucide-icon>
                  Précédent
                </button>
                <div class="flex items-center gap-2">
                  @for (doc of docModal()!.docs; track doc.label; let i = $index) {
                    <button (click)="docIndex.set(i)"
                            class="rounded-full transition-all"
                            [style.width]="docIndex() === i ? '20px' : '8px'"
                            [style.height]="'8px'"
                            [style.background]="docIndex() === i ? '#a855f7' : '#e5e7eb'">
                    </button>
                  }
                  <span class="text-xs ml-1" style="color:#9ca3af">
                    {{ docIndex() + 1 }}/{{ docModal()!.docs.length }}
                  </span>
                </div>
                <button (click)="nextDoc()" [disabled]="docIndex() === docModal()!.docs.length - 1"
                        class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-30"
                        style="border:1.5px solid #e5e7eb;color:#374151;background:white">
                  Suivant
                  <lucide-icon name="chevron-right" [size]="13" [strokeWidth]="2.5"></lucide-icon>
                </button>
              </div>

              <!-- Récap toutes les pièces -->
              <div class="rounded-2xl overflow-hidden flex-shrink-0"
                   style="border:1px solid #f0edf8">
                <div class="px-4 py-2.5" style="background:#faf5ff;border-bottom:1px solid #f0edf8">
                  <span class="text-xs font-bold" style="color:#7c3aed">Récapitulatif des pièces</span>
                </div>
                <div class="divide-y" style="divide-color:#f9fafb">
                  @for (doc of docModal()!.docs; track doc.label; let i = $index) {
                    <div class="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                         [style.background]="docIndex() === i ? '#faf5ff' : 'white'"
                         (click)="docIndex.set(i)">
                      <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white border border-gray-100">
                        <lucide-icon [name]="doc.ok ? 'file-check' : 'file-clock'" [size]="13" [strokeWidth]="1.75"
                                     [style.color]="doc.ok ? '#a855f7' : '#d97706'"></lucide-icon>
                      </div>
                      <span class="flex-1 text-xs font-medium" style="color:#374151">{{ doc.label }}</span>
                      <span class="text-xs font-semibold"
                            [style.color]="doc.ok ? '#16a34a' : '#d97706'">
                        {{ doc.ok ? '✓ Soumis' : '⏳ Manquant' }}
                      </span>
                    </div>
                  }
                </div>
              </div>

              <!-- Upload (non bloquant) -->
              <div class="rounded-2xl p-4 flex-shrink-0"
                   style="background:#faf5ff;border:1.5px dashed #c4b5fd">
                <div class="flex items-center gap-2 mb-3">
                  <lucide-icon name="upload-cloud" [size]="15" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
                  <span class="text-xs font-bold" style="color:#7c3aed">Charger / remplacer ce document</span>
                  <span class="text-xs px-1.5 py-0.5 rounded-full ml-auto"
                        style="background:#ede9fe;color:#9ca3af">Optionnel</span>
                </div>
                <label class="flex items-center gap-2 cursor-pointer">
                  <div class="flex-1 px-3 py-2 rounded-xl text-xs truncate"
                       style="background:white;border:1px solid #e5e7eb;color:#9ca3af">
                    {{ uploadedFileName() || 'JPG, PNG ou PDF — max 5 Mo' }}
                  </div>
                  <span class="px-3 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0"
                        style="background:#a855f7">Parcourir</span>
                  <input type="file" accept="image/*,.pdf" class="hidden" (change)="onFileChange($event)">
                </label>
              </div>
            </div>

            <!-- DROITE : vérification + commentaire -->
            <div class="flex flex-col overflow-y-auto"
                 style="flex:1;padding:20px;gap:16px">

              <!-- Infos salon -->
              <div class="rounded-2xl overflow-hidden flex-shrink-0"
                   style="border:1px solid #f0edf8">
                <div class="px-4 py-2.5" style="background:#f8f7fc;border-bottom:1px solid #f0edf8">
                  <span class="text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">
                    Informations du salon
                  </span>
                </div>
                <div class="divide-y" style="divide-color:#f9fafb">
                  @for (row of [
                    {label:'Salon', val: docModal()!.nom},
                    {label:'Catégorie', val: docModal()!.categorie},
                    {label:'Propriétaire', val: docModal()!.proprietaire},
                    {label:'Téléphone', val: docModal()!.phone},
                    {label:'Commune', val: docModal()!.commune},
                    {label:'Email', val: docModal()!.email}
                  ]; track row.label) {
                    <div class="flex items-start gap-3 px-4 py-2.5">
                      <span class="text-xs font-semibold flex-shrink-0 pt-px" style="width:88px;color:#9ca3af">
                        {{ row.label }}
                      </span>
                      <span class="text-xs font-medium" style="color:#111827">{{ row.val }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Vérification du document -->
              <div class="rounded-2xl overflow-hidden flex-shrink-0"
                   style="border:1px solid #f0edf8">
                <div class="px-4 py-2.5" style="background:#f8f7fc;border-bottom:1px solid #f0edf8">
                  <span class="text-xs font-bold uppercase tracking-wider" style="color:#9ca3af">
                    Vérification du document
                  </span>
                </div>
                <div class="px-4 py-4 space-y-3">
                  @for (opt of [
                    {key:'valide', label:'Document valide', icon:'check-circle'},
                    {key:'expire', label:'Document expiré', icon:'calendar-x'},
                    {key:'incorrect', label:'Informations incorrectes', icon:'alert-circle'}
                  ]; track opt.key) {
                    <div class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                         [style.background]="getVerif(opt.key) ? '#faf5ff' : '#f9fafb'"
                         [style.border]="getVerif(opt.key) ? '1.5px solid #d8b4fe' : '1.5px solid transparent'"
                         (click)="toggleVerif(opt.key)">
                      <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                           [style.border-color]="getVerif(opt.key) ? '#a855f7' : '#d1d5db'"
                           [style.background]="getVerif(opt.key) ? '#a855f7' : 'white'">
                        @if (getVerif(opt.key)) {
                          <lucide-icon name="check" [size]="11" [strokeWidth]="3" class="text-white"></lucide-icon>
                        }
                      </div>
                      <lucide-icon [name]="opt.icon" [size]="15" [strokeWidth]="1.75"
                                   [style.color]="getVerif(opt.key) ? '#a855f7' : '#9ca3af'"></lucide-icon>
                      <span class="text-sm font-medium"
                            [style.color]="getVerif(opt.key) ? '#7c3aed' : '#374151'">
                        {{ opt.label }}
                      </span>
                    </div>
                  }
                </div>
              </div>

              <!-- Commentaire -->
              <div class="flex flex-col flex-1" style="min-height:120px">
                <div class="text-xs font-bold uppercase tracking-wider mb-2" style="color:#9ca3af">
                  Commentaire
                  <span class="normal-case font-normal ml-1" style="color:#d1d5db">(optionnel)</span>
                </div>
                <textarea [(ngModel)]="verifComment" rows="5"
                          placeholder="Ajouter une note sur ce document (raison du rejet, document manquant, etc.)..."
                          class="flex-1 w-full text-sm rounded-2xl p-4 resize-none outline-none transition-all"
                          style="background:#f9fafb;border:1.5px solid #e5e7eb;color:#374151;line-height:1.6">
                </textarea>
              </div>
            </div>
          </div>

          <!-- ── FOOTER (fixe) ── -->
          <div class="flex-shrink-0 flex items-center justify-between gap-3 px-6 py-4"
               style="border-top:1px solid #f0edf8;background:#fafafa">
            <button (click)="demanderDocsModal()"
                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                    style="background:#fef3c7;color:#d97706;border:1.5px solid #fde68a">
              <lucide-icon name="send" [size]="14" [strokeWidth]="2"></lucide-icon>
              Demander des pièces
            </button>
            <div class="flex gap-2.5">
              <button (click)="rejeterDoc()"
                      class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style="background:#fee2e2;color:#dc2626;border:1.5px solid #fecaca">
                <lucide-icon name="x-circle" [size]="15" [strokeWidth]="2"></lucide-icon>
                REJETER
              </button>
              <button (click)="validerDoc()"
                      class="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                      style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 4px 14px rgba(124,58,237,0.35)">
                <lucide-icon name="check-circle" [size]="15" [strokeWidth]="2"></lucide-icon>
                VALIDER
              </button>
            </div>
          </div>

        </div>
      </div>
    }

    <!-- Toast -->
    @if (toast()) {
      <div class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold"
           [style.background]="toast()!.type === 'success' ? '#16a34a' : toast()!.type === 'error' ? '#dc2626' : '#d97706'">
        <lucide-icon [name]="toast()!.type === 'success' ? 'check-circle' : toast()!.type === 'error' ? 'x-circle' : 'alert-circle'"
                     [size]="18" [strokeWidth]="2"></lucide-icon>
        {{ toast()!.message }}
      </div>
    }
  `,
  styles: [`
    :host { display: flex; flex-direction: column; flex: 1; }
    textarea:focus { border-color: #a855f7 !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.12); }
    input[type=text]:focus { outline: none; }
  `]
})
export class AdminSalonsComponent {

  search = '';
  activeTab = signal<FilterTab>('tous');
  selectedSalon = signal<SalonSoumission | null>(null);
  noteInterne = '';
  toast = signal<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);

  // Modal document
  docModal = signal<SalonSoumission | null>(null);
  docIndex = signal(0);
  verif = { valide: false, expire: false, incorrect: false };
  verifComment = '';
  uploadedFileName = signal('');

  readonly tabs = [
    { key: 'tous' as FilterTab, label: 'Tous', count: 0 },
    { key: 'en_attente' as FilterTab, label: 'En attente', count: 12 },
    { key: 'actifs' as FilterTab, label: 'Actifs', count: 0 },
    { key: 'inactifs' as FilterTab, label: 'Inactifs', count: 0 },
  ];

  readonly stats = { actifs: 523, enAttente: 12, suspendus: 8 };

  readonly salonPhotos = [
    '/Recommandés/Salon-Abiba.jpg',
    '/Recommandés/Salon-La-Bella.jpg',
    '/Recommandés/Top-et-class.jpeg',
  ];

  readonly salons: SalonSoumission[] = [
    {
      id: '1', logo: '', nom: 'Beauty Glam', sousNom: 'Salon de coiffure',
      proprietaire: 'Awa Konaté', commune: 'Cocody', categorie: 'Coiffure',
      heureId: '08/12/24', kyc: 'verifie', statut: 'nouveau',
      phone: '+225 01 02 04 05 19', adresse: 'Rue des Jardins, Cocody Abidjan 2',
      email: 'beautyglamabidjan@gmail.com', photos: [], services: ['Coiffure', 'Nail Art'],
      createdAt: '2024-12-08',
      docs: [
        { label: 'Pièce d\'identité', url: '', ok: true },
        { label: 'Registre de commerce', url: '', ok: true },
        { label: 'Justificatif domicile', url: '', ok: false },
      ]
    },
    {
      id: '2', logo: '', nom: 'Maison Beauty', sousNom: 'Institut de beauté',
      proprietaire: 'Fatou Diaby', commune: 'Plateau', categorie: 'Esthétique',
      heureId: '07/12/24', kyc: 'en_cours', statut: 'en_attente',
      phone: '+225 07 89 45 12 03', adresse: 'Rue du Commerce, Plateau Abidjan',
      email: 'maisonbeauty@gmail.com', photos: [], services: ['Massage', 'Soins visage', 'Épilation'],
      createdAt: '2024-12-07',
      docs: [
        { label: 'Pièce d\'identité', url: '', ok: true },
        { label: 'Registre de commerce', url: '', ok: false },
        { label: 'Justificatif domicile', url: '', ok: false },
      ]
    },
    {
      id: '3', logo: '', nom: 'Digi Pro Nails', sousNom: 'Salon de manucure',
      proprietaire: 'Salimata Coulibaly', commune: 'Yopougon', categorie: 'Nail Art',
      heureId: '05/12/24', kyc: 'verifie', statut: 'actif',
      phone: '+225 05 34 67 89 21', adresse: 'Av. 18 Juin, Yopougon Abidjan',
      email: 'digipronails@gmail.com', photos: [], services: ['Manucure', 'Pédicure', 'Nail Art'],
      createdAt: '2024-12-05',
      docs: [
        { label: 'Pièce d\'identité', url: '', ok: true },
        { label: 'Registre de commerce', url: '', ok: true },
        { label: 'Justificatif domicile', url: '', ok: true },
      ]
    },
    {
      id: '4', logo: '', nom: 'Barber House', sousNom: 'Salon de coiffure hommes',
      proprietaire: 'Kofi Mensah', commune: 'Adjamé', categorie: 'Barbier',
      heureId: '03/12/24', kyc: 'rejete', statut: 'suspendu',
      phone: '+225 05 11 22 33 44', adresse: 'Rue 12, Adjamé Abidjan',
      email: 'barberhouse@gmail.com', photos: [], services: ['Coupe', 'Barbe', 'Soin cuir chevelu'],
      createdAt: '2024-12-03',
      docs: [
        { label: 'Pièce d\'identité', url: '', ok: false },
        { label: 'Registre de commerce', url: '', ok: false },
        { label: 'Justificatif domicile', url: '', ok: false },
      ]
    },
    {
      id: '5', logo: '', nom: 'Glow Spa', sousNom: 'Institut Spa & Bien-être',
      proprietaire: 'Nadia Soro', commune: 'Marcory', categorie: 'Spa',
      heureId: '02/12/24', kyc: 'en_cours', statut: 'en_attente',
      phone: '+225 01 23 45 67 89', adresse: 'Bd du Port, Marcory Abidjan',
      email: 'glowspa.abidjan@gmail.com', photos: [], services: ['Massage', 'Hammam', 'Relaxation'],
      createdAt: '2024-12-02',
      docs: [
        { label: 'Pièce d\'identité', url: '', ok: true },
        { label: 'Registre de commerce', url: '', ok: false },
        { label: 'Justificatif domicile', url: '', ok: true },
      ]
    },
    {
      id: '6', logo: '', nom: 'Royal Coiffure', sousNom: 'Salon afro & européen',
      proprietaire: 'Marie Traoré', commune: 'Treichville', categorie: 'Coiffure',
      heureId: '01/12/24', kyc: 'non_soumis', statut: 'en_attente',
      phone: '+225 07 00 11 22 33', adresse: 'Rue 15, Treichville Abidjan',
      email: 'royalcoiffure@gmail.com', photos: [], services: ['Tresses', 'Tissage', 'Lissage'],
      createdAt: '2024-12-01',
      docs: [
        { label: 'Pièce d\'identité', url: '', ok: false },
        { label: 'Registre de commerce', url: '', ok: false },
        { label: 'Justificatif domicile', url: '', ok: false },
      ]
    },
  ];

  filteredSalons = computed(() => {
    let list = this.salons;
    const tab = this.activeTab();
    if (tab === 'en_attente') list = list.filter(s => s.statut === 'en_attente' || s.statut === 'nouveau');
    else if (tab === 'actifs') list = list.filter(s => s.statut === 'actif');
    else if (tab === 'inactifs') list = list.filter(s => s.statut === 'suspendu');
    const q = this.search.toLowerCase().trim();
    if (q) list = list.filter(s =>
      s.nom.toLowerCase().includes(q) ||
      s.proprietaire.toLowerCase().includes(q) ||
      s.commune.toLowerCase().includes(q)
    );
    return list;
  });

  selectSalon(salon: SalonSoumission) {
    this.selectedSalon.set(salon);
    this.noteInterne = '';
  }

  openDocModal(salon: SalonSoumission) {
    this.docModal.set(salon);
    this.docIndex.set(0);
    this.verif = { valide: false, expire: false, incorrect: false };
    this.verifComment = '';
    this.uploadedFileName.set('');
  }

  closeDocModal() {
    this.docModal.set(null);
  }

  prevDoc() {
    this.docIndex.update(i => Math.max(0, i - 1));
  }

  nextDoc() {
    const max = (this.docModal()?.docs.length ?? 1) - 1;
    this.docIndex.update(i => Math.min(max, i + 1));
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.uploadedFileName.set(file.name);
  }

  getVerif(key: string): boolean {
    return (this.verif as any)[key] ?? false;
  }

  toggleVerif(key: string): void {
    (this.verif as any)[key] = !(this.verif as any)[key];
  }

  validerDoc() {
    const s = this.docModal();
    if (!s) return;
    this.showToast('success', `${s.nom} — document validé avec succès`);
    this.closeDocModal();
  }

  rejeterDoc() {
    const s = this.docModal();
    if (!s) return;
    this.showToast('error', `Document de ${s.nom} rejeté`);
    this.closeDocModal();
  }

  demanderDocsModal() {
    const s = this.docModal();
    if (!s) return;
    this.showToast('warning', `Demande de pièces envoyée à ${s.proprietaire}`);
    this.closeDocModal();
  }

  valider() {
    const s = this.selectedSalon();
    if (!s) return;
    this.showToast('success', `${s.nom} a été validé avec succès`);
    this.selectedSalon.set(null);
  }

  rejeter() {
    const s = this.selectedSalon();
    if (!s) return;
    this.showToast('error', `${s.nom} a été rejeté`);
    this.selectedSalon.set(null);
  }

  demanderDocs() {
    const s = this.selectedSalon();
    if (!s) return;
    this.showToast('warning', `Demande de documents envoyée à ${s.proprietaire}`);
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  kycLabel(k: KycStatus) {
    const map: Record<KycStatus, string> = {
      verifie: 'Vérifié', en_cours: 'En cours', rejete: 'Rejeté', non_soumis: 'Non soumis'
    };
    return map[k];
  }
  kycBg(k: KycStatus) {
    const map: Record<KycStatus, string> = {
      verifie: '#dcfce7', en_cours: '#fef3c7', rejete: '#fee2e2', non_soumis: '#f3f4f6'
    };
    return map[k];
  }
  kycColor(k: KycStatus) {
    const map: Record<KycStatus, string> = {
      verifie: '#16a34a', en_cours: '#d97706', rejete: '#dc2626', non_soumis: '#9ca3af'
    };
    return map[k];
  }

  statutLabel(s: SalonStatus) {
    const map: Record<SalonStatus, string> = {
      actif: 'Actif', en_attente: 'En attente', suspendu: 'Suspendu', nouveau: 'Nouveau'
    };
    return map[s];
  }
  statutBg(s: SalonStatus) {
    const map: Record<SalonStatus, string> = {
      actif: '#dcfce7', en_attente: '#fef3c7', suspendu: '#fee2e2', nouveau: '#ede9fe'
    };
    return map[s];
  }
  statutColor(s: SalonStatus) {
    const map: Record<SalonStatus, string> = {
      actif: '#16a34a', en_attente: '#d97706', suspendu: '#dc2626', nouveau: '#7c3aed'
    };
    return map[s];
  }

  private toastTimer: any;
  private showToast(type: 'success' | 'error' | 'warning', message: string) {
    clearTimeout(this.toastTimer);
    this.toast.set({ type, message });
    this.toastTimer = setTimeout(() => this.toast.set(null), 3500);
  }
}
