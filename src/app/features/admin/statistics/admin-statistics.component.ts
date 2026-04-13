import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AdminKpiDashboard, TimePeriod } from '../models/admin-kpi.models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FcfaPipe],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary to-primary-dark text-white py-8">
        <div class="container-custom">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Statistiques Détaillées</h1>
              <p class="text-white/80">Analytics approfondis de la plateforme SEFAIZO</p>
            </div>
            <button (click)="goBack()" class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
              </svg>
              Retour
            </button>
          </div>
        </div>
      </div>

      <div class="container-custom py-8">
        @if (loading) {
          <div class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        } @else {
          <!-- Tabs -->
          <div class="bg-white rounded-lg shadow mb-6">
            <div class="flex border-b overflow-x-auto">
              @for (tab of tabs; track tab.id) {
                <button
                  (click)="activeTab = tab.id"
                  [class]="getTabClass(tab.id)"
                  class="px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors">
                  {{ tab.label }}
                </button>
              }
            </div>
          </div>

          <!-- Tab Content -->
          <div class="bg-white rounded-lg shadow p-6">
            @if (dashboard(); as dash) {
              <!-- Appointments Tab -->
              @if (activeTab === 'appointments') {
                <div class="space-y-6">
                  <h2 class="text-2xl font-bold text-secondary mb-4">Statistiques des Rendez-vous</h2>
                  
                  <!-- Summary Cards -->
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                      <div class="text-sm text-blue-700">Total</div>
                      <div class="text-2xl font-bold text-blue-600">{{ dash.appointments.total }}</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                      <div class="text-sm text-green-700">Taux de présentation</div>
                      <div class="text-2xl font-bold text-green-600">{{ dash.appointments.showUpRate }}%</div>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                      <div class="text-sm text-yellow-700">Durée moyenne</div>
                      <div class="text-2xl font-bold text-yellow-600">{{ dash.appointments.averageDuration }} min</div>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4">
                      <div class="text-sm text-purple-700">À domicile</div>
                      <div class="text-2xl font-bold text-purple-600">{{ dash.appointments.byType.homePercentage }}%</div>
                    </div>
                  </div>

                  <!-- Status Distribution Table -->
                  <div>
                    <h3 class="text-lg font-semibold text-secondary mb-3">Répartition par statut</h3>
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Statut</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Nombre</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Pourcentage</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Barre</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (status of dash.appointments.byStatus; track status.status) {
                            <tr class="border-b hover:bg-gray-50">
                              <td class="py-3 px-4">
                                <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full" [ngClass]="getStatusColor(status.color)"></div>
                                  <span class="text-secondary">{{ status.label }}</span>
                                </div>
                              </td>
                              <td class="text-right py-3 px-4 font-medium text-secondary">{{ status.count }}</td>
                              <td class="text-right py-3 px-4 text-secondary-gray">{{ status.percentage }}%</td>
                              <td class="text-right py-3 px-4">
                                <div class="w-32 ml-auto bg-gray-200 rounded-full h-2">
                                  <div class="h-2 rounded-full" [ngClass]="getStatusColor(status.color)" [style.width.%]="status.percentage"></div>
                                </div>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- 7 Days Trend -->
                  <div class="mt-6">
                    <h3 class="text-lg font-semibold text-secondary mb-3">Évolution sur 7 jours</h3>
                    <div class="flex items-end justify-between h-40 gap-2">
                      @for (day of dash.appointments.byTimeRange; track day.period) {
                        <div class="flex-1 flex flex-col items-center gap-2">
                          <div class="w-full flex flex-col gap-1">
                            <div 
                              class="w-full bg-green-500 rounded-t transition-all duration-300"
                              [style.height.%]="getCompletedChartHeight(day.completed)"
                              title="Terminés: {{ day.completed }}">
                            </div>
                            <div 
                              class="w-full bg-red-400 transition-all duration-300"
                              [style.height.%]="getCancelledChartHeight(day.cancelled)"
                              title="Annulés: {{ day.cancelled }}">
                            </div>
                          </div>
                          <span class="text-xs text-secondary-gray transform -rotate-45 origin-top-left whitespace-nowrap">
                            {{ day.period.split(' ')[0] }}
                          </span>
                        </div>
                      }
                    </div>
                    <div class="flex justify-center gap-6 mt-4">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-green-500 rounded"></div>
                        <span class="text-sm text-secondary-gray">Terminés</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-red-400 rounded"></div>
                        <span class="text-sm text-secondary-gray">Annulés</span>
                      </div>
                    </div>
                  </div>
                </div>
              }

              <!-- Clients Tab -->
              @if (activeTab === 'clients') {
                <div class="space-y-6">
                  <h2 class="text-2xl font-bold text-secondary mb-4">Statistiques des Clients</h2>
                  
                  <!-- Summary Cards -->
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <div class="text-sm text-blue-700">Total Clients</div>
                      <div class="text-2xl font-bold text-blue-600">{{ dash.clients.totalClients }}</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <div class="text-sm text-green-700">Nouveaux</div>
                      <div class="text-2xl font-bold text-green-600">{{ dash.clients.newClients }}</div>
                    </div>
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                      <div class="text-sm text-purple-700">Récurrents</div>
                      <div class="text-2xl font-bold text-purple-600">{{ dash.clients.returningClients }}</div>
                    </div>
                    <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                      <div class="text-sm text-orange-700">Rétention</div>
                      <div class="text-2xl font-bold text-orange-600">{{ dash.clients.retentionRate }}%</div>
                    </div>
                  </div>

                  <!-- Top Clients Table -->
                  <div>
                    <h3 class="text-lg font-semibold text-secondary mb-3">Top 10 Clients (par dépenses)</h3>
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Rang</th>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Client</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">RDV</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Dépenses</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Dernière visite</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (client of dash.clients.topClients; track client.clientId; let i = $index) {
                            <tr class="border-b hover:bg-gray-50">
                              <td class="py-3 px-4">
                                @if (i < 3) {
                                  <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                                       [ngClass]="i === 0 ? 'bg-yellow-400' : i === 1 ? 'bg-gray-400' : 'bg-orange-400'">
                                    {{ i + 1 }}
                                  </div>
                                } @else {
                                  <span class="text-secondary-gray">{{ i + 1 }}</span>
                                }
                              </td>
                              <td class="py-3 px-4">
                                <div class="flex items-center gap-3">
                                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                    {{ getInitials(client.clientName) }}
                                  </div>
                                  <div>
                                    <div class="font-medium text-secondary">{{ client.clientName }}</div>
                                    @if (client.favoriteService) {
                                      <div class="text-xs text-secondary-gray">{{ client.favoriteService }}</div>
                                    }
                                  </div>
                                </div>
                              </td>
                              <td class="text-right py-3 px-4 text-secondary">{{ client.totalAppointments }}</td>
                              <td class="text-right py-3 px-4 font-bold text-primary">{{ client.totalSpent | fcfa:false }}</td>
                              <td class="text-right py-3 px-4 text-secondary-gray">{{ client.lastVisit | date:'dd/MM/yyyy' }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }

              <!-- Professionals Tab -->
              @if (activeTab === 'professionals') {
                <div class="space-y-6">
                  <h2 class="text-2xl font-bold text-secondary mb-4">Statistiques des Professionnels</h2>
                  
                  <!-- Summary Cards -->
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="text-sm text-secondary-gray">Total</div>
                      <div class="text-2xl font-bold text-secondary">{{ dash.professionals.totalProfessionals }}</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                      <div class="text-sm text-green-700">Actifs</div>
                      <div class="text-2xl font-bold text-green-600">{{ dash.professionals.activeProfessionals }}</div>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4">
                      <div class="text-sm text-blue-700">Nouveaux (30j)</div>
                      <div class="text-2xl font-bold text-blue-600">{{ dash.professionals.newProfessionals }}</div>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                      <div class="text-sm text-yellow-700">Note moyenne</div>
                      <div class="text-2xl font-bold text-yellow-600">{{ dash.professionals.averageRating }} ★</div>
                    </div>
                  </div>

                  <!-- By Category -->
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 class="text-lg font-semibold text-secondary mb-3">Par catégorie</h3>
                      <div class="space-y-3">
                        @for (cat of dash.professionals.byCategory; track cat.category) {
                          <div>
                            <div class="flex justify-between text-sm mb-1">
                              <span class="text-secondary">{{ cat.category }}</span>
                              <span class="text-secondary-gray">{{ cat.count }} ({{ cat.percentage }}%)</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                              <div class="bg-primary h-3 rounded-full transition-all duration-500" [style.width.%]="cat.percentage"></div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <div>
                      <h3 class="text-lg font-semibold text-secondary mb-3">Par commune</h3>
                      <div class="space-y-3">
                        @for (commune of dash.professionals.byCommune; track commune.commune) {
                          <div>
                            <div class="flex justify-between text-sm mb-1">
                              <span class="text-secondary">{{ commune.commune }}</span>
                              <span class="text-secondary-gray">{{ commune.count }} ({{ commune.percentage }}%)</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                              <div class="bg-secondary h-3 rounded-full transition-all duration-500" [style.width.%]="commune.percentage"></div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  <!-- Top Performers Table -->
                  <div class="mt-6">
                    <h3 class="text-lg font-semibold text-secondary mb-3">Top 20 Professionnels (par CA)</h3>
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Rang</th>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Business</th>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Catégorie</th>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Commune</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">RDV</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">CA</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (pro of dash.professionals.topPerformers; track pro.professionalId; let i = $index) {
                            <tr class="border-b hover:bg-gray-50">
                              <td class="py-3 px-4">
                                @if (i === 0) {
                                  <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                  </div>
                                } @else if (i < 3) {
                                  <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white text-sm">
                                    {{ i + 1 }}
                                  </div>
                                } @else {
                                  <span class="text-secondary-gray">{{ i + 1 }}</span>
                                }
                              </td>
                              <td class="py-3 px-4">
                                <div class="font-medium text-secondary">{{ pro.businessName }}</div>
                              </td>
                              <td class="py-3 px-4">
                                <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{{ pro.category }}</span>
                              </td>
                              <td class="py-3 px-4 text-secondary-gray">{{ pro.commune }}</td>
                              <td class="text-right py-3 px-4 text-secondary">{{ pro.totalAppointments }}</td>
                              <td class="text-right py-3 px-4 font-bold text-primary">{{ pro.revenue | fcfa:false }}</td>
                              <td class="text-right py-3 px-4">
                                <div class="flex items-center justify-end gap-1">
                                  <span class="text-secondary">{{ pro.rating }}</span>
                                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                  </svg>
                                </div>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }

              <!-- Revenue Tab -->
              @if (activeTab === 'revenue') {
                <div class="space-y-6">
                  <h2 class="text-2xl font-bold text-secondary mb-4">Statistiques du Chiffre d'Affaires</h2>
                  
                  <!-- Summary Cards -->
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <div class="text-sm text-green-700">CA Total</div>
                      <div class="text-xl font-bold text-green-600">{{ dash.revenue.totalRevenue | fcfa:false }}</div>
                    </div>
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <div class="text-sm text-blue-700">CA Mensuel</div>
                      <div class="text-xl font-bold text-blue-600">{{ dash.revenue.monthlyRevenue | fcfa:false }}</div>
                    </div>
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                      <div class="text-sm text-purple-700">CA Hebdo</div>
                      <div class="text-xl font-bold text-purple-600">{{ dash.revenue.weeklyRevenue | fcfa:false }}</div>
                    </div>
                    <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                      <div class="text-sm text-orange-700">Croissance</div>
                      <div class="text-xl font-bold" [ngClass]="dash.revenue.growthRate >= 0 ? 'text-green-600' : 'text-red-600'">
                        {{ dash.revenue.growthRate >= 0 ? '+' : '' }}{{ dash.revenue.growthRate }}%
                      </div>
                    </div>
                  </div>

                  <!-- Payment Methods -->
                  <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 class="text-lg font-semibold text-secondary mb-3">Par moyen de paiement</h3>
                      <div class="space-y-4">
                        @for (method of dash.revenue.byPaymentMethod; track method.method) {
                          <div class="bg-gray-50 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                              <span class="font-medium text-secondary">{{ method.label }}</span>
                              <span class="text-sm text-secondary-gray">{{ method.percentage }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                              <div class="bg-primary h-3 rounded-full" [style.width.%]="method.percentage"></div>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-secondary-gray">{{ method.count }} transactions</span>
                              <span class="font-bold text-secondary">{{ method.amount | fcfa:false }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <div>
                      <h3 class="text-lg font-semibold text-secondary mb-3">Par commune (Top 10)</h3>
                      <div class="space-y-3">
                        @for (commune of dash.revenue.byCommune.slice(0, 10); track commune.commune) {
                          <div>
                            <div class="flex justify-between text-sm mb-1">
                              <span class="text-secondary">{{ commune.commune }}</span>
                              <span class="font-medium text-secondary">{{ commune.revenue | fcfa:false }}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                              <div class="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" [style.width.%]="commune.percentage"></div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  <!-- By Professional -->
                  <div>
                    <h3 class="text-lg font-semibold text-secondary mb-3">Par professionnel (Top 15)</h3>
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Business</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">RDV</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">CA</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">%</th>
                            <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Moyenne/RDV</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (pro of dash.revenue.byProfessional.slice(0, 15); track pro.professionalId) {
                            <tr class="border-b hover:bg-gray-50">
                              <td class="py-3 px-4 font-medium text-secondary">{{ pro.businessName }}</td>
                              <td class="text-right py-3 px-4 text-secondary">{{ pro.appointments }}</td>
                              <td class="text-right py-3 px-4 font-bold text-primary">{{ pro.revenue | fcfa:false }}</td>
                              <td class="text-right py-3 px-4 text-secondary-gray">{{ pro.percentage }}%</td>
                              <td class="text-right py-3 px-4 text-secondary">{{ pro.averagePerAppointment | fcfa:false }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class AdminStatisticsComponent implements OnInit {
  dashboard = signal<AdminKpiDashboard | null>(null);
  loading = true;
  activeTab = 'appointments';
  selectedPeriod: TimePeriod = 'month';
  
  tabs = [
    { id: 'appointments', label: 'Rendez-vous' },
    { id: 'clients', label: 'Clients' },
    { id: 'professionals', label: 'Professionnels' },
    { id: 'revenue', label: 'Chiffre d\'affaires' }
  ];

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    try {
      const data = this.mockData.getAdminKpiDashboard(this.selectedPeriod);
      this.dashboard.set(data);
    } catch (error) {
      this.toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  getTabClass(tabId: string): string {
    const baseClass = 'border-b-2 transition-colors';
    if (this.activeTab === tabId) {
      return `${baseClass} border-primary text-primary`;
    }
    return `${baseClass} border-transparent text-secondary-gray hover:text-secondary`;
  }

  getStatusColor(color: string): string {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      gray: 'bg-gray-400',
      yellow: 'bg-yellow-500'
    };
    return colorMap[color] || 'bg-gray-400';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getCompletedChartHeight(value: number): number {
    const dash = this.dashboard();
    if (!dash) return 10;
    const data = dash.appointments.byTimeRange || [];
    const maxValue = Math.max(...data.map(d => d.completed), 1);
    return Math.max((value / maxValue) * 50, 10);
  }

  getCancelledChartHeight(value: number): number {
    const dash = this.dashboard();
    if (!dash) return 10;
    const data = dash.appointments.byTimeRange || [];
    const maxValue = Math.max(...data.map(d => d.cancelled), 1);
    return Math.max((value / maxValue) * 50, 5);
  }

  goBack(): void {
    window.history.back();
  }
}
