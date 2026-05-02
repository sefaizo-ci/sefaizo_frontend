import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { MockDataService } from '../../../../core/services/mock-data.service';
import { HeroContent, HeroStat } from '../../models/home-content.model';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.component.html',
})
export class HomeHeroSectionComponent implements OnInit {
  @Input({ required: true }) hero!: HeroContent;

  communes: string[] = [];

  protected readonly iconNames: Record<HeroStat['icon'], string> = {
    calendar: 'calendar',
    users: 'users',
    star: 'star',
  };

  constructor(
    private router: Router,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    this.communes = this.mockData.getCommunes();
  }

  onSearch(serviceValue: string, communeValue: string): void {
    const params: Record<string, string> = {};
    const service = serviceValue.trim();
    if (service) params['q'] = service;
    if (communeValue) params['commune'] = communeValue;
    this.router.navigate(['/recherche'], { queryParams: params });
  }
}
