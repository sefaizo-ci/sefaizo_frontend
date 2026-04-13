import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUp } from 'countup.js';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section bg-gradient-primary text-white">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          @for (stat of stats; track stat.label; let i = $index) {
            <div class="text-center" #statElement>
              <div class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                <span [id]="'stat-' + i" class="countup"></span>
              </div>
              <div class="text-white/80 text-sm md:text-base">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host ::ng-deep .countup {
      font-variant-numeric: tabular-nums;
    }
  `]
})
export class StatsSectionComponent implements AfterViewInit {
  @ViewChild('statElement') statElement?: ElementRef;

  stats: Stat[] = [
    { label: 'Rendez-vous par mois', value: 5, suffix: 'M+', prefix: '' },
    { label: 'Professionnels actifs', value: 100, suffix: 'K+', prefix: '' },
    { label: 'Pays présents', value: 50, suffix: '+', prefix: '' },
    { label: 'Note moyenne', value: 4.9, suffix: '', prefix: '' },
  ];

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Initialize countup animations after view is rendered
    setTimeout(() => {
      this.stats.forEach((stat, index) => {
        const element = document.getElementById(`stat-${index}`);
        if (element) {
          const countUp = new CountUp(element, stat.value, {
            duration: 2.5,
            prefix: stat.prefix,
            suffix: stat.suffix,
            useEasing: true,
            easingFn: (t: number) => Math.min(1, Math.max(0, -Math.pow(2, -10 * t) + 1)),
          });
          
          if (!countUp.error) {
            countUp.start();
          }
        }
      });
    }, 100);
  }
}
