import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-ca-marche',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ══════════════════════════════════════════
         HERO
    ══════════════════════════════════════════ -->
    <section class="relative overflow-hidden py-20 md:py-28 text-center"
             style="background:linear-gradient(135deg,#0e0620 0%,#1c0d3a 50%,#2a1555 100%)">
      <!-- Orbes -->
      <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-25"
           style="background:radial-gradient(circle,#7c3aed,transparent);filter:blur(60px)"></div>
      <div class="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-20"
           style="background:radial-gradient(circle,#a855f7,transparent);filter:blur(50px)"></div>

      <div class="container-custom relative z-10 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
             style="background:rgba(124,58,237,0.2);border-color:rgba(168,85,247,0.4);color:#c084fc">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Guide de la plateforme
        </div>

        <h1 class="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
          Comment fonctionne<br>
          <span style="background:linear-gradient(90deg,#a78bfa,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
            SEFAIZO ?
          </span>
        </h1>
        <p class="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
          La plateforme qui connecte les clients aux meilleurs professionnels de beauté d'Abidjan —
          en quelques clics, en toute confiance.
        </p>

        <!-- Tabs Client / Pro -->
        <div class="inline-flex p-1 rounded-2xl gap-1" style="background:rgba(255,255,255,0.1)">
          <button (click)="activeTab.set('client')"
                  class="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  [style.background]="activeTab() === 'client' ? 'white' : 'transparent'"
                  [style.color]="activeTab() === 'client' ? '#7c3aed' : 'rgba(255,255,255,0.7)'">
            Je suis client(e)
          </button>
          <button (click)="activeTab.set('pro')"
                  class="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  [style.background]="activeTab() === 'pro' ? 'white' : 'transparent'"
                  [style.color]="activeTab() === 'pro' ? '#7c3aed' : 'rgba(255,255,255,0.7)'">
            Je suis professionnel(le)
          </button>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         ÉTAPES CLIENT
    ══════════════════════════════════════════ -->
    @if (activeTab() === 'client') {
      <!-- Section étapes -->
      <section class="py-20 md:py-28 bg-white">
        <div class="container-custom max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <p class="text-sm font-bold uppercase tracking-widest mb-3" style="color:#7c3aed">3 étapes simples</p>
            <h2 class="text-3xl md:text-4xl font-black" style="color:#111827">
              Réservez votre beauté en quelques clics
            </h2>
          </div>

          <!-- Étapes -->
          <div class="relative">
            <!-- Ligne connectrice desktop -->
            <div class="hidden md:block absolute top-14 left-1/2 -translate-x-1/2 w-[68%] h-0.5"
                 style="background:linear-gradient(to right,#7c3aed,#a855f7,#7c3aed)"></div>

            <div class="grid md:grid-cols-3 gap-8 md:gap-6">
              @for (step of clientSteps; track step.num) {
                <div class="flex flex-col items-center text-center group">
                  <!-- Cercle numéroté -->
                  <div class="relative mb-6">
                    <div class="w-28 h-28 rounded-3xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2"
                         style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 12px 40px rgba(124,58,237,0.35)">
                      <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="step.icon"/>
                      </svg>
                    </div>
                    <!-- Numéro badge -->
                    <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
                         style="background:#a855f7">{{ step.num }}</div>
                  </div>
                  <h3 class="text-xl font-bold mb-3" style="color:#111827">{{ step.title }}</h3>
                  <p class="text-sm leading-relaxed" style="color:#6b7280;max-width:220px">{{ step.desc }}</p>
                </div>
              }
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center mt-16">
            <a routerLink="/recherche"
               class="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:opacity-90 active:scale-95 shadow-xl"
               style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 8px 32px rgba(124,58,237,0.4)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Trouver un salon maintenant
            </a>
          </div>
        </div>
      </section>

      <!-- Avantages clients -->
      <section class="py-20 md:py-24" style="background:#fafafa">
        <div class="container-custom max-w-5xl mx-auto">
          <div class="text-center mb-14">
            <p class="text-sm font-bold uppercase tracking-widest mb-3" style="color:#7c3aed">Pourquoi SEFAIZO ?</p>
            <h2 class="text-3xl md:text-4xl font-black" style="color:#111827">
              Tout ce dont vous avez besoin
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (adv of clientAdvantages; track adv.title) {
              <div class="bg-white rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
                   style="border:1px solid #f3e8ff;box-shadow:0 4px 20px rgba(124,58,237,0.07)">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                     [style.background]="adv.bg">
                  <svg class="w-6 h-6" [style.color]="adv.color" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="adv.icon"/>
                  </svg>
                </div>
                <h3 class="font-bold text-base mb-2" style="color:#111827">{{ adv.title }}</h3>
                <p class="text-sm leading-relaxed" style="color:#6b7280">{{ adv.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>
    }

    <!-- ══════════════════════════════════════════
         ÉTAPES PROFESSIONNEL
    ══════════════════════════════════════════ -->
    @if (activeTab() === 'pro') {
      <section class="py-20 md:py-28 bg-white">
        <div class="container-custom max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <p class="text-sm font-bold uppercase tracking-widest mb-3" style="color:#7c3aed">4 étapes pour démarrer</p>
            <h2 class="text-3xl md:text-4xl font-black" style="color:#111827">
              Développez votre activité beauté
            </h2>
          </div>

          <div class="space-y-6">
            @for (step of proSteps; track step.num) {
              <div class="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-3xl p-6 md:p-8 transition-all duration-200 hover:-translate-y-0.5"
                   style="border:1px solid #f3e8ff;box-shadow:0 4px 24px rgba(124,58,237,0.08)">
                <!-- Numéro -->
                <div class="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                     style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 8px 24px rgba(124,58,237,0.35)">
                  {{ step.num }}
                </div>
                <!-- Icône -->
                <div class="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                     [style.background]="step.bg">
                  <svg class="w-7 h-7" [style.color]="step.color" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="step.icon"/>
                  </svg>
                </div>
                <!-- Texte -->
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2" style="color:#111827">{{ step.title }}</h3>
                  <p class="text-sm leading-relaxed" style="color:#6b7280">{{ step.desc }}</p>
                </div>
                <!-- Badge durée -->
                <div class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
                     style="background:#f5f0ff;color:#7c3aed">{{ step.time }}</div>
              </div>
            }
          </div>

          <!-- CTA Pro -->
          <div class="text-center mt-16">
            <a routerLink="/auth/register/pro"
               class="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:opacity-90 active:scale-95 shadow-xl"
               style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 8px 32px rgba(124,58,237,0.4)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Créer mon compte professionnel
            </a>
            <p class="mt-3 text-sm" style="color:#9ca3af">Gratuit · Sans engagement · Activation en 24h</p>
          </div>
        </div>
      </section>

      <!-- Avantages pro -->
      <section class="py-20 md:py-24" style="background:#fafafa">
        <div class="container-custom max-w-5xl mx-auto">
          <div class="text-center mb-14">
            <h2 class="text-3xl md:text-4xl font-black" style="color:#111827">
              Tout ce que SEFAIZO vous apporte
            </h2>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            @for (adv of proAdvantages; track adv.title) {
              <div class="flex items-start gap-5 bg-white rounded-2xl p-6"
                   style="border:1px solid #f3e8ff;box-shadow:0 4px 20px rgba(124,58,237,0.07)">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                     [style.background]="adv.bg">
                  <svg class="w-6 h-6" [style.color]="adv.color" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="adv.icon"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-base mb-1.5" style="color:#111827">{{ adv.title }}</h3>
                  <p class="text-sm leading-relaxed" style="color:#6b7280">{{ adv.desc }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    }

    <!-- ══════════════════════════════════════════
         SECTION CONFIANCE (commune aux deux)
    ══════════════════════════════════════════ -->
    <section class="py-20 md:py-24 text-white"
             style="background:linear-gradient(135deg,#0e0620 0%,#1c0d3a 50%,#2a1555 100%)">
      <div class="container-custom max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-4">
            Une plateforme de confiance
          </h2>
          <p class="text-white/50 text-lg">SEFAIZO s'engage pour vous</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-16">
          @for (trust of trustItems; track trust.title) {
            <div class="rounded-2xl p-7 text-center"
                 style="background:rgba(255,255,255,0.07);border:1px solid rgba(168,85,247,0.2)">
              <div class="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                   style="background:rgba(124,58,237,0.3)">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                  <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="trust.icon"/>
                </svg>
              </div>
              <h3 class="font-bold text-lg text-white mb-2">{{ trust.title }}</h3>
              <p class="text-sm leading-relaxed" style="color:rgba(255,255,255,0.55)">{{ trust.desc }}</p>
            </div>
          }
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          @for (stat of stats; track stat.val) {
            <div class="text-center">
              <div class="text-4xl font-black mb-1"
                   style="background:linear-gradient(to bottom,#c084fc,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
                {{ stat.val }}
              </div>
              <div class="text-sm" style="color:rgba(255,255,255,0.5)">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════ -->
    <section class="py-20 md:py-28 bg-white">
      <div class="container-custom max-w-3xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-sm font-bold uppercase tracking-widest mb-3" style="color:#7c3aed">FAQ</p>
          <h2 class="text-3xl md:text-4xl font-black" style="color:#111827">
            Questions fréquentes
          </h2>
        </div>

        <div class="space-y-3">
          @for (faq of faqs; track faq.q; let i = $index) {
            <div class="rounded-2xl overflow-hidden" style="border:1px solid #f3e8ff">
              <button (click)="toggleFaq(i)"
                      class="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                      [style.background]="openFaq() === i ? '#f5f0ff' : 'white'">
                <span class="font-semibold text-sm pr-4" style="color:#111827">{{ faq.q }}</span>
                <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                     [style.background]="openFaq() === i ? '#7c3aed' : '#f3f4f6'"
                     [style.transform]="openFaq() === i ? 'rotate(45deg)' : 'rotate(0)'">
                  <svg class="w-3.5 h-3.5" [style.color]="openFaq() === i ? 'white' : '#9ca3af'"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </div>
              </button>
              @if (openFaq() === i) {
                <div class="px-6 pb-5 pt-1 text-sm leading-relaxed" style="color:#6b7280;background:#f5f0ff">
                  {{ faq.a }}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         CTA FINAL
    ══════════════════════════════════════════ -->
    <section class="py-20 md:py-24" style="background:linear-gradient(135deg,#f5f0ff 0%,#ede9fe 100%)">
      <div class="container-custom max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-black mb-5" style="color:#111827">
          Prêt(e) à commencer ?
        </h2>
        <p class="text-lg mb-10" style="color:#6b7280">
          Rejoignez des milliers de clients et de professionnels qui font confiance à SEFAIZO chaque jour.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/recherche"
             class="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:opacity-90 active:scale-95 shadow-xl"
             style="background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 8px 32px rgba(124,58,237,0.35)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Réserver un service
          </a>
          <a routerLink="/auth/register/pro"
             class="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white border-2"
             style="border-color:#7c3aed;color:#7c3aed;background:white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Devenir partenaire
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class CommentCaMarcheComponent {
  activeTab = signal<'client' | 'pro'>('client');
  openFaq   = signal<number | null>(null);

  toggleFaq(i: number): void {
    this.openFaq.set(this.openFaq() === i ? null : i);
  }

  // ── Étapes client ──────────────────────────────────────
  clientSteps = [
    {
      num: 1,
      title: 'Recherchez votre service',
      desc: 'Entrez le service souhaité (coiffure, massage, manucure…) et votre commune à Abidjan.',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    },
    {
      num: 2,
      title: 'Choisissez votre salon',
      desc: 'Comparez les salons par note, prix et disponibilité. Consultez les avis clients vérifiés.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      num: 3,
      title: 'Réservez & profitez',
      desc: 'Confirmez votre créneau, payez en toute sécurité par Mobile Money et recevez votre confirmation.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  clientAdvantages = [
    { title: 'Réservation instantanée', desc: 'Réservez 24h/24, 7j/7 sans attendre un appel ni un message.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', bg: '#f5f0ff', color: '#7c3aed' },
    { title: 'Salons vérifiés', desc: 'Chaque professionnel est contrôlé et validé par notre équipe avant publication.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', bg: '#f0fdf4', color: '#16a34a' },
    { title: 'Avis authentiques', desc: 'Les notes et commentaires viennent uniquement de clients ayant réellement visité le salon.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', bg: '#fefce8', color: '#ca8a04' },
    { title: 'Service à domicile', desc: 'Certains professionnels se déplacent chez vous. Filtrez par "à domicile" pour les trouver.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', bg: '#fff7ed', color: '#ea580c' },
    { title: 'Paiement sécurisé', desc: 'Orange Money, MTN MoMo, Wave ou paiement en espèces sur place. Vous choisissez.', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', bg: '#f0fdf4', color: '#16a34a' },
    { title: 'Rappels automatiques', desc: 'Recevez une notification SMS avant votre rendez-vous pour ne jamais oublier.', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', bg: '#faf5ff', color: '#9333ea' }
  ];

  // ── Étapes pro ──────────────────────────────────────────
  proSteps = [
    {
      num: 1,
      title: 'Créez votre compte professionnel',
      desc: 'Inscrivez-vous avec votre numéro de téléphone ou votre email. Le processus prend moins de 5 minutes.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      bg: '#f5f0ff', color: '#7c3aed', time: '5 min'
    },
    {
      num: 2,
      title: 'Configurez votre boutique',
      desc: 'Ajoutez vos photos, services, tarifs, horaires d\'ouverture et zones de déplacement. Votre vitrine est personnalisable à 100%.',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      bg: '#f0fdf4', color: '#16a34a', time: '15 min'
    },
    {
      num: 3,
      title: 'Passez la vérification KYC',
      desc: 'Soumettez votre pièce d\'identité pour être certifié. Vos clients verront le badge "Vérifié" sur votre profil — gage de confiance.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      bg: '#fefce8', color: '#ca8a04', time: '24h'
    },
    {
      num: 4,
      title: 'Recevez des réservations et gérez tout',
      desc: 'Votre agenda, vos revenus, vos clients — tout est centralisé dans votre espace pro. Recevez des paiements directement sur votre Mobile Money.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      bg: '#fff7ed', color: '#ea580c', time: 'En continu'
    }
  ];

  proAdvantages = [
    { title: 'Visibilité maximale en ligne', desc: 'Votre salon apparaît dans les résultats de recherche et dans les recommandations pour des milliers de clientes à Abidjan.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', bg: '#f5f0ff', color: '#7c3aed' },
    { title: 'Agenda intelligent', desc: 'Gérez vos créneaux, confirmez ou refusez les RDV, évitez les doublons. Tout depuis votre smartphone.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', bg: '#f0fdf4', color: '#16a34a' },
    { title: 'Paiements automatisés', desc: 'Encaissez via Mobile Money. Vos gains sont crédités sur votre wallet SEFAIZO et reversables à la demande sous 48h.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', bg: '#fefce8', color: '#ca8a04' },
    { title: 'Statistiques & analytics', desc: 'Suivez vos revenus, vos clients fidèles, vos services les plus réservés. Prenez de meilleures décisions.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', bg: '#fff7ed', color: '#ea580c' }
  ];

  // ── Confiance ─────────────────────────────────────────
  trustItems = [
    { title: 'Données sécurisées', desc: 'Vos informations personnelles sont chiffrées et protégées. Aucune donnée n\'est revendue à des tiers.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Support local 24/7', desc: 'Une équipe basée à Abidjan répond à vos questions par chat, email ou téléphone à tout moment.', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
    { title: 'Remboursement garanti', desc: 'Si votre rendez-vous est annulé par le professionnel, vous êtes remboursé(e) intégralement sous 24h.', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' }
  ];

  stats = [
    { val: '500+',  label: 'Professionnels actifs' },
    { val: '8 000+', label: 'Clientes satisfaites' },
    { val: '4.8/5', label: 'Note moyenne' },
    { val: '10',    label: 'Communes couvertes' }
  ];

  // ── FAQ ───────────────────────────────────────────────
  faqs = [
    { q: 'Est-ce que SEFAIZO est gratuit pour les clients ?', a: 'Oui, totalement gratuit. Vous ne payez que le service réservé, directement au professionnel. Aucun frais supplémentaire de notre part.' },
    { q: 'Comment sont sélectionnés les professionnels sur la plateforme ?', a: 'Chaque professionnel passe par un processus de vérification KYC (pièce d\'identité, licence si applicable). Seuls les profils validés reçoivent le badge "Vérifié".' },
    { q: 'Puis-je annuler ma réservation ?', a: 'Oui. Vous pouvez annuler jusqu\'à 2h avant votre rendez-vous sans frais. Au-delà, des frais d\'annulation peuvent s\'appliquer selon la politique du salon.' },
    { q: 'Quels moyens de paiement sont acceptés ?', a: 'Orange Money, MTN MoMo, Wave, Moov Money et paiement en espèces sur place. Le choix dépend du salon sélectionné.' },
    { q: 'Les professionnels peuvent-ils venir chez moi ?', a: 'Oui ! Filtrez par "Service à domicile" dans la recherche. Le professionnel définit les communes où il peut se déplacer, avec un tarif de déplacement éventuellement ajouté.' },
    { q: 'Comment rejoindre SEFAIZO en tant que professionnel ?', a: 'Cliquez sur "Devenir partenaire", renseignez votre profil, vos services et passez la vérification KYC. Votre boutique est activée sous 24h.' }
  ];
}
