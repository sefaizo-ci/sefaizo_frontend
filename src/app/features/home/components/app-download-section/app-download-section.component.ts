import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-app-download',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-download-section.component.html',
  styleUrls: ['./app-download-section.component.scss'],
})
export class HomeAppDownloadSectionComponent implements OnInit, OnDestroy {
  step = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  // Durée d'affichage de chaque étape (ms)
  private readonly durations = [
    4000, // 0  splash
    4000, // 1  inscription – téléphone + PIN
    4000, // 2  inscription – OTP 6 chiffres
    3000, // 3  connexion  – téléphone
    4000, // 4  connexion  – OTP + PIN
    4000, // 5  explorer les salons
    4000, // 6  réserver un créneau
    3000, // 7  confirmation RDV
    4000, // 8  paiement
    3000, // 9  succès
    5000, // 10 transition logo
    4000, // 11 inscription pro – téléphone + PIN
    4000, // 12 inscription pro – OTP
    4000, // 13 connexion pro  – téléphone + OTP + PIN
    4000, // 14 configurer services
    4000, // 15 disponibilités
    4000, // 16 notification RDV
    3000, // 17 accepter RDV
    4000, // 18 portefeuille
    7000, // 19 tableau de bord
  ];

  ngOnInit(): void { this.tick(); }
  ngOnDestroy(): void { if (this.timer) clearTimeout(this.timer); }

  private tick(): void {
    this.timer = setTimeout(() => {
      this.step = (this.step + 1) % this.durations.length;
      this.tick();
    }, this.durations[this.step]);
  }
}
