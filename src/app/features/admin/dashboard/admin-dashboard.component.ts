import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AdminStats, KycDocument } from '../../../core/models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe, BadgeComponent, ButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-secondary text-white py-8">
        <div class="container-custom">
          <h1 class="text-3xl font-bold mb-2">Dashboard Admin</h1>
          <p class="text-white/80">Gérez la plateforme SEFAIZO</p>
        </div>
      </div>

      <div class="container-custom py-8">
        <!-- Quick Access Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <a routerLink="/admin/cms" class="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
            </div>
            <div class="font-bold text-lg">Gestion du contenu</div>
            <div class="text-sm text-white/80">Gérer les pages du site</div>
          </a>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-2xl font-bold text-secondary">{{ stats.totalBookings }}</div>
            <div class="text-sm text-secondary-gray">Total Réservations</div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-2xl font-bold text-primary">{{ stats.monthlyRevenue | fcfa:false }}</div>
            <div class="text-sm text-secondary-gray">CA Mensuel</div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-2xl font-bold text-secondary">{{ stats.newProfessionals }}</div>
            <div class="text-sm text-secondary-gray">Nouveaux Pros</div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- KYC Pending -->
          <div class="bg-white rounded-md shadow">
            <div class="p-6 border-b">
              <h2 class="text-xl font-bold text-secondary">KYC en attente</h2>
            </div>
            <div class="divide-y">
              @for (doc of kycDocuments; track doc.id) {
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <div class="font-medium text-secondary">{{ doc.type }}</div>
                      <div class="text-sm text-secondary-gray">Uploadé le {{ doc.uploadedAt | date:'dd/MM/yyyy' }}</div>
                    </div>
                    <app-badge variant="warning">En attente</app-badge>
                  </div>
                  <img [src]="doc.url" class="w-full h-32 object-cover rounded-md mb-4">
                  <div class="flex gap-2">
                    <button (click)="approveKyc(doc.id)" class="btn-primary text-sm py-2">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      Approuver
                    </button>
                    <button (click)="rejectKyc(doc.id)" class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors">
                      Rejeter
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Top Professionals -->
          <div class="bg-white rounded-md shadow">
            <div class="p-6 border-b">
              <h2 class="text-xl font-bold text-secondary">Top 10 Professionnels</h2>
            </div>
            <div class="divide-y">
              @for (pro of stats.topProfessionals.slice(0, 10); track pro.professionalId; let i = $index) {
                <div class="p-4 flex items-center gap-4">
                  <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm">
                    {{ i + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-secondary">{{ pro.businessName }}</div>
                    <div class="text-sm text-secondary-gray">{{ pro.bookings }} réservations</div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-primary">{{ pro.revenue | fcfa:false }}</div>
                    <div class="text-sm text-secondary-gray">{{ pro.rating }} ★</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  stats: AdminStats = {
    totalBookings: 0,
    monthlyRevenue: 0,
    newProfessionals: 0,
    newClients: 0,
    bookingsByDay: [],
    bookingsByCommune: [],
    topProfessionals: []
  };

  kycDocuments: KycDocument[] = [];

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.stats = this.mockData.getAdminStats();
    this.kycDocuments = this.mockData.getKycDocuments();
  }

  approveKyc(documentId: string): void {
    this.mockData.approveKyc(documentId);
    this.kycDocuments = this.kycDocuments.filter(d => d.id !== documentId);
    this.toast.success('KYC approuvé');
  }

  rejectKyc(documentId: string): void {
    this.mockData.rejectKyc(documentId, 'Non spécifié');
    this.kycDocuments = this.kycDocuments.filter(d => d.id !== documentId);
    this.toast.info('KYC rejeté');
  }
}
