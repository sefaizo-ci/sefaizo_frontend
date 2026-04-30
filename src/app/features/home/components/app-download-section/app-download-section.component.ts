import { Component } from '@angular/core';
import { Apple, Calendar, Heart, LucideAngularModule, Play, Star } from 'lucide-angular';

@Component({
  selector: 'app-app-download-section',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './app-download-section.component.html',
})
export class AppDownloadSectionComponent {
  protected readonly icons = {
    apple: Apple,
    calendar: Calendar,
    heart: Heart,
    play: Play,
    star: Star,
  };
}
