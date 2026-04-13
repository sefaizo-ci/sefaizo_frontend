import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-client-register',
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
            Réservez vos soins<br />beauté en un clic
          </h1>
          <p class="text-xl text-white/90 mb-12 leading-relaxed">
            Découvrez les meilleurs professionnels de la beauté à Abidjan et réservez en quelques secondes.
          </p>

          <!-- Benefits -->
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-lg">Réservation instantanée</div>
                <div class="text-white/80 text-sm">Trouvez et réservez en 30 secondes</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-lg">100% gratuit</div>
                <div class="text-white/80 text-sm">Aucun frais pour les clients</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-lg">Professionnels vérifiés</div>
                <div class="text-white/80 text-sm">Qualité garantie par nos soins</div>
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
            <h2 class="text-3xl font-bold text-secondary mb-2">Créer votre compte</h2>
            <p class="text-secondary-gray">
              Rejoignez des milliers de clients satisfaits
            </p>
          </div>

          <!-- Social Login -->
          <div class="mb-6">
            <div class="relative mb-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-secondary-gray">Ou inscrivez-vous avec</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <!-- Google -->
              <button
                type="button"
                (click)="signupWithGoogle()"
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
                (click)="signupWithFacebook()"
                class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="text-sm font-medium text-secondary hidden sm:inline">Facebook</span>
              </button>

              <!-- WhatsApp -->
              <button
                type="button"
                (click)="signupWithWhatsApp()"
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
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.firstName"
                  name="firstName"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Votre prénom">
              </div>

              <div>
                <label class="block text-sm font-medium text-secondary mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.lastName"
                  name="lastName"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Votre nom">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-secondary mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                [(ngModel)]="formData.email"
                name="email"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="votre@email.com">
            </div>

            <div>
              <label class="block text-sm font-medium text-secondary mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                [(ngModel)]="formData.phone"
                name="phone"
                placeholder="+225 XX XX XX XX XX"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-medium text-secondary mb-2">
                Mot de passe
              </label>
              <div class="relative">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="formData.password"
                  name="password"
                  required
                  minlength="6"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Minimum 6 caractères">
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

            <div>
              <label class="block text-sm font-medium text-secondary mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                [(ngModel)]="formData.confirmPassword"
                name="confirmPassword"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Retapez votre mot de passe">
            </div>

            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                [(ngModel)]="formData.acceptTerms"
                name="acceptTerms"
                required
                class="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer">
              <label for="terms" class="text-sm text-secondary-gray cursor-pointer">
                En créant un compte, vous acceptez nos
                <a href="#" class="text-primary hover:underline">conditions d'utilisation</a>
                et notre
                <a href="#" class="text-primary hover:underline">politique de confidentialité</a>
              </label>
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
                  <span>Création en cours...</span>
                </div>
              } @else {
                Créer mon compte
              }
            </button>
          </form>

          <!-- Login Link -->
          <p class="text-center mt-8 text-secondary-gray">
            Vous avez déjà un compte ?
            <a routerLink="/auth/login" class="text-primary font-semibold hover:underline">
              Se connecter
            </a>
          </p>

          <!-- Back to role selection -->
          <p class="text-center mt-4">
            <a routerLink="/auth/register" class="text-sm text-secondary-gray hover:text-secondary inline-flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Choisir un autre type de compte
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientRegisterComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };
  loading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.phone || !this.formData.password) {
      this.toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (this.formData.password.length < 6) {
      this.toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!this.formData.acceptTerms) {
      this.toast.error('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    this.loading = true;

    this.authService.register({
      email: this.formData.email,
      password: this.formData.password,
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      phone: this.formData.phone,
      role: 'CLIENT'
    })
    .then(() => {
      this.toast.success('Compte créé avec succès !');
      this.router.navigate(['/espace-client']);
    })
    .catch((error) => {
      this.toast.error(error.message);
      this.loading = false;
    });
  }

  signupWithGoogle(): void {
    this.toast.info('Inscription avec Google en cours de développement...');
    // TODO: Implement Google OAuth
  }

  signupWithFacebook(): void {
    this.toast.info('Inscription avec Facebook en cours de développement...');
    // TODO: Implement Facebook OAuth
  }

  signupWithWhatsApp(): void {
    this.toast.info('Inscription avec WhatsApp en cours de développement...');
    // TODO: Implement WhatsApp authentication
  }
}
