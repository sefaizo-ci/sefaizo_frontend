import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: Date;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: Date;
}

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-secondary mb-2">Clients</h1>
          <p class="text-secondary-gray">Gérez tous les clients de la plateforme</p>
        </div>
        <div class="relative">
          <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="filterClients()"
            placeholder="Rechercher un client..."
            class="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-80">
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Total Clients</p>
          <p class="text-3xl font-bold text-secondary">{{ clients.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Actifs</p>
          <p class="text-3xl font-bold text-green-600">{{ activeCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Réservations Totales</p>
          <p class="text-3xl font-bold text-primary">{{ totalBookings }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">CA Généré</p>
          <p class="text-3xl font-bold text-secondary">{{ totalRevenue | number:'1.0-0' }} FCFA</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Client</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Téléphone</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Réservations</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Total Dépensé</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Dernier RDV</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Statut</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            @for (client of filteredClients(); track client.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img [src]="client.avatar" class="w-10 h-10 rounded-full">
                    <div>
                      <div class="font-semibold text-secondary">{{ client.firstName }} {{ client.lastName }}</div>
                      <div class="text-sm text-secondary-gray">{{ client.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-secondary-gray">{{ client.phone }}</td>
                <td class="px-6 py-4 text-sm font-semibold text-secondary">{{ client.totalBookings }}</td>
                <td class="px-6 py-4 text-sm font-semibold text-primary">{{ client.totalSpent | number:'1.0-0' }} FCFA</td>
                <td class="px-6 py-4 text-sm text-secondary-gray">{{ client.lastBooking | date:'dd/MM/yyyy' }}</td>
                <td class="px-6 py-4">
                  <app-badge [variant]="client.status === 'ACTIVE' ? 'success' : 'error'">
                    {{ client.status === 'ACTIVE' ? 'Actif' : 'Suspendu' }}
                  </app-badge>
                </td>
                <td class="px-6 py-4">
                  <button (click)="viewClient(client)" class="text-sm text-primary hover:bg-primary/5 px-3 py-1.5 rounded transition-colors">
                    Détails
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class AdminClientsComponent implements OnInit {
  clients: Client[] = this.generateMockClients();
  filteredClients = signal<Client[]>([]);
  searchQuery = '';
  activeCount = 0;
  totalBookings = 0;
  totalRevenue = 0;

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.filterClients();
  }

  filterClients(): void {
    let filtered = [...this.clients];
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    }
    this.filteredClients.set(filtered);
    this.activeCount = this.clients.filter(c => c.status === 'ACTIVE').length;
    this.totalBookings = this.clients.reduce((sum, c) => sum + c.totalBookings, 0);
    this.totalRevenue = this.clients.reduce((sum, c) => sum + c.totalSpent, 0);
  }

  viewClient(client: Client): void {
    this.toast.info(`Détails de ${client.firstName} ${client.lastName}`);
  }

  private generateMockClients(): Client[] {
    const firstNames = ['Aminata', 'Fatou', 'Marie', 'Koffi', 'Adjoua', 'Aya', 'Konan', 'Akissi', 'Yao', 'Awa'];
    const lastNames = ['Kouassi', 'Diop', 'Touré', 'Koffi', 'Ba', 'Soro', 'Koné', 'Bamba', 'Diallo', 'Coulibaly'];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: `client-${i + 1}`,
      firstName: firstNames[i],
      lastName: lastNames[i],
      email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@email.com`,
      phone: `+225 07 ${String(i + 1).padStart(2, '0')} ${String(i + 2).padStart(2, '0')} ${String(i + 3).padStart(2, '0')} ${String(i + 4).padStart(2, '0')}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      totalBookings: Math.floor(Math.random() * 20) + 1,
      totalSpent: Math.floor(Math.random() * 200000) + 10000,
      lastBooking: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      status: Math.random() > 0.1 ? 'ACTIVE' : 'SUSPENDED',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    }));
  }
}
