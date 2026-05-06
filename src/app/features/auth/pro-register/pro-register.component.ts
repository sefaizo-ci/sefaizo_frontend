import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';

type Step = 'compte' | 'verification' | 'profil';

@Component({
  selector: 'app-pro-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex">

      <!-- ═══════════════ PANNEAU GAUCHE ═══════════════ -->
      <div class="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col"
           style="background:linear-gradient(160deg,#0e0620 0%,#1c0d3a 45%,#2a1555 100%)">

        <div class="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
             style="background:radial-gradient(circle,#7c3aed,transparent)"></div>
        <div class="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-15"
             style="background:radial-gradient(circle,#a855f7,transparent)"></div>
        <div class="absolute top-1/3 right-0 w-64 h-64 rounded-full opacity-10 translate-x-1/3"
             style="background:radial-gradient(circle,#c084fc,transparent)"></div>

        <div class="absolute bottom-0 right-0 w-[55%] h-[78%] pointer-events-none overflow-hidden">
          <img src="/img portailles/register.jpg"
               alt="" class="w-full h-full object-cover object-top"
               style="mix-blend-mode:luminosity;opacity:.38;
                      mask-image:linear-gradient(to left,rgba(0,0,0,.85) 30%,transparent 100%);
                      -webkit-mask-image:linear-gradient(to left,rgba(0,0,0,.85) 30%,transparent 100%)">
        </div>

        <div class="relative z-10 flex flex-col h-full px-12 py-10">
          <a href="/"><img src="/Splash.png" alt="SEFAIZO" class="h-10 w-auto brightness-0 invert"></a>

          <div class="flex-1 flex flex-col justify-center py-8">
            <div class="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-semibold self-start"
                 style="background:rgba(255,255,255,.12);color:#c084fc">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Espace Professionnel
            </div>

            <h1 class="text-4xl font-bold text-white leading-tight mb-2">
              Développez votre<br>
              <span class="text-purple-300">activité beauté</span><br>
              avec SEFAIZO
            </h1>
            <p class="text-white/40 text-sm mb-8 mt-2">+500 professionnels actifs à Abidjan</p>

            <div class="grid grid-cols-2 gap-3 mb-8">
              @for (stat of stats; track stat.val) {
                <div class="rounded-xl p-4" style="background:rgba(255,255,255,.08)">
                  <div class="text-2xl font-bold text-white mb-0.5">{{ stat.val }}</div>
                  <div class="text-xs text-white/45">{{ stat.label }}</div>
                </div>
              }
            </div>

            <ul class="space-y-4">
              @for (item of leftItems; track item.label) {
                <li class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                       style="background:rgba(255,255,255,.12)">
                    <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
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

          <div class="flex items-center gap-3 pb-2">
            <div class="flex -space-x-2">
              @for (av of proAvatars; track av) {
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
              <p class="text-white/40 text-xs">4.8/5 · satisfaction professionnels</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════ PANNEAU DROIT ═══════════════ -->
      <div class="flex-1 flex items-center justify-center px-8 py-8 bg-white overflow-y-auto">
        <div class="w-full max-w-[430px]">

          <div class="flex flex-col items-center mb-6">
            <img src="/Splash.png" alt="SEFAIZO" class="h-9 mb-5">

            <div class="flex items-center gap-1 mb-5 w-full justify-center">
              @for (s of stepperDef; track s.id; let i = $index) {
                <div class="flex items-center gap-1">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                       [style.background]="stepIndex() >= s.id ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : '#f3f4f6'"
                       [style.color]="stepIndex() >= s.id ? 'white' : '#9ca3af'">
                    @if (stepIndex() > s.id) {
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    } @else { {{ s.id }} }
                  </div>
                  <span class="text-xs"
                        [style.color]="stepIndex() >= s.id ? '#7c3aed' : '#9ca3af'"
                        [style.font-weight]="step === s.key ? '600' : '400'">
                    {{ s.label }}
                  </span>
                  @if (i < stepperDef.length - 1) {
                    <div class="w-8 h-px mx-1" [style.background]="stepIndex() > s.id ? '#7c3aed' : '#e5e7eb'"></div>
                  }
                </div>
              }
            </div>

            <h2 class="text-2xl font-bold text-secondary">Inscrire mon activité</h2>
            <p class="text-secondary-gray text-sm mt-1">
              @if (step === 'compte') { Entrez votre numéro de téléphone professionnel }
              @else if (step === 'verification') { Vérifiez votre numéro de téléphone }
              @else { Informations de votre salon / activité }
            </p>
          </div>

          <!-- ── ÉTAPE 1 : TÉLÉPHONE + PIN ── -->
          @if (step === 'compte') {
            <div class="space-y-4">

              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-1.5">Numéro de téléphone professionnel</label>
                <div class="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                  <div class="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                    <span class="text-lg leading-none">🇨🇮</span>
                    <span class="text-sm font-semibold text-secondary">+225</span>
                  </div>
                  <input type="tel" [(ngModel)]="phone" name="phone" maxlength="10"
                         placeholder="07 00 00 00 00" (input)="fmtPhone($event)"
                         class="flex-1 px-4 py-3 text-sm text-secondary placeholder-gray-400 focus:outline-none bg-white">
                </div>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  @for (d of demoPhones; track d.phone) {
                    <button type="button" (click)="fillPhone(d)"
                            class="text-xs px-2.5 py-1 rounded-lg border border-dashed transition-all hover:border-purple-400 hover:text-purple-600"
                            [class]="phone === d.phone ? 'border-purple-500 text-purple-600 bg-purple-50' : 'border-gray-300 text-gray-500'">
                      {{ d.label }} · {{ d.display }}
                    </button>
                  }
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-1.5">
                  Créez votre code PIN à 4 chiffres
                  <span class="text-gray-400 font-normal ml-1">(connexions futures)</span>
                </label>
                <div class="flex gap-3">
                  @for (d of pinDigits; track $index; let i = $index) {
                    <input type="password" maxlength="1" inputmode="numeric"
                           [value]="pinDigits[i]"
                           (input)="onPinInput($event, i)"
                           (keydown)="onPinKeydown($event, i)"
                           class="text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                           style="width:52px;height:52px"
                           [style.border-color]="pinDigits[i] ? '#7c3aed' : '#e5e7eb'"
                           [style.background]="pinDigits[i] ? '#faf5ff' : 'white'">
                  }
                </div>
              </div>

              @if (errorMsg) {
                <p class="text-red-500 text-xs flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ errorMsg }}
                </p>
              }

              <button type="button" (click)="goToStep2()"
                      [disabled]="loading || !canGoStep2()"
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
                  Continuer — Recevoir l'OTP
                }
              </button>

              <p class="text-center text-xs text-secondary-gray">
                Déjà un compte ?
                <a routerLink="/auth/login" class="font-semibold hover:underline ml-1" style="color:#7c3aed">Se connecter</a>
              </p>
              <p class="text-center">
                <a routerLink="/auth/register" class="text-xs text-secondary-gray hover:text-secondary inline-flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Choisir un autre type de compte
                </a>
              </p>
            </div>
          }

          <!-- ── ÉTAPE 2 : VÉRIFICATION OTP ── -->
          @if (step === 'verification') {
            <div class="space-y-5">
              <div class="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                <div class="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                     style="background:linear-gradient(135deg,#7c3aed22,#a855f722)">
                  <svg class="w-6 h-6" style="color:#7c3aed" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <p class="text-sm text-secondary">
                  Code OTP envoyé au<br>
                  <strong style="color:#7c3aed">+225 {{ phone }}</strong>
                </p>
              </div>

              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-3 text-center">Code à 6 chiffres</label>
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
              </div>

              @if (mockOtp) {
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p class="text-xs text-amber-800">
                    💡 Code démo : <strong class="font-mono text-sm">{{ mockOtp }}</strong>
                  </p>
                </div>
              }

              @if (errorMsg) { <p class="text-red-500 text-xs text-center">{{ errorMsg }}</p> }

              <button type="button" (click)="submitOtp()"
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
                } @else { Vérifier le code }
              </button>

              <div class="flex justify-between items-center text-sm">
                <button type="button" (click)="step = 'compte'; errorMsg = ''"
                        class="text-secondary-gray hover:text-secondary flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Retour
                </button>
                <button type="button" (click)="resendOtp()" [disabled]="otpCooldown > 0"
                        class="font-medium disabled:opacity-40" style="color:#7c3aed">
                  @if (otpCooldown > 0) { Renvoyer dans {{ otpCooldown }}s } @else { Renvoyer }
                </button>
              </div>
            </div>
          }

          <!-- ── ÉTAPE 3 : PROFIL PRO ── -->
          @if (step === 'profil') {
            <form (ngSubmit)="submitProfil()" class="space-y-3">

              <div class="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="text-xs text-green-700 font-medium">Numéro +225 {{ phone }} vérifié ✓</p>
              </div>

              <!-- Type d'activité -->
              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-1.5">Type d'activité</label>
                <div class="grid grid-cols-3 gap-2">
                  @for (bt of bizTypes; track bt.value) {
                    <button type="button" (click)="setBizType(bt.value)"
                            class="py-2.5 rounded-xl border text-xs font-medium transition-all text-center"
                            [style.border-color]="profil.bizType === bt.value ? '#7c3aed' : '#e5e7eb'"
                            [style.background]="profil.bizType === bt.value ? '#f5f0ff' : 'white'"
                            [style.color]="profil.bizType === bt.value ? '#7c3aed' : '#6b7280'">
                      {{ bt.label }}
                    </button>
                  }
                </div>
              </div>

              <!-- Nom du salon -->
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </span>
                <input type="text" [(ngModel)]="profil.bizName" name="bizName" required
                       placeholder="Nom de votre salon / activité"
                       class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
              </div>

              <!-- Prénom + Nom -->
              <div class="grid grid-cols-2 gap-3">
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input type="text" [(ngModel)]="profil.firstName" name="firstName" required
                         placeholder="Prénom"
                         class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                </div>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input type="text" [(ngModel)]="profil.lastName" name="lastName" required
                         placeholder="Nom"
                         class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                </div>
              </div>

              <!-- Email professionnel -->
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <input type="email" [(ngModel)]="profil.email" name="profilEmail" required
                       placeholder="Email professionnel *"
                       class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
              </div>

              <!-- Commune -->
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </span>
                <select [(ngModel)]="profil.city" name="city" required
                        class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
                        [class.text-gray-400]="!profil.city">
                  <option value="" disabled>Commune d'activité *</option>
                  @for (c of communes; track c) { <option [value]="c">{{ c }}</option> }
                </select>
              </div>

              <!-- Spécialités -->
              <div>
                <label class="block text-xs font-medium text-secondary-gray mb-1.5">Spécialités</label>
                <div class="flex flex-wrap gap-1.5">
                  @for (svc of serviceOptions; track svc) {
                    <button type="button" (click)="toggleSvc(svc)"
                            class="px-3 py-1.5 rounded-xl border text-xs font-medium transition-all"
                            [style.border-color]="isSvcSelected(svc) ? '#7c3aed' : '#e5e7eb'"
                            [style.background]="isSvcSelected(svc) ? '#f5f0ff' : 'white'"
                            [style.color]="isSvcSelected(svc) ? '#7c3aed' : '#6b7280'">
                      {{ svc }}
                    </button>
                  }
                </div>
              </div>

              <!-- Upload pièce d'identité -->
              <div class="rounded-2xl p-4" style="background:#faf5ff;border:1px dashed #c4b5fd">
                <div class="flex items-start gap-2.5 mb-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                       style="background:white;border:1px solid #e5e7eb">
                    <svg class="w-4 h-4" style="color:#a855f7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-bold" style="color:#7c3aed">Pièce d'identité
                      <span class="font-normal ml-1 px-1.5 py-0.5 rounded-full text-xs"
                            style="background:#ede9fe;color:#9ca3af">Optionnel</span>
                    </p>
                    <p class="text-xs mt-0.5" style="color:#9ca3af">
                      Accélérez votre validation en joignant dès maintenant votre CNI ou passeport
                    </p>
                  </div>
                </div>
                @if (idDocName) {
                  <div class="flex items-center gap-2 px-3 py-2 rounded-xl mb-2"
                       style="background:white;border:1px solid #e5e7eb">
                    <svg class="w-4 h-4 flex-shrink-0" style="color:#a855f7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-xs flex-1 truncate" style="color:#374151">{{ idDocName }}</span>
                    <button type="button" (click)="idDocName=''; idDocFile=null"
                            class="text-xs" style="color:#9ca3af">✕</button>
                  </div>
                }
                <label class="flex items-center gap-2 cursor-pointer">
                  <div class="flex-1 px-3 py-2 rounded-xl text-xs"
                       style="background:white;border:1px solid #e5e7eb;color:#9ca3af">
                    {{ idDocName || 'Choisir un fichier (JPG, PNG, PDF)' }}
                  </div>
                  <span class="px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0"
                        style="background:#a855f7;color:white">Parcourir</span>
                  <input type="file" accept="image/*,.pdf" class="hidden" (change)="onIdDocChange($event)">
                </label>
              </div>

              <!-- CGU -->
              <label class="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" [(ngModel)]="acceptTerms" name="terms"
                       class="mt-0.5 w-4 h-4 rounded accent-purple-600 flex-shrink-0">
                <span class="text-xs text-secondary-gray leading-relaxed">
                  J'accepte les
                  <a href="/conditions" target="_blank" class="font-medium hover:underline" style="color:#7c3aed">Conditions d'utilisation</a>
                  et la
                  <a href="/confidentialite" target="_blank" class="font-medium hover:underline" style="color:#7c3aed">Politique de confidentialité</a>
                </span>
              </label>

              @if (errorMsg) { <p class="text-red-500 text-xs text-center">{{ errorMsg }}</p> }

              <button type="submit"
                      [disabled]="loading || !canSubmitProfil()"
                      class="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)">
                @if (loading) {
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Création…
                } @else {
                  Créer mon compte pro
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                }
              </button>

              <button type="button" (click)="step = 'verification'; errorMsg = ''"
                      class="w-full text-center text-xs text-secondary-gray hover:text-secondary flex items-center justify-center gap-1 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </form>
          }

        </div>
      </div>

      <!-- Toast sécurité -->
      @if (showToast) {
        <div class="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 flex items-start gap-3 max-w-xs">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
               style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-xs font-semibold text-secondary">Vos données sont protégées</p>
            <p class="text-xs text-secondary-gray mt-0.5">Chiffrement SSL · Conforme RGPD</p>
          </div>
          <button (click)="showToast = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ProRegisterComponent {
  step: Step = 'compte';
  loading = false;
  showToast = true;
  errorMsg = '';

  phone = '';
  pinDigits = ['', '', '', ''];
  otpDigits = ['', '', '', '', '', ''];
  mockOtp = '';
  otpCooldown = 0;

  profil = {
    bizType: 'SALON' as 'SALON' | 'FREELANCE' | 'HYBRID',
    bizName: '', firstName: '', lastName: '', email: '', city: ''
  };
  selectedServices: string[] = [];
  acceptTerms = false;
  idDocName = '';
  idDocFile: File | null = null;

  communes = ['Cocody','Plateau','Yopougon','Marcory','Treichville','Adjamé','Abobo','Port-Bouët','Attécoubé','Koumassi'];
  serviceOptions = ['Coiffure','Esthétique','Manucure','Pédicure','Barbier','Maquillage','Soins du visage','Massage'];
  bizTypes = [{ value: 'SALON', label: 'Salon' }, { value: 'FREELANCE', label: 'Freelance' }, { value: 'HYBRID', label: 'Hybride' }];
  stats = [{ val: '500+', label: 'Professionnels actifs' }, { val: '8 000+', label: 'Clientes satisfaites' }];

  demoPhones = [
    { label: 'Orange',  display: '07 22 33 44 55', phone: '0722334455', pin: '1234' },
    { label: 'MTN',     display: '05 88 99 00 11', phone: '0588990011', pin: '5678' },
    { label: 'Moov',    display: '01 44 55 66 77', phone: '0144556677', pin: '9012' },
    { label: 'Wave',    display: '07 00 11 22 33', phone: '0700112233', pin: '3456' },
  ];

  leftItems = [
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: "Gestion d'agenda simplifiée", sub: 'Réservations en temps réel' },
    { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Paiements sécurisés et rapides', sub: 'Mobile Money intégré' },
    { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Statistiques détaillées', sub: 'Suivez votre performance' },
  ];

  proAvatars = ['/avatars/Moussa Ouattara.jpg', '/avatars/Issouf Coulibaly.jpg', '/avatars/clarisse-yao.jpg', '/avatars/mariam-bamba.jpg'];
  stepperDef = [
    { id: 1, key: 'compte' as Step, label: 'Compte' },
    { id: 2, key: 'verification' as Step, label: 'Vérification' },
    { id: 3, key: 'profil' as Step, label: 'Profil' },
  ];

  constructor(private authService: AuthService, private toast: ToastService, private router: Router) {}

  stepIndex(): number { return { compte: 1, verification: 2, profil: 3 }[this.step]; }
  otpVal(): string { return this.otpDigits.join(''); }
  pinVal(): string { return this.pinDigits.join(''); }
  cleanPhone(): string { return this.phone.replace(/\s/g, ''); }

  fillPhone(d: { phone: string; pin: string }): void {
    this.phone = d.phone;
    const digits = d.pin.split('');
    this.pinDigits = [digits[0] ?? '', digits[1] ?? '', digits[2] ?? '', digits[3] ?? ''];
    this.errorMsg = '';
  }

  fmtPhone(e: Event): void {
    const el = e.target as HTMLInputElement;
    const d = el.value.replace(/\D/g, '').slice(0, 10);
    this.phone = d; el.value = d;
  }

  onPinInput(e: Event, i: number): void {
    const el = e.target as HTMLInputElement;
    const v = el.value.replace(/\D/g, '').slice(-1);
    this.pinDigits[i] = v; el.value = v;
    if (v && i < 3) (el.nextElementSibling as HTMLInputElement)?.focus();
  }
  onPinKeydown(e: KeyboardEvent, i: number): void {
    if (e.key === 'Backspace' && !this.pinDigits[i] && i > 0)
      ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
  }

  setBizType(v: string): void { this.profil.bizType = v as 'SALON' | 'FREELANCE' | 'HYBRID'; }
  toggleSvc(s: string): void { const i = this.selectedServices.indexOf(s); i >= 0 ? this.selectedServices.splice(i, 1) : this.selectedServices.push(s); }
  isSvcSelected(s: string): boolean { return this.selectedServices.includes(s); }

  onIdDocChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) { this.idDocName = file.name; this.idDocFile = file; }
  }

  canGoStep2(): boolean {
    return this.cleanPhone().length === 10 && this.pinVal().length === 4;
  }

  canSubmitProfil(): boolean {
    return !!(this.profil.bizName && this.profil.firstName && this.profil.lastName && this.profil.city && this.profil.email && this.acceptTerms);
  }

  goToStep2(): void {
    this.errorMsg = '';
    this.loading = true;
    setTimeout(() => {
      this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.toast.success(`OTP envoyé au +225 ${this.phone} (démo : ${this.mockOtp})`);
      this.step = 'verification';
      this.loading = false;
      this.startCooldown();
    }, 700);
  }

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
    const p = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) ?? '';
    p.split('').forEach((c, i) => { if (i < 6) this.otpDigits[i] = c; });
  }

  submitOtp(): void {
    this.errorMsg = '';
    if (this.otpVal() !== this.mockOtp) {
      this.errorMsg = 'Code OTP incorrect. Vérifiez le code reçu.';
      this.otpDigits = ['','','','','',''];
      return;
    }
    this.toast.success('Numéro vérifié ✓');
    this.step = 'profil';
  }

  resendOtp(): void {
    this.mockOtp = String(Math.floor(100000 + Math.random() * 900000));
    this.toast.success(`Nouveau code (démo : ${this.mockOtp})`);
    this.otpDigits = ['','','','','',''];
    this.startCooldown();
  }

  startCooldown(): void {
    this.otpCooldown = 60;
    const t = setInterval(() => { if (--this.otpCooldown <= 0) clearInterval(t); }, 1000);
  }

  submitProfil(): void {
    if (!this.canSubmitProfil()) return;
    this.loading = true;
    this.errorMsg = '';

    this.authService.register({
      email: this.profil.email,
      password: 'password123',
      firstName: this.profil.firstName,
      lastName: this.profil.lastName,
      phone: `+225${this.cleanPhone()}`,
      role: 'PRO'
    }).then(() => {
      localStorage.setItem('pro_business_name', this.profil.bizName);
      localStorage.setItem('pro_business_type', this.profil.bizType);
      localStorage.setItem('pro_city', this.profil.city);
      localStorage.setItem('pro_services', JSON.stringify(this.selectedServices));
      this.toast.success('Compte professionnel créé ! Bienvenue sur SEFAIZO 🎉');
      this.router.navigate(['/espace-pro']);
    }).catch(() => {
      this.authService.login('pro@sefaizo.ci', 'password123').then(() => {
        this.toast.success('Compte créé ! (mode démo)');
        this.router.navigate(['/espace-pro']);
      });
    });
  }
}
