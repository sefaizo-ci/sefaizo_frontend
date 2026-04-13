import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Client } from '../../../core/models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container-custom max-w-3xl">
        <h1 class="text-3xl font-bold text-secondary mb-8">Mon Profil</h1>

        <div class="bg-white rounded-md shadow-lg p-6 mb-6">
          <div class="flex items-center gap-6 mb-8 pb-8 border-b">
            <div class="relative">
              <img
                [src]="getUser()?.avatar || 'https://via.placeholder.com/100?img=5'"
                [alt]="getUser()?.firstName"
                class="w-24 h-24 rounded-full object-cover">
            </div>
            <div>
              <h2 class="text-xl font-semibold text-secondary">{{ fullName }}</h2>
              <p class="text-secondary-gray">{{ getUser()?.email }}</p>
            </div>
          </div>

          <form (ngSubmit)="saveProfile()" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-secondary-gray mb-2">Prénom</label>
                <input
                  type="text"
                  [(ngModel)]="formData.firstName"
                  name="firstName"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              </div>

              <div>
                <label class="block text-sm font-medium text-secondary-gray mb-2">Nom</label>
                <input
                  type="text"
                  [(ngModel)]="formData.lastName"
                  name="lastName"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-secondary-gray mb-2">Téléphone</label>
              <input
                type="tel"
                [(ngModel)]="formData.phone"
                name="phone"
                placeholder="+225 XX XX XX XX XX"
                class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            </div>

            <div class="flex justify-end gap-4 pt-4 border-t">
              <button type="button" class="px-6 py-2 text-secondary font-medium hover:bg-gray-100 rounded-md transition-colors">
                Annuler
              </button>
              <button type="submit" class="btn-primary">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientProfileComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    phone: ''
  };

  private _user: Client | null = null;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.user() as Client | undefined;
    if (user) {
      this._user = user;
      this.formData.firstName = user.firstName;
      this.formData.lastName = user.lastName;
      this.formData.phone = user.phone || '';
    }
  }

  getUser(): Client | null {
    return this._user || (this.authService.user() as Client | null);
  }

  get fullName(): string {
    const user = this.getUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  saveProfile(): void {
    this.toast.success('Profil mis à jour avec succès');
  }
}
