import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Booking } from '../../../core/models';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, BadgeComponent, FcfaPipe, DateFormatPipe],
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-secondary mb-2">Réservations</h1>
        <p class="text-secondary-gray">Vue d'ensemble de toutes les réservations</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-5 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Total</p>
          <p class="text-3xl font-bold text-secondary">{{ bookings.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Confirmées</p>
          <p class="text-3xl font-bold text-blue-600">{{ confirmedCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Terminées</p>
          <p class="text-3xl font-bold text-green-600">{{ completedCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Annulées</p>
          <p class="text-3xl font-bold text-red-600">{{ cancelledCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">CA Total</p>
          <p class="text-2xl font-bold text-primary">{{ totalRevenue | number:'1.0-0' }} FCFA</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">N° Réservation</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Client</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Professionnel</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Date & Heure</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Type</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Montant</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            @for (booking of bookings; track booking.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-mono text-secondary-gray">{{ booking.bookingNumber }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <img [src]="booking.clientAvatar || 'https://via.placeholder.com/32'" class="w-8 h-8 rounded-full">
                    <span class="text-sm text-secondary">{{ booking.clientName }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-secondary">{{ booking.businessName }}</td>
                <td class="px-6 py-4 text-sm text-secondary-gray">
                  {{ booking.date | dateFormat:'long' }} à {{ booking.time }}
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-secondary-gray">{{ booking.type === 'SALON' ? '🏪 Salon' : '🏠 Domicile' }}</span>
                </td>
                <td class="px-6 py-4 font-semibold text-primary text-sm">{{ booking.total | fcfa }}</td>
                <td class="px-6 py-4">
                  <app-badge [variant]="getBadgeVariant(booking.status)">
                    {{ getStatusLabel(booking.status) }}
                  </app-badge>
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
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  confirmedCount = 0;
  completedCount = 0;
  cancelledCount = 0;
  totalRevenue = 0;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.bookings = this.mockData.bookings();
    this.confirmedCount = this.bookings.filter(b => b.status === 'CONFIRMED').length;
    this.completedCount = this.bookings.filter(b => b.status === 'COMPLETED').length;
    this.cancelledCount = this.bookings.filter(b => b.status === 'CANCELLED').length;
    this.totalRevenue = this.bookings.reduce((sum, b) => sum + b.total, 0);
  }

  getBadgeVariant(status: string): 'success' | 'warning' | 'error' | 'info' {
    const map: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      'CONFIRMED': 'success', 'PENDING': 'warning', 'COMPLETED': 'info', 'CANCELLED': 'error'
    };
    return map[status] || 'info';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente', 'CONFIRMED': 'Confirmé', 'COMPLETED': 'Terminé', 'CANCELLED': 'Annulé'
    };
    return labels[status] || status;
  }
}
