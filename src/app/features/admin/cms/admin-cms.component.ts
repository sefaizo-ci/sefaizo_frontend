import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CmsService } from '../../../core/services/cms.service';
import { PageContent } from '../../../core/models/cms.models';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ToastService } from '../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-admin-cms',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BadgeComponent],
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-secondary mb-2">Gestion du contenu</h1>
        <p class="text-secondary-gray">Gérez et publiez le contenu des pages du site</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Total Pages</p>
          <p class="text-3xl font-bold text-secondary">{{ pages.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Pages publiées</p>
          <p class="text-3xl font-bold text-green-600">{{ publishedCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-secondary-gray mb-1">Pages brouillon</p>
          <p class="text-3xl font-bold text-orange-600">{{ draftCount }}</p>
        </div>
      </div>

      <!-- Pages Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-secondary">Toutes les pages</h2>
        </div>
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Page</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Slug</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Statut</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Dernière modif.</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Sections</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-secondary-gray uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            @for (page of pages; track page.id) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="font-medium text-secondary">{{ page.title }}</div>
                  <div class="text-sm text-secondary-gray truncate max-w-xs">{{ page.subtitle }}</div>
                </td>
                <td class="px-6 py-4">
                  <code class="text-xs bg-gray-100 px-2 py-1 rounded">/{{ page.slug }}</code>
                </td>
                <td class="px-6 py-4">
                  <app-badge [variant]="page.isPublished ? 'success' : 'warning'">
                    {{ page.isPublished ? 'Publié' : 'Brouillon' }}
                  </app-badge>
                </td>
                <td class="px-6 py-4 text-sm text-secondary-gray">
                  {{ page.lastModified | date:'dd/MM/yyyy HH:mm' }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-secondary">
                  {{ page.sections.length }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button (click)="togglePublish(page.id)" class="text-sm px-3 py-1.5 rounded transition-colors" [class]="page.isPublished ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'">
                      {{ page.isPublished ? 'Dépublier' : 'Publier' }}
                    </button>
                    <button (click)="editPage(page.id)" class="text-sm text-primary hover:bg-primary/5 px-3 py-1.5 rounded transition-colors">
                      Modifier
                    </button>
                    <a [routerLink]="'/' + page.slug" target="_blank" class="text-sm text-secondary hover:bg-gray-100 px-3 py-1.5 rounded transition-colors">
                      Voir
                    </a>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Edit Modal -->
      @if (editingPage) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div class="p-6 border-b flex items-center justify-between">
              <h3 class="text-xl font-bold text-secondary">Modifier : {{ editingPage.title }}</h3>
              <button (click)="editingPage = null" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">Titre</label>
                <input type="text" [(ngModel)]="editForm.title" class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">Sous-titre</label>
                <input type="text" [(ngModel)]="editForm.subtitle" class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">Meta Description</label>
                <textarea [(ngModel)]="editForm.metaDescription" rows="2" class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-secondary mb-2">Sections</label>
                <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                  @for (section of editingPage.sections; track section.id) {
                    <div class="flex items-center justify-between bg-white p-3 rounded">
                      <div>
                        <span class="text-xs font-semibold text-primary uppercase">{{ section.type }}</span>
                        <span class="text-sm text-secondary ml-2">{{ section.title || 'Sans titre' }}</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div class="p-6 border-t flex justify-end gap-3">
              <button (click)="editingPage = null" class="px-6 py-2.5 border border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button (click)="savePage()" class="btn-primary">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class AdminCmsComponent implements OnInit {
  pages: PageContent[] = [];
  publishedCount = 0;
  draftCount = 0;
  editingPage: PageContent | null = null;
  editForm = { title: '', subtitle: '', metaDescription: '' };

  constructor(
    private cms: CmsService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.pages = this.cms.pages();
    this.updateCounts();
  }

  togglePublish(pageId: string): void {
    const page = this.pages.find(p => p.id === pageId);
    if (page) {
      this.cms.togglePublish(pageId);
      this.pages = this.cms.pages();
      this.updateCounts();
      this.toast.success(page.isPublished ? 'Page publiée' : 'Page mise en brouillon');
    }
  }

  editPage(pageId: string): void {
    const page = this.pages.find(p => p.id === pageId);
    if (page) {
      this.editingPage = { ...page };
      this.editForm = {
        title: page.title,
        subtitle: page.subtitle,
        metaDescription: page.metaDescription
      };
    }
  }

  savePage(): void {
    if (this.editingPage) {
      this.cms.updatePage(this.editingPage.slug, {
        title: this.editForm.title,
        subtitle: this.editForm.subtitle,
        metaDescription: this.editForm.metaDescription
      });
      this.pages = this.cms.pages();
      this.editingPage = null;
      this.toast.success('Page modifiée avec succès');
    }
  }

  private updateCounts(): void {
    this.publishedCount = this.pages.filter(p => p.isPublished).length;
    this.draftCount = this.pages.filter(p => !p.isPublished).length;
  }
}
