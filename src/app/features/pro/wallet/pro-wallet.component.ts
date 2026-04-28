import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MockDataService } from '../../../core/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Wallet, WalletTransaction } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ToastService } from '../../../shared/ui/toast/toast.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-pro-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, FcfaPipe, DateFormatPipe, ModalComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-xl font-black" style="color:#111827">Mon Wallet</h1>
        <p class="text-sm mt-0.5" style="color:#6b7280">Gérez vos gains et demandez des reversements</p>
      </div>

      <!-- Balance Cards -->
      <div class="grid md:grid-cols-3 gap-4">
        <div class="md:col-span-2 rounded-2xl p-6 text-white relative overflow-hidden"
             style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
          <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full" style="background:rgba(255,255,255,0.08)"></div>
          <div class="absolute right-4 bottom-0 w-20 h-20 rounded-full" style="background:rgba(255,255,255,0.06)"></div>
          <div class="relative z-10">
            <div class="text-sm text-white/70 mb-1">Solde disponible</div>
            <div class="text-4xl font-black mb-1">{{ wallet()?.balance | fcfa:false }}</div>
            <div class="text-white/60 text-sm mb-5">FCFA</div>
            <button (click)="openPayoutModal()"
              class="bg-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all active:scale-95"
              style="color:#7c3aed">
              Demander un reversement
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <lucide-icon name="clock" [size]="14" [strokeWidth]="1.75" style="color:#d97706"></lucide-icon>
              </div>
              <span class="text-xs font-semibold" style="color:#6b7280">En attente</span>
            </div>
            <div class="text-xl font-black" style="color:#111827">{{ wallet()?.pendingBalance | fcfa:false }}</div>
            <div class="text-xs mt-0.5" style="color:#9ca3af">FCFA</div>
          </div>
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <lucide-icon name="trending-up" [size]="14" [strokeWidth]="1.75" style="color:#16a34a"></lucide-icon>
              </div>
              <span class="text-xs font-semibold" style="color:#6b7280">Total encaissé</span>
            </div>
            <div class="text-xl font-black" style="color:#111827">{{ totalCredited() | fcfa:false }}</div>
            <div class="text-xs mt-0.5" style="color:#9ca3af">FCFA cumulé</div>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="rounded-2xl p-4 flex items-start gap-3"
           style="background:#faf5ff;border:1px solid #e9d5ff">
        <div class="w-8 h-8 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
          <lucide-icon name="info" [size]="14" [strokeWidth]="2" style="color:#a855f7"></lucide-icon>
        </div>
        <p class="text-sm" style="color:#7c3aed">
          Les gains sont crédités automatiquement après 48h suivant la prestation.
          Un minimum de <strong>5 000 FCFA</strong> est requis pour demander un reversement.
        </p>
      </div>

      <!-- Transactions -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #f3f4f6">
          <div>
            <h2 class="font-bold text-sm" style="color:#111827">Historique des transactions</h2>
            <p class="text-xs" style="color:#9ca3af">{{ transactions.length }} transactions</p>
          </div>
        </div>

        @if (transactions.length === 0) {
          <div class="py-12 text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <lucide-icon name="wallet" [size]="20" [strokeWidth]="1.5" style="color:#a855f7"></lucide-icon>
            </div>
            <p class="text-sm" style="color:#9ca3af">Aucune transaction</p>
          </div>
        } @else {
          <div class="divide-y divide-gray-50">
            @for (txn of transactions; track txn.id) {
              <div class="p-5 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  <lucide-icon [name]="txn.type === 'CREDIT' ? 'arrow-down-left' : 'arrow-up-right'" [size]="16" [strokeWidth]="2"
                               [style.color]="txn.type === 'CREDIT' ? '#16a34a' : '#dc2626'"></lucide-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold" style="color:#111827">{{ txn.description }}</div>
                  <div class="text-xs mt-0.5" style="color:#9ca3af">{{ txn.createdAt | dateFormat: 'long' }}</div>
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
