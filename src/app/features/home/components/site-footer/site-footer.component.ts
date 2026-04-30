import { Component, Input } from '@angular/core';

import { FooterColumn } from '../../../../core/models/home-content.model';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  @Input({ required: true }) columns: FooterColumn[] = [];
}
