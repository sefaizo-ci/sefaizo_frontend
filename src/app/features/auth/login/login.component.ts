import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
            <img src="/Splash.png" alt="SEFAIZO Logo" class="h-20 w-auto brightness-0 invert">
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
              @for (star of [1,2,3,4,5]; track star) {
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              }
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
              <img src="/Splash.png" alt="SEFAIZO Logo" class="h-14 w-auto mx-auto">
            </a>
          </div>

          <!-- Step Indicator -->
          <div class="mb-8">
            <div class="flex items-center justify-center gap-3 mb-4">
              @for (step of ['phone', 'pin', 'otp']; track step; let i = $index) {
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                    [class]="getStepNumber(i) <= currentStepIndex ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
                    @if (getStepNumber(i) < currentStepIndex) {
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    } @else {
                      {{ getStepNumber(i) + 1 }}
                    }
                  </div>
                  @if (i < 2) {
                    <div class="w-12 h-1 mx-2 rounded transition-all"
                      [class]="getStepNumber(i) < currentStepIndex ? 'bg-primary' : 'bg-gray-200'"></div>
                  }
                </div>
              }
            </div>
            <div class="flex justify-between text-xs text-secondary-gray">
              <span [class.text-primary]="currentStepIndex >= 0" [class.font-semibold]="currentStepIndex >= 0">Téléphone</span>
              <span [class.text-primary]="currentStepIndex >= 1" [class.font-semibold]="currentStepIndex >= 1">Code PIN</span>
              <span [class.text-primary]="currentStepIndex >= 2" [class.font-semibold]="currentStepIndex >= 2">OTP</span>
            </div>
          </div>

          <!-- Header -->
          <div class="mb-8 text-center">
            @if (currentStep === 'phone') {
              <h2 class="text-3xl font-bold text-secondary mb-2">Connexion</h2>
              <p class="text-secondary-gray">Entrez votre numéro de téléphone pour vous connecter</p>
            } @else if (currentStep === 'pin') {
              <h2 class="text-3xl font-bold text-secondary mb-2">Code PIN</h2>
              <p class="text-secondary-gray">Entrez votre code PIN à 4 chiffres</p>
            } @else {
              <h2 class="text-3xl font-bold text-secondary mb-2">Vérification OTP</h2>
              <p class="text-secondary-gray">Entrez le code à 6 chiffres envoyé par SMS</p>
            }
          </div>

          <!-- Step 1: Phone Number -->
          @if (currentStep === 'phone') {
            <form (ngSubmit)="submitPhone()" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">
                  Numéro de téléphone
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-gray font-medium">🇨🇮 +225</span>
                  <input
                    type="tel"
                    [(ngModel)]="phone"
                    name="phone"
                    required
                    maxlength="10"
                    class="w-full border border-gray-300 rounded-lg pl-24 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="XX XX XX XX XX">
                </div>
              </div>

              <button
                type="submit"
                [disabled]="loading || phone.length < 10"
                class="w-full bg-black text-white py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (loading) {
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Vérification...</span>
                  </div>
                } @else {
                  Continuer
                }
              </button>
            </form>

            <!-- Demo Phones -->
            <div class="mt-8 bg-gray-50 rounded-lg p-5">
              <p class="text-sm font-medium text-secondary mb-3">Numéros de démonstration</p>
              <div class="space-y-2">
                @for (demo of demoPhones; track demo.phone) {
                  <button
                    (click)="fillDemo(demo.phone)"
                    class="w-full text-left px-4 py-2.5 bg-white rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200">
                    <span class="font-medium text-secondary">{{ demo.role }}:</span>
                    <span class="text-secondary-gray ml-1">+225 {{ demo.phone }} (PIN: {{ demo.pin }})</span>
                  </button>
                }
              </div>
            </div>
          }

          <!-- Step 2: PIN Code -->
          @if (currentStep === 'pin') {
            <form (ngSubmit)="submitPin()" class="space-y-6">
              <div class="flex justify-center gap-3 mb-2">
                @for (digit of ['0','1','2','3']; track digit) {
                  <input
                    type="text"
                    maxlength="1"
                    inputmode="numeric"
                    [value]="pinInputs[+digit]"
                    (input)="onPinInput($event, +digit)"
                    (keydown.backspace)="onPinBackspace($event, +digit)"
                    class="w-16 h-20 text-center text-3xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    [class.border-primary]="pinInputs[+digit]"
                    [class.border-gray-300]="!pinInputs[+digit]">
                }
              </div>
              <p class="text-center text-sm text-secondary-gray">
                Code PIN à 4 chiffres envoyé à votre numéro
              </p>

              <button
                type="submit"
                [disabled]="loading || pin.length < 4"
                class="w-full bg-black text-white py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (loading) {
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Vérification...</span>
                  </div>
                } @else {
                  Vérifier le code PIN
                }
              </button>

              <button
                type="button"
                (click)="goBack()"
                class="w-full text-secondary-gray hover:text-secondary font-medium py-3 transition-colors">
                ← Retour au numéro de téléphone
              </button>
            </form>
          }

          <!-- Step 3: OTP -->
          @if (currentStep === 'otp') {
            <form (ngSubmit)="submitOtp()" class="space-y-6">
              <div class="flex justify-center gap-3 mb-2">
                @for (digit of ['0','1','2','3','4','5']; track digit) {
                  <input
                    type="text"
                    maxlength="1"
                    inputmode="numeric"
                    [value]="otpInputs[+digit]"
                    (input)="onOtpInput($event, +digit)"
                    (keydown.backspace)="onOtpBackspace($event, +digit)"
                    class="w-14 h-16 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    [class.border-primary]="otpInputs[+digit]"
                    [class.border-gray-300]="!otpInputs[+digit]">
                }
              </div>
              <p class="text-center text-sm text-secondary-gray">
                Un code OTP a été envoyé au <strong>+225 {{ phone }}</strong>
              </p>

              <button
                type="submit"
                [disabled]="loading || otp.length < 6"
                class="w-full bg-black text-white py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (loading) {
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Connexion...</span>
                  </div>
                } @else {
                  Se connecter
                }
              </button>

              <div class="flex justify-between">
                <button
                  type="button"
                  (click)="goBack()"
                  class="text-secondary-gray hover:text-secondary font-medium py-3 transition-colors">
                  ← Retour
                </button>
                <button
                  type="button"
                  (click)="resendOtp()"
                  [disabled]="otpCooldown > 0"
                  class="text-primary font-medium hover:underline disabled:opacity-50">
                  @if (otpCooldown > 0) {
                    Renvoyer dans {{ otpCooldown }}s
                  } @else {
                    Renvoyer le code
                  }
                </button>
              </div>

              <!-- OTP Hint -->
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p class="text-sm text-yellow-800">
                  💡 Code OTP pour la démo : <strong>{{ mockOtp }}</strong>
                </p>
              </div>
            </form>
          }

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
  currentStep: 'phone' | 'pin' | 'otp' = 'phone';
  currentStepIndex = 0;

  phone = '';
  pin = '';
  pinInputs = ['', '', '', ''];
  otp = '';
  otpInputs = ['', '', '', '', '', ''];
  mockOtp = '';
  otpCooldown = 0;

  loading = false;

  demoPhones = [
    { phone: '07 07 07 07 07', pin: '1234', role: 'Client', otp: '567890' },
    { phone: '05 05 05 05 05', pin: '5678', role: 'Pro', otp: '123456' },
    { phone: '01 01 01 01 01', pin: '0000', role: 'Admin', otp: '654321' }
  ];

  // Mock user database
  mockUsers: Record<string, { name: string; role: 'CLIENT' | 'PRO' | 'ADMIN'; pin: string; otp: string }> = {
    '0707070707': { name: 'Aminata Kouassi', role: 'CLIENT', pin: '1234', otp: '567890' },
    '0505050505': { name: 'Jean Koffi', role: 'PRO', pin: '5678', otp: '123456' },
    '0101010101': { name: 'Admin SEFAIZO', role: 'ADMIN', pin: '0000', otp: '654321' }
  };

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  getStepNumber(index: number): number {
    return index;
  }

  // Step 1: Phone
  submitPhone(): void {
    const cleanPhone = this.phone.replace(/\s/g, '');
    if (cleanPhone.length < 10) {
      this.toast.error('Veuillez entrer un numéro valide à 10 chiffres');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      const user = this.mockUsers[cleanPhone];
      if (!user) {
        this.toast.error('Ce numéro n\'est pas enregistré. Créez un compte.');
        this.loading = false;
        return;
      }

      // PIN is "sent" - in mock we show it in a toast
      this.toast.success(`Code PIN envoyé à +225 ${this.phone} (Démo: ${user.pin})`);
      this.currentStep = 'pin';
      this.currentStepIndex = 1;
      this.loading = false;

      // Auto-focus first PIN input
      setTimeout(() => {
        const firstInput = document.querySelector('input[maxlength="1"]') as HTMLInputElement;
        firstInput?.focus();
      }, 100);
    }, 800);
  }

  onPinInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.pinInputs[index] = value;
    this.pin = this.pinInputs.join('');

    if (value && index < 3) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onPinBackspace(event: Event, index: number): void {
    if (!this.pinInputs[index] && index > 0) {
      const prevInput = (event.target as HTMLInputElement).previousElementSibling as HTMLInputElement;
      prevInput?.focus();
    }
  }

  submitPin(): void {
    const cleanPhone = this.phone.replace(/\s/g, '');
    const user = this.mockUsers[cleanPhone];

    if (this.pin !== user?.pin) {
      this.toast.error('Code PIN incorrect. Veuillez réessayer.');
      this.pinInputs = ['', '', '', ''];
      this.pin = '';
      return;
    }

    this.loading = true;

    setTimeout(() => {
      // Generate mock OTP
      this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.toast.success(`Code OTP envoyé par SMS au +225 ${this.phone} (Démo: ${this.mockOtp})`);
      this.currentStep = 'otp';
      this.currentStepIndex = 2;
      this.loading = false;
      this.startOtpCooldown();

      setTimeout(() => {
        const firstOtpInput = document.querySelectorAll('input[maxlength="1"]')[4] as HTMLInputElement;
        firstOtpInput?.focus();
      }, 100);
    }, 800);
  }

  // Step 3: OTP
  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.otpInputs[index] = value;
    this.otp = this.otpInputs.join('');

    if (value && index < 5) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onOtpBackspace(event: Event, index: number): void {
    if (!this.otpInputs[index] && index > 0) {
      const prevInput = (event.target as HTMLInputElement).previousElementSibling as HTMLInputElement;
      prevInput?.focus();
    }
  }

  submitOtp(): void {
    if (this.otp !== this.mockOtp) {
      this.toast.error('Code OTP incorrect. Veuillez réessayer.');
      this.otpInputs = ['', '', '', '', '', ''];
      this.otp = '';
      return;
    }

    this.loading = true;

    setTimeout(() => {
      const cleanPhone = this.phone.replace(/\s/g, '');
      const user = this.mockUsers[cleanPhone];

      if (user) {
        // Simulate login via auth service
        const emailMap: Record<string, string> = {
          '0707070707': 'client@sefaizo.ci',
          '0505050505': 'pro@sefaizo.ci',
          '0101010101': 'admin@sefaizo.ci'
        };

        this.authService.login(emailMap[cleanPhone], 'password123')
          .then(() => {
            this.toast.success('Connexion réussie !');
            this.redirectUser();
          })
          .catch((error) => {
            this.toast.error(error.message);
            this.loading = false;
          });
      } else {
        this.toast.error('Erreur de connexion');
        this.loading = false;
      }
    }, 1000);
  }

  resendOtp(): void {
    this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
    this.toast.success(`Nouveau code OTP envoyé (Démo: ${this.mockOtp})`);
    this.startOtpCooldown();
  }

  startOtpCooldown(): void {
    this.otpCooldown = 60;
    const interval = setInterval(() => {
      this.otpCooldown--;
      if (this.otpCooldown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  goBack(): void {
    if (this.currentStep === 'otp') {
      this.currentStep = 'pin';
      this.currentStepIndex = 1;
      this.otp = '';
      this.otpInputs = ['', '', '', '', '', ''];
    } else if (this.currentStep === 'pin') {
      this.currentStep = 'phone';
      this.currentStepIndex = 0;
      this.pin = '';
      this.pinInputs = ['', '', '', ''];
    }
  }

  fillDemo(phone: string): void {
    this.phone = phone;
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
}
