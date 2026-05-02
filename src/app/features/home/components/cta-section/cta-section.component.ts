import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-section.component.html',
})
export class HomeCtaSectionComponent {}
