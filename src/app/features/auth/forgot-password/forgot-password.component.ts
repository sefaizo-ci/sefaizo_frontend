import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

type Step = 'identifiant' | 'code' | 'nouveau';
type InputMode = 'phone' | 'email';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex">

      <!-- ══════════════ PANNEAU GAUCHE ══════════════ -->
      <div class="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col"
           style="background:linear-gradient(160deg,#0e0620 0%,#1c0d3a 45%,#2a1555 100%)">

        <!-- Orbes -->
        <div class="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
             style="background:radial-gradient(circle,#7c3aed,transparent)"></div>
        <div class="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-15"
             style="background:radial-gradient(circle,#a855f7,transparent)"></div>

        <!-- Illustration -->
        <div class="absolute bottom-0 right-0 w-[56%] h-[76%] pointer-events-none overflow-hidden">
          <img src="/img portailles/forgot psw.jpg" alt=""
               class="w-full h-full object-cover object-top"
               style="mix-blend-mode:luminosity;opacity:.38;
                      mask-image:linear-gradient(to left,rgba(0,0,0,.85) 30%,transparent 100%);
                      -webkit-mask-image:linear-gradient(to left,rgba(0,0,0,.85) 30%,transparent 100%)">
        </div>

        <div class="relative z-10 flex flex-col h-full px-12 py-10">
          <a href="/"><img src="/Splash.png" alt="SEFAIZO" class="h-10 w-auto brightness-0 invert"></a>

          <div class="flex-1 flex flex-col justify-center py-12">
            <!-- Icône bouclier -->
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                 style="background:rgba(255,255,255,.1)">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
              </svg>
            </div>

            <h1 class="text-4xl font-bold text-white leading-tight mb-4">
              Votre sécurité,<br>
              <span class="text-purple-300">notre priorité</span>
            </h1>
            <p class="text-white/50 text-sm leading-relaxed mb-10">
              Récupérez l'accès à votre compte<br>en quelques étapes simples.
            </p>

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
                    <p class="text-white/40 text-xs mt-0.5">{{ item.sub }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>

      <!-- ══════════════ PANNEAU DROIT ══════════════ -->
      <div class="flex-1 flex flex-col items-center justify-center px-8 py-10 bg-white">
        <div class="w-full max-w-[500px]">

          <!-- Titre -->
          <div class="text-center mb-8">
            <img src="/Splash.png" alt="SEFAIZO" class="h-9 mx-auto mb-5">
            <h2 class="text-2xl font-bold text-secondary">Réinitialiser le mot de passe</h2>
          </div>

          <!-- Stepper horizontal -->
          <div class="flex items-center justify-center mb-10">
            @for (s of stepperDef; track s.id; let i = $index) {
              <div class="flex items-center">
                <!-- Cercle -->
                <div class="flex flex-col items-center gap-1.5">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2"
                       [style.background]="stepIdx() >= s.id ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'white'"
                       [style.border-color]="stepIdx() >= s.id ? '#7c3aed' : '#e5e7eb'"
                       [style.color]="stepIdx() >= s.id ? 'white' : '#9ca3af'">
                    @if (stepIdx() > s.id) {
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    } @else { {{ s.id }} }
                  </div>
                  <span class="text-xs whitespace-nowrap"
                        [style.color]="stepIdx() >= s.id ? '#7c3aed' : '#9ca3af'"
                        [style.font-weight]="step === s.key ? '600' : '400'">
                    {{ s.label }}
                  </span>
                </div>
                <!-- Connecteur -->
                @if (i < stepperDef.length - 1) {
                  <div class="w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all"
                       [style.background]="stepIdx() > s.id ? '#7c3aed' : '#e5e7eb'"></div>
                }
              </div>
            }
          </div>

          <!-- ── ÉTAPE 1 : IDENTIFIANT ── -->
          @if (step === 'identifiant') {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">

              <!-- Icône -->
              <div class="flex justify-center">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center"
                     style="background:linear-gradient(135deg,#7c3aed15,#a855f715)">
                  <svg class="w-8 h-8" style="color:#7c3aed" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
                  </svg>
                </div>
              </div>

              <div class="text-center">
                <h3 class="font-bold text-secondary text-lg">Mot de passe oublié ?</h3>
                <p class="text-secondary-gray text-sm mt-1">
                  Entrez votre email ou numéro de téléphone
                </p>
              </div>

              <!-- Tabs Téléphone / Email -->
              <div class="flex gap-1 p-1 bg-gray-100 rounded-xl">
                <button type="button" (click)="inputMode = 'phone'; errorMsg = ''"
                        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
                        [class]="inputMode === 'phone' ? 'bg-white text-secondary shadow-sm' : 'text-secondary-gray'">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Téléphone
                </button>
                <button type="button" (click)="inputMode = 'email'; errorMsg = ''"
                        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
                        [class]="inputMode === 'email' ? 'bg-white text-secondary shadow-sm' : 'text-secondary-gray'">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Email
                </button>
              </div>

              <!-- Input téléphone -->
              @if (inputMode === 'phone') {
                <div>
                  <div class="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                    <div class="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                      <span class="text-lg">🇨🇮</span>
                      <span class="text-sm font-semibold text-secondary">+225</span>
                    </div>
                    <input type="tel" [(ngModel)]="phoneInput" name="phoneInput"
                           maxlength="10" placeholder="07 00 00 00 00" (input)="fmtPhone($event)"
                           class="flex-1 px-4 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none bg-white">
                  </div>
                  <!-- Comptes démo téléphone -->
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    @for (d of demoPhones; track d.phone) {
                      <button type="button" (click)="phoneInput = d.phone"
                              class="text-xs px-2.5 py-1 rounded-lg border border-dashed transition-all hover:border-purple-400 hover:text-purple-600"
                              [class]="phoneInput === d.phone ? 'border-purple-500 text-purple-600 bg-purple-50' : 'border-gray-300 text-gray-500'">
                        {{ d.label }} · {{ d.display }}
                      </button>
                    }
                  </div>
                </div>
              }

              <!-- Input email -->
              @if (inputMode === 'email') {
                <div>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </span>
                    <input type="email" [(ngModel)]="emailInput" name="emailInput"
                           placeholder="votre@email.com"
                           class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                  </div>
                  <!-- Comptes démo email -->
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    @for (d of demoEmails; track d.email) {
                      <button type="button" (click)="emailInput = d.email"
                              class="text-xs px-2.5 py-1 rounded-lg border border-dashed transition-all hover:border-purple-400 hover:text-purple-600"
                              [class]="emailInput === d.email ? 'border-purple-500 text-purple-600 bg-purple-50' : 'border-gray-300 text-gray-500'">
                        {{ d.label }}
                      </button>
                    }
                  </div>
                </div>
              }

              @if (errorMsg) {
                <p class="text-red-500 text-xs flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ errorMsg }}
                </p>
              }

              <button type="button" (click)="sendCode()"
                      [disabled]="loading || !canSend()"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Envoi…
                } @else {
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Envoyer le code
                }
              </button>

              <a routerLink="/auth/login"
                 class="flex items-center justify-center gap-1.5 text-sm text-secondary-gray hover:text-secondary transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour à la connexion
              </a>
            </div>
          }

          <!-- ── ÉTAPE 2 : CODE OTP ── -->
          @if (step === 'code') {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">

              <div class="flex justify-center">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center"
                     style="background:linear-gradient(135deg,#7c3aed15,#a855f715)">
                  <svg class="w-8 h-8" style="color:#7c3aed" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"/>
                  </svg>
                </div>
              </div>

              <div class="text-center">
                <h3 class="font-bold text-secondary text-lg">Code de vérification</h3>
                <p class="text-secondary-gray text-sm mt-1">
                  Code envoyé à
                  <strong class="text-secondary" style="color:#7c3aed">
                    {{ inputMode === 'phone' ? '+225 ' + phoneInput : emailInput }}
                  </strong>
                </p>
              </div>

              <!-- 6 boîtes OTP -->
              <div class="flex justify-center gap-2.5">
                @for (d of otpDigits; track $index; let i = $index) {
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

              @if (mockOtp) {
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p class="text-xs text-amber-800">
                    💡 Code démo : <strong class="font-mono text-sm tracking-widest">{{ mockOtp }}</strong>
                  </p>
                </div>
              }

              @if (errorMsg) {
                <p class="text-red-500 text-xs text-center">{{ errorMsg }}</p>
              }

              <button type="button" (click)="verifyCode()"
                      [disabled]="loading || otpVal().length < 6"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Vérification…
                } @else { Vérifier }
              </button>

              <div class="flex justify-between items-center text-sm">
                <button type="button" (click)="backToIdentifiant()"
                        class="text-secondary-gray hover:text-secondary flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Retour
                </button>
                <button type="button" (click)="resendCode()" [disabled]="cooldown > 0"
                        class="font-medium disabled:opacity-40 transition-colors" style="color:#7c3aed">
                  @if (cooldown > 0) { Renvoyer le code ({{ cooldown | number:'2.0-0' }}s) }
                  @else { Renvoyer le code }
                </button>
              </div>
            </div>
          }

          <!-- ── ÉTAPE 3 : NOUVEAU MOT DE PASSE / PIN ── -->
          @if (step === 'nouveau') {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">

              <div class="flex justify-center">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center"
                     style="background:linear-gradient(135deg,#7c3aed15,#a855f715)">
                  <svg class="w-8 h-8" style="color:#7c3aed" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                  </svg>
                </div>
              </div>

              <div class="text-center">
                <h3 class="font-bold text-secondary text-lg">
                  {{ inputMode === 'phone' ? 'Nouveau code PIN' : 'Nouveau mot de passe' }}
                </h3>
                <p class="text-secondary-gray text-sm mt-1">
                  {{ inputMode === 'phone' ? 'Choisissez un PIN à 4 chiffres' : 'Choisissez un mot de passe sécurisé' }}
                </p>
              </div>

              <!-- Mode téléphone → nouveau PIN 4 chiffres -->
              @if (inputMode === 'phone') {
                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-secondary-gray mb-2 text-center">Nouveau PIN</label>
                    <div class="flex justify-center gap-4">
                      @for (d of newPinDigits; track $index; let i = $index) {
                        <input type="password" maxlength="1" inputmode="numeric"
                               [value]="newPinDigits[i]"
                               (input)="onNewPinInput($event, i)"
                               (keydown)="onNewPinKeydown($event, i)"
                               class="w-14 text-center text-3xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                               style="height:60px"
                               [style.border-color]="newPinDigits[i] ? '#7c3aed' : '#e5e7eb'"
                               [style.background]="newPinDigits[i] ? '#faf5ff' : 'white'">
                      }
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-secondary-gray mb-2 text-center">Confirmer le PIN</label>
                    <div class="flex justify-center gap-4">
                      @for (d of confirmPinDigits; track $index; let i = $index) {
                        <input type="password" maxlength="1" inputmode="numeric"
                               [value]="confirmPinDigits[i]"
                               (input)="onConfirmPinInput($event, i)"
                               (keydown)="onConfirmPinKeydown($event, i)"
                               class="w-14 text-center text-3xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                               style="height:60px"
                               [style.border-color]="confirmPinDigits[i] ? (newPinVal() !== confirmPinVal() && confirmPinVal().length === 4 ? '#ef4444' : '#7c3aed') : '#e5e7eb'"
                               [style.background]="confirmPinDigits[i] ? '#faf5ff' : 'white'">
                      }
                    </div>
                    @if (newPinVal().length === 4 && confirmPinVal().length === 4 && newPinVal() !== confirmPinVal()) {
                      <p class="text-red-500 text-xs text-center mt-2">Les codes PIN ne correspondent pas</p>
                    }
                  </div>
                </div>
              }

              <!-- Mode email → nouveau mot de passe -->
              @if (inputMode === 'email') {
                <div class="space-y-3">
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </span>
                    <input [type]="showPwd ? 'text' : 'password'"
                           [(ngModel)]="newPassword" name="newPwd"
                           placeholder="Nouveau mot de passe"
                           class="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <button type="button" (click)="showPwd = !showPwd"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Barre de force -->
                  @if (newPassword.length > 0) {
                    <div>
                      <div class="flex gap-1.5 mb-1">
                        @for (seg of [1,2,3]; track seg) {
                          <div class="flex-1 h-1.5 rounded-full transition-all"
                               [style.background]="seg <= pwdStrength() ? pwdColor() : '#e5e7eb'"></div>
                        }
                      </div>
                      <p class="text-xs" [style.color]="pwdColor()">{{ pwdLabel() }}</p>
                    </div>
                  }

                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </span>
                    <input [type]="showPwd ? 'text' : 'password'"
                           [(ngModel)]="confirmPassword" name="confirmPwd"
                           placeholder="Confirmer le mot de passe"
                           class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                           [class.border-red-400]="confirmPassword && newPassword !== confirmPassword">
                  </div>
                  @if (confirmPassword && newPassword !== confirmPassword) {
                    <p class="text-red-500 text-xs">Les mots de passe ne correspondent pas</p>
                  }
                </div>
              }

              @if (errorMsg) {
                <p class="text-red-500 text-xs text-center">{{ errorMsg }}</p>
              }

              <button type="button" (click)="saveNew()"
                      [disabled]="loading || !canSaveNew()"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Enregistrement…
                } @else {
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Enregistrer
                }
              </button>
            </div>
          }

        </div>
      </div>

      <!-- Toast succès -->
      @if (showSuccessToast) {
        <div class="fixed bottom-6 right-6 z-50 bg-white border border-green-200 rounded-2xl shadow-xl
                    p-4 flex items-center gap-3 max-w-xs animate-bounce-once">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-500">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-secondary">
              {{ inputMode === 'phone' ? 'PIN mis à jour avec succès !' : 'Mot de passe mis à jour avec succès !' }}
            </p>
            <p class="text-xs text-secondary-gray mt-0.5">Vous pouvez maintenant vous connecter</p>
          </div>
        </div>
      }

    </div>
  `,
  styles: []
})
export class ForgotPasswordComponent {
  step: Step = 'identifiant';
  inputMode: InputMode = 'phone';

  // Étape 1
  phoneInput = '';
  emailInput = '';
  errorMsg = '';
  loading = false;

  // Étape 2
  otpDigits = ['', '', '', '', '', ''];
  mockOtp = '';
  cooldown = 0;

  // Étape 3 — téléphone (nouveau PIN)
  newPinDigits     = ['', '', '', ''];
  confirmPinDigits = ['', '', '', ''];

  // Étape 3 — email (nouveau mot de passe)
  newPassword = '';
  confirmPassword = '';
  showPwd = false;

  // Toast
  showSuccessToast = false;

  // ── Données mock ────────────────────────────────────────────
  demoPhones = [
    { label: 'Client',    display: '07 07 07 07 07', phone: '0707070707' },
    { label: 'Pro',       display: '05 05 05 05 05', phone: '0505050505' },
    { label: 'Admin',     display: '01 01 01 01 01', phone: '0101010101' },
    { label: 'Orange',    display: '07 11 22 33 44', phone: '0711223344' },
    { label: 'MTN',       display: '05 66 77 88 99', phone: '0566778899' },
  ];

  demoEmails = [
    { label: 'client@sefaizo.ci',           email: 'client@sefaizo.ci'           },
    { label: 'pro@sefaizo.ci',              email: 'pro@sefaizo.ci'              },
    { label: 'admin@sefaizo.ci',            email: 'admin@sefaizo.ci'            },
    { label: 'aminata.kouassi@gmail.com',   email: 'aminata.kouassi@gmail.com'   },
    { label: 'jean.koffi@sefaizo.ci',       email: 'jean.koffi@sefaizo.ci'       },
  ];

  // Téléphones connus dans le mock
  private knownPhones = new Set([
    '0707070707','0505050505','0101010101',
    '0711223344','0566778899','0133445566','0799001122',
    '0722334455','0588990011','0144556677','0700112233',
  ]);

  // Emails connus dans le mock
  private knownEmails = new Set([
    'client@sefaizo.ci','pro@sefaizo.ci','admin@sefaizo.ci',
    'aminata.kouassi@gmail.com','fatou.diallo@yahoo.fr',
    'marie.ekra@outlook.com','bintou.traore@sefaizo.ci',
    'jean.koffi@sefaizo.ci','moussa.ouattara@gmail.com',
    'awa.soro@beaute-ci.com','issouf.coulibaly@gmail.com',
  ]);

  // Stepper
  stepperDef = [
    { id: 1, key: 'identifiant' as Step, label: 'Email' },
    { id: 2, key: 'code'        as Step, label: 'Code'  },
    { id: 3, key: 'nouveau'     as Step, label: 'Nouveau MDP' },
  ];

  leftItems = [
    { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', label: 'Récupération sécurisée', sub: 'Vérification par OTP avant tout changement' },
    { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Aucun accès non autorisé', sub: 'Code à usage unique envoyé sur votre appareil' },
    { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99', label: 'Réinitialisation simple', sub: 'Nouveau PIN ou mot de passe en 3 étapes' },
  ];

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  // ── Helpers ─────────────────────────────────────────────────
  stepIdx(): number { return { identifiant: 1, code: 2, nouveau: 3 }[this.step]; }
  otpVal(): string  { return this.otpDigits.join(''); }
  newPinVal(): string     { return this.newPinDigits.join(''); }
  confirmPinVal(): string { return this.confirmPinDigits.join(''); }

  pwdStrength(): number {
    const p = this.newPassword; if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p) || p.length >= 12) s++;
    return Math.max(1, s);
  }
  pwdLabel(): string { return ['','Faible','Moyen','Fort'][this.pwdStrength()]; }
  pwdColor(): string { return ['','#ef4444','#f59e0b','#22c55e'][this.pwdStrength()]; }

  fmtPhone(e: Event): void {
    const el = e.target as HTMLInputElement;
    const d = el.value.replace(/\D/g, '').slice(0, 10);
    this.phoneInput = d; el.value = d;
  }

  canSend(): boolean {
    if (this.inputMode === 'phone') return this.phoneInput.replace(/\s/g,'').length === 10;
    return this.emailInput.includes('@');
  }

  canSaveNew(): boolean {
    if (this.inputMode === 'phone')
      return this.newPinVal().length === 4 && this.newPinVal() === this.confirmPinVal();
    return this.newPassword.length >= 6 && this.newPassword === this.confirmPassword;
  }

  // ── Étape 1 : Envoi du code ──────────────────────────────────
  sendCode(): void {
    this.errorMsg = '';
    const clean = this.phoneInput.replace(/\s/g, '');

    if (this.inputMode === 'phone' && !this.knownPhones.has(clean)) {
      this.errorMsg = 'Numéro non reconnu dans notre base.';
      return;
    }
    if (this.inputMode === 'email' && !this.knownEmails.has(this.emailInput.trim().toLowerCase())) {
      this.errorMsg = 'Email non reconnu dans notre base.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      const dest = this.inputMode === 'phone' ? `+225 ${this.phoneInput}` : this.emailInput;
      this.toast.success(`Code envoyé à ${dest} (démo : ${this.mockOtp})`);
      this.step = 'code';
      this.loading = false;
      this.startCooldown();
    }, 800);
  }

  // ── Étape 2 : OTP ───────────────────────────────────────────
  onOtpInput(e: Event, i: number): void {
    const el = e.target as HTMLInputElement;
    const v = el.value.replace(/\D/g, '').slice(-1);
    this.otpDigits[i] = v; el.value = v;
    if (v && i < 5) (el.nextElementSibling as HTMLInputElement)?.focus();
  }
  onOtpKeydown(e: KeyboardEvent, i: number): void {
    if (e.key === 'Backspace' && !this.otpDigits[i] && i > 0)
      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
  }
  onOtpPaste(e: ClipboardEvent): void {
    e.preventDefault();
    const p = e.clipboardData?.getData('text').replace(/\D/g,'').slice(0,6) ?? '';
    p.split('').forEach((c, i) => { if (i < 6) this.otpDigits[i] = c; });
  }

  verifyCode(): void {
    this.errorMsg = '';
    if (this.otpVal() !== this.mockOtp) {
      this.errorMsg = 'Code incorrect. Vérifiez le code reçu.';
      this.otpDigits = ['','','','','',''];
      return;
    }
    this.toast.success('Code vérifié ✓');
    this.step = 'nouveau';
  }

  resendCode(): void {
    this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
    this.toast.success(`Nouveau code envoyé (démo : ${this.mockOtp})`);
    this.otpDigits = ['','','','','',''];
    this.startCooldown();
  }

  backToIdentifiant(): void {
    this.step = 'identifiant';
    this.errorMsg = '';
    this.otpDigits = ['', '', '', '', '', ''];
  }

  startCooldown(): void {
    this.cooldown = 30;
    const t = setInterval(() => { if (--this.cooldown <= 0) clearInterval(t); }, 1000);
  }

  // ── Étape 3 : Nouveau PIN ────────────────────────────────────
  onNewPinInput(e: Event, i: number): void {
    const el = e.target as HTMLInputElement;
    const v = el.value.replace(/\D/g,'').slice(-1);
    this.newPinDigits[i] = v; el.value = v;
    if (v && i < 3) (el.nextElementSibling as HTMLInputElement)?.focus();
  }
  onNewPinKeydown(e: KeyboardEvent, i: number): void {
    if (e.key === 'Backspace' && !this.newPinDigits[i] && i > 0)
      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
  }

  onConfirmPinInput(e: Event, i: number): void {
    const el = e.target as HTMLInputElement;
    const v = el.value.replace(/\D/g,'').slice(-1);
    this.confirmPinDigits[i] = v; el.value = v;
    if (v && i < 3) (el.nextElementSibling as HTMLInputElement)?.focus();
  }
  onConfirmPinKeydown(e: KeyboardEvent, i: number): void {
    if (e.key === 'Backspace' && !this.confirmPinDigits[i] && i > 0)
      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
  }

  // ── Enregistrement ──────────────────────────────────────────
  saveNew(): void {
    this.errorMsg = '';
    if (!this.canSaveNew()) return;
    this.loading = true;

    setTimeout(() => {
      // Simulation : mise à jour mock
      if (this.inputMode === 'phone') {
        const clean = this.phoneInput.replace(/\s/g,'');
        localStorage.setItem(`pin_reset_${clean}`, this.newPinVal());
      } else {
        const email = this.emailInput.trim().toLowerCase();
        localStorage.setItem(`pwd_reset_${email}`, this.newPassword);
      }

      this.loading = false;
      this.showSuccessToast = true;

      setTimeout(() => {
        this.showSuccessToast = false;
        this.router.navigate(['/auth/login']);
      }, 2500);
    }, 1000);
  }
}
