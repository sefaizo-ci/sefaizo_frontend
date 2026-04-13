// Commission & Revenue Models for SEFAIZO Platform Monetization

// Commission Types
export type CommissionType = 'MARKETPLACE' | 'TRANSACTION' | 'CANCELLATION' | 'PREMIUM' | 'ADVERTISING';

export interface CommissionRate {
  type: CommissionType;
  percentage: number; // e.g., 15 for 15%
  fixedAmount: number; // e.g., 500 for 500 FCFA
  description: string;
  isActive: boolean;
}

// Platform Revenue
export interface PlatformRevenue {
  id: string;
  date: Date;
  type: CommissionType;
  amount: number; // FCFA
  bookingId?: string;
  professionalId?: string;
  description: string;
  status: 'PENDING' | 'COLLECTED' | 'WITHDRAWN';
  createdAt: Date;
}

// Commission Breakdown per Booking
export interface BookingCommission {
  bookingId: string;
  serviceAmount: number; // Montant du service
  marketplaceCommission: number; // 15% sur nouveaux clients marketplace
  transactionFee: number; // 2.5% sur paiement Mobile Money
  cancellationFee?: number; // Frais d'annulation
  platformRevenue: number; // Total revenu plateforme
  professionalEarnings: number; // Ce que reçoit le professionnel
  isNewClient: boolean; // Si c'est un nouveau client marketplace
  paymentMethod: 'MOBILE_MONEY' | 'CASH';
}

// Platform Revenue Summary
export interface PlatformRevenueSummary {
  totalRevenue: number;
  byType: RevenueByType[];
  byPeriod: RevenueByPeriod[];
  byProfessional: RevenueByProfessional[];
  projectedMonthly: number;
  growthRate: number;
}

export interface RevenueByType {
  type: CommissionType;
  amount: number;
  percentage: number;
  count: number;
  label: string;
}

export interface RevenueByPeriod {
  period: string;
  date: Date;
  revenue: number;
  bookings?: number; // Optional to match admin-kpi.models
  growth: number;
}

export interface RevenueByProfessional {
  professionalId: string;
  businessName: string;
  revenue: number;
  percentage: number;
  bookings: number;
  avgCommissionPerBooking: number;
}

// Premium Subscription Plans
export interface PremiumPlan {
  id: string;
  name: string;
  price: number; // FCFA/month
  features: string[];
  isActive: boolean;
  subscribedProfessionals: number;
}

// Advertising Options
export interface AdvertisingOption {
  id: string;
  type: 'FEATURED_LISTING' | 'BANNER_HOMEPAGE' | 'CATEGORY_SPONSOR';
  name: string;
  price: number; // FCFA/month
  description: string;
  isActive: boolean;
  subscribedCount: number;
}

// Wallet for Platform
export interface PlatformWallet {
  id: string;
  balance: number; // Solde actuel
  pendingBalance: number; // En attente de versement
  totalCollected: number; // Total collecté depuis le début
  totalWithdrawn: number; // Total retiré
  currency: 'XOF';
  lastWithdrawal?: Date;
}

// Withdrawal Request (for platform owners)
export interface PlatformWithdrawal {
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  requestedAt: Date;
  processedAt?: Date;
}

// Metrics for monetization dashboard
export interface MonetizationMetrics {
  totalPlatformRevenue: number;
  monthlyRecurringRevenue: number; // Abonnements Premium
  commissionRevenue: number; // Commissions marketplace
  transactionFeeRevenue: number; // Frais de transaction
  advertisingRevenue: number; // Publicité
  averageRevenuePerProfessional: number;
  takeRate: number; // % du GMV capté par la plateforme
  gmv: number; // Gross Merchandise Value (total des transactions)
}

// Commission Settings (configurable by admin)
export interface CommissionSettings {
  marketplaceCommissionRate: number; // 15 = 15%
  transactionFeeRate: number; // 2.5 = 2.5%
  cancellationFeeFixed: number; // 3000 FCFA
  cancellationFeeSplit: number; // 50 = 50% pour la plateforme
  premiumMonthlyPrice: number; // 15000 FCFA
  featuredListingPrice: number; // 25000 FCFA/month
  bannerHomepagePrice: number; // 50000 FCFA/month
}

// Default commission rates for SEFAIZO
export const DEFAULT_COMMISSION_SETTINGS: CommissionSettings = {
  marketplaceCommissionRate: 15, // 15% sur nouveaux clients marketplace
  transactionFeeRate: 2.5, // 2.5% sur paiements Mobile Money
  cancellationFeeFixed: 3000, // 3000 FCFA
  cancellationFeeSplit: 50, // 50% pour la plateforme
  premiumMonthlyPrice: 15000, // 15.000 FCFA/mois
  featuredListingPrice: 25000, // 25.000 FCFA/mois
  bannerHomepagePrice: 50000 // 50.000 FCFA/mois
};

// Commission rates display
export const COMMISSION_RATES_DISPLAY: CommissionRate[] = [
  {
    type: 'MARKETPLACE',
    percentage: 15,
    fixedAmount: 0,
    description: 'Commission sur nouveaux clients marketplace',
    isActive: true
  },
  {
    type: 'TRANSACTION',
    percentage: 2.5,
    fixedAmount: 0,
    description: 'Frais de transaction Mobile Money',
    isActive: true
  },
  {
    type: 'CANCELLATION',
    percentage: 0,
    fixedAmount: 3000,
    description: 'Frais d\'annulation tardive (< 24h)',
    isActive: true
  },
  {
    type: 'PREMIUM',
    percentage: 0,
    fixedAmount: 15000,
    description: 'Abonnement Premium mensuel',
    isActive: true
  },
  {
    type: 'ADVERTISING',
    percentage: 0,
    fixedAmount: 25000,
    description: 'Mise en avant marketplace',
    isActive: true
  }
];
