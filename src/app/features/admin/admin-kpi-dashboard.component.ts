import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../core/services/mock-data.service';
import { AdminKpiDashboard, TimePeriod } from './models/admin-kpi.models';
import { FcfaPipe } from '../../shared/pipes/format.pipe';
import { ToastService } from '../../shared/ui/toast/toast.component';
import { AppointmentsWidgetComponent } from './widgets/appointments-widget.component';
import { ClientsWidgetComponent } from './widgets/clients-widget.component';
import { ProfessionalsWidgetComponent } from './widgets/professionals-widget.component';
import { RevenueWidgetComponent } from './widgets/revenue-widget.component';

@Component({
  selector: 'app-admin-kpi-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FcfaPipe,
    AppointmentsWidgetComponent,
    ClientsWidgetComponent,
    ProfessionalsWidgetComponent,
    RevenueWidgetComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-secondary to-secondary-dark text-white py-8">
        <div class="container-custom">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Dashboard Admin</h1>
              <p class="text-white/80">Tableau de bord et indicateurs de performance SEFAIZO</p>
            </div>
            <div class="flex items-center gap-3">
              <a
                routerLink="/admin/monetization"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 text-white text-sm font-medium">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                </svg>
                Business Model
              </a>
              <a
                routerLink="/admin/statistics"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2 text-white text-sm font-medium">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Stats détaillées
              </a>
              <!-- Period Selector -->
              <select
                [(ngModel)]="selectedPeriod"
                (ngModelChange)="onPeriodChange()"
                class="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30">
                <option value="week" class="text-secondary">Cette semaine</option>
                <option value="month" class="text-secondary">Ce mois</option>
                <option value="year" class="text-secondary">Cette année</option>
              </select>
              <button 
                (click)="refreshData()"
                class="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title="Actualiser">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-custom py-8">
        @if (loading) {
          <!-- Loading State -->
          <div class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        } @else {
          @if (dashboard(); as dash) {
          <!-- Overview KPI Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Total Appointments -->
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                @if (dash.overview.periodComparison.appointments !== undefined) {
                  <span class="text-xs font-medium px-2 py-1 rounded-full"
                        [ngClass]="dash.overview.periodComparison.appointments >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ dash.overview.periodComparison.appointments >= 0 ? '↑' : '↓' }}
                    {{ Math.abs(dash.overview.periodComparison.appointments) }}%
                  </span>
                }
              </div>
              <div class="text-3xl font-bold text-secondary">{{ dash.overview.totalAppointments }}</div>
              <div class="text-sm text-secondary-gray mt-1">Rendez-vous totaux</div>
            </div>

            <!-- Total Clients -->
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                @if (dash.overview.periodComparison.clients !== undefined) {
                  <span class="text-xs font-medium px-2 py-1 rounded-full"
                        [ngClass]="dash.overview.periodComparison.clients >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ dash.overview.periodComparison.clients >= 0 ? '↑' : '↓' }}
                    {{ Math.abs(dash.overview.periodComparison.clients) }}%
                  </span>
                }
              </div>
              <div class="text-3xl font-bold text-secondary">{{ dash.overview.totalClients }}</div>
              <div class="text-sm text-secondary-gray mt-1">Clients totaux</div>
            </div>

            <!-- Total Professionals -->
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
              </div>
              <div class="text-3xl font-bold text-secondary">{{ dash.overview.totalProfessionals }}</div>
              <div class="text-sm text-secondary-gray mt-1">Professionnels inscrits</div>
            </div>

            <!-- Monthly Revenue -->
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                  </svg>
                </div>
                @if (dash.overview.periodComparison.revenue !== undefined) {
                  <span class="text-xs font-medium px-2 py-1 rounded-full"
                        [ngClass]="dash.overview.periodComparison.revenue >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ dash.overview.periodComparison.revenue >= 0 ? '↑' : '↓' }}
                    {{ Math.abs(dash.overview.periodComparison.revenue) }}%
                  </span>
                }
              </div>
              <div class="text-3xl font-bold text-primary">{{ dash.overview.monthlyRevenue | fcfa:false }}</div>
              <div class="text-sm text-secondary-gray mt-1">CA Mensuel</div>
            </div>
          </div>

          <!-- Key Rates -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Completion Rate -->
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-medium opacity-90">Taux de réalisation</h3>
                <svg class="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-4xl font-bold mb-1">{{ dash.overview.completionRate }}%</div>
              <div class="text-sm opacity-80">Des rendez-vous sont honorés</div>
            </div>

            <!-- Cancellation Rate -->
            <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow p-6 text-white">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-medium opacity-90">Taux d'annulation</h3>
                <svg class="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-4xl font-bold mb-1">{{ dash.overview.cancellationRate }}%</div>
              <div class="text-sm opacity-80">Des rendez-vous annulés</div>
            </div>

            <!-- Growth Rate -->
            <div class="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow p-6 text-white">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-medium opacity-90">Croissance CA</h3>
                <svg class="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-4xl font-bold mb-1">{{ dash.revenue.growthRate >= 0 ? '+' : '' }}{{ dash.revenue.growthRate }}%</div>
              <div class="text-sm opacity-80">Évolution du chiffre d'affaires</div>
            </div>
          </div>

          <!-- Widgets Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <app-appointments-widget [metrics]="dash.appointments"></app-appointments-widget>
            <app-clients-widget [metrics]="dash.clients"></app-clients-widget>
            <app-professionals-widget [metrics]="dash.professionals"></app-professionals-widget>
            <app-revenue-widget [metrics]="dash.revenue"></app-revenue-widget>
          </div>

          <!-- Comparison Section -->
          <div class="mt-8 bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-secondary mb-6">Comparaison des périodes</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4 text-sm font-semibold text-secondary-gray">Métrique</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Période actuelle</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Période précédente</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-secondary-gray">Croissance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                          <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <span class="text-secondary">Rendez-vous</span>
                      </div>
                    </td>
                    <td class="text-right py-3 px-4 font-medium text-secondary">{{ dash.trends.comparisonPeriod.currentPeriod.appointments }}</td>
                    <td class="text-right py-3 px-4 text-secondary-gray">{{ dash.trends.comparisonPeriod.previousPeriod.appointments }}</td>
                    <td class="text-right py-3 px-4">
                      <span class="inline-flex items-center gap-1 font-medium" 
                            [ngClass]="dash.trends.comparisonPeriod.growth.appointments >= 0 ? 'text-green-600' : 'text-red-600'">
                        <svg class="w-4 h-4" [ngClass]="dash.trends.comparisonPeriod.growth.appointments >= 0 ? 'transform rotate-0' : 'transform rotate-180'" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ Math.abs(dash.trends.comparisonPeriod.growth.appointments) }}%
                      </span>
                    </td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                          <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <span class="text-secondary">Chiffre d'affaires</span>
                      </div>
                    </td>
                    <td class="text-right py-3 px-4 font-medium text-secondary">{{ dash.trends.comparisonPeriod.currentPeriod.revenue | fcfa:false }}</td>
                    <td class="text-right py-3 px-4 text-secondary-gray">{{ dash.trends.comparisonPeriod.previousPeriod.revenue | fcfa:false }}</td>
                    <td class="text-right py-3 px-4">
                      <span class="inline-flex items-center gap-1 font-medium" 
                            [ngClass]="dash.trends.comparisonPeriod.growth.revenue >= 0 ? 'text-green-600' : 'text-red-600'">
                        <svg class="w-4 h-4" [ngClass]="dash.trends.comparisonPeriod.growth.revenue >= 0 ? 'transform rotate-0' : 'transform rotate-180'" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ Math.abs(dash.trends.comparisonPeriod.growth.revenue) }}%
                      </span>
                    </td>
                  </tr>
                  <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                          <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                          </svg>
                        </div>
                        <span class="text-secondary">Clients</span>
                      </div>
                    </td>
                    <td class="text-right py-3 px-4 font-medium text-secondary">{{ dash.trends.comparisonPeriod.currentPeriod.clients }}</td>
                    <td class="text-right py-3 px-4 text-secondary-gray">{{ dash.trends.comparisonPeriod.previousPeriod.clients }}</td>
                    <td class="text-right py-3 px-4">
                      <span class="inline-flex items-center gap-1 font-medium" 
                            [ngClass]="dash.trends.comparisonPeriod.growth.clients >= 0 ? 'text-green-600' : 'text-red-600'">
                        <svg class="w-4 h-4" [ngClass]="dash.trends.comparisonPeriod.growth.clients >= 0 ? 'transform rotate-0' : 'transform rotate-180'" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ Math.abs(dash.trends.comparisonPeriod.growth.clients) }}%
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-orange-100 flex items-center justify-center">
                          <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                          </svg>
                        </div>
                        <span class="text-secondary">Professionnels</span>
                      </div>
                    </td>
                    <td class="text-right py-3 px-4 font-medium text-secondary">{{ dash.trends.comparisonPeriod.currentPeriod.professionals }}</td>
                    <td class="text-right py-3 px-4 text-secondary-gray">{{ dash.trends.comparisonPeriod.previousPeriod.professionals }}</td>
                    <td class="text-right py-3 px-4">
                      <span class="inline-flex items-center gap-1 font-medium" 
                            [ngClass]="dash.trends.comparisonPeriod.growth.professionals >= 0 ? 'text-green-600' : 'text-red-600'">
                        <svg class="w-4 h-4" [ngClass]="dash.trends.comparisonPeriod.growth.professionals >= 0 ? 'transform rotate-0' : 'transform rotate-180'" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ Math.abs(dash.trends.comparisonPeriod.growth.professionals) }}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        }
      </div>
    </div>
  `,
  styles: []
})
export class AdminKpiDashboardComponent implements OnInit {
  dashboard = signal<AdminKpiDashboard | null>(null);
  loading = true;
  selectedPeriod: TimePeriod = 'month';
  Math = Math;

  constructor(
    private mockData: MockDataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    try {
      const data = this.mockData.getAdminKpiDashboard(this.selectedPeriod);
      this.dashboard.set(data);
    } catch (error) {
      this.toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  onPeriodChange(): void {
    this.loadDashboard();
  }

  refreshData(): void {
    this.toast.success('Données actualisées');
    this.loadDashboard();
  }
}
