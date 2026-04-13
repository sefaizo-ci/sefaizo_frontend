import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentMetrics, AppointmentByStatus } from '../models/admin-kpi.models';

@Component({
  selector: 'app-appointments-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-secondary">Rendez-vous</h2>
        <span class="text-sm text-secondary-gray">{{ metrics.total }} total</span>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-green-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ metrics.showUpRate }}%</div>
          <div class="text-xs text-green-700 mt-1">Taux de présentation</div>
        </div>
        <div class="bg-red-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-red-600">{{ metrics.noShowRate }}%</div>
          <div class="text-xs text-red-700 mt-1">Taux d'absence</div>
        </div>
      </div>

      <!-- Status Breakdown -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Par statut</h3>
        <div class="space-y-3">
          @for (status of metrics.byStatus; track status.status) {
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" [ngClass]="getStatusColor(status.color)"></div>
                <span class="text-sm text-secondary">{{ status.label }}</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-secondary">{{ status.count }}</span>
                <span class="text-xs text-secondary-gray ml-1">({{ status.percentage }}%)</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex h-3 rounded-full overflow-hidden bg-gray-100">
          @for (status of metrics.byStatus; track status.status) {
            <div 
              class="transition-all duration-500"
              [ngClass]="getStatusColor(status.color)"
              [style.width.%]="status.percentage"
              [title]="status.label + ': ' + status.count">
            </div>
          }
        </div>
      </div>

      <!-- Type Breakdown -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Par type</h3>
        <div class="flex items-center gap-4">
          <div class="flex-1 bg-secondary/10 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-secondary">{{ metrics.byType.salon }}</div>
            <div class="text-xs text-secondary-gray">Salon ({{ metrics.byType.salonPercentage }}%)</div>
          </div>
          <div class="flex-1 bg-primary/10 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-primary">{{ metrics.byType.home }}</div>
            <div class="text-xs text-secondary-gray">Domicile ({{ metrics.byType.homePercentage }}%)</div>
          </div>
        </div>
      </div>

      <!-- Average Duration -->
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-secondary-gray">Durée moyenne</div>
            <div class="text-lg font-bold text-secondary">{{ metrics.averageDuration }} min</div>
          </div>
          <svg class="w-10 h-10 text-secondary/20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- Mini Chart (7 days) -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Évolution (7 jours)</h3>
        <div class="flex items-end justify-between h-24 gap-1">
          @for (day of metrics.byTimeRange; track day.period) {
            <div class="flex-1 flex flex-col items-center gap-1">
              <div 
                class="w-full bg-primary/20 rounded-t transition-all duration-300 hover:bg-primary/40"
                [style.height.%]="getChartHeight(day.appointments)">
              </div>
              <span class="text-xs text-secondary-gray transform -rotate-45 origin-top-left whitespace-nowrap">
                {{ day.period.split(' ')[0] }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppointmentsWidgetComponent implements OnInit {
  @Input() metrics!: AppointmentMetrics;

  ngOnInit(): void {}

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

  getChartHeight(value: number): number {
    const maxValue = Math.max(...this.metrics.byTimeRange.map(d => d.appointments), 1);
    return Math.max((value / maxValue) * 100, 10);
  }
}
