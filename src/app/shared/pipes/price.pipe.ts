import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  private readonly formatter = new Intl.NumberFormat('fr-FR');

  transform(value: number): string {
    return `${this.formatter.format(value)} FCFA`;
  }
}
