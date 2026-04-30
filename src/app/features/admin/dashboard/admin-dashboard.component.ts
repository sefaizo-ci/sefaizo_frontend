import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe, LucideAngularModule, DatePipe],
  template: `
    <div class="space-y-5">

      <!-- ── En-tête ── -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-black" style="color:#111827">Tableau de bord</h1>
          <p class="text-xs mt-0.5" style="color:#9ca3af">Vue d'ensemble de la plateforme SEFAIZO</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-white border border-gray-100 shadow-sm" style="color:#6b7280">
          <lucide-icon name="calendar" [size]="13" [strokeWidth]="1.75"></lucide-icon>
          {{ today | date:'EEEE d MMM yyyy' : '' : 'fr' }}
        </div>
      </div>

      <!-- ── KPI Cards ── -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">

        <!-- Salons actifs -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm flex-shrink-0">
              <lucide-icon name="store" [size]="16" [strokeWidth]="1.75" style="color:#4c0eb7"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#fef3c7;color:#d97706">12 en att.</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">523</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Salons actifs</div>
          <div class="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full rounded-full" style="width:82%;background:#4c0eb7"></div>
          </div>
        </div>

        <!-- Documents KYC -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm flex-shrink-0">
              <lucide-icon name="shield-check" [size]="16" [strokeWidth]="1.75" style="color:#d97706"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#fef3c7;color:#d97706">En attente</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">12</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Documents KYC</div>
          <div class="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full rounded-full" style="width:40%;background:#d97706"></div>
          </div>
        </div>

        <!-- Clients inscrits -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm flex-shrink-0">
              <lucide-icon name="users" [size]="16" [strokeWidth]="1.75" style="color:#16a34a"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#16a34a">+342</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">8 432</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Clients inscrits</div>
          <div class="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full rounded-full" style="width:68%;background:#16a34a"></div>
          </div>
        </div>

        <!-- Réservations -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm flex-shrink-0">
              <lucide-icon name="calendar-check" [size]="16" [strokeWidth]="1.75" style="color:#4c0eb7"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#16a34a">+18%</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">2 891</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Réservations</div>
          <div class="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full rounded-full" style="width:74%;background:#4c0eb7"></div>
          </div>
        </div>

        <!-- Volume FCFA -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm flex-shrink-0">
              <lucide-icon name="circle-dollar-sign" [size]="16" [strokeWidth]="1.75" style="color:#16a34a"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#16a34a">+8%</span>
          </div>
          <div class="text-xl font-black" style="color:#111827">45 250 000</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Volume FCFA</div>
          <div class="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full rounded-full" style="width:91%;background:#16a34a"></div>
          </div>
        </div>
      </div>

      <!-- ── Inscriptions chart + Actions urgentes ── -->
      <div class="grid lg:grid-cols-5 gap-5">

        <!-- Graphique Inscriptions -->
        <div class="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="flex items-center justify-between px-5 pt-4 pb-3" style="border-bottom:1px solid #f3f4f6">
            <div>
              <h2 class="font-bold text-sm" style="color:#111827">Inscriptions</h2>
              <p class="text-xs" style="color:#9ca3af">Pros et Clients · 9 derniers mois</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full" style="background:#4c0eb7"></div>
                <span class="text-xs" style="color:#6b7280">Clients</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full" style="background:#f59e0b"></div>
                <span class="text-xs" style="color:#6b7280">Pros</span>
              </div>
            </div>
          </div>
          <div class="px-4 py-3">
            <svg viewBox="0 0 460 200" class="w-full" style="height:180px" preserveAspectRatio="none">
              <!-- Grille horizontale -->
              <line x1="44" y1="20" x2="450" y2="20" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="44" y1="55" x2="450" y2="55" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="44" y1="90" x2="450" y2="90" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="44" y1="125" x2="450" y2="125" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="44" y1="160" x2="450" y2="160" stroke="#f3f4f6" stroke-width="1"/>
              <!-- Labels Y -->
              <text x="38" y="24" text-anchor="end" font-size="9" fill="#9ca3af">600</text>
              <text x="38" y="59" text-anchor="end" font-size="9" fill="#9ca3af">450</text>
              <text x="38" y="94" text-anchor="end" font-size="9" fill="#9ca3af">300</text>
              <text x="38" y="129" text-anchor="end" font-size="9" fill="#9ca3af">150</text>
              <text x="38" y="164" text-anchor="end" font-size="9" fill="#9ca3af">0</text>
              <!-- Labels X -->
              <text x="54"  y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Avr</text>
              <text x="104" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Mai</text>
              <text x="154" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Juin</text>
              <text x="204" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Juil</text>
              <text x="254" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Août</text>
              <text x="304" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Sept</text>
              <text x="354" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Oct</text>
              <text x="404" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Nov</text>
              <text x="450" y="178" text-anchor="middle" font-size="9" fill="#9ca3af">Déc</text>
              <!-- Zone Clients (remplie, violette) -->
              <polygon
                points="54,120 104,103 154,111 204,80 254,58 304,68 354,45 404,28 450,36 450,160 54,160"
                fill="rgba(76,14,183,0.08)"/>
              <!-- Ligne Clients (violette) -->
              <polyline
                points="54,120 104,103 154,111 204,80 254,58 304,68 354,45 404,28 450,36"
                fill="none" stroke="#4c0eb7" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
              <!-- Points Clients -->
              <circle cx="54"  cy="120" r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="104" cy="103" r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="154" cy="111" r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="204" cy="80"  r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="254" cy="58"  r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="304" cy="68"  r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="354" cy="45"  r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="404" cy="28"  r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <circle cx="450" cy="36"  r="3.5" fill="#4c0eb7" stroke="white" stroke-width="1.5"/>
              <!-- Ligne Pros (orange) -->
              <polyline
                points="54,143 104,136 154,140 204,130 254,124 304,132 354,118 404,108 450,113"
                fill="none" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="4 2"/>
              <!-- Points Pros -->
              <circle cx="54"  cy="143" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="104" cy="136" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="154" cy="140" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="204" cy="130" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="254" cy="124" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="304" cy="132" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="354" cy="118" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="404" cy="108" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
              <circle cx="450" cy="113" r="3" fill="#f59e0b" stroke="white" stroke-width="1.5"/>
            </svg>
          </div>
        </div>

        <!-- Actions urgentes -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="flex items-center justify-between px-5 pt-4 pb-3" style="border-bottom:1px solid #f3f4f6">
            <div>
              <h2 class="font-bold text-sm" style="color:#111827">Actions urgentes</h2>
              <p class="text-xs" style="color:#9ca3af">À traiter en priorité</p>
            </div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style="background:#dc2626">3</div>
          </div>
          <div class="divide-y divide-gray-50">

            <!-- Action 1 : salons validation -->
            <div class="px-4 py-3.5 flex items-start gap-3">
              <div class="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style="background:#dc2626"></div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold leading-snug" style="color:#111827">
                  10 salons en attente de validation
                </div>
                <div class="text-xs mt-0.5" style="color:#9ca3af">Inscriptions en cours depuis +48h</div>
              </div>
              <a routerLink="/admin/salons"
                 class="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                 style="background:#f3e8ff;color:#4c0eb7">
                Traiter
              </a>
            </div>

            <!-- Action 2 : virements -->
            <div class="px-4 py-3.5 flex items-start gap-3">
              <div class="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style="background:#d97706"></div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold leading-snug" style="color:#111827">
                  2 virements à traiter
                </div>
                <div class="text-xs mt-0.5" style="color:#9ca3af">1 060 200 FCFA en attente</div>
              </div>
              <a routerLink="/admin/finances"
                 class="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                 style="background:#fef3c7;color:#d97706">
                Traiter
              </a>
            </div>

            <!-- Action 3 : avis signalé -->
            <div class="px-4 py-3.5 flex items-start gap-3">
              <div class="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style="background:#f59e0b"></div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold leading-snug" style="color:#111827">
                  1 avis signalé à modérer
                </div>
                <div class="text-xs mt-0.5" style="color:#9ca3af">Signalement client · Cocody</div>
              </div>
              <a routerLink="/admin/avis"
                 class="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                 style="background:#fef9c3;color:#a16207">
                Traiter
              </a>
            </div>

            <!-- Bloc info résumé -->
            <div class="px-4 py-3.5 rounded-b-2xl" style="background:#faf5ff">
              <div class="flex items-center justify-between text-xs">
                <span style="color:#9ca3af">Taux de validation ce mois</span>
                <span class="font-bold" style="color:#4c0eb7">94.2%</span>
              </div>
              <div class="mt-1.5 h-1.5 rounded-full bg-white overflow-hidden">
                <div class="h-full rounded-full" style="width:94%;background:linear-gradient(to right,#4c0eb7,#a855f7)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Dernières inscriptions de salons ── -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #f3f4f6">
          <div>
            <h2 class="font-bold text-sm" style="color:#111827">Dernières inscriptions de salons</h2>
            <p class="text-xs" style="color:#9ca3af">5 dernières demandes reçues</p>
          </div>
          <a routerLink="/admin/salons"
             class="text-xs font-semibold px-3 py-1.5 rounded-lg"
             style="background:#f3e8ff;color:#4c0eb7">
            Voir toutes les inscriptions
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr style="background:#faf9ff;border-bottom:1px solid #f3f4f6">
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Date</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Prénom</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Nom</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Commune</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Catégorie</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">KYC</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Salon</th>
                <th class="px-4 py-2.5 text-left text-xs font-semibold" style="color:#9ca3af">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              @for (row of recentSalons; track row.date) {
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 text-xs" style="color:#6b7280">{{ row.date }}</td>
                  <td class="px-4 py-3 text-xs font-semibold" style="color:#111827">{{ row.prenom }}</td>
                  <td class="px-4 py-3 text-xs font-semibold" style="color:#111827">{{ row.nom }}</td>
                  <td class="px-4 py-3 text-xs" style="color:#6b7280">{{ row.commune }}</td>
                  <td class="px-4 py-3 text-xs" style="color:#6b7280">{{ row.categorie }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
                          [style.background]="row.kyc === 'Validé' ? '#dcfce7' : row.kyc === 'En attente' ? '#fef3c7' : '#fee2e2'"
                          [style.color]="row.kyc === 'Validé' ? '#16a34a' : row.kyc === 'En attente' ? '#d97706' : '#dc2626'">
                      {{ row.kyc }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
                          [style.background]="row.salon === 'Actif' ? '#dcfce7' : row.salon === 'En attente' ? '#fef3c7' : '#f3e8ff'"
                          [style.color]="row.salon === 'Actif' ? '#16a34a' : row.salon === 'En attente' ? '#d97706' : '#4c0eb7'">
                      {{ row.salon }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-1.5">
                      <button (click)="traiter(row)"
                              class="text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
                              style="background:#f3e8ff;color:#4c0eb7">
                        Traiter
                      </button>
                      <button (click)="refuser(row)"
                              class="text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
                              style="background:#fee2e2;color:#dc2626">
                        Refuser
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  today = new Date();

  recentSalons = [
    { date: '10/03/2024 15:06', prenom: 'Ndjeti',   nom: 'Jason',    commune: 'Cocody',      categorie: 'Coiffure · Tresses',      kyc: 'Validé',     salon: 'En attente' },
    { date: '10/03/2024 14:52', prenom: 'Messy',    nom: 'Touré',    commune: 'Cocody',      categorie: 'Coiffure · Esthétique',   kyc: 'En attente', salon: 'En cours'   },
    { date: '10/03/2024 13:44', prenom: 'Amany',    nom: 'Koné',     commune: 'Marcory',     categorie: 'Ongles · Nail Art',       kyc: 'En attente', salon: 'En attente' },
    { date: '09/03/2024 09:21', prenom: 'Aya',      nom: 'Bamba',    commune: 'Yopougon',    categorie: 'Massage · Bien-être',     kyc: 'Validé',     salon: 'Actif'      },
    { date: '09/03/2024 08:35', prenom: 'Dro',      nom: 'A. Boulé', commune: 'Plateau',     categorie: 'Coiffure · Barbier',      kyc: 'Refusé',     salon: 'En attente' },
  ];

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  traiter(row: any): void {
    this.toast.success(`Dossier de ${row.prenom} ${row.nom} en cours de traitement`);
  }

  refuser(row: any): void {
    this.recentSalons = this.recentSalons.filter(r => r !== row);
    this.toast.error(`Dossier de ${row.prenom} ${row.nom} refusé`);
  }
}
