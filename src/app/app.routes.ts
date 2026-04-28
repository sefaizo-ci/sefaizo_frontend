import { Routes } from '@angular/router';
import { AuthGuard, ClientGuard, ProGuard, AdminGuard, GuestGuard } from './core/guards';
import { ClientLayoutComponent } from './features/client/layout/client-layout.component';
import { ProLayoutComponent } from './features/pro/layout/pro-layout.component';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'recherche',
    loadComponent: () => import('./features/public/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'pro/:slug',
    loadComponent: () => import('./features/public/business-detail/business-detail.component').then(m => m.BusinessDetailComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/public/booking/booking.component').then(m => m.BookingComponent)
  },

  // Content Pages (Footer Links)
  {
    path: 'comment-ca-marche',
    loadComponent: () => import('./features/public/comment-ca-marche/comment-ca-marche.component').then(m => m.CommentCaMarcheComponent)
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'about' }
  },
  {
    path: 'carrieres',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'careers' }
  },
  {
    path: 'presse',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'press' }
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'blog' }
  },
  {
    path: 'devenir-partenaire',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'become-partner' }
  },
  {
    path: 'ressources',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'resources' }
  },
  {
    path: 'tarifs',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'pricing' }
  },
  {
    path: 'success-stories',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'success-stories' }
  },
  {
    path: 'centre-aide',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'help-center' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'contact' }
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'faq' }
  },
  {
    path: 'accessibilite',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'accessibility' }
  },
  {
    path: 'confidentialite',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'privacy' }
  },
  {
    path: 'conditions',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'terms' }
  },
  {
    path: 'cookies',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'cookies' }
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./features/public/content/content-page.component').then(m => m.ContentPageComponent),
    data: { slug: 'legal' }
  },

  // Auth Routes
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/role-selection/role-selection.component').then(m => m.RoleSelectionComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/register/client',
    loadComponent: () => import('./features/auth/client-register/client-register.component').then(m => m.ClientRegisterComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/register/pro',
    loadComponent: () => import('./features/auth/pro-register/pro-register.component').then(m => m.ProRegisterComponent),
    canActivate: [GuestGuard]
  },

  // Client Space (with layout)
  {
    path: 'espace-client',
    canActivate: [ClientGuard],
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/client/dashboard/client-dashboard.component').then(m => m.ClientDashboardComponent)
      },
      {
        path: 'reservations',
        loadComponent: () => import('./features/client/reservations/reservations.component').then(m => m.ClientReservationsComponent)
      },
      {
        path: 'profil',
        loadComponent: () => import('./features/client/profile/profile.component').then(m => m.ClientProfileComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/client/favorites/favorites.component').then(m => m.ClientFavoritesComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/client/notifications/notifications.component').then(m => m.ClientNotificationsComponent)
      }
    ]
  },

  // Pro Space (with layout)
  {
    path: 'espace-pro',
    canActivate: [ProGuard],
    component: ProLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/pro/dashboard/pro-dashboard.component').then(m => m.ProDashboardComponent)
      },
      {
        path: 'boutique',
        loadComponent: () => import('./features/pro/boutique/pro-boutique.component').then(m => m.ProBoutiqueComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./features/pro/services/pro-services.component').then(m => m.ProServicesComponent)
      },
      {
        path: 'agenda',
        loadComponent: () => import('./features/pro/agenda/pro-agenda.component').then(m => m.ProAgendaComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/pro/clients/pro-clients.component').then(m => m.ProClientsComponent)
      },
      {
        path: 'statistiques',
        loadComponent: () => import('./features/pro/statistiques/pro-statistiques.component').then(m => m.ProStatistiquesComponent)
      },
      {
        path: 'wallet',
        loadComponent: () => import('./features/pro/wallet/pro-wallet.component').then(m => m.ProWalletComponent)
      },
      {
        path: 'parametres',
        loadComponent: () => import('./features/pro/parametres/pro-parametres.component').then(m => m.ProParametresComponent)
      }
    ]
  },

  // Admin Dashboard
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () => import('./features/admin/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'professionals',
        loadComponent: () => import('./features/admin/professionals/professionals.component').then(m => m.AdminProfessionalsComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/admin/clients/clients.component').then(m => m.AdminClientsComponent)
      },
      {
        path: 'bookings',
        loadComponent: () => import('./features/admin/bookings/bookings.component').then(m => m.AdminBookingsComponent)
      },
      {
        path: 'commissions',
        loadComponent: () => import('./features/admin/commissions/commissions.component').then(m => m.AdminCommissionsComponent)
      },
      {
        path: 'kyc',
        loadComponent: () => import('./features/admin/kyc/kyc.component').then(m => m.AdminKycComponent)
      },
      {
        path: 'statistics',
        canActivate: [AdminGuard],
        loadComponent: () => import('./features/admin/statistics/admin-statistics.component').then(m => m.AdminStatisticsComponent)
      },
      {
        path: 'monetization',
        canActivate: [AdminGuard],
        loadComponent: () => import('./features/admin/monetization/monetization-dashboard.component').then(m => m.MonetizationDashboardComponent)
      },
      {
        path: 'cms',
        canActivate: [AdminGuard],
        loadComponent: () => import('./features/admin/cms/admin-cms.component').then(m => m.AdminCmsComponent)
      }
    ]
  },

  // 404
  {
    path: '**',
    redirectTo: ''
  }
];
