import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalMetrics } from '../models/admin-kpi.models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-professionals-widget',
  standalone: true,
  imports: [CommonModule, FcfaPipe],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-secondary">Professionnels</h2>
        <span class="text-sm text-secondary-gray">{{ metrics.totalProfessionals }} inscrits</span>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <div class="text-xl font-bold text-secondary">{{ metrics.activeProfessionals }}</div>
          <div class="text-xs text-secondary-gray">Actifs</div>
        </div>
        <div class="text-center p-3 bg-green-50 rounded-lg">
          <div class="text-xl font-bold text-green-600">{{ metrics.newProfessionals }}</div>
          <div class="text-xs text-green-700">Nouveaux (30j)</div>
        </div>
        <div class="text-center p-3 bg-primary/5 rounded-lg">
          <div class="text-xl font-bold text-primary">{{ metrics.averageRating }}</div>
          <div class="text-xs text-secondary-gray">Note moy.</div>
        </div>
      </div>

      <!-- KYC Status -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Statut KYC</h3>
        <div class="flex h-4 rounded-full overflow-hidden bg-gray-100 mb-3">
          <div 
            class="bg-green-500 transition-all duration-500"
            [style.width.%]="metrics.kycStatus.approvedPercentage"
            title="Approuvés: {{ metrics.kycStatus.approved }}">
          </div>
          <div 
            class="bg-yellow-500 transition-all duration-500"
            [style.width.%]="metrics.kycStatus.pendingPercentage"
            title="En attente: {{ metrics.kycStatus.pending }}">
          </div>
          <div 
            class="bg-red-500 transition-all duration-500"
            [style.width.%]="metrics.kycStatus.rejectedPercentage"
            title="Rejetés: {{ metrics.kycStatus.rejected }}">
          </div>
        </div>
        <div class="flex justify-between text-xs">
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-secondary-gray">{{ metrics.kycStatus.approved }} Approuvés</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span class="text-secondary-gray">{{ metrics.kycStatus.pending }} En attente</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-red-500"></div>
            <span class="text-secondary-gray">{{ metrics.kycStatus.rejected }} Rejetés</span>
          </div>
        </div>
      </div>

      <!-- By Category -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Par catégorie</h3>
        <div class="space-y-2">
          @for (cat of metrics.byCategory.slice(0, 5); track cat.category) {
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-full bg-gray-100 rounded-full h-2 flex-1">
                  <div 
                    class="bg-primary h-2 rounded-full transition-all duration-500"
                    [style.width.%]="cat.percentage">
                  </div>
                </div>
                <span class="text-sm text-secondary ml-2 whitespace-nowrap">{{ cat.category }}</span>
              </div>
              <div class="text-right min-w-[60px]">
                <span class="text-sm font-semibold text-secondary">{{ cat.count }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Top Performers -->
      <div>
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Top Performers</h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          @for (pro of metrics.topPerformers.slice(0, 5); track pro.professionalId; let i = $index) {
            <div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="relative">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-white font-bold text-sm">
                  @if (pro.avatar) {
                    <img [src]="pro.avatar" [alt]="pro.businessName" class="w-full h-full object-cover rounded-lg">
                  } @else {
                    {{ getInitials(pro.businessName) }}
                  }
                </div>
                @if (i === 0) {
                  <div class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-xs">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                }
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-secondary truncate">{{ pro.businessName }}</div>
                <div class="text-xs text-secondary-gray">{{ pro.commune }} • {{ pro.category }}</div>
              </div>
              <div class="text-right">
                <div class="font-bold text-primary">{{ pro.revenue | fcfa:false }}</div>
                <div class="text-xs text-secondary-gray">{{ pro.completedAppointments }} RDV</div>
              </div>
            </div>
          }
          @empty {
            <div class="text-center text-secondary-gray py-4">Aucun professionnel pour le moment</div>
          }
        </div>
      </div>

      <!-- By Commune -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-secondary-gray mb-3">Par commune</h3>
        <div class="flex flex-wrap gap-2">
          @for (commune of metrics.byCommune.slice(0, 6); track commune.commune) {
            <div class="bg-gray-50 rounded-full px-3 py-1.5">
              <span class="text-sm text-secondary">{{ commune.commune }}</span>
              <span class="text-xs text-secondary-gray ml-1">({{ commune.count }})</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfessionalsWidgetComponent {
  @Input() metrics!: ProfessionalMetrics;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
