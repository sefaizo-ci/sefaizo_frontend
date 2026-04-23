import { Injectable, signal } from '@angular/core';
import {
  Business,
  Service,
  ServiceCategory,
  Review,
  Booking,
  AvailableSlot,
  HomeServiceCommune,
  WorkingHour,
  KycDocument,
  AdminStats,
  DailyStats,
  CommuneStats,
  ProfessionalStats,
  Wallet,
  WalletTransaction,
  PayoutRequest,
  CancellationReason,
  ProStats,
  Referral
} from '../models';
import {
  AdminKpiDashboard,
  OverviewMetrics,
  AppointmentMetrics,
  AppointmentByStatus,
  AppointmentByType,
  TimeRangeStats,
  ClientMetrics,
  ClientStats,
  ProfessionalMetrics,
  CategoryStats,
  CommuneProfessionalStats,
  ProfessionalPerformance,
  KycStatusStats,
  RevenueMetrics,
  PaymentMethodStats,
  RevenueByPeriod,
  CommuneRevenue,
  ProfessionalRevenue,
  TrendMetrics,
  TrendData,
  ComparisonData,
  TimePeriod,
  BookingStatus
} from '../../features/admin/models/admin-kpi.models';
import {
  PlatformRevenueSummary,
  RevenueByType,
  MonetizationMetrics,
  PlatformWallet,
  PlatformWithdrawal,
  CommissionSettings,
  DEFAULT_COMMISSION_SETTINGS,
  BookingCommission,
  PremiumPlan,
  AdvertisingOption
} from '../../features/admin/models/commission.models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Service Categories
  private categories: ServiceCategory[] = [
    { id: 'cat-1', name: 'Coiffure', icon: 'cut', sortOrder: 1 },
    { id: 'cat-2', name: 'Esthétique', icon: 'sparkles', sortOrder: 2 },
    { id: 'cat-3', name: 'Manucure', icon: 'hand', sortOrder: 3 },
    { id: 'cat-4', name: 'Pédicure', icon: 'foot', sortOrder: 4 },
    { id: 'cat-5', name: 'Barbier', icon: 'user', sortOrder: 5 },
    { id: 'cat-6', name: 'Maquillage', icon: 'brush', sortOrder: 6 },
    { id: 'cat-7', name: 'Soins du visage', icon: 'face', sortOrder: 7 },
    { id: 'cat-8', name: 'Massage', icon: 'spa', sortOrder: 8 },
  ];

  // Communes d'Abidjan
  private communes = [
    'Cocody', 'Plateau', 'Yopougon', 'Marcory', 'Treichville',
    'Adjamé', 'Abobo', 'Port-Bouët', 'Attécoubé', 'Koumassi'
  ];

  // Mock Businesses
  private businessesSignal = signal<Business[]>(this.generateBusinesses());
  businesses = this.businessesSignal.asReadonly();

  // Mock Reviews
  private reviewsSignal = signal<Review[]>(this.generateReviews());
  reviews = this.reviewsSignal.asReadonly();

  // Mock Bookings
  private bookingsSignal = signal<Booking[]>(this.generateMockBookings());
  bookings = this.bookingsSignal.asReadonly();

  // Generate initial mock bookings for demo
  private generateMockBookings(): Booking[] {
    const now = new Date();
    const businesses = this.generateBusinesses();
    
    return [
      // Confirmed booking (can be cancelled)
      {
        id: 'booking-confirmed-1',
        bookingNumber: 'SEF-20260325-001',
        clientId: 'client-1',
        businessId: 'business-1',
        professionalId: 'pro-1',
        serviceId: 'business-1-1',
        service: businesses[0].services[0],
        businessName: businesses[0].name,
        professionalName: businesses[0].name,
        clientName: 'Aminata Kouassi',
        clientPhone: '+225 07 07 07 07 07',
        clientAvatar: 'https://i.pravatar.cc/150?img=5',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 10, 30),
        time: '10:30',
        duration: 45,
        type: 'SALON',
        subtotal: 8000,
        homeServiceFee: 0,
        total: 8000,
        status: 'CONFIRMED',
        paymentMethod: 'MOBILE_MONEY',
        paymentStatus: 'PAID',
        createdAt: new Date(now.getTime() - 86400000 * 2),
        updatedAt: new Date()
      },
      // Pending booking (can be cancelled)
      {
        id: 'booking-pending-1',
        bookingNumber: 'SEF-20260326-002',
        clientId: 'client-1',
        businessId: 'business-2',
        professionalId: 'pro-2',
        serviceId: 'business-2-1',
        service: businesses[1].services[0],
        businessName: businesses[1].name,
        professionalName: businesses[1].name,
        clientName: 'Aminata Kouassi',
        clientPhone: '+225 07 07 07 07 07',
        clientAvatar: 'https://i.pravatar.cc/150?img=5',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 14, 0),
        time: '14:00',
        duration: 30,
        type: 'SALON',
        subtotal: 5000,
        homeServiceFee: 0,
        total: 5000,
        status: 'PENDING',
        paymentMethod: 'CASH',
        paymentStatus: 'PENDING',
        createdAt: new Date(now.getTime() - 3600000),
        updatedAt: new Date()
      },
      // Completed booking (can leave review)
      {
        id: 'booking-completed-1',
        bookingNumber: 'SEF-20260310-003',
        clientId: 'client-1',
        businessId: 'business-3',
        professionalId: 'pro-3',
        serviceId: 'business-3-1',
        service: businesses[2].services[0],
        businessName: businesses[2].name,
        professionalName: businesses[2].name,
        clientName: 'Aminata Kouassi',
        clientPhone: '+225 07 07 07 07 07',
        clientAvatar: 'https://i.pravatar.cc/150?img=5',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10, 11, 0),
        time: '11:00',
        duration: 60,
        type: 'SALON',
        subtotal: 10000,
        homeServiceFee: 0,
        total: 10000,
        status: 'COMPLETED',
        paymentMethod: 'MOBILE_MONEY',
        paymentStatus: 'PAID',
        isNewClientMarketplace: true,
        marketplaceCommission: 1500, // 15% de 10000
        transactionFee: 250, // 2.5% de 10000
        platformRevenue: 1750, // 1500 + 250
        professionalEarnings: 8250, // 10000 - 1750
        createdAt: new Date(now.getTime() - 86400000 * 15),
        updatedAt: new Date(now.getTime() - 86400000 * 10)
      },
      // Cancelled booking (shows reason)
      {
        id: 'booking-cancelled-1',
        bookingNumber: 'SEF-20260315-004',
        clientId: 'client-1',
        businessId: 'business-4',
        professionalId: 'pro-4',
        serviceId: 'business-4-1',
        service: businesses[3].services[0],
        businessName: businesses[3].name,
        professionalName: businesses[3].name,
        clientName: 'Aminata Kouassi',
        clientPhone: '+225 07 07 07 07 07',
        clientAvatar: 'https://i.pravatar.cc/150?img=5',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 15, 0),
        time: '15:00',
        duration: 45,
        type: 'HOME',
        subtotal: 12000,
        homeServiceFee: 3000,
        total: 15000,
        status: 'CANCELLED',
        paymentMethod: 'MOBILE_MONEY',
        paymentStatus: 'REFUNDED',
        cancellation: {
          cancelledBy: 'CLIENT',
          reason: 'SCHEDULE_CONFLICT',
          cancelledAt: new Date(now.getTime() - 86400000 * 6),
          refundAmount: 15000
        },
        createdAt: new Date(now.getTime() - 86400000 * 10),
        updatedAt: new Date(now.getTime() - 86400000 * 6)
      }
    ];
  }

  // Mock Wallet
  private walletSignal = signal<Wallet>({
    id: 'wallet-1',
    professionalId: 'pro-1',
    balance: 250000,
    pendingBalance: 45000,
    currency: 'XOF'
  });
  wallet = this.walletSignal.asReadonly();

  // Mock Wallet Transactions
  private transactionsSignal = signal<WalletTransaction[]>(this.generateTransactions());
  transactions = this.transactionsSignal.asReadonly();

  // Mock Payout Requests
  private payoutRequestsSignal = signal<PayoutRequest[]>([]);
  payoutRequests = this.payoutRequestsSignal.asReadonly();

  // Mock Admin Stats
  private adminStatsSignal = signal<AdminStats>(this.generateAdminStats());
  adminStats = this.adminStatsSignal.asReadonly();

  // Mock KYC Documents pending
  private kycDocumentsSignal = signal<KycDocument[]>(this.generateKycDocuments());
  kycDocuments = this.kycDocumentsSignal.asReadonly();

  // Mock Referrals
  private referralsSignal = signal<Referral[]>([]);
  referrals = this.referralsSignal.asReadonly();

  // Mock Platform Wallet (SEFAIZO revenues)
  private platformWalletSignal = signal<PlatformWallet>(this.generatePlatformWallet());
  platformWallet = this.platformWalletSignal.asReadonly();

  // Mock Platform Withdrawals
  private platformWithdrawalsSignal = signal<PlatformWithdrawal[]>([]);
  platformWithdrawals = this.platformWithdrawalsSignal.asReadonly();

  // Mock Commission Settings
  private commissionSettingsSignal = signal<CommissionSettings>(DEFAULT_COMMISSION_SETTINGS);
  commissionSettings = this.commissionSettingsSignal.asReadonly();

  // Mock Premium Plans
  private premiumPlansSignal = signal<PremiumPlan[]>(this.generatePremiumPlans());
  premiumPlans = this.premiumPlansSignal.asReadonly();

  // Mock Advertising Options
  private advertisingOptionsSignal = signal<AdvertisingOption[]>(this.generateAdvertisingOptions());
  advertisingOptions = this.advertisingOptionsSignal.asReadonly();

  constructor() {}

  getCategories(): ServiceCategory[] {
    return this.categories;
  }

  getCommunes(): string[] {
    return this.communes;
  }

  getBusinesses(): Business[] {
    return this.businessesSignal();
  }

  getBusinessBySlug(slug: string): Business | undefined {
    return this.businessesSignal().find(b => b.slug === slug);
  }

  getBusinessesByCategory(category: string): Business[] {
    return this.businessesSignal().filter(b => b.categories.includes(category));
  }

  getBusinessesByCommune(commune: string): Business[] {
    return this.businessesSignal().filter(b => b.city === commune);
  }

  getTopRatedBusinesses(limit = 4): Business[] {
    return this.businessesSignal()
      .filter(b => b.isVerified && b.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  getRecommendedBusinesses(limit = 8): Business[] {
    return this.businessesSignal()
      .filter(b => b.isVerified)
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, limit);
  }

  getNewBusinesses(limit = 8): Business[] {
    return this.businessesSignal()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  getTrendingBusinesses(limit = 8): Business[] {
    return this.businessesSignal()
      .filter(b => b.isVerified)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  getFeaturedReviews(limit = 10): Review[] {
    return this.reviewsSignal()
      .filter(r => r.rating >= 4)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  getReviewsByBusiness(businessId: string): Review[] {
    return this.reviewsSignal().filter(r => r.businessId === businessId);
  }

  getAvailableSlots(date: Date, businessId: string): AvailableSlot[] {
    // Generate mock available slots for a given date
    const slots: AvailableSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        const endTime = `${hour.toString().padStart(2, '0')}:${(min + 30).toString().padStart(2, '0')}`;
        
        // Random availability (70% available)
        const isAvailable = Math.random() > 0.3;
        
        slots.push({
          startTime: time,
          endTime: endTime,
          isAvailable
        });
      }
    }
    
    return slots;
  }

  createBooking(booking: Partial<Booking>): Booking {
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingNumber: `SEF-${Date.now().toString().slice(-8)}`,
      clientId: 'client-1',
      businessId: booking.businessId!,
      professionalId: booking.professionalId!,
      serviceId: booking.serviceId!,
      service: booking.service!,
      businessName: booking.businessName!,
      professionalName: booking.professionalName!,
      date: booking.date!,
      time: booking.time!,
      duration: booking.duration!,
      type: booking.type!,
      clientAddress: booking.clientAddress,
      clientPhone: booking.clientPhone!,
      clientName: booking.clientName!,
      subtotal: booking.subtotal!,
      homeServiceFee: booking.homeServiceFee || 0,
      total: booking.total!,
      status: 'PENDING',
      paymentMethod: booking.paymentMethod!,
      paymentStatus: booking.paymentMethod === 'CASH' ? 'PENDING' : 'PAID',
      notes: booking.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const current = this.bookingsSignal();
    this.bookingsSignal.set([...current, newBooking]);
    
    return newBooking;
  }

  getBookingsByClient(clientId: string): Booking[] {
    return this.bookingsSignal().filter(b => b.clientId === clientId);
  }

  getBookingsByProfessional(professionalId: string): Booking[] {
    return this.bookingsSignal().filter(b => b.professionalId === professionalId);
  }

  cancelBooking(bookingId: string, cancelledBy: 'CLIENT' | 'PRO', reason: CancellationReason, otherReason?: string): boolean {
    const current = this.bookingsSignal();
    const booking = current.find(b => b.id === bookingId);

    if (booking && (booking.status === 'CONFIRMED' || booking.status === 'PENDING')) {
      const updated = current.map(b =>
        b.id === bookingId
          ? { 
              ...b, 
              status: 'CANCELLED' as const, 
              cancellation: {
                cancelledBy,
                reason,
                otherReason,
                cancelledAt: new Date(),
                refundAmount: b.total
              },
              updatedAt: new Date() 
            }
          : b
      );
      this.bookingsSignal.set(updated);
      return true;
    }

    return false;
  }

  completeBooking(bookingId: string): boolean {
    const current = this.bookingsSignal();
    const booking = current.find(b => b.id === bookingId);
    
    if (booking && booking.status === 'CONFIRMED') {
      const updated = current.map(b => 
        b.id === bookingId 
          ? { ...b, status: 'COMPLETED' as const, updatedAt: new Date() }
          : b
      );
      this.bookingsSignal.set(updated);
      return true;
    }
    
    return false;
  }

  getAdminStats(): AdminStats {
    return this.adminStatsSignal();
  }

  getKycDocuments(): KycDocument[] {
    return this.kycDocumentsSignal();
  }

  approveKyc(documentId: string): boolean {
    const current = this.kycDocumentsSignal();
    const doc = current.find(d => d.id === documentId);
    
    if (doc) {
      const updated = current.map(d =>
        d.id === documentId
          ? { ...d, status: 'APPROVED' as const }
          : d
      );
      this.kycDocumentsSignal.set(updated);
      return true;
    }
    
    return false;
  }

  rejectKyc(documentId: string, reason: string): boolean {
    const current = this.kycDocumentsSignal();
    const doc = current.find(d => d.id === documentId);
    
    if (doc) {
      const updated = current.map(d =>
        d.id === documentId
          ? { ...d, status: 'REJECTED' as const, rejectionReason: reason }
          : d
      );
      this.kycDocumentsSignal.set(updated);
      return true;
    }
    
    return false;
  }

  requestPayout(amount: number, bankDetails: { bankName: string; accountNumber: string; accountHolder: string }): PayoutRequest {
    const wallet = this.walletSignal();
    
    if (wallet.balance < amount) {
      throw new Error('Solde insuffisant');
    }
    
    const payout: PayoutRequest = {
      id: `payout-${Date.now()}`,
      walletId: wallet.id,
      professionalId: wallet.professionalId,
      amount,
      bankName: bankDetails.bankName,
      accountNumber: bankDetails.accountNumber,
      accountHolder: bankDetails.accountHolder,
      status: 'PENDING',
      requestedAt: new Date()
    };
    
    // Deduct from wallet
    this.walletSignal.set({
      ...wallet,
      balance: wallet.balance - amount,
      pendingBalance: wallet.pendingBalance + amount
    });
    
    const current = this.payoutRequestsSignal();
    this.payoutRequestsSignal.set([...current, payout]);
    
    return payout;
  }

  private generateBusinesses(): Business[] {
    const businessData = [
      {
        name: 'Beauty Salon Cocody',
        slug: 'beauty-salon-cocody',
        description: 'Salon de beauté haut de gamme spécialisé dans les soins capillaires et esthétiques.',
        businessType: 'SALON' as const,
        city: 'Cocody',
        address: 'Riviera 2, Cocody, Abidjan',
        phone: '+225 07 01 02 03 04',
        email: 'contact@beautysalon.ci',
        categories: ['Coiffure', 'Esthétique', 'Manucure'],
        rating: 4.8,
        reviewCount: 156,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.3599,
        longitude: -3.9810,
        coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200'
      },
      {
        name: 'Barber Shop Plateau',
        slug: 'barber-shop-plateau',
        description: 'Barbier professionnel offrant des coupes modernes et classiques.',
        businessType: 'SALON' as const,
        city: 'Plateau',
        address: 'Avenue Chardy, Plateau, Abidjan',
        phone: '+225 05 02 03 04 05',
        email: 'contact@barbershop.ci',
        categories: ['Barbier', 'Coiffure'],
        rating: 4.9,
        reviewCount: 203,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.3247,
        longitude: -4.0156,
        coverImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
        avatar: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200'
      },
      {
        name: 'Nails & Spa Yopougon',
        slug: 'nails-spa-yopougon',
        description: 'Institut spécialisé en manucure, pédicure et soins des ongles.',
        businessType: 'SALON' as const,
        city: 'Yopougon',
        address: 'Yopougon Sicogi, Abidjan',
        phone: '+225 01 03 04 05 06',
        email: 'contact@nailsspa.ci',
        categories: ['Manucure', 'Pédicure', 'Massage'],
        rating: 4.7,
        reviewCount: 89,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.3364,
        longitude: -4.0892,
        coverImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
        avatar: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200'
      },
      {
        name: 'Marie Coiffeuse à Domicile',
        slug: 'marie-coiffeuse-domicile',
        description: 'Coiffeuse professionnelle se déplaçant à votre domicile pour tous types de coiffures.',
        businessType: 'FREELANCE' as const,
        city: 'Marcory',
        phone: '+225 07 04 05 06 07',
        email: 'marie@coiffure.ci',
        categories: ['Coiffure', 'Maquillage'],
        rating: 4.6,
        reviewCount: 67,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.2947,
        longitude: -3.9889,
        avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200'
      },
      {
        name: 'Luxury Beauty Treichville',
        slug: 'luxury-beauty-treichville',
        description: 'Institut de beauté complet offrant tous types de soins.',
        businessType: 'SALON' as const,
        city: 'Treichville',
        address: 'Boulevard de Marseille, Treichville, Abidjan',
        phone: '+225 05 05 06 07 08',
        email: 'contact@luxurybeauty.ci',
        categories: ['Esthétique', 'Soins du visage', 'Massage', 'Maquillage'],
        rating: 4.9,
        reviewCount: 234,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.2833,
        longitude: -4.0000,
        coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
        avatar: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200'
      },
      {
        name: 'Afro Hair Style Adjamé',
        slug: 'afro-hair-style-adjame',
        description: 'Spécialiste des coiffures afro et tresses en tous genres.',
        businessType: 'SALON' as const,
        city: 'Adjamé',
        address: 'Adjamé Liberté, Abidjan',
        phone: '+225 01 06 07 08 09',
        email: 'contact@afrohairstyle.ci',
        categories: ['Coiffure'],
        rating: 4.5,
        reviewCount: 112,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.3515,
        longitude: -4.0236,
        coverImage: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
        avatar: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200'
      },
      {
        name: 'Glow Up Abobo',
        slug: 'glow-up-abobo',
        description: 'Salon moderne pour tous vos besoins beauté.',
        businessType: 'SALON' as const,
        city: 'Abobo',
        address: 'Abobo Gare, Abidjan',
        phone: '+225 07 07 08 09 10',
        email: 'contact@glowup.ci',
        categories: ['Coiffure', 'Esthétique', 'Manucure', 'Maquillage'],
        rating: 4.4,
        reviewCount: 78,
        isVerified: false,
        status: 'ACTIVE' as const,
        latitude: 5.4236,
        longitude: -4.0208,
        coverImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800',
        avatar: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200'
      },
      {
        name: 'Port-Bouët Beauty',
        slug: 'port-bouet-beauty',
        description: 'Institut de beauté près de l\'aéroport.',
        businessType: 'SALON' as const,
        city: 'Port-Bouët',
        address: 'Vridi, Port-Bouët, Abidjan',
        phone: '+225 05 08 09 10 11',
        email: 'contact@pbbeauty.ci',
        categories: ['Esthétique', 'Manucure', 'Soins du visage'],
        rating: 4.6,
        reviewCount: 95,
        isVerified: true,
        status: 'ACTIVE' as const,
        latitude: 5.2547,
        longitude: -3.9264,
        coverImage: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800',
        avatar: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=200'
      }
    ];

    const now = new Date();
    return businessData.map((data, index) => ({
      id: `business-${index + 1}`,
      professionalId: `pro-${index + 1}`,
      ...data,
      kycStatus: index % 3 === 0 ? 'APPROVED' : index % 3 === 1 ? 'PENDING' : 'REJECTED',
      services: this.generateServices(data.categories, index + 1),
      workingHours: this.generateWorkingHours(),
      homeServiceCommunes: this.generateHomeServiceCommunes(),
      createdAt: now,
      updatedAt: now
    }));
  }

  private generateServices(categories: string[], businessIndex: number): Service[] {
    const services: Service[] = [];
    let serviceIndex = 1;

    const serviceTemplates: Record<string, { name: string; price: number; duration: number }[]> = {
      'Coiffure': [
        { name: 'Coupe simple', price: 5000, duration: 30 },
        { name: 'Coupe + Brushing', price: 8000, duration: 45 },
        { name: 'Coloration', price: 15000, duration: 90 },
        { name: 'Tresses', price: 20000, duration: 120 },
        { name: 'Nattes', price: 25000, duration: 150 }
      ],
      'Esthétique': [
        { name: 'Soin du visage', price: 10000, duration: 60 },
        { name: 'Épilation sourcils', price: 3000, duration: 15 },
        { name: 'Épilation lèvres', price: 2000, duration: 10 },
        { name: 'Gommage corps', price: 15000, duration: 45 }
      ],
      'Manucure': [
        { name: 'Manucure simple', price: 5000, duration: 30 },
        { name: 'Manucure russe', price: 10000, duration: 60 },
        { name: 'Pose vernis gel', price: 12000, duration: 45 },
        { name: 'Nail art', price: 15000, duration: 90 }
      ],
      'Pédicure': [
        { name: 'Pédicure simple', price: 7000, duration: 45 },
        { name: 'Pédicure spa', price: 12000, duration: 60 }
      ],
      'Barbier': [
        { name: 'Coupe de cheveux', price: 5000, duration: 30 },
        { name: 'Taille de barbe', price: 3000, duration: 20 },
        { name: 'Coupe + Barbe', price: 7000, duration: 45 },
        { name: 'Rasage traditionnel', price: 5000, duration: 30 }
      ],
      'Maquillage': [
        { name: 'Maquillage jour', price: 15000, duration: 45 },
        { name: 'Maquillage soirée', price: 25000, duration: 60 },
        { name: 'Maquillage mariage', price: 50000, duration: 90 }
      ],
      'Soins du visage': [
        { name: 'Nettoyage profond', price: 12000, duration: 60 },
        { name: 'Soin hydratant', price: 15000, duration: 45 },
        { name: 'Soin anti-âge', price: 25000, duration: 75 }
      ],
      'Massage': [
        { name: 'Massage relaxant', price: 20000, duration: 60 },
        { name: 'Massage tonique', price: 25000, duration: 60 },
        { name: 'Massage complet', price: 35000, duration: 90 }
      ]
    };

    categories.forEach(category => {
      const templates = serviceTemplates[category] || [];
      templates.forEach(template => {
        services.push({
          id: `service-${businessIndex}-${serviceIndex}`,
          businessId: `business-${businessIndex}`,
          name: template.name,
          description: `Prestation de ${template.name.toLowerCase()}`,
          categoryId: `cat-${categories.indexOf(category) + 1}`,
          categoryName: category,
          price: template.price,
          duration: template.duration,
          isActive: true,
          isPublished: true,
          isReferrable: serviceIndex % 3 === 0, // Every 3rd service is referrable
          referralPoints: serviceIndex % 3 === 0 ? 100 : 0,
          isHomeService: serviceIndex % 2 === 0, // Every 2nd service offers home service
          isSalonService: true,
          homeServiceMarkup: serviceIndex % 2 === 0 ? 3000 : 0,
          homeServiceMarkupPercent: serviceIndex % 2 === 0 ? 20 : 0,
          serviceAreas: serviceIndex % 2 === 0 ? ['Cocody', 'Plateau', 'Marcory'] : [],
          sortOrder: serviceIndex,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        serviceIndex++;
      });
    });

    return services;
  }

  private generateWorkingHours(): WorkingHour[] {
    const days: WorkingHour[] = [];
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
    for (let i = 0; i < 7; i++) {
      const isOpen = i !== 0; // Closed on Sunday
      days.push({
        dayOfWeek: i,
        isOpen,
        slots: isOpen ? [
          { startTime: '09:00', endTime: '13:00' },
          { startTime: '14:00', endTime: '19:00' }
        ] : []
      });
    }
    
    return days;
  }

  private generateHomeServiceCommunes(): HomeServiceCommune[] {
    return this.communes.map(commune => ({
      commune,
      fee: Math.floor(Math.random() * 3000) + 2000 // 2000-5000 FCFA
    }));
  }

  private generateReviews(): Review[] {
    // Profils ivoiriens authentiques — photos de personnes noires africaines
    const profiles = [
      { name: 'Adjoua Kouassi',    avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Bintou Traoré',     avatar: '/avatars/Bintou Traoré.jpg' },
      { name: 'Clarisse Yao',      avatar: '/avatars/clarisse-yao.jpg' },
      { name: 'Djeneba Koné',      avatar: '/avatars/Djeneba Koné.jpg' },
      { name: 'Fatou Diallo',      avatar: '/avatars/Fatou Diallo.jpg' },
      { name: 'Mariam Bamba',      avatar: '/avatars/mariam-bamba.jpg' },
      { name: 'Edwige Assi',       avatar: '/avatars/Edwige Assi.jpg' },
      { name: 'Moussa Ouattara',   avatar: 'https://randomuser.me/api/portraits/men/46.jpg'   },
      { name: 'Kofi Assoumou',     avatar: 'https://randomuser.me/api/portraits/men/54.jpg'   },
      { name: 'Issouf Coulibaly',  avatar: 'https://randomuser.me/api/portraits/men/65.jpg'   },
    ];

    // Commentaires typiquement ivoiriens — expressions locales authentiques
    const comments = [
      "Hé ! Ma coiffeuse là, elle connaît vraiment son affaire ! La coiffure qu'elle m'a faite, tout Abidjan m'a demandé le numéro. Je reviendrai à coup sûr !",
      "Waouh, bébé là a des mains en or dêh ! Mes ongles sont trop beaux, mes amies ont trop kiffé. SEFAIZO c'est vraiment top !",
      "Franchement, j'ai pas regretté du tout. Le massage là m'a déstressée à fond, j'avais même peur de me lever tellement c'était bon ! Je recommande à toutes mes sœurs d'Abidjan.",
      "Mon ami m'avait parlé de SEFAIZO, j'ai essayé pour la coupe... Vraiment wôh ! C'est nickel, le barbier là connaît son travail !",
      "Depuis que j'ai trouvé ce salon via SEFAIZO, je ne vais plus nulle part ailleurs. Le soin du visage qu'elles m'ont fait, ma peau brille comme si j'avais 18 ans !",
      "Bon dêh, je m'attendais vraiment pas à ce niveau ! Les filles sont trop professionnelles, le salon est propre et le résultat est magnifique. Merci SEFAIZO !",
      "Ma maquilleuse est top oh ! Pour mon anniversaire, elle m'a tellement embellie que mon mari m'a demandé si c'était vraiment moi. Je suis trop contente !",
      "Service impeccable ! J'ai réservé depuis mon téléphone, j'ai eu la confirmation tout de suite. À l'heure convenue j'étais déjà dans le salon. C'est trop pratique dêh !",
      "Elles m'ont fait une pédicure qui tient depuis 3 semaines sans se casser. On voit que c'est de vraies pros. Adiès, SEFAIZO c'est la solution pour nous les filles d'Abidjan !",
      "Mon barbier via SEFAIZO est devenu comme mon ami maintenant. La coupe est toujours fraîche, il connaît mon style. Jamais je ne change, c'est réglé !",
    ];

    const reviews: Review[] = [];
    for (let i = 1; i <= 8; i++) {
      const numReviews = Math.floor(Math.random() * 5) + 3;
      for (let j = 0; j < numReviews; j++) {
        const profile = profiles[(i + j) % profiles.length];
        reviews.push({
          id: `review-${i}-${j}`,
          bookingId: `booking-mock-${i}-${j}`,
          businessId: `business-${i}`,
          clientId: `client-mock-${j}`,
          clientName: profile.name,
          clientAvatar: profile.avatar,
          rating: Math.floor(Math.random() * 2) + 4, // 4 ou 5 étoiles
          comment: comments[(i * 3 + j) % comments.length],
          isReported: false,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });
      }
    }

    return reviews;
  }

  private generateTransactions(): WalletTransaction[] {
    const transactions: WalletTransaction[] = [];
    const descriptions = [
      'Paiement réservation #SEF-',
      'Frais de service',
      'Reversement effectué',
      'Remboursement client'
    ];

    for (let i = 0; i < 15; i++) {
      const isCredit = Math.random() > 0.3;
      const amount = Math.floor(Math.random() * 50000) + 5000;
      
      transactions.push({
        id: `txn-${i}`,
        walletId: 'wallet-1',
        type: isCredit ? 'CREDIT' : 'DEBIT',
        amount: isCredit ? amount : -amount,
        description: descriptions[Math.floor(Math.random() * descriptions.length)] + `${Date.now() - i * 86400000}`,
        balanceAfter: 250000 - i * 10000,
        createdAt: new Date(Date.now() - i * 86400000)
      });
    }

    return transactions;
  }

  private generateKycDocuments(): KycDocument[] {
    return [
      {
        id: 'kyc-1',
        type: 'CNI',
        url: 'https://via.placeholder.com/400x300?text=CNI',
        status: 'PENDING',
        uploadedAt: new Date(Date.now() - 2 * 86400000)
      },
      {
        id: 'kyc-2',
        type: 'BUSINESS_LICENSE',
        url: 'https://via.placeholder.com/400x300?text=Licence',
        status: 'PENDING',
        uploadedAt: new Date(Date.now() - 1 * 86400000)
      },
      {
        id: 'kyc-3',
        type: 'PHOTO',
        url: 'https://via.placeholder.com/400x300?text=Photo+Salon',
        status: 'PENDING',
        uploadedAt: new Date(Date.now() - 3 * 86400000)
      }
    ];
  }

  private generateAdminStats(): AdminStats {
    const last7Days: DailyStats[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      last7Days.push({
        date: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
        bookings: Math.floor(Math.random() * 50) + 20,
        revenue: Math.floor(Math.random() * 500000) + 200000
      });
    }

    const communesStats: CommuneStats[] = this.communes.slice(0, 5).map(commune => ({
      commune,
      bookings: Math.floor(Math.random() * 100) + 30,
      revenue: Math.floor(Math.random() * 1000000) + 300000
    }));

    const topPros: ProfessionalStats[] = this.businessesSignal().slice(0, 10).map((b, i) => ({
      professionalId: b.professionalId,
      businessName: b.name,
      bookings: Math.floor(Math.random() * 200) + 50,
      revenue: Math.floor(Math.random() * 2000000) + 500000,
      rating: b.rating
    })).sort((a, b) => b.revenue - a.revenue);

    return {
      totalBookings: Math.floor(Math.random() * 10000) + 5000,
      monthlyRevenue: Math.floor(Math.random() * 50000000) + 20000000,
      newProfessionals: Math.floor(Math.random() * 100) + 20,
      newClients: Math.floor(Math.random() * 500) + 100,
      bookingsByDay: last7Days,
      bookingsByCommune: communesStats,
      topProfessionals: topPros
    };
  }

  // Pro Stats
  getProStats(professionalId: string): ProStats {
    const bookings = this.getBookingsByProfessional(professionalId);
    
    return {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'PENDING').length,
      confirmedBookings: bookings.filter(b => b.status === 'CONFIRMED').length,
      cancelledBookings: bookings.filter(b => b.status === 'CANCELLED').length,
      completedBookings: bookings.filter(b => b.status === 'COMPLETED').length,
      monthlyRevenue: bookings.filter(b => b.status === 'COMPLETED').reduce((sum, b) => sum + b.total, 0),
      weeklyRevenue: bookings.filter(b => b.status === 'COMPLETED').reduce((sum, b) => sum + b.total, 0) * 0.25,
      averageRating: 4.8,
      totalReviews: bookings.filter(b => b.status === 'COMPLETED').length,
      referralPoints: 150,
      bookingsByDay: [],
      servicesByCategory: [],
      cancellationsByReason: []
    };
  }

  // Service Management
  addService(service: Partial<Service>): Service {
    const newService: Service = {
      id: `service-${Date.now()}`,
      businessId: service.businessId!,
      name: service.name!,
      description: service.description || '',
      categoryId: service.categoryId || 'cat-1',
      categoryName: service.categoryName || 'Autre',
      price: service.price || 0,
      duration: service.duration || 30,
      isActive: service.isActive ?? true,
      isPublished: service.isPublished ?? false,
      isReferrable: service.isReferrable ?? false,
      referralPoints: service.referralPoints || 0,
      isHomeService: service.isHomeService ?? false,
      isSalonService: service.isSalonService ?? true,
      homeServiceMarkup: service.homeServiceMarkup || 0,
      homeServiceMarkupPercent: service.homeServiceMarkupPercent || 0,
      serviceAreas: service.serviceAreas || [],
      sortOrder: service.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to business
    const businesses = this.businessesSignal();
    const business = businesses.find(b => b.id === service.businessId);
    if (business) {
      business.services.push(newService);
      this.businessesSignal.set([...businesses]);
    }

    return newService;
  }

  updateService(serviceId: string, updates: Partial<Service>): boolean {
    const businesses = this.businessesSignal();
    let updated = false;

    businesses.forEach(business => {
      const serviceIndex = business.services.findIndex(s => s.id === serviceId);
      if (serviceIndex !== -1) {
        business.services[serviceIndex] = {
          ...business.services[serviceIndex],
          ...updates,
          updatedAt: new Date()
        };
        updated = true;
      }
    });

    if (updated) {
      this.businessesSignal.set([...businesses]);
    }

    return updated;
  }

  deleteService(serviceId: string): boolean {
    const businesses = this.businessesSignal();
    let deleted = false;

    businesses.forEach(business => {
      const serviceIndex = business.services.findIndex(s => s.id === serviceId);
      if (serviceIndex !== -1) {
        business.services.splice(serviceIndex, 1);
        deleted = true;
      }
    });

    if (deleted) {
      this.businessesSignal.set([...businesses]);
    }

    return deleted;
  }

  toggleServicePublish(serviceId: string): boolean {
    const businesses = this.businessesSignal();
    let toggled = false;

    businesses.forEach(business => {
      const service = business.services.find(s => s.id === serviceId);
      if (service) {
        service.isPublished = !service.isPublished;
        service.updatedAt = new Date();
        toggled = true;
      }
    });

    if (toggled) {
      this.businessesSignal.set([...businesses]);
    }

    return toggled;
  }

  // Referral System
  createReferral(referrerBusinessId: string, referredBusinessId: string, clientId: string, bookingId?: string): Referral {
    const referral: Referral = {
      id: `referral-${Date.now()}`,
      referrerBusinessId,
      referredBusinessId,
      clientId,
      bookingId,
      pointsAwarded: 100,
      status: bookingId ? 'AWARDED' : 'PENDING',
      createdAt: new Date()
    };

    const current = this.referralsSignal();
    this.referralsSignal.set([...current, referral]);

    return referral;
  }

  getReferralsByBusiness(businessId: string): Referral[] {
    return this.referralsSignal().filter(r => r.referrerBusinessId === businessId);
  }

  useReferralPoints(businessId: string, points: number): boolean {
    // In a real app, this would update the business wallet
    console.log(`Using ${points} points for business ${businessId}`);
    return true;
  }

  // ============================================
  // ADMIN KPI DASHBOARD METHODS
  // ============================================

  getAdminKpiDashboard(period: TimePeriod = 'month'): AdminKpiDashboard {
    const bookings = this.bookingsSignal();
    const businesses = this.businessesSignal();

    return {
      overview: this.getOverviewMetrics(bookings, businesses),
      appointments: this.getAppointmentMetrics(bookings),
      clients: this.getClientMetrics(bookings),
      professionals: this.getProfessionalMetrics(bookings, businesses),
      revenue: this.getRevenueMetrics(bookings, businesses),
      trends: this.getTrendMetrics(bookings, businesses, period)
    };
  }

  private getOverviewMetrics(bookings: Booking[], businesses: Business[]): OverviewMetrics {
    const total = bookings.length;
    const completed = bookings.filter(b => b.status === 'COMPLETED').length;
    const cancelled = bookings.filter(b => b.status === 'CANCELLED').length;
    const confirmed = bookings.filter(b => b.status === 'CONFIRMED').length;

    // Calculate unique clients
    const uniqueClients = new Set(bookings.map(b => b.clientId)).size;
    
    // Calculate unique professionals
    const uniqueProfessionals = new Set(bookings.map(b => b.professionalId)).size;

    // Monthly revenue (completed bookings only)
    const monthlyRevenue = bookings
      .filter(b => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + b.total, 0);

    // Completion rate = completed / (completed + cancelled + no_show)
    const completionDenominator = completed + cancelled;
    const completionRate = completionDenominator > 0 
      ? Math.round((completed / completionDenominator) * 100) 
      : 0;

    // Cancellation rate
    const cancellationRate = completionDenominator > 0 
      ? Math.round((cancelled / completionDenominator) * 100) 
      : 0;

    return {
      totalAppointments: total,
      totalClients: uniqueClients,
      totalProfessionals: uniqueProfessionals,
      monthlyRevenue,
      completionRate,
      cancellationRate,
      periodComparison: {
        appointments: Math.round((Math.random() - 0.3) * 40), // -30% to +10%
        clients: Math.round((Math.random() - 0.4) * 30),
        revenue: Math.round((Math.random() - 0.35) * 50)
      }
    };
  }

  private getAppointmentMetrics(bookings: Booking[]): AppointmentMetrics {
    const total = bookings.length;
    
    // By status
    const statusCounts: Record<BookingStatus, number> = {
      PENDING: bookings.filter(b => b.status === 'PENDING').length,
      CONFIRMED: bookings.filter(b => b.status === 'CONFIRMED').length,
      COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
      CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
      NO_SHOW: bookings.filter(b => b.status === 'NO_SHOW').length
    };

    const byStatus: AppointmentByStatus[] = [
      { status: 'CONFIRMED', count: statusCounts.CONFIRMED, percentage: total > 0 ? Math.round((statusCounts.CONFIRMED / total) * 100) : 0, label: 'Confirmés', color: 'blue' },
      { status: 'COMPLETED', count: statusCounts.COMPLETED, percentage: total > 0 ? Math.round((statusCounts.COMPLETED / total) * 100) : 0, label: 'Terminés', color: 'green' },
      { status: 'CANCELLED', count: statusCounts.CANCELLED, percentage: total > 0 ? Math.round((statusCounts.CANCELLED / total) * 100) : 0, label: 'Annulés', color: 'red' },
      { status: 'NO_SHOW', count: statusCounts.NO_SHOW, percentage: total > 0 ? Math.round((statusCounts.NO_SHOW / total) * 100) : 0, label: 'Non-présentés', color: 'gray' },
      { status: 'PENDING', count: statusCounts.PENDING, percentage: total > 0 ? Math.round((statusCounts.PENDING / total) * 100) : 0, label: 'En attente', color: 'yellow' }
    ];

    // By type
    const salonCount = bookings.filter(b => b.type === 'SALON').length;
    const homeCount = bookings.filter(b => b.type === 'HOME').length;

    // Show-up rate = completed / (completed + no_show)
    const showUpDenominator = statusCounts.COMPLETED + statusCounts.NO_SHOW;
    const showUpRate = showUpDenominator > 0 
      ? Math.round((statusCounts.COMPLETED / showUpDenominator) * 100) 
      : 100;

    const noShowRate = showUpDenominator > 0 
      ? Math.round((statusCounts.NO_SHOW / showUpDenominator) * 100) 
      : 0;

    // Average duration
    const totalDuration = bookings.reduce((sum, b) => sum + b.duration, 0);
    const averageDuration = total > 0 ? Math.round(totalDuration / total) : 0;

    // Time range stats (last 7 days)
    const byTimeRange: TimeRangeStats[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      
      const dayBookings = bookings.filter(b => 
        b.date.getDate() === date.getDate() && 
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear()
      );

      byTimeRange.push({
        period: dateStr,
        date,
        appointments: dayBookings.length,
        completed: dayBookings.filter(b => b.status === 'COMPLETED').length,
        cancelled: dayBookings.filter(b => b.status === 'CANCELLED').length,
        revenue: dayBookings.filter(b => b.status === 'COMPLETED').reduce((sum, b) => sum + b.total, 0)
      });
    }

    return {
      total,
      byStatus,
      byType: {
        salon: salonCount,
        home: homeCount,
        salonPercentage: total > 0 ? Math.round((salonCount / total) * 100) : 0,
        homePercentage: total > 0 ? Math.round((homeCount / total) * 100) : 0
      },
      byTimeRange,
      showUpRate,
      noShowRate,
      averageDuration
    };
  }

  private getClientMetrics(bookings: Booking[]): ClientMetrics {
    // Group bookings by client
    const clientBookings = new Map<string, Booking[]>();
    bookings.forEach(b => {
      const existing = clientBookings.get(b.clientId) || [];
      existing.push(b);
      clientBookings.set(b.clientId, existing);
    });

    const totalClients = clientBookings.size;
    
    // New clients = clients with only 1 booking
    let newClients = 0;
    let returningClients = 0;
    let totalVisits = 0;
    let totalSpent = 0;

    const topClientsData: Array<{ clientId: string; bookings: Booking[]; totalSpent: number }> = [];

    clientBookings.forEach((clientBookingsList, clientId) => {
      const spent = clientBookingsList.filter(b => b.status === 'COMPLETED').reduce((sum, b) => sum + b.total, 0);
      
      if (clientBookingsList.length === 1) {
        newClients++;
      } else {
        returningClients++;
      }
      
      totalVisits += clientBookingsList.length;
      totalSpent += spent;

      topClientsData.push({ clientId, bookings: clientBookingsList, totalSpent: spent });
    });

    // Sort and get top 5 clients
    topClientsData.sort((a, b) => b.totalSpent - a.totalSpent);
    const topClients: ClientStats[] = topClientsData.slice(0, 5).map((data, index) => {
      const lastBooking = data.bookings.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
      return {
        clientId: data.clientId,
        clientName: lastBooking.clientName,
        clientAvatar: lastBooking.clientAvatar,
        totalAppointments: data.bookings.length,
        totalSpent: data.totalSpent,
        lastVisit: lastBooking.date,
        favoriteService: data.bookings.length > 0 ? data.bookings[0].service.name : undefined
      };
    });

    // Retention rate = returning / total
    const retentionRate = totalClients > 0 ? Math.round((returningClients / totalClients) * 100) : 0;
    const averageVisitsPerClient = totalClients > 0 ? Math.round((totalVisits / totalClients) * 10) / 10 : 0;
    const averageSpendPerClient = totalClients > 0 ? Math.round(totalSpent / totalClients) : 0;

    // New clients trend (last 7 days)
    const newClientsTrend: TrendData[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
      
      const dayBookings = bookings.filter(b => 
        b.date.getDate() === date.getDate() && 
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear()
      );
      
      const dayNewClients = new Set(dayBookings.filter(b => {
        const clientHistory = bookings.filter(cb => cb.clientId === b.clientId && cb.date < b.date);
        return clientHistory.length === 0;
      }).map(b => b.clientId)).size;

      newClientsTrend.push({
        label,
        date,
        value: dayNewClients
      });
    }

    return {
      totalClients,
      newClients,
      returningClients,
      retentionRate,
      averageVisitsPerClient,
      averageSpendPerClient,
      topClients,
      newClientsTrend
    };
  }

  private getProfessionalMetrics(bookings: Booking[], businesses: Business[]): ProfessionalMetrics {
    const totalProfessionals = businesses.length;
    const activeProfessionals = businesses.filter(b => b.status === 'ACTIVE').length;
    
    // New professionals (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newProfessionals = businesses.filter(b => b.createdAt >= thirtyDaysAgo).length;

    // By category
    const categoryMap = new Map<string, { count: number; revenue: number; appointments: number }>();
    businesses.forEach(b => {
      b.categories.forEach(cat => {
        const existing = categoryMap.get(cat) || { count: 0, revenue: 0, appointments: 0 };
        existing.count++;
        categoryMap.set(cat, existing);
      });
    });

    // Calculate revenue and appointments per category from bookings
    bookings.filter(b => b.status === 'COMPLETED').forEach(b => {
      const business = businesses.find(biz => biz.id === b.businessId);
      if (business) {
        business.categories.forEach(cat => {
          const existing = categoryMap.get(cat) || { count: 0, revenue: 0, appointments: 0 };
          existing.revenue += b.total;
          existing.appointments++;
          categoryMap.set(cat, existing);
        });
      }
    });

    const byCategory: CategoryStats[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      percentage: totalProfessionals > 0 ? Math.round((data.count / (businesses.reduce((sum, b) => sum + b.categories.length, 0))) * 100) : 0,
      revenue: data.revenue,
      appointments: data.appointments
    }));

    // By commune
    const communeMap = new Map<string, { count: number; revenue: number }>();
    businesses.forEach(b => {
      const existing = communeMap.get(b.city) || { count: 0, revenue: 0 };
      existing.count++;
      communeMap.set(b.city, existing);
    });

    bookings.filter(b => b.status === 'COMPLETED').forEach(b => {
      const business = businesses.find(biz => biz.id === b.businessId);
      if (business) {
        const existing = communeMap.get(business.city) || { count: 0, revenue: 0 };
        existing.revenue += b.total;
        communeMap.set(business.city, existing);
      }
    });

    const byCommune: CommuneProfessionalStats[] = Array.from(communeMap.entries()).map(([commune, data]) => ({
      commune,
      count: data.count,
      percentage: totalProfessionals > 0 ? Math.round((data.count / totalProfessionals) * 100) : 0,
      revenue: data.revenue
    }));

    // Top performers
    const proPerformance = new Map<string, { 
      business: Business; 
      appointments: number; 
      completed: number; 
      revenue: number;
      totalBookings: number;
    }>();

    businesses.forEach(b => {
      proPerformance.set(b.professionalId, {
        business: b,
        appointments: 0,
        completed: 0,
        revenue: 0,
        totalBookings: 0
      });
    });

    bookings.forEach(b => {
      const perf = proPerformance.get(b.professionalId);
      if (perf) {
        perf.totalBookings++;
        if (b.status === 'COMPLETED' || b.status === 'CONFIRMED') {
          perf.appointments++;
        }
        if (b.status === 'COMPLETED') {
          perf.completed++;
          perf.revenue += b.total;
        }
      }
    });

    const topPerformers: ProfessionalPerformance[] = Array.from(proPerformance.values())
      .filter(p => p.totalBookings > 0)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
      .map((p, index) => ({
        professionalId: p.business.professionalId,
        businessName: p.business.name,
        businessSlug: p.business.slug,
        avatar: p.business.avatar,
        category: p.business.categories[0] || 'Autre',
        commune: p.business.city,
        totalAppointments: p.totalBookings,
        completedAppointments: p.completed,
        revenue: p.revenue,
        rating: p.business.rating,
        reviewCount: p.business.reviewCount,
        acceptanceRate: p.totalBookings > 0 ? Math.round((p.appointments / p.totalBookings) * 100) : 0,
        rank: index + 1
      }));

    // KYC Status
    const kycCounts = {
      pending: businesses.filter(b => b.kycStatus === 'PENDING').length,
      approved: businesses.filter(b => b.kycStatus === 'APPROVED').length,
      rejected: businesses.filter(b => b.kycStatus === 'REJECTED').length
    };

    const kycTotal = kycCounts.pending + kycCounts.approved + kycCounts.rejected || 1;

    const kycStatus: KycStatusStats = {
      pending: kycCounts.pending,
      approved: kycCounts.approved,
      rejected: kycCounts.rejected,
      pendingPercentage: Math.round((kycCounts.pending / kycTotal) * 100),
      approvedPercentage: Math.round((kycCounts.approved / kycTotal) * 100),
      rejectedPercentage: Math.round((kycCounts.rejected / kycTotal) * 100)
    };

    // Average rating
    const averageRating = businesses.length > 0 
      ? Math.round((businesses.reduce((sum, b) => sum + b.rating, 0) / businesses.length) * 10) / 10
      : 0;

    return {
      totalProfessionals,
      activeProfessionals,
      newProfessionals,
      byCategory,
      byCommune,
      topPerformers,
      kycStatus,
      averageRating
    };
  }

  private getRevenueMetrics(bookings: Booking[], businesses: Business[]): RevenueMetrics {
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
    const totalRevenue = completedBookings.reduce((sum, b) => sum + b.total, 0);
    
    // Monthly revenue (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyRevenue = completedBookings
      .filter(b => b.date >= thirtyDaysAgo)
      .reduce((sum, b) => sum + b.total, 0);

    // Weekly revenue (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weeklyRevenue = completedBookings
      .filter(b => b.date >= sevenDaysAgo)
      .reduce((sum, b) => sum + b.total, 0);

    const dailyAverage = Math.round(weeklyRevenue / 7);
    const averagePerAppointment = completedBookings.length > 0 
      ? Math.round(totalRevenue / completedBookings.length) 
      : 0;

    // Unique clients
    const uniqueClients = new Set(completedBookings.map(b => b.clientId)).size;
    const averagePerClient = uniqueClients > 0 
      ? Math.round(totalRevenue / uniqueClients) 
      : 0;

    // By payment method
    const mobileMoneyBookings = completedBookings.filter(b => b.paymentMethod === 'MOBILE_MONEY');
    const cashBookings = completedBookings.filter(b => b.paymentMethod === 'CASH');
    
    const byPaymentMethod: PaymentMethodStats[] = [
      {
        method: 'MOBILE_MONEY',
        amount: mobileMoneyBookings.reduce((sum, b) => sum + b.total, 0),
        percentage: completedBookings.length > 0 ? Math.round((mobileMoneyBookings.length / completedBookings.length) * 100) : 0,
        count: mobileMoneyBookings.length,
        label: 'Mobile Money'
      },
      {
        method: 'CASH',
        amount: cashBookings.reduce((sum, b) => sum + b.total, 0),
        percentage: completedBookings.length > 0 ? Math.round((cashBookings.length / completedBookings.length) * 100) : 0,
        count: cashBookings.length,
        label: 'Espèces'
      }
    ];

    // By period (last 7 days)
    const byPeriod: RevenueByPeriod[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      
      const dayBookings = completedBookings.filter(b => 
        b.date.getDate() === date.getDate() && 
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear()
      );
      
      const revenue = dayBookings.reduce((sum, b) => sum + b.total, 0);

      byPeriod.push({
        period: label,
        date,
        revenue,
        appointments: dayBookings.length,
        growth: Math.round((Math.random() - 0.4) * 30) // Mock growth
      });
    }

    // By commune
    const communeRevenue = new Map<string, { revenue: number; appointments: number }>();
    completedBookings.forEach(b => {
      const business = businesses.find(biz => biz.id === b.businessId);
      if (business) {
        const existing = communeRevenue.get(business.city) || { revenue: 0, appointments: 0 };
        existing.revenue += b.total;
        existing.appointments++;
        communeRevenue.set(business.city, existing);
      }
    });

    const byCommune: CommuneRevenue[] = Array.from(communeRevenue.entries()).map(([commune, data]) => ({
      commune,
      revenue: data.revenue,
      percentage: totalRevenue > 0 ? Math.round((data.revenue / totalRevenue) * 100) : 0,
      appointments: data.appointments,
      averagePerAppointment: data.appointments > 0 ? Math.round(data.revenue / data.appointments) : 0
    }));

    // By professional
    const proRevenue = new Map<string, { business: Business; revenue: number; appointments: number }>();
    businesses.forEach(b => {
      proRevenue.set(b.professionalId, { business: b, revenue: 0, appointments: 0 });
    });

    completedBookings.forEach(b => {
      const pro = proRevenue.get(b.professionalId);
      if (pro) {
        pro.revenue += b.total;
        pro.appointments++;
      }
    });

    const byProfessional: ProfessionalRevenue[] = Array.from(proRevenue.values())
      .filter(p => p.revenue > 0)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
      .map(p => ({
        professionalId: p.business.professionalId,
        businessName: p.business.name,
        revenue: p.revenue,
        percentage: totalRevenue > 0 ? Math.round((p.revenue / totalRevenue) * 100) : 0,
        appointments: p.appointments,
        averagePerAppointment: p.appointments > 0 ? Math.round(p.revenue / p.appointments) : 0
      }));

    // Growth rate (mock calculation)
    const growthRate = Math.round((Math.random() - 0.35) * 40);

    return {
      totalRevenue,
      monthlyRevenue,
      weeklyRevenue,
      dailyAverage,
      averagePerAppointment,
      averagePerClient,
      byPaymentMethod,
      byPeriod,
      byCommune,
      byProfessional,
      growthRate
    };
  }

  private getTrendMetrics(bookings: Booking[], businesses: Business[], period: TimePeriod): TrendMetrics {
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
    
    // Determine number of days based on period
    let days = 7;
    if (period === 'month') days = 30;
    if (period === 'year') days = 365;

    const dataPoints: TrendData[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      let label = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      if (period === 'year') {
        label = date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
      }

      const dayBookings = bookings.filter(b => 
        b.date.getDate() === date.getDate() && 
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear()
      );

      const dayCompleted = completedBookings.filter(b => 
        b.date.getDate() === date.getDate() && 
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear()
      );

      dataPoints.push({
        label,
        date,
        value: dayBookings.length,
        previousValue: Math.floor(dayBookings.length * (0.8 + Math.random() * 0.4)),
        growth: Math.round((Math.random() - 0.4) * 50)
      });
    }

    // Aggregate by period for display
    const aggregateData = (data: TrendData[], factor: number): TrendData[] => {
      const result: TrendData[] = [];
      for (let i = 0; i < data.length; i += factor) {
        const chunk = data.slice(i, i + factor);
        const sum = chunk.reduce((acc, d) => acc + d.value, 0);
        result.push({
          label: chunk[0]?.label || '',
          date: chunk[0]?.date || new Date(),
          value: sum
        });
      }
      return result;
    };

    let appointmentsTrend = dataPoints;
    let revenueTrend: TrendData[] = [];
    let clientsTrend: TrendData[] = [];

    if (period === 'week') {
      appointmentsTrend = dataPoints;
      revenueTrend = dataPoints.map(d => ({
        ...d,
        value: completedBookings
          .filter(b => b.date.toDateString() === d.date.toDateString())
          .reduce((sum, b) => sum + b.total, 0)
      }));
      clientsTrend = dataPoints.map(d => ({
        ...d,
        value: new Set(bookings
          .filter(b => b.date.toDateString() === d.date.toDateString())
          .map(b => b.clientId)
        ).size
      }));
    } else if (period === 'month') {
      const weekFactor = 7;
      appointmentsTrend = aggregateData(dataPoints, weekFactor);
      revenueTrend = aggregateData(dataPoints.map(d => ({
        ...d,
        value: completedBookings
          .filter(b => b.date.toDateString() === d.date.toDateString())
          .reduce((sum, b) => sum + b.total, 0)
      })), weekFactor);
      clientsTrend = aggregateData(dataPoints.map(d => ({
        ...d,
        value: new Set(bookings
          .filter(b => b.date.toDateString() === d.date.toDateString())
          .map(b => b.clientId)
        ).size
      })), weekFactor);
    } else {
      const monthFactor = 30;
      appointmentsTrend = aggregateData(dataPoints, monthFactor);
      revenueTrend = aggregateData(dataPoints.map(d => ({
        ...d,
        value: completedBookings
          .filter(b => b.date.toDateString() === d.date.toDateString())
          .reduce((sum, b) => sum + b.total, 0)
      })), monthFactor);
      clientsTrend = aggregateData(dataPoints.map(d => ({
        ...d,
        value: new Set(bookings
          .filter(b => b.date.toDateString() === d.date.toDateString())
          .map(b => b.clientId)
        ).size
      })), monthFactor);
    }

    // Professionals trend (new registrations)
    const professionalsTrend: TrendData[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      let label = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      if (period === 'year') {
        label = date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
      }

      const newPros = businesses.filter(b => 
        b.createdAt.getDate() === date.getDate() && 
        b.createdAt.getMonth() === date.getMonth() &&
        b.createdAt.getFullYear() === date.getFullYear()
      ).length;

      professionalsTrend.push({
        label,
        date,
        value: newPros
      });
    }

    // Comparison data
    const currentPeriodDays = period === 'week' ? 7 : period === 'month' ? 30 : 365;
    const previousPeriodStart = new Date(today);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - currentPeriodDays);
    const previousPeriodEnd = new Date(previousPeriodStart);
    previousPeriodEnd.setDate(previousPeriodEnd.getDate() - currentPeriodDays);

    const currentPeriodBookings = bookings.filter(b => b.date >= previousPeriodStart && b.date <= today).length;
    const previousPeriodBookings = bookings.filter(b => b.date >= previousPeriodEnd && b.date < previousPeriodStart).length;
    
    const currentPeriodRevenue = completedBookings.filter(b => b.date >= previousPeriodStart && b.date <= today).reduce((sum, b) => sum + b.total, 0);
    const previousPeriodRevenue = completedBookings.filter(b => b.date >= previousPeriodEnd && b.date < previousPeriodStart).reduce((sum, b) => sum + b.total, 0);

    const currentPeriodClients = new Set(bookings.filter(b => b.date >= previousPeriodStart && b.date <= today).map(b => b.clientId)).size;
    const previousPeriodClients = new Set(bookings.filter(b => b.date >= previousPeriodEnd && b.date < previousPeriodStart).map(b => b.clientId)).size;

    const currentPeriodProfessionals = businesses.filter(b => b.createdAt >= previousPeriodStart && b.createdAt <= today).length;
    const previousPeriodProfessionals = businesses.filter(b => b.createdAt >= previousPeriodEnd && b.createdAt < previousPeriodStart).length;

    const comparisonPeriod: ComparisonData = {
      currentPeriod: {
        appointments: currentPeriodBookings,
        revenue: currentPeriodRevenue,
        clients: currentPeriodClients,
        professionals: currentPeriodProfessionals
      },
      previousPeriod: {
        appointments: previousPeriodBookings,
        revenue: previousPeriodRevenue,
        clients: previousPeriodClients,
        professionals: previousPeriodProfessionals
      },
      growth: {
        appointments: previousPeriodBookings > 0 ? Math.round(((currentPeriodBookings - previousPeriodBookings) / previousPeriodBookings) * 100) : 0,
        revenue: previousPeriodRevenue > 0 ? Math.round(((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100) : 0,
        clients: previousPeriodClients > 0 ? Math.round(((currentPeriodClients - previousPeriodClients) / previousPeriodClients) * 100) : 0,
        professionals: previousPeriodProfessionals > 0 ? Math.round(((currentPeriodProfessionals - previousPeriodProfessionals) / previousPeriodProfessionals) * 100) : 0
      }
    };

    return {
      appointmentsTrend,
      revenueTrend,
      clientsTrend,
      professionalsTrend,
      comparisonPeriod
    };
  }

  // ============================================
  // MONETIZATION & COMMISSION METHODS (SEFAIZO)
  // ============================================

  getPlatformRevenueSummary(): PlatformRevenueSummary {
    const bookings = this.bookingsSignal();
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
    
    // Calculate revenue by type
    const marketplaceRevenue = completedBookings
      .filter(b => b.isNewClientMarketplace)
      .reduce((sum, b) => sum + (b.marketplaceCommission || 0), 0);
    
    const transactionRevenue = completedBookings
      .filter(b => b.paymentMethod === 'MOBILE_MONEY')
      .reduce((sum, b) => sum + (b.transactionFee || 0), 0);
    
    const settings = this.commissionSettingsSignal();
    const premiumRevenue = 3 * settings.premiumMonthlyPrice; // 3 abonnés premium
    const advertisingRevenue = 2 * settings.featuredListingPrice; // 2 featured listings
    
    const totalRevenue = marketplaceRevenue + transactionRevenue + premiumRevenue + advertisingRevenue;
    
    const byType: RevenueByType[] = [
      {
        type: 'MARKETPLACE',
        amount: marketplaceRevenue,
        percentage: totalRevenue > 0 ? Math.round((marketplaceRevenue / totalRevenue) * 100) : 0,
        count: completedBookings.filter(b => b.isNewClientMarketplace).length,
        label: 'Commission Marketplace (15%)'
      },
      {
        type: 'TRANSACTION',
        amount: transactionRevenue,
        percentage: totalRevenue > 0 ? Math.round((transactionRevenue / totalRevenue) * 100) : 0,
        count: completedBookings.filter(b => b.paymentMethod === 'MOBILE_MONEY').length,
        label: 'Frais Transaction (2.5%)'
      },
      {
        type: 'PREMIUM',
        amount: premiumRevenue,
        percentage: totalRevenue > 0 ? Math.round((premiumRevenue / totalRevenue) * 100) : 0,
        count: 3,
        label: 'Abonnements Premium'
      },
      {
        type: 'ADVERTISING',
        amount: advertisingRevenue,
        percentage: totalRevenue > 0 ? Math.round((advertisingRevenue / totalRevenue) * 100) : 0,
        count: 2,
        label: 'Publicité & Mise en avant'
      }
    ];
    
    // By period (last 7 days)
    const byPeriod: RevenueByPeriod[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      
      const dayBookings = completedBookings.filter(b => 
        b.date.getDate() === date.getDate() && 
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear()
      );
      
      const dayRevenue = dayBookings.reduce((sum, b) =>
        sum + (b.platformRevenue || 0), 0);

      byPeriod.push({
        period: label,
        date,
        revenue: dayRevenue,
        appointments: dayBookings.length,
        growth: Math.round((Math.random() - 0.4) * 40)
      });
    }
    
    // By professional
    const businesses = this.businessesSignal();
    const byProfessional = businesses
      .map(b => {
        const proBookings = completedBookings.filter(booking => booking.businessId === b.id);
        const proRevenue = proBookings.reduce((sum, booking) => sum + (booking.platformRevenue || 0), 0);
        return {
          professionalId: b.professionalId,
          businessName: b.name,
          revenue: proRevenue,
          percentage: totalRevenue > 0 ? Math.round((proRevenue / totalRevenue) * 100) : 0,
          bookings: proBookings.length,
          avgCommissionPerBooking: proBookings.length > 0 ? Math.round(proRevenue / proBookings.length) : 0
        };
      })
      .filter(p => p.revenue > 0)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
    
    // Projected monthly (based on current month * remaining days)
    const currentMonthRevenue = byPeriod.reduce((sum, p) => sum + p.revenue, 0);
    const projectedMonthly = Math.round(currentMonthRevenue * 4);
    
    // Growth rate
    const growthRate = Math.round((Math.random() - 0.35) * 50);
    
    return {
      totalRevenue,
      byType,
      byPeriod,
      byProfessional,
      projectedMonthly,
      growthRate
    };
  }
  
  getMonetizationMetrics(): MonetizationMetrics {
    const bookings = this.bookingsSignal();
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
    
    // GMV (Gross Merchandise Value)
    const gmv = completedBookings.reduce((sum, b) => sum + b.total, 0);
    
    // Total platform revenue
    const totalPlatformRevenue = completedBookings.reduce((sum, b) => sum + (b.platformRevenue || 0), 0);
    
    // Commission revenue
    const commissionRevenue = completedBookings
      .filter(b => b.isNewClientMarketplace)
      .reduce((sum, b) => sum + (b.marketplaceCommission || 0), 0);
    
    // Transaction fee revenue
    const transactionFeeRevenue = completedBookings
      .filter(b => b.paymentMethod === 'MOBILE_MONEY')
      .reduce((sum, b) => sum + (b.transactionFee || 0), 0);
    
    // Premium MRR (Monthly Recurring Revenue)
    const settings = this.commissionSettingsSignal();
    const monthlyRecurringRevenue = 3 * settings.premiumMonthlyPrice;
    
    // Advertising revenue
    const advertisingRevenue = 2 * settings.featuredListingPrice;
    
    // Average revenue per professional
    const businesses = this.businessesSignal();
    const activeProfessionals = businesses.filter(b => b.status === 'ACTIVE').length;
    const averageRevenuePerProfessional = activeProfessionals > 0 
      ? Math.round(totalPlatformRevenue / activeProfessionals) 
      : 0;
    
    // Take rate (% du GMV capté)
    const takeRate = gmv > 0 
      ? Math.round((totalPlatformRevenue / gmv) * 1000) / 10 // 1 decimal
      : 0;
    
    return {
      totalPlatformRevenue,
      monthlyRecurringRevenue,
      commissionRevenue,
      transactionFeeRevenue,
      advertisingRevenue,
      averageRevenuePerProfessional,
      takeRate,
      gmv
    };
  }
  
  getPlatformWallet(): PlatformWallet {
    return this.platformWalletSignal();
  }
  
  getCommissionSettings(): CommissionSettings {
    return this.commissionSettingsSignal();
  }
  
  getPremiumPlans(): PremiumPlan[] {
    return this.premiumPlansSignal();
  }
  
  getAdvertisingOptions(): AdvertisingOption[] {
    return this.advertisingOptionsSignal();
  }
  
  calculateBookingCommission(booking: Booking): BookingCommission {
    const settings = this.commissionSettingsSignal();
    
    const serviceAmount = booking.total;
    const isNewClient = booking.isNewClientMarketplace || Math.random() > 0.6;
    
    // Marketplace commission (only for new marketplace clients)
    const marketplaceCommission = isNewClient 
      ? Math.round(serviceAmount * settings.marketplaceCommissionRate / 100)
      : 0;
    
    // Transaction fee (only for Mobile Money)
    const transactionFee = booking.paymentMethod === 'MOBILE_MONEY'
      ? Math.round(serviceAmount * settings.transactionFeeRate / 100)
      : 0;
    
    // Platform revenue
    const platformRevenue = marketplaceCommission + transactionFee;
    
    // Professional earnings
    const professionalEarnings = serviceAmount - platformRevenue;
    
    return {
      bookingId: booking.id,
      serviceAmount,
      marketplaceCommission,
      transactionFee,
      platformRevenue,
      professionalEarnings,
      isNewClient,
      paymentMethod: booking.paymentMethod
    };
  }
  
  private generatePlatformWallet(): PlatformWallet {
    return {
      id: 'platform-wallet-1',
      balance: 1250000, // 1.25M FCFA disponibles
      pendingBalance: 350000, // 350K en attente
      totalCollected: 5800000, // 5.8M collectés depuis le début
      totalWithdrawn: 4200000, // 4.2M déjà retirés
      currency: 'XOF',
      lastWithdrawal: new Date(Date.now() - 86400000 * 7) // Il y a 7 jours
    };
  }
  
  private generatePremiumPlans(): PremiumPlan[] {
    return [
      {
        id: 'premium-1',
        name: 'SEFAIZO Premium',
        price: 15000,
        features: [
          'Analytics avancés',
          'Marketing SMS/WhatsApp',
          'Priorité marketplace',
          'Site web personnalisé',
          'Badge "Vérifié"'
        ],
        isActive: true,
        subscribedProfessionals: 3
      },
      {
        id: 'premium-2',
        name: 'SEFAIZO Basic',
        price: 0,
        features: [
          'Booking illimité',
          'Gestion clients',
          'Analytics de base'
        ],
        isActive: true,
        subscribedProfessionals: 45
      }
    ];
  }
  
  private generateAdvertisingOptions(): AdvertisingOption[] {
    return [
      {
        id: 'ad-1',
        type: 'FEATURED_LISTING',
        name: 'Mise en avant Recherche',
        price: 25000,
        description: 'Apparaître dans le top 3 des résultats de recherche',
        isActive: true,
        subscribedCount: 2
      },
      {
        id: 'ad-2',
        type: 'BANNER_HOMEPAGE',
        name: 'Bannière Page d\'Accueil',
        price: 50000,
        description: 'Bannière publicitaire sur la page d\'accueil',
        isActive: true,
        subscribedCount: 1
      },
      {
        id: 'ad-3',
        type: 'CATEGORY_SPONSOR',
        name: 'Sponsor de Catégorie',
        price: 35000,
        description: 'Être le professionnel recommandé dans une catégorie',
        isActive: true,
        subscribedCount: 0
      }
    ];
  }
}
