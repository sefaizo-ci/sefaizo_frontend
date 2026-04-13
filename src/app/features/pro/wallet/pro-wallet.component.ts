import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Wallet, WalletTransaction } from '../../../core/models';
import { FcfaPipe, DateFormatPipe } from '../../../shared/pipes/format.pipe';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-pro-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, FcfaPipe, DateFormatPipe, ButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container-custom max-w-4xl">
        <h1 class="text-3xl font-bold text-secondary mb-8">Mon Wallet</h1>

        <!-- Balance Card -->
        <div class="bg-gradient-primary text-white rounded-md shadow-lg p-8 mb-8">
          <div class="text-sm text-white/80 mb-2">Solde disponible</div>
          <div class="text-4xl font-bold mb-4">{{ wallet()?.balance | fcfa:false }}</div>
          <div class="flex gap-4">
            <button class="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Demander un reversement
            </button>
          </div>
        </div>

        <!-- Transactions -->
        <div class="bg-white rounded-md shadow">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-secondary">Historique des transactions</h2>
          </div>
          <div class="divide-y">
            @for (txn of transactions; track txn.id) {
              <div class="p-6 flex justify-between items-center">
                <div>
                  <div class="font-medium text-secondary">{{ txn.description }}</div>
                  <div class="text-sm text-secondary-gray">{{ txn.createdAt | dateFormat: 'long' }}</div>
                </div>
                <div [class]="txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'" class="font-bold">
                  {{ txn.type === 'CREDIT' ? '+' : '' }}{{ txn.amount | fcfa:false }}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProWalletComponent implements OnInit {
  wallet = signal<Wallet | null>(null);
  transactions: WalletTransaction[] = [];

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.wallet.set(this.mockData.wallet());
    this.transactions = this.mockData.transactions();
  }
}
