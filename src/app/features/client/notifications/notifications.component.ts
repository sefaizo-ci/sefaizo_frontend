import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../core/services/mock-data.service';
import { ToastService } from '../../../shared/ui/toast/toast.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

interface Notification {
  id: string;
  type: 'booking' | 'promotion' | 'reminder' | 'system';
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  icon: string;
}

@Component({
  selector: 'app-client-notifications',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent
  ],
  template: `
    <div>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-secondary mb-2">Notifications</h1>
          <p class="text-secondary-gray">Restez informé de vos rendez-vous et offres</p>
        </div>
        <button (click)="markAllAsRead()" class="text-primary font-medium hover:text-primary-dark text-sm">
          Tout marquer comme lu
        </button>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white rounded-md shadow p-6 mb-6">
        <h2 class="text-lg font-semibold text-secondary mb-4">Préférences de notification</h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-medium text-secondary">Réservations</div>
              <div class="text-sm text-secondary-gray">Confirmations et rappels de rendez-vous</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <div class="font-medium text-secondary">Promotions</div>
              <div class="text-sm text-secondary-gray">Offres spéciales et réductions</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <div class="font-medium text-secondary">Rappels</div>
              <div class="text-sm text-secondary-gray">Rappels par SMS et email</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <div class="font-medium text-secondary">Newsletter</div>
              <div class="text-sm text-secondary-gray">Actualités et conseils beauté</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="bg-white rounded-md shadow">
        <div class="divide-y">
          @for (notification of notifications; track notification.id) {
            <div [class]="notification.isRead ? 'bg-white' : 'bg-primary/5'" class="p-6 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-4">
                <div [class]="getIconBgClass(notification.type)" class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  @if (notification.type === 'booking') {
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  } @else if (notification.type === 'promotion') {
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                  } @else if (notification.type === 'reminder') {
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  } @else {
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                  }
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="font-semibold text-secondary">{{ notification.title }}</h3>
                      <p class="text-secondary-gray mt-1">{{ notification.message }}</p>
                    </div>
                    @if (!notification.isRead) {
                      <app-badge variant="info">Nouveau</app-badge>
                    }
                  </div>
                  <div class="text-sm text-secondary-gray">{{ notification.date | date:'dd/MM/yyyy à HH:mm' }}</div>
                </div>
                @if (!notification.isRead) {
                  <button (click)="markAsRead(notification.id)" class="text-primary hover:text-primary-dark text-sm font-medium">
                    Marquer comme lu
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientNotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Mock notifications
    const now = new Date();
    this.notifications = [
      {
        id: 'notif-1',
        type: 'booking',
        title: 'Réservation confirmée',
        message: 'Votre rendez-vous chez Beauty Salon Cocody est confirmé pour le 25 mars à 10h30',
        date: new Date(now.getTime() - 1000 * 60 * 30), // 30 min ago
        isRead: false,
        icon: 'calendar'
      },
      {
        id: 'notif-2',
        type: 'reminder',
        title: 'Rappel de rendez-vous',
        message: 'N\'oubliez pas votre rendez-vous demain chez Barber Shop Plateau à 14h00',
        date: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: false,
        icon: 'bell'
      },
      {
        id: 'notif-3',
        type: 'promotion',
        title: 'Offre spéciale -20%',
        message: 'Profitez de -20% sur tous les soins du visage chez Luxury Beauty Treichville ce weekend',
        date: new Date(now.getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
        isRead: false,
        icon: 'tag'
      },
      {
        id: 'notif-4',
        type: 'booking',
        title: 'Rendez-vous terminé',
        message: 'Votre rendez-vous chez Nails & Spa Yopougon est terminé. Laissez un avis !',
        date: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        icon: 'check'
      },
      {
        id: 'notif-5',
        type: 'system',
        title: 'Nouvelle fonctionnalité',
        message: 'Découvrez notre nouvelle option de réservation à domicile',
        date: new Date(now.getTime() - 1000 * 60 * 60 * 48), // 2 days ago
        isRead: true,
        icon: 'star'
      }
    ];
  }

  getIconBgClass(type: string): string {
    const classes: Record<string, string> = {
      booking: 'bg-blue-100 text-blue-600',
      promotion: 'bg-green-100 text-green-600',
      reminder: 'bg-yellow-100 text-yellow-600',
      system: 'bg-purple-100 text-purple-600'
    };
    return classes[type] || classes['system'];
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.toast.success('Marqué comme lu');
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
    this.toast.success('Toutes les notifications ont été marquées comme lues');
  }
}
