import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homePrice',
  standalone: true,
})
export class HomePricePipe implements PipeTransform {
  private readonly formatter = new Intl.NumberFormat('fr-FR');

  transform(value: number): string {
    return `${this.formatter.format(value)} FCFA`;
  }
}
