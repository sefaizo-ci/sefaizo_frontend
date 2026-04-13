import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'fcfa',
  standalone: true
})
export class FcfaPipe implements PipeTransform {
  transform(value: number | undefined | null, showSymbol = true): string {
    if (value == null) return '';
    
    const formatted = new Intl.NumberFormat('fr-FR').format(Math.floor(value));
    return showSymbol ? `${formatted} FCFA` : formatted;
  }
}

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, format: 'short' | 'long' | 'time' | 'datetime' = 'short'): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (isNaN(date.getTime())) return '';
    
    let options: Intl.DateTimeFormatOptions;
    
    switch (format) {
      case 'short':
        options = { day: 'numeric', month: 'short' as const };
        break;
      case 'long':
        options = { weekday: 'short' as const, day: 'numeric', month: 'long' as const, year: 'numeric' };
        break;
      case 'time':
        options = { hour: '2-digit', minute: '2-digit' };
        break;
      case 'datetime':
        options = { weekday: 'short' as const, day: 'numeric', month: 'short' as const, hour: '2-digit', minute: '2-digit' };
        break;
    }
    
    return date.toLocaleDateString('fr-FR', options);
  }
}

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 10 && digits.startsWith('225')) {
      const withoutCountry = digits.slice(3);
      return `+225 ${withoutCountry.match(/.{1,2}/g)?.join(' ') || value}`;
    }
    
    if (digits.length === 8) {
      return `+225 ${digits.match(/.{1,2}/g)?.join(' ') || value}`;
    }
    
    return value;
  }
}
