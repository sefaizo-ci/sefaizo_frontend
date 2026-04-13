import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 flex">
      <!-- Left Side - Hero -->
      <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div class="relative z-10 flex flex-col justify-center px-16 text-white">
          <a href="/" class="inline-block mb-12">
            <img src="/Logoheder.png" alt="SEFAIZO Logo" class="h-20 w-auto brightness-0 invert">
          </a>
          
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Bienvenue sur<br />SEFAIZO
          </h1>
          <p class="text-xl text-white/90 mb-12 leading-relaxed">
            Votre plateforme de réservation beauté à Abidjan.
            Réservez vos soins préférés en quelques clics.
          </p>

          <!-- Testimonial -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div class="flex items-center gap-1 mb-3">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-white/90 text-lg italic mb-4 leading-relaxed">
              "J'ai découvert SEFAIZO il y a 3 mois et je suis fan ! La réservation est ultra rapide et les professionnels sont de qualité."
            </p>
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=5" alt="Aminata K." class="w-10 h-10 rounded-full">
              <div>
                <div class="font-semibold">Aminata K.</div>
                <div class="text-sm text-white/70">Cocody, Abidjan</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Form -->
      <div class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="max-w-md w-full">
          <!-- Mobile Logo -->
          <div class="lg:hidden mb-8 text-center">
            <a href="/" class="inline-block">
              <img src="/Logoheder.png" alt="SEFAIZO Logo" class="h-14 w-auto mx-auto">
            </a>
          </div>

          <!-- Header -->
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-secondary mb-2">Bon retour !</h2>
            <p class="text-secondary-gray">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          <!-- Social Login -->
          <div class="mb-6">
            <div class="relative mb-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-secondary-gray">Ou connectez-vous avec</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <!-- Google -->
              <button
                type="button"
                (click)="loginWithGoogle()"
                class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-sm font-medium text-secondary hidden sm:inline">Google</span>
              </button>

              <!-- Facebook -->
              <button
                type="button"
                (click)="loginWithFacebook()"
                class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="text-sm font-medium text-secondary hidden sm:inline">Facebook</span>
              </button>

              <!-- WhatsApp -->
              <button
                type="button"
                (click)="loginWithWhatsApp()"
                class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg class="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span class="text-sm font-medium text-secondary hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="space-y-5">
            <!-- Login Method Toggle -->
            <div class="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                (click)="loginMethod = 'phone'"
                [class]="loginMethod === 'phone' ? 'bg-white shadow text-primary font-semibold' : 'text-secondary-gray hover:text-secondary'"
                class="flex-1 py-2.5 rounded-md text-sm font-medium transition-all">
                <svg class="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                Téléphone
              </button>
              <button
                type="button"
                (click)="loginMethod = 'email'"
                [class]="loginMethod === 'email' ? 'bg-white shadow text-primary font-semibold' : 'text-secondary-gray hover:text-secondary'"
                class="flex-1 py-2.5 rounded-md text-sm font-medium transition-all">
                <svg class="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email
              </button>
            </div>

            <!-- Phone Input -->
            @if (loginMethod === 'phone') {
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  [(ngModel)]="phone"
                  name="phone"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="+225 XX XX XX XX XX">
              </div>
            }

            <!-- Email Input -->
            @if (loginMethod === 'email') {
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="votre@email.com">
              </div>
            }

            <!-- Password Input -->
            <div>
              <label class="block text-sm font-medium text-secondary mb-2">
                Mot de passe
              </label>
              <div class="relative">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="password"
                  name="password"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="••••••••">
                <button
                  type="button"
                  (click)="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-gray hover:text-secondary transition-colors">
                  @if (showPassword) {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  }
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary">
                <span class="text-sm text-secondary-gray">Se souvenir de moi</span>
              </label>
              <a href="#" class="text-sm text-primary font-medium hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              [disabled]="loading"
              class="w-full bg-black text-white py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg">
              @if (loading) {
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Connexion en cours...</span>
                </div>
              } @else {
                Se connecter
              }
            </button>
          </form>

          <!-- Demo Accounts -->
          <div class="mt-8 bg-gray-50 rounded-lg p-5">
            <p class="text-sm font-medium text-secondary mb-3">Comptes de démonstration</p>
            <div class="space-y-2">
              <button
                (click)="fillDemo('client')"
                class="w-full text-left px-4 py-2.5 bg-white rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200">
                <span class="font-medium text-secondary">Client:</span>
                <span class="text-secondary-gray ml-1">client&#64;sefaizo.ci / password123</span>
              </button>
              <button
                (click)="fillDemo('pro')"
                class="w-full text-left px-4 py-2.5 bg-white rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200">
                <span class="font-medium text-secondary">Pro:</span>
                <span class="text-secondary-gray ml-1">pro&#64;sefaizo.ci / password123</span>
              </button>
              <button
                (click)="fillDemo('admin')"
                class="w-full text-left px-4 py-2.5 bg-white rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200">
                <span class="font-medium text-secondary">Admin:</span>
                <span class="text-secondary-gray ml-1">admin&#64;sefaizo.ci / password123</span>
              </button>
            </div>
            <p class="text-xs text-secondary-gray mt-3">
              💡 Vous pouvez aussi vous connecter avec votre numéro de téléphone
            </p>
          </div>

          <!-- Register Link -->
          <p class="text-center mt-8 text-secondary-gray">
            Pas encore de compte ?
            <a routerLink="/auth/register" class="text-primary font-semibold hover:underline">
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginMethod: 'phone' | 'email' = 'phone';
  phone = '';
  email = '';
  password = '';
  loading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginMethod === 'phone' && !this.phone) {
      this.toast.error('Veuillez entrer votre numéro de téléphone');
      return;
    }
    if (this.loginMethod === 'email' && !this.email) {
      this.toast.error('Veuillez entrer votre adresse email');
      return;
    }
    if (!this.password) {
      this.toast.error('Veuillez entrer votre mot de passe');
      return;
    }

    this.loading = true;

    const identifier = this.loginMethod === 'phone' ? this.phone : this.email;

    this.authService.login(identifier, this.password)
      .then(() => {
        this.toast.success('Connexion réussie');
        this.redirectUser();
      })
      .catch((error) => {
        this.toast.error(error.message);
        this.loading = false;
      });
  }

  fillDemo(type: 'client' | 'pro' | 'admin'): void {
    const credentials = {
      client: { email: 'client@sefaizo.ci', password: 'password123' },
      pro: { email: 'pro@sefaizo.ci', password: 'password123' },
      admin: { email: 'admin@sefaizo.ci', password: 'password123' }
    };

    this.loginMethod = 'email';
    this.email = credentials[type].email;
    this.password = credentials[type].password;
  }

  redirectUser(): void {
    const role = this.authService.userRole();

    switch (role) {
      case 'CLIENT':
        this.router.navigate(['/espace-client']);
        break;
      case 'PRO':
        this.router.navigate(['/espace-pro']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  loginWithGoogle(): void {
    this.toast.info('Connexion avec Google en cours de développement...');
    // TODO: Implement Google OAuth
  }

  loginWithFacebook(): void {
    this.toast.info('Connexion avec Facebook en cours de développement...');
    // TODO: Implement Facebook OAuth
  }

  loginWithWhatsApp(): void {
    this.toast.info('Connexion avec WhatsApp en cours de développement...');
    // TODO: Implement WhatsApp authentication
  }
}
