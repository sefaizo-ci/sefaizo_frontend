import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface City {
  name: string;
  count: number;
}

interface Country {
  name: string;
  cities: City[];
}

@Component({
  selector: 'app-city-browser',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section bg-secondary-light/50">
      <div class="container-custom">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="section-title">Parcourez par ville</h2>
          <p class="section-subtitle mx-auto">
            Découvrez les meilleurs professionnels près de chez vous
          </p>
        </div>

        <!-- Country Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          @for (country of countries; track country.name; let i = $index) {
            <button
              (click)="activeCountry = i"
              [class]="getTabClass(i)"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200">
              {{ country.name }}
            </button>
          }
        </div>

        <!-- Cities Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          @for (city of getCurrentCities(); track city.name) {
            <a
              href="#"
              class="bg-white p-4 rounded-md shadow hover:shadow-md transition-all duration-200 group">
              <div class="font-medium text-secondary group-hover:text-primary transition-colors">
                {{ city.name }}
              </div>
              <div class="text-sm text-secondary-gray mt-1">
                {{ city.count }}+ professionnels
              </div>
            </a>
          }
        </div>

        <!-- View All Link -->
        <div class="text-center mt-8">
          <a href="#" class="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors">
            Voir toutes les villes
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class CityBrowserComponent {
  activeCountry = 0;

  countries: Country[] = [
    {
      name: 'France',
      cities: [
        { name: 'Paris', count: 15000 },
        { name: 'Lyon', count: 5000 },
        { name: 'Marseille', count: 4500 },
        { name: 'Bordeaux', count: 3000 },
        { name: 'Toulouse', count: 3500 },
        { name: 'Nice', count: 2500 },
        { name: 'Nantes', count: 2800 },
        { name: 'Strasbourg', count: 2000 },
        { name: 'Lille', count: 3200 },
        { name: 'Montpellier', count: 2400 },
      ]
    },
    {
      name: 'Belgique',
      cities: [
        { name: 'Bruxelles', count: 5000 },
        { name: 'Anvers', count: 3000 },
        { name: 'Gand', count: 2000 },
        { name: 'Liège', count: 1800 },
        { name: 'Bruges', count: 1200 },
        { name: 'Namur', count: 1000 },
        { name: 'Louvain', count: 1500 },
        { name: 'Mons', count: 900 },
        { name: 'Charleroi', count: 1100 },
        { name: 'Ostende', count: 800 },
      ]
    },
    {
      name: 'Suisse',
      cities: [
        { name: 'Genève', count: 4000 },
        { name: 'Zurich', count: 5500 },
        { name: 'Lausanne', count: 2500 },
        { name: 'Berne', count: 2000 },
        { name: 'Bâle', count: 2200 },
        { name: 'Lucerne', count: 1500 },
        { name: 'Lugano', count: 1200 },
        { name: 'Fribourg', count: 1000 },
        { name: 'Montreux', count: 900 },
        { name: 'Sion', count: 700 },
      ]
    },
    {
      name: 'Canada',
      cities: [
        { name: 'Montréal', count: 8000 },
        { name: 'Québec', count: 3500 },
        { name: 'Toronto', count: 9000 },
        { name: 'Vancouver', count: 6000 },
        { name: 'Ottawa', count: 2500 },
        { name: 'Calgary', count: 3000 },
        { name: 'Laval', count: 1800 },
        { name: 'Gatineau', count: 1200 },
        { name: 'Longueuil', count: 1500 },
        { name: 'Sherbrooke', count: 1000 },
      ]
    },
  ];

  getTabClass(index: number): string {
    const baseClass = 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200';
    return index === this.activeCountry
      ? `${baseClass} bg-primary text-white`
      : `${baseClass} bg-white text-secondary hover:bg-primary/10 hover:text-primary`;
  }

  getCurrentCities(): City[] {
    return this.countries[this.activeCountry].cities;
  }
}
