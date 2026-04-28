import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

type Step = 'identifier' | 'otp' | 'pin';
type LoginMode = 'phone' | 'email';

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
                    <!-- Icône BLANCHE -->
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
              @if (step === 'identifier') { Connectez-vous à votre compte }
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

          <!-- ── ÉTAPE 1 : Identifiant ── -->
          @if (step === 'identifier') {
            <div class="space-y-4">

              <!-- Tabs téléphone / email -->
              <div class="flex gap-1 p-1 bg-gray-100 rounded-xl">
                <button type="button"
                        (click)="switchMode('phone')"
                        class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
                        [class]="mode === 'phone' ? 'bg-white text-secondary shadow-sm' : 'text-secondary-gray'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Téléphone
                </button>
                <button type="button"
                        (click)="switchMode('email')"
                        class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
                        [class]="mode === 'email' ? 'bg-white text-secondary shadow-sm' : 'text-secondary-gray'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Email
                </button>
              </div>

              <!-- Champ téléphone -->
              @if (mode === 'phone') {
                <div>
                  <div class="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                    <!-- Préfixe CI non-éditable -->
                    <div class="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                      <span class="text-xl leading-none">🇨🇮</span>
                      <span class="text-sm font-semibold text-secondary">+225</span>
                    </div>
                    <!-- Saisie numéro -->
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
              }

              <!-- Champ email -->
              @if (mode === 'email') {
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input type="email"
                         [(ngModel)]="emailInput"
                         name="emailInput"
                         placeholder="votre@email.com"
                         autocomplete="email"
                         class="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                </div>
              }

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
                      [disabled]="loading || !canSubmitIdentifier()"
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
                  @if (mode === 'phone') { Recevoir le code OTP }
                  @else { Continuer avec l'email }
                }
              </button>

              <!-- Séparateur OU -->
              <div class="flex items-center gap-3">
                <div class="flex-1 h-px bg-gray-200"></div>
                <span class="text-xs text-gray-400 font-medium">OU</span>
                <div class="flex-1 h-px bg-gray-200"></div>
              </div>

              <!-- Google -->
              <button type="button" (click)="loginWithGoogle()"
                      class="w-full py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-3
                             text-sm font-medium text-secondary hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>

              <!-- Lien inscription -->
              <p class="text-center text-xs text-secondary-gray pt-1">
                Pas encore de compte ?
                <a routerLink="/auth/register" class="font-semibold hover:underline ml-1" style="color:#7c3aed">
                  S'inscrire →
                </a>
              </p>

              <!-- PIN / mot de passe oublié -->
              <p class="text-center text-xs text-secondary-gray">
                PIN ou mot de passe oublié ?
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
                           style="height:52px; border-color: {{ otpDigits[i] ? '#7c3aed' : '#e5e7eb' }}"
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

              <!-- Hint PIN démo -->
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
                  Connexion…
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

      <!-- Modal Google -->
      @if (showGoogleModal) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4"
             style="background:rgba(0,0,0,.5)">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="font-semibold text-secondary">Connexion Google</span>
              </div>
              <button (click)="showGoogleModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <p class="text-sm text-secondary-gray mb-4">
              Entrez votre adresse Google associée à votre compte SEFAIZO.
            </p>

            <div class="relative mb-4">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input type="email" [(ngModel)]="googleEmail" placeholder="votre@gmail.com"
                     class="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-secondary
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            </div>

            @if (googleError) {
              <p class="text-red-500 text-xs mb-3 text-center">{{ googleError }}</p>
            }

            <div class="text-xs text-gray-400 mb-4 space-y-1">
              <p class="font-medium text-gray-500">Comptes démo Google :</p>
              @for (d of demoUsers; track d.phone) {
                <button type="button" (click)="googleEmail = d.email"
                        class="block w-full text-left px-2 py-1 rounded hover:bg-gray-50 transition-colors">
                  <span class="font-medium">{{ d.role }}</span> — {{ d.email }}
                </button>
              }
            </div>

            <button type="button" (click)="submitGoogle()"
                    [disabled]="googleLoading || !googleEmail"
                    class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                    style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
              @if (googleLoading) { Connexion… } @else { Se connecter avec Google }
            </button>
          </div>
        </div>
      }

    </div>
  `,
  styles: []
})
export class LoginComponent {

  step: Step = 'identifier';
  mode: LoginMode = 'phone';

  // Champs
  phone = '';
  emailInput = '';
  googleEmail = '';

  // OTP
  otpDigits = ['', '', '', '', '', ''];
  mockOtp = '';
  otpCooldown = 0;

  // PIN
  pinDigits = ['', '', '', ''];
  demoPin = '';

  // État UI
  loading = false;
  errorMsg = '';
  showGoogleModal = false;
  googleLoading = false;
  googleError = '';

  // Stepper
  steps = [
    { id: 1, key: 'identifier' as Step, label: 'Téléphone' },
    { id: 2, key: 'otp' as Step, label: 'OTP' },
    { id: 3, key: 'pin' as Step, label: 'PIN' },
  ];

  // Panneau gauche
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

  // Données mock — téléphone, OTP généré, PIN, email, rôle
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

  private googleDB: Record<string, string> = {
    'client@sefaizo.ci': 'client@sefaizo.ci',
    'pro@sefaizo.ci':    'pro@sefaizo.ci',
    'admin@sefaizo.ci':  'admin@sefaizo.ci',
  };

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  // ─── Helpers ───────────────────────────────

  stepIndex(): number {
    return { identifier: 1, otp: 2, pin: 3 }[this.step];
  }

  otpValue(): string { return this.otpDigits.join(''); }
  pinValue(): string { return this.pinDigits.join(''); }

  cleanPhone(): string { return this.phone.replace(/\s/g, ''); }

  canSubmitIdentifier(): boolean {
    if (this.mode === 'phone') return this.cleanPhone().length === 10;
    return this.emailInput.includes('@');
  }

  switchMode(m: LoginMode): void {
    this.mode = m;
    this.errorMsg = '';
  }

  formatPhone(e: Event): void {
    const input = e.target as HTMLInputElement;
    // Garde seulement les chiffres, max 10
    const digits = input.value.replace(/\D/g, '').slice(0, 10);
    this.phone = digits;
    input.value = digits;
  }

  fillPhone(d: typeof this.demoUsers[0]): void {
    this.mode = 'phone';
    this.phone = d.cleanPhone;
    this.errorMsg = '';
  }

  goBack(): void {
    this.errorMsg = '';
    if (this.step === 'otp') { this.step = 'identifier'; this.otpDigits = ['','','','','','']; }
    else if (this.step === 'pin') { this.step = 'otp'; this.pinDigits = ['','','','']; }
  }

  // ─── Étape 1 : Identifiant ─────────────────

  submitIdentifier(): void {
    this.errorMsg = '';

    if (this.mode === 'phone') {
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

    } else {
      // Mode email : cherche l'utilisateur et connecte directement
      const email = this.emailInput.trim().toLowerCase();
      if (!this.googleDB[email]) {
        this.errorMsg = 'Email non reconnu. Vérifiez ou créez un compte.';
        return;
      }
      this.loading = true;
      this.authService.login(email, 'password123').then(() => {
        this.toast.success('Connexion réussie !');
        this.redirectUser();
      }).catch(() => {
        this.errorMsg = 'Erreur de connexion. Réessayez.';
        this.loading = false;
      });
    }
  }

  // ─── Étape 2 : OTP ─────────────────────────

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

  // ─── Étape 3 : PIN ─────────────────────────

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

  // ─── Google ────────────────────────────────

  loginWithGoogle(): void {
    this.googleEmail = '';
    this.googleError = '';
    this.showGoogleModal = true;
  }

  submitGoogle(): void {
    this.googleError = '';
    const email = this.googleEmail.trim().toLowerCase();
    if (!this.googleDB[email]) {
      this.googleError = 'Email Google non reconnu. Vérifiez votre adresse.';
      return;
    }
    this.googleLoading = true;
    this.authService.login(email, 'password123').then(() => {
      this.showGoogleModal = false;
      this.toast.success('Connexion Google réussie !');
      this.redirectUser();
    }).catch(() => {
      this.googleError = 'Erreur de connexion. Réessayez.';
      this.googleLoading = false;
    });
  }

  // ─── Navigation ────────────────────────────

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
