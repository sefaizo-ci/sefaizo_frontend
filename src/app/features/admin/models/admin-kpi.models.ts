// Admin KPI Dashboard Models

export type TimePeriod = 'day' | 'week' | 'month' | 'year' | 'custom';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface AdminKpiDashboard {
  overview: OverviewMetrics;
  appointments: AppointmentMetrics;
  clients: ClientMetrics;
  professionals: ProfessionalMetrics;
  revenue: RevenueMetrics;
  trends: TrendMetrics;
}

// Overview Metrics - Cartes principales du dashboard
export interface OverviewMetrics {
  totalAppointments: number;
  totalClients: number;
  totalProfessionals: number;
  monthlyRevenue: number;
  completionRate: number; // % de RDV honorés
  cancellationRate: number; // % d'annulations
  periodComparison: {
    appointments: number;
    clients: number;
    revenue: number;
  };
}

// Appointment Metrics - Module Rendez-vous
export interface AppointmentMetrics {
  total: number;
  byStatus: AppointmentByStatus[];
  byType: AppointmentByType;
  byTimeRange: TimeRangeStats[];
  showUpRate: number; // Taux de présentation
  noShowRate: number; // Taux d'absence
  averageDuration: number; // Durée moyenne en minutes
}

export interface AppointmentByStatus {
  status: BookingStatus;
  count: number;
  percentage: number;
  label: string;
  color: string;
}

export interface AppointmentByType {
  salon: number;
  home: number;
  salonPercentage: number;
  homePercentage: number;
}

export interface TimeRangeStats {
  period: string;
  date: Date;
  appointments: number;
  completed: number;
  cancelled: number;
  revenue: number;
}

// Client Metrics - Module Clients
export interface ClientMetrics {
  totalClients: number;
  newClients: number;
  returningClients: number;
  retentionRate: number;
  averageVisitsPerClient: number;
  averageSpendPerClient: number;
  topClients: ClientStats[];
  newClientsTrend: TrendData[];
}

export interface ClientStats {
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  totalAppointments: number;
  totalSpent: number;
  lastVisit: Date;
  favoriteService?: string;
}

// Professional Metrics - Module Professionnels
export interface ProfessionalMetrics {
  totalProfessionals: number;
  activeProfessionals: number;
  newProfessionals: number;
  byCategory: CategoryStats[];
  byCommune: CommuneProfessionalStats[];
  topPerformers: ProfessionalPerformance[];
  kycStatus: KycStatusStats;
  averageRating: number;
}

export interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
  revenue: number;
  appointments: number;
}

export interface CommuneProfessionalStats {
  commune: string;
  count: number;
  percentage: number;
  revenue: number;
}

export interface ProfessionalPerformance {
  professionalId: string;
  businessName: string;
  businessSlug?: string;
  avatar?: string;
  category: string;
  commune: string;
  totalAppointments: number;
  completedAppointments: number;
  revenue: number;
  rating: number;
  reviewCount: number;
  acceptanceRate: number;
  rank: number;
}

export interface KycStatusStats {
  pending: number;
  approved: number;
  rejected: number;
  pendingPercentage: number;
  approvedPercentage: number;
  rejectedPercentage: number;
}

// Revenue Metrics - Module Chiffre d'Affaires
export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  dailyAverage: number;
  averagePerAppointment: number;
  averagePerClient: number;
  byPaymentMethod: PaymentMethodStats[];
  byPeriod: RevenueByPeriod[];
  byCommune: CommuneRevenue[];
  byProfessional: ProfessionalRevenue[];
  growthRate: number;
}

export interface PaymentMethodStats {
  method: 'MOBILE_MONEY' | 'CASH';
  amount: number;
  percentage: number;
  count: number;
  label: string;
}

export interface RevenueByPeriod {
  period: string;
  date: Date;
  revenue: number;
  appointments: number;
  growth: number;
}

export interface CommuneRevenue {
  commune: string;
  revenue: number;
  percentage: number;
  appointments: number;
  averagePerAppointment: number;
}

export interface ProfessionalRevenue {
  professionalId: string;
  businessName: string;
  revenue: number;
  percentage: number;
  appointments: number;
  averagePerAppointment: number;
}

// Trend Metrics - Tendances et évolutions
export interface TrendMetrics {
  appointmentsTrend: TrendData[];
  revenueTrend: TrendData[];
  clientsTrend: TrendData[];
  professionalsTrend: TrendData[];
  comparisonPeriod: ComparisonData;
}

export interface TrendData {
  label: string;
  date: Date;
  value: number;
  previousValue?: number;
  growth?: number;
}

export interface ComparisonData {
  currentPeriod: {
    appointments: number;
    revenue: number;
    clients: number;
    professionals: number;
  };
  previousPeriod: {
    appointments: number;
    revenue: number;
    clients: number;
    professionals: number;
  };
  growth: {
    appointments: number;
    revenue: number;
    clients: number;
    professionals: number;
  };
}

// Filtres pour le dashboard
export interface KpiFilters {
  period: TimePeriod;
  startDate?: Date;
  endDate?: Date;
  commune?: string;
  category?: string;
  professionalId?: string;
}

// Options d'affichage
export interface DashboardViewOptions {
  showTrends: boolean;
  showComparisons: boolean;
  currency: string;
  locale: string;
}
