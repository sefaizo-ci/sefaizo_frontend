import { AfterViewInit, Component, ElementRef, Input, ViewChild, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { Testimonial } from '../../models/home-content.model';
import { HomeSectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [LucideAngularModule, HomeSectionHeaderComponent, NgClass],
  templateUrl: './testimonials-section.component.html',
})
export class HomeTestimonialsSectionComponent implements AfterViewInit {
  @Input({ required: true }) testimonials: Testimonial[] = [];
  @ViewChild('track') trackRef!: ElementRef<HTMLElement>;

  protected readonly stars = [1, 2, 3, 4, 5];
  currentIndex = signal(0);
  atStart = computed(() => this.currentIndex() === 0);
  atEnd = signal(false);

  ngAfterViewInit(): void {
    const el = this.trackRef.nativeElement;
    this.atEnd.set(el.scrollWidth <= el.clientWidth + 4);
  }

  private scrollToIndex(index: number): void {
    const el = this.trackRef.nativeElement;
    const firstCard = el.firstElementChild as HTMLElement;
    if (!firstCard) return;
    el.scrollTo({ left: index * (firstCard.offsetWidth + 20), behavior: 'smooth' });
  }

  prev(): void {
    this.scrollToIndex(Math.max(0, this.currentIndex() - 1));
  }

  next(): void {
    this.scrollToIndex(Math.min(this.testimonials.length - 1, this.currentIndex() + 1));
  }

  goTo(index: number): void {
    this.scrollToIndex(index);
  }

  onTrackScroll(): void {
    const el = this.trackRef.nativeElement;
    const firstCard = el.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardAndGap = firstCard.offsetWidth + 20;
    this.currentIndex.set(Math.round(el.scrollLeft / cardAndGap));
    this.atEnd.set(Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 4);
  }
}
