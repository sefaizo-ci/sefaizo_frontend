import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
            Rejoignez SEFAIZO<br />en 2 minutes
          </h1>
          <p class="text-xl text-white/90 mb-12 leading-relaxed">
            Inscrivez-vous avec votre numéro de téléphone et commencez à réserver vos soins beauté immédiatement.
          </p>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-lg">Inscription express</div>
                <div class="text-white/80 text-sm">Juste votre numéro et un code PIN</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-lg">100% sécurisé</div>
                <div class="text-white/80 text-sm">Vérification par OTP + code PIN</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM8 15a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 15H8z"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-lg">Complétez plus tard</div>
                <div class="text-white/80 text-sm">Ajoutez vos infos depuis votre profil</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side -->
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
              @for (step of ['phone', 'otp', 'pin']; track step; let i = $index) {
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                    [class]="getStepIndex(step) <= currentStepIndex ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
                    @if (getStepIndex(step) < currentStepIndex) {
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    } @else {
                      {{ getStepIndex(step) + 1 }}
                    }
                  </div>
                  @if (i < 2) {
                    <div class="w-12 h-1 mx-2 rounded transition-all"
                      [class]="getStepIndex(step) < currentStepIndex ? 'bg-primary' : 'bg-gray-200'"></div>
                  }
                </div>
              }
            </div>
            <div class="flex justify-between text-xs text-secondary-gray">
              <span [class.text-primary]="currentStepIndex >= 0" [class.font-semibold]="currentStepIndex >= 0">Téléphone</span>
              <span [class.text-primary]="currentStepIndex >= 1" [class.font-semibold]="currentStepIndex >= 1">OTP</span>
              <span [class.text-primary]="currentStepIndex >= 2" [class.font-semibold]="currentStepIndex >= 2">Code PIN</span>
            </div>
          </div>

          <!-- Header -->
          <div class="mb-8 text-center">
            @if (currentStep === 'phone') {
              <h2 class="text-3xl font-bold text-secondary mb-2">Créer un compte</h2>
              <p class="text-secondary-gray">Entrez votre numéro de téléphone pour commencer</p>
            } @else if (currentStep === 'otp') {
              <h2 class="text-3xl font-bold text-secondary mb-2">Vérification</h2>
              <p class="text-secondary-gray">Entrez le code envoyé par SMS</p>
            } @else {
              <h2 class="text-3xl font-bold text-secondary mb-2">Code PIN</h2>
              <p class="text-secondary-gray">Choisissez un code PIN à 4 chiffres pour vous connecter</p>
            }
          </div>

          <!-- Step 1: Phone -->
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
                    <span>Envoi du code...</span>
                  </div>
                } @else {
                  Recevoir le code OTP
                }
              </button>
            </form>

            <!-- Demo Phones -->
            <div class="mt-8 bg-gray-50 rounded-lg p-5">
              <p class="text-sm font-medium text-secondary mb-3">Numéros de démonstration</p>
              <div class="space-y-2">
                @for (demo of demoPhones; track demo.phone) {
                  <button
                    (click)="phone = demo.phone"
                    class="w-full text-left px-4 py-2.5 bg-white rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200">
                    <span class="font-medium text-secondary">Client {{ demo.name }}</span>
                    <span class="text-secondary-gray ml-1">+225 {{ demo.phone }}</span>
                  </button>
                }
              </div>
              <p class="text-xs text-secondary-gray mt-3">💡 Le code OTP sera affiché après envoi</p>
            </div>
          }

          <!-- Step 2: OTP -->
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
                Code envoyé au <strong>+225 {{ phone }}</strong>
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
                    <span>Vérification...</span>
                  </div>
                } @else {
                  Vérifier le code
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

          <!-- Step 3: PIN -->
          @if (currentStep === 'pin') {
            <form (ngSubmit)="submitPin()" class="space-y-6">
              <div class="flex justify-center gap-3 mb-2">
                @for (digit of ['0','1','2','3']; track digit) {
                  <input
                    type="password"
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
                Ce code PIN vous servira à vous connecter ultérieurement
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
                    <span>Création du compte...</span>
                  </div>
                } @else {
                  Créer mon compte
                }
              </button>

              <button
                type="button"
                (click)="goBack()"
                class="w-full text-secondary-gray hover:text-secondary font-medium py-3 transition-colors">
                ← Retour
              </button>
            </form>
          }

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
  currentStep: 'phone' | 'otp' | 'pin' = 'phone';
  currentStepIndex = 0;

  phone = '';
  otp = '';
  otpInputs = ['', '', '', '', '', ''];
  mockOtp = '';
  otpCooldown = 0;

  pin = '';
  pinInputs = ['', '', '', ''];

  loading = false;

  demoPhones = [
    { phone: '07 07 07 07 01', name: 'Aminata' },
    { phone: '07 07 07 07 02', name: 'Fatou' },
    { phone: '07 07 07 07 03', name: 'Marie' }
  ];

  // Mock: store registered clients with their PIN
  registeredClients: Record<string, { phone: string; pin: string }> = {};

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  getStepIndex(step: string): number {
    const map: Record<string, number> = { phone: 0, otp: 1, pin: 2 };
    return map[step] || 0;
  }

  // Step 1: Phone
  submitPhone(): void {
    const cleanPhone = this.phone.replace(/\s/g, '');
    if (cleanPhone.length < 10) {
      this.toast.error('Veuillez entrer un numéro valide à 10 chiffres');
      return;
    }

    // Check if already registered
    if (this.registeredClients[cleanPhone]) {
      this.toast.info('Ce numéro est déjà inscrit. Connectez-vous avec votre code PIN.');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loading = true;

    setTimeout(() => {
      // Generate mock OTP
      this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.toast.success(`Code OTP envoyé au +225 ${this.phone} (Démo: ${this.mockOtp})`);
      this.currentStep = 'otp';
      this.currentStepIndex = 1;
      this.loading = false;
      this.startOtpCooldown();

      setTimeout(() => {
        const firstInput = document.querySelector('input[maxlength="1"]') as HTMLInputElement;
        firstInput?.focus();
      }, 100);
    }, 800);
  }

  // OTP methods
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

    this.toast.success('Numéro vérifié avec succès !');
    this.currentStep = 'pin';
    this.currentStepIndex = 2;

    setTimeout(() => {
      const firstPinInput = document.querySelectorAll('input[maxlength="1"]')[6] as HTMLInputElement;
      firstPinInput?.focus();
    }, 100);
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

  // PIN methods
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
    this.loading = true;

    setTimeout(() => {
      const cleanPhone = this.phone.replace(/\s/g, '');

      // Register client with phone + PIN
      this.registeredClients[cleanPhone] = { phone: cleanPhone, pin: this.pin };

      // Store in localStorage for login simulation
      localStorage.setItem('client_phone_' + cleanPhone, JSON.stringify({
        phone: cleanPhone,
        pin: this.pin,
        firstName: '',
        lastName: '',
        email: '',
        createdAt: new Date().toISOString()
      }));

      // Auto-login the client
      this.authService.login(`client_${cleanPhone}@sefaizo.temp`, 'password123')
        .then(() => {
          this.toast.success('Compte créé avec succès ! Complétez votre profil plus tard.');
          this.router.navigate(['/espace-client']);
        })
        .catch(() => {
          // Fallback: just redirect
          this.toast.success('Compte créé avec succès !');
          this.router.navigate(['/espace-client']);
        });
    }, 1000);
  }

  goBack(): void {
    if (this.currentStep === 'pin') {
      this.currentStep = 'otp';
      this.currentStepIndex = 1;
      this.pin = '';
      this.pinInputs = ['', '', '', ''];
    } else if (this.currentStep === 'otp') {
      this.currentStep = 'phone';
      this.currentStepIndex = 0;
      this.otp = '';
      this.otpInputs = ['', '', '', '', '', ''];
    }
  }
}
