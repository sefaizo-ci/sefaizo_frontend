import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

type Step = 'identifier' | 'otp' | 'pin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex">

      <!-- ════════════════════════════════════
           PANNEAU GAUCHE
      ════════════════════════════════════════ -->
      <div class="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col"
           style="background:linear-gradient(160deg,#0e0620 0%,#1c0d3a 45%,#2a1555 100%)">

        <!-- Orbes -->
        <div class="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
             style="background:radial-gradient(circle,#7c3aed,transparent)"></div>
        <div class="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-15"
             style="background:radial-gradient(circle,#a855f7,transparent)"></div>

        <!-- Illustration -->
        <div class="absolute bottom-0 right-0 w-[56%] h-[76%] pointer-events-none select-none overflow-hidden">
          <img src="/img portailles/login.jpg"
               alt="" class="w-full h-full object-cover object-top"
               style="mix-blend-mode:luminosity;opacity:.4;
                      mask-image:linear-gradient(to left,rgba(0,0,0,.85) 35%,transparent 100%);
                      -webkit-mask-image:linear-gradient(to left,rgba(0,0,0,.85) 35%,transparent 100%)">
        </div>

        <!-- Contenu -->
        <div class="relative z-10 flex flex-col h-full px-14 py-10">
          <a href="/"><img src="/Splash.png" alt="SEFAIZO" class="h-10 w-auto brightness-0 invert"></a>

          <div class="flex-1 flex flex-col justify-center py-12">
            <div class="text-7xl leading-none font-serif mb-4 opacity-50 text-white">"</div>
            <h1 class="text-4xl font-bold text-white leading-tight mb-10">
              Réservez votre<br>beauté en toute<br>
              <span class="text-purple-300">simplicité</span> »
            </h1>

            <ul class="space-y-5">
              @for (item of leftItems; track item.label) {
                <li class="flex items-start gap-4">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                       style="background:rgba(255,255,255,.12)">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="item.icon"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-white/90 font-medium text-sm">{{ item.label }}</p>
                    <p class="text-white/45 text-xs mt-0.5">{{ item.sub }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>

          <!-- Preuve sociale -->
          <div class="flex items-center gap-3 pb-2">
            <div class="flex -space-x-2">
              @for (av of avatars; track av) {
                <img [src]="av" class="w-8 h-8 rounded-full border-2 object-cover"
                     style="border-color:#1c0d3a">
              }
            </div>
            <div>
              <div class="flex gap-0.5">
                @for (s of [1,2,3,4,5]; track s) {
                  <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                }
              </div>
              <p class="text-white/45 text-xs">+8 000 utilisatrices satisfaites</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════
           PANNEAU DROIT
      ════════════════════════════════════════ -->
      <div class="flex-1 flex items-center justify-center px-8 py-10 bg-white">
        <div class="w-full max-w-[400px]">

          <!-- Logo + titre -->
          <div class="flex flex-col items-center mb-8">
            <img src="/Splash.png" alt="SEFAIZO" class="h-10 mb-5">
            <h1 class="text-2xl font-bold text-secondary">Bienvenue !</h1>
            <p class="text-secondary-gray text-sm mt-1">
              @if (step === 'identifier') { Connectez-vous avec votre numéro de téléphone }
              @else if (step === 'otp') { Entrez le code reçu par SMS }
              @else { Entrez votre code PIN }
            </p>
          </div>

          <!-- Stepper -->
          <div class="flex items-center gap-2 mb-7">
            @for (s of steps; track s.id; let i = $index) {
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1.5">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                       [style.background]="stepIndex() >= s.id ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : '#f3f4f6'"
                       [style.color]="stepIndex() >= s.id ? 'white' : '#9ca3af'">
                    @if (stepIndex() > s.id) {
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    } @else { {{ s.id }} }
                  </div>
                  <span class="text-xs hidden sm:inline"
                        [style.color]="stepIndex() >= s.id ? '#7c3aed' : '#9ca3af'"
                        [style.font-weight]="step === s.key ? '600' : '400'">
                    {{ s.label }}
                  </span>
                </div>
                @if (i < steps.length - 1) {
                  <div class="w-6 h-px mx-0.5"
                       [style.background]="stepIndex() > s.id ? '#7c3aed' : '#e5e7eb'"></div>
                }
              </div>
            }
          </div>

          <!-- ── ÉTAPE 1 : Numéro de téléphone ── -->
          @if (step === 'identifier') {
            <div class="space-y-4">

              <!-- Champ téléphone -->
              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-1.5">Numéro de téléphone</label>
                <div class="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                  <!-- Préfixe CI -->
                  <div class="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                    <span class="text-xl leading-none">🇨🇮</span>
                    <span class="text-sm font-semibold text-secondary">+225</span>
                  </div>
                  <input #phoneInput
                         type="tel"
                         [(ngModel)]="phone"
                         name="phone"
                         maxlength="10"
                         placeholder="07 00 00 00 00"
                         autocomplete="tel"
                         (input)="formatPhone($event)"
                         class="flex-1 px-4 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none bg-white">
                </div>
                <p class="text-xs text-secondary-gray mt-1.5">
                  Numéro à 10 chiffres (ex&nbsp;: 07 00 00 00 00)
                </p>
              </div>

              <!-- Message d'erreur -->
              @if (errorMsg) {
                <p class="text-red-500 text-xs flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ errorMsg }}
                </p>
              }

              <!-- Bouton principal -->
              <button type="button" (click)="submitIdentifier()"
                      [disabled]="loading || cleanPhone().length !== 10"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Envoi du code…
                } @else {
                  Recevoir le code OTP
                }
              </button>

              <!-- Lien inscription -->
              <p class="text-center text-xs text-secondary-gray pt-1">
                Pas encore de compte ?
                <a routerLink="/auth/register" class="font-semibold hover:underline ml-1" style="color:#7c3aed">
                  S'inscrire →
                </a>
              </p>

              <!-- PIN oublié -->
              <p class="text-center text-xs text-secondary-gray">
                PIN oublié ?
                <a routerLink="/auth/forgot-password" class="font-semibold hover:underline ml-1" style="color:#7c3aed">
                  Réinitialiser →
                </a>
              </p>

              <!-- Démo -->
              <div class="border border-dashed border-gray-200 rounded-xl p-4 mt-2">
                <p class="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide text-center">Comptes démo</p>
                <div class="space-y-1.5">
                  @for (d of demoUsers; track d.phone) {
                    <button type="button" (click)="fillPhone(d)"
                            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                           [style.background]="d.color">
                        {{ d.initials }}
                      </div>
                      <div class="flex-1">
                        <span class="text-xs font-medium text-secondary">{{ d.role }}</span>
                        <span class="text-xs text-gray-400 ml-2">🇨🇮 +225 {{ d.phone }}</span>
                      </div>
                      <span class="text-xs text-gray-300">→</span>
                    </button>
                  }
                </div>
                <p class="text-center text-xs text-gray-400 mt-2">PIN : indiqué à l'étape suivante</p>
              </div>
            </div>
          }

          <!-- ── ÉTAPE 2 : OTP ── -->
          @if (step === 'otp') {
            <div class="space-y-5">
              <div class="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                <p class="text-sm text-secondary">
                  Code envoyé au
                  <strong class="text-secondary" style="color:#7c3aed">+225 {{ phone }}</strong>
                </p>
              </div>

              <!-- 6 boîtes OTP -->
              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-3 text-center">
                  Code OTP à 6 chiffres
                </label>
                <div class="flex justify-center gap-2.5" #otpContainer>
                  @for (digit of otpDigits; track $index; let i = $index) {
                    <input type="text" maxlength="1" inputmode="numeric"
                           [value]="otpDigits[i]"
                           (input)="onOtpInput($event, i)"
                           (keydown)="onOtpKeydown($event, i)"
                           (paste)="onOtpPaste($event)"
                           class="w-11 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                           style="height:52px"
                           [style.border-color]="otpDigits[i] ? '#7c3aed' : '#e5e7eb'"
                           [style.background]="otpDigits[i] ? '#faf5ff' : 'white'">
                  }
                </div>
              </div>

              @if (mockOtp) {
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p class="text-xs text-amber-800">
                    💡 Code démo :
                    <strong class="font-mono text-sm">{{ mockOtp }}</strong>
                  </p>
                </div>
              }

              @if (errorMsg) {
                <p class="text-red-500 text-xs text-center">{{ errorMsg }}</p>
              }

              <button type="button" (click)="submitOtp()"
                      [disabled]="loading || otpValue().length < 6"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Vérification…
                } @else {
                  Vérifier le code OTP
                }
              </button>

              <div class="flex justify-between items-center text-sm">
                <button type="button" (click)="goBack()"
                        class="text-secondary-gray hover:text-secondary transition-colors flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Retour
                </button>
                <button type="button" (click)="resendOtp()"
                        [disabled]="otpCooldown > 0"
                        class="font-medium transition-colors disabled:opacity-40"
                        style="color:#7c3aed">
                  @if (otpCooldown > 0) { Renvoyer dans {{ otpCooldown }}s }
                  @else { Renvoyer le code }
                </button>
              </div>
            </div>
          }

          <!-- ── ÉTAPE 3 : PIN 4 chiffres ── -->
          @if (step === 'pin') {
            <div class="space-y-5">
              <div class="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                <p class="text-sm text-secondary">
                  OTP validé ✓ — Entrez votre code PIN pour accéder à votre compte
                </p>
              </div>

              <!-- 4 boîtes PIN masquées -->
              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-3 text-center">
                  Code PIN à 4 chiffres
                </label>
                <div class="flex justify-center gap-4">
                  @for (digit of pinDigits; track $index; let i = $index) {
                    <input type="password" maxlength="1" inputmode="numeric"
                           [value]="pinDigits[i]"
                           (input)="onPinInput($event, i)"
                           (keydown)="onPinKeydown($event, i)"
                           class="w-14 text-center text-3xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                           style="height:64px; letter-spacing:0.1em"
                           [style.border-color]="pinDigits[i] ? '#7c3aed' : '#e5e7eb'"
                           [style.background]="pinDigits[i] ? '#faf5ff' : 'white'">
                  }
                </div>
              </div>

              @if (demoPin) {
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p class="text-xs text-amber-800">
                    💡 PIN démo pour ce compte :
                    <strong class="font-mono text-sm">{{ demoPin }}</strong>
                  </p>
                </div>
              }

              @if (errorMsg) {
                <p class="text-red-500 text-xs text-center">{{ errorMsg }}</p>
              }

              <button type="button" (click)="submitPin()"
                      [disabled]="loading || pinValue().length < 4"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Se connecter…
                } @else {
                  Se connecter
                }
              </button>

              <button type="button" (click)="goBack()"
                      class="w-full text-center text-sm text-secondary-gray hover:text-secondary transition-colors flex items-center justify-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour à la vérification OTP
              </button>
            </div>
          }

        </div>
      </div>

    </div>
  `,
  styles: []
})
export class LoginComponent {

  step: Step = 'identifier';

  phone = '';
  otpDigits = ['', '', '', '', '', ''];
  mockOtp = '';
  otpCooldown = 0;
  pinDigits = ['', '', '', ''];
  demoPin = '';

  loading = false;
  errorMsg = '';

  steps = [
    { id: 1, key: 'identifier' as Step, label: 'Téléphone' },
    { id: 2, key: 'otp' as Step, label: 'OTP' },
    { id: 3, key: 'pin' as Step, label: 'PIN' },
  ];

  leftItems = [
    { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Réservez vos services préférés', sub: 'En quelques clics seulement' },
    { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Paiement sécurisé et confirmé', sub: 'Mobile Money & paiement en ligne' },
    { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Des professionnels à votre écoute', sub: 'Coiffure, esthétique, bien-être…' },
  ];

  avatars = [
    '/avatars/clarisse-yao.jpg',
    '/avatars/mariam-bamba.jpg',
    '/avatars/Fatou Diallo.jpg',
    '/avatars/Bintou Traoré.jpg',
  ];

  demoUsers = [
    { phone: '07 07 07 07 07', cleanPhone: '0707070707', email: 'client@sefaizo.ci', pin: '1234', role: 'Client', initials: 'CL', color: '#7c3aed' },
    { phone: '05 05 05 05 05', cleanPhone: '0505050505', email: 'pro@sefaizo.ci',    pin: '5678', role: 'Pro',    initials: 'PR', color: '#a855f7' },
    { phone: '01 01 01 01 01', cleanPhone: '0101010101', email: 'admin@sefaizo.ci',  pin: '0000', role: 'Admin',  initials: 'AD', color: '#1e0d3a' },
  ];

  private mockDB: Record<string, { email: string; pin: string }> = {
    '0707070707': { email: 'client@sefaizo.ci', pin: '1234' },
    '0505050505': { email: 'pro@sefaizo.ci',    pin: '5678' },
    '0101010101': { email: 'admin@sefaizo.ci',  pin: '0000' },
  };

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  stepIndex(): number {
    return { identifier: 1, otp: 2, pin: 3 }[this.step];
  }

  otpValue(): string { return this.otpDigits.join(''); }
  pinValue(): string { return this.pinDigits.join(''); }
  cleanPhone(): string { return this.phone.replace(/\s/g, ''); }

  formatPhone(e: Event): void {
    const input = e.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 10);
    this.phone = digits;
    input.value = digits;
  }

  fillPhone(d: typeof this.demoUsers[0]): void {
    this.phone = d.cleanPhone;
    this.errorMsg = '';
  }

  goBack(): void {
    this.errorMsg = '';
    if (this.step === 'otp') { this.step = 'identifier'; this.otpDigits = ['','','','','','']; }
    else if (this.step === 'pin') { this.step = 'otp'; this.pinDigits = ['','','','']; }
  }

  submitIdentifier(): void {
    this.errorMsg = '';
    const clean = this.cleanPhone();
    if (!this.mockDB[clean]) {
      this.errorMsg = 'Numéro non reconnu. Vérifiez ou créez un compte.';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.demoPin = this.mockDB[clean].pin;
      this.toast.success(`Code OTP envoyé au +225 ${this.phone} (démo : ${this.mockOtp})`);
      this.step = 'otp';
      this.loading = false;
      this.startOtpCooldown();
      setTimeout(() => this.focusFirst('otp'), 100);
    }, 700);
  }

  onOtpInput(e: Event, i: number): void {
    const input = e.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.otpDigits[i] = val;
    input.value = val;
    if (val && i < 5) (input.nextElementSibling as HTMLInputElement)?.focus();
  }

  onOtpKeydown(e: KeyboardEvent, i: number): void {
    if (e.key === 'Backspace' && !this.otpDigits[i] && i > 0) {
      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
    }
  }

  onOtpPaste(e: ClipboardEvent): void {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) ?? '';
    pasted.split('').forEach((c, i) => { if (i < 6) this.otpDigits[i] = c; });
  }

  submitOtp(): void {
    this.errorMsg = '';
    if (this.otpValue() !== this.mockOtp) {
      this.errorMsg = 'Code OTP incorrect. Vérifiez le code reçu.';
      this.otpDigits = ['', '', '', '', '', ''];
      setTimeout(() => this.focusFirst('otp'), 50);
      return;
    }
    this.toast.success('OTP validé ✓');
    this.step = 'pin';
    setTimeout(() => this.focusFirst('pin'), 100);
  }

  resendOtp(): void {
    this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
    this.toast.success(`Nouveau code envoyé (démo : ${this.mockOtp})`);
    this.otpDigits = ['', '', '', '', '', ''];
    this.startOtpCooldown();
    setTimeout(() => this.focusFirst('otp'), 100);
  }

  startOtpCooldown(): void {
    this.otpCooldown = 60;
    const t = setInterval(() => { if (--this.otpCooldown <= 0) clearInterval(t); }, 1000);
  }

  onPinInput(e: Event, i: number): void {
    const input = e.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.pinDigits[i] = val;
    input.value = val;
    if (val && i < 3) (input.nextElementSibling as HTMLInputElement)?.focus();
  }

  onPinKeydown(e: KeyboardEvent, i: number): void {
    if (e.key === 'Backspace' && !this.pinDigits[i] && i > 0) {
      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
    }
  }

  submitPin(): void {
    this.errorMsg = '';
    const clean = this.cleanPhone();
    const user = this.mockDB[clean];

    if (!user || this.pinValue() !== user.pin) {
      this.errorMsg = 'Code PIN incorrect. Réessayez.';
      this.pinDigits = ['', '', '', ''];
      setTimeout(() => this.focusFirst('pin'), 50);
      return;
    }

    this.loading = true;
    this.authService.login(user.email, 'password123').then(() => {
      this.toast.success('Connexion réussie !');
      this.redirectUser();
    }).catch(() => {
      this.errorMsg = 'Erreur de connexion. Réessayez.';
      this.loading = false;
    });
  }

  private redirectUser(): void {
    switch (this.authService.userRole()) {
      case 'CLIENT': this.router.navigate(['/espace-client']); break;
      case 'PRO':    this.router.navigate(['/espace-pro']); break;
      case 'ADMIN':  this.router.navigate(['/admin']); break;
      default:       this.router.navigate(['/']);
    }
  }

  private focusFirst(type: 'otp' | 'pin'): void {
    const sel = type === 'otp'
      ? 'input[maxlength="1"][inputmode="numeric"]:not([type="password"])'
      : 'input[maxlength="1"][type="password"]';
    (document.querySelector(sel) as HTMLInputElement)?.focus();
  }
}
