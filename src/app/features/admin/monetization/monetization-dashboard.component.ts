import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { PlatformRevenueWidgetComponent } from '../widgets/platform-revenue-widget.component';
import {
  PlatformRevenueSummary,
  MonetizationMetrics,
  PlatformWallet,
  CommissionSettings,
  PremiumPlan,
  AdvertisingOption
} from '../models/commission.models';

@Component({
  selector: 'app-monetization-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FcfaPipe, PlatformRevenueWidgetComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary to-primary-dark text-white py-8">
        <div class="container-custom">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Business Model & Revenus</h1>
              <p class="text-white/80">Tableau de bord de monétisation SEFAIZO</p>
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
        } @else if (revenueData() && metricsData() && settingsData()) {
          @let r = revenueData();
          @let m = metricsData();
          @let s = settingsData();
          @let w = walletData();
          @let pp = premiumPlansData();
          @let ao = advertisingOptionsData();

          <!-- Commission Rates Info -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-bold text-secondary mb-4">Grille de Commission</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                  <h3 class="font-semibold text-green-800">Commission Marketplace</h3>
                </div>
                <div class="text-2xl font-bold text-green-600 mb-1">{{ s!.marketplaceCommissionRate }}%</div>
                <p class="text-sm text-green-700">Sur les nouveaux clients trouvés via la marketplace</p>
              </div>
              
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                  <h3 class="font-semibold text-blue-800">Frais de Transaction</h3>
                </div>
                <div class="text-2xl font-bold text-blue-600 mb-1">{{ s!.transactionFeeRate }}%</div>
                <p class="text-sm text-blue-700">Sur tous les paiements Mobile Money</p>
              </div>
              
              <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                  <h3 class="font-semibold text-purple-800">Abonnement Premium</h3>
                </div>
                <div class="text-2xl font-bold text-purple-600 mb-1">{{ s!.premiumMonthlyPrice | fcfa:false }}</div>
                <p class="text-sm text-purple-700">Par professionnel par mois</p>
              </div>
            </div>
          </div>

          <!-- Main Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="text-2xl font-bold text-secondary">{{ m!.totalPlatformRevenue | fcfa:false }}</div>
              <div class="text-sm text-secondary-gray">Revenu Total Plateforme</div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2h8.25a.75.75 0 01.53.22l2.5 2.5a.75.75 0 01-.53 1.28H3a1 1 0 100 2h10.75a.75.75 0 01.53.22l2.5 2.5a.75.75 0 01-.53 1.28H3a1 1 0 100 2h13a1 1 0 001-1V7a1 1 0 00-1-1H3zM4 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="text-2xl font-bold text-secondary">{{ m!.gmv | fcfa:false }}</div>
              <div class="text-sm text-secondary-gray">GMV (Volume Transactions)</div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="text-2xl font-bold text-secondary">{{ m!.takeRate }}%</div>
              <div class="text-sm text-secondary-gray">Take Rate (Marge)</div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
              </div>
              <div class="text-2xl font-bold text-secondary">{{ m!.averageRevenuePerProfessional | fcfa:false }}</div>
              <div class="text-sm text-secondary-gray">Revenu Pro Moyen</div>
            </div>
          </div>

          <!-- Main Revenue Widget -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            @if (r && m && w) {
            <app-platform-revenue-widget 
              [revenue]="r"
              [metrics]="m"
              [wallet]="w">
            </app-platform-revenue-widget>
            }

            <!-- Premium & Advertising -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-bold text-secondary mb-6">Offres Premium & Publicité</h2>
              
              <!-- Premium Plans -->
              <div class="mb-6">
                <h3 class="text-sm font-semibold text-secondary-gray mb-3">Abonnements Premium</h3>
                <div class="space-y-3">
                  @for (plan of pp; track plan.id) {
                    <div class="border rounded-lg p-4" [class.bg-purple-50]="plan.price > 0">
                      <div class="flex justify-between items-center mb-2">
                        <div>
                          <div class="font-semibold text-secondary">{{ plan.name }}</div>
                          <div class="text-xs text-secondary-gray">{{ plan.subscribedProfessionals }} professionnels</div>
                        </div>
                        <div class="text-right">
                          <div class="text-lg font-bold" [class.text-purple-600]="plan.price > 0">{{ plan.price === 0 ? 'Gratuit' : (plan.price | fcfa:false) }}</div>
                          <div class="text-xs text-secondary-gray">/mois</div>
                        </div>
                      </div>
                      <div class="flex flex-wrap gap-1">
                        @for (feature of plan.features.slice(0, 3); track feature) {
                          <span class="text-xs bg-white px-2 py-1 rounded border">{{ feature }}</span>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Advertising Options -->
              <div>
                <h3 class="text-sm font-semibold text-secondary-gray mb-3">Options Publicitaires</h3>
                <div class="space-y-3">
                  @for (ad of ao; track ad.id) {
                    <div class="bg-gray-50 rounded-lg p-3">
                      <div class="flex justify-between items-center mb-1">
                        <div class="font-medium text-secondary">{{ ad.name }}</div>
                        <div class="text-sm font-bold text-primary">{{ ad.price | fcfa:false }}</div>
                      </div>
                      <div class="text-xs text-secondary-gray mb-2">{{ ad.description }}</div>
                      <div class="flex justify-between items-center">
                        <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{{ ad.subscribedCount }} abonnés</span>
                        <span class="text-xs text-secondary-gray">{{ ad.type }}</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- Revenue by Professional Table -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-secondary mb-6">Revenus par Professionnel (Top 10)</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Business</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">RDV</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Revenu Plateforme</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">%</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Moyenne/RDV</th>
                  </tr>
                </thead>
                <tbody>
                  @for (pro of r!.byProfessional; track pro.professionalId) {
                    <tr class="border-b hover:bg-gray-50">
                      <td class="py-3 px-4 font-medium text-secondary">{{ pro.businessName }}</td>
                      <td class="text-right py-3 px-4 text-secondary">{{ pro.bookings }}</td>
                      <td class="text-right py-3 px-4 font-bold text-primary">{{ pro.revenue | fcfa:false }}</td>
                      <td class="text-right py-3 px-4 text-secondary-gray">{{ pro.percentage }}%</td>
                      <td class="text-right py-3 px-4 text-secondary">{{ pro.avgCommissionPerBooking | fcfa:false }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class MonetizationDashboardComponent implements OnInit {
  revenueData = signal<PlatformRevenueSummary | null>(null);
  metricsData = signal<MonetizationMetrics | null>(null);
  walletData = signal<PlatformWallet | null>(null);
  settingsData = signal<CommissionSettings | null>(null);
  premiumPlansData = signal<PremiumPlan[]>([]);
  advertisingOptionsData = signal<AdvertisingOption[]>([]);
  loading = true;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.revenueData.set(this.mockData.getPlatformRevenueSummary());
    this.metricsData.set(this.mockData.getMonetizationMetrics());
    this.walletData.set(this.mockData.getPlatformWallet());
    this.settingsData.set(this.mockData.getCommissionSettings());
    this.premiumPlansData.set(this.mockData.getPremiumPlans());
    this.advertisingOptionsData.set(this.mockData.getAdvertisingOptions());
    this.loading = false;
  }

  goBack(): void {
    window.history.back();
  }
}
