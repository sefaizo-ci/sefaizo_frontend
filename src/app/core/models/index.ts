// User models
export type UserRole = 'CLIENT' | 'PRO' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  role: 'CLIENT';
  address?: string;
  city?: string;
  referralPoints?: number;
}

export interface Professional extends User {
  role: 'PRO';
  businessName: string;
  businessDescription?: string;
  businessType: 'SALON' | 'FREELANCE' | 'HYBRID';
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  categories: string[];
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  coverImage?: string;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  kycDocuments?: KycDocument[];
}

export interface Admin extends User {
  role: 'ADMIN';
  permissions: string[];
}

// KYC Documents
export interface KycDocument {
  id: string;
  type: 'CNI' | 'PASSPORT' | 'BUSINESS_LICENSE' | 'PHOTO';
  url: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  uploadedAt: Date;
}

// Business & Services
export interface Business {
  id: string;
  professionalId: string;
  name: string;
  slug: string;
  description?: string;
  businessType: 'SALON' | 'FREELANCE' | 'HYBRID';
  address?: string;
  city: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  email: string;
  coverImage?: string;
  avatar?: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  services: Service[];
  workingHours: WorkingHour[];
  homeServiceCommunes: HomeServiceCommune[];
  referredBusinesses?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName: string;
  price: number;
  duration: number; // in minutes
  isActive: boolean;
  isPublished: boolean;
  isReferrable: boolean; // Can be referred for points
  referralPoints: number; // Points earned when referred
  
  // Service location
  isHomeService: boolean; // Available at client's home
  isSalonService: boolean; // Available at salon
  homeServiceMarkup?: number; // Fixed markup for home service (FCFA)
  homeServiceMarkupPercent?: number; // Percentage markup for home service
  
  // Service areas
  serviceAreas?: string[]; // List of communes/neighborhoods served
  
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  sortOrder: number;
}

export interface WorkingHour {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  isOpen: boolean;
  slots?: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface HomeServiceCommune {
  commune: string;
  fee: number; // FCFA
}

// Booking models
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type BookingType = 'SALON' | 'HOME';
export type PaymentMethod = 'MOBILE_MONEY' | 'CASH';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type CancellationReason = 
  | 'PERSONAL_EMERGENCY'
  | 'SCHEDULE_CONFLICT'
  | 'FOUND_BETTER_OPTION'
  | 'PRICE_TOO_HIGH'
  | 'LOCATION_ISSUE'
  | 'SERVICE_NO_LONGER_NEEDED'
  | 'PRO_UNAVAILABLE'
  | 'OVERBOOKED'
  | 'OTHER';

export interface Cancellation {
  cancelledBy: 'CLIENT' | 'PRO';
  reason: CancellationReason;
  otherReason?: string;
  cancelledAt: Date;
  refundAmount?: number;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  clientId: string;
  businessId: string;
  professionalId: string;
  serviceId: string;
  service: Service;
  businessName: string;
  professionalName: string;
  clientName: string;
  clientPhone: string;
  clientAvatar?: string;
  date: Date;
  time: string; // HH:mm
  duration: number;
  type: BookingType;
  clientAddress?: string;
  subtotal: number;
  homeServiceFee: number;
  total: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  cancellation?: Cancellation;
  referralCode?: string; // If booked via referral
  referralPointsEarned?: number; // Points earned from this booking
  
  // Commission fields (SEFAIZO monetization)
  isNewClientMarketplace?: boolean; // Si client vient de la marketplace
  marketplaceCommission?: number; // Commission marketplace (15%)
  transactionFee?: number; // Frais de transaction (2.5%)
  platformRevenue?: number; // Total revenu plateforme pour ce RDV
  professionalEarnings?: number; // Ce que reçoit le professionnel
  
  createdAt: Date;
  updatedAt: Date;
}

// Review models
export interface Review {
  id: string;
  bookingId: string;
  businessId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment?: string;
  isReported: boolean;
  reportReason?: string;
  createdAt: Date;
}

// Wallet models
export interface Wallet {
  id: string;
  professionalId: string;
  balance: number; // FCFA
  pendingBalance: number;
  currency: 'XOF';
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  reference?: string;
  bookingId?: string;
  balanceAfter: number;
  createdAt: Date;
}

export interface PayoutRequest {
  id: string;
  walletId: string;
  professionalId: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  rejectionReason?: string;
  requestedAt: Date;
  processedAt?: Date;
}

// Referral models
export interface Referral {
  id: string;
  referrerBusinessId: string;
  referredBusinessId: string;
  clientId: string;
  bookingId?: string;
  pointsAwarded: number;
  status: 'PENDING' | 'AWARDED' | 'USED';
  createdAt: Date;
  usedAt?: Date;
}

export interface ReferralProgram {
  businessId: string;
  isActive: boolean;
  pointsPerReferral: number;
  discountPercentage: number; // Discount for referrer
  minPointsForDiscount: number;
}

// Auth models
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Search & Filter models
export interface SearchFilters {
  query?: string;
  categories?: string[];
  communes?: string[];
  businessType?: 'SALON' | 'FREELANCE' | 'HYBRID';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'RELEVANCE' | 'RATING' | 'PRICE_ASC' | 'PRICE_DESC';
}

export interface SearchResult {
  businesses: Business[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Stats models
export interface AdminStats {
  totalBookings: number;
  monthlyRevenue: number;
  newProfessionals: number;
  newClients: number;
  bookingsByDay: DailyStats[];
  bookingsByCommune: CommuneStats[];
  topProfessionals: ProfessionalStats[];
}

export interface DailyStats {
  date: string;
  bookings: number;
  revenue: number;
}

export interface CommuneStats {
  commune: string;
  bookings: number;
  revenue: number;
}

export interface ProfessionalStats {
  professionalId: string;
  businessName: string;
  bookings: number;
  revenue: number;
  rating: number;
}

// Pro Stats
export interface ProStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  averageRating: number;
  totalReviews: number;
  referralPoints: number;
  bookingsByDay: DailyStats[];
  servicesByCategory: ServiceCategoryStats[];
  cancellationsByReason: CancellationStats[];
}

export interface ServiceCategoryStats {
  category: string;
  bookings: number;
  revenue: number;
}

export interface CancellationStats {
  reason: CancellationReason;
  count: number;
  percentage: number;
}

// Time slot availability
export interface AvailableSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface DayAvailability {
  date: Date;
  slots: AvailableSlot[];
}

// Cancellation reasons labels
export const CANCELLATION_REASONS: { value: CancellationReason; label: string }[] = [
  { value: 'PERSONAL_EMERGENCY', label: 'Urgence personnelle' },
  { value: 'SCHEDULE_CONFLICT', label: 'Conflit d\'horaire' },
  { value: 'FOUND_BETTER_OPTION', label: 'J\'ai trouvé une meilleure option' },
  { value: 'PRICE_TOO_HIGH', label: 'Prix trop élevé' },
  { value: 'LOCATION_ISSUE', label: 'Problème de localisation' },
  { value: 'SERVICE_NO_LONGER_NEEDED', label: 'Service plus nécessaire' },
  { value: 'PRO_UNAVAILABLE', label: 'Professionnel indisponible' },
  { value: 'OVERBOOKED', label: 'Surbooké / Trop de réservations' },
  { value: 'OTHER', label: 'Autre' }
];
