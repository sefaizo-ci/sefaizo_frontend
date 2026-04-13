import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole, AuthResponse, LoginRequest, RegisterRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);
  
  public isAuthenticated = computed(() => !!this.tokenSignal());
  public user = computed(() => this.currentUserSignal());
  public userRole = computed(() => this.currentUserSignal()?.role);
  
  public isClient = computed(() => this.userRole() === 'CLIENT');
  public isPro = computed(() => this.userRole() === 'PRO');
  public isAdmin = computed(() => this.userRole() === 'ADMIN');

  constructor(private router: Router) {
    this.loadTokenFromStorage();
  }

  private loadTokenFromStorage(): void {
    const token = localStorage.getItem('sefaizo_token');
    const userStr = localStorage.getItem('sefaizo_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        this.tokenSignal.set(token);
        this.currentUserSignal.set(user);
      } catch {
        this.clearAuth();
      }
    }
  }

  login(identifier: string, password: string): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Normalize identifier (phone or email)
        const normalizedId = identifier.toLowerCase().trim();

        // Mock authentication - search by email OR phone
        const mockUsers: Record<string, { user: User; token: string }> = {
          'client@sefaizo.ci': {
            user: {
              id: 'client-1',
              email: 'client@sefaizo.ci',
              firstName: 'Aminata',
              lastName: 'Kouassi',
              phone: '+225 07 07 07 07 07',
              avatar: 'https://i.pravatar.cc/150?img=5',
              role: 'CLIENT',
              status: 'ACTIVE',
              createdAt: new Date('2025-01-15'),
              updatedAt: new Date()
            } as User,
            token: 'mock-jwt-token-client'
          },
          'pro@sefaizo.ci': {
            user: {
              id: 'pro-1',
              email: 'pro@sefaizo.ci',
              firstName: 'Jean',
              lastName: 'Koffi',
              phone: '+225 05 05 05 05 05',
              avatar: 'https://i.pravatar.cc/150?img=11',
              role: 'PRO',
              status: 'ACTIVE',
              createdAt: new Date('2024-06-20'),
              updatedAt: new Date()
            } as User,
            token: 'mock-jwt-token-pro'
          },
          'admin@sefaizo.ci': {
            user: {
              id: 'admin-1',
              email: 'admin@sefaizo.ci',
              firstName: 'Admin',
              lastName: 'SEFAIZO',
              phone: '+225 01 01 01 01 01',
              avatar: 'https://i.pravatar.cc/150?img=8',
              role: 'ADMIN',
              status: 'ACTIVE',
              createdAt: new Date('2024-01-01'),
              updatedAt: new Date()
            } as User,
            token: 'mock-jwt-token-admin'
          }
        };

        // Also create a phone-based lookup
        const phoneLookup: Record<string, { user: User; token: string }> = {
          '+225 07 07 07 07 07': mockUsers['client@sefaizo.ci'],
          '+225 05 05 05 05 05': mockUsers['pro@sefaizo.ci'],
          '+225 01 01 01 01 01': mockUsers['admin@sefaizo.ci']
        };

        const authData = mockUsers[normalizedId] || phoneLookup[normalizedId];

        if (authData && password === 'password123') {
          this.setAuth(authData.token, authData.user);
          resolve({ token: authData.token, user: authData.user });
        } else {
          reject(new Error('Email/Téléphone ou mot de passe incorrect'));
        }
      }, 500);
    });
  }

  register(data: RegisterRequest): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: data.role,
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const token = `mock-jwt-token-${Date.now()}`;
        this.setAuth(token, newUser);
        resolve({ token, user: newUser });
      }, 500);
    });
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/']);
  }

  private setAuth(token: string, user: User): void {
    this.tokenSignal.set(token);
    this.currentUserSignal.set(user);
    localStorage.setItem('sefaizo_token', token);
    localStorage.setItem('sefaizo_user', JSON.stringify(user));
  }

  private clearAuth(): void {
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
    localStorage.removeItem('sefaizo_token');
    localStorage.removeItem('sefaizo_user');
  }

  // Helper method to check if user has required role
  hasRole(roles: UserRole[]): boolean {
    const currentRole = this.userRole();
    return currentRole ? roles.includes(currentRole) : false;
  }
}
