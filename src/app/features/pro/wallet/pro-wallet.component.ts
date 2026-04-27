import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Wallet, WalletTransaction } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ToastService } from '../../../shared/ui/toast/toast.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-pro-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe, DateFormatPipe, ModalComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-secondary">Mon Wallet</h1>
        <p class="text-secondary-gray mt-1">Gérez vos gains et demandez des reversements</p>
      </div>

      <!-- Balance Cards -->
      <div class="grid md:grid-cols-3 gap-4">
        <div class="md:col-span-2 rounded-2xl p-6 text-white relative overflow-hidden"
          style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d50 100%)">
          <div class="relative z-10">
            <div class="text-sm text-white/60 mb-1">Solde disponible</div>
            <div class="text-4xl font-bold mb-1">{{ wallet()?.balance | fcfa:false }}</div>
            <div class="text-white/60 text-sm mb-6">FCFA</div>
            <button (click)="openPayoutModal()"
              class="bg-white text-secondary font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
              Demander un reversement
            </button>
          </div>
          <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5"></div>
          <div class="absolute right-4 bottom-0 w-20 h-20 rounded-full bg-primary/20"></div>
        </div>

        <div class="space-y-3">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div class="text-xs text-secondary-gray mb-1">En attente</div>
            <div class="text-xl font-bold text-yellow-600">{{ wallet()?.pendingBalance | fcfa:false }}</div>
            <div class="text-xs text-secondary-gray">FCFA</div>
          </div>
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div class="text-xs text-secondary-gray mb-1">Total encaissé</div>
            <div class="text-xl font-bold text-green-600">{{ totalCredited() | fcfa:false }}</div>
            <div class="text-xs text-secondary-gray">FCFA cumulé</div>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm text-blue-700">
          Les gains des réservations sont crédités automatiquement après 48h suivant la prestation. Un minimum de <strong>5 000 FCFA</strong> est requis pour demander un reversement.
        </p>
      </div>

      <!-- Transactions -->
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div class="p-5 border-b flex items-center justify-between">
          <h2 class="font-semibold text-secondary">Historique des transactions</h2>
          <div class="text-sm text-secondary-gray">{{ transactions.length }} transactions</div>
        </div>

        @if (transactions.length === 0) {
          <div class="p-12 text-center">
            <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <p class="text-secondary-gray">Aucune transaction</p>
          </div>
        } @else {
          <div class="divide-y divide-gray-50">
            @for (txn of transactions; track txn.id) {
              <div class="p-5 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  [class]="txn.type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'">
                  <svg class="w-5 h-5" [class]="txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    @if (txn.type === 'CREDIT') {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    } @else {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    }
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-secondary">{{ txn.description }}</div>
                  <div class="text-xs text-secondary-gray mt-0.5">{{ txn.createdAt | dateFormat: 'long' }}</div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="font-bold" [class]="txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-500'">
                    {{ txn.type === 'CREDIT' ? '+' : '-' }}{{ txn.amount | fcfa:false }}
                  </div>
                  <div class="text-xs text-secondary-gray">Solde: {{ txn.balanceAfter | fcfa:false }}</div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>

    <!-- Payout Modal -->
    <app-modal
      [isOpen]="payoutModalOpen()"
      title="Demander un reversement"
      [showFooter]="false"
      size="md"
      (closed)="payoutModalOpen.set(false)">
      <div class="space-y-5">
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <div class="text-sm text-secondary-gray">Solde disponible</div>
          <div class="text-3xl font-bold text-secondary mt-1">{{ wallet()?.balance | fcfa:false }}</div>
          <div class="text-sm text-secondary-gray">FCFA</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-secondary mb-2">Montant à reverser (FCFA)</label>
          <input type="number" [(ngModel)]="payoutAmount" [max]="wallet()?.balance || 0" min="5000" step="500"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <p class="text-xs text-secondary-gray mt-1">Minimum: 5 000 FCFA</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-secondary mb-2">Compte Mobile Money</label>
          <select [(ngModel)]="payoutOperator"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2">
            <option value="">Sélectionner l'opérateur</option>
            <option value="ORANGE">Orange Money</option>
            <option value="MTN">MTN MoMo</option>
            <option value="WAVE">Wave</option>
            <option value="MOOV">Moov Money</option>
          </select>
          <input type="tel" [(ngModel)]="payoutNumber" placeholder="+225 07 00 00 00 00"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        </div>

        <div class="flex justify-end gap-3 pt-2 border-t">
          <button (click)="payoutModalOpen.set(false)"
            class="px-5 py-2.5 text-secondary-gray font-medium hover:bg-gray-100 rounded-xl text-sm">
            Annuler
          </button>
          <button (click)="submitPayout()"
            [disabled]="!payoutAmount || payoutAmount < 5000 || !payoutOperator || !payoutNumber"
            class="btn-primary px-6 py-2.5 text-sm disabled:opacity-50">
            Confirmer la demande
          </button>
        </div>
      </div>
    </app-modal>
  `,
  styles: []
})
export class ProWalletComponent implements OnInit {
  wallet = signal<Wallet | null>(null);
  transactions: WalletTransaction[] = [];
  payoutModalOpen = signal(false);

  payoutAmount = 0;
  payoutOperator = '';
  payoutNumber = '';

  constructor(
    private mockData: MockDataService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.wallet.set(this.mockData.wallet());
    this.transactions = this.mockData.transactions();
  }

  totalCredited(): number {
    return this.transactions
      .filter(t => t.type === 'CREDIT')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  openPayoutModal(): void {
    this.payoutAmount = 0;
    this.payoutOperator = '';
    this.payoutNumber = '';
    this.payoutModalOpen.set(true);
  }

  submitPayout(): void {
    const w = this.wallet();
    if (!w || this.payoutAmount < 5000 || this.payoutAmount > w.balance) {
      this.toast.error('Montant invalide');
      return;
    }
    this.toast.success('Demande de reversement envoyée — traitement sous 48h ouvrés');
    this.payoutModalOpen.set(false);
  }
}
