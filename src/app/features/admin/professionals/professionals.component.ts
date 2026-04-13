import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Business } from '../../../core/models';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-admin-professionals',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent, FcfaPipe],
  template: `
    <div class="p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-secondary mb-2">Professionnels</h1>
          <p class="text-secondary-gray">Gérez tous les professionnels de la plateforme</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="filterProfessionals()"
              placeholder="Rechercher un professionnel..."
              class="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80">
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <select
            [(ngModel)]="statusFilter"
            (ngModelChange)="filterProfessionals()"
            class="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
            <option value="all">Tous les statuts</option>
            <option value="ACTIVE">Actifs</option>
            <option value="SUSPENDED">Suspendus</option>
            <option value="PENDING">En attente</option>
          </select>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-secondary-gray mb-1">Total Professionnels</p>
              <p class="text-3xl font-bold text-secondary">{{ professionals.length }}</p>
            </div>
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-secondary-gray mb-1">Actifs</p>
              <p class="text-3xl font-bold text-green-600">{{ activeCount }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-secondary-gray mb-1">Suspendus</p>
              <p class="text-3xl font-bold text-red-600">{{ suspendedCount }}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-secondary-gray mb-1">Vérifiés</p>
              <p class="text-3xl font-bold text-blue-600">{{ verifiedCount }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Professionnel</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Catégories</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Commune</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Note</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Statut</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Vérifié</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            @for (pro of filteredProfessionals(); track pro.id) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img [src]="pro.avatar || 'https://via.placeholder.com/40'" class="w-10 h-10 rounded-full object-cover">
                    <div>
                      <div class="font-semibold text-secondary">{{ pro.name }}</div>
                      <div class="text-sm text-secondary-gray">{{ pro.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    @for (cat of pro.categories.slice(0, 2); track cat) {
                      <span class="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                        {{ cat }}
                      </span>
                    }
                    @if (pro.categories.length > 2) {
                      <span class="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                        +{{ pro.categories.length - 2 }}
                      </span>
                    }
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-secondary-gray">{{ pro.city }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1">
                    <span class="font-semibold text-secondary">{{ pro.rating }}</span>
                    <span class="text-yellow-500">★</span>
                    <span class="text-sm text-secondary-gray">({{ pro.reviewCount }})</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <app-badge [variant]="pro.status === 'ACTIVE' ? 'success' : pro.status === 'SUSPENDED' ? 'error' : 'warning'">
                    {{ getStatusLabel(pro.status) }}
                  </app-badge>
                </td>
                <td class="px-6 py-4">
                  @if (pro.isVerified) {
                    <span class="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      Oui
                    </span>
                  } @else {
                    <span class="text-sm text-secondary-gray">Non</span>
                  }
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    @if (pro.status === 'ACTIVE') {
                      <button
                        (click)="suspendProfessional(pro.id)"
                        class="text-sm text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded transition-colors">
                        Suspendre
                      </button>
                    } @else if (pro.status === 'SUSPENDED') {
                      <button
                        (click)="activateProfessional(pro.id)"
                        class="text-sm text-green-600 hover:bg-green-50 px-3 py-1.5 rounded transition-colors">
                        Activer
                      </button>
                    }
                    <button
                      (click)="viewDetails(pro)"
                      class="text-sm text-primary hover:bg-primary/5 px-3 py-1.5 rounded transition-colors">
                      Détails
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>

        @if (filteredProfessionals().length === 0) {
          <div class="p-12 text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <p class="text-secondary-gray text-lg">Aucun professionnel trouvé</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class AdminProfessionalsComponent implements OnInit {
  professionals: Business[] = [];
  filteredProfessionals = signal<Business[]>([]);
  searchQuery = '';
  statusFilter = 'all';
  
  activeCount = 0;
  suspendedCount = 0;
  verifiedCount = 0;

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.professionals = this.mockData.getBusinesses();
    this.filterProfessionals();
  }

  filterProfessionals(): void {
    let filtered = [...this.professionals];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(pro =>
        pro.name.toLowerCase().includes(query) ||
        pro.email?.toLowerCase().includes(query) ||
        pro.city.toLowerCase().includes(query)
      );
    }

    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(pro => pro.status === this.statusFilter);
    }

    this.filteredProfessionals.set(filtered);

    // Update counts
    this.activeCount = this.professionals.filter(p => p.status === 'ACTIVE').length;
    this.suspendedCount = this.professionals.filter(p => p.status === 'SUSPENDED').length;
    this.verifiedCount = this.professionals.filter(p => p.isVerified).length;
  }

  suspendProfessional(id: string): void {
    this.toast.success('Professionnel suspendu');
  }

  activateProfessional(id: string): void {
    this.toast.success('Professionnel réactivé');
  }

  viewDetails(pro: Business): void {
    this.toast.info(`Détails de ${pro.name}`);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'ACTIVE': 'Actif',
      'SUSPENDED': 'Suspendu',
      'PENDING': 'En attente'
    };
    return labels[status] || status;
  }
}
