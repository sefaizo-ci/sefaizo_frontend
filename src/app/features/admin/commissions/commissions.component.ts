import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../core/services/mock-data.service';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-admin-commissions',
  standalone: true,
  imports: [CommonModule, FcfaPipe],
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-secondary mb-2">Commissions & Revenus</h1>
        <p class="text-secondary-gray">Gérez le modèle économique de SEFAIZO inspiré de Planity</p>
      </div>

      <!-- Business Model Info -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-bold text-blue-900 mb-2">💡 Modèle économique SEFAIZO</h3>
        <p class="text-sm text-blue-800">
          SEFAIZO génère des revenus via 5 sources : commissions sur nouveaux clients (15%), frais de transaction Mobile Money (2.5%),
          abonnements Premium (15 000 FCFA/mois), publicité/mise en avant (25 000-50 000 FCFA/mois), et frais d'annulation (3 000 FCFA).
        </p>
      </div>

      <!-- Revenue Sources -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        @for (source of revenueSources; track source.name) {
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center" [class]="source.bgClass">
                <span class="text-2xl">{{ source.icon }}</span>
              </div>
              <div>
                <h3 class="font-bold text-secondary">{{ source.name }}</h3>
                <p class="text-xs text-secondary-gray">{{ source.description }}</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-secondary-gray">{{ source.rateLabel }}</span>
                <span class="font-bold text-secondary">{{ source.rate }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-secondary-gray">Revenu ce mois</span>
                <span class="font-bold text-primary">{{ source.monthlyRevenue | number:'1.0-0' }} FCFA</span>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Commission Settings -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-secondary">Taux de commission actuels</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Type</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Taux/Montant</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Description</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (rate of commissionRates; track rate.type) {
                <tr>
                  <td class="px-6 py-4 font-medium text-secondary">{{ rate.label }}</td>
                  <td class="px-6 py-4">
                    @if (rate.percentage) {
                      <span class="font-bold text-primary">{{ rate.percentage }}%</span>
                    } @else {
                      <span class="font-bold text-primary">{{ rate.fixedAmount | number:'1.0-0' }} FCFA</span>
                    }
                  </td>
                  <td class="px-6 py-4 text-sm text-secondary-gray">{{ rate.description }}</td>
                  <td class="px-6 py-4">
                    @if (rate.isActive) {
                      <span class="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        Actif
                      </span>
                    } @else {
                      <span class="text-sm text-gray-400">Inactif</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Revenue Breakdown Chart Placeholder -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-secondary mb-6">Répartition des revenus par source</h3>
          <div class="space-y-4">
            @for (item of revenueBreakdown; track item.name) {
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-secondary-gray">{{ item.name }}</span>
                  <span class="font-semibold text-secondary">{{ item.amount | number:'1.0-0' }} FCFA ({{ item.percentage }}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="h-3 rounded-full" [style.width.%]="item.percentage" [class]="item.color"></div>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-secondary mb-6">Top 5 Professionnels par CA généré</h3>
          <div class="space-y-4">
            @for (pro of topProsByRevenue; track pro.name; let i = $index) {
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm">
                  {{ i + 1 }}
                </div>
                <div class="flex-1">
                  <div class="font-medium text-secondary">{{ pro.name }}</div>
                  <div class="text-sm text-secondary-gray">{{ pro.bookings }} réservations</div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-primary">{{ pro.revenue | number:'1.0-0' }} FCFA</div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminCommissionsComponent implements OnInit {
  revenueSources: any[] = [];
  commissionRates: any[] = [];
  revenueBreakdown: any[] = [];
  topProsByRevenue: any[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.revenueSources = [
      { name: 'Commission Marketplace', icon: '🏪', description: '15% sur nouveaux clients', rate: '15%', rateLabel: 'Taux', monthlyRevenue: 245000, bgClass: 'bg-primary/10' },
      { name: 'Frais Transaction', icon: '📱', description: '2.5% Mobile Money', rate: '2.5%', rateLabel: 'Taux', monthlyRevenue: 42000, bgClass: 'bg-blue-100' },
      { name: 'Abonnement Premium', icon: '⭐', description: '15 000 FCFA/mois', rate: '15 000 FCFA', rateLabel: 'Prix', monthlyRevenue: 150000, bgClass: 'bg-yellow-100' },
      { name: 'Publicité', icon: '📢', description: 'Mise en avant pros', rate: '25 000 FCFA', rateLabel: 'Prix', monthlyRevenue: 75000, bgClass: 'bg-purple-100' },
      { name: 'Annulation', icon: '❌', description: 'Frais annulation tardive', rate: '3 000 FCFA', rateLabel: 'Montant', monthlyRevenue: 18000, bgClass: 'bg-red-100' },
    ];

    this.commissionRates = [
      { type: 'MARKETPLACE', label: 'Commission Marketplace', percentage: 15, fixedAmount: 0, description: 'Commission sur nouveaux clients marketplace', isActive: true },
      { type: 'TRANSACTION', label: 'Frais Transaction', percentage: 2.5, fixedAmount: 0, description: 'Frais sur paiements Mobile Money', isActive: true },
      { type: 'CANCELLATION', label: 'Frais d\'annulation', percentage: 0, fixedAmount: 3000, description: 'Annulation tardive (< 24h)', isActive: true },
      { type: 'PREMIUM', label: 'Abonnement Premium', percentage: 0, fixedAmount: 15000, description: 'Abonnement mensuel professionnel', isActive: true },
      { type: 'FEATURED', label: 'Mise en avant', percentage: 0, fixedAmount: 25000, description: 'Listing mis en avant marketplace', isActive: true },
    ];

    const total = 530000;
    this.revenueBreakdown = [
      { name: 'Commission Marketplace', amount: 245000, percentage: 46, color: 'bg-primary' },
      { name: 'Abonnement Premium', amount: 150000, percentage: 28, color: 'bg-yellow-500' },
      { name: 'Publicité', amount: 75000, percentage: 14, color: 'bg-purple-500' },
      { name: 'Frais Transaction', amount: 42000, percentage: 8, color: 'bg-blue-500' },
      { name: 'Annulation', amount: 18000, percentage: 4, color: 'bg-red-500' },
    ];

    this.topProsByRevenue = [
      { name: 'Beauty Salon Cocody', bookings: 45, revenue: 360000 },
      { name: 'Luxury Beauty Treichville', bookings: 38, revenue: 320000 },
      { name: 'Barber Shop Plateau', bookings: 32, revenue: 280000 },
      { name: 'Nails & Spa Yopougon', bookings: 28, revenue: 240000 },
      { name: 'Afro Hair Style Adjamé', bookings: 25, revenue: 195000 },
    ];
  }
}
