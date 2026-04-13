import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueMetrics } from '../models/admin-kpi.models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-revenue-widget',
  standalone: true,
  imports: [CommonModule, FcfaPipe],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-secondary">Chiffre d'Affaires</h2>
        @if (metrics.growthRate !== undefined) {
          <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" 
               [ngClass]="metrics.growthRate >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
            <svg class="w-3 h-3" [ngClass]="metrics.growthRate >= 0 ? 'transform rotate-0' : 'transform rotate-180'" 
                 fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ metrics.growthRate >= 0 ? '+' : '' }}{{ metrics.growthRate }}%
          </div>
        }
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div class="text-xs text-green-700 mb-1">CA Mensuel</div>
          <div class="text-xl font-bold text-green-600">{{ metrics.monthlyRevenue | fcfa:false }}</div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div class="text-xs text-blue-700 mb-1">CA Hebdo</div>
          <div class="text-xl font-bold text-blue-600">{{ metrics.weeklyRevenue | fcfa:false }}</div>
        </div>
      </div>

      <!-- Averages -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="text-xs text-secondary-gray">Moyenne par RDV</div>
          <div class="text-lg font-bold text-secondary">{{ metrics.averagePerAppointment | fcfa:false }}</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="text-xs text-secondary-gray">Moyenne par client</div>
          <div class="text-lg font-bold text-secondary">{{ metrics.averagePerClient | fcfa:false }}</div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Par moyen de paiement</h3>
        <div class="space-y-3">
          @for (method of metrics.byPaymentMethod; track method.method) {
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  @if (method.method === 'MOBILE_MONEY') {
                    <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v8h12V6H4z"/>
                      <path d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"/>
                    </svg>
                  } @else {
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
                    </svg>
                  }
                </div>
                <div>
                  <div class="font-medium text-secondary">{{ method.label }}</div>
                  <div class="text-xs text-secondary-gray">{{ method.count }} transactions</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-secondary">{{ method.amount | fcfa:false }}</div>
                <div class="text-xs text-secondary-gray">{{ method.percentage }}%</div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Revenue Trend (7 days) -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Évolution (7 jours)</h3>
        <div class="flex items-end justify-between h-24 gap-1">
          @for (day of metrics.byPeriod; track day.period) {
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

      <!-- Top Communes by Revenue -->
      <div>
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Top communes (CA)</h3>
        <div class="space-y-2">
          @for (commune of metrics.byCommune.slice(0, 4); track commune.commune) {
            <div class="flex items-center justify-between">
              <span class="text-sm text-secondary">{{ commune.commune }}</span>
              <div class="flex items-center gap-3">
                <div class="w-24 bg-gray-100 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    [style.width.%]="commune.percentage">
                  </div>
                </div>
                <span class="text-sm font-semibold text-secondary min-w-[80px] text-right">
                  {{ commune.revenue | fcfa:false }}
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RevenueWidgetComponent {
  @Input() metrics!: RevenueMetrics;

  getChartHeight(value: number): number {
    const maxValue = Math.max(...this.metrics.byPeriod.map(d => d.revenue), 1);
    return Math.max((value / maxValue) * 100, 10);
  }
}
