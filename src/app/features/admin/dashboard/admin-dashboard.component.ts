import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AdminStats, KycDocument } from '../../../core/models';
import { FcfaPipe } from '../../../shared/pipes/format.pipe';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe, BadgeComponent, ButtonComponent, LucideAngularModule],
  template: `
    <div class="p-6 min-h-screen" style="background:#f8f7fc">

      <!-- En-tête -->
      <div class="mb-6">
        <h1 class="text-xl font-black" style="color:#111827">Tableau de bord</h1>
        <p class="text-sm" style="color:#6b7280">Vue d'ensemble de la plateforme SEFAIZO</p>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm">
              <lucide-icon name="calendar-days" [size]="18" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#16a34a">+12%</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">{{ stats.totalBookings }}</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Réservations totales</div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm">
              <lucide-icon name="circle-dollar-sign" [size]="18" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#16a34a">+8%</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">{{ stats.monthlyRevenue | fcfa:false }}</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">CA mensuel</div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm">
              <lucide-icon name="store" [size]="18" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#fef3c7;color:#d97706">12 en attente</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">523</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Salons actifs</div>
        </div>

        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-100 bg-white shadow-sm">
              <lucide-icon name="users" [size]="18" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#dcfce7;color:#16a34a">+{{ stats.newClients }}</span>
          </div>
          <div class="text-2xl font-black" style="color:#111827">8 420</div>
          <div class="text-xs mt-0.5" style="color:#6b7280">Clients inscrits</div>
        </div>
      </div>

      <!-- Raccourcis rapides -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <a routerLink="/admin/salons"
           class="flex items-center gap-3 p-3.5 rounded-2xl border bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
           style="border-color:#e5e7eb">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white shadow-sm">
            <lucide-icon name="store" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold truncate" style="color:#111827">Salons en attente</div>
            <div class="text-xs" style="color:#d97706">12 à valider</div>
          </div>
        </a>

        <a routerLink="/admin/kyc"
           class="flex items-center gap-3 p-3.5 rounded-2xl border bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
           style="border-color:#e5e7eb">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white shadow-sm">
            <lucide-icon name="shield-check" [size]="16" [strokeWidth]="1.75" style="color:#111827"></lucide-icon>
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold truncate" style="color:#111827">KYC en attente</div>
            <div class="text-xs" style="color:#dc2626">3 documents</div>
          </div>
        </a>

        <a routerLink="/admin/bookings"
           class="flex items-center gap-3 p-3.5 rounded-2xl border bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
           style="border-color:#e5e7eb">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white shadow-sm">
            <lucide-icon name="calendar-check" [size]="16" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold truncate" style="color:#111827">Réservations</div>
            <div class="text-xs" style="color:#a855f7">Aujourd'hui</div>
          </div>
        </a>

        <a routerLink="/admin/cms"
           class="flex items-center gap-3 p-3.5 rounded-2xl border bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
           style="border-color:#e5e7eb">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white shadow-sm">
            <lucide-icon name="file-pen-line" [size]="16" [strokeWidth]="1.75" style="color:#111827"></lucide-icon>
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold truncate" style="color:#111827">Contenu CMS</div>
            <div class="text-xs" style="color:#2563eb">Gérer les pages</div>
          </div>
        </a>
      </div>

      <!-- Tableaux -->
      <div class="grid lg:grid-cols-2 gap-5">

        <!-- KYC en attente -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #f3f4f6">
            <div>
              <h2 class="font-bold text-sm" style="color:#111827">KYC en attente</h2>
              <p class="text-xs" style="color:#9ca3af">Documents à vérifier</p>
            </div>
            <a routerLink="/admin/kyc"
               class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
               style="background:#f3e8ff;color:#7c3aed">
              Voir tout
            </a>
          </div>
          <div class="divide-y divide-gray-50">
            @for (doc of kycDocuments.slice(0,3); track doc.id) {
              <div class="flex items-center gap-3 px-5 py-3">
                <div class="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  <lucide-icon name="file-text" [size]="15" [strokeWidth]="1.75" style="color:#a855f7"></lucide-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-xs truncate" style="color:#111827">{{ doc.type }}</div>
                  <div class="text-xs" style="color:#9ca3af">{{ doc.uploadedAt | date:'dd/MM/yyyy' }}</div>
                </div>
                <div class="flex gap-1.5">
                  <button (click)="approveKyc(doc.id)"
                          class="text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors"
                          style="background:#dcfce7;color:#16a34a">
                    Valider
                  </button>
                  <button (click)="rejectKyc(doc.id)"
                          class="text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors"
                          style="background:#fee2e2;color:#dc2626">
                    Rejeter
                  </button>
                </div>
              </div>
            }
            @if (kycDocuments.length === 0) {
              <div class="px-5 py-8 text-center text-xs" style="color:#9ca3af">
                Aucun document en attente
              </div>
            }
          </div>
        </div>

        <!-- Top Professionnels -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #f3f4f6">
            <div>
              <h2 class="font-bold text-sm" style="color:#111827">Top Professionnels</h2>
              <p class="text-xs" style="color:#9ca3af">Par nombre de réservations</p>
            </div>
            <a routerLink="/admin/professionals"
               class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
               style="background:#f3e8ff;color:#7c3aed">
              Voir tout
            </a>
          </div>
          <div class="divide-y divide-gray-50">
            @for (pro of stats.topProfessionals.slice(0,5); track pro.professionalId; let i = $index) {
              <div class="flex items-center gap-3 px-5 py-3">
                <div class="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                     [style.background]="i === 0 ? '#fef3c7' : i === 1 ? '#f3f4f6' : '#faf5ff'"
                     [style.color]="i === 0 ? '#d97706' : i === 1 ? '#6b7280' : '#a855f7'">
                  {{ i + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-xs truncate" style="color:#111827">{{ pro.businessName }}</div>
                  <div class="text-xs" style="color:#9ca3af">{{ pro.bookings }} réservations · ⭐ {{ pro.rating }}</div>
                </div>
                <div class="text-xs font-bold" style="color:#a855f7">{{ pro.revenue | fcfa:false }}</div>
              </div>
            }
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
