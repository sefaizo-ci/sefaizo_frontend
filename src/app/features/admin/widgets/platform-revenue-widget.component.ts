import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { PlatformRevenueSummary, MonetizationMetrics, PlatformWallet } from '../models/commission.models';

@Component({
  selector: 'app-platform-revenue-widget',
  standalone: true,
  imports: [CommonModule, FcfaPipe],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-secondary">Revenus Plateforme</h2>
        <span class="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
          Business Model
        </span>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div class="text-xs text-green-700 mb-1">Revenu Total</div>
          <div class="text-xl font-bold text-green-600">{{ metrics.totalPlatformRevenue | fcfa:false }}</div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div class="text-xs text-blue-700 mb-1">GMV (Total Transactions)</div>
          <div class="text-xl font-bold text-blue-600">{{ metrics.gmv | fcfa:false }}</div>
        </div>
      </div>

      <!-- Take Rate -->
      <div class="bg-primary/5 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-secondary-gray">Take Rate (% du GMV capté)</div>
            <div class="text-2xl font-bold text-primary">{{ metrics.takeRate }}%</div>
          </div>
          <div class="text-right">
            <div class="text-sm text-secondary-gray">Revenu/RDV moyen</div>
            <div class="text-lg font-bold text-secondary">{{ getAvgRevenuePerBooking() }} FCFA</div>
          </div>
        </div>
      </div>

      <!-- Revenue by Type -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Par source de revenu</h3>
        <div class="space-y-3">
          @for (item of revenue.byType; track item.type) {
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" [ngClass]="getTypeColor(item.type)"></div>
                  <span class="text-sm font-medium text-secondary">{{ item.label }}</span>
                </div>
                <div class="text-right">
                  <div class="font-bold text-secondary">{{ item.amount | fcfa:false }}</div>
                  <div class="text-xs text-secondary-gray">{{ item.percentage }}%</div>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-500" 
                  [ngClass]="getTypeColor(item.type)"
                  [style.width.%]="item.percentage">
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Platform Wallet -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Wallet Plateforme</h3>
        <div class="bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm opacity-80">Solde disponible</span>
            <svg class="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
              <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="text-2xl font-bold mb-1">{{ wallet.balance | fcfa:false }}</div>
          <div class="text-xs opacity-70">
            {{ wallet.pendingBalance | fcfa:false }} en attente • 
            Collecté: {{ wallet.totalCollected | fcfa:false }}
          </div>
        </div>
      </div>

      <!-- Revenue Trend (7 days) -->
      <div>
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Évolution (7 jours)</h3>
        <div class="flex items-end justify-between h-24 gap-1">
          @for (day of revenue.byPeriod; track day.period) {
            <div class="flex-1 flex flex-col items-center gap-1">
              <div 
                class="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-300 hover:from-green-700 hover:to-green-500"
                [style.height.%]="getChartHeight(day.revenue)"
                [title]="day.revenue | currency:'XOF':'symbol':'1.0-0'">
              </div>
              <span class="text-xs text-secondary-gray transform -rotate-45 origin-top-left whitespace-nowrap">
                {{ day.period.split(' ')[0] }}
              </span>
            </div>
          }
        </div>
      </div>

      <!-- Projection -->
      <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm font-semibold text-yellow-800">Projection Mensuelle</span>
        </div>
        <div class="text-2xl font-bold text-yellow-700">{{ revenue.projectedMonthly | fcfa:false }}</div>
        <div class="text-xs text-yellow-600 mt-1">
          Basé sur les 7 derniers jours
          @if (revenue.growthRate !== undefined) {
            <span [ngClass]="revenue.growthRate >= 0 ? 'text-green-600' : 'text-red-600'" class="font-medium ml-2">
              {{ revenue.growthRate >= 0 ? '+' : '' }}{{ revenue.growthRate }}%
            </span>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PlatformRevenueWidgetComponent {
  @Input() revenue!: PlatformRevenueSummary;
  @Input() metrics!: MonetizationMetrics;
  @Input() wallet!: PlatformWallet;

  getTypeColor(type: string): string {
    const colorMap: Record<string, string> = {
      MARKETPLACE: 'bg-green-500',
      TRANSACTION: 'bg-blue-500',
      PREMIUM: 'bg-purple-500',
      ADVERTISING: 'bg-orange-500'
    };
    return colorMap[type] || 'bg-gray-400';
  }

  getChartHeight(value: number): number {
    const maxValue = Math.max(...this.revenue.byPeriod.map(d => d.revenue), 1);
    return Math.max((value / maxValue) * 100, 10);
  }

  getAvgRevenuePerBooking(): number {
    const totalBookings = this.revenue.byProfessional.reduce((sum, p) => sum + p.bookings, 0);
    if (totalBookings === 0) return 0;
    return Math.round(this.revenue.totalRevenue / totalBookings);
  }
}
