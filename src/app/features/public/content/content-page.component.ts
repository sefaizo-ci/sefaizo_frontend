import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CmsService } from '../../../core/services/cms.service';
import { PageContent, ContentSection } from '../../../core/models/cms.models';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (page) {
      <div class="min-h-screen bg-white">
        @for (section of page.sections; track section.id) {
          <!-- Hero Section -->
          @if (section.type === 'hero') {
            <section class="relative bg-gradient-to-br from-primary/5 via-white to-primary/10 py-16 md:py-24">
              <div class="container-custom max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-secondary mb-6">{{ section.title }}</h1>
                <p class="text-lg md:text-xl text-secondary-gray leading-relaxed whitespace-pre-line">{{ section.content }}</p>
                @if (section.image) {
                  <img [src]="section.image" [alt]="section.title || ''" class="mt-12 rounded-xl shadow-lg max-h-96 mx-auto object-cover">
                }
              </div>
            </section>
          }

          <!-- Text Section -->
          @if (section.type === 'text') {
            <section class="py-12 md:py-16">
              <div class="container-custom max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-secondary mb-6">{{ section.title }}</h2>
                <div class="text-secondary-gray leading-relaxed whitespace-pre-line text-lg">{{ section.content }}</div>
              </div>
            </section>
          }

          <!-- Stats Section -->
          @if (section.type === 'stats') {
            <section class="py-12 md:py-16 bg-gray-50">
              <div class="container-custom">
                @if (section.title) {
                  <h2 class="text-3xl font-bold text-secondary mb-12 text-center">{{ section.title }}</h2>
                }
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                  @for (stat of section.stats; track stat.id) {
                    <div class="text-center">
                      <div class="text-4xl md:text-5xl font-bold text-primary mb-2">{{ stat.value }}</div>
                      <div class="text-sm md:text-base text-secondary-gray">{{ stat.label }}</div>
                    </div>
                  }
                </div>
              </div>
            </section>
          }

          <!-- Cards Section -->
          @if (section.type === 'cards') {
            <section class="py-12 md:py-16">
              <div class="container-custom">
                @if (section.title) {
                  <h2 class="text-3xl font-bold text-secondary mb-12 text-center">{{ section.title }}</h2>
                }
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (card of section.cards; track card.id) {
                    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                      <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          @if (card.icon === 'check-circle') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          } @else if (card.icon === 'eye') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          } @else if (card.icon === 'lightbulb') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                          } @else if (card.icon === 'heart') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          } @else if (card.icon === 'calendar') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          } @else if (card.icon === 'credit-card') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                          } @else if (card.icon === 'headset') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M8.464 8.464a5 5 0 010 7.072M15.536 8.464a5 5 0 000 7.072"/>
                          } @else if (card.icon === 'star') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                          } @else if (card.icon === 'scissors') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/>
                          } @else if (card.icon === 'megaphone') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                          } @else if (card.icon === 'gift') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                          } @else if (card.icon === 'crown') {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                          } @else {
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          }
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold text-secondary mb-2">{{ card.title }}</h3>
                      <p class="text-secondary-gray whitespace-pre-line text-sm">{{ card.description }}</p>
                      @if (card.link) {
                        <a [routerLink]="card.link" class="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:underline">
                          En savoir plus
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </a>
                      }
                    </div>
                  }
                </div>
              </div>
            </section>
          }

          <!-- FAQ Section -->
          @if (section.type === 'faq') {
            <section class="py-12 md:py-16 bg-gray-50">
              <div class="container-custom max-w-4xl mx-auto">
                @if (section.title) {
                  <h2 class="text-3xl font-bold text-secondary mb-12 text-center">{{ section.title }}</h2>
                }
                <div class="space-y-4">
                  @for (item of section.faqItems; track item.id) {
                    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                      <button (click)="toggleFaq(item.id)" class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <span class="font-semibold text-secondary pr-4">{{ item.question }}</span>
                        <svg class="w-5 h-5 text-primary flex-shrink-0 transition-transform" [class.rotate-180]="openFaqs.has(item.id)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      @if (openFaqs.has(item.id)) {
                        <div class="px-6 pb-4 text-secondary-gray leading-relaxed">
                          {{ item.answer }}
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            </section>
          }

          <!-- CTA Section -->
          @if (section.type === 'cta') {
            <section class="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
              <div class="container-custom max-w-3xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ section.title }}</h2>
                @if (section.content) {
                  <p class="text-white/80 text-lg mb-8">{{ section.content }}</p>
                }
                @if (section.ctaText && section.ctaLink) {
                  <a [routerLink]="section.ctaLink" class="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors hover:shadow-lg">
                    {{ section.ctaText }}
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                }
              </div>
            </section>
          }
        }
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-secondary mb-4">Page non trouvée</h1>
          <p class="text-secondary-gray mb-8">Cette page n'existe pas ou a été supprimée.</p>
          <a routerLink="/" class="btn-primary inline-block">Retour à l'accueil</a>
        </div>
      </div>
    }
  `,
  styles: []
})
export class ContentPageComponent implements OnInit {
  page: PageContent | undefined;
  openFaqs = new Set<string>();

  constructor(
    private route: ActivatedRoute,
    private cms: CmsService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.data['slug'];
    this.page = this.cms.getPageBySlug(slug);
  }

  toggleFaq(id: string): void {
    if (this.openFaqs.has(id)) {
      this.openFaqs.delete(id);
    } else {
      this.openFaqs.add(id);
    }
  }
}
