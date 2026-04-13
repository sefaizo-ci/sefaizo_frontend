import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/ui/card/card.component';

interface Review {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
}

@Component({
  selector: 'app-reviews-carousel',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section class="section bg-secondary-light/50">
      <div class="container-custom">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="section-title">Ce que disent nos clients</h2>
          <p class="section-subtitle mx-auto">
            Des milliers de clients satisfaits partagent leur expérience
          </p>
        </div>

        <!-- Carousel -->
        <div class="relative overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-out"
            [style.transform]="getTransform()">
            @for (review of displayedReviews; track review.id) {
              <div class="flex-shrink-0 px-4">
                <app-card variant="review">
                  <!-- Rating -->
                  <div class="flex gap-1 mb-4">
                    @for (star of getStars(review.rating); track $index) {
                      <svg class="w-5 h-5 text-accent-star" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    }
                  </div>

                  <!-- Quote -->
                  <p class="text-secondary-gray italic mb-4">"{{ review.quote }}"</p>

                  <!-- Author -->
                  <div>
                    <p class="font-semibold text-secondary">{{ review.author }}</p>
                    <p class="text-sm text-secondary-gray">{{ review.location }}</p>
                  </div>
                </app-card>
              </div>
            }
          </div>

          <!-- Navigation Buttons -->
          <button
            (click)="prev()"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-2 border-gray-200 hover:border-primary hover:text-primary rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button
            (click)="next()"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-2 border-gray-200 hover:border-primary hover:text-primary rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center gap-2 mt-8">
          @for (review of reviews; track review.id; let i = $index) {
            <button
              (click)="goTo(i)"
              [class]="getDotClass(i)"
              class="w-2 h-2 rounded-full transition-all duration-200">
            </button>
          }
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ReviewsCarouselComponent implements OnInit, OnDestroy {
  reviews: Review[] = [
    { id: 1, quote: 'Service exceptionnel! J\'ai trouvé mon salon de coiffure idéal en quelques minutes.', author: 'Marie L.', location: 'Paris, France', rating: 5 },
    { id: 2, quote: 'Application très pratique pour réserver mes rendez-vous beauté. Je recommande!', author: 'Sophie M.', location: 'Lyon, France', rating: 5 },
    { id: 3, quote: 'Gain de temps énorme et professionnels de qualité. Parfait!', author: 'Julie D.', location: 'Marseille, France', rating: 5 },
    { id: 4, quote: 'Interface intuitive et réservation facile. Mon outil préféré!', author: 'Camille R.', location: 'Bordeaux, France', rating: 5 },
    { id: 5, quote: 'Les meilleurs prestataires de ma ville sont tous ici. Top!', author: 'Léa B.', location: 'Toulouse, France', rating: 5 },
    { id: 6, quote: 'Simple, rapide et efficace. Que demander de plus?', author: 'Emma T.', location: 'Nice, France', rating: 5 },
  ];

  currentIndex = 0;
  itemsPerView = 3;
  private autoScrollInterval?: any;

  ngOnInit() {
    this.updateItemsPerView();
    this.startAutoScroll();
    window.addEventListener('resize', () => this.updateItemsPerView());
  }

  ngOnDestroy() {
    this.stopAutoScroll();
    window.removeEventListener('resize', () => this.updateItemsPerView());
  }

  get displayedReviews(): Review[] {
    const extended = [...this.reviews, ...this.reviews, ...this.reviews];
    const start = this.currentIndex;
    return extended.slice(start, start + this.itemsPerView);
  }

  getTransform(): string {
    const cardWidth = 350 + 32; // card width + padding
    return `translateX(-${this.currentIndex * cardWidth}px)`;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
    this.resetAutoScroll();
  }

  prev() {
    this.currentIndex = this.currentIndex === 0 ? this.reviews.length - 1 : this.currentIndex - 1;
    this.resetAutoScroll();
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.resetAutoScroll();
  }

  getDotClass(index: number): string {
    return index === this.currentIndex 
      ? 'bg-primary w-8' 
      : 'bg-gray-300 hover:bg-gray-400 w-2 h-2';
  }

  private updateItemsPerView() {
    const width = window.innerWidth;
    if (width < 640) this.itemsPerView = 1;
    else if (width < 1024) this.itemsPerView = 2;
    else this.itemsPerView = 3;
  }

  private startAutoScroll() {
    this.autoScrollInterval = setInterval(() => this.next(), 5000);
  }

  private stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  private resetAutoScroll() {
    this.stopAutoScroll();
    this.startAutoScroll();
  }
}
