import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../core/services/mock-data.service';
import { KycDocument } from '../../../core/models';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-admin-kyc',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent],
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-secondary mb-2">Vérification KYC</h1>
        <p class="text-secondary-gray">Validez les documents d'identité des professionnels</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p class="text-sm text-yellow-800 mb-1">En attente</p>
          <p class="text-3xl font-bold text-yellow-600">{{ pendingCount }}</p>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <p class="text-sm text-green-800 mb-1">Approuvés</p>
          <p class="text-3xl font-bold text-green-600">{{ approvedCount }}</p>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <p class="text-sm text-red-800 mb-1">Rejetés</p>
          <p class="text-3xl font-bold text-red-600">{{ rejectedCount }}</p>
        </div>
      </div>

      <!-- Pending Documents -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-secondary">Documents en attente de vérification</h2>
        </div>
        <div class="p-6">
          @if (pendingDocs.length > 0) {
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (doc of pendingDocs; track doc.id) {
                <div class="border rounded-lg overflow-hidden">
                  <img [src]="doc.url || 'https://via.placeholder.com/400x250?text=Document'" class="w-full h-48 object-cover">
                  <div class="p-4">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="font-semibold text-secondary">{{ doc.type }}</h3>
                      <app-badge variant="warning">En attente</app-badge>
                    </div>
                    <p class="text-sm text-secondary-gray mb-4">Uploadé le {{ doc.uploadedAt | date:'dd/MM/yyyy à HH:mm' }}</p>
                    <div class="flex gap-2">
                      <button (click)="approveDoc(doc.id)" class="flex-1 btn-primary text-sm py-2">
                        <svg class="w-4 h-4 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        Approuver
                      </button>
                      <button (click)="rejectDoc(doc.id)" class="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors">
                        Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="text-center py-12">
              <svg class="w-16 h-16 mx-auto mb-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <p class="text-secondary-gray text-lg">Aucun document en attente</p>
            </div>
          }
        </div>
      </div>

      <!-- Approved Documents -->
      <div class="mt-8 bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-secondary">Documents récemment approuvés</h2>
        </div>
        <div class="divide-y">
          @for (doc of approvedDocs.slice(0, 5); track doc.id) {
            <div class="p-6 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-secondary">{{ doc.type }}</div>
                  <div class="text-sm text-secondary-gray">Approuvé le {{ doc.uploadedAt | date:'dd/MM/yyyy' }}</div>
                </div>
              </div>
              <app-badge variant="success">Approuvé</app-badge>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminKycComponent implements OnInit {
  allDocs: KycDocument[] = [];
  pendingDocs: KycDocument[] = [];
  approvedDocs: KycDocument[] = [];
  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.allDocs = this.mockData.kycDocuments();
    this.pendingDocs = this.allDocs.filter(d => d.status === 'PENDING');
    this.approvedDocs = this.allDocs.filter(d => d.status === 'APPROVED');
    this.pendingCount = this.pendingDocs.length;
    this.approvedCount = this.allDocs.filter(d => d.status === 'APPROVED').length;
    this.rejectedCount = this.allDocs.filter(d => d.status === 'REJECTED').length;
  }

  approveDoc(id: string): void {
    this.mockData.approveKyc(id);
    this.toast.success('Document approuvé');
    this.ngOnInit();
  }

  rejectDoc(id: string): void {
    this.mockData.rejectKyc(id, 'Document non conforme');
    this.toast.info('Document rejeté');
    this.ngOnInit();
  }
}
