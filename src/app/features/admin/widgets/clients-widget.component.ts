import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientMetrics } from '../models/admin-kpi.models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-clients-widget',
  standalone: true,
  imports: [CommonModule, FcfaPipe],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-secondary">Clients</h2>
        <span class="text-sm text-secondary-gray">{{ metrics.totalClients }} total</span>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ metrics.newClients }}</div>
          <div class="text-xs text-blue-700 mt-1">Nouveaux clients</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ metrics.returningClients }}</div>
          <div class="text-xs text-purple-700 mt-1">Clients récurrents</div>
        </div>
      </div>

      <!-- Retention & Visits -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="text-sm text-secondary-gray">Taux de rétention</div>
          <div class="text-2xl font-bold" [ngClass]="metrics.retentionRate >= 50 ? 'text-green-600' : 'text-orange-600'">
            {{ metrics.retentionRate }}%
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="text-sm text-secondary-gray">Visites moyennes</div>
          <div class="text-2xl font-bold text-secondary">{{ metrics.averageVisitsPerClient }}</div>
        </div>
      </div>

      <!-- Average Spend -->
      <div class="bg-primary/5 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-secondary-gray">Dépense moyenne par client</div>
            <div class="text-2xl font-bold text-primary">{{ metrics.averageSpendPerClient | fcfa:false }}</div>
          </div>
          <svg class="w-12 h-12 text-primary/20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- Top Clients -->
      <div>
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Top 5 Clients</h3>
        <div class="space-y-3">
          @for (client of metrics.topClients; track client.clientId; let i = $index) {
            <div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="relative">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {{ getInitials(client.clientName) }}
                </div>
                @if (i < 3) {
                  <div class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-white border-2 border-white">
                    {{ i + 1 }}
                  </div>
                }
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-secondary truncate">{{ client.clientName }}</div>
                <div class="text-xs text-secondary-gray">{{ client.totalAppointments }} RDV</div>
              </div>
              <div class="text-right">
                <div class="font-bold text-primary">{{ client.totalSpent | fcfa:false }}</div>
              </div>
            </div>
          }
          @empty {
            <div class="text-center text-secondary-gray py-4">Aucun client pour le moment</div>
          }
        </div>
      </div>

      <!-- New Clients Trend -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Nouveaux clients (7 jours)</h3>
        <div class="flex items-end justify-between h-20 gap-1">
          @for (day of metrics.newClientsTrend; track day.label) {
            <div class="flex-1 flex flex-col items-center gap-1">
              <div 
                class="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
                [style.height.%]="getTrendHeight(day.value)">
              </div>
              <span class="text-xs text-secondary-gray transform -rotate-45 origin-top-left whitespace-nowrap">
                {{ day.label.split(' ')[0] }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientsWidgetComponent {
  @Input() metrics!: ClientMetrics;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getTrendHeight(value: number): number {
    const maxValue = Math.max(...this.metrics.newClientsTrend.map(d => d.value), 1);
    return Math.max((value / maxValue) * 100, 10);
  }
}
